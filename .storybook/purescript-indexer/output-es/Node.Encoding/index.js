import * as $runtime from "../runtime.js";
import {byteLengthImpl} from "./foreign.js";
const $Encoding = tag => ({tag});
const ASCII = /* #__PURE__ */ $Encoding("ASCII");
const UTF8 = /* #__PURE__ */ $Encoding("UTF8");
const UTF16LE = /* #__PURE__ */ $Encoding("UTF16LE");
const UCS2 = /* #__PURE__ */ $Encoding("UCS2");
const Base64 = /* #__PURE__ */ $Encoding("Base64");
const Latin1 = /* #__PURE__ */ $Encoding("Latin1");
const Binary = /* #__PURE__ */ $Encoding("Binary");
const Hex = /* #__PURE__ */ $Encoding("Hex");
const showEncoding = {
  show: v => {
    if (v.tag === "ASCII") { return "ASCII"; }
    if (v.tag === "UTF8") { return "UTF8"; }
    if (v.tag === "UTF16LE") { return "UTF16LE"; }
    if (v.tag === "UCS2") { return "UCS2"; }
    if (v.tag === "Base64") { return "Base64"; }
    if (v.tag === "Latin1") { return "Latin1"; }
    if (v.tag === "Binary") { return "Binary"; }
    if (v.tag === "Hex") { return "Hex"; }
    $runtime.fail();
  }
};
const encodingToNode = v => {
  if (v.tag === "ASCII") { return "ascii"; }
  if (v.tag === "UTF8") { return "utf8"; }
  if (v.tag === "UTF16LE") { return "utf16le"; }
  if (v.tag === "UCS2") { return "ucs2"; }
  if (v.tag === "Base64") { return "base64"; }
  if (v.tag === "Latin1") { return "latin1"; }
  if (v.tag === "Binary") { return "binary"; }
  if (v.tag === "Hex") { return "hex"; }
  $runtime.fail();
};
const byteLength = str => enc => byteLengthImpl(str)((() => {
  if (enc.tag === "ASCII") { return "ascii"; }
  if (enc.tag === "UTF8") { return "utf8"; }
  if (enc.tag === "UTF16LE") { return "utf16le"; }
  if (enc.tag === "UCS2") { return "ucs2"; }
  if (enc.tag === "Base64") { return "base64"; }
  if (enc.tag === "Latin1") { return "latin1"; }
  if (enc.tag === "Binary") { return "binary"; }
  if (enc.tag === "Hex") { return "hex"; }
  $runtime.fail();
})());
export {$Encoding, ASCII, Base64, Binary, Hex, Latin1, UCS2, UTF16LE, UTF8, byteLength, encodingToNode, showEncoding};
export * from "./foreign.js";
