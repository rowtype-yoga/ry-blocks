import * as $runtime from "../runtime.js";
const $BufferValueType = tag => ({tag});
const UInt8 = /* #__PURE__ */ $BufferValueType("UInt8");
const UInt16LE = /* #__PURE__ */ $BufferValueType("UInt16LE");
const UInt16BE = /* #__PURE__ */ $BufferValueType("UInt16BE");
const UInt32LE = /* #__PURE__ */ $BufferValueType("UInt32LE");
const UInt32BE = /* #__PURE__ */ $BufferValueType("UInt32BE");
const Int8 = /* #__PURE__ */ $BufferValueType("Int8");
const Int16LE = /* #__PURE__ */ $BufferValueType("Int16LE");
const Int16BE = /* #__PURE__ */ $BufferValueType("Int16BE");
const Int32LE = /* #__PURE__ */ $BufferValueType("Int32LE");
const Int32BE = /* #__PURE__ */ $BufferValueType("Int32BE");
const FloatLE = /* #__PURE__ */ $BufferValueType("FloatLE");
const FloatBE = /* #__PURE__ */ $BufferValueType("FloatBE");
const DoubleLE = /* #__PURE__ */ $BufferValueType("DoubleLE");
const DoubleBE = /* #__PURE__ */ $BufferValueType("DoubleBE");
const showBufferValueType = {
  show: v => {
    if (v.tag === "UInt8") { return "UInt8"; }
    if (v.tag === "UInt16LE") { return "UInt16LE"; }
    if (v.tag === "UInt16BE") { return "UInt16BE"; }
    if (v.tag === "UInt32LE") { return "UInt32LE"; }
    if (v.tag === "UInt32BE") { return "UInt32BE"; }
    if (v.tag === "Int8") { return "Int8"; }
    if (v.tag === "Int16LE") { return "Int16LE"; }
    if (v.tag === "Int16BE") { return "Int16BE"; }
    if (v.tag === "Int32LE") { return "Int32LE"; }
    if (v.tag === "Int32BE") { return "Int32BE"; }
    if (v.tag === "FloatLE") { return "FloatLE"; }
    if (v.tag === "FloatBE") { return "FloatBE"; }
    if (v.tag === "DoubleLE") { return "DoubleLE"; }
    if (v.tag === "DoubleBE") { return "DoubleBE"; }
    $runtime.fail();
  }
};
export {$BufferValueType, DoubleBE, DoubleLE, FloatBE, FloatLE, Int16BE, Int16LE, Int32BE, Int32LE, Int8, UInt16BE, UInt16LE, UInt32BE, UInt32LE, UInt8, showBufferValueType};
