import * as $runtime from "../runtime.js";
import * as Control$dAlternative from "../Control.Alternative/index.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dString$dCommon from "../Data.String.Common/index.js";
const guard = /* #__PURE__ */ Control$dAlternative.guard(Control$dAlternative.alternativeArray);
const eq = /* #__PURE__ */ Data$dEq.eqArrayImpl(Data$dEq.eqStringImpl);
const RegexFlags = x => x;
const unicode = {global: false, ignoreCase: false, multiline: false, dotAll: false, sticky: false, unicode: true};
const sticky = {global: false, ignoreCase: false, multiline: false, dotAll: false, sticky: true, unicode: false};
const showRegexFlags = {
  show: v => {
    const usedFlags = Data$dSemigroup.concatArray([])(Data$dSemigroup.concatArray(Data$dFunctor.arrayMap(v$1 => "global")(guard(v.global)))(Data$dSemigroup.concatArray(Data$dFunctor.arrayMap(v$1 => "ignoreCase")(guard(v.ignoreCase)))(Data$dSemigroup.concatArray(Data$dFunctor.arrayMap(v$1 => "multiline")(guard(v.multiline)))(Data$dSemigroup.concatArray(Data$dFunctor.arrayMap(v$1 => "dotAll")(guard(v.dotAll)))(Data$dSemigroup.concatArray(Data$dFunctor.arrayMap(v$1 => "sticky")(guard(v.sticky)))(Data$dFunctor.arrayMap(v$1 => "unicode")(guard(v.unicode))))))));
    if (eq(usedFlags)([])) { return "noFlags"; }
    return "(" + (Data$dString$dCommon.joinWith(" <> ")(usedFlags) + ")");
  }
};
const semigroupRegexFlags = {
  append: v => v1 => (
    {
      global: v.global || v1.global,
      ignoreCase: v.ignoreCase || v1.ignoreCase,
      multiline: v.multiline || v1.multiline,
      dotAll: v.dotAll || v1.dotAll,
      sticky: v.sticky || v1.sticky,
      unicode: v.unicode || v1.unicode
    }
  )
};
const noFlags = {global: false, ignoreCase: false, multiline: false, dotAll: false, sticky: false, unicode: false};
const newtypeRegexFlags = {Coercible0: () => undefined};
const multiline = {global: false, ignoreCase: false, multiline: true, dotAll: false, sticky: false, unicode: false};
const monoidRegexFlags = {mempty: noFlags, Semigroup0: () => semigroupRegexFlags};
const ignoreCase = {global: false, ignoreCase: true, multiline: false, dotAll: false, sticky: false, unicode: false};
const global = {global: true, ignoreCase: false, multiline: false, dotAll: false, sticky: false, unicode: false};
const eqRegexFlags = {
  eq: ra => rb => ra.dotAll === rb.dotAll && (
    ra.global === rb.global && (ra.ignoreCase === rb.ignoreCase && (ra.multiline === rb.multiline && (ra.sticky === rb.sticky && ra.unicode === rb.unicode)))
  )
};
const dotAll = {global: false, ignoreCase: false, multiline: false, dotAll: true, sticky: false, unicode: false};
export {
  RegexFlags,
  dotAll,
  eq,
  eqRegexFlags,
  global,
  guard,
  ignoreCase,
  monoidRegexFlags,
  multiline,
  newtypeRegexFlags,
  noFlags,
  semigroupRegexFlags,
  showRegexFlags,
  sticky,
  unicode
};
