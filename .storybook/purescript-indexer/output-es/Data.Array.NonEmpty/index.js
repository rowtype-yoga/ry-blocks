import * as $runtime from "../runtime.js";
import * as Control$dBind from "../Control.Bind/index.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dArray$dNonEmpty$dInternal from "../Data.Array.NonEmpty.Internal/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dSemigroup$dFoldable from "../Data.Semigroup.Foldable/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const max = x => y => {
  const v = Data$dOrd.ordInt.compare(x)(y);
  if (v.tag === "LT") { return y; }
  if (v.tag === "EQ") { return x; }
  if (v.tag === "GT") { return x; }
  $runtime.fail();
};
const intercalate1 = dictSemigroup => {
  const foldMap12 = Data$dArray$dNonEmpty$dInternal.foldable1NonEmptyArray.foldMap1({append: v => v1 => j => dictSemigroup.append(v(j))(dictSemigroup.append(j)(v1(j)))});
  return a => foldable => foldMap12(x => v => x)(foldable)(a);
};
const transpose = x => Data$dArray.transpose(x);
const toArray = v => v;
const unionBy$p = eq => xs => x => Data$dArray.unionBy(eq)(xs)(x);
const union$p = dictEq => unionBy$p(dictEq.eq);
const unionBy = eq => xs => x => Data$dArray.unionBy(eq)(xs)(x);
const union = dictEq => unionBy(dictEq.eq);
const unzip = x => {
  const $1 = Data$dArray.unzip(x);
  return Data$dTuple.$Tuple($1._1, $1._2);
};
const updateAt = i => x => Data$dArray.updateAt(i)(x);
const zip = xs => ys => Data$dArray.zip(xs)(ys);
const zipWith = f => xs => ys => Data$dArray.zipWith(f)(xs)(ys);
const zipWithA = dictApplicative => Data$dArray.zipWithA(dictApplicative);
const splitAt = i => xs => Data$dArray.splitAt(i)(xs);
const some = dictAlternative => Data$dArray.some(dictAlternative);
const snoc$p = xs => x => Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([x]))(xs));
const snoc = xs => x => Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([x]))(xs));
const singleton = x => [x];
const replicate = i => x => Data$dArray.replicate(max(1)(i))(x);
const range = x => y => Data$dArray.range(x)(y);
const modifyAt = i => f => x => Data$dArray.modifyAt(i)(f)(x);
const intersectBy$p = eq => xs => Data$dArray.intersectBy(eq)(xs);
const intersectBy = eq => xs => x => Data$dArray.intersectBy(eq)(xs)(x);
const intersect$p = dictEq => intersectBy$p(dictEq.eq);
const intersect = dictEq => intersectBy(dictEq.eq);
const intercalate = dictSemigroup => intercalate1(dictSemigroup);
const insertAt = i => x => Data$dArray.insertAt(i)(x);
const fromFoldable1 = dictFoldable1 => Data$dArray.fromFoldableImpl(dictFoldable1.Foldable0().foldr);
const fromArray = xs => {
  if (xs.length > 0) { return Data$dMaybe.$Maybe("Just", xs); }
  return Data$dMaybe.Nothing;
};
const fromFoldable = dictFoldable => {
  const $1 = Data$dArray.fromFoldableImpl(dictFoldable.foldr);
  return x => {
    const $3 = $1(x);
    if ($3.length > 0) { return Data$dMaybe.$Maybe("Just", $3); }
    return Data$dMaybe.Nothing;
  };
};
const transpose$p = x => {
  const $1 = Data$dArray.transpose(x);
  if ($1.length > 0) { return Data$dMaybe.$Maybe("Just", $1); }
  return Data$dMaybe.Nothing;
};
const foldr1 = Data$dArray$dNonEmpty$dInternal.foldr1Impl;
const foldl1 = Data$dArray$dNonEmpty$dInternal.foldl1Impl;
const foldMap1 = dictSemigroup => Data$dArray$dNonEmpty$dInternal.foldable1NonEmptyArray.foldMap1(dictSemigroup);
const fold1 = dictSemigroup => Data$dArray$dNonEmpty$dInternal.foldable1NonEmptyArray.foldMap1(dictSemigroup)(Data$dSemigroup$dFoldable.identity);
const difference$p = dictEq => Data$dFoldable.foldrArray(Data$dArray.delete(dictEq));
const cons$p = x => xs => Data$dSemigroup.concatArray([x])(xs);
const fromNonEmpty = v => Data$dSemigroup.concatArray([v._1])(v._2);
const concatMap = b => a => Control$dBind.arrayBind(a)(b);
const concat = /* #__PURE__ */ (() => {
  const $0 = Data$dFunctor.arrayMap(toArray);
  return x => Data$dArray.concat($0(x));
})();
const appendArray = xs => ys => Data$dSemigroup.concatArray(xs)(ys);
const alterAt = i => f => x => Data$dArray.alterAt(i)(f)(x);
const head = x => {
  const $1 = Data$dArray.index(x)(0);
  if ($1.tag === "Just") { return $1._1; }
  $runtime.fail();
};
const init = x => {
  const $1 = Data$dArray.init(x);
  if ($1.tag === "Just") { return $1._1; }
  $runtime.fail();
};
const last = x => {
  const $1 = Data$dArray.index(x)(x.length - 1 | 0);
  if ($1.tag === "Just") { return $1._1; }
  $runtime.fail();
};
const tail = x => {
  const $1 = Data$dArray.tail(x);
  if ($1.tag === "Just") { return $1._1; }
  $runtime.fail();
};
const uncons = x => {
  const $1 = Data$dArray.uncons(x);
  if ($1.tag === "Just") { return $1._1; }
  $runtime.fail();
};
const toNonEmpty = x => {
  const $1 = Data$dArray.uncons(x);
  const $2 = (() => {
    if ($1.tag === "Just") { return $1._1; }
    $runtime.fail();
  })();
  return Data$dNonEmpty.$NonEmpty($2.head, $2.tail);
};
const unsnoc = x => {
  const $1 = Data$dArray.unsnoc(x);
  if ($1.tag === "Just") { return $1._1; }
  $runtime.fail();
};
const all = p => Data$dArray.all(p);
const any = p => Data$dArray.any(p);
const catMaybes = x => Data$dArray.mapMaybe(x$1 => x$1)(x);
const $$delete = dictEq => x => x$1 => Data$dArray.deleteBy(dictEq.eq)(x)(x$1);
const deleteAt = i => Data$dArray.deleteAt(i);
const deleteBy = f => x => x$1 => Data$dArray.deleteBy(f)(x)(x$1);
const difference = dictEq => Data$dFoldable.foldrArray(Data$dArray.delete(dictEq));
const drop = i => x => {
  if (i < 1) { return x; }
  return Data$dArray.slice(i)(x.length)(x);
};
const dropEnd = i => x => Data$dArray.dropEnd(i)(x);
const dropWhile = f => x => Data$dArray.span(f)(x).rest;
const elem = dictEq => x => x$1 => Data$dArray.elem(dictEq)(x)(x$1);
const elemIndex = dictEq => x => Data$dArray.findIndex(v => dictEq.eq(v)(x));
const elemLastIndex = dictEq => x => Data$dArray.findLastIndex(v => dictEq.eq(v)(x));
const filter = f => Data$dArray.filter(f);
const filterA = dictApplicative => Data$dArray.filterA(dictApplicative);
const find = p => x => {
  const $2 = Data$dArray.findIndex(p)(x);
  if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", x[$2._1]); }
  return Data$dMaybe.Nothing;
};
const findIndex = p => Data$dArray.findIndex(p);
const findLastIndex = x => Data$dArray.findLastIndex(x);
const findMap = p => Data$dArray.findMap(p);
const foldM = dictMonad => Data$dArray.foldM(dictMonad);
const foldRecM = dictMonadRec => Data$dArray.foldRecM(dictMonadRec);
const index = x => Data$dArray.index(x);
const length = x => x.length;
const mapMaybe = f => x => Data$dArray.mapMaybe(f)(x);
const notElem = dictEq => x => x$1 => Data$dArray.notElem(dictEq)(x)(x$1);
const partition = f => Data$dArray.partition(f);
const slice = start => end => Data$dArray.slice(start)(end);
const span = f => x => Data$dArray.span(f)(x);
const take = i => x => {
  if (i < 1) { return []; }
  return Data$dArray.slice(0)(i)(x);
};
const takeEnd = i => x => Data$dArray.takeEnd(i)(x);
const takeWhile = f => x => Data$dArray.span(f)(x).init;
const toUnfoldable = dictUnfoldable => x => Data$dArray.toUnfoldable(dictUnfoldable)(x);
const cons = x => x$1 => Data$dSemigroup.concatArray([x])(x$1);
const group = dictEq => x => Data$dArray.groupBy(dictEq.eq)(x);
const groupAllBy = op => Data$dArray.groupAllBy(op);
const groupAll = dictOrd => Data$dArray.groupAllBy(dictOrd.compare);
const groupBy = op => x => Data$dArray.groupBy(op)(x);
const insert = dictOrd => x => x$1 => Data$dArray.insertBy(dictOrd.compare)(x)(x$1);
const insertBy = f => x => x$1 => Data$dArray.insertBy(f)(x)(x$1);
const intersperse = x => x$1 => Data$dArray.intersperse(x)(x$1);
const mapWithIndex = f => x => Data$dArray.zipWith(f)(Data$dArray.range(0)(x.length - 1 | 0))(x);
const modifyAtIndices = dictFoldable => Data$dArray.modifyAtIndices(dictFoldable);
const nub = dictOrd => x => Data$dArray.nubBy(dictOrd.compare)(x);
const nubBy = f => x => Data$dArray.nubBy(f)(x);
const nubByEq = f => x => Data$dArray.nubByEq(f)(x);
const nubEq = dictEq => x => Data$dArray.nubByEq(dictEq.eq)(x);
const reverse = x => Data$dArray.reverse(x);
const scanl = f => x => Data$dArray.scanl(f)(x);
const scanr = f => x => Data$dArray.scanr(f)(x);
const sort = dictOrd => x => Data$dArray.sortBy(dictOrd.compare)(x);
const sortBy = f => Data$dArray.sortBy(f);
const sortWith = dictOrd => f => Data$dArray.sortWith(dictOrd)(f);
const updateAtIndices = dictFoldable => Data$dArray.updateAtIndices(dictFoldable);
const unsafeIndex = () => x => $2 => x[$2];
const toUnfoldable1 = dictUnfoldable1 => xs => {
  const len = xs.length;
  return dictUnfoldable1.unfoldr1(i => Data$dTuple.$Tuple(
    xs[i],
    (() => {
      if (i < (len - 1 | 0)) { return Data$dMaybe.$Maybe("Just", i + 1 | 0); }
      return Data$dMaybe.Nothing;
    })()
  ))(0);
};
export {
  all,
  alterAt,
  any,
  appendArray,
  catMaybes,
  concat,
  concatMap,
  cons,
  cons$p,
  $$delete as delete,
  deleteAt,
  deleteBy,
  difference,
  difference$p,
  drop,
  dropEnd,
  dropWhile,
  elem,
  elemIndex,
  elemLastIndex,
  filter,
  filterA,
  find,
  findIndex,
  findLastIndex,
  findMap,
  fold1,
  foldM,
  foldMap1,
  foldRecM,
  foldl1,
  foldr1,
  fromArray,
  fromFoldable,
  fromFoldable1,
  fromNonEmpty,
  group,
  groupAll,
  groupAllBy,
  groupBy,
  head,
  index,
  init,
  insert,
  insertAt,
  insertBy,
  intercalate,
  intercalate1,
  intersect,
  intersect$p,
  intersectBy,
  intersectBy$p,
  intersperse,
  last,
  length,
  mapMaybe,
  mapWithIndex,
  max,
  modifyAt,
  modifyAtIndices,
  notElem,
  nub,
  nubBy,
  nubByEq,
  nubEq,
  partition,
  range,
  replicate,
  reverse,
  scanl,
  scanr,
  singleton,
  slice,
  snoc,
  snoc$p,
  some,
  sort,
  sortBy,
  sortWith,
  span,
  splitAt,
  tail,
  take,
  takeEnd,
  takeWhile,
  toArray,
  toNonEmpty,
  toUnfoldable,
  toUnfoldable1,
  transpose,
  transpose$p,
  uncons,
  union,
  union$p,
  unionBy,
  unionBy$p,
  unsafeIndex,
  unsnoc,
  unzip,
  updateAt,
  updateAtIndices,
  zip,
  zipWith,
  zipWithA
};
