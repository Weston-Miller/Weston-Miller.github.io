#!/bin/bash
# Fast replacement for ns.sh / full.sh.
#
# The slow route was: SchurElements(H) -> Value(s,["q",x^m]) -> CycPol(s).
# For h = 60 that means factorising Laurent polynomials of degree ~1800 over
# a cyclotomic field, once per character, which does not finish.
#
# FactorizedSchurElements(H) hands back each Schur element already as
#     factor * PRODUCT_v pol_v(monomial_v)
# with pol_v a CycPol (so already a product of linear factors over Q(zeta)).
# A generic degree at a root of unity is then a limit of a ratio of products
# of atoms (c*x^A - zeta)^m, and both the order of vanishing and the leading
# coefficient of such a product can be read off atom by atom:
#     vanishes  <=>  c*x0^A = zeta,   contributing order m and lead (A*zeta/x0)^m
#     otherwise                        contributing lead (c*x0^A - zeta)^m
# Nothing is ever expanded, so the cost is independent of h.
#
# usage: ./fast.sh KEY SPEC        e.g. ./fast.sh g17 17
cd /home/claude/gap3
KEY=$1; SPEC=$2
cat > /tmp/fa_$KEY.gap <<'GAPEOF'
# ---- atomise a factorised Schur element -------------------------------------
# a "monomial" here may be a plain scalar, an Mvp, or an Mvp with no variable
mono:=function(x)
  if IsRec(x) and IsBound(x.elm) then
    if Length(x.elm)=0 then return [0,0]; fi;
    if Length(x.elm[1].elm)=0 then return [x.coeff[1],0]; fi;
    return [x.coeff[1],x.elm[1].coeff[1]];
  else return [x,0]; fi;
end;;

atomise:=function(s,M)
  local r,v,mm,c,A,j;
  mm:=mono(s.factor);
  r:=rec(C:=mm[1],E:=M*mm[2],f:=[]);
  for v in s.vcyc do
    mm:=mono(v.monomial); c:=mm[1]; A:=M*mm[2];
    r.C:=r.C*v.pol.coeff*c^v.pol.valuation;
    r.E:=r.E+A*v.pol.valuation;
    for j in v.pol.vcyc do
      Add(r.f,[c,A,E(Denominator(j[1]))^Numerator(j[1]),j[2]]);
    od;
  od;
  return r;
end;;

# denominators appearing in the q-exponents, so we know which root of q is needed
dens:=function(s)
  local d,v;
  d:=[Denominator(mono(s.factor)[2])];
  for v in s.vcyc do Add(d,Denominator(mono(v.monomial)[2])); od;
  return Lcm(d);
end;;

# Order of vanishing at x0.  This needs no arithmetic beyond comparing roots of
# unity, so it is cheap; the leading coefficient (a product of ~70 large
# cyclotomic integers) is only ever computed for the handful of characters
# whose order matches the numerator's.
ordat:=function(r,x0)
  local o,t;
  o:=0;
  for t in r.f do if t[1]*x0^t[2]=t[3] then o:=o+t[4]; fi; od;
  return o;
end;;

leadat:=function(r,x0)
  local lead,t,mu;
  lead:=r.C*x0^r.E;
  for t in r.f do
    mu:=t[1]*x0^t[2];
    if mu=t[3] then lead:=lead*(t[2]*mu/x0)^t[4];
    else lead:=lead*(mu-t[3])^t[4]; fi;
  od;
  return lead;
end;;

# plain value at a point where nothing vanishes
valat:=function(r,x0)
  local val,t;
  val:=r.C*x0^r.E;
  for t in r.f do val:=val*(t[1]*x0^t[2]-t[3])^t[4]; od;
  return val;
end;;

# ---- reduction mod a prime --------------------------------------------------
# The "long" sum is the only place a division survives, and dividing two
# 100000-digit cyclotomic integers ninety times is what stalls.  Everything in
# it lies in Q(zeta_N); picking a prime P = 1 mod N and sending zeta_N to an
# element w of order N in F_P turns those divisions into modular inverses.
# A difference that is nonzero mod P is a genuine difference, so an inequality
# found this way is proved, not merely indicated.
minv:=function(x,P) return PowerMod(x mod P,P-2,P); end;;
pw:=function(v,e,P)
  if e>=0 then return PowerMod(v mod P,e,P);
  else return PowerMod(minv(v,P),-e,P); fi;
end;;
redc:=function(z,N,w,P)
  local c,s,j;
  c:=CoeffsCyc(z,N); s:=0;
  for j in [1..N] do
    if c[j]<>0 then
      s:=(s+Numerator(c[j])*minv(Denominator(c[j]),P)*PowerMod(w,j-1,P)) mod P;
    fi;
  od;
  return s mod P;
end;;
mvpev:=function(f,val,P)
  local s,j,e;
  if not (IsRec(f) and IsBound(f.elm)) then return f mod P; fi;
  s:=0;
  for j in [1..Length(f.coeff)] do
    if Length(f.elm[j].elm)=0 then e:=0; else e:=f.elm[j].coeff[1]; fi;
    s:=(s+f.coeff[j]*pw(val,e,P)) mod P;
  od;
  return s mod P;
end;;

W:=ComplexReflectionGroup(SPECHERE);;
degrees:=ReflectionDegrees(W);; n:=W.nbGeneratingReflections;; h:=Maximum(degrees);;
distRefl:=Reflections(W);;
refl:=Concatenation(List(distRefl,s->List([1..Order(W,s)-1],i->s^i)));;
a:=n*h-Length(refl);; p:=PrimeResidues(h);;
qq:=X(Cyclotomics);; qq.name:="q";; qq:=Mvp(qq);;
H:=Hecke(W,qq);;
fs:=FactorizedSchurElements(H);;
Feg:=FakeDegrees(W,qq);;
ct:=CharTable(W).irreducibles;;
conj:=List(ct,chi->Position(ct,List(chi,ComplexConjugate)));;
per:=List([1..Length(Feg)],i->Feg[conj[i]]);;
ext:=ChevieCharInfo(W).extRefl;;
classes:=[];;
for tt in W.reflections do
  for kk in [1..Order(W,tt)-1] do
    tw:=tt^kk; cl:=ConjugacyClass(W,tw); cp:=Position(ConjugacyClasses(W),cl); cs:=Size(cl);
    if not([cs,cp] in classes) then Add(classes,[cs,cp]); fi;
  od;
od;
Contents:=List(ct,chi->1/chi[1]*Sum(classes,i->i[1]*chi[i[2]]));;

m:=Lcm(List(fs,dens));;          # the root of q CHEVIE needs, found not guessed
L:=h*m;;
at:=List(fs,s->atomise(s,m));;
topA:=at[PositionId(W)];;
nfrac:=Number(fs,s->dens(s)>1);;

# Verification point.  The old scripts used tv = 21/20, which makes
# tv^(m*y*(a+c)) a rational with a ~250000-digit denominator, so every single
# addition in the sums below was a cross-multiplication at that size.  Any
# integer of absolute value <> 1 does the same job: no atom (c*x^A - zeta) can
# vanish at x = 2, because |c*2^A| <> 1 unless A = 0, and a constant atom would
# make the Schur element identically zero.  Multiplying the identity through by
# x^K also clears the negative exponents.  P_W cancels between the two sides.
tv:=2;;
cmax:=Maximum(Contents);;
xv:=tv^h;;                       # the x-point;  q = x^m = tv^(h*m)
fegv:=List(per,f->ScalMvp(Value(f,["q",xv^m])));;

# the prime, and the images of every constant that occurs in the atoms
N:=Lcm(Concatenation([L],List(at,r->Lcm(Concatenation([1],
     List(r.f,t->Lcm(NofCyc(t[1]),NofCyc(t[3]))),[NofCyc(r.C)])))));;
P:=N*(QuoInt(PBASE,N)+1)+1;;
while not IsPrime(P) do P:=P+N; od;
w:=PowerMod(PrimitiveRootMod(P),(P-1)/N,P);;
csts:=Set(Concatenation(List(at,r->Concatenation(
     Concatenation(List(r.f,t->[t[1],t[3]])),[r.C]))));;
cred:=List(csts,z->redc(z,N,w,P));;
rd:=z->cred[Position(csts,z)];;
xP:=PowerMod(2,h,P);;
sP:=List(at,function(r) local v,t;
    v:=rd(r.C)*pw(xP,r.E,P) mod P;
    for t in r.f do v:=v*PowerMod((rd(t[1])*pw(xP,t[2],P)-rd(t[3])) mod P,t[4],P) mod P; od;
    return v; end);;
topP:=sP[PositionId(W)];;
degP:=List(sP,v->topP*minv(v,P) mod P);;
badP:=Number(sP,v->v=0);;

degZall:=[];; prop2:=[];; longok:=[];; shortok:=[];; twists:=[];;
for y in p do
  x0:=E(L)^y;
  z:=E(h)^y;
  ot:=ordat(topA,x0);
  otl:=leadat(topA,x0);
  dz:=List(at,function(r) local b;
     b:=ordat(r,x0);
     if ot>b then return 0;
     elif ot=b then return otl/leadat(r,x0);
     else return "POLE"; fi; end);
  Add(degZall,dz);
  tw:=List(ext,j->Position(ct,List(ct[j],x->GaloisCyc(x,y))));
  Add(twists,tw);
  Add(prop2,ForAll([1..Length(dz)],i->
     (i in tw and dz[i]=(-1)^(Position(tw,i)-1)) or (not i in tw and dz[i]=0)));
  nums:=List(degrees,d->y+((y*(d-1)) mod h));
  K:=Maximum(m*y*(a+cmax),h*m*n*y);
  rhs:=tv^(K-h*m*n*y)*Product(nums,mm->(1-tv^(h*m*mm)));
  Add(shortok,Sum([1..Length(Contents)],
      i->tv^(K-m*y*(a+Contents[i]))*fegv[i]*dz[i])=rhs);
  zP:=PowerMod(w,(N/h)*y,P);
  fzP:=List(per,f->mvpev(f,zP,P));
  rhsP:=pw(2,K-h*m*n*y,P)*Product(nums,mm->(1-pw(2,h*m*mm,P)) mod P) mod P;
  Add(longok,Sum([1..Length(Contents)],
      i->pw(2,K-m*y*(a+Contents[i]),P)*degP[i] mod P*fzP[i] mod P) mod P=rhsP mod P);
od;

PrintTo("/tmp/fa_KEYHERE.txt","{\"key\":\"KEYHERE\",\"m\":",m,
  ",\"n\":",n,",\"h\":",h,",\"a\":",a,",\"degrees\":",degrees,",\"p\":",p,
  ",\"nchars\":",Length(ct),",\"frac\":",nfrac,",\"root\":",m,
  ",\"chi1\":",List(ct,c->c[1]),",\"contents\":",Contents,
  ",\"prop2\":",Number(prop2,x->x=true),
  ",\"long\":",Number(longok,x->x=true),",\"short\":",Number(shortok,x->x=true),
  ",\"ncase\":",Length(p),",\"prime\":",P,",\"badP\":",badP,",\"extRefl\":",ext,",\"twist\":",twists,
  ",\"degZ\":",degZall,",\"twfeg\":[");
for jj in [1..Length(p)] do
  AppendTo("/tmp/fa_KEYHERE.txt","[");
  for i in [1..Length(twists[jj])] do
    AppendTo("/tmp/fa_KEYHERE.txt","\"",per[twists[jj][i]],"\"");
    if i<Length(twists[jj]) then AppendTo("/tmp/fa_KEYHERE.txt",","); fi;
  od;
  AppendTo("/tmp/fa_KEYHERE.txt","]");
  if jj<Length(p) then AppendTo("/tmp/fa_KEYHERE.txt",","); fi;
od;
AppendTo("/tmp/fa_KEYHERE.txt","]}\n");
quit;
GAPEOF
sed -i "s/SPECHERE/$SPEC/; s/KEYHERE/$KEY/g; s/PBASE/${PBASE:-1000000000}/" /tmp/fa_$KEY.gap
timeout 3600 ./bin/gap.linux -l /home/claude/gap3/lib/ -m 512m -b -q < /tmp/fa_$KEY.gap >/dev/null 2>&1
tr -d '\n\\ ' < /tmp/fa_$KEY.txt | grep -o '{"key".*}'
echo
