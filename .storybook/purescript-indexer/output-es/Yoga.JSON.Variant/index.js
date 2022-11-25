import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Foreign from "../Foreign/index.js";
import * as Foreign$dIndex from "../Foreign.Index/index.js";
import * as Foreign$dObject from "../Foreign.Object/index.js";
import * as Partial from "../Partial/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import * as Yoga$dJSON from "../Yoga.JSON/index.js";
const fail = /* #__PURE__ */ (() => {
  const $0 = Control$dMonad$dExcept$dTrans.monadThrowExceptT(Data$dIdentity.monadIdentity).throwError;
  return x => $0(Data$dNonEmpty.$NonEmpty(x, Data$dList$dTypes.Nil));
})();
const fromFoldable = /* #__PURE__ */ Foreign$dObject.fromFoldable(Data$dFoldable.foldableArray);
const alt = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.altExceptT(Data$dList$dTypes.semigroupNonEmptyList)(Data$dIdentity.monadIdentity).alt)();
const bind = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.bindExceptT(Data$dIdentity.monadIdentity).bind)();
const readProp = /* #__PURE__ */ Foreign$dIndex.unsafeReadProp(Data$dIdentity.monadIdentity);
const pure = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.applicativeExceptT(Data$dIdentity.monadIdentity).pure)();
const UntaggedVariant = x => x;
const TaggedVariant = x => x;
const writeForeignUntaggedVaria = {writeUntaggedVariantImpl: v => v1 => Partial._crashWith("Attempted to write empty Variant")};
const writeForeignTaggedVariant = {writeVariantImpl: v => v1 => v2 => v3 => Partial._crashWith("Attempted to write empty Variant")};
const showUntaggedVariant = dictShow => dictShow;
const showTaggedVariant = dictShow => dictShow;
const readForeignUntaggedVarian = {readUntaggedVariantImpl: v => v1 => fail(Foreign.$ForeignError("ForeignError", "Unable to match any variant member."))};
const readForeignTaggedVariantN = {readVariantImpl: __ => v => fail(Foreign.$ForeignError("ForeignError", "Unable to match any variant member."))};
const newtypeUntaggedVariantVar = {Coercible0: () => undefined};
const newtypeTaggedVariantVaria = {Coercible0: () => undefined};
const eqUntaggedVariant = dictEq => dictEq;
const eqTaggedVariant = dictEq => dictEq;
const writeVariantImpl = dict => dict.writeVariantImpl;
const writeForeignTaggedVariant1 = () => dictWriteForeignTaggedVariant => dictIsSymbol => dictIsSymbol1 => (
  {
    writeImpl: v => dictWriteForeignTaggedVariant.writeVariantImpl(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictIsSymbol1.reflectSymbol(Type$dProxy.Proxy))(Type$dProxy.Proxy)(v)
  }
);
const writeForeignTaggedVariant2 = dictIsSymbol => dictWriteForeign => () => dictWriteForeignTaggedVariant => (
  {
    writeVariantImpl: typeTag => valueTag => v => variant => {
      const name = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const $9 = dictWriteForeignTaggedVariant.writeVariantImpl(typeTag)(valueTag)(Type$dProxy.Proxy);
      if (variant.type === dictIsSymbol.reflectSymbol(Type$dProxy.Proxy)) {
        return Foreign$dObject._mapWithKey(
          fromFoldable([Data$dTuple.$Tuple(valueTag, dictWriteForeign.writeImpl(variant.value)), Data$dTuple.$Tuple(typeTag, name)]),
          v$1 => Yoga$dJSON.writeForeignForeign.writeImpl
        );
      }
      return $9(variant);
    }
  }
);
const writeUntaggedVariantImpl = dict => dict.writeUntaggedVariantImpl;
const writeForeignUntaggedVaria1 = () => dictWriteForeignUntaggedVariant => ({writeImpl: v => dictWriteForeignUntaggedVariant.writeUntaggedVariantImpl(Type$dProxy.Proxy)(v)});
const writeForeignUntaggedVaria2 = dictIsSymbol => dictWriteForeign => () => dictWriteForeignUntaggedVariant => (
  {
    writeUntaggedVariantImpl: v => variant => {
      const $6 = dictWriteForeignUntaggedVariant.writeUntaggedVariantImpl(Type$dProxy.Proxy);
      if (variant.type === dictIsSymbol.reflectSymbol(Type$dProxy.Proxy)) { return dictWriteForeign.writeImpl(variant.value); }
      return $6(variant);
    }
  }
);
const readVariantImpl = dict => dict.readVariantImpl;
const readForeignTaggedVariant = () => dictReadForeignTaggedVariant => dictIsSymbol => dictIsSymbol1 => (
  {readImpl: o => dictReadForeignTaggedVariant.readVariantImpl(Type$dProxy.Proxy)(o)}
);
const readForeignTaggedVariantC = dictIsSymbol => dictIsSymbol1 => dictIsSymbol2 => dictReadForeign => () => dictReadForeignTaggedVariant => (
  {
    readVariantImpl: v => o => {
      const valueTag = dictIsSymbol2.reflectSymbol(Type$dProxy.Proxy);
      const name = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      return alt(dictReadForeignTaggedVariant.readVariantImpl(Type$dProxy.Proxy)(o))(bind(bind(readProp(dictIsSymbol1.reflectSymbol(Type$dProxy.Proxy))(o))(Yoga$dJSON.readString))(type_ => {
        if (type_ === name) { return bind(bind(readProp(valueTag)(o))(dictReadForeign.readImpl))(v1 => pure({type: dictIsSymbol.reflectSymbol(Type$dProxy.Proxy), value: v1})); }
        return fail(Foreign.$ForeignError("ForeignError", "Did not match variant tag " + name));
      }));
    }
  }
);
const readUntaggedVariantImpl = dict => dict.readUntaggedVariantImpl;
const readForeignUntaggedVarian1 = () => dictReadForeignUntaggedVariant => ({readImpl: o => dictReadForeignUntaggedVariant.readUntaggedVariantImpl(Type$dProxy.Proxy)(o)});
const readForeignUntaggedVarian2 = dictIsSymbol => dictReadForeign => () => dictReadForeignUntaggedVariant => (
  {
    readUntaggedVariantImpl: v => o => alt(dictReadForeignUntaggedVariant.readUntaggedVariantImpl(Type$dProxy.Proxy)(o))((() => {
      const $6 = dictReadForeign.readImpl(o);
      if ($6.tag === "Left") { return Data$dEither.$Either("Left", $6._1); }
      if ($6.tag === "Right") { return Data$dEither.$Either("Right", {type: dictIsSymbol.reflectSymbol(Type$dProxy.Proxy), value: $6._1}); }
      $runtime.fail();
    })())
  }
);
export {
  TaggedVariant,
  UntaggedVariant,
  alt,
  bind,
  eqTaggedVariant,
  eqUntaggedVariant,
  fail,
  fromFoldable,
  newtypeTaggedVariantVaria,
  newtypeUntaggedVariantVar,
  pure,
  readForeignTaggedVariant,
  readForeignTaggedVariantC,
  readForeignTaggedVariantN,
  readForeignUntaggedVarian,
  readForeignUntaggedVarian1,
  readForeignUntaggedVarian2,
  readProp,
  readUntaggedVariantImpl,
  readVariantImpl,
  showTaggedVariant,
  showUntaggedVariant,
  writeForeignTaggedVariant,
  writeForeignTaggedVariant1,
  writeForeignTaggedVariant2,
  writeForeignUntaggedVaria,
  writeForeignUntaggedVaria1,
  writeForeignUntaggedVaria2,
  writeUntaggedVariantImpl,
  writeVariantImpl
};
