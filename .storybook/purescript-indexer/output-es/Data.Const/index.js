import * as $runtime from "../runtime.js";
const Const = x => x;
const showConst = dictShow => ({show: v => "(Const " + (dictShow.show(v) + ")")});
const semiringConst = dictSemiring => dictSemiring;
const semigroupoidConst = {compose: v => v1 => v1};
const semigroupConst = dictSemigroup => dictSemigroup;
const ringConst = dictRing => dictRing;
const ordConst = dictOrd => dictOrd;
const newtypeConst = {Coercible0: () => undefined};
const monoidConst = dictMonoid => dictMonoid;
const heytingAlgebraConst = dictHeytingAlgebra => dictHeytingAlgebra;
const functorConst = {map: f => m => m};
const invariantConst = {imap: f => v => m => m};
const euclideanRingConst = dictEuclideanRing => dictEuclideanRing;
const eqConst = dictEq => dictEq;
const eq1Const = dictEq => ({eq1: dictEq1 => dictEq.eq});
const ord1Const = dictOrd => {
  const $1 = dictOrd.Eq0();
  return {compare1: dictOrd1 => dictOrd.compare, Eq10: () => ({eq1: dictEq1 => $1.eq})};
};
const commutativeRingConst = dictCommutativeRing => dictCommutativeRing;
const boundedConst = dictBounded => dictBounded;
const booleanAlgebraConst = dictBooleanAlgebra => dictBooleanAlgebra;
const applyConst = dictSemigroup => ({apply: v => v1 => dictSemigroup.append(v)(v1), Functor0: () => functorConst});
const applicativeConst = dictMonoid => {
  const $1 = dictMonoid.Semigroup0();
  const applyConst1 = {apply: v => v1 => $1.append(v)(v1), Functor0: () => functorConst};
  return {pure: v => dictMonoid.mempty, Apply0: () => applyConst1};
};
export {
  Const,
  applicativeConst,
  applyConst,
  booleanAlgebraConst,
  boundedConst,
  commutativeRingConst,
  eq1Const,
  eqConst,
  euclideanRingConst,
  functorConst,
  heytingAlgebraConst,
  invariantConst,
  monoidConst,
  newtypeConst,
  ord1Const,
  ordConst,
  ringConst,
  semigroupConst,
  semigroupoidConst,
  semiringConst,
  showConst
};
