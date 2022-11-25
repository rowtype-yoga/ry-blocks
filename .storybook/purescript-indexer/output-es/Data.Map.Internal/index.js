// | This module defines a type of maps as balanced 2-3 trees, based on
// | <http://www.cs.princeton.edu/~dpw/courses/cos326-12/ass/2-3-trees.pdf>
import * as $runtime from "../runtime.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dLazy from "../Data.List.Lazy/index.js";
import * as Data$dList$dLazy$dTypes from "../Data.List.Lazy.Types/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable from "../Data.Unfoldable/index.js";
import * as Partial from "../Partial/index.js";
const $KickUp = (_1, _2, _3, _4) => ({tag: "KickUp", _1, _2, _3, _4});
const $Map = (tag, _1, _2, _3, _4, _5, _6, _7) => ({tag, _1, _2, _3, _4, _5, _6, _7});
const $TreeContext = (tag, _1, _2, _3, _4, _5, _6) => ({tag, _1, _2, _3, _4, _5, _6});
const all = /* #__PURE__ */ (() => Data$dList$dLazy$dTypes.foldableList.foldMap((() => {
  const semigroupConj1 = {append: v => v1 => v && v1};
  return {mempty: true, Semigroup0: () => semigroupConj1};
})()))();
const identity = x => x;
const nub = /* #__PURE__ */ (() => Data$dList.nubBy(Data$dOrd.ordInt.compare))();
const Leaf = /* #__PURE__ */ $Map("Leaf");
const Two = value0 => value1 => value2 => value3 => $Map("Two", value0, value1, value2, value3);
const Three = value0 => value1 => value2 => value3 => value4 => value5 => value6 => $Map("Three", value0, value1, value2, value3, value4, value5, value6);
const TwoLeft = value0 => value1 => value2 => $TreeContext("TwoLeft", value0, value1, value2);
const TwoRight = value0 => value1 => value2 => $TreeContext("TwoRight", value0, value1, value2);
const ThreeLeft = value0 => value1 => value2 => value3 => value4 => value5 => $TreeContext("ThreeLeft", value0, value1, value2, value3, value4, value5);
const ThreeMiddle = value0 => value1 => value2 => value3 => value4 => value5 => $TreeContext("ThreeMiddle", value0, value1, value2, value3, value4, value5);
const ThreeRight = value0 => value1 => value2 => value3 => value4 => value5 => $TreeContext("ThreeRight", value0, value1, value2, value3, value4, value5);
const KickUp = value0 => value1 => value2 => value3 => $KickUp(value0, value1, value2, value3);
const size = v => {
  if (v.tag === "Leaf") { return 0; }
  if (v.tag === "Two") { return (1 + size(v._1) | 0) + size(v._4) | 0; }
  if (v.tag === "Three") { return ((2 + size(v._1) | 0) + size(v._4) | 0) + size(v._7) | 0; }
  $runtime.fail();
};
const singleton = k => v => $Map("Two", Leaf, k, v, Leaf);
const toUnfoldable = dictUnfoldable => m => {
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = Data$dMaybe.Nothing;
        continue;
      }
      if (v.tag === "Cons") {
        if (v._1.tag === "Leaf") {
          go$a0 = v._2;
          continue;
        }
        if (v._1.tag === "Two") {
          if (v._1._1.tag === "Leaf") {
            if (v._1._4.tag === "Leaf") {
              go$c = false;
              go$r = Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(Data$dTuple.$Tuple(v._1._2, v._1._3), v._2));
              continue;
            }
            go$c = false;
            go$r = Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(Data$dTuple.$Tuple(v._1._2, v._1._3), Data$dList$dTypes.$List("Cons", v._1._4, v._2)));
            continue;
          }
          go$a0 = Data$dList$dTypes.$List(
            "Cons",
            v._1._1,
            Data$dList$dTypes.$List("Cons", $Map("Two", Leaf, v._1._2, v._1._3, Leaf), Data$dList$dTypes.$List("Cons", v._1._4, v._2))
          );
          continue;
        }
        if (v._1.tag === "Three") {
          go$a0 = Data$dList$dTypes.$List(
            "Cons",
            v._1._1,
            Data$dList$dTypes.$List(
              "Cons",
              $Map("Two", Leaf, v._1._2, v._1._3, Leaf),
              Data$dList$dTypes.$List("Cons", v._1._4, Data$dList$dTypes.$List("Cons", $Map("Two", Leaf, v._1._5, v._1._6, Leaf), Data$dList$dTypes.$List("Cons", v._1._7, v._2)))
            )
          );
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return go$r;
  };
  return dictUnfoldable.unfoldr(go)(Data$dList$dTypes.$List("Cons", m, Data$dList$dTypes.Nil));
};
const toUnfoldableUnordered = dictUnfoldable => m => {
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = Data$dMaybe.Nothing;
        continue;
      }
      if (v.tag === "Cons") {
        if (v._1.tag === "Leaf") {
          go$a0 = v._2;
          continue;
        }
        if (v._1.tag === "Two") {
          go$c = false;
          go$r = Data$dMaybe.$Maybe(
            "Just",
            Data$dTuple.$Tuple(Data$dTuple.$Tuple(v._1._2, v._1._3), Data$dList$dTypes.$List("Cons", v._1._1, Data$dList$dTypes.$List("Cons", v._1._4, v._2)))
          );
          continue;
        }
        if (v._1.tag === "Three") {
          go$c = false;
          go$r = Data$dMaybe.$Maybe(
            "Just",
            Data$dTuple.$Tuple(
              Data$dTuple.$Tuple(v._1._2, v._1._3),
              Data$dList$dTypes.$List(
                "Cons",
                $Map("Two", Leaf, v._1._5, v._1._6, Leaf),
                Data$dList$dTypes.$List("Cons", v._1._1, Data$dList$dTypes.$List("Cons", v._1._4, Data$dList$dTypes.$List("Cons", v._1._7, v._2)))
              )
            )
          );
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return go$r;
  };
  return dictUnfoldable.unfoldr(go)(Data$dList$dTypes.$List("Cons", m, Data$dList$dTypes.Nil));
};
const showTree = dictShow => dictShow1 => v => {
  if (v.tag === "Leaf") { return "Leaf"; }
  if (v.tag === "Two") {
    return "Two (" + (
      showTree(dictShow)(dictShow1)(v._1) + (") (" + (dictShow.show(v._2) + (") (" + (dictShow1.show(v._3) + (") (" + (showTree(dictShow)(dictShow1)(v._4) + ")"))))))
    );
  }
  if (v.tag === "Three") {
    return "Three (" + (
      showTree(dictShow)(dictShow1)(v._1) + (
        ") (" + (
          dictShow.show(v._2) + (
            ") (" + (
              dictShow1.show(v._3) + (
                ") (" + (
                  showTree(dictShow)(dictShow1)(v._4) + (") (" + (dictShow.show(v._5) + (") (" + (dictShow1.show(v._6) + (") (" + (showTree(dictShow)(dictShow1)(v._7) + ")"))))))
                )
              )
            )
          )
        )
      )
    );
  }
  $runtime.fail();
};
const showMap = dictShow => dictShow1 => {
  const show = Data$dShow.showArrayImpl(v => "(Tuple " + (dictShow.show(v._1) + (" " + (dictShow1.show(v._2) + ")"))));
  return {show: m => "(fromFoldable " + (show(toUnfoldable(Data$dUnfoldable.unfoldableArray)(m)) + ")")};
};
const lookupLE = dictOrd => k => {
  const go = v => {
    if (v.tag === "Leaf") { return Data$dMaybe.Nothing; }
    if (v.tag === "Two") {
      const v2 = dictOrd.compare(k)(v._2);
      if (v2.tag === "EQ") { return Data$dMaybe.$Maybe("Just", {key: v._2, value: v._3}); }
      if (v2.tag === "GT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._4);
            if ($5.tag === "Nothing") { return {key: v._2, value: v._3}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v2.tag === "LT") { return go(v._1); }
      $runtime.fail();
    }
    if (v.tag === "Three") {
      const v3 = dictOrd.compare(k)(v._5);
      if (v3.tag === "EQ") { return Data$dMaybe.$Maybe("Just", {key: v._5, value: v._6}); }
      if (v3.tag === "GT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._7);
            if ($5.tag === "Nothing") { return {key: v._5, value: v._6}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v3.tag === "LT") { return go($Map("Two", v._1, v._2, v._3, v._4)); }
      $runtime.fail();
    }
    $runtime.fail();
  };
  return go;
};
const lookupGE = dictOrd => k => {
  const go = v => {
    if (v.tag === "Leaf") { return Data$dMaybe.Nothing; }
    if (v.tag === "Two") {
      const v2 = dictOrd.compare(k)(v._2);
      if (v2.tag === "EQ") { return Data$dMaybe.$Maybe("Just", {key: v._2, value: v._3}); }
      if (v2.tag === "LT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._1);
            if ($5.tag === "Nothing") { return {key: v._2, value: v._3}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v2.tag === "GT") { return go(v._4); }
      $runtime.fail();
    }
    if (v.tag === "Three") {
      const v3 = dictOrd.compare(k)(v._2);
      if (v3.tag === "EQ") { return Data$dMaybe.$Maybe("Just", {key: v._2, value: v._3}); }
      if (v3.tag === "LT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._1);
            if ($5.tag === "Nothing") { return {key: v._2, value: v._3}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v3.tag === "GT") { return go($Map("Two", v._4, v._5, v._6, v._7)); }
      $runtime.fail();
    }
    $runtime.fail();
  };
  return go;
};
const lookup = dictOrd => k => {
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0;
      if (v.tag === "Leaf") {
        go$c = false;
        go$r = Data$dMaybe.Nothing;
        continue;
      }
      if (v.tag === "Two") {
        const v2 = dictOrd.compare(k)(v._2);
        if (v2.tag === "EQ") {
          go$c = false;
          go$r = Data$dMaybe.$Maybe("Just", v._3);
          continue;
        }
        if (v2.tag === "LT") {
          go$a0 = v._1;
          continue;
        }
        go$a0 = v._4;
        continue;
      }
      if (v.tag === "Three") {
        const v3 = dictOrd.compare(k)(v._2);
        if (v3.tag === "EQ") {
          go$c = false;
          go$r = Data$dMaybe.$Maybe("Just", v._3);
          continue;
        }
        const v4 = dictOrd.compare(k)(v._5);
        if (v4.tag === "EQ") {
          go$c = false;
          go$r = Data$dMaybe.$Maybe("Just", v._6);
          continue;
        }
        if (v3.tag === "LT") {
          go$a0 = v._1;
          continue;
        }
        if (v4.tag === "GT") {
          go$a0 = v._7;
          continue;
        }
        go$a0 = v._4;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go;
};
const member = dictOrd => k => m => {
  const $3 = lookup(dictOrd)(k)(m);
  if ($3.tag === "Nothing") { return false; }
  if ($3.tag === "Just") { return true; }
  $runtime.fail();
};
const isSubmap = dictOrd => dictEq => m1 => m2 => all(v => {
  const $5 = lookup(dictOrd)(v._1)(m2);
  if ($5.tag === "Nothing") { return false; }
  if ($5.tag === "Just") { return dictEq.eq($5._1)(v._2); }
  return false;
})(toUnfoldable(Data$dList$dLazy$dTypes.unfoldableList)(m1));
const isEmpty = v => v.tag === "Leaf";
const functorMap = {
  map: v => v1 => {
    if (v1.tag === "Leaf") { return Leaf; }
    if (v1.tag === "Two") { return $Map("Two", functorMap.map(v)(v1._1), v1._2, v(v1._3), functorMap.map(v)(v1._4)); }
    if (v1.tag === "Three") { return $Map("Three", functorMap.map(v)(v1._1), v1._2, v(v1._3), functorMap.map(v)(v1._4), v1._5, v(v1._6), functorMap.map(v)(v1._7)); }
    $runtime.fail();
  }
};
const functorWithIndexMap = {
  mapWithIndex: v => v1 => {
    if (v1.tag === "Leaf") { return Leaf; }
    if (v1.tag === "Two") { return $Map("Two", functorWithIndexMap.mapWithIndex(v)(v1._1), v1._2, v(v1._2)(v1._3), functorWithIndexMap.mapWithIndex(v)(v1._4)); }
    if (v1.tag === "Three") {
      return $Map(
        "Three",
        functorWithIndexMap.mapWithIndex(v)(v1._1),
        v1._2,
        v(v1._2)(v1._3),
        functorWithIndexMap.mapWithIndex(v)(v1._4),
        v1._5,
        v(v1._5)(v1._6),
        functorWithIndexMap.mapWithIndex(v)(v1._7)
      );
    }
    $runtime.fail();
  },
  Functor0: () => functorMap
};
const fromZipper = fromZipper$a0$copy => fromZipper$a1$copy => fromZipper$a2$copy => {
  let fromZipper$a0 = fromZipper$a0$copy, fromZipper$a1 = fromZipper$a1$copy, fromZipper$a2 = fromZipper$a2$copy, fromZipper$c = true, fromZipper$r;
  while (fromZipper$c) {
    const dictOrd = fromZipper$a0, v = fromZipper$a1, v1 = fromZipper$a2;
    if (v.tag === "Nil") {
      fromZipper$c = false;
      fromZipper$r = v1;
      continue;
    }
    if (v.tag === "Cons") {
      if (v._1.tag === "TwoLeft") {
        fromZipper$a0 = dictOrd;
        fromZipper$a1 = v._2;
        fromZipper$a2 = $Map("Two", v1, v._1._1, v._1._2, v._1._3);
        continue;
      }
      if (v._1.tag === "TwoRight") {
        fromZipper$a0 = dictOrd;
        fromZipper$a1 = v._2;
        fromZipper$a2 = $Map("Two", v._1._1, v._1._2, v._1._3, v1);
        continue;
      }
      if (v._1.tag === "ThreeLeft") {
        fromZipper$a0 = dictOrd;
        fromZipper$a1 = v._2;
        fromZipper$a2 = $Map("Three", v1, v._1._1, v._1._2, v._1._3, v._1._4, v._1._5, v._1._6);
        continue;
      }
      if (v._1.tag === "ThreeMiddle") {
        fromZipper$a0 = dictOrd;
        fromZipper$a1 = v._2;
        fromZipper$a2 = $Map("Three", v._1._1, v._1._2, v._1._3, v1, v._1._4, v._1._5, v._1._6);
        continue;
      }
      if (v._1.tag === "ThreeRight") {
        fromZipper$a0 = dictOrd;
        fromZipper$a1 = v._2;
        fromZipper$a2 = $Map("Three", v._1._1, v._1._2, v._1._3, v._1._4, v._1._5, v._1._6, v1);
        continue;
      }
      $runtime.fail();
    }
    $runtime.fail();
  };
  return fromZipper$r;
};
const insert = dictOrd => k => v => {
  const up = up$a0$copy => up$a1$copy => {
    let up$a0 = up$a0$copy, up$a1 = up$a1$copy, up$c = true, up$r;
    while (up$c) {
      const v1 = up$a0, v2 = up$a1;
      if (v1.tag === "Nil") {
        up$c = false;
        up$r = $Map("Two", v2._1, v2._2, v2._3, v2._4);
        continue;
      }
      if (v1.tag === "Cons") {
        if (v1._1.tag === "TwoLeft") {
          up$c = false;
          up$r = fromZipper(dictOrd)(v1._2)($Map("Three", v2._1, v2._2, v2._3, v2._4, v1._1._1, v1._1._2, v1._1._3));
          continue;
        }
        if (v1._1.tag === "TwoRight") {
          up$c = false;
          up$r = fromZipper(dictOrd)(v1._2)($Map("Three", v1._1._1, v1._1._2, v1._1._3, v2._1, v2._2, v2._3, v2._4));
          continue;
        }
        if (v1._1.tag === "ThreeLeft") {
          up$a0 = v1._2;
          up$a1 = $KickUp($Map("Two", v2._1, v2._2, v2._3, v2._4), v1._1._1, v1._1._2, $Map("Two", v1._1._3, v1._1._4, v1._1._5, v1._1._6));
          continue;
        }
        if (v1._1.tag === "ThreeMiddle") {
          up$a0 = v1._2;
          up$a1 = $KickUp($Map("Two", v1._1._1, v1._1._2, v1._1._3, v2._1), v2._2, v2._3, $Map("Two", v2._4, v1._1._4, v1._1._5, v1._1._6));
          continue;
        }
        if (v1._1.tag === "ThreeRight") {
          up$a0 = v1._2;
          up$a1 = $KickUp($Map("Two", v1._1._1, v1._1._2, v1._1._3, v1._1._4), v1._1._5, v1._1._6, $Map("Two", v2._1, v2._2, v2._3, v2._4));
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return up$r;
  };
  const down = down$a0$copy => down$a1$copy => {
    let down$a0 = down$a0$copy, down$a1 = down$a1$copy, down$c = true, down$r;
    while (down$c) {
      const v1 = down$a0, v2 = down$a1;
      if (v2.tag === "Leaf") {
        down$c = false;
        down$r = up(v1)($KickUp(Leaf, k, v, Leaf));
        continue;
      }
      if (v2.tag === "Two") {
        const v3 = dictOrd.compare(k)(v2._2);
        if (v3.tag === "EQ") {
          down$c = false;
          down$r = fromZipper(dictOrd)(v1)($Map("Two", v2._1, k, v, v2._4));
          continue;
        }
        if (v3.tag === "LT") {
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoLeft", v2._2, v2._3, v2._4), v1);
          down$a1 = v2._1;
          continue;
        }
        down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoRight", v2._1, v2._2, v2._3), v1);
        down$a1 = v2._4;
        continue;
      }
      if (v2.tag === "Three") {
        const v3 = dictOrd.compare(k)(v2._2);
        if (v3.tag === "EQ") {
          down$c = false;
          down$r = fromZipper(dictOrd)(v1)($Map("Three", v2._1, k, v, v2._4, v2._5, v2._6, v2._7));
          continue;
        }
        const v4 = dictOrd.compare(k)(v2._5);
        if (v4.tag === "EQ") {
          down$c = false;
          down$r = fromZipper(dictOrd)(v1)($Map("Three", v2._1, v2._2, v2._3, v2._4, k, v, v2._7));
          continue;
        }
        if (v3.tag === "LT") {
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeLeft", v2._2, v2._3, v2._4, v2._5, v2._6, v2._7), v1);
          down$a1 = v2._1;
          continue;
        }
        if (v3.tag === "GT") {
          if (v4.tag === "LT") {
            down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeMiddle", v2._1, v2._2, v2._3, v2._5, v2._6, v2._7), v1);
            down$a1 = v2._4;
            continue;
          }
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", v2._1, v2._2, v2._3, v2._4, v2._5, v2._6), v1);
          down$a1 = v2._7;
          continue;
        }
        down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", v2._1, v2._2, v2._3, v2._4, v2._5, v2._6), v1);
        down$a1 = v2._7;
        continue;
      }
      $runtime.fail();
    };
    return down$r;
  };
  return down(Data$dList$dTypes.Nil);
};
const pop = dictOrd => k => {
  const up = up$a0$copy => up$a1$copy => {
    let up$a0 = up$a0$copy, up$a1 = up$a1$copy, up$c = true, up$r;
    while (up$c) {
      const ctxs = up$a0, tree = up$a1;
      if (ctxs.tag === "Nil") {
        up$c = false;
        up$r = tree;
        continue;
      }
      if (ctxs.tag === "Cons") {
        const $5 = (a, b, c, d, k1, k2, k3, v1, v2, v3) => fromZipper(dictOrd)(ctxs._2)($Map("Two", $Map("Two", a, k1, v1, b), k2, v2, $Map("Two", c, k3, v3, d)));
        const $6 = (a, b, c, d, k1, k2, k3, v1, v2, v3) => fromZipper(dictOrd)(ctxs._2)($Map("Two", $Map("Two", a, k1, v1, b), k2, v2, $Map("Two", c, k3, v3, d)));
        const $7 = (a, b, c, d, k1, k2, k3, v1, v2, v3) => fromZipper(dictOrd)(ctxs._2)($Map("Two", $Map("Three", a, k1, v1, b, k2, v2, c), k3, v3, d));
        const $8 = (a, b, c, d, k1, k2, k3, v1, v2, v3) => fromZipper(dictOrd)(ctxs._2)($Map("Two", $Map("Three", a, k1, v1, b, k2, v2, c), k3, v3, d));
        const $9 = (a, b, c, d, k1, k2, k3, v1, v2, v3) => fromZipper(dictOrd)(ctxs._2)($Map("Two", a, k1, v1, $Map("Three", b, k2, v2, c, k3, v3, d)));
        const $10 = (a, b, c, d, k1, k2, k3, v1, v2, v3) => fromZipper(dictOrd)(ctxs._2)($Map("Two", a, k1, v1, $Map("Three", b, k2, v2, c, k3, v3, d)));
        const $11 = (a, b, c, d, e, k1, k2, k3, k4, v1, v2, v3, v4) => fromZipper(dictOrd)(ctxs._2)($Map(
          "Three",
          $Map("Two", a, k1, v1, b),
          k2,
          v2,
          $Map("Two", c, k3, v3, d),
          k4,
          v4,
          e
        ));
        const $12 = (a, b, c, d, e, k1, k2, k3, k4, v1, v2, v3, v4) => fromZipper(dictOrd)(ctxs._2)($Map(
          "Three",
          $Map("Two", a, k1, v1, b),
          k2,
          v2,
          $Map("Two", c, k3, v3, d),
          k4,
          v4,
          e
        ));
        const $13 = (a, b, c, d, e, k1, k2, k3, k4, v1, v2, v3, v4) => fromZipper(dictOrd)(ctxs._2)($Map(
          "Three",
          a,
          k1,
          v1,
          $Map("Two", b, k2, v2, c),
          k3,
          v3,
          $Map("Two", d, k4, v4, e)
        ));
        const $14 = (a, b, c, d, e, k1, k2, k3, k4, v1, v2, v3, v4) => fromZipper(dictOrd)(ctxs._2)($Map(
          "Three",
          a,
          k1,
          v1,
          $Map("Two", b, k2, v2, c),
          k3,
          v3,
          $Map("Two", d, k4, v4, e)
        ));
        if (tree.tag === "Leaf") {
          if (ctxs._1.tag === "TwoLeft") {
            if (ctxs._1._3.tag === "Leaf") {
              up$c = false;
              up$r = fromZipper(dictOrd)(ctxs._2)($Map("Two", Leaf, ctxs._1._1, ctxs._1._2, Leaf));
              continue;
            }
            if (ctxs._1._3.tag === "Two") {
              up$a0 = ctxs._2;
              up$a1 = $Map("Three", tree, ctxs._1._1, ctxs._1._2, ctxs._1._3._1, ctxs._1._3._2, ctxs._1._3._3, ctxs._1._3._4);
              continue;
            }
            if (ctxs._1._3.tag === "Three") {
              up$c = false;
              up$r = $5(tree, ctxs._1._3._1, ctxs._1._3._4, ctxs._1._3._7, ctxs._1._1, ctxs._1._3._2, ctxs._1._3._5, ctxs._1._2, ctxs._1._3._3, ctxs._1._3._6);
              continue;
            }
            up$c = false;
            up$r = Partial._crashWith("The impossible happened in partial function `up`.");
            continue;
          }
          if (ctxs._1.tag === "TwoRight") {
            if (ctxs._1._1.tag === "Leaf") {
              up$c = false;
              up$r = fromZipper(dictOrd)(ctxs._2)($Map("Two", Leaf, ctxs._1._2, ctxs._1._3, Leaf));
              continue;
            }
            if (ctxs._1._1.tag === "Two") {
              up$a0 = ctxs._2;
              up$a1 = $Map("Three", ctxs._1._1._1, ctxs._1._1._2, ctxs._1._1._3, ctxs._1._1._4, ctxs._1._2, ctxs._1._3, tree);
              continue;
            }
            if (ctxs._1._1.tag === "Three") {
              up$c = false;
              up$r = $6(ctxs._1._1._1, ctxs._1._1._4, ctxs._1._1._7, tree, ctxs._1._1._2, ctxs._1._1._5, ctxs._1._2, ctxs._1._1._3, ctxs._1._1._6, ctxs._1._3);
              continue;
            }
            up$c = false;
            up$r = Partial._crashWith("The impossible happened in partial function `up`.");
            continue;
          }
          if (ctxs._1.tag === "ThreeLeft") {
            if (ctxs._1._6.tag === "Leaf") {
              if (ctxs._1._3.tag === "Leaf") {
                up$c = false;
                up$r = fromZipper(dictOrd)(ctxs._2)($Map("Three", Leaf, ctxs._1._1, ctxs._1._2, Leaf, ctxs._1._4, ctxs._1._5, Leaf));
                continue;
              }
              if (ctxs._1._3.tag === "Two") {
                up$c = false;
                up$r = $7(tree, ctxs._1._3._1, ctxs._1._3._4, ctxs._1._6, ctxs._1._1, ctxs._1._3._2, ctxs._1._4, ctxs._1._2, ctxs._1._3._3, ctxs._1._5);
                continue;
              }
              if (ctxs._1._3.tag === "Three") {
                up$c = false;
                up$r = $11(
                  tree,
                  ctxs._1._3._1,
                  ctxs._1._3._4,
                  ctxs._1._3._7,
                  ctxs._1._6,
                  ctxs._1._1,
                  ctxs._1._3._2,
                  ctxs._1._3._5,
                  ctxs._1._4,
                  ctxs._1._2,
                  ctxs._1._3._3,
                  ctxs._1._3._6,
                  ctxs._1._5
                );
                continue;
              }
              up$c = false;
              up$r = Partial._crashWith("The impossible happened in partial function `up`.");
              continue;
            }
            if (ctxs._1._3.tag === "Two") {
              up$c = false;
              up$r = $7(tree, ctxs._1._3._1, ctxs._1._3._4, ctxs._1._6, ctxs._1._1, ctxs._1._3._2, ctxs._1._4, ctxs._1._2, ctxs._1._3._3, ctxs._1._5);
              continue;
            }
            if (ctxs._1._3.tag === "Three") {
              up$c = false;
              up$r = $11(
                tree,
                ctxs._1._3._1,
                ctxs._1._3._4,
                ctxs._1._3._7,
                ctxs._1._6,
                ctxs._1._1,
                ctxs._1._3._2,
                ctxs._1._3._5,
                ctxs._1._4,
                ctxs._1._2,
                ctxs._1._3._3,
                ctxs._1._3._6,
                ctxs._1._5
              );
              continue;
            }
            up$c = false;
            up$r = Partial._crashWith("The impossible happened in partial function `up`.");
            continue;
          }
          if (ctxs._1.tag === "ThreeMiddle") {
            if (ctxs._1._1.tag === "Leaf") {
              if (ctxs._1._6.tag === "Leaf") {
                up$c = false;
                up$r = fromZipper(dictOrd)(ctxs._2)($Map("Three", Leaf, ctxs._1._2, ctxs._1._3, Leaf, ctxs._1._4, ctxs._1._5, Leaf));
                continue;
              }
              if (ctxs._1._6.tag === "Two") {
                up$c = false;
                up$r = $9(ctxs._1._1, tree, ctxs._1._6._1, ctxs._1._6._4, ctxs._1._2, ctxs._1._4, ctxs._1._6._2, ctxs._1._3, ctxs._1._5, ctxs._1._6._3);
                continue;
              }
              if (ctxs._1._6.tag === "Three") {
                up$c = false;
                up$r = $13(
                  ctxs._1._1,
                  tree,
                  ctxs._1._6._1,
                  ctxs._1._6._4,
                  ctxs._1._6._7,
                  ctxs._1._2,
                  ctxs._1._4,
                  ctxs._1._6._2,
                  ctxs._1._6._5,
                  ctxs._1._3,
                  ctxs._1._5,
                  ctxs._1._6._3,
                  ctxs._1._6._6
                );
                continue;
              }
              up$c = false;
              up$r = Partial._crashWith("The impossible happened in partial function `up`.");
              continue;
            }
            if (ctxs._1._1.tag === "Two") {
              up$c = false;
              up$r = $8(ctxs._1._1._1, ctxs._1._1._4, tree, ctxs._1._6, ctxs._1._1._2, ctxs._1._2, ctxs._1._4, ctxs._1._1._3, ctxs._1._3, ctxs._1._5);
              continue;
            }
            if (ctxs._1._6.tag === "Two") {
              up$c = false;
              up$r = $9(ctxs._1._1, tree, ctxs._1._6._1, ctxs._1._6._4, ctxs._1._2, ctxs._1._4, ctxs._1._6._2, ctxs._1._3, ctxs._1._5, ctxs._1._6._3);
              continue;
            }
            if (ctxs._1._1.tag === "Three") {
              up$c = false;
              up$r = $12(
                ctxs._1._1._1,
                ctxs._1._1._4,
                ctxs._1._1._7,
                tree,
                ctxs._1._6,
                ctxs._1._1._2,
                ctxs._1._1._5,
                ctxs._1._2,
                ctxs._1._4,
                ctxs._1._1._3,
                ctxs._1._1._6,
                ctxs._1._3,
                ctxs._1._5
              );
              continue;
            }
            if (ctxs._1._6.tag === "Three") {
              up$c = false;
              up$r = $13(
                ctxs._1._1,
                tree,
                ctxs._1._6._1,
                ctxs._1._6._4,
                ctxs._1._6._7,
                ctxs._1._2,
                ctxs._1._4,
                ctxs._1._6._2,
                ctxs._1._6._5,
                ctxs._1._3,
                ctxs._1._5,
                ctxs._1._6._3,
                ctxs._1._6._6
              );
              continue;
            }
            up$c = false;
            up$r = Partial._crashWith("The impossible happened in partial function `up`.");
            continue;
          }
          if (ctxs._1.tag === "ThreeRight") {
            if (ctxs._1._1.tag === "Leaf") {
              if (ctxs._1._4.tag === "Leaf") {
                up$c = false;
                up$r = fromZipper(dictOrd)(ctxs._2)($Map("Three", Leaf, ctxs._1._2, ctxs._1._3, Leaf, ctxs._1._5, ctxs._1._6, Leaf));
                continue;
              }
              if (ctxs._1._4.tag === "Two") {
                up$c = false;
                up$r = $10(ctxs._1._1, ctxs._1._4._1, ctxs._1._4._4, tree, ctxs._1._2, ctxs._1._4._2, ctxs._1._5, ctxs._1._3, ctxs._1._4._3, ctxs._1._6);
                continue;
              }
              if (ctxs._1._4.tag === "Three") {
                up$c = false;
                up$r = $14(
                  ctxs._1._1,
                  ctxs._1._4._1,
                  ctxs._1._4._4,
                  ctxs._1._4._7,
                  tree,
                  ctxs._1._2,
                  ctxs._1._4._2,
                  ctxs._1._4._5,
                  ctxs._1._5,
                  ctxs._1._3,
                  ctxs._1._4._3,
                  ctxs._1._4._6,
                  ctxs._1._6
                );
                continue;
              }
              up$c = false;
              up$r = Partial._crashWith("The impossible happened in partial function `up`.");
              continue;
            }
            if (ctxs._1._4.tag === "Two") {
              up$c = false;
              up$r = $10(ctxs._1._1, ctxs._1._4._1, ctxs._1._4._4, tree, ctxs._1._2, ctxs._1._4._2, ctxs._1._5, ctxs._1._3, ctxs._1._4._3, ctxs._1._6);
              continue;
            }
            if (ctxs._1._4.tag === "Three") {
              up$c = false;
              up$r = $14(
                ctxs._1._1,
                ctxs._1._4._1,
                ctxs._1._4._4,
                ctxs._1._4._7,
                tree,
                ctxs._1._2,
                ctxs._1._4._2,
                ctxs._1._4._5,
                ctxs._1._5,
                ctxs._1._3,
                ctxs._1._4._3,
                ctxs._1._4._6,
                ctxs._1._6
              );
              continue;
            }
            up$c = false;
            up$r = Partial._crashWith("The impossible happened in partial function `up`.");
            continue;
          }
          up$c = false;
          up$r = Partial._crashWith("The impossible happened in partial function `up`.");
          continue;
        }
        if (ctxs._1.tag === "TwoLeft") {
          if (ctxs._1._3.tag === "Two") {
            up$a0 = ctxs._2;
            up$a1 = $Map("Three", tree, ctxs._1._1, ctxs._1._2, ctxs._1._3._1, ctxs._1._3._2, ctxs._1._3._3, ctxs._1._3._4);
            continue;
          }
          if (ctxs._1._3.tag === "Three") {
            up$c = false;
            up$r = $5(tree, ctxs._1._3._1, ctxs._1._3._4, ctxs._1._3._7, ctxs._1._1, ctxs._1._3._2, ctxs._1._3._5, ctxs._1._2, ctxs._1._3._3, ctxs._1._3._6);
            continue;
          }
          up$c = false;
          up$r = Partial._crashWith("The impossible happened in partial function `up`.");
          continue;
        }
        if (ctxs._1.tag === "TwoRight") {
          if (ctxs._1._1.tag === "Two") {
            up$a0 = ctxs._2;
            up$a1 = $Map("Three", ctxs._1._1._1, ctxs._1._1._2, ctxs._1._1._3, ctxs._1._1._4, ctxs._1._2, ctxs._1._3, tree);
            continue;
          }
          if (ctxs._1._1.tag === "Three") {
            up$c = false;
            up$r = $6(ctxs._1._1._1, ctxs._1._1._4, ctxs._1._1._7, tree, ctxs._1._1._2, ctxs._1._1._5, ctxs._1._2, ctxs._1._1._3, ctxs._1._1._6, ctxs._1._3);
            continue;
          }
          up$c = false;
          up$r = Partial._crashWith("The impossible happened in partial function `up`.");
          continue;
        }
        if (ctxs._1.tag === "ThreeLeft") {
          if (ctxs._1._3.tag === "Two") {
            up$c = false;
            up$r = $7(tree, ctxs._1._3._1, ctxs._1._3._4, ctxs._1._6, ctxs._1._1, ctxs._1._3._2, ctxs._1._4, ctxs._1._2, ctxs._1._3._3, ctxs._1._5);
            continue;
          }
          if (ctxs._1._3.tag === "Three") {
            up$c = false;
            up$r = $11(
              tree,
              ctxs._1._3._1,
              ctxs._1._3._4,
              ctxs._1._3._7,
              ctxs._1._6,
              ctxs._1._1,
              ctxs._1._3._2,
              ctxs._1._3._5,
              ctxs._1._4,
              ctxs._1._2,
              ctxs._1._3._3,
              ctxs._1._3._6,
              ctxs._1._5
            );
            continue;
          }
          up$c = false;
          up$r = Partial._crashWith("The impossible happened in partial function `up`.");
          continue;
        }
        if (ctxs._1.tag === "ThreeMiddle") {
          if (ctxs._1._1.tag === "Two") {
            up$c = false;
            up$r = $8(ctxs._1._1._1, ctxs._1._1._4, tree, ctxs._1._6, ctxs._1._1._2, ctxs._1._2, ctxs._1._4, ctxs._1._1._3, ctxs._1._3, ctxs._1._5);
            continue;
          }
          if (ctxs._1._6.tag === "Two") {
            up$c = false;
            up$r = $9(ctxs._1._1, tree, ctxs._1._6._1, ctxs._1._6._4, ctxs._1._2, ctxs._1._4, ctxs._1._6._2, ctxs._1._3, ctxs._1._5, ctxs._1._6._3);
            continue;
          }
          if (ctxs._1._1.tag === "Three") {
            up$c = false;
            up$r = $12(
              ctxs._1._1._1,
              ctxs._1._1._4,
              ctxs._1._1._7,
              tree,
              ctxs._1._6,
              ctxs._1._1._2,
              ctxs._1._1._5,
              ctxs._1._2,
              ctxs._1._4,
              ctxs._1._1._3,
              ctxs._1._1._6,
              ctxs._1._3,
              ctxs._1._5
            );
            continue;
          }
          if (ctxs._1._6.tag === "Three") {
            up$c = false;
            up$r = $13(
              ctxs._1._1,
              tree,
              ctxs._1._6._1,
              ctxs._1._6._4,
              ctxs._1._6._7,
              ctxs._1._2,
              ctxs._1._4,
              ctxs._1._6._2,
              ctxs._1._6._5,
              ctxs._1._3,
              ctxs._1._5,
              ctxs._1._6._3,
              ctxs._1._6._6
            );
            continue;
          }
          up$c = false;
          up$r = Partial._crashWith("The impossible happened in partial function `up`.");
          continue;
        }
        if (ctxs._1.tag === "ThreeRight") {
          if (ctxs._1._4.tag === "Two") {
            up$c = false;
            up$r = $10(ctxs._1._1, ctxs._1._4._1, ctxs._1._4._4, tree, ctxs._1._2, ctxs._1._4._2, ctxs._1._5, ctxs._1._3, ctxs._1._4._3, ctxs._1._6);
            continue;
          }
          if (ctxs._1._4.tag === "Three") {
            up$c = false;
            up$r = $14(
              ctxs._1._1,
              ctxs._1._4._1,
              ctxs._1._4._4,
              ctxs._1._4._7,
              tree,
              ctxs._1._2,
              ctxs._1._4._2,
              ctxs._1._4._5,
              ctxs._1._5,
              ctxs._1._3,
              ctxs._1._4._3,
              ctxs._1._4._6,
              ctxs._1._6
            );
            continue;
          }
          up$c = false;
          up$r = Partial._crashWith("The impossible happened in partial function `up`.");
          continue;
        }
        up$c = false;
        up$r = Partial._crashWith("The impossible happened in partial function `up`.");
        continue;
      }
      $runtime.fail();
    };
    return up$r;
  };
  const removeMaxNode = removeMaxNode$a0$copy => removeMaxNode$a1$copy => {
    let removeMaxNode$a0 = removeMaxNode$a0$copy, removeMaxNode$a1 = removeMaxNode$a1$copy, removeMaxNode$c = true, removeMaxNode$r;
    while (removeMaxNode$c) {
      const ctx = removeMaxNode$a0, m = removeMaxNode$a1;
      if (m.tag === "Two") {
        if (m._1.tag === "Leaf") {
          if (m._4.tag === "Leaf") {
            removeMaxNode$c = false;
            removeMaxNode$r = up(ctx)(Leaf);
            continue;
          }
          removeMaxNode$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoRight", m._1, m._2, m._3), ctx);
          removeMaxNode$a1 = m._4;
          continue;
        }
        removeMaxNode$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoRight", m._1, m._2, m._3), ctx);
        removeMaxNode$a1 = m._4;
        continue;
      }
      if (m.tag === "Three") {
        if (m._1.tag === "Leaf") {
          if (m._4.tag === "Leaf") {
            if (m._7.tag === "Leaf") {
              removeMaxNode$c = false;
              removeMaxNode$r = up(Data$dList$dTypes.$List("Cons", $TreeContext("TwoRight", Leaf, m._2, m._3), ctx))(Leaf);
              continue;
            }
            removeMaxNode$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", m._1, m._2, m._3, m._4, m._5, m._6), ctx);
            removeMaxNode$a1 = m._7;
            continue;
          }
          removeMaxNode$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", m._1, m._2, m._3, m._4, m._5, m._6), ctx);
          removeMaxNode$a1 = m._7;
          continue;
        }
        removeMaxNode$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", m._1, m._2, m._3, m._4, m._5, m._6), ctx);
        removeMaxNode$a1 = m._7;
        continue;
      }
      removeMaxNode$c = false;
      removeMaxNode$r = Partial._crashWith("The impossible happened in partial function `removeMaxNode`.");
      continue;
    };
    return removeMaxNode$r;
  };
  const maxNode = maxNode$a0$copy => {
    let maxNode$a0 = maxNode$a0$copy, maxNode$c = true, maxNode$r;
    while (maxNode$c) {
      const m = maxNode$a0;
      if (m.tag === "Two") {
        if (m._4.tag === "Leaf") {
          maxNode$c = false;
          maxNode$r = {key: m._2, value: m._3};
          continue;
        }
        maxNode$a0 = m._4;
        continue;
      }
      if (m.tag === "Three") {
        if (m._7.tag === "Leaf") {
          maxNode$c = false;
          maxNode$r = {key: m._5, value: m._6};
          continue;
        }
        maxNode$a0 = m._7;
        continue;
      }
      maxNode$c = false;
      maxNode$r = Partial._crashWith("The impossible happened in partial function `maxNode`.");
      continue;
    };
    return maxNode$r;
  };
  const down = down$a0$copy => down$a1$copy => {
    let down$a0 = down$a0$copy, down$a1 = down$a1$copy, down$c = true, down$r;
    while (down$c) {
      const ctx = down$a0, m = down$a1;
      if (m.tag === "Leaf") {
        down$c = false;
        down$r = Data$dMaybe.Nothing;
        continue;
      }
      if (m.tag === "Two") {
        const v = dictOrd.compare(k)(m._2);
        if (v.tag === "EQ") {
          if (m._4.tag === "Leaf") {
            down$c = false;
            down$r = Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(m._3, up(ctx)(Leaf)));
            continue;
          }
          const max = maxNode(m._1);
          down$c = false;
          down$r = Data$dMaybe.$Maybe(
            "Just",
            Data$dTuple.$Tuple(m._3, removeMaxNode(Data$dList$dTypes.$List("Cons", $TreeContext("TwoLeft", max.key, max.value, m._4), ctx))(m._1))
          );
          continue;
        }
        if (v.tag === "LT") {
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoLeft", m._2, m._3, m._4), ctx);
          down$a1 = m._1;
          continue;
        }
        down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("TwoRight", m._1, m._2, m._3), ctx);
        down$a1 = m._4;
        continue;
      }
      if (m.tag === "Three") {
        const v = dictOrd.compare(k)(m._5);
        const v3 = dictOrd.compare(k)(m._2);
        if (
          (() => {
            if (m._1.tag === "Leaf") {
              if (m._4.tag === "Leaf") { return m._7.tag === "Leaf"; }
              return false;
            }
            return false;
          })()
        ) {
          if (v3.tag === "EQ") {
            down$c = false;
            down$r = Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(m._3, fromZipper(dictOrd)(ctx)($Map("Two", Leaf, m._5, m._6, Leaf))));
            continue;
          }
          if (v.tag === "EQ") {
            down$c = false;
            down$r = Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(m._6, fromZipper(dictOrd)(ctx)($Map("Two", Leaf, m._2, m._3, Leaf))));
            continue;
          }
          if (v3.tag === "LT") {
            down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeLeft", m._2, m._3, m._4, m._5, m._6, m._7), ctx);
            down$a1 = m._1;
            continue;
          }
          if (v3.tag === "GT") {
            if (v.tag === "LT") {
              down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeMiddle", m._1, m._2, m._3, m._5, m._6, m._7), ctx);
              down$a1 = m._4;
              continue;
            }
            down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", m._1, m._2, m._3, m._4, m._5, m._6), ctx);
            down$a1 = m._7;
            continue;
          }
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", m._1, m._2, m._3, m._4, m._5, m._6), ctx);
          down$a1 = m._7;
          continue;
        }
        if (v3.tag === "EQ") {
          const max = maxNode(m._1);
          down$c = false;
          down$r = Data$dMaybe.$Maybe(
            "Just",
            Data$dTuple.$Tuple(m._3, removeMaxNode(Data$dList$dTypes.$List("Cons", $TreeContext("ThreeLeft", max.key, max.value, m._4, m._5, m._6, m._7), ctx))(m._1))
          );
          continue;
        }
        if (v.tag === "EQ") {
          const max = maxNode(m._4);
          down$c = false;
          down$r = Data$dMaybe.$Maybe(
            "Just",
            Data$dTuple.$Tuple(m._6, removeMaxNode(Data$dList$dTypes.$List("Cons", $TreeContext("ThreeMiddle", m._1, m._2, m._3, max.key, max.value, m._7), ctx))(m._4))
          );
          continue;
        }
        if (v3.tag === "LT") {
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeLeft", m._2, m._3, m._4, m._5, m._6, m._7), ctx);
          down$a1 = m._1;
          continue;
        }
        if (v3.tag === "GT") {
          if (v.tag === "LT") {
            down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeMiddle", m._1, m._2, m._3, m._5, m._6, m._7), ctx);
            down$a1 = m._4;
            continue;
          }
          down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", m._1, m._2, m._3, m._4, m._5, m._6), ctx);
          down$a1 = m._7;
          continue;
        }
        down$a0 = Data$dList$dTypes.$List("Cons", $TreeContext("ThreeRight", m._1, m._2, m._3, m._4, m._5, m._6), ctx);
        down$a1 = m._7;
        continue;
      }
      $runtime.fail();
    };
    return down$r;
  };
  return down(Data$dList$dTypes.Nil);
};
const foldableMap = {
  foldr: f => z => m => {
    if (m.tag === "Leaf") { return z; }
    if (m.tag === "Two") { return foldableMap.foldr(f)(f(m._3)(foldableMap.foldr(f)(z)(m._4)))(m._1); }
    if (m.tag === "Three") { return foldableMap.foldr(f)(f(m._3)(foldableMap.foldr(f)(f(m._6)(foldableMap.foldr(f)(z)(m._7)))(m._4)))(m._1); }
    $runtime.fail();
  },
  foldl: f => z => m => {
    if (m.tag === "Leaf") { return z; }
    if (m.tag === "Two") { return foldableMap.foldl(f)(f(foldableMap.foldl(f)(z)(m._1))(m._3))(m._4); }
    if (m.tag === "Three") { return foldableMap.foldl(f)(f(foldableMap.foldl(f)(f(foldableMap.foldl(f)(z)(m._1))(m._3))(m._4))(m._6))(m._7); }
    $runtime.fail();
  },
  foldMap: dictMonoid => {
    const append2 = dictMonoid.Semigroup0().append;
    return f => m => {
      if (m.tag === "Leaf") { return dictMonoid.mempty; }
      if (m.tag === "Two") { return append2(foldableMap.foldMap(dictMonoid)(f)(m._1))(append2(f(m._3))(foldableMap.foldMap(dictMonoid)(f)(m._4))); }
      if (m.tag === "Three") {
        return append2(foldableMap.foldMap(dictMonoid)(f)(m._1))(append2(f(m._3))(append2(foldableMap.foldMap(dictMonoid)(f)(m._4))(append2(f(m._6))(foldableMap.foldMap(dictMonoid)(f)(m._7)))));
      }
      $runtime.fail();
    };
  }
};
const foldableWithIndexMap = {
  foldrWithIndex: f => z => m => {
    if (m.tag === "Leaf") { return z; }
    if (m.tag === "Two") { return foldableWithIndexMap.foldrWithIndex(f)(f(m._2)(m._3)(foldableWithIndexMap.foldrWithIndex(f)(z)(m._4)))(m._1); }
    if (m.tag === "Three") {
      return foldableWithIndexMap.foldrWithIndex(f)(f(m._2)(m._3)(foldableWithIndexMap.foldrWithIndex(f)(f(m._5)(m._6)(foldableWithIndexMap.foldrWithIndex(f)(z)(m._7)))(m._4)))(m._1);
    }
    $runtime.fail();
  },
  foldlWithIndex: f => z => m => {
    if (m.tag === "Leaf") { return z; }
    if (m.tag === "Two") { return foldableWithIndexMap.foldlWithIndex(f)(f(m._2)(foldableWithIndexMap.foldlWithIndex(f)(z)(m._1))(m._3))(m._4); }
    if (m.tag === "Three") {
      return foldableWithIndexMap.foldlWithIndex(f)(f(m._5)(foldableWithIndexMap.foldlWithIndex(f)(f(m._2)(foldableWithIndexMap.foldlWithIndex(f)(z)(m._1))(m._3))(m._4))(m._6))(m._7);
    }
    $runtime.fail();
  },
  foldMapWithIndex: dictMonoid => {
    const append2 = dictMonoid.Semigroup0().append;
    return f => m => {
      if (m.tag === "Leaf") { return dictMonoid.mempty; }
      if (m.tag === "Two") {
        return append2(foldableWithIndexMap.foldMapWithIndex(dictMonoid)(f)(m._1))(append2(f(m._2)(m._3))(foldableWithIndexMap.foldMapWithIndex(dictMonoid)(f)(m._4)));
      }
      if (m.tag === "Three") {
        return append2(foldableWithIndexMap.foldMapWithIndex(dictMonoid)(f)(m._1))(append2(f(m._2)(m._3))(append2(foldableWithIndexMap.foldMapWithIndex(dictMonoid)(f)(m._4))(append2(f(m._5)(m._6))(foldableWithIndexMap.foldMapWithIndex(dictMonoid)(f)(m._7)))));
      }
      $runtime.fail();
    };
  },
  Foldable0: () => foldableMap
};
const keys = /* #__PURE__ */ (() => foldableWithIndexMap.foldrWithIndex(k => v => acc => Data$dList$dTypes.$List("Cons", k, acc))(Data$dList$dTypes.Nil))();
const traversableMap = {
  traverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map1 = Apply0.Functor0().map;
    return v => v1 => {
      if (v1.tag === "Leaf") { return dictApplicative.pure(Leaf); }
      if (v1.tag === "Two") {
        return Apply0.apply(Apply0.apply(Apply0.apply(map1(Two)(traversableMap.traverse(dictApplicative)(v)(v1._1)))(dictApplicative.pure(v1._2)))(v(v1._3)))(traversableMap.traverse(dictApplicative)(v)(v1._4));
      }
      if (v1.tag === "Three") {
        return Apply0.apply(Apply0.apply(Apply0.apply(Apply0.apply(Apply0.apply(Apply0.apply(map1(Three)(traversableMap.traverse(dictApplicative)(v)(v1._1)))(dictApplicative.pure(v1._2)))(v(v1._3)))(traversableMap.traverse(dictApplicative)(v)(v1._4)))(dictApplicative.pure(v1._5)))(v(v1._6)))(traversableMap.traverse(dictApplicative)(v)(v1._7));
      }
      $runtime.fail();
    };
  },
  sequence: dictApplicative => traversableMap.traverse(dictApplicative)(identity),
  Functor0: () => functorMap,
  Foldable1: () => foldableMap
};
const traversableWithIndexMap = {
  traverseWithIndex: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map1 = Apply0.Functor0().map;
    return v => v1 => {
      if (v1.tag === "Leaf") { return dictApplicative.pure(Leaf); }
      if (v1.tag === "Two") {
        return Apply0.apply(Apply0.apply(Apply0.apply(map1(Two)(traversableWithIndexMap.traverseWithIndex(dictApplicative)(v)(v1._1)))(dictApplicative.pure(v1._2)))(v(v1._2)(v1._3)))(traversableWithIndexMap.traverseWithIndex(dictApplicative)(v)(v1._4));
      }
      if (v1.tag === "Three") {
        return Apply0.apply(Apply0.apply(Apply0.apply(Apply0.apply(Apply0.apply(Apply0.apply(map1(Three)(traversableWithIndexMap.traverseWithIndex(dictApplicative)(v)(v1._1)))(dictApplicative.pure(v1._2)))(v(v1._2)(v1._3)))(traversableWithIndexMap.traverseWithIndex(dictApplicative)(v)(v1._4)))(dictApplicative.pure(v1._5)))(v(v1._5)(v1._6)))(traversableWithIndexMap.traverseWithIndex(dictApplicative)(v)(v1._7));
      }
      $runtime.fail();
    };
  },
  FunctorWithIndex0: () => functorWithIndexMap,
  FoldableWithIndex1: () => foldableWithIndexMap,
  Traversable2: () => traversableMap
};
const values = /* #__PURE__ */ (() => foldableMap.foldr(Data$dList$dTypes.Cons)(Data$dList$dTypes.Nil))();
const foldSubmapBy = dictOrd => appendFn => memptyValue => kmin => kmax => f => {
  const tooSmall = (() => {
    if (kmin.tag === "Just") { return k => dictOrd.compare(k)(kmin._1).tag === "LT"; }
    if (kmin.tag === "Nothing") { return v => false; }
    $runtime.fail();
  })();
  const tooLarge = (() => {
    if (kmax.tag === "Just") { return k => dictOrd.compare(k)(kmax._1).tag === "GT"; }
    if (kmax.tag === "Nothing") { return v => false; }
    $runtime.fail();
  })();
  const inBounds = (() => {
    if (kmin.tag === "Just") {
      if (kmax.tag === "Just") { return k => !(dictOrd.compare(kmin._1)(k).tag === "GT") && !(dictOrd.compare(k)(kmax._1).tag === "GT"); }
      if (kmax.tag === "Nothing") { return k => !(dictOrd.compare(kmin._1)(k).tag === "GT"); }
      $runtime.fail();
    }
    if (kmin.tag === "Nothing") {
      if (kmax.tag === "Just") { return k => !(dictOrd.compare(k)(kmax._1).tag === "GT"); }
      if (kmax.tag === "Nothing") { return v => true; }
      $runtime.fail();
    }
    $runtime.fail();
  })();
  const go = v => {
    if (v.tag === "Leaf") { return memptyValue; }
    if (v.tag === "Two") {
      return appendFn(appendFn((() => {
        if (tooSmall(v._2)) { return memptyValue; }
        return go(v._1);
      })())((() => {
        if (inBounds(v._2)) { return f(v._2)(v._3); }
        return memptyValue;
      })()))((() => {
        if (tooLarge(v._2)) { return memptyValue; }
        return go(v._4);
      })());
    }
    if (v.tag === "Three") {
      return appendFn(appendFn(appendFn(appendFn((() => {
        if (tooSmall(v._2)) { return memptyValue; }
        return go(v._1);
      })())((() => {
        if (inBounds(v._2)) { return f(v._2)(v._3); }
        return memptyValue;
      })()))((() => {
        if (tooSmall(v._5) || tooLarge(v._2)) { return memptyValue; }
        return go(v._4);
      })()))((() => {
        if (inBounds(v._5)) { return f(v._5)(v._6); }
        return memptyValue;
      })()))((() => {
        if (tooLarge(v._5)) { return memptyValue; }
        return go(v._7);
      })());
    }
    $runtime.fail();
  };
  return go;
};
const foldSubmap = dictOrd => dictMonoid => foldSubmapBy(dictOrd)(dictMonoid.Semigroup0().append)(dictMonoid.mempty);
const findMin = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0, v1 = go$a1;
      if (v1.tag === "Leaf") {
        go$c = false;
        go$r = v;
        continue;
      }
      if (v1.tag === "Two") {
        go$a0 = Data$dMaybe.$Maybe("Just", {key: v1._2, value: v1._3});
        go$a1 = v1._1;
        continue;
      }
      if (v1.tag === "Three") {
        go$a0 = Data$dMaybe.$Maybe("Just", {key: v1._2, value: v1._3});
        go$a1 = v1._1;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(Data$dMaybe.Nothing);
})();
const lookupGT = dictOrd => k => {
  const go = v => {
    if (v.tag === "Leaf") { return Data$dMaybe.Nothing; }
    if (v.tag === "Two") {
      const v2 = dictOrd.compare(k)(v._2);
      if (v2.tag === "EQ") { return findMin(v._4); }
      if (v2.tag === "LT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._1);
            if ($5.tag === "Nothing") { return {key: v._2, value: v._3}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v2.tag === "GT") { return go(v._4); }
      $runtime.fail();
    }
    if (v.tag === "Three") {
      const v3 = dictOrd.compare(k)(v._2);
      if (v3.tag === "EQ") { return findMin($Map("Two", v._4, v._5, v._6, v._7)); }
      if (v3.tag === "LT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._1);
            if ($5.tag === "Nothing") { return {key: v._2, value: v._3}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v3.tag === "GT") { return go($Map("Two", v._4, v._5, v._6, v._7)); }
      $runtime.fail();
    }
    $runtime.fail();
  };
  return go;
};
const findMax = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0, v1 = go$a1;
      if (v1.tag === "Leaf") {
        go$c = false;
        go$r = v;
        continue;
      }
      if (v1.tag === "Two") {
        go$a0 = Data$dMaybe.$Maybe("Just", {key: v1._2, value: v1._3});
        go$a1 = v1._4;
        continue;
      }
      if (v1.tag === "Three") {
        go$a0 = Data$dMaybe.$Maybe("Just", {key: v1._5, value: v1._6});
        go$a1 = v1._7;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(Data$dMaybe.Nothing);
})();
const lookupLT = dictOrd => k => {
  const go = v => {
    if (v.tag === "Leaf") { return Data$dMaybe.Nothing; }
    if (v.tag === "Two") {
      const v2 = dictOrd.compare(k)(v._2);
      if (v2.tag === "EQ") { return findMax(v._1); }
      if (v2.tag === "GT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._4);
            if ($5.tag === "Nothing") { return {key: v._2, value: v._3}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v2.tag === "LT") { return go(v._1); }
      $runtime.fail();
    }
    if (v.tag === "Three") {
      const v3 = dictOrd.compare(k)(v._5);
      if (v3.tag === "EQ") { return findMax($Map("Two", v._1, v._2, v._3, v._4)); }
      if (v3.tag === "GT") {
        return Data$dMaybe.$Maybe(
          "Just",
          (() => {
            const $5 = go(v._7);
            if ($5.tag === "Nothing") { return {key: v._5, value: v._6}; }
            if ($5.tag === "Just") { return $5._1; }
            $runtime.fail();
          })()
        );
      }
      if (v3.tag === "LT") { return go($Map("Two", v._1, v._2, v._3, v._4)); }
      $runtime.fail();
    }
    $runtime.fail();
  };
  return go;
};
const eqMap = dictEq => dictEq1 => {
  const eq1 = Data$dEq.eqArrayImpl(x => y => dictEq.eq(x._1)(y._1) && dictEq1.eq(x._2)(y._2));
  return {eq: m1 => m2 => eq1(toUnfoldable(Data$dUnfoldable.unfoldableArray)(m1))(toUnfoldable(Data$dUnfoldable.unfoldableArray)(m2))};
};
const ordMap = dictOrd => {
  const ordTuple = Data$dTuple.ordTuple(dictOrd);
  const eqMap1 = eqMap(dictOrd.Eq0());
  return dictOrd1 => {
    const compare = Data$dOrd.ordArray(ordTuple(dictOrd1)).compare;
    const eqMap2 = eqMap1(dictOrd1.Eq0());
    return {compare: m1 => m2 => compare(toUnfoldable(Data$dUnfoldable.unfoldableArray)(m1))(toUnfoldable(Data$dUnfoldable.unfoldableArray)(m2)), Eq0: () => eqMap2};
  };
};
const eq1Map = dictEq => ({eq1: dictEq1 => eqMap(dictEq)(dictEq1).eq});
const ord1Map = dictOrd => {
  const ordMap1 = ordMap(dictOrd);
  const $2 = dictOrd.Eq0();
  const eq1Map1 = {eq1: dictEq1 => eqMap($2)(dictEq1).eq};
  return {compare1: dictOrd1 => ordMap1(dictOrd1).compare, Eq10: () => eq1Map1};
};
const empty = Leaf;
const fromFoldable = dictOrd => dictFoldable => dictFoldable.foldl(m => v => insert(dictOrd)(v._1)(v._2)(m))(Leaf);
const filterWithKey = dictOrd => {
  const fromFoldable1 = fromFoldable(dictOrd)(Data$dList$dLazy$dTypes.foldableList);
  return predicate => {
    const $3 = Data$dList$dLazy.filter(v => predicate(v._1)(v._2));
    return x => fromFoldable1($3(toUnfoldable(Data$dList$dLazy$dTypes.unfoldableList)(x)));
  };
};
const filter = dictOrd => {
  const filterWithKey1 = filterWithKey(dictOrd);
  return predicate => filterWithKey1(v => predicate);
};
const filterKeys = dictOrd => {
  const filterWithKey1 = filterWithKey(dictOrd);
  return predicate => filterWithKey1(x => {
    const $4 = predicate(x);
    return v => $4;
  });
};
const fromFoldableWithIndex = dictOrd => dictFoldableWithIndex => dictFoldableWithIndex.foldlWithIndex(k => m => v => insert(dictOrd)(k)(v)(m))(Leaf);
const intersectionWith = dictOrd => f => m1 => m2 => {
  const go = go$a0$copy => go$a1$copy => go$a2$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$a2 = go$a2$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0, v1 = go$a1, v2 = go$a2;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = v2;
        continue;
      }
      if (v1.tag === "Nil") {
        go$c = false;
        go$r = v2;
        continue;
      }
      if (v.tag === "Cons") {
        if (v1.tag === "Cons") {
          const v3 = dictOrd.compare(v._1._1)(v1._1._1);
          if (v3.tag === "LT") {
            go$a0 = v._2;
            go$a1 = v1;
            go$a2 = v2;
            continue;
          }
          if (v3.tag === "EQ") {
            go$a0 = v._2;
            go$a1 = v1._2;
            go$a2 = insert(dictOrd)(v._1._1)(f(v._1._2)(v1._1._2))(v2);
            continue;
          }
          if (v3.tag === "GT") {
            go$a0 = v;
            go$a1 = v1._2;
            go$a2 = v2;
            continue;
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(toUnfoldable(Data$dList$dTypes.unfoldableList)(m1))(toUnfoldable(Data$dList$dTypes.unfoldableList)(m2))(Leaf);
};
const intersection = dictOrd => intersectionWith(dictOrd)(Data$dFunction.const);
const mapMaybeWithKey = dictOrd => f => foldableWithIndexMap.foldrWithIndex(k => a => acc => {
  const $5 = f(k)(a);
  if ($5.tag === "Nothing") { return acc; }
  if ($5.tag === "Just") { return insert(dictOrd)(k)($5._1)(acc); }
  $runtime.fail();
})(Leaf);
const mapMaybe = dictOrd => x => mapMaybeWithKey(dictOrd)(v => x);
const $$delete = dictOrd => k => m => {
  const $3 = pop(dictOrd)(k)(m);
  if ($3.tag === "Nothing") { return m; }
  if ($3.tag === "Just") { return $3._1._2; }
  $runtime.fail();
};
const difference = dictOrd => m1 => m2 => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const b = go$a0, v = go$a1;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = b;
        continue;
      }
      if (v.tag === "Cons") {
        go$a0 = $$delete(dictOrd)(v._1)(b);
        go$a1 = v._2;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(m1)(foldableWithIndexMap.foldrWithIndex(k => v => acc => Data$dList$dTypes.$List("Cons", k, acc))(Data$dList$dTypes.Nil)(m2));
};
const checkValid = tree => {
  const allHeights = v => {
    if (v.tag === "Leaf") { return Data$dList$dTypes.$List("Cons", 0, Data$dList$dTypes.Nil); }
    if (v.tag === "Two") { return Data$dList$dTypes.listMap(n => n + 1 | 0)(Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(allHeights(v._4))(allHeights(v._1))); }
    if (v.tag === "Three") {
      return Data$dList$dTypes.listMap(n => n + 1 | 0)(Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(allHeights(v._7))(allHeights(v._4)))(allHeights(v._1)));
    }
    $runtime.fail();
  };
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const b = go$a0, v = go$a1;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = b;
        continue;
      }
      if (v.tag === "Cons") {
        go$a0 = b + 1 | 0;
        go$a1 = v._2;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(0)(nub(allHeights(tree))) === 1;
};
const catMaybes = dictOrd => mapMaybe(dictOrd)(identity);
const applyMap = dictOrd => ({apply: intersectionWith(dictOrd)(identity), Functor0: () => functorMap});
const bindMap = dictOrd => (
  {
    bind: m => f => mapMaybeWithKey(dictOrd)(k => {
      const $4 = lookup(dictOrd)(k);
      return x => $4(f(x));
    })(m),
    Apply0: () => ({apply: intersectionWith(dictOrd)(identity), Functor0: () => functorMap})
  }
);
const alter = dictOrd => f => k => m => {
  const v = f(lookup(dictOrd)(k)(m));
  if (v.tag === "Nothing") { return $$delete(dictOrd)(k)(m); }
  if (v.tag === "Just") { return insert(dictOrd)(k)(v._1)(m); }
  $runtime.fail();
};
const fromFoldableWith = dictOrd => dictFoldable => f => dictFoldable.foldl(m => v => alter(dictOrd)(v1 => {
  if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", f(v._2)(v1._1)); }
  if (v1.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", v._2); }
  $runtime.fail();
})(v._1)(m))(Leaf);
const insertWith = dictOrd => f => k => v => alter(dictOrd)(x => Data$dMaybe.$Maybe(
  "Just",
  (() => {
    if (x.tag === "Nothing") { return v; }
    if (x.tag === "Just") { return f(x._1)(v); }
    $runtime.fail();
  })()
))(k);
const unionWith = dictOrd => f => m1 => m2 => foldableWithIndexMap.foldlWithIndex(k => m => v => alter(dictOrd)((() => {
  const $7 = f(v);
  return x => Data$dMaybe.$Maybe(
    "Just",
    (() => {
      if (x.tag === "Nothing") { return v; }
      if (x.tag === "Just") { return $7(x._1); }
      $runtime.fail();
    })()
  );
})())(k)(m))(m2)(m1);
const semigroupMap = () => dictOrd => dictSemigroup => ({append: l => r => unionWith(dictOrd)(dictSemigroup.append)(l)(r)});
const monoidSemigroupMap = () => dictOrd => dictSemigroup => {
  const semigroupMap3 = {append: l => r => unionWith(dictOrd)(dictSemigroup.append)(l)(r)};
  return {mempty: Leaf, Semigroup0: () => semigroupMap3};
};
const union = dictOrd => unionWith(dictOrd)(Data$dFunction.const);
const submap = dictOrd => kmin => kmax => foldSubmapBy(dictOrd)(union(dictOrd))(Leaf)(kmin)(kmax)(singleton);
const unions = dictOrd => dictFoldable => dictFoldable.foldl(union(dictOrd))(Leaf);
const update = dictOrd => f => k => m => alter(dictOrd)(v2 => {
  if (v2.tag === "Nothing") { return Data$dMaybe.Nothing; }
  if (v2.tag === "Just") { return f(v2._1); }
  $runtime.fail();
})(k)(m);
const altMap = dictOrd => ({alt: union(dictOrd), Functor0: () => functorMap});
const plusMap = dictOrd => ({empty: Leaf, Alt0: () => ({alt: union(dictOrd), Functor0: () => functorMap})});
export {
  $KickUp,
  $Map,
  $TreeContext,
  KickUp,
  Leaf,
  Three,
  ThreeLeft,
  ThreeMiddle,
  ThreeRight,
  Two,
  TwoLeft,
  TwoRight,
  all,
  altMap,
  alter,
  applyMap,
  bindMap,
  catMaybes,
  checkValid,
  $$delete as delete,
  difference,
  empty,
  eq1Map,
  eqMap,
  filter,
  filterKeys,
  filterWithKey,
  findMax,
  findMin,
  foldSubmap,
  foldSubmapBy,
  foldableMap,
  foldableWithIndexMap,
  fromFoldable,
  fromFoldableWith,
  fromFoldableWithIndex,
  fromZipper,
  functorMap,
  functorWithIndexMap,
  identity,
  insert,
  insertWith,
  intersection,
  intersectionWith,
  isEmpty,
  isSubmap,
  keys,
  lookup,
  lookupGE,
  lookupGT,
  lookupLE,
  lookupLT,
  mapMaybe,
  mapMaybeWithKey,
  member,
  monoidSemigroupMap,
  nub,
  ord1Map,
  ordMap,
  plusMap,
  pop,
  semigroupMap,
  showMap,
  showTree,
  singleton,
  size,
  submap,
  toUnfoldable,
  toUnfoldableUnordered,
  traversableMap,
  traversableWithIndexMap,
  union,
  unionWith,
  unions,
  update,
  values
};
