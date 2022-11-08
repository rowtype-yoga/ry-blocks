// | Wraps Javascript's `RegExp` object that enables matching strings with
// | patterns defined by regular expressions.
// | For details of the underlying implementation, see [RegExp Reference at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).
import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import {_match, _replaceBy, _search, flagsImpl, regexImpl, replace, showRegexImpl, source, split, test} from "./foreign.js";
const showRegex = {show: showRegexImpl};
const search = /* #__PURE__ */ _search(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const replace$p = /* #__PURE__ */ _replaceBy(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const renderFlags = v => (() => {
  if (v.global) { return "g"; }
  return "";
})() + (
  (() => {
    if (v.ignoreCase) { return "i"; }
    return "";
  })() + (
    (() => {
      if (v.multiline) { return "m"; }
      return "";
    })() + (
      (() => {
        if (v.dotAll) { return "s"; }
        return "";
      })() + (
        (() => {
          if (v.sticky) { return "y"; }
          return "";
        })() + (() => {
          if (v.unicode) { return "u"; }
          return "";
        })()
      )
    )
  )
);
const regex = s => f => regexImpl(Data$dEither.Left)(Data$dEither.Right)(s)((() => {
  if (f.global) { return "g"; }
  return "";
})() + (
  (() => {
    if (f.ignoreCase) { return "i"; }
    return "";
  })() + (
    (() => {
      if (f.multiline) { return "m"; }
      return "";
    })() + (
      (() => {
        if (f.dotAll) { return "s"; }
        return "";
      })() + (
        (() => {
          if (f.sticky) { return "y"; }
          return "";
        })() + (() => {
          if (f.unicode) { return "u"; }
          return "";
        })()
      )
    )
  )
));
const parseFlags = s => (
  {
    global: Data$dString$dCodeUnits.contains("g")(s),
    ignoreCase: Data$dString$dCodeUnits.contains("i")(s),
    multiline: Data$dString$dCodeUnits.contains("m")(s),
    dotAll: Data$dString$dCodeUnits.contains("s")(s),
    sticky: Data$dString$dCodeUnits.contains("y")(s),
    unicode: Data$dString$dCodeUnits.contains("u")(s)
  }
);
const match = /* #__PURE__ */ _match(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const flags = x => flagsImpl(x);
export {flags, match, parseFlags, regex, renderFlags, replace$p, search, showRegex};
export * from "./foreign.js";
