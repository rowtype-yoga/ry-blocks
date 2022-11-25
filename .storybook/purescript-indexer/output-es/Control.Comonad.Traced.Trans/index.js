// | This module defines the cowriter comonad transformer, `TracedT`.
import * as $runtime from "../runtime.js";
const TracedT = x => x;
const runTracedT = v => v;
const newtypeTracedT = {Coercible0: () => undefined};
const functorTracedT = dictFunctor => ({map: f => v => dictFunctor.map(g => t => f(g(t)))(v)});
const extendTracedT = dictExtend => {
  const Functor0 = dictExtend.Functor0();
  const functorTracedT1 = {map: f => v => Functor0.map(g => t => f(g(t)))(v)};
  return dictSemigroup => ({extend: f => v => dictExtend.extend(w$p => t => f(Functor0.map(h => t$p => h(dictSemigroup.append(t)(t$p)))(w$p)))(v), Functor0: () => functorTracedT1});
};
const comonadTransTracedT = dictMonoid => (
  {
    lower: dictComonad => {
      const map = dictComonad.Extend0().Functor0().map;
      return v => map(f => f(dictMonoid.mempty))(v);
    }
  }
);
const comonadTracedT = dictComonad => {
  const $1 = dictComonad.Extend0();
  const Functor0 = $1.Functor0();
  const functorTracedT1 = {map: f => v => Functor0.map(g => t => f(g(t)))(v)};
  return dictMonoid => {
    const $5 = dictMonoid.Semigroup0();
    const extendTracedT2 = {extend: f => v => $1.extend(w$p => t => f(Functor0.map(h => t$p => h($5.append(t)(t$p)))(w$p)))(v), Functor0: () => functorTracedT1};
    return {extract: v => dictComonad.extract(v)(dictMonoid.mempty), Extend0: () => extendTracedT2};
  };
};
export {TracedT, comonadTracedT, comonadTransTracedT, extendTracedT, functorTracedT, newtypeTracedT, runTracedT};
