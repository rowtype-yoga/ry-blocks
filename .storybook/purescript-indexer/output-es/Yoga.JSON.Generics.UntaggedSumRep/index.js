import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
const alt = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.altExceptT(Data$dList$dTypes.semigroupNonEmptyList)(Data$dIdentity.monadIdentity).alt)();
const writeGenericUntaggedSumRe = dictWriteForeign => ({genericWriteForeignUntaggedSumRep: v => dictWriteForeign.writeImpl(v)});
const readGenericUntaggedSumRep = dictReadForeign => (
  {
    genericReadForeignUntaggedSumRep: f => {
      const $2 = dictReadForeign.readImpl(f);
      if ($2.tag === "Left") { return Data$dEither.$Either("Left", $2._1); }
      if ($2.tag === "Right") { return Data$dEither.$Either("Right", $2._1); }
      $runtime.fail();
    }
  }
);
const genericWriteForeignUntaggedSumRep = dict => dict.genericWriteForeignUntaggedSumRep;
const writeGenericUntaggedSumRe1 = dictWriteGenericUntaggedSumRep => dictWriteGenericUntaggedSumRep1 => (
  {
    genericWriteForeignUntaggedSumRep: v => {
      if (v.tag === "Inl") { return dictWriteGenericUntaggedSumRep.genericWriteForeignUntaggedSumRep(v._1); }
      if (v.tag === "Inr") { return dictWriteGenericUntaggedSumRep1.genericWriteForeignUntaggedSumRep(v._1); }
      $runtime.fail();
    }
  }
);
const writeGenericUntaggedSumRe2 = dictWriteGenericUntaggedSumRep => ({genericWriteForeignUntaggedSumRep: v => dictWriteGenericUntaggedSumRep.genericWriteForeignUntaggedSumRep(v)});
const genericWriteForeignUntaggedSum = dictGeneric => dictWriteGenericUntaggedSumRep => a => dictWriteGenericUntaggedSumRep.genericWriteForeignUntaggedSumRep(dictGeneric.from(a));
const genericReadForeignUntaggedSumRep = dict => dict.genericReadForeignUntaggedSumRep;
const readGenericUntaggedSumRep1 = dictReadGenericUntaggedSumRep => dictReadGenericUntaggedSumRep1 => (
  {
    genericReadForeignUntaggedSumRep: f => alt((() => {
      const $3 = dictReadGenericUntaggedSumRep.genericReadForeignUntaggedSumRep(f);
      if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
      if ($3.tag === "Right") { return Data$dEither.$Either("Right", Data$dGeneric$dRep.$Sum("Inl", $3._1)); }
      $runtime.fail();
    })())((() => {
      const $3 = dictReadGenericUntaggedSumRep1.genericReadForeignUntaggedSumRep(f);
      if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
      if ($3.tag === "Right") { return Data$dEither.$Either("Right", Data$dGeneric$dRep.$Sum("Inr", $3._1)); }
      $runtime.fail();
    })())
  }
);
const readGenericUntaggedSumRep2 = dictReadGenericUntaggedSumRep => (
  {
    genericReadForeignUntaggedSumRep: f => {
      const $2 = dictReadGenericUntaggedSumRep.genericReadForeignUntaggedSumRep(f);
      if ($2.tag === "Left") { return Data$dEither.$Either("Left", $2._1); }
      if ($2.tag === "Right") { return Data$dEither.$Either("Right", $2._1); }
      $runtime.fail();
    }
  }
);
const genericReadForeignUntaggedSum = dictGeneric => dictReadGenericUntaggedSumRep => f => {
  const $3 = dictReadGenericUntaggedSumRep.genericReadForeignUntaggedSumRep(f);
  if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
  if ($3.tag === "Right") { return Data$dEither.$Either("Right", dictGeneric.to($3._1)); }
  $runtime.fail();
};
export {
  alt,
  genericReadForeignUntaggedSum,
  genericReadForeignUntaggedSumRep,
  genericWriteForeignUntaggedSum,
  genericWriteForeignUntaggedSumRep,
  readGenericUntaggedSumRep,
  readGenericUntaggedSumRep1,
  readGenericUntaggedSumRep2,
  writeGenericUntaggedSumRe,
  writeGenericUntaggedSumRe1,
  writeGenericUntaggedSumRe2
};
