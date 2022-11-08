// | This module defines a strict catenable list.
// |
// | The implementation is based on a queue where all operations require
// | `O(1)` amortized time.
// |
// | However, any single `uncons` operation may run in `O(n)` time.
// |
// | See [Purely Functional Data Structures](http://www.cs.cmu.edu/~rwh/theses/okasaki.pdf) (Okasaki 1996)
import * as $runtime from "../runtime.js";
import * as Data$dCatQueue from "../Data.CatQueue/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const $CatList = (tag, _1, _2) => ({tag, _1, _2});
const CatNil = /* #__PURE__ */ $CatList("CatNil");
const CatCons = value0 => value1 => $CatList("CatCons", value0, value1);
const showCatList = dictShow => (
  {
    show: v => {
      if (v.tag === "CatNil") { return "CatNil"; }
      if (v.tag === "CatCons") { return "(CatList " + (dictShow.show(v._1) + (" " + (Data$dCatQueue.showCatQueue(showCatList(dictShow)).show(v._2) + ")"))); }
      $runtime.fail();
    }
  }
);
const $$null = v => v.tag === "CatNil";
const link = v => v1 => {
  if (v.tag === "CatNil") { return v1; }
  if (v1.tag === "CatNil") { return v; }
  if (v.tag === "CatCons") { return $CatList("CatCons", v._1, Data$dCatQueue.$CatQueue(v._2._1, Data$dList$dTypes.$List("Cons", v1, v._2._2))); }
  $runtime.fail();
};
const foldr = k => b => q => {
  const foldl = foldl$a0$copy => foldl$a1$copy => foldl$a2$copy => {
    let foldl$a0 = foldl$a0$copy, foldl$a1 = foldl$a1$copy, foldl$a2 = foldl$a2$copy, foldl$c = true, foldl$r;
    while (foldl$c) {
      const v = foldl$a0, v1 = foldl$a1, v2 = foldl$a2;
      if (v2.tag === "Nil") {
        foldl$c = false;
        foldl$r = v1;
        continue;
      }
      if (v2.tag === "Cons") {
        foldl$a0 = v;
        foldl$a1 = v(v1)(v2._1);
        foldl$a2 = v2._2;
        continue;
      }
      $runtime.fail();
    };
    return foldl$r;
  };
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const xs = go$a0, ys = go$a1;
      const v = Data$dCatQueue.uncons(xs);
      if (v.tag === "Nothing") {
        go$c = false;
        go$r = foldl(x => i => i(x))(b)(ys);
        continue;
      }
      if (v.tag === "Just") {
        go$a0 = v._1._2;
        go$a1 = Data$dList$dTypes.$List("Cons", k(v._1._1), ys);
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(q)(Data$dList$dTypes.Nil);
};
const uncons = v => {
  if (v.tag === "CatNil") { return Data$dMaybe.Nothing; }
  if (v.tag === "CatCons") {
    return Data$dMaybe.$Maybe(
      "Just",
      Data$dTuple.$Tuple(
        v._1,
        (() => {
          if (
            (() => {
              if (v._2._1.tag === "Nil") { return v._2._2.tag === "Nil"; }
              return false;
            })()
          ) {
            return CatNil;
          }
          return foldr(link)(CatNil)(v._2);
        })()
      )
    );
  }
  $runtime.fail();
};
const foldableCatList = {
  foldMap: dictMonoid => {
    const append$1 = dictMonoid.Semigroup0().append;
    return f => foldableCatList.foldl(acc => x => append$1(acc)(f(x)))(dictMonoid.mempty);
  },
  foldr: f => s => l => Data$dFoldable.foldrDefault(foldableCatList)(f)(s)(l),
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
const length = /* #__PURE__ */ (() => foldableCatList.foldl(c => v => 1 + c | 0)(0))();
const foldMap = dictMonoid => {
  const append2 = dictMonoid.Semigroup0().append;
  return v => v1 => {
    if (v1.tag === "CatNil") { return dictMonoid.mempty; }
    if (v1.tag === "CatCons") {
      return append2(v(v1._1))(foldMap(dictMonoid)(v)((() => {
        if (
          (() => {
            if (v1._2._1.tag === "Nil") { return v1._2._2.tag === "Nil"; }
            return false;
          })()
        ) {
          return CatNil;
        }
        return foldr(link)(CatNil)(v1._2);
      })()));
    }
    $runtime.fail();
  };
};
const empty = CatNil;
const append = link;
const cons = a => cat => link($CatList("CatCons", a, Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))(cat);
const functorCatList = {
  map: v => v1 => {
    if (v1.tag === "CatNil") { return CatNil; }
    if (v1.tag === "CatCons") {
      return link($CatList("CatCons", v(v1._1), Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))(functorCatList.map(v)((() => {
        if (
          (() => {
            if (v1._2._1.tag === "Nil") { return v1._2._2.tag === "Nil"; }
            return false;
          })()
        ) {
          return CatNil;
        }
        return foldr(link)(CatNil)(v1._2);
      })()));
    }
    $runtime.fail();
  }
};
const singleton = a => link($CatList("CatCons", a, Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))(CatNil);
const traversableCatList = {
  traverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map = Apply0.Functor0().map;
    return v => v1 => {
      if (v1.tag === "CatNil") { return dictApplicative.pure(CatNil); }
      if (v1.tag === "CatCons") {
        return Apply0.apply(map(cons)(v(v1._1)))(traversableCatList.traverse(dictApplicative)(v)((() => {
          if (
            (() => {
              if (v1._2._1.tag === "Nil") { return v1._2._2.tag === "Nil"; }
              return false;
            })()
          ) {
            return CatNil;
          }
          return foldr(link)(CatNil)(v1._2);
        })()));
      }
      $runtime.fail();
    };
  },
  sequence: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map = Apply0.Functor0().map;
    return v => {
      if (v.tag === "CatNil") { return dictApplicative.pure(CatNil); }
      if (v.tag === "CatCons") {
        return Apply0.apply(map(cons)(v._1))(traversableCatList.sequence(dictApplicative)((() => {
          if (
            (() => {
              if (v._2._1.tag === "Nil") { return v._2._2.tag === "Nil"; }
              return false;
            })()
          ) {
            return CatNil;
          }
          return foldr(link)(CatNil)(v._2);
        })()));
      }
      $runtime.fail();
    };
  },
  Functor0: () => functorCatList,
  Foldable1: () => foldableCatList
};
const semigroupCatList = {append: link};
const monoidCatList = {mempty: CatNil, Semigroup0: () => semigroupCatList};
const monadCatList = {Applicative0: () => applicativeCatList, Bind1: () => bindCatList$lazy()};
const applyCatList = {apply: f => a => bindCatList$lazy().bind(f)(f$p => bindCatList$lazy().bind(a)(a$p => applicativeCatList.pure(f$p(a$p)))), Functor0: () => functorCatList};
const applicativeCatList = {pure: singleton, Apply0: () => applyCatList};
const bindCatList$lazy = /* #__PURE__ */ $runtime.binding(() => (
  {
    bind: (() => {
      const $0 = foldMap(monoidCatList);
      return b => a => $0(a)(b);
    })(),
    Apply0: () => applyCatList
  }
));
const bindCatList = /* #__PURE__ */ bindCatList$lazy();
const fromFoldable = dictFoldable => {
  const foldMap1 = dictFoldable.foldMap(monoidCatList);
  return f => foldMap1(singleton)(f);
};
const snoc = cat => a => link(cat)($CatList("CatCons", a, Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)));
const unfoldable1CatList = {
  unfoldr1: f => b => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const source = go$a0, memo = go$a1;
        const v = f(source);
        if (v._2.tag === "Nothing") {
          go$c = false;
          go$r = link(memo)($CatList("CatCons", v._1, Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)));
          continue;
        }
        if (v._2.tag === "Just") {
          go$a0 = v._2._1;
          go$a1 = link(memo)($CatList("CatCons", v._1, Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)));
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go(b)(CatNil);
  }
};
const unfoldableCatList = {
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
          go$a1 = link(memo)($CatList("CatCons", v._1._1, Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)));
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go(b)(CatNil);
  },
  Unfoldable10: () => unfoldable1CatList
};
const altCatList = {alt: link, Functor0: () => functorCatList};
const plusCatList = {empty: CatNil, Alt0: () => altCatList};
const alternativeCatList = {Applicative0: () => applicativeCatList, Plus1: () => plusCatList};
const monadPlusCatList = {Monad0: () => monadCatList, Alternative1: () => alternativeCatList};
export {
  $CatList,
  CatCons,
  CatNil,
  altCatList,
  alternativeCatList,
  append,
  applicativeCatList,
  applyCatList,
  bindCatList,
  cons,
  empty,
  foldMap,
  foldableCatList,
  foldr,
  fromFoldable,
  functorCatList,
  length,
  link,
  monadCatList,
  monadPlusCatList,
  monoidCatList,
  $$null as null,
  plusCatList,
  semigroupCatList,
  showCatList,
  singleton,
  snoc,
  traversableCatList,
  uncons,
  unfoldable1CatList,
  unfoldableCatList
};
