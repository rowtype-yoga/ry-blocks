import * as $runtime from "../runtime.js";
import * as Data$dBifunctor from "../Data.Bifunctor/index.js";
import * as Data$dProfunctor from "../Data.Profunctor/index.js";
const Flip = x => x;
const showFlip = dictShow => ({show: v => "(Flip " + (dictShow.show(v) + ")")});
const semigroupoidFlip = dictSemigroupoid => ({compose: v => v1 => dictSemigroupoid.compose(v1)(v)});
const ordFlip = dictOrd => dictOrd;
const newtypeFlip = {Coercible0: () => undefined};
const functorFlip = dictBifunctor => ({map: f => v => dictBifunctor.bimap(f)(Data$dBifunctor.identity)(v)});
const eqFlip = dictEq => dictEq;
const contravariantFlip = dictProfunctor => ({cmap: f => v => dictProfunctor.dimap(f)(Data$dProfunctor.identity)(v)});
const categoryFlip = dictCategory => {
  const $1 = dictCategory.Semigroupoid0();
  const semigroupoidFlip1 = {compose: v => v1 => $1.compose(v1)(v)};
  return {identity: dictCategory.identity, Semigroupoid0: () => semigroupoidFlip1};
};
const bifunctorFlip = dictBifunctor => ({bimap: f => g => v => dictBifunctor.bimap(g)(f)(v)});
const biapplyFlip = dictBiapply => {
  const $1 = dictBiapply.Bifunctor0();
  const bifunctorFlip1 = {bimap: f => g => v => $1.bimap(g)(f)(v)};
  return {biapply: v => v1 => dictBiapply.biapply(v)(v1), Bifunctor0: () => bifunctorFlip1};
};
const biapplicativeFlip = dictBiapplicative => {
  const $1 = dictBiapplicative.Biapply0();
  const $2 = $1.Bifunctor0();
  const bifunctorFlip1 = {bimap: f => g => v => $2.bimap(g)(f)(v)};
  const biapplyFlip1 = {biapply: v => v1 => $1.biapply(v)(v1), Bifunctor0: () => bifunctorFlip1};
  return {bipure: a => b => dictBiapplicative.bipure(b)(a), Biapply0: () => biapplyFlip1};
};
export {Flip, biapplicativeFlip, biapplyFlip, bifunctorFlip, categoryFlip, contravariantFlip, eqFlip, functorFlip, newtypeFlip, ordFlip, semigroupoidFlip, showFlip};
