import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNumber from "../Data.Number/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import {fromNumberImpl, fromStringAsImpl, pow, quot, rem, toNumber, toStringAs} from "./foreign.js";
const $Parity = tag => ({tag});
const Even = /* #__PURE__ */ $Parity("Even");
const Odd = /* #__PURE__ */ $Parity("Odd");
const showParity = {
  show: v => {
    if (v.tag === "Even") { return "Even"; }
    if (v.tag === "Odd") { return "Odd"; }
    $runtime.fail();
  }
};
const radix = n => {
  if (n >= 2 && n <= 36) { return Data$dMaybe.$Maybe("Just", n); }
  return Data$dMaybe.Nothing;
};
const odd = x => (x & 1) !== 0;
const octal = 8;
const hexadecimal = 16;
const fromStringAs = /* #__PURE__ */ fromStringAsImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const fromString = /* #__PURE__ */ fromStringAs(10);
const fromNumber = /* #__PURE__ */ fromNumberImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const unsafeClamp = x => {
  if (!Data$dNumber.isFinite(x)) { return 0; }
  if (x >= toNumber(2147483647)) { return 2147483647; }
  if (x <= toNumber(-2147483648)) { return -2147483648; }
  const $1 = fromNumber(x);
  if ($1.tag === "Nothing") { return 0; }
  if ($1.tag === "Just") { return $1._1; }
  $runtime.fail();
};
const round = x => unsafeClamp(Data$dNumber.round(x));
const trunc = x => unsafeClamp(Data$dNumber.trunc(x));
const floor = x => unsafeClamp(Data$dNumber.floor(x));
const even = x => (x & 1) === 0;
const parity = n => {
  if ((n & 1) === 0) { return Even; }
  return Odd;
};
const eqParity = {
  eq: x => y => {
    if (x.tag === "Even") { return y.tag === "Even"; }
    if (x.tag === "Odd") { return y.tag === "Odd"; }
    return false;
  }
};
const ordParity = {
  compare: x => y => {
    if (x.tag === "Even") {
      if (y.tag === "Even") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Even") { return Data$dOrdering.GT; }
    if (x.tag === "Odd") {
      if (y.tag === "Odd") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqParity
};
const semiringParity = {
  zero: Even,
  add: x => y => {
    if (
      (() => {
        if (x.tag === "Even") { return y.tag === "Even"; }
        if (x.tag === "Odd") { return y.tag === "Odd"; }
        return false;
      })()
    ) {
      return Even;
    }
    return Odd;
  },
  one: Odd,
  mul: v => v1 => {
    if (v.tag === "Odd") {
      if (v1.tag === "Odd") { return Odd; }
      return Even;
    }
    return Even;
  }
};
const ringParity = /* #__PURE__ */ (() => ({sub: semiringParity.add, Semiring0: () => semiringParity}))();
const divisionRingParity = {recip: x => x, Ring0: () => ringParity};
const decimal = 10;
const commutativeRingParity = {Ring0: () => ringParity};
const euclideanRingParity = {
  degree: v => {
    if (v.tag === "Even") { return 0; }
    if (v.tag === "Odd") { return 1; }
    $runtime.fail();
  },
  div: x => v => x,
  mod: v => v1 => Even,
  CommutativeRing0: () => commutativeRingParity
};
const ceil = x => unsafeClamp(Data$dNumber.ceil(x));
const boundedParity = {bottom: Even, top: Odd, Ord0: () => ordParity};
const binary = 2;
const base36 = 36;
export {
  $Parity,
  Even,
  Odd,
  base36,
  binary,
  boundedParity,
  ceil,
  commutativeRingParity,
  decimal,
  divisionRingParity,
  eqParity,
  euclideanRingParity,
  even,
  floor,
  fromNumber,
  fromString,
  fromStringAs,
  hexadecimal,
  octal,
  odd,
  ordParity,
  parity,
  radix,
  ringParity,
  round,
  semiringParity,
  showParity,
  trunc,
  unsafeClamp
};
export * from "./foreign.js";
