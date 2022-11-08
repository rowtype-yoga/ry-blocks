// | This module defines a strict double-ended queue.
// |
// | The queue implementation is based on a pair of lists where all
// | operations require `O(1)` amortized time.
// |
// | However, any single `uncons` operation may run in `O(n)` time.
// |
// | See [Simple and Efficient Purely Functional Queues and Dequeues](http://www.westpoint.edu/eecs/SiteAssets/SitePages/Faculty%20Publication%20Documents/Okasaki/jfp95queue.pdf) (Okasaki 1995)
import * as $runtime from "../runtime.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const $CatQueue = (_1, _2) => ({tag: "CatQueue", _1, _2});
const CatQueue = value0 => value1 => $CatQueue(value0, value1);
const unsnoc = unsnoc$a0$copy => {
  let unsnoc$a0 = unsnoc$a0$copy, unsnoc$c = true, unsnoc$r;
  while (unsnoc$c) {
    const v = unsnoc$a0;
    if (v._2.tag === "Cons") {
      unsnoc$c = false;
      unsnoc$r = Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v._2._1, $CatQueue(v._1, v._2._2)));
      continue;
    }
    if (v._2.tag === "Nil") {
      if (v._1.tag === "Nil") {
        unsnoc$c = false;
        unsnoc$r = Data$dMaybe.Nothing;
        continue;
      }
      unsnoc$a0 = $CatQueue(Data$dList$dTypes.Nil, Data$dList.reverse(v._1));
      continue;
    }
    $runtime.fail();
  };
  return unsnoc$r;
};
const uncons = uncons$a0$copy => {
  let uncons$a0 = uncons$a0$copy, uncons$c = true, uncons$r;
  while (uncons$c) {
    const v = uncons$a0;
    if (v._1.tag === "Nil") {
      if (v._2.tag === "Nil") {
        uncons$c = false;
        uncons$r = Data$dMaybe.Nothing;
        continue;
      }
      uncons$a0 = $CatQueue(Data$dList.reverse(v._2), Data$dList$dTypes.Nil);
      continue;
    }
    if (v._1.tag === "Cons") {
      uncons$c = false;
      uncons$r = Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v._1._1, $CatQueue(v._1._2, v._2)));
      continue;
    }
    $runtime.fail();
  };
  return uncons$r;
};
const snoc = v => a => $CatQueue(v._1, Data$dList$dTypes.$List("Cons", a, v._2));
const showCatQueue = dictShow => {
  const show = Data$dList$dTypes.showList(dictShow).show;
  return {show: v => "(CatQueue " + (show(v._1) + (" " + (show(v._2) + ")")))};
};
const $$null = v => {
  if (v._1.tag === "Nil") { return v._2.tag === "Nil"; }
  return false;
};
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
  const go$1 = go$1$a0$copy => go$1$a1$copy => {
    let go$1$a0 = go$1$a0$copy, go$1$a1 = go$1$a1$copy, go$1$c = true, go$1$r;
    while (go$1$c) {
      const b = go$1$a0, v$1 = go$1$a1;
      if (v$1.tag === "Nil") {
        go$1$c = false;
        go$1$r = b;
        continue;
      }
      if (v$1.tag === "Cons") {
        go$1$a0 = b + 1 | 0;
        go$1$a1 = v$1._2;
        continue;
      }
      $runtime.fail();
    };
    return go$1$r;
  };
  return go(0)(v._1) + go$1(0)(v._2) | 0;
};
const functorCatQueue = {map: f => v => $CatQueue(Data$dList$dTypes.listMap(f)(v._1), Data$dList$dTypes.listMap(f)(v._2))};
const foldableCatQueue = {
  foldMap: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => foldableCatQueue.foldl(acc => x => append(acc)(f(x)))(dictMonoid.mempty);
  },
  foldr: f => Data$dFoldable.foldrDefault(foldableCatQueue)(f),
  foldl: f => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const acc = go$a0, q = go$a1;
        const v = uncons(q);
        if (v.tag === "Just") {
          go$a0 = f(acc)(v._1._1);
          go$a1 = v._1._2;
          continue;
        }
        if (v.tag === "Nothing") {
          go$c = false;
          go$r = acc;
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go;
  }
};
const semigroupCatQueue = /* #__PURE__ */ (() => ({append: foldableCatQueue.foldl(snoc)}))();
const empty = /* #__PURE__ */ $CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil);
const monoidCatQueue = {mempty: /* #__PURE__ */ $CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil), Semigroup0: () => semigroupCatQueue};
const singleton = /* #__PURE__ */ snoc(/* #__PURE__ */ $CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil));
const fromFoldable = dictFoldable => {
  const foldMap = dictFoldable.foldMap(monoidCatQueue);
  return f => foldMap(snoc($CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))(f);
};
const traversableCatQueue = {
  traverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map1 = Apply0.Functor0().map;
    const map = Apply0.Functor0().map;
    return f => {
      const $5 = map1(foldableCatQueue.foldl(snoc)($CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)));
      const $6 = foldableCatQueue.foldl(acc => x => Apply0.apply(map(snoc)(acc))(f(x)))(dictApplicative.pure($CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)));
      return x => $5($6(x));
    };
  },
  sequence: dictApplicative => traversableCatQueue.traverse(dictApplicative)(Data$dTraversable.identity),
  Functor0: () => functorCatQueue,
  Foldable1: () => foldableCatQueue
};
const unfoldable1CatQueue = {
  unfoldr1: f => b => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const source = go$a0, memo = go$a1;
        const v = f(source);
        if (v._2.tag === "Nothing") {
          go$c = false;
          go$r = $CatQueue(memo._1, Data$dList$dTypes.$List("Cons", v._1, memo._2));
          continue;
        }
        if (v._2.tag === "Just") {
          go$a0 = v._2._1;
          go$a1 = $CatQueue(memo._1, Data$dList$dTypes.$List("Cons", v._1, memo._2));
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go(b)($CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil));
  }
};
const unfoldableCatQueue = {
  unfoldr: f => b => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const source = go$a0, memo = go$a1;
        const v = f(source);
        if (v.tag === "Nothing") {
          go$c = false;
          go$r = memo;
          continue;
        }
        if (v.tag === "Just") {
          go$a0 = v._1._2;
          go$a1 = $CatQueue(memo._1, Data$dList$dTypes.$List("Cons", v._1._1, memo._2));
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go(b)($CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil));
  },
  Unfoldable10: () => unfoldable1CatQueue
};
const cqEq = dictEq => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const xs = go$a0, ys = go$a1;
      const v = uncons(ys);
      const v1 = uncons(xs);
      if (v1.tag === "Just") {
        if (v.tag === "Just") {
          if (dictEq.eq(v1._1._1)(v._1._1)) {
            go$a0 = v1._1._2;
            go$a1 = v._1._2;
            continue;
          }
          go$c = false;
          go$r = false;
          continue;
        }
        go$c = false;
        go$r = false;
        continue;
      }
      if (v1.tag === "Nothing") {
        go$c = false;
        go$r = v.tag === "Nothing";
        continue;
      }
      go$c = false;
      go$r = false;
      continue;
    };
    return go$r;
  };
  return go;
};
const eqCatQueue = dictEq => ({eq: cqEq(dictEq)});
const cqCompare = dictOrd => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const xs = go$a0, ys = go$a1;
      const v = uncons(ys);
      const v1 = uncons(xs);
      if (v1.tag === "Just") {
        if (v.tag === "Just") {
          const v2 = dictOrd.compare(v1._1._1)(v._1._1);
          if (v2.tag === "EQ") {
            go$a0 = v1._1._2;
            go$a1 = v._1._2;
            continue;
          }
          go$c = false;
          go$r = v2;
          continue;
        }
        if (v.tag === "Nothing") {
          go$c = false;
          go$r = Data$dOrdering.GT;
          continue;
        }
        $runtime.fail();
      }
      if (v1.tag === "Nothing") {
        if (v.tag === "Just") {
          go$c = false;
          go$r = Data$dOrdering.LT;
          continue;
        }
        if (v.tag === "Nothing") {
          go$c = false;
          go$r = Data$dOrdering.EQ;
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go;
};
const ordCatQueue = dictOrd => {
  const eqCatQueue1 = {eq: cqEq(dictOrd.Eq0())};
  return {compare: cqCompare(dictOrd), Eq0: () => eqCatQueue1};
};
const cons = a => v => $CatQueue(Data$dList$dTypes.$List("Cons", a, v._1), v._2);
const monadCatQueue = {Applicative0: () => applicativeCatQueue$lazy(), Bind1: () => bindCatQueue$lazy()};
const applyCatQueue = {
  apply: f => a => bindCatQueue$lazy().bind(f)(f$p => bindCatQueue$lazy().bind(a)(a$p => applicativeCatQueue$lazy().pure(f$p(a$p)))),
  Functor0: () => functorCatQueue
};
const bindCatQueue$lazy = /* #__PURE__ */ $runtime.binding(() => (
  {
    bind: (() => {
      const $0 = foldableCatQueue.foldMap(monoidCatQueue);
      return b => a => $0(a)(b);
    })(),
    Apply0: () => applyCatQueue
  }
));
const applicativeCatQueue$lazy = /* #__PURE__ */ $runtime.binding(() => ({pure: snoc($CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)), Apply0: () => applyCatQueue}));
const bindCatQueue = /* #__PURE__ */ bindCatQueue$lazy();
const applicativeCatQueue = /* #__PURE__ */ applicativeCatQueue$lazy();
const altCatQueue = /* #__PURE__ */ (() => ({alt: semigroupCatQueue.append, Functor0: () => functorCatQueue}))();
const plusCatQueue = {empty: /* #__PURE__ */ $CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil), Alt0: () => altCatQueue};
const alternativeCatQueue = {Applicative0: () => applicativeCatQueue, Plus1: () => plusCatQueue};
const monadPlusCatQueue = {Monad0: () => monadCatQueue, Alternative1: () => alternativeCatQueue};
export {
  $CatQueue,
  CatQueue,
  altCatQueue,
  alternativeCatQueue,
  applicativeCatQueue,
  applyCatQueue,
  bindCatQueue,
  cons,
  cqCompare,
  cqEq,
  empty,
  eqCatQueue,
  foldableCatQueue,
  fromFoldable,
  functorCatQueue,
  length,
  monadCatQueue,
  monadPlusCatQueue,
  monoidCatQueue,
  $$null as null,
  ordCatQueue,
  plusCatQueue,
  semigroupCatQueue,
  showCatQueue,
  singleton,
  snoc,
  traversableCatQueue,
  uncons,
  unfoldable1CatQueue,
  unfoldableCatQueue,
  unsnoc
};
