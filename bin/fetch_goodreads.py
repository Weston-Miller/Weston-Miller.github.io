#!/usr/bin/env python3
"""Write _data/reading.yml from Goodreads' public shelf widget.

Goodreads retired its API in 2020 and its shelf RSS feeds on 2026-10-28
(every /review/list_rss/ URL now 404s, and shelf pages need a sign-in). The
embeddable "custom widget" is still public, so this reads that instead. It runs
at build time (see .github/workflows/deploy.yml); the committed
_data/reading.yml is only a fallback for local builds and for days when
Goodreads is down or its markup changes.

The widget has titles, authors and covers but no dates, so the start date
behind each "(for N days)" counter comes from _data/reading_started.yml, which
is edited by hand. A book with no entry there is listed without a counter.

Usage: python3 bin/fetch_goodreads.py [user_id] [shelf]
       python3 bin/fetch_goodreads.py --from-file widget.js   # offline test
"""

import html
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

USER_ID = "109451240"
SHELF = "currently-reading"
# widget_id must change per request: Goodreads caches a widget's book list by
# that id and ignores the other parameters on later requests with the same one.
WIDGET = (
    "https://www.goodreads.com/review/custom_widget/{user}.{shelf}"
    "?shelf={shelf}&sort=date_added&order=d&num_books=20"
    "&show_title=1&show_author=1&show_cover=1&widget_id={widget_id}"
)
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_data" / "reading.yml"
STARTED = ROOT / "_data" / "reading_started.yml"
TIMEOUT = 20

# "Borne (Borne, #1)" -> "Borne"; leaves other parentheticals alone.
SERIES_SUFFIX = re.compile(r"\s*\([^()]*#[\d.]+\)\s*$")
# The book id is in the cover URL: .../books/1320530482l/457228._SY75_.jpg
COVER_BOOK_ID = re.compile(r"/(\d+)(?:\.[^/]*)?\.(?:jpg|jpeg|png|gif)$", re.I)
WIDGET_CODE = re.compile(r"var widget_code = '(.*?)';?\s*\n\s*var widget_div", re.S)


class WidgetError(Exception):
    """The response did not look like a shelf widget."""


def warn(message):
    """Print a message that GitHub Actions also shows as a run annotation."""
    print("::warning title=Goodreads::" + message)


def quote(value):
    """Minimal YAML double-quoted scalar."""
    return '"' + str(value).replace("\\", "\\\\").replace('"', '\\"') + '"'


def js_string(body):
    """Undo the escaping inside the widget's single-quoted JS string."""
    return re.sub(r"\\(.)", lambda m: "\n" if m.group(1) == "n" else m.group(1), body)


class ShelfParser(HTMLParser):
    """Collect title, author and cover per gr_custom_each_container_* block."""

    def __init__(self):
        super().__init__()
        self.books = []
        self.saw_container = False
        self.field = None  # "title" or "author" while inside that div's link
        self.div_kind = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        cls = attrs.get("class") or ""
        if tag == "div":
            if cls.startswith("gr_custom_container_"):
                self.saw_container = True
            elif cls.startswith("gr_custom_each_container_"):
                self.books.append({"title": "", "author": "", "cover": ""})
            elif cls.startswith("gr_custom_title_"):
                self.div_kind = "title"
            elif cls.startswith("gr_custom_author_"):
                self.div_kind = "author"
            else:
                self.div_kind = None
        elif tag == "a" and self.div_kind and self.books:
            self.field = self.div_kind
        elif tag == "img" and self.books and not self.books[-1]["cover"]:
            self.books[-1]["cover"] = attrs.get("src") or ""

    def handle_endtag(self, tag):
        if tag == "a":
            self.field = None
        elif tag == "div":
            self.div_kind = None

    def handle_data(self, data):
        if self.field and self.books:
            self.books[-1][self.field] += data


def parse_widget(raw):
    match = WIDGET_CODE.search(raw)
    if not match:
        raise WidgetError("no widget_code in response")
    parser = ShelfParser()
    parser.feed(js_string(match.group(1)))
    if not parser.saw_container:
        raise WidgetError("widget markup not recognised")
    books = []
    for item in parser.books:
        title = SERIES_SUFFIX.sub("", " ".join(html.unescape(item["title"]).split()))
        if not title:
            continue
        found = COVER_BOOK_ID.search(item["cover"])
        books.append(
            {
                "id": found.group(1) if found else "",
                "title": title,
                "author": " ".join(html.unescape(item["author"]).split()),
            }
        )
    return books


def load_started():
    """Read 'book_id: YYYY-MM-DD' lines; no YAML library on the runner."""
    if not STARTED.exists():
        return {}
    dates = {}
    for line in STARTED.read_text(encoding="utf-8").splitlines():
        found = re.match(r"""\s*["']?(\d+)["']?\s*:\s*["']?(\d{4}-\d{2}-\d{2})""", line)
        if found:
            dates[found.group(1)] = found.group(2)
    return dates


def main():
    args = sys.argv[1:]
    if args[:1] == ["--from-file"]:
        source = args[1]
        raw = Path(source).read_text(encoding="utf-8")
    else:
        user = args[0] if len(args) > 0 else USER_ID
        shelf = args[1] if len(args) > 1 else SHELF
        source = WIDGET.format(user=user, shelf=shelf, widget_id=int(time.time()))
        request = urllib.request.Request(
            source, headers={"User-Agent": "Mozilla/5.0 (westonamiller.com build)"}
        )
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            raw = response.read().decode("utf-8", "replace")

    started = load_started()
    books = parse_widget(raw)
    undated = []
    for book in books:
        book["link"] = (
            "https://www.goodreads.com/book/show/" + book["id"]
            if book["id"]
            else "https://www.goodreads.com/search?q=" + urllib.request.quote(book["title"])
        )
        book["started"] = started.get(book["id"], "")
        if not book["started"]:
            undated.append("{} (id {})".format(book["title"], book["id"] or "?"))
    if undated:
        warn(
            "no start date in _data/reading_started.yml for: "
            + "; ".join(undated)
            + " — listed without a day counter"
        )

    lines = [
        "# Generated by bin/fetch_goodreads.py — do not edit by hand.",
        "# Committed only as a fallback: the deploy workflow refreshes this on every",
        "# build. Start dates come from _data/reading_started.yml.",
        "# Source: " + re.sub(r"&widget_id=\\d+", "", source),
        "# Last written: " + datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "books:",
    ]
    for book in books:
        lines.append("  - title: " + quote(book["title"]))
        lines.append("    author: " + quote(book["author"]))
        lines.append("    link: " + quote(book["link"]))
        lines.append("    started: " + quote(book["started"]))
    if not books:
        lines[-1] = "books: []"

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("wrote {} ({} book{})".format(OUT, len(books), "" if len(books) == 1 else "s"))


if __name__ == "__main__":
    try:
        main()
    except (urllib.error.URLError, WidgetError, TimeoutError, UnicodeError) as error:
        # Never fail a deploy over this; the committed fallback stands. But say so
        # loudly: the RSS retirement went unnoticed for twelve days behind a print.
        warn("fetch failed, keeping the committed _data/reading.yml: {}".format(error))
        sys.exit(0)
