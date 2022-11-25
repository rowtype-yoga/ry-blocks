// | This module defines types and functions for working with _foreign_
// | data.
// |
// | `ExceptT (NonEmptyList ForeignError) m` is used in this library
// | to encode possible failures when dealing with foreign data.
// |
// | The `Alt` instance for `ExceptT` allows us to accumulate errors,
// | unlike `Either`, which preserves only the last error.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
import {isArray, isNull, isUndefined, tagOf, typeOf} from "./foreign.js";
const $ForeignError = (tag, _1, _2) => ({tag, _1, _2});
const ForeignError = value0 => $ForeignError("ForeignError", value0);
const TypeMismatch = value0 => value1 => $ForeignError("TypeMismatch", value0, value1);
const ErrorAtIndex = value0 => value1 => $ForeignError("ErrorAtIndex", value0, value1);
const ErrorAtProperty = value0 => value1 => $ForeignError("ErrorAtProperty", value0, value1);
const unsafeToForeign = Unsafe$dCoerce.unsafeCoerce;
const unsafeFromForeign = Unsafe$dCoerce.unsafeCoerce;
const showForeignError = {
  show: v => {
    if (v.tag === "ForeignError") { return "(ForeignError " + (Data$dShow.showStringImpl(v._1) + ")"); }
    if (v.tag === "ErrorAtIndex") { return "(ErrorAtIndex " + (Data$dShow.showIntImpl(v._1) + (" " + (showForeignError.show(v._2) + ")"))); }
    if (v.tag === "ErrorAtProperty") { return "(ErrorAtProperty " + (Data$dShow.showStringImpl(v._1) + (" " + (showForeignError.show(v._2) + ")"))); }
    if (v.tag === "TypeMismatch") { return "(TypeMismatch " + (Data$dShow.showStringImpl(v._1) + (" " + (Data$dShow.showStringImpl(v._2) + ")"))); }
    $runtime.fail();
  }
};
const renderForeignError = v => {
  if (v.tag === "ForeignError") { return v._1; }
  if (v.tag === "ErrorAtIndex") { return "Error at array index " + (Data$dShow.showIntImpl(v._1) + (": " + renderForeignError(v._2))); }
  if (v.tag === "ErrorAtProperty") { return "Error at property " + (Data$dShow.showStringImpl(v._1) + (": " + renderForeignError(v._2))); }
  if (v.tag === "TypeMismatch") { return "Type mismatch: expected " + (v._1 + (", found " + v._2)); }
  $runtime.fail();
};
const readUndefined = dictMonad => {
  const pure1 = Control$dMonad$dExcept$dTrans.applicativeExceptT(dictMonad).pure;
  return value => {
    if (isUndefined(value)) { return pure1(Data$dMaybe.Nothing); }
    return pure1(Data$dMaybe.$Maybe("Just", value));
  };
};
const readNullOrUndefined = dictMonad => {
  const pure1 = Control$dMonad$dExcept$dTrans.applicativeExceptT(dictMonad).pure;
  return value => {
    if (isNull(value) || isUndefined(value)) { return pure1(Data$dMaybe.Nothing); }
    return pure1(Data$dMaybe.$Maybe("Just", value));
  };
};
const readNull = dictMonad => {
  const pure1 = Control$dMonad$dExcept$dTrans.applicativeExceptT(dictMonad).pure;
  return value => {
    if (isNull(value)) { return pure1(Data$dMaybe.Nothing); }
    return pure1(Data$dMaybe.$Maybe("Just", value));
  };
};
const fail = dictMonad => {
  const $1 = Control$dMonad$dExcept$dTrans.monadThrowExceptT(dictMonad).throwError;
  return x => $1(Data$dNonEmpty.$NonEmpty(x, Data$dList$dTypes.Nil));
};
const readArray = dictMonad => {
  const pure1 = Control$dMonad$dExcept$dTrans.applicativeExceptT(dictMonad).pure;
  const $2 = Control$dMonad$dExcept$dTrans.monadThrowExceptT(dictMonad).throwError;
  return value => {
    if (isArray(value)) { return pure1(value); }
    return $2(Data$dNonEmpty.$NonEmpty($ForeignError("TypeMismatch", "array", tagOf(value)), Data$dList$dTypes.Nil));
  };
};
const unsafeReadTagged = dictMonad => {
  const pure1 = Control$dMonad$dExcept$dTrans.applicativeExceptT(dictMonad).pure;
  const $2 = Control$dMonad$dExcept$dTrans.monadThrowExceptT(dictMonad).throwError;
  return tag => value => {
    if (tagOf(value) === tag) { return pure1(value); }
    return $2(Data$dNonEmpty.$NonEmpty($ForeignError("TypeMismatch", tag, tagOf(value)), Data$dList$dTypes.Nil));
  };
};
const readBoolean = dictMonad => unsafeReadTagged(dictMonad)("Boolean");
const readNumber = dictMonad => unsafeReadTagged(dictMonad)("Number");
const readInt = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const readNumber1 = unsafeReadTagged(dictMonad)("Number");
  return value => {
    const error = Data$dEither.$Either("Left", Data$dNonEmpty.$NonEmpty($ForeignError("TypeMismatch", "Int", tagOf(value)), Data$dList$dTypes.Nil));
    return map(v2 => {
      if (v2.tag === "Left") { return error; }
      if (v2.tag === "Right") {
        const $6 = Data$dInt.fromNumber(v2._1);
        if ($6.tag === "Nothing") { return error; }
        if ($6.tag === "Just") { return Data$dEither.$Either("Right", $6._1); }
        $runtime.fail();
      }
      $runtime.fail();
    })(readNumber1(value));
  };
};
const readString = dictMonad => unsafeReadTagged(dictMonad)("String");
const readChar = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const readString1 = unsafeReadTagged(dictMonad)("String");
  return value => {
    const error = Data$dEither.$Either("Left", Data$dNonEmpty.$NonEmpty($ForeignError("TypeMismatch", "Char", tagOf(value)), Data$dList$dTypes.Nil));
    return map(v2 => {
      if (v2.tag === "Left") { return error; }
      if (v2.tag === "Right") {
        const $6 = Data$dString$dCodeUnits.toChar(v2._1);
        if ($6.tag === "Nothing") { return error; }
        if ($6.tag === "Just") { return Data$dEither.$Either("Right", $6._1); }
        $runtime.fail();
      }
      $runtime.fail();
    })(readString1(value));
  };
};
const eqForeignError = {
  eq: x => y => {
    if (x.tag === "ForeignError") {
      if (y.tag === "ForeignError") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "TypeMismatch") {
      if (y.tag === "TypeMismatch") { return x._1 === y._1 && x._2 === y._2; }
      return false;
    }
    if (x.tag === "ErrorAtIndex") {
      if (y.tag === "ErrorAtIndex") { return x._1 === y._1 && eqForeignError.eq(x._2)(y._2); }
      return false;
    }
    if (x.tag === "ErrorAtProperty") {
      if (y.tag === "ErrorAtProperty") { return x._1 === y._1 && eqForeignError.eq(x._2)(y._2); }
      return false;
    }
    return false;
  }
};
const ordForeignError = {
  compare: x => y => {
    if (x.tag === "ForeignError") {
      if (y.tag === "ForeignError") { return Data$dOrd.ordString.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ForeignError") { return Data$dOrdering.GT; }
    if (x.tag === "TypeMismatch") {
      if (y.tag === "TypeMismatch") {
        const v = Data$dOrd.ordString.compare(x._1)(y._1);
        if (v.tag === "LT") { return Data$dOrdering.LT; }
        if (v.tag === "GT") { return Data$dOrdering.GT; }
        return Data$dOrd.ordString.compare(x._2)(y._2);
      }
      return Data$dOrdering.LT;
    }
    if (y.tag === "TypeMismatch") { return Data$dOrdering.GT; }
    if (x.tag === "ErrorAtIndex") {
      if (y.tag === "ErrorAtIndex") {
        const v = Data$dOrd.ordInt.compare(x._1)(y._1);
        if (v.tag === "LT") { return Data$dOrdering.LT; }
        if (v.tag === "GT") { return Data$dOrdering.GT; }
        return ordForeignError.compare(x._2)(y._2);
      }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ErrorAtIndex") { return Data$dOrdering.GT; }
    if (x.tag === "ErrorAtProperty") {
      if (y.tag === "ErrorAtProperty") {
        const v = Data$dOrd.ordString.compare(x._1)(y._1);
        if (v.tag === "LT") { return Data$dOrdering.LT; }
        if (v.tag === "GT") { return Data$dOrdering.GT; }
        return ordForeignError.compare(x._2)(y._2);
      }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqForeignError
};
export {
  $ForeignError,
  ErrorAtIndex,
  ErrorAtProperty,
  ForeignError,
  TypeMismatch,
  eqForeignError,
  fail,
  ordForeignError,
  readArray,
  readBoolean,
  readChar,
  readInt,
  readNull,
  readNullOrUndefined,
  readNumber,
  readString,
  readUndefined,
  renderForeignError,
  showForeignError,
  unsafeFromForeign,
  unsafeReadTagged,
  unsafeToForeign
};
export * from "./foreign.js";
