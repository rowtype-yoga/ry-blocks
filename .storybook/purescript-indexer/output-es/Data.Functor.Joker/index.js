import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
const Joker = x => x;
const showJoker = dictShow => ({show: v => "(Joker " + (dictShow.show(v) + ")")});
const profunctorJoker = dictFunctor => ({dimap: v => g => v1 => dictFunctor.map(g)(v1)});
const ordJoker = dictOrd => dictOrd;
const newtypeJoker = {Coercible0: () => undefined};
const hoistJoker = f => v => f(v);
const functorJoker = dictFunctor => ({map: f => v => dictFunctor.map(f)(v)});
const eqJoker = dictEq => dictEq;
const choiceJoker = dictFunctor => {
  const profunctorJoker1 = {dimap: v => g => v1 => dictFunctor.map(g)(v1)};
  return {left: v => dictFunctor.map(Data$dEither.Left)(v), right: v => dictFunctor.map(Data$dEither.Right)(v), Profunctor0: () => profunctorJoker1};
};
const bifunctorJoker = dictFunctor => ({bimap: v => g => v1 => dictFunctor.map(g)(v1)});
const biapplyJoker = dictApply => {
  const $1 = dictApply.Functor0();
  const bifunctorJoker1 = {bimap: v => g => v1 => $1.map(g)(v1)};
  return {biapply: v => v1 => dictApply.apply(v)(v1), Bifunctor0: () => bifunctorJoker1};
};
const biapplicativeJoker = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const $2 = $1.Functor0();
  const bifunctorJoker1 = {bimap: v => g => v1 => $2.map(g)(v1)};
  const biapplyJoker1 = {biapply: v => v1 => $1.apply(v)(v1), Bifunctor0: () => bifunctorJoker1};
  return {bipure: v => b => dictApplicative.pure(b), Biapply0: () => biapplyJoker1};
};
const applyJoker = dictApply => {
  const $1 = dictApply.Functor0();
  const functorJoker1 = {map: f => v => $1.map(f)(v)};
  return {apply: v => v1 => dictApply.apply(v)(v1), Functor0: () => functorJoker1};
};
const bindJoker = dictBind => {
  const $1 = dictBind.Apply0();
  const $2 = $1.Functor0();
  const functorJoker1 = {map: f => v => $2.map(f)(v)};
  const applyJoker1 = {apply: v => v1 => $1.apply(v)(v1), Functor0: () => functorJoker1};
  return {bind: v => amb => dictBind.bind(v)(x => amb(x)), Apply0: () => applyJoker1};
};
const applicativeJoker = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const $2 = $1.Functor0();
  const functorJoker1 = {map: f => v => $2.map(f)(v)};
  const applyJoker1 = {apply: v => v1 => $1.apply(v)(v1), Functor0: () => functorJoker1};
  return {pure: x => dictApplicative.pure(x), Apply0: () => applyJoker1};
};
const monadJoker = dictMonad => {
  const $1 = dictMonad.Applicative0();
  const $2 = $1.Apply0();
  const $3 = $2.Functor0();
  const functorJoker1 = {map: f => v => $3.map(f)(v)};
  const applyJoker1 = {apply: v => v1 => $2.apply(v)(v1), Functor0: () => functorJoker1};
  const applicativeJoker1 = {pure: x => $1.pure(x), Apply0: () => applyJoker1};
  const $7 = dictMonad.Bind1();
  const $8 = $7.Apply0();
  const $9 = $8.Functor0();
  const functorJoker1$1 = {map: f => v => $9.map(f)(v)};
  const applyJoker1$1 = {apply: v => v1 => $8.apply(v)(v1), Functor0: () => functorJoker1$1};
  const bindJoker1 = {bind: v => amb => $7.bind(v)(x => amb(x)), Apply0: () => applyJoker1$1};
  return {Applicative0: () => applicativeJoker1, Bind1: () => bindJoker1};
};
export {
  Joker,
  applicativeJoker,
  applyJoker,
  biapplicativeJoker,
  biapplyJoker,
  bifunctorJoker,
  bindJoker,
  choiceJoker,
  eqJoker,
  functorJoker,
  hoistJoker,
  monadJoker,
  newtypeJoker,
  ordJoker,
  profunctorJoker,
  showJoker
};
