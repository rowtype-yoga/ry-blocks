import * as $runtime from "../runtime.js";
const Clown = x => x;
const showClown = dictShow => ({show: v => "(Clown " + (dictShow.show(v) + ")")});
const profunctorClown = dictContravariant => ({dimap: f => v => v1 => dictContravariant.cmap(f)(v1)});
const ordClown = dictOrd => dictOrd;
const newtypeClown = {Coercible0: () => undefined};
const hoistClown = f => v => f(v);
const functorClown = {map: v => v1 => v1};
const eqClown = dictEq => dictEq;
const bifunctorClown = dictFunctor => ({bimap: f => v => v1 => dictFunctor.map(f)(v1)});
const biapplyClown = dictApply => {
  const $1 = dictApply.Functor0();
  const bifunctorClown1 = {bimap: f => v => v1 => $1.map(f)(v1)};
  return {biapply: v => v1 => dictApply.apply(v)(v1), Bifunctor0: () => bifunctorClown1};
};
const biapplicativeClown = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const $2 = $1.Functor0();
  const bifunctorClown1 = {bimap: f => v => v1 => $2.map(f)(v1)};
  const biapplyClown1 = {biapply: v => v1 => $1.apply(v)(v1), Bifunctor0: () => bifunctorClown1};
  return {bipure: a => v => dictApplicative.pure(a), Biapply0: () => biapplyClown1};
};
export {Clown, biapplicativeClown, biapplyClown, bifunctorClown, eqClown, functorClown, hoistClown, newtypeClown, ordClown, profunctorClown, showClown};
