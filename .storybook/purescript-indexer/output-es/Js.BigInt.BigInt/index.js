import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import {
  and,
  asIntN,
  asUintN,
  biAdd,
  biCompare,
  biEquals,
  biMod,
  biMul,
  biOne,
  biSub,
  biZero,
  fromInt,
  fromNumberImpl,
  fromStringImpl,
  fromTypeLevelInt,
  not,
  or,
  pow,
  shl,
  shr,
  toString,
  xor
} from "./foreign.js";
const showBigInt = {show: toString};
const semiringBigInt = {add: biAdd, zero: biZero, mul: biMul, one: biOne};
const ringBigInt = {sub: biSub, Semiring0: () => semiringBigInt};
const eqBigInt = {eq: biEquals};
const ordBigInt = {
  compare: x => y => {
    const v = biCompare(x)(y);
    if (v === 1) { return Data$dOrdering.GT; }
    if (v === 0) { return Data$dOrdering.EQ; }
    return Data$dOrdering.LT;
  },
  Eq0: () => eqBigInt
};
const commutativeRingBigInt = {Ring0: () => ringBigInt};
const fromTLInt = () => dictReflectable => v => fromTypeLevelInt(dictReflectable.reflectType(Type$dProxy.Proxy));
const fromString = /* #__PURE__ */ fromStringImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const fromNumber = /* #__PURE__ */ fromNumberImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
export {commutativeRingBigInt, eqBigInt, fromNumber, fromString, fromTLInt, ordBigInt, ringBigInt, semiringBigInt, showBigInt};
export * from "./foreign.js";
