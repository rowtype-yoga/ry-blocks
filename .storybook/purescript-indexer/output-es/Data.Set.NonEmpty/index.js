import * as $runtime from "../runtime.js";
import * as Data$dArray$dNonEmpty$dInternal from "../Data.Array.NonEmpty.Internal/index.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dSet from "../Data.Set/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable1 from "../Data.Unfoldable1/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const toUnfoldable2 = /* #__PURE__ */ Data$dSet.toUnfoldable(Data$dList$dTypes.unfoldableList);
const unionSet = dictOrd => s1 => v => Data$dMap$dInternal.unionWith(dictOrd)(Data$dFunction.const)(s1)(v);
const toUnfoldable1 = dictUnfoldable1 => v => dictUnfoldable1.unfoldr1(v1 => {
  if (v1.tag === "Cons") {
    if (v1._2.tag === "Nil") { return Data$dTuple.$Tuple(v1._1, Data$dMaybe.Nothing); }
    return Data$dTuple.$Tuple(v1._1, Data$dMaybe.$Maybe("Just", v1._2));
  }
  $runtime.fail();
})(toUnfoldable2(v));
const toUnfoldable = dictUnfoldable => Data$dSet.toUnfoldable(dictUnfoldable);
const toSet = v => v;
const subset = dictOrd => v => v1 => Data$dSet.difference(dictOrd)(v)(v1).tag === "Leaf";
const size = v => Data$dMap$dInternal.size(v);
const singleton = a => Data$dMap$dInternal.$Map("Two", Data$dMap$dInternal.Leaf, a, Data$dUnit.unit, Data$dMap$dInternal.Leaf);
const showNonEmptySet = dictShow => {
  const show = Data$dArray$dNonEmpty$dInternal.showNonEmptyArray(dictShow).show;
  return {show: s => "(fromFoldable1 " + (show(toUnfoldable1(Data$dUnfoldable1.unfoldable1Array)(s)) + ")")};
};
const semigroupNonEmptySet = dictOrd => ({append: Data$dSet.union(dictOrd)});
const properSubset = dictOrd => Data$dSet.properSubset(dictOrd);
const ordNonEmptySet = dictOrd => Data$dSet.ordSet(dictOrd);
const ord1NonEmptySet = Data$dSet.ord1Set;
const min = v => {
  const $1 = Data$dMap$dInternal.findMin(v);
  if ($1.tag === "Just") { return $1._1.key; }
  $runtime.fail();
};
const member = dictOrd => a => v => {
  const $3 = Data$dMap$dInternal.lookup(dictOrd)(a)(v);
  if ($3.tag === "Nothing") { return false; }
  if ($3.tag === "Just") { return true; }
  $runtime.fail();
};
const max = v => {
  const $1 = Data$dMap$dInternal.findMax(v);
  if ($1.tag === "Just") { return $1._1.key; }
  $runtime.fail();
};
const mapMaybe = dictOrd => f => v => Data$dSet.mapMaybe(dictOrd)(f)(v);
const map = dictOrd => f => v => Data$dSet.map(dictOrd)(f)(v);
const insert = dictOrd => a => v => Data$dMap$dInternal.insert(dictOrd)(a)(Data$dUnit.unit)(v);
const fromSet = s => {
  if (s.tag === "Leaf") { return Data$dMaybe.Nothing; }
  return Data$dMaybe.$Maybe("Just", s);
};
const intersection = dictOrd => {
  const intersection1 = Data$dSet.intersection(dictOrd);
  return v => v1 => {
    const $4 = intersection1(v)(v1);
    if ($4.tag === "Leaf") { return Data$dMaybe.Nothing; }
    return Data$dMaybe.$Maybe("Just", $4);
  };
};
const fromFoldable1 = dictFoldable1 => dictOrd => dictFoldable1.foldMap1({append: Data$dSet.union(dictOrd)})(singleton);
const fromFoldable = dictFoldable => dictOrd => {
  const $2 = dictFoldable.foldl(m => a => Data$dMap$dInternal.insert(dictOrd)(a)(Data$dUnit.unit)(m))(Data$dMap$dInternal.Leaf);
  return x => {
    const $4 = $2(x);
    if ($4.tag === "Leaf") { return Data$dMaybe.Nothing; }
    return Data$dMaybe.$Maybe("Just", $4);
  };
};
const foldableNonEmptySet = Data$dSet.foldableSet;
const foldable1NonEmptySet = {
  foldMap1: dictSemigroup => {
    const foldMap11 = Data$dList$dTypes.foldable1NonEmptyList.foldMap1(dictSemigroup);
    return f => {
      const $3 = foldMap11(f);
      return x => $3(toUnfoldable1(Data$dList$dTypes.unfoldable1NonEmptyList)(x));
    };
  },
  foldr1: f => {
    const $1 = Data$dList$dTypes.foldable1NonEmptyList.foldr1(f);
    return x => $1(toUnfoldable1(Data$dList$dTypes.unfoldable1NonEmptyList)(x));
  },
  foldl1: f => {
    const $1 = Data$dList$dTypes.foldable1NonEmptyList.foldl1(f);
    return x => $1(toUnfoldable1(Data$dList$dTypes.unfoldable1NonEmptyList)(x));
  },
  Foldable0: () => Data$dSet.foldableSet
};
const filter = dictOrd => Data$dSet.filter(dictOrd);
const eqNonEmptySet = dictEq => {
  const eq = Data$dMap$dInternal.eqMap(dictEq)(Data$dEq.eqUnit).eq;
  return {eq: v => v1 => eq(v)(v1)};
};
const eq1NonEmptySet = Data$dSet.eq1Set;
const difference = dictOrd => v => v1 => {
  const $3 = Data$dSet.difference(dictOrd)(v)(v1);
  if ($3.tag === "Leaf") { return Data$dMaybe.Nothing; }
  return Data$dMaybe.$Maybe("Just", $3);
};
const $$delete = dictOrd => a => v => {
  const $3 = Data$dMap$dInternal.delete(dictOrd)(a)(v);
  if ($3.tag === "Leaf") { return Data$dMaybe.Nothing; }
  return Data$dMaybe.$Maybe("Just", $3);
};
const cons = dictOrd => a => x => Data$dMap$dInternal.insert(dictOrd)(a)(Data$dUnit.unit)(x);
export {
  cons,
  $$delete as delete,
  difference,
  eq1NonEmptySet,
  eqNonEmptySet,
  filter,
  foldable1NonEmptySet,
  foldableNonEmptySet,
  fromFoldable,
  fromFoldable1,
  fromSet,
  insert,
  intersection,
  map,
  mapMaybe,
  max,
  member,
  min,
  ord1NonEmptySet,
  ordNonEmptySet,
  properSubset,
  semigroupNonEmptySet,
  showNonEmptySet,
  singleton,
  size,
  subset,
  toSet,
  toUnfoldable,
  toUnfoldable1,
  toUnfoldable2,
  unionSet
};
