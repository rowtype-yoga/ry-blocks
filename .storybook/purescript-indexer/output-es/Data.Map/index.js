import * as $runtime from "../runtime.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const SemigroupMap = x => x;
const traversableWithIndexSemigroupMap = Data$dMap$dInternal.traversableWithIndexMap;
const traversableSemigroupMap = Data$dMap$dInternal.traversableMap;
const showSemigroupMap = dictShow => dictShow1 => Data$dMap$dInternal.showMap(dictShow)(dictShow1);
const semigroupSemigroupMap = dictOrd => dictSemigroup => ({append: v => v1 => Data$dMap$dInternal.unionWith(dictOrd)(dictSemigroup.append)(v)(v1)});
const plusSemigroupMap = dictOrd => ({empty: Data$dMap$dInternal.Leaf, Alt0: () => ({alt: Data$dMap$dInternal.union(dictOrd), Functor0: () => Data$dMap$dInternal.functorMap})});
const ordSemigroupMap = dictOrd => Data$dMap$dInternal.ordMap(dictOrd);
const ord1SemigroupMap = dictOrd => Data$dMap$dInternal.ord1Map(dictOrd);
const newtypeSemigroupMap = {Coercible0: () => undefined};
const monoidSemigroupMap = dictOrd => dictSemigroup => {
  const semigroupSemigroupMap2 = {append: v => v1 => Data$dMap$dInternal.unionWith(dictOrd)(dictSemigroup.append)(v)(v1)};
  return {mempty: Data$dMap$dInternal.Leaf, Semigroup0: () => semigroupSemigroupMap2};
};
const keys = x => Data$dMap$dInternal.functorMap.map(v => Data$dUnit.unit)(x);
const functorWithIndexSemigroupMap = Data$dMap$dInternal.functorWithIndexMap;
const functorSemigroupMap = Data$dMap$dInternal.functorMap;
const foldableWithIndexSemigroupMap = Data$dMap$dInternal.foldableWithIndexMap;
const foldableSemigroupMap = Data$dMap$dInternal.foldableMap;
const eqSemigroupMap = dictEq => dictEq1 => Data$dMap$dInternal.eqMap(dictEq)(dictEq1);
const eq1SemigroupMap = dictEq => ({eq1: dictEq1 => Data$dMap$dInternal.eqMap(dictEq)(dictEq1).eq});
const bindSemigroupMap = dictOrd => Data$dMap$dInternal.bindMap(dictOrd);
const applySemigroupMap = dictOrd => ({apply: Data$dMap$dInternal.intersectionWith(dictOrd)(Data$dMap$dInternal.identity), Functor0: () => Data$dMap$dInternal.functorMap});
const altSemigroupMap = dictOrd => ({alt: Data$dMap$dInternal.union(dictOrd), Functor0: () => Data$dMap$dInternal.functorMap});
export {
  SemigroupMap,
  altSemigroupMap,
  applySemigroupMap,
  bindSemigroupMap,
  eq1SemigroupMap,
  eqSemigroupMap,
  foldableSemigroupMap,
  foldableWithIndexSemigroupMap,
  functorSemigroupMap,
  functorWithIndexSemigroupMap,
  keys,
  monoidSemigroupMap,
  newtypeSemigroupMap,
  ord1SemigroupMap,
  ordSemigroupMap,
  plusSemigroupMap,
  semigroupSemigroupMap,
  showSemigroupMap,
  traversableSemigroupMap,
  traversableWithIndexSemigroupMap
};
