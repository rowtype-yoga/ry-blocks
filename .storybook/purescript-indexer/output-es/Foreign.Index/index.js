// | This module defines a type class for types which act like
// | _property indices_.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Foreign from "../Foreign/index.js";
import {unsafeHasOwnProperty, unsafeHasProperty, unsafeReadPropImpl} from "./foreign.js";
const unsafeReadProp = dictMonad => {
  const $1 = Control$dMonad$dExcept$dTrans.monadThrowExceptT(dictMonad).throwError;
  const pure = Control$dMonad$dExcept$dTrans.applicativeExceptT(dictMonad).pure;
  return k => value => unsafeReadPropImpl(
    $1(Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("TypeMismatch", "object", Foreign.typeOf(value)), Data$dList$dTypes.Nil)),
    pure,
    k,
    value
  );
};
const readProp = dictMonad => unsafeReadProp(dictMonad);
const readIndex = dictMonad => unsafeReadProp(dictMonad);
const ix = dict => dict.ix;
const index = dict => dict.index;
const indexableExceptT = dictMonad => {
  const $1 = Control$dMonad$dExcept$dTrans.bindExceptT(dictMonad);
  return {ix: dictIndex => f => i => $1.bind(f)(a => dictIndex.index(a)(i))};
};
const indexableForeign = dictMonad => ({ix: dictIndex => dictIndex.index});
const hasPropertyImpl = v => v1 => {
  if (Foreign.isNull(v1)) { return false; }
  if (Foreign.isUndefined(v1)) { return false; }
  if (Foreign.typeOf(v1) === "object" || Foreign.typeOf(v1) === "function") { return unsafeHasProperty(v, v1); }
  return false;
};
const hasProperty = dict => dict.hasProperty;
const hasOwnPropertyImpl = v => v1 => {
  if (Foreign.isNull(v1)) { return false; }
  if (Foreign.isUndefined(v1)) { return false; }
  if (Foreign.typeOf(v1) === "object" || Foreign.typeOf(v1) === "function") { return unsafeHasOwnProperty(v, v1); }
  return false;
};
const indexInt = dictMonad => (
  {
    index: (() => {
      const $1 = unsafeReadProp(dictMonad);
      return b => a => $1(a)(b);
    })(),
    hasProperty: hasPropertyImpl,
    hasOwnProperty: hasOwnPropertyImpl,
    errorAt: Foreign.ErrorAtIndex
  }
);
const indexString = dictMonad => (
  {
    index: (() => {
      const $1 = unsafeReadProp(dictMonad);
      return b => a => $1(a)(b);
    })(),
    hasProperty: hasPropertyImpl,
    hasOwnProperty: hasOwnPropertyImpl,
    errorAt: Foreign.ErrorAtProperty
  }
);
const hasOwnProperty = dict => dict.hasOwnProperty;
const errorAt = dict => dict.errorAt;
export {
  errorAt,
  hasOwnProperty,
  hasOwnPropertyImpl,
  hasProperty,
  hasPropertyImpl,
  index,
  indexInt,
  indexString,
  indexableExceptT,
  indexableForeign,
  ix,
  readIndex,
  readProp,
  unsafeReadProp
};
export * from "./foreign.js";
