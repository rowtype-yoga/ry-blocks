// | Helper functions for working with immutable Javascript arrays.
// |
// | _Note_: Depending on your use-case, you may prefer to use `Data.List` or
// | `Data.Sequence` instead, which might give better performance for certain
// | use cases. This module is useful when integrating with JavaScript libraries
// | which use arrays, but immutable arrays are not a practical data structure
// | for many use cases due to their poor asymptotics.
// |
// | In addition to the functions in this module, Arrays have a number of
// | useful instances:
// |
// | * `Functor`, which provides `map :: forall a b. (a -> b) -> Array a ->
// |   Array b`
// | * `Apply`, which provides `(<*>) :: forall a b. Array (a -> b) -> Array a
// |   -> Array b`. This function works a bit like a Cartesian product; the
// |   result array is constructed by applying each function in the first
// |   array to each value in the second, so that the result array ends up with
// |   a length equal to the product of the two arguments' lengths.
// | * `Bind`, which provides `(>>=) :: forall a b. (a -> Array b) -> Array a
// |   -> Array b` (this is the same as `concatMap`).
// | * `Semigroup`, which provides `(<>) :: forall a. Array a -> Array a ->
// |   Array a`, for concatenating arrays.
// | * `Foldable`, which provides a slew of functions for *folding* (also known
// |   as *reducing*) arrays down to one value. For example,
// |   `Data.Foldable.or` tests whether an array of `Boolean` values contains
// |   at least one `true` value.
// | * `Traversable`, which provides the PureScript version of a for-loop,
// |   allowing you to STAI.iterate over an array and accumulate effects.
// |
import * as $runtime from "../runtime.js";
import * as Control$dBind from "../Control.Bind/index.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dArray$dST$dIterator from "../Data.Array.ST.Iterator/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {
  _deleteAt,
  _insertAt,
  _updateAt,
  all,
  any,
  concat,
  filter,
  findIndexImpl,
  findLastIndexImpl,
  findMapImpl,
  fromFoldableImpl,
  indexImpl,
  length,
  partition,
  range,
  replicate,
  reverse,
  scanl,
  scanr,
  slice,
  sortByImpl,
  unconsImpl,
  unsafeIndexImpl,
  zipWith
} from "./foreign.js";
const traverse_ = /* #__PURE__ */ Data$dFoldable.traverse_(Control$dMonad$dST$dInternal.applicativeST);
const intercalate1 = dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return sep => xs => Data$dFoldable.foldlArray(v => v1 => {
    if (v.init) { return {init: false, acc: v1}; }
    return {init: false, acc: append(v.acc)(append(sep)(v1))};
  })({init: true, acc: dictMonoid.mempty})(xs).acc;
};
const zipWithA = dictApplicative => {
  const sequence1 = Data$dTraversable.traversableArray.traverse(dictApplicative)(Data$dTraversable.identity);
  return f => xs => ys => sequence1(zipWith(f)(xs)(ys));
};
const zip = /* #__PURE__ */ zipWith(Data$dTuple.Tuple);
const updateAtIndices = dictFoldable => {
  const traverse_1 = traverse_(dictFoldable);
  return us => xs => Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(res => traverse_1(v => Data$dArray$dST.poke(v._1)(v._2)(res))(us))(xs));
};
const updateAt = /* #__PURE__ */ _updateAt(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const unsafeIndex = () => unsafeIndexImpl;
const uncons = /* #__PURE__ */ unconsImpl(v => Data$dMaybe.Nothing)(x => xs => Data$dMaybe.$Maybe("Just", {head: x, tail: xs}));
const toUnfoldable = dictUnfoldable => xs => {
  const len = xs.length;
  return dictUnfoldable.unfoldr(i => {
    if (i < len) { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(xs[i], i + 1 | 0)); }
    return Data$dMaybe.Nothing;
  })(0);
};
const take = n => xs => {
  if (n < 1) { return []; }
  return slice(0)(n)(xs);
};
const tail = /* #__PURE__ */ unconsImpl(v => Data$dMaybe.Nothing)(v => xs => Data$dMaybe.$Maybe("Just", xs));
const splitAt = v => v1 => {
  if (v <= 0) { return {before: [], after: v1}; }
  return {before: slice(0)(v)(v1), after: slice(v)(v1.length)(v1)};
};
const sortBy = comp => sortByImpl(comp)(v => {
  if (v.tag === "GT") { return 1; }
  if (v.tag === "EQ") { return 0; }
  if (v.tag === "LT") { return -1; }
  $runtime.fail();
});
const sortWith = dictOrd => f => sortBy(x => y => dictOrd.compare(f(x))(f(y)));
const sort = dictOrd => xs => sortBy(dictOrd.compare)(xs);
const snoc = xs => x => Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([x]))(xs));
const singleton = a => [a];
const $$null = xs => xs.length === 0;
const nubByEq = eq2 => xs => Control$dMonad$dST$dInternal.run(() => {
  const arr = Data$dArray$dST.new();
  Control$dMonad$dST$dInternal.foreach(xs)(x => {
    const $4 = any(v => eq2(v)(x));
    return () => {
      const $5 = Data$dArray$dST.unsafeFreeze(arr)();
      if (!$4($5)) {
        Data$dArray$dST.pushAll([x])(arr)();
        return Data$dUnit.unit;
      }
      return Data$dUnit.unit;
    };
  })();
  return Data$dArray$dST.unsafeFreeze(arr)();
});
const nubEq = dictEq => nubByEq(dictEq.eq);
const modifyAtIndices = dictFoldable => {
  const traverse_1 = traverse_(dictFoldable);
  return is => f => xs => Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(res => traverse_1(i => Data$dArray$dST.modify(i)(f)(res))(is))(xs));
};
const mapWithIndex = f => xs => zipWith(f)(range(0)(xs.length - 1 | 0))(xs);
const intersperse = a => arr => {
  const v = arr.length;
  if (v < 2) { return arr; }
  return Control$dMonad$dST$dInternal.run(Control$dMonad$dST$dInternal.bind_(() => {
    const out = Data$dArray$dST.new();
    Data$dArray$dST.pushAll([arr[0]])(out)();
    Control$dMonad$dST$dInternal.for(1)(v)(idx => {
      const $6 = Data$dArray$dST.pushAll([a])(out);
      return () => {
        $6();
        Data$dArray$dST.pushAll([arr[idx]])(out)();
        return Data$dUnit.unit;
      };
    })();
    return out;
  })(Data$dArray$dST.unsafeFreeze));
};
const intercalate = dictMonoid => intercalate1(dictMonoid);
const insertAt = /* #__PURE__ */ _insertAt(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const init = xs => {
  if (xs.length === 0) { return Data$dMaybe.Nothing; }
  return Data$dMaybe.$Maybe("Just", slice(0)(xs.length - 1 | 0)(xs));
};
const index = /* #__PURE__ */ indexImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const last = xs => index(xs)(xs.length - 1 | 0);
const unsnoc = xs => Data$dMaybe.applyMaybe.apply((() => {
  const $1 = init(xs);
  if ($1.tag === "Just") { return Data$dMaybe.$Maybe("Just", v1 => ({init: $1._1, last: v1})); }
  return Data$dMaybe.Nothing;
})())(index(xs)(xs.length - 1 | 0));
const modifyAt = i => f => xs => {
  const $3 = index(xs)(i);
  if ($3.tag === "Nothing") { return Data$dMaybe.Nothing; }
  if ($3.tag === "Just") { return updateAt(i)(f($3._1))(xs); }
  $runtime.fail();
};
const span = p => arr => {
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const i = go$a0;
      const v = index(arr)(i);
      if (v.tag === "Just") {
        if (p(v._1)) {
          go$a0 = i + 1 | 0;
          continue;
        }
        go$c = false;
        go$r = Data$dMaybe.$Maybe("Just", i);
        continue;
      }
      if (v.tag === "Nothing") {
        go$c = false;
        go$r = Data$dMaybe.Nothing;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  const breakIndex = go(0);
  if (breakIndex.tag === "Just") {
    if (breakIndex._1 === 0) { return {init: [], rest: arr}; }
    return {init: slice(0)(breakIndex._1)(arr), rest: slice(breakIndex._1)(arr.length)(arr)};
  }
  if (breakIndex.tag === "Nothing") { return {init: arr, rest: []}; }
  $runtime.fail();
};
const takeWhile = p => xs => span(p)(xs).init;
const unzip = xs => Control$dMonad$dST$dInternal.run(() => {
  const fsts = Data$dArray$dST.new();
  const snds = Data$dArray$dST.new();
  const $3 = {value: 0};
  Data$dArray$dST$dIterator.iterate(Data$dArray$dST$dIterator.$Iterator(v => index(xs)(v), $3))(v => () => {
    Data$dArray$dST.pushAll([v._1])(fsts)();
    Data$dArray$dST.pushAll([v._2])(snds)();
    return Data$dUnit.unit;
  })();
  const fsts$p = Data$dArray$dST.unsafeFreeze(fsts)();
  const snds$p = Data$dArray$dST.unsafeFreeze(snds)();
  return Data$dTuple.$Tuple(fsts$p, snds$p);
});
const head = xs => index(xs)(0);
const nubBy = comp => xs => {
  const indexedAndSorted = sortBy(x => y => comp(x._2)(y._2))(zipWith(Data$dTuple.Tuple)(range(0)(xs.length - 1 | 0))(xs));
  const v = index(indexedAndSorted)(0);
  if (v.tag === "Nothing") { return []; }
  if (v.tag === "Just") {
    return Data$dFunctor.arrayMap(Data$dTuple.snd)(sortWith(Data$dOrd.ordInt)(Data$dTuple.fst)(Control$dMonad$dST$dInternal.run((() => {
      const $4 = Data$dArray$dST.unsafeThaw([v._1]);
      return () => {
        const result = $4();
        Control$dMonad$dST$dInternal.foreach(indexedAndSorted)(v1 => () => {
          const $7 = Data$dArray$dST.unsafeFreeze(result)();
          const $8 = index($7)($7.length - 1 | 0);
          const $9 = comp((() => {
            if ($8.tag === "Just") { return $8._1._2; }
            $runtime.fail();
          })())(v1._2);
          if ($9.tag === "LT" || ($9.tag === "GT" || !($9.tag === "EQ"))) {
            Data$dArray$dST.pushAll([v1])(result)();
            return Data$dUnit.unit;
          }
          return Data$dUnit.unit;
        })();
        return Data$dArray$dST.unsafeFreeze(result)();
      };
    })())));
  }
  $runtime.fail();
};
const nub = dictOrd => nubBy(dictOrd.compare);
const groupBy = op => xs => Control$dMonad$dST$dInternal.run(() => {
  const result = Data$dArray$dST.new();
  const $3 = {value: 0};
  const iter = Data$dArray$dST$dIterator.$Iterator(v => index(xs)(v), $3);
  Data$dArray$dST$dIterator.iterate(iter)(x => () => {
    const sub1 = Data$dArray$dST.new();
    Data$dArray$dST.pushAll([x])(sub1)();
    Data$dArray$dST$dIterator.pushWhile(op(x))(iter)(sub1)();
    const grp = Data$dArray$dST.unsafeFreeze(sub1)();
    Data$dArray$dST.pushAll([grp])(result)();
    return Data$dUnit.unit;
  })();
  return Data$dArray$dST.unsafeFreeze(result)();
});
const groupAllBy = cmp => {
  const $1 = groupBy(x => y => cmp(x)(y).tag === "EQ");
  const $2 = sortBy(cmp);
  return x => $1($2(x));
};
const groupAll = dictOrd => groupAllBy(dictOrd.compare);
const group = dictEq => xs => groupBy(dictEq.eq)(xs);
const fromFoldable = dictFoldable => fromFoldableImpl(dictFoldable.foldr);
const foldr = Data$dFoldable.foldrArray;
const foldl = Data$dFoldable.foldlArray;
const transpose = xs => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const idx = go$a0, allArrays = go$a1;
      const v = Data$dFoldable.foldlArray(acc => nextArr => {
        const $6 = index(nextArr)(idx);
        if ($6.tag === "Nothing") { return acc; }
        if ($6.tag === "Just") {
          return Data$dMaybe.$Maybe(
            "Just",
            (() => {
              if (acc.tag === "Nothing") { return [$6._1]; }
              if (acc.tag === "Just") { return Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([$6._1]))(acc._1)); }
              $runtime.fail();
            })()
          );
        }
        $runtime.fail();
      })(Data$dMaybe.Nothing)(xs);
      if (v.tag === "Nothing") {
        go$c = false;
        go$r = allArrays;
        continue;
      }
      if (v.tag === "Just") {
        go$a0 = idx + 1 | 0;
        go$a1 = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([v._1]))(allArrays));
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(0)([]);
};
const foldRecM = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const pure1 = Monad0.Applicative0().pure;
  const bind1 = Monad0.Bind1().bind;
  return f => b => array => dictMonadRec.tailRecM(o => {
    if (o.b >= array.length) { return pure1(Control$dMonad$dRec$dClass.$Step("Done", o.a)); }
    return bind1(f(o.a)(array[o.b]))(res$p => pure1(Control$dMonad$dRec$dClass.$Step("Loop", {a: res$p, b: o.b + 1 | 0})));
  })({a: b, b: 0});
};
const foldMap = dictMonoid => Data$dFoldable.foldableArray.foldMap(dictMonoid);
const foldM = dictMonad => {
  const pure1 = dictMonad.Applicative0().pure;
  const bind1 = dictMonad.Bind1().bind;
  return f => b => unconsImpl(v => pure1(b))(a => as => bind1(f(b)(a))(b$p => foldM(dictMonad)(f)(b$p)(as)));
};
const fold = dictMonoid => Data$dFoldable.foldableArray.foldMap(dictMonoid)(Data$dFoldable.identity);
const findMap = /* #__PURE__ */ findMapImpl(Data$dMaybe.Nothing)(Data$dMaybe.isJust);
const findLastIndex = /* #__PURE__ */ findLastIndexImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const insertBy = cmp => x => ys => {
  const $3 = insertAt((() => {
    const $3 = findLastIndex(y => cmp(x)(y).tag === "GT")(ys);
    if ($3.tag === "Nothing") { return 0; }
    if ($3.tag === "Just") { return $3._1 + 1 | 0; }
    $runtime.fail();
  })())(x)(ys);
  if ($3.tag === "Just") { return $3._1; }
  $runtime.fail();
};
const insert = dictOrd => insertBy(dictOrd.compare);
const findIndex = /* #__PURE__ */ findIndexImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const intersectBy = eq2 => xs => ys => filter(x => {
  const $4 = findIndex(eq2(x))(ys);
  if ($4.tag === "Nothing") { return false; }
  if ($4.tag === "Just") { return true; }
  $runtime.fail();
})(xs);
const intersect = dictEq => intersectBy(dictEq.eq);
const find = f => xs => {
  const $2 = findIndex(f)(xs);
  if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", xs[$2._1]); }
  return Data$dMaybe.Nothing;
};
const elemLastIndex = dictEq => x => findLastIndex(v => dictEq.eq(v)(x));
const elemIndex = dictEq => x => findIndex(v => dictEq.eq(v)(x));
const notElem = dictEq => a => arr => {
  const $3 = findIndex(v => dictEq.eq(v)(a))(arr);
  if ($3.tag === "Nothing") { return true; }
  if ($3.tag === "Just") { return false; }
  $runtime.fail();
};
const elem = dictEq => a => arr => {
  const $3 = findIndex(v => dictEq.eq(v)(a))(arr);
  if ($3.tag === "Nothing") { return false; }
  if ($3.tag === "Just") { return true; }
  $runtime.fail();
};
const dropWhile = p => xs => span(p)(xs).rest;
const dropEnd = n => xs => {
  const $2 = xs.length - n | 0;
  if ($2 < 1) { return []; }
  return slice(0)($2)(xs);
};
const drop = n => xs => {
  if (n < 1) { return xs; }
  return slice(n)(xs.length)(xs);
};
const takeEnd = n => xs => {
  const $2 = xs.length - n | 0;
  if ($2 < 1) { return xs; }
  return slice($2)(xs.length)(xs);
};
const deleteAt = /* #__PURE__ */ _deleteAt(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const deleteBy = v => v1 => v2 => {
  if (v2.length === 0) { return []; }
  const $3 = findIndex(v(v1))(v2);
  if ($3.tag === "Nothing") { return v2; }
  if ($3.tag === "Just") {
    const $4 = deleteAt($3._1)(v2);
    if ($4.tag === "Just") { return $4._1; }
    $runtime.fail();
  }
  $runtime.fail();
};
const unionBy = eq2 => xs => ys => Data$dSemigroup.concatArray(xs)(Data$dFoldable.foldlArray(b => a => deleteBy(eq2)(a)(b))(nubByEq(eq2)(ys))(xs));
const union = dictEq => unionBy(dictEq.eq);
const $$delete = dictEq => deleteBy(dictEq.eq);
const difference = dictEq => Data$dFoldable.foldrArray($$delete(dictEq));
const cons = x => xs => Data$dSemigroup.concatArray([x])(xs);
const some = dictAlternative => {
  const apply1 = dictAlternative.Applicative0().Apply0().apply;
  const map3 = dictAlternative.Plus1().Alt0().Functor0().map;
  return dictLazy => v => apply1(map3(cons)(v))(dictLazy.defer(v1 => many(dictAlternative)(dictLazy)(v)));
};
const many = dictAlternative => {
  const alt = dictAlternative.Plus1().Alt0().alt;
  const pure1 = dictAlternative.Applicative0().pure;
  return dictLazy => v => alt(some(dictAlternative)(dictLazy)(v))(pure1([]));
};
const concatMap = b => a => Control$dBind.arrayBind(a)(b);
const mapMaybe = f => concatMap(x => {
  const $2 = f(x);
  if ($2.tag === "Nothing") { return []; }
  if ($2.tag === "Just") { return [$2._1]; }
  $runtime.fail();
});
const filterA = dictApplicative => {
  const traverse1 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const map3 = dictApplicative.Apply0().Functor0().map;
  return p => {
    const $4 = traverse1(x => map3(Data$dTuple.Tuple(x))(p(x)));
    const $5 = map3(mapMaybe(v => {
      if (v._2) { return Data$dMaybe.$Maybe("Just", v._1); }
      return Data$dMaybe.Nothing;
    }));
    return x => $5($4(x));
  };
};
const catMaybes = /* #__PURE__ */ mapMaybe(x => x);
const alterAt = i => f => xs => {
  const $3 = index(xs)(i);
  if ($3.tag === "Nothing") { return Data$dMaybe.Nothing; }
  if ($3.tag === "Just") {
    const v = f($3._1);
    if (v.tag === "Nothing") { return deleteAt(i)(xs); }
    if (v.tag === "Just") { return updateAt(i)(v._1)(xs); }
    $runtime.fail();
  }
  $runtime.fail();
};
export {
  alterAt,
  catMaybes,
  concatMap,
  cons,
  $$delete as delete,
  deleteAt,
  deleteBy,
  difference,
  drop,
  dropEnd,
  dropWhile,
  elem,
  elemIndex,
  elemLastIndex,
  filterA,
  find,
  findIndex,
  findLastIndex,
  findMap,
  fold,
  foldM,
  foldMap,
  foldRecM,
  foldl,
  foldr,
  fromFoldable,
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
  intersectBy,
  intersperse,
  last,
  many,
  mapMaybe,
  mapWithIndex,
  modifyAt,
  modifyAtIndices,
  notElem,
  nub,
  nubBy,
  nubByEq,
  nubEq,
  $$null as null,
  singleton,
  snoc,
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
  toUnfoldable,
  transpose,
  traverse_,
  uncons,
  union,
  unionBy,
  unsafeIndex,
  unsnoc,
  unzip,
  updateAt,
  updateAtIndices,
  zip,
  zipWithA
};
export * from "./foreign.js";
