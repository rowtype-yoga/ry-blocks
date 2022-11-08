import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Foreign$dIndex from "../Foreign.Index/index.js";
import * as Yoga$dJSON from "../Yoga.JSON/index.js";
const bindExceptT = /* #__PURE__ */ Control$dMonad$dExcept$dTrans.bindExceptT(Data$dIdentity.monadIdentity);
const readIndex = /* #__PURE__ */ Foreign$dIndex.unsafeReadProp(Data$dIdentity.monadIdentity);
const pure = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.applicativeExceptT(Data$dIdentity.monadIdentity).pure)();
const apply = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.applyExceptT(Data$dIdentity.monadIdentity).apply)();
const writeGenericUntaggedProdu = dictWriteForeign => (
  {genericWriteForeignUntaggedProductRep: arr => v => Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([dictWriteForeign.writeImpl(v)]))(arr))}
);
const readGenericUntaggedProduc = dictReadForeign => (
  {genericReadForeignUntaggedProductRep: i => f => bindExceptT.bind(bindExceptT.bind(readIndex(i)(f))(dictReadForeign.readImpl))(x => pure(x))}
);
const genericWriteForeignUntaggedProductRep = dict => dict.genericWriteForeignUntaggedProductRep;
const writeGenericUntaggedProdu1 = dictWriteGenericUntaggedProduct => (
  {genericWriteForeignUntaggedProductRep: arr => v => dictWriteGenericUntaggedProduct.genericWriteForeignUntaggedProductRep(arr)(v)}
);
const writeGenericUntaggedProdu2 = dictWriteGenericUntaggedProduct => dictWriteGenericUntaggedProduct1 => (
  {
    genericWriteForeignUntaggedProductRep: arr => v => dictWriteGenericUntaggedProduct1.genericWriteForeignUntaggedProductRep(dictWriteGenericUntaggedProduct.genericWriteForeignUntaggedProductRep(arr)(v._1))(v._2)
  }
);
const genericWriteForeignUntaggedProduct = dictGeneric => dictWriteGenericUntaggedProduct => a => Data$dFunctor.arrayMap(Yoga$dJSON.writeForeignForeign.writeImpl)(dictWriteGenericUntaggedProduct.genericWriteForeignUntaggedProductRep([])(dictGeneric.from(a)));
const genericReadForeignUntaggedProductRep = dict => dict.genericReadForeignUntaggedProductRep;
const readGenericUntaggedProduc1 = dictReadGenericUntaggedProduct => (
  {
    genericReadForeignUntaggedProductRep: i => f => {
      const $3 = dictReadGenericUntaggedProduct.genericReadForeignUntaggedProductRep(i)(f);
      if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
      if ($3.tag === "Right") { return Data$dEither.$Either("Right", $3._1); }
      $runtime.fail();
    }
  }
);
const readGenericUntaggedProduc2 = dictReadGenericUntaggedProduct => dictReadGenericUntaggedProduct1 => (
  {
    genericReadForeignUntaggedProductRep: i => f => apply((() => {
      const $4 = dictReadGenericUntaggedProduct.genericReadForeignUntaggedProductRep(i)(f);
      if ($4.tag === "Left") { return Data$dEither.$Either("Left", $4._1); }
      if ($4.tag === "Right") { return Data$dEither.$Either("Right", Data$dGeneric$dRep.Product($4._1)); }
      $runtime.fail();
    })())(dictReadGenericUntaggedProduct1.genericReadForeignUntaggedProductRep(i + 1 | 0)(f))
  }
);
const genericReadForeignUntaggedProduct = dictGeneric => dictReadGenericUntaggedProduct => f => {
  const $3 = dictReadGenericUntaggedProduct.genericReadForeignUntaggedProductRep(0)(f);
  if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
  if ($3.tag === "Right") { return Data$dEither.$Either("Right", dictGeneric.to($3._1)); }
  $runtime.fail();
};
export {
  apply,
  bindExceptT,
  genericReadForeignUntaggedProduct,
  genericReadForeignUntaggedProductRep,
  genericWriteForeignUntaggedProduct,
  genericWriteForeignUntaggedProductRep,
  pure,
  readGenericUntaggedProduc,
  readGenericUntaggedProduc1,
  readGenericUntaggedProduc2,
  readIndex,
  writeGenericUntaggedProdu,
  writeGenericUntaggedProdu1,
  writeGenericUntaggedProdu2
};
