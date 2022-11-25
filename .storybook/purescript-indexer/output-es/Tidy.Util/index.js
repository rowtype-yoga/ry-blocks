import * as $runtime from "../runtime.js";
import * as Data$dString$dRegex from "../Data.String.Regex/index.js";
import * as Data$dString$dRegex$dFlags from "../Data.String.Regex.Flags/index.js";
import * as Data$dString$dRegex$dUnsafe from "../Data.String.Regex.Unsafe/index.js";
const splitStringEscapeLines = /* #__PURE__ */ Data$dString$dRegex.split(/* #__PURE__ */ Data$dString$dRegex$dUnsafe.unsafeRegex("\\\\ *\\r?\\n\\s*\\\\")(Data$dString$dRegex$dFlags.global));
const splitLines = /* #__PURE__ */ Data$dString$dRegex.split(/* #__PURE__ */ Data$dString$dRegex$dUnsafe.unsafeRegex("\\r?\\n")(Data$dString$dRegex$dFlags.global));
const overLabel = k => v => ({label: k(v.label), separator: v.separator, value: v.value});
const nameOf = v => v.name;
export {nameOf, overLabel, splitLines, splitStringEscapeLines};
