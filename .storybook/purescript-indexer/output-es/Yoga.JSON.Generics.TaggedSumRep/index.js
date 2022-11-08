import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Foreign from "../Foreign/index.js";
import * as Foreign$dObject from "../Foreign.Object/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import * as Yoga$dJSON from "../Yoga.JSON/index.js";
const bind = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.bindExceptT(Data$dIdentity.monadIdentity).bind)();
const read$p = /* #__PURE__ */ (() => Yoga$dJSON.readForeignObject(Yoga$dJSON.readForeignForeign).readImpl)();
const fail = /* #__PURE__ */ (() => {
  const $0 = Control$dMonad$dExcept$dTrans.monadThrowExceptT(Data$dIdentity.monadIdentity).throwError;
  return x => $0(Data$dNonEmpty.$NonEmpty(x, Data$dList$dTypes.Nil));
})();
const pure = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.applicativeExceptT(Data$dIdentity.monadIdentity).pure)();
const fromFoldable = /* #__PURE__ */ Foreign$dObject.fromFoldable(Data$dFoldable.foldableArray);
const alt = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.altExceptT(Data$dList$dTypes.semigroupNonEmptyList)(Data$dIdentity.monadIdentity).alt)();
const writeGenericTaggedSumRepN = {genericWriteForeignTaggedSumRep: v => v1 => Yoga$dJSON._undefined};
const writeGenericTaggedSumRepA = dictWriteForeign => ({genericWriteForeignTaggedSumRep: v => v1 => dictWriteForeign.writeImpl(v1)});
const readGenericTaggedSumRepCo = dictIsSymbol => (
  {
    genericReadForeignTaggedSumRep: v => f => {
      const name = v.toConstructorName(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy));
      return bind(read$p(f))(v1 => bind((() => {
        const $5 = fail(Foreign.$ForeignError("ErrorAtProperty", v.typeTag, Foreign.$ForeignError("ForeignError", "Missing type tag: " + v.typeTag)));
        const $6 = Foreign$dObject._lookup(Data$dMaybe.Nothing, Data$dMaybe.Just, v.typeTag, v1);
        if ($6.tag === "Nothing") { return $5; }
        if ($6.tag === "Just") { return pure($6._1); }
        $runtime.fail();
      })())(typeFgn => bind(Yoga$dJSON.readString(typeFgn))(typeStr => {
        if (typeStr === name) {
          return Control$dMonad$dExcept$dTrans.withExceptT(Data$dIdentity.functorIdentity)(Data$dList$dTypes.functorNonEmptyList.map(Foreign.ErrorAtProperty(name)))(pure(Data$dGeneric$dRep.NoArguments));
        }
        return fail(Foreign.$ForeignError("ForeignError", "Wrong type tag " + (typeStr + (" where " + (v.typeTag + " was expected.")))));
      })));
    }
  }
);
const readGenericTaggedSumRepAr = dictReadForeign => (
  {
    genericReadForeignTaggedSumRep: v => f => {
      const $3 = dictReadForeign.readImpl(f);
      if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
      if ($3.tag === "Right") { return Data$dEither.$Either("Right", $3._1); }
      $runtime.fail();
    }
  }
);
const genericWriteForeignTaggedSumRep = dict => dict.genericWriteForeignTaggedSumRep;
const writeGenericTaggedSumRepC = dictWriteGenericTaggedSumRep => dictIsSymbol => (
  {
    genericWriteForeignTaggedSumRep: v => v1 => Foreign$dObject._mapWithKey(
      fromFoldable([
        Data$dTuple.$Tuple(v.typeTag, v.toConstructorName(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))),
        Data$dTuple.$Tuple(v.valueTag, dictWriteGenericTaggedSumRep.genericWriteForeignTaggedSumRep(v)(v1))
      ]),
      v$1 => Yoga$dJSON.writeForeignForeign.writeImpl
    )
  }
);
const writeGenericTaggedSumRepS = dictWriteGenericTaggedSumRep => dictWriteGenericTaggedSumRep1 => (
  {
    genericWriteForeignTaggedSumRep: options => v => {
      if (v.tag === "Inl") { return dictWriteGenericTaggedSumRep.genericWriteForeignTaggedSumRep(options)(v._1); }
      if (v.tag === "Inr") { return dictWriteGenericTaggedSumRep1.genericWriteForeignTaggedSumRep(options)(v._1); }
      $runtime.fail();
    }
  }
);
const genericWriteForeignTaggedSum = dictGeneric => dictWriteGenericTaggedSumRep => options => r => dictWriteGenericTaggedSumRep.genericWriteForeignTaggedSumRep(options)(dictGeneric.from(r));
const genericReadForeignTaggedSumRep = dict => dict.genericReadForeignTaggedSumRep;
const readGenericTaggedSumRepCo1 = dictReadGenericTaggedSumRep => dictIsSymbol => (
  {
    genericReadForeignTaggedSumRep: v => f => {
      const name = v.toConstructorName(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy));
      return bind(read$p(f))(v1 => bind((() => {
        const $6 = fail(Foreign.$ForeignError("ErrorAtProperty", v.typeTag, Foreign.$ForeignError("ForeignError", "Missing type tag: " + v.typeTag)));
        const $7 = Foreign$dObject._lookup(Data$dMaybe.Nothing, Data$dMaybe.Just, v.typeTag, v1);
        if ($7.tag === "Nothing") { return $6; }
        if ($7.tag === "Just") { return pure($7._1); }
        $runtime.fail();
      })())(typeFgn => bind(Yoga$dJSON.readString(typeFgn))(typeStr => bind((() => {
        const $8 = fail(Foreign.$ForeignError("ErrorAtProperty", v.valueTag, Foreign.$ForeignError("ForeignError", "Missing value tag: " + v.valueTag)));
        const $9 = Foreign$dObject._lookup(Data$dMaybe.Nothing, Data$dMaybe.Just, v.valueTag, v1);
        if ($9.tag === "Nothing") { return $8; }
        if ($9.tag === "Just") { return pure($9._1); }
        $runtime.fail();
      })())(value => {
        if (typeStr === name) {
          return Control$dMonad$dExcept$dTrans.withExceptT(Data$dIdentity.functorIdentity)(Data$dList$dTypes.functorNonEmptyList.map(Foreign.ErrorAtProperty(name)))((() => {
            const $9 = dictReadGenericTaggedSumRep.genericReadForeignTaggedSumRep(v)(value);
            if ($9.tag === "Left") { return Data$dEither.$Either("Left", $9._1); }
            if ($9.tag === "Right") { return Data$dEither.$Either("Right", $9._1); }
            $runtime.fail();
          })());
        }
        return fail(Foreign.$ForeignError("ForeignError", "Wrong constructor name tag " + (typeStr + (" where " + (name + " was expected.")))));
      }))));
    }
  }
);
const readGenericTaggedSumRepSu = dictReadGenericTaggedSumRep => dictReadGenericTaggedSumRep1 => (
  {
    genericReadForeignTaggedSumRep: options => f => alt((() => {
      const $4 = dictReadGenericTaggedSumRep.genericReadForeignTaggedSumRep(options)(f);
      if ($4.tag === "Left") { return Data$dEither.$Either("Left", $4._1); }
      if ($4.tag === "Right") { return Data$dEither.$Either("Right", Data$dGeneric$dRep.$Sum("Inl", $4._1)); }
      $runtime.fail();
    })())((() => {
      const $4 = dictReadGenericTaggedSumRep1.genericReadForeignTaggedSumRep(options)(f);
      if ($4.tag === "Left") { return Data$dEither.$Either("Left", $4._1); }
      if ($4.tag === "Right") { return Data$dEither.$Either("Right", Data$dGeneric$dRep.$Sum("Inr", $4._1)); }
      $runtime.fail();
    })())
  }
);
const genericReadForeignTaggedSum = dictGeneric => dictReadGenericTaggedSumRep => options => f => {
  const $4 = dictReadGenericTaggedSumRep.genericReadForeignTaggedSumRep(options)(f);
  if ($4.tag === "Left") { return Data$dEither.$Either("Left", $4._1); }
  if ($4.tag === "Right") { return Data$dEither.$Either("Right", dictGeneric.to($4._1)); }
  $runtime.fail();
};
const defaultOptions = {typeTag: "type", valueTag: "value", toConstructorName: x => x};
export {
  alt,
  bind,
  defaultOptions,
  fail,
  fromFoldable,
  genericReadForeignTaggedSum,
  genericReadForeignTaggedSumRep,
  genericWriteForeignTaggedSum,
  genericWriteForeignTaggedSumRep,
  pure,
  read$p,
  readGenericTaggedSumRepAr,
  readGenericTaggedSumRepCo,
  readGenericTaggedSumRepCo1,
  readGenericTaggedSumRepSu,
  writeGenericTaggedSumRepA,
  writeGenericTaggedSumRepC,
  writeGenericTaggedSumRepN,
  writeGenericTaggedSumRepS
};
