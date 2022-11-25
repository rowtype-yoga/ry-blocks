import * as $runtime from "../runtime.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Partial from "../Partial/index.js";
const identity = x => x;
const zipWith = f => v => v1 => Data$dNonEmpty.$NonEmpty(f(v._1)(v1._1), Data$dList.zipWith(f)(v._2)(v1._2));
const zipWithA = dictApplicative => {
  const sequence11 = Data$dList$dTypes.traversable1NonEmptyList.traverse1(dictApplicative.Apply0())(Data$dList$dTypes.identity);
  return f => xs => ys => sequence11(zipWith(f)(xs)(ys));
};
const zip = /* #__PURE__ */ zipWith(Data$dTuple.Tuple);
const wrappedOperation2 = name => f => v => v1 => {
  const v2 = f(Data$dList$dTypes.$List("Cons", v._1, v._2))(Data$dList$dTypes.$List("Cons", v1._1, v1._2));
  if (v2.tag === "Cons") { return Data$dNonEmpty.$NonEmpty(v2._1, v2._2); }
  if (v2.tag === "Nil") { return Partial._crashWith("Impossible: empty list in NonEmptyList " + name); }
  $runtime.fail();
};
const wrappedOperation = name => f => v => {
  const v1 = f(Data$dList$dTypes.$List("Cons", v._1, v._2));
  if (v1.tag === "Cons") { return Data$dNonEmpty.$NonEmpty(v1._1, v1._2); }
  if (v1.tag === "Nil") { return Partial._crashWith("Impossible: empty list in NonEmptyList " + name); }
  $runtime.fail();
};
const updateAt = i => a => v => {
  if (i === 0) { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(a, v._2)); }
  const $3 = Data$dList.updateAt(i - 1 | 0)(a)(v._2);
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(v._1, $3._1)); }
  return Data$dMaybe.Nothing;
};
const unzip = ts => Data$dTuple.$Tuple(Data$dList$dTypes.functorNonEmptyList.map(Data$dTuple.fst)(ts), Data$dList$dTypes.functorNonEmptyList.map(Data$dTuple.snd)(ts));
const unsnoc = v => {
  const v1 = Data$dList.unsnoc(v._2);
  if (v1.tag === "Nothing") { return {init: Data$dList$dTypes.Nil, last: v._1}; }
  if (v1.tag === "Just") { return {init: Data$dList$dTypes.$List("Cons", v._1, v1._1.init), last: v1._1.last}; }
  $runtime.fail();
};
const unionBy = x => wrappedOperation2("unionBy")(Data$dList.unionBy(x));
const union = dictEq => wrappedOperation2("union")(Data$dList.union(dictEq));
const uncons = v => ({head: v._1, tail: v._2});
const toList = v => Data$dList$dTypes.$List("Cons", v._1, v._2);
const toUnfoldable = dictUnfoldable => {
  const $1 = dictUnfoldable.unfoldr(xs => {
    if (xs.tag === "Nil") { return Data$dMaybe.Nothing; }
    if (xs.tag === "Cons") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(xs._1, xs._2)); }
    $runtime.fail();
  });
  return x => $1(Data$dList$dTypes.$List("Cons", x._1, x._2));
};
const tail = v => v._2;
const sortBy = x => wrappedOperation("sortBy")(Data$dList.sortBy(x));
const sort = dictOrd => xs => wrappedOperation("sortBy")(Data$dList.sortBy(dictOrd.compare))(xs);
const snoc = v => y => Data$dNonEmpty.$NonEmpty(v._1, Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(Data$dList$dTypes.$List("Cons", y, Data$dList$dTypes.Nil))(v._2));
const singleton = x => Data$dNonEmpty.$NonEmpty(x, Data$dList$dTypes.Nil);
const snoc$p = v => v1 => {
  if (v.tag === "Cons") {
    return Data$dNonEmpty.$NonEmpty(v._1, Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(Data$dList$dTypes.$List("Cons", v1, Data$dList$dTypes.Nil))(v._2));
  }
  if (v.tag === "Nil") { return Data$dNonEmpty.$NonEmpty(v1, Data$dList$dTypes.Nil); }
  $runtime.fail();
};
const reverse = /* #__PURE__ */ wrappedOperation("reverse")(Data$dList.reverse);
const nubEq = dictEq => wrappedOperation("nubEq")(Data$dList.nubEq(dictEq));
const nubByEq = x => wrappedOperation("nubByEq")(Data$dList.nubByEq(x));
const nubBy = x => wrappedOperation("nubBy")(Data$dList.nubBy(x));
const nub = dictOrd => wrappedOperation("nub")(Data$dList.nubBy(dictOrd.compare));
const modifyAt = i => f => v => {
  if (i === 0) { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(f(v._1), v._2)); }
  const $3 = Data$dList.alterAt(i - 1 | 0)(x => Data$dMaybe.$Maybe("Just", f(x)))(v._2);
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(v._1, $3._1)); }
  return Data$dMaybe.Nothing;
};
const lift = f => v => f(Data$dList$dTypes.$List("Cons", v._1, v._2));
const mapMaybe = x => lift(Data$dList.mapMaybe(x));
const partition = x => lift(Data$dList.partition(x));
const span = x => lift(Data$dList.span(x));
const take = x => lift(Data$dList.take(x));
const takeWhile = x => lift(Data$dList.takeWhile(x));
const length = v => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const b = go$a0, v$1 = go$a1;
      if (v$1.tag === "Nil") {
        go$c = false;
        go$r = b;
        continue;
      }
      if (v$1.tag === "Cons") {
        go$a0 = b + 1 | 0;
        go$a1 = v$1._2;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return 1 + go(0)(v._2) | 0;
};
const last = v => {
  if (v._2.tag === "Cons") {
    if (v._2._2.tag === "Nil") { return v._2._1; }
    if (Data$dList.last(v._2._2).tag === "Nothing") { return v._1; }
    if (Data$dList.last(v._2._2).tag === "Just") { return Data$dList.last(v._2._2)._1; }
    $runtime.fail();
  }
  return v._1;
};
const intersectBy = x => wrappedOperation2("intersectBy")(Data$dList.intersectBy(x));
const intersect = dictEq => wrappedOperation2("intersect")(Data$dList.intersect(dictEq));
const insertAt = i => a => v => {
  if (i === 0) { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(a, Data$dList$dTypes.$List("Cons", v._1, v._2))); }
  const $3 = Data$dList.insertAt(i - 1 | 0)(a)(v._2);
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(v._1, $3._1)); }
  return Data$dMaybe.Nothing;
};
const init = v => {
  const $1 = Data$dList.unsnoc(v._2);
  if ($1.tag === "Just") { return Data$dList$dTypes.$List("Cons", v._1, $1._1.init); }
  return Data$dList$dTypes.Nil;
};
const index = v => i => {
  if (i === 0) { return Data$dMaybe.$Maybe("Just", v._1); }
  return Data$dList.index(v._2)(i - 1 | 0);
};
const head = v => v._1;
const groupBy = x => wrappedOperation("groupBy")(Data$dList.groupBy(x));
const groupAllBy = x => wrappedOperation("groupAllBy")(Data$dList.groupAllBy(x));
const groupAll = dictOrd => wrappedOperation("groupAll")(Data$dList.groupAll(dictOrd));
const group = dictEq => wrappedOperation("group")(Data$dList.group(dictEq));
const fromList = v => {
  if (v.tag === "Nil") { return Data$dMaybe.Nothing; }
  if (v.tag === "Cons") { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(v._1, v._2)); }
  $runtime.fail();
};
const fromFoldable = dictFoldable => {
  const $1 = dictFoldable.foldr(Data$dList$dTypes.Cons)(Data$dList$dTypes.Nil);
  return x => {
    const $3 = $1(x);
    if ($3.tag === "Nil") { return Data$dMaybe.Nothing; }
    if ($3.tag === "Cons") { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty($3._1, $3._2)); }
    $runtime.fail();
  };
};
const foldM = dictMonad => {
  const bind1 = dictMonad.Bind1().bind;
  const foldM1 = Data$dList.foldM(dictMonad);
  return f => b => v => bind1(f(b)(v._1))(b$p => foldM1(f)(b$p)(v._2));
};
const findLastIndex = f => v => {
  const v1 = Data$dList.findLastIndex(f)(v._2);
  if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", v1._1 + 1 | 0); }
  if (v1.tag === "Nothing") {
    if (f(v._1)) { return Data$dMaybe.$Maybe("Just", 0); }
    return Data$dMaybe.Nothing;
  }
  $runtime.fail();
};
const findIndex = f => v => {
  if (f(v._1)) { return Data$dMaybe.$Maybe("Just", 0); }
  const $2 = Data$dList.findIndex(f)(v._2);
  if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1 + 1 | 0); }
  return Data$dMaybe.Nothing;
};
const filterM = dictMonad => {
  const $1 = Data$dList.filterM(dictMonad);
  return x => lift($1(x));
};
const filter = x => lift(Data$dList.filter(x));
const elemLastIndex = dictEq => x => findLastIndex(v => dictEq.eq(v)(x));
const elemIndex = dictEq => x => findIndex(v => dictEq.eq(v)(x));
const dropWhile = x => lift((() => {
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0;
      if (v.tag === "Cons") {
        if (x(v._1)) {
          go$a0 = v._2;
          continue;
        }
        go$c = false;
        go$r = v;
        continue;
      }
      go$c = false;
      go$r = v;
      continue;
    };
    return go$r;
  };
  return go;
})());
const drop = x => lift(Data$dList.drop(x));
const cons$p = x => xs => Data$dNonEmpty.$NonEmpty(x, xs);
const cons = y => v => Data$dNonEmpty.$NonEmpty(y, Data$dList$dTypes.$List("Cons", v._1, v._2));
const concatMap = b => a => Data$dList$dTypes.bindNonEmptyList.bind(a)(b);
const concat = v => Data$dList$dTypes.bindNonEmptyList.bind(v)(identity);
const catMaybes = /* #__PURE__ */ lift(Data$dList.catMaybes);
const appendFoldable = dictFoldable => {
  const fromFoldable1 = dictFoldable.foldr(Data$dList$dTypes.Cons)(Data$dList$dTypes.Nil);
  return v => ys => Data$dNonEmpty.$NonEmpty(v._1, Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(fromFoldable1(ys))(v._2));
};
export {
  appendFoldable,
  catMaybes,
  concat,
  concatMap,
  cons,
  cons$p,
  drop,
  dropWhile,
  elemIndex,
  elemLastIndex,
  filter,
  filterM,
  findIndex,
  findLastIndex,
  foldM,
  fromFoldable,
  fromList,
  group,
  groupAll,
  groupAllBy,
  groupBy,
  head,
  identity,
  index,
  init,
  insertAt,
  intersect,
  intersectBy,
  last,
  length,
  lift,
  mapMaybe,
  modifyAt,
  nub,
  nubBy,
  nubByEq,
  nubEq,
  partition,
  reverse,
  singleton,
  snoc,
  snoc$p,
  sort,
  sortBy,
  span,
  tail,
  take,
  takeWhile,
  toList,
  toUnfoldable,
  uncons,
  union,
  unionBy,
  unsnoc,
  unzip,
  updateAt,
  wrappedOperation,
  wrappedOperation2,
  zip,
  zipWith,
  zipWithA
};
