// | Immutable buffers and associated operations.
import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import {
  compareImpl,
  concat,
  concatToLength,
  create,
  eqImpl,
  fromArray,
  fromArrayBuffer,
  fromStringImpl,
  getAtOffsetImpl,
  readImpl,
  readStringImpl,
  showImpl,
  size,
  slice,
  toArray,
  toArrayBuffer,
  toStringImpl
} from "./foreign.js";
const toString = x => toStringImpl((() => {
  if (x.tag === "ASCII") { return "ascii"; }
  if (x.tag === "UTF8") { return "utf8"; }
  if (x.tag === "UTF16LE") { return "utf16le"; }
  if (x.tag === "UCS2") { return "ucs2"; }
  if (x.tag === "Base64") { return "base64"; }
  if (x.tag === "Latin1") { return "latin1"; }
  if (x.tag === "Binary") { return "binary"; }
  if (x.tag === "Hex") { return "hex"; }
  $runtime.fail();
})());
const showBuffer = {show: showImpl};
const readString = x => readStringImpl((() => {
  if (x.tag === "ASCII") { return "ascii"; }
  if (x.tag === "UTF8") { return "utf8"; }
  if (x.tag === "UTF16LE") { return "utf16le"; }
  if (x.tag === "UCS2") { return "ucs2"; }
  if (x.tag === "Base64") { return "base64"; }
  if (x.tag === "Latin1") { return "latin1"; }
  if (x.tag === "Binary") { return "binary"; }
  if (x.tag === "Hex") { return "hex"; }
  $runtime.fail();
})());
const read = x => readImpl((() => {
  if (x.tag === "UInt8") { return "UInt8"; }
  if (x.tag === "UInt16LE") { return "UInt16LE"; }
  if (x.tag === "UInt16BE") { return "UInt16BE"; }
  if (x.tag === "UInt32LE") { return "UInt32LE"; }
  if (x.tag === "UInt32BE") { return "UInt32BE"; }
  if (x.tag === "Int8") { return "Int8"; }
  if (x.tag === "Int16LE") { return "Int16LE"; }
  if (x.tag === "Int16BE") { return "Int16BE"; }
  if (x.tag === "Int32LE") { return "Int32LE"; }
  if (x.tag === "Int32BE") { return "Int32BE"; }
  if (x.tag === "FloatLE") { return "FloatLE"; }
  if (x.tag === "FloatBE") { return "FloatBE"; }
  if (x.tag === "DoubleLE") { return "DoubleLE"; }
  if (x.tag === "DoubleBE") { return "DoubleBE"; }
  $runtime.fail();
})());
const getAtOffset = /* #__PURE__ */ getAtOffsetImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const fromString = str => {
  const $1 = fromStringImpl(str);
  return x => $1((() => {
    if (x.tag === "ASCII") { return "ascii"; }
    if (x.tag === "UTF8") { return "utf8"; }
    if (x.tag === "UTF16LE") { return "utf16le"; }
    if (x.tag === "UCS2") { return "ucs2"; }
    if (x.tag === "Base64") { return "base64"; }
    if (x.tag === "Latin1") { return "latin1"; }
    if (x.tag === "Binary") { return "binary"; }
    if (x.tag === "Hex") { return "hex"; }
    $runtime.fail();
  })());
};
const eqBuffer = {eq: eqImpl};
const ordBuffer = {
  compare: a => b => {
    const v = compareImpl(a)(b);
    if (v < 0) { return Data$dOrdering.LT; }
    if (v > 0) { return Data$dOrdering.GT; }
    return Data$dOrdering.EQ;
  },
  Eq0: () => eqBuffer
};
const concat$p = concatToLength;
export {concat$p, eqBuffer, fromString, getAtOffset, ordBuffer, read, readString, showBuffer, toString};
export * from "./foreign.js";
