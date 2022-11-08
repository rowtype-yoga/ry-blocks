import * as $runtime from "../runtime.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {defer, force} from "./foreign.js";
const showLazy = dictShow => ({show: x => "(defer \\_ -> " + (dictShow.show(force(x)) + ")")});
const semiringLazy = dictSemiring => (
  {
    add: a => b => defer(v => dictSemiring.add(force(a))(force(b))),
    zero: defer(v => dictSemiring.zero),
    mul: a => b => defer(v => dictSemiring.mul(force(a))(force(b))),
    one: defer(v => dictSemiring.one)
  }
);
const semigroupLazy = dictSemigroup => ({append: a => b => defer(v => dictSemigroup.append(force(a))(force(b)))});
const ringLazy = dictRing => {
  const semiringLazy1 = semiringLazy(dictRing.Semiring0());
  return {sub: a => b => defer(v => dictRing.sub(force(a))(force(b))), Semiring0: () => semiringLazy1};
};
const monoidLazy = dictMonoid => {
  const semigroupLazy1 = semigroupLazy(dictMonoid.Semigroup0());
  return {mempty: defer(v => dictMonoid.mempty), Semigroup0: () => semigroupLazy1};
};
const lazyLazy = {defer: f => defer(v => force(f(Data$dUnit.unit)))};
const functorLazy = {map: f => l => defer(v => f(force(l)))};
const functorWithIndexLazy = {mapWithIndex: f => functorLazy.map(f(Data$dUnit.unit)), Functor0: () => functorLazy};
const invariantLazy = {imap: f => v => functorLazy.map(f)};
const foldableLazy = {foldr: f => z => l => f(force(l))(z), foldl: f => z => l => f(z)(force(l)), foldMap: dictMonoid => f => l => f(force(l))};
const foldableWithIndexLazy = {
  foldrWithIndex: f => foldableLazy.foldr(f(Data$dUnit.unit)),
  foldlWithIndex: f => foldableLazy.foldl(f(Data$dUnit.unit)),
  foldMapWithIndex: dictMonoid => f => foldableLazy.foldMap(dictMonoid)(f(Data$dUnit.unit)),
  Foldable0: () => foldableLazy
};
const traversableLazy = {
  traverse: dictApplicative => {
    const map1 = dictApplicative.Apply0().Functor0().map;
    return f => l => map1(x => defer(v => x))(f(force(l)));
  },
  sequence: dictApplicative => {
    const map1 = dictApplicative.Apply0().Functor0().map;
    return l => map1(x => defer(v => x))(force(l));
  },
  Functor0: () => functorLazy,
  Foldable1: () => foldableLazy
};
const traversableWithIndexLazy = {
  traverseWithIndex: dictApplicative => {
    const traverse1 = traversableLazy.traverse(dictApplicative);
    return f => traverse1(f(Data$dUnit.unit));
  },
  FunctorWithIndex0: () => functorWithIndexLazy,
  FoldableWithIndex1: () => foldableWithIndexLazy,
  Traversable2: () => traversableLazy
};
const foldable1Lazy = {foldMap1: dictSemigroup => f => l => f(force(l)), foldr1: v => l => force(l), foldl1: v => l => force(l), Foldable0: () => foldableLazy};
const traversable1Lazy = {
  traverse1: dictApply => {
    const map1 = dictApply.Functor0().map;
    return f => l => map1(x => defer(v => x))(f(force(l)));
  },
  sequence1: dictApply => {
    const map1 = dictApply.Functor0().map;
    return l => map1(x => defer(v => x))(force(l));
  },
  Foldable10: () => foldable1Lazy,
  Traversable1: () => traversableLazy
};
const extendLazy = {extend: f => x => defer(v => f(x)), Functor0: () => functorLazy};
const eqLazy = dictEq => ({eq: x => y => dictEq.eq(force(x))(force(y))});
const ordLazy = dictOrd => {
  const $1 = dictOrd.Eq0();
  const eqLazy1 = {eq: x => y => $1.eq(force(x))(force(y))};
  return {compare: x => y => dictOrd.compare(force(x))(force(y)), Eq0: () => eqLazy1};
};
const eq1Lazy = {eq1: dictEq => x => y => dictEq.eq(force(x))(force(y))};
const ord1Lazy = {compare1: dictOrd => ordLazy(dictOrd).compare, Eq10: () => eq1Lazy};
const comonadLazy = {extract: force, Extend0: () => extendLazy};
const commutativeRingLazy = dictCommutativeRing => {
  const ringLazy1 = ringLazy(dictCommutativeRing.Ring0());
  return {Ring0: () => ringLazy1};
};
const euclideanRingLazy = dictEuclideanRing => {
  const ringLazy1 = ringLazy(dictEuclideanRing.CommutativeRing0().Ring0());
  return {
    degree: x => dictEuclideanRing.degree(force(x)),
    div: a => b => defer(v => dictEuclideanRing.div(force(a))(force(b))),
    mod: a => b => defer(v => dictEuclideanRing.mod(force(a))(force(b))),
    CommutativeRing0: () => ({Ring0: () => ringLazy1})
  };
};
const boundedLazy = dictBounded => {
  const ordLazy1 = ordLazy(dictBounded.Ord0());
  return {top: defer(v => dictBounded.top), bottom: defer(v => dictBounded.bottom), Ord0: () => ordLazy1};
};
const applyLazy = {apply: f => x => defer(v => force(f)(force(x))), Functor0: () => functorLazy};
const bindLazy = {bind: l => f => defer(v => force(f(force(l)))), Apply0: () => applyLazy};
const heytingAlgebraLazy = dictHeytingAlgebra => (
  {
    ff: defer(v => dictHeytingAlgebra.ff),
    tt: defer(v => dictHeytingAlgebra.tt),
    implies: a => b => {
      const $3 = defer(v => dictHeytingAlgebra.implies(force(a)));
      return defer(v => force($3)(force(b)));
    },
    conj: a => b => {
      const $3 = defer(v => dictHeytingAlgebra.conj(force(a)));
      return defer(v => force($3)(force(b)));
    },
    disj: a => b => {
      const $3 = defer(v => dictHeytingAlgebra.disj(force(a)));
      return defer(v => force($3)(force(b)));
    },
    not: a => defer(v => dictHeytingAlgebra.not(force(a)))
  }
);
const booleanAlgebraLazy = dictBooleanAlgebra => {
  const heytingAlgebraLazy1 = heytingAlgebraLazy(dictBooleanAlgebra.HeytingAlgebra0());
  return {HeytingAlgebra0: () => heytingAlgebraLazy1};
};
const applicativeLazy = {pure: a => defer(v => a), Apply0: () => applyLazy};
const monadLazy = {Applicative0: () => applicativeLazy, Bind1: () => bindLazy};
export {
  applicativeLazy,
  applyLazy,
  bindLazy,
  booleanAlgebraLazy,
  boundedLazy,
  commutativeRingLazy,
  comonadLazy,
  eq1Lazy,
  eqLazy,
  euclideanRingLazy,
  extendLazy,
  foldable1Lazy,
  foldableLazy,
  foldableWithIndexLazy,
  functorLazy,
  functorWithIndexLazy,
  heytingAlgebraLazy,
  invariantLazy,
  lazyLazy,
  monadLazy,
  monoidLazy,
  ord1Lazy,
  ordLazy,
  ringLazy,
  semigroupLazy,
  semiringLazy,
  showLazy,
  traversable1Lazy,
  traversableLazy,
  traversableWithIndexLazy
};
export * from "./foreign.js";
