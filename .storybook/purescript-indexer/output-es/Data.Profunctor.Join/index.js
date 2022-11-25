import * as $runtime from "../runtime.js";
const Join = x => x;
const showJoin = dictShow => ({show: v => "(Join " + (dictShow.show(v) + ")")});
const semigroupJoin = dictSemigroupoid => ({append: v => v1 => dictSemigroupoid.compose(v)(v1)});
const ordJoin = dictOrd => dictOrd;
const newtypeJoin = {Coercible0: () => undefined};
const monoidJoin = dictCategory => {
  const $1 = dictCategory.Semigroupoid0();
  const semigroupJoin1 = {append: v => v1 => $1.compose(v)(v1)};
  return {mempty: dictCategory.identity, Semigroup0: () => semigroupJoin1};
};
const invariantJoin = dictProfunctor => ({imap: f => g => v => dictProfunctor.dimap(g)(f)(v)});
const eqJoin = dictEq => dictEq;
export {Join, eqJoin, invariantJoin, monoidJoin, newtypeJoin, ordJoin, semigroupJoin, showJoin};
