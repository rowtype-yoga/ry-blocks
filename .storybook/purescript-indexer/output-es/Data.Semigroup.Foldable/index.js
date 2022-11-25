import * as $runtime from "../runtime.js";
import * as Control$dApply from "../Control.Apply/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const $FoldRight1 = (_1, _2) => ({tag: "FoldRight1", _1, _2});
const identity = x => x;
const FoldRight1 = value0 => value1 => $FoldRight1(value0, value1);
const semigroupAct = dictApply => {
  const map = dictApply.Functor0().map;
  return {append: v => v1 => dictApply.apply(map(v$1 => Control$dApply.identity)(v))(v1)};
};
const mkFoldRight1 = /* #__PURE__ */ FoldRight1(Data$dFunction.const);
const foldr1 = dict => dict.foldr1;
const foldl1 = dict => dict.foldl1;
const maximumBy = dictFoldable1 => cmp => dictFoldable1.foldl1(x => y => {
  if (cmp(x)(y).tag === "GT") { return x; }
  return y;
});
const minimumBy = dictFoldable1 => cmp => dictFoldable1.foldl1(x => y => {
  if (cmp(x)(y).tag === "LT") { return x; }
  return y;
});
const foldableTuple = {foldMap1: dictSemigroup => f => v => f(v._2), foldr1: v => v1 => v1._2, foldl1: v => v1 => v1._2, Foldable0: () => Data$dFoldable.foldableTuple};
const foldableMultiplicative = {foldr1: v => v1 => v1, foldl1: v => v1 => v1, foldMap1: dictSemigroup => f => v => f(v), Foldable0: () => Data$dFoldable.foldableMultiplicative};
const foldableIdentity = {foldMap1: dictSemigroup => f => v => f(v), foldl1: v => v1 => v1, foldr1: v => v1 => v1, Foldable0: () => Data$dFoldable.foldableIdentity};
const foldableDual = {foldr1: v => v1 => v1, foldl1: v => v1 => v1, foldMap1: dictSemigroup => f => v => f(v), Foldable0: () => Data$dFoldable.foldableDual};
const foldRight1Semigroup = {append: v => v1 => $FoldRight1(a => f => v._1(f(v._2)(v1._1(a)(f)))(f), v1._2)};
const semigroupDual = {append: v => v1 => foldRight1Semigroup.append(v1)(v)};
const foldMap1DefaultR = dictFoldable1 => dictFunctor => dictSemigroup => f => {
  const $4 = dictFunctor.map(f);
  const $5 = dictFoldable1.foldr1(dictSemigroup.append);
  return x => $5($4(x));
};
const foldMap1DefaultL = dictFoldable1 => dictFunctor => dictSemigroup => f => {
  const $4 = dictFunctor.map(f);
  const $5 = dictFoldable1.foldl1(dictSemigroup.append);
  return x => $5($4(x));
};
const foldMap1 = dict => dict.foldMap1;
const foldl1Default = dictFoldable1 => {
  const $1 = dictFoldable1.foldMap1(semigroupDual)(mkFoldRight1);
  return x => a => {
    const $4 = $1(a);
    return $4._1($4._2)(b => a$1 => x(a$1)(b));
  };
};
const foldr1Default = dictFoldable1 => {
  const $1 = dictFoldable1.foldMap1(foldRight1Semigroup)(mkFoldRight1);
  return b => a => {
    const $4 = $1(a);
    return $4._1($4._2)(b);
  };
};
const intercalateMap = dictFoldable1 => dictSemigroup => {
  const foldMap12 = dictFoldable1.foldMap1({append: v => v1 => j => dictSemigroup.append(v(j))(dictSemigroup.append(j)(v1(j)))});
  return j => f => foldable => foldMap12(x => {
    const $7 = f(x);
    return v => $7;
  })(foldable)(j);
};
const intercalate = dictFoldable1 => dictSemigroup => {
  const foldMap12 = dictFoldable1.foldMap1({append: v => v1 => j => dictSemigroup.append(v(j))(dictSemigroup.append(j)(v1(j)))});
  return a => foldable => foldMap12(x => v => x)(foldable)(a);
};
const maximum = dictOrd => {
  const semigroupMax = {
    append: v => v1 => {
      const v$1 = dictOrd.compare(v)(v1);
      if (v$1.tag === "LT") { return v1; }
      if (v$1.tag === "EQ") { return v; }
      if (v$1.tag === "GT") { return v; }
      $runtime.fail();
    }
  };
  return dictFoldable1 => dictFoldable1.foldMap1(semigroupMax)(Unsafe$dCoerce.unsafeCoerce);
};
const minimum = dictOrd => {
  const semigroupMin = {
    append: v => v1 => {
      const v$1 = dictOrd.compare(v)(v1);
      if (v$1.tag === "LT") { return v; }
      if (v$1.tag === "EQ") { return v; }
      if (v$1.tag === "GT") { return v1; }
      $runtime.fail();
    }
  };
  return dictFoldable1 => dictFoldable1.foldMap1(semigroupMin)(Unsafe$dCoerce.unsafeCoerce);
};
const traverse1_ = dictFoldable1 => dictApply => {
  const $2 = dictApply.Functor0();
  const foldMap12 = dictFoldable1.foldMap1(semigroupAct(dictApply));
  return f => t => $2.map(v => Data$dUnit.unit)(foldMap12(x => f(x))(t));
};
const for1_ = dictFoldable1 => dictApply => {
  const $2 = traverse1_(dictFoldable1)(dictApply);
  return b => a => $2(a)(b);
};
const sequence1_ = dictFoldable1 => dictApply => traverse1_(dictFoldable1)(dictApply)(identity);
const fold1 = dictFoldable1 => dictSemigroup => dictFoldable1.foldMap1(dictSemigroup)(identity);
export {
  $FoldRight1,
  FoldRight1,
  fold1,
  foldMap1,
  foldMap1DefaultL,
  foldMap1DefaultR,
  foldRight1Semigroup,
  foldableDual,
  foldableIdentity,
  foldableMultiplicative,
  foldableTuple,
  foldl1,
  foldl1Default,
  foldr1,
  foldr1Default,
  for1_,
  identity,
  intercalate,
  intercalateMap,
  maximum,
  maximumBy,
  minimum,
  minimumBy,
  mkFoldRight1,
  semigroupAct,
  semigroupDual,
  sequence1_,
  traverse1_
};
