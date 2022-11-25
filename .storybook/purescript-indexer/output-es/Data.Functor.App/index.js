import * as $runtime from "../runtime.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const App = x => x;
const showApp = dictShow => ({show: v => "(App " + (dictShow.show(v) + ")")});
const semigroupApp = dictApply => {
  const map = dictApply.Functor0().map;
  return dictSemigroup => ({append: v => v1 => dictApply.apply(map(dictSemigroup.append)(v))(v1)});
};
const plusApp = dictPlus => dictPlus;
const newtypeApp = {Coercible0: () => undefined};
const monoidApp = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const map = $1.Functor0().map;
  return dictMonoid => {
    const $4 = dictMonoid.Semigroup0();
    const semigroupApp2 = {append: v => v1 => $1.apply(map($4.append)(v))(v1)};
    return {mempty: dictApplicative.pure(dictMonoid.mempty), Semigroup0: () => semigroupApp2};
  };
};
const monadPlusApp = dictMonadPlus => dictMonadPlus;
const monadApp = dictMonad => dictMonad;
const lazyApp = dictLazy => dictLazy;
const hoistLowerApp = Unsafe$dCoerce.unsafeCoerce;
const hoistLiftApp = Unsafe$dCoerce.unsafeCoerce;
const hoistApp = f => v => f(v);
const functorApp = dictFunctor => dictFunctor;
const extendApp = dictExtend => dictExtend;
const eqApp = dictEq1 => dictEq => {
  const eq11 = dictEq1.eq1(dictEq);
  return {eq: x => y => eq11(x)(y)};
};
const ordApp = dictOrd1 => {
  const $1 = dictOrd1.Eq10();
  return dictOrd => {
    const compare11 = dictOrd1.compare1(dictOrd);
    const eq11 = $1.eq1(dictOrd.Eq0());
    const eqApp2 = {eq: x => y => eq11(x)(y)};
    return {compare: x => y => compare11(x)(y), Eq0: () => eqApp2};
  };
};
const eq1App = dictEq1 => ({eq1: dictEq => dictEq1.eq1(dictEq)});
const ord1App = dictOrd1 => {
  const $1 = dictOrd1.Eq10();
  const eq1App1 = {eq1: dictEq => $1.eq1(dictEq)};
  return {compare1: dictOrd => dictOrd1.compare1(dictOrd), Eq10: () => eq1App1};
};
const comonadApp = dictComonad => dictComonad;
const bindApp = dictBind => dictBind;
const applyApp = dictApply => dictApply;
const applicativeApp = dictApplicative => dictApplicative;
const alternativeApp = dictAlternative => dictAlternative;
const altApp = dictAlt => dictAlt;
export {
  App,
  altApp,
  alternativeApp,
  applicativeApp,
  applyApp,
  bindApp,
  comonadApp,
  eq1App,
  eqApp,
  extendApp,
  functorApp,
  hoistApp,
  hoistLiftApp,
  hoistLowerApp,
  lazyApp,
  monadApp,
  monadPlusApp,
  monoidApp,
  newtypeApp,
  ord1App,
  ordApp,
  plusApp,
  semigroupApp,
  showApp
};
