import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dSemigroup$dLast from "../Data.Semigroup.Last/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const $LL = (tag, _1, _2) => ({tag, _1, _2});
const monoidAdditive = /* #__PURE__ */ (() => {
  const semigroupAdditive1 = {append: v => v1 => v + v1};
  return {mempty: 0.0, Semigroup0: () => semigroupAdditive1};
})();
const Cons = value0 => value1 => $LL("Cons", value0, value1);
const Nil = /* #__PURE__ */ $LL("Nil");
const unfoldable = dictMonadRec => dictMonadGen => {
  const Monad0 = dictMonadGen.Monad0();
  const pure = Monad0.Applicative0().pure;
  const Bind1 = Monad0.Bind1();
  const map = Bind1.Apply0().Functor0().map;
  return dictUnfoldable => gen => map(dictUnfoldable.unfoldr(v => {
    if (v.tag === "Nil") { return Data$dMaybe.Nothing; }
    if (v.tag === "Cons") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v._1, v._2)); }
    $runtime.fail();
  }))(dictMonadGen.sized((() => {
    const $8 = dictMonadRec.tailRecM(v => {
      if (v._2 <= 0) { return pure(Control$dMonad$dRec$dClass.$Step("Done", v._1)); }
      return Bind1.bind(gen)(x => pure(Control$dMonad$dRec$dClass.$Step("Loop", Data$dTuple.$Tuple($LL("Cons", x, v._1), v._2 - 1 | 0))));
    });
    const $9 = Data$dTuple.Tuple(Nil);
    return x => $8($9(x));
  })()));
};
const semigroupFreqSemigroup = {
  append: v => v1 => pos => {
    const v2 = v(pos);
    if (v2._1.tag === "Just") { return v1(v2._1._1); }
    return v2;
  }
};
const fromIndex = dictFoldable1 => {
  const foldMap1 = dictFoldable1.foldMap1(Data$dSemigroup$dLast.semigroupLast);
  const foldr = dictFoldable1.Foldable0().foldr;
  return i => xs => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const v = go$a0, v1 = go$a1;
        if (v1.tag === "Cons") {
          if (v1._2.tag === "Nil") {
            go$c = false;
            go$r = v1._1;
            continue;
          }
          if (v <= 0) {
            go$c = false;
            go$r = v1._1;
            continue;
          }
          go$a0 = v - 1 | 0;
          go$a1 = v1._2;
          continue;
        }
        if (v1.tag === "Nil") {
          go$c = false;
          go$r = foldMap1(Data$dSemigroup$dLast.Last)(xs);
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go(i)(foldr(Cons)(Nil)(xs));
  };
};
const oneOf = dictMonadGen => {
  const bind = dictMonadGen.Monad0().Bind1().bind;
  return dictFoldable1 => {
    const length = dictFoldable1.Foldable0().foldl(c => v => 1 + c | 0)(0);
    const fromIndex1 = fromIndex(dictFoldable1);
    return xs => bind(dictMonadGen.chooseInt(0)(length(xs) - 1 | 0))(n => fromIndex1(n)(xs));
  };
};
const freqSemigroup = v => pos => {
  if (pos >= v._1) { return Data$dTuple.$Tuple(Data$dMaybe.$Maybe("Just", pos - v._1), v._2); }
  return Data$dTuple.$Tuple(Data$dMaybe.Nothing, v._2);
};
const frequency = dictMonadGen => {
  const bind = dictMonadGen.Monad0().Bind1().bind;
  return dictFoldable1 => {
    const foldMap = dictFoldable1.Foldable0().foldMap(monoidAdditive);
    const foldMap1 = dictFoldable1.foldMap1(semigroupFreqSemigroup);
    return xs => bind(dictMonadGen.chooseFloat(0.0)(foldMap(Data$dTuple.fst)(xs)))((() => {
      const $6 = foldMap1(freqSemigroup)(xs);
      return x => $6(x)._2;
    })());
  };
};
const filtered = dictMonadRec => dictMonadGen => {
  const $2 = dictMonadGen.Monad0().Bind1().Apply0().Functor0();
  return gen => dictMonadRec.tailRecM(v => $2.map(a => {
    if (a.tag === "Nothing") { return Control$dMonad$dRec$dClass.$Step("Loop", Data$dUnit.unit); }
    if (a.tag === "Just") { return Control$dMonad$dRec$dClass.$Step("Done", a._1); }
    $runtime.fail();
  })(gen))(Data$dUnit.unit);
};
const suchThat = dictMonadRec => dictMonadGen => {
  const filtered2 = filtered(dictMonadRec)(dictMonadGen);
  const $3 = dictMonadGen.Monad0().Bind1().Apply0().Functor0();
  return gen => pred => filtered2($3.map(a => {
    if (pred(a)) { return Data$dMaybe.$Maybe("Just", a); }
    return Data$dMaybe.Nothing;
  })(gen));
};
const elements = dictMonadGen => {
  const Monad0 = dictMonadGen.Monad0();
  const bind = Monad0.Bind1().bind;
  const pure = Monad0.Applicative0().pure;
  return dictFoldable1 => {
    const length = dictFoldable1.Foldable0().foldl(c => v => 1 + c | 0)(0);
    const fromIndex1 = fromIndex(dictFoldable1);
    return xs => bind(dictMonadGen.chooseInt(0)(length(xs) - 1 | 0))(n => pure(fromIndex1(n)(xs)));
  };
};
const choose = dictMonadGen => {
  const bind = dictMonadGen.Monad0().Bind1().bind;
  return genA => genB => bind(dictMonadGen.chooseBool)(v => {
    if (v) { return genA; }
    return genB;
  });
};
export {$LL, Cons, Nil, choose, elements, filtered, freqSemigroup, frequency, fromIndex, monoidAdditive, oneOf, semigroupFreqSemigroup, suchThat, unfoldable};
