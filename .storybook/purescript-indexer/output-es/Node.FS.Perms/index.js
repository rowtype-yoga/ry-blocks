import * as $runtime from "../runtime.js";
import * as Data$dEnum from "../Data.Enum/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dString$dCodePoints from "../Data.String.CodePoints/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data$dString$dCommon from "../Data.String.Common/index.js";
const compare = /* #__PURE__ */ (() => Data$dOrd.ordArray(Data$dOrd.ordBoolean).compare)();
const write = {r: false, w: true, x: false};
const semiringPerm = {
  add: v => v1 => ({r: v.r || v1.r, w: v.w || v1.w, x: v.x || v1.x}),
  zero: {r: false, w: false, x: false},
  mul: v => v1 => ({r: v.r && v1.r, w: v.w && v1.w, x: v.x && v1.x}),
  one: {r: true, w: true, x: true}
};
const read = {r: true, w: false, x: false};
const permToString = x => Data$dShow.showIntImpl((
  (() => {
    if (x.r) { return 4; }
    return 0;
  })() + (() => {
    if (x.w) { return 2; }
    return 0;
  })() | 0
) + (() => {
  if (x.x) { return 1; }
  return 0;
})() | 0);
const permsToString = v => "0" + (permToString(v.u) + (permToString(v.g) + permToString(v.o)));
const permsToInt = /* #__PURE__ */ (() => {
  const $0 = Data$dInt.fromStringAs(8);
  return x => {
    const $2 = $0(permsToString(x));
    if ($2.tag === "Just") { return $2._1; }
    $runtime.fail();
  };
})();
const none = /* #__PURE__ */ (() => semiringPerm.zero)();
const mkPerms = u => g => o => ({u: u, g: g, o: o});
const mkPerm = r => w => x => ({r: r, w: w, x: x});
const execute = {r: false, w: false, x: true};
const permFromChar = c => {
  if (c === "0") { return Data$dMaybe.$Maybe("Just", semiringPerm.zero); }
  if (c === "1") { return Data$dMaybe.$Maybe("Just", execute); }
  if (c === "2") { return Data$dMaybe.$Maybe("Just", write); }
  if (c === "3") { return Data$dMaybe.$Maybe("Just", {r: false, w: true, x: true}); }
  if (c === "4") { return Data$dMaybe.$Maybe("Just", read); }
  if (c === "5") { return Data$dMaybe.$Maybe("Just", {r: true, w: false, x: true}); }
  if (c === "6") { return Data$dMaybe.$Maybe("Just", {r: true, w: true, x: false}); }
  if (c === "7") { return Data$dMaybe.$Maybe("Just", {r: true, w: true, x: true}); }
  return Data$dMaybe.Nothing;
};
const permsFromString = /* #__PURE__ */ (() => {
  const $0 = Data$dEnum.fromCharCode(48);
  return x => {
    const $2 = Data$dString$dCodeUnits.toCharArray((() => {
      if (
        (() => {
          const $2 = Data$dString$dCodeUnits.charAt(0)(x);
          if ($2.tag === "Nothing") { return false; }
          if ($2.tag === "Just") { return $2._1 === $0; }
          return false;
        })()
      ) {
        return Data$dString$dCodeUnits.drop(Data$dString$dCodeUnits.length(Data$dString$dCodePoints.take(1)(x)))(x);
      }
      return x;
    })());
    if ($2.length === 3) {
      return Data$dMaybe.applyMaybe.apply(Data$dMaybe.applyMaybe.apply((() => {
        const $3 = permFromChar($2[0]);
        if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", g => o => ({u: $3._1, g: g, o: o})); }
        return Data$dMaybe.Nothing;
      })())(permFromChar($2[1])))(permFromChar($2[2]));
    }
    return Data$dMaybe.Nothing;
  };
})();
const eqPerm = {eq: v => v1 => v.r === v1.r && (v.w === v1.w && v.x === v1.x)};
const eqPerms = {
  eq: v => v1 => v.u.r === v1.u.r && (v.u.w === v1.u.w && v.u.x === v1.u.x) && (
    v.g.r === v1.g.r && (v.g.w === v1.g.w && v.g.x === v1.g.x) && (v.o.r === v1.o.r && (v.o.w === v1.o.w && v.o.x === v1.o.x))
  )
};
const ordPerm = {compare: v => v1 => compare([v.r, v.w, v.x])([v1.r, v1.w, v1.x]), Eq0: () => eqPerm};
const compare1 = /* #__PURE__ */ (() => Data$dOrd.ordArray(ordPerm).compare)();
const ordPerms = {compare: v => v1 => compare1([v.u, v.g, v.o])([v1.u, v1.g, v1.o]), Eq0: () => eqPerms};
const all = /* #__PURE__ */ (() => semiringPerm.one)();
const showPerm = {
  show: v => {
    if (v.r === semiringPerm.zero.r && (v.w === semiringPerm.zero.w && v.x === semiringPerm.zero.x)) { return "none"; }
    if (v.r === semiringPerm.one.r && (v.w === semiringPerm.one.w && v.x === semiringPerm.one.x)) { return "all"; }
    return Data$dString$dCommon.joinWith(" + ")(Data$dSemigroup.concatArray((() => {
      if (v.r) { return ["read"]; }
      return [];
    })())(Data$dSemigroup.concatArray((() => {
      if (v.w) { return ["write"]; }
      return [];
    })())((() => {
      if (v.x) { return ["execute"]; }
      return [];
    })())));
  }
};
const showPerms = {
  show: v => "mkPerms " + Data$dString$dCommon.joinWith(" ")(Data$dFunctor.arrayMap(perm => {
    const str = showPerm.show(perm);
    if (
      (() => {
        const $3 = Data$dString$dCodePoints.indexOf(" ")(str);
        if ($3.tag === "Nothing") { return true; }
        if ($3.tag === "Just") { return false; }
        $runtime.fail();
      })()
    ) {
      return str;
    }
    return "(" + (str + ")");
  })([v.u, v.g, v.o]))
};
export {
  all,
  compare,
  compare1,
  eqPerm,
  eqPerms,
  execute,
  mkPerm,
  mkPerms,
  none,
  ordPerm,
  ordPerms,
  permFromChar,
  permToString,
  permsFromString,
  permsToInt,
  permsToString,
  read,
  semiringPerm,
  showPerm,
  showPerms,
  write
};
