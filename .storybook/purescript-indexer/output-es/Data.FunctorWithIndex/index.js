import * as $runtime from "../runtime.js";
import * as Data$dBifunctor from "../Data.Bifunctor/index.js";
import * as Data$dConst from "../Data.Const/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dFunctor$dCoproduct from "../Data.Functor.Coproduct/index.js";
import * as Data$dFunctor$dProduct from "../Data.Functor.Product/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid$dAdditive from "../Data.Monoid.Additive/index.js";
import * as Data$dMonoid$dConj from "../Data.Monoid.Conj/index.js";
import * as Data$dMonoid$dDisj from "../Data.Monoid.Disj/index.js";
import * as Data$dMonoid$dDual from "../Data.Monoid.Dual/index.js";
import * as Data$dMonoid$dMultiplicative from "../Data.Monoid.Multiplicative/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {mapWithIndexArray} from "./foreign.js";
const mapWithIndex = dict => dict.mapWithIndex;
const mapDefault = dictFunctorWithIndex => f => dictFunctorWithIndex.mapWithIndex(v => f);
const functorWithIndexTuple = {mapWithIndex: f => Data$dTuple.functorTuple.map(f(Data$dUnit.unit)), Functor0: () => Data$dTuple.functorTuple};
const functorWithIndexProduct = dictFunctorWithIndex => {
  const functorProduct = Data$dFunctor$dProduct.functorProduct(dictFunctorWithIndex.Functor0());
  return dictFunctorWithIndex1 => {
    const functorProduct1 = functorProduct(dictFunctorWithIndex1.Functor0());
    return {
      mapWithIndex: f => v => Data$dTuple.$Tuple(
        dictFunctorWithIndex.mapWithIndex(x => f(Data$dEither.$Either("Left", x)))(v._1),
        dictFunctorWithIndex1.mapWithIndex(x => f(Data$dEither.$Either("Right", x)))(v._2)
      ),
      Functor0: () => functorProduct1
    };
  };
};
const functorWithIndexMultiplicative = {mapWithIndex: f => f(Data$dUnit.unit), Functor0: () => Data$dMonoid$dMultiplicative.functorMultiplicative};
const functorWithIndexMaybe = {mapWithIndex: f => Data$dMaybe.functorMaybe.map(f(Data$dUnit.unit)), Functor0: () => Data$dMaybe.functorMaybe};
const functorWithIndexLast = {mapWithIndex: f => Data$dMaybe.functorMaybe.map(f(Data$dUnit.unit)), Functor0: () => Data$dMaybe.functorMaybe};
const functorWithIndexIdentity = {mapWithIndex: f => v => f(Data$dUnit.unit)(v), Functor0: () => Data$dIdentity.functorIdentity};
const functorWithIndexFirst = {mapWithIndex: f => Data$dMaybe.functorMaybe.map(f(Data$dUnit.unit)), Functor0: () => Data$dMaybe.functorMaybe};
const functorWithIndexEither = {mapWithIndex: f => Data$dEither.functorEither.map(f(Data$dUnit.unit)), Functor0: () => Data$dEither.functorEither};
const functorWithIndexDual = {mapWithIndex: f => f(Data$dUnit.unit), Functor0: () => Data$dMonoid$dDual.functorDual};
const functorWithIndexDisj = {mapWithIndex: f => f(Data$dUnit.unit), Functor0: () => Data$dMonoid$dDisj.functorDisj};
const functorWithIndexCoproduct = dictFunctorWithIndex => {
  const functorCoproduct = Data$dFunctor$dCoproduct.functorCoproduct(dictFunctorWithIndex.Functor0());
  return dictFunctorWithIndex1 => {
    const functorCoproduct1 = functorCoproduct(dictFunctorWithIndex1.Functor0());
    return {
      mapWithIndex: f => v => Data$dBifunctor.bifunctorEither.bimap(dictFunctorWithIndex.mapWithIndex(x => f(Data$dEither.$Either("Left", x))))(dictFunctorWithIndex1.mapWithIndex(x => f(Data$dEither.$Either(
        "Right",
        x
      ))))(v),
      Functor0: () => functorCoproduct1
    };
  };
};
const functorWithIndexConst = {mapWithIndex: v => v1 => v1, Functor0: () => Data$dConst.functorConst};
const functorWithIndexConj = {mapWithIndex: f => f(Data$dUnit.unit), Functor0: () => Data$dMonoid$dConj.functorConj};
const functorWithIndexCompose = dictFunctorWithIndex => {
  const $1 = dictFunctorWithIndex.Functor0();
  return dictFunctorWithIndex1 => {
    const $3 = dictFunctorWithIndex1.Functor0();
    const functorCompose1 = {map: f => v => $1.map($3.map(f))(v)};
    return {mapWithIndex: f => v => dictFunctorWithIndex.mapWithIndex(x => dictFunctorWithIndex1.mapWithIndex(Data$dTuple.curry(f)(x)))(v), Functor0: () => functorCompose1};
  };
};
const functorWithIndexArray = {mapWithIndex: mapWithIndexArray, Functor0: () => Data$dFunctor.functorArray};
const functorWithIndexApp = dictFunctorWithIndex => {
  const functorApp = dictFunctorWithIndex.Functor0();
  return {mapWithIndex: f => v => dictFunctorWithIndex.mapWithIndex(f)(v), Functor0: () => functorApp};
};
const functorWithIndexAdditive = {mapWithIndex: f => f(Data$dUnit.unit), Functor0: () => Data$dMonoid$dAdditive.functorAdditive};
export {
  functorWithIndexAdditive,
  functorWithIndexApp,
  functorWithIndexArray,
  functorWithIndexCompose,
  functorWithIndexConj,
  functorWithIndexConst,
  functorWithIndexCoproduct,
  functorWithIndexDisj,
  functorWithIndexDual,
  functorWithIndexEither,
  functorWithIndexFirst,
  functorWithIndexIdentity,
  functorWithIndexLast,
  functorWithIndexMaybe,
  functorWithIndexMultiplicative,
  functorWithIndexProduct,
  functorWithIndexTuple,
  mapDefault,
  mapWithIndex
};
export * from "./foreign.js";
