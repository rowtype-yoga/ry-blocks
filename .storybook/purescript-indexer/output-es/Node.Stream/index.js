// | This module provides a low-level wrapper for the [Node Stream API](https://nodejs.org/api/stream.html).
import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNullable from "../Data.Nullable/index.js";
import * as Effect from "../Effect/index.js";
import * as Effect$dException from "../Effect.Exception/index.js";
import * as Node$dBuffer from "../Node.Buffer/index.js";
import {
  cork,
  destroy,
  destroyWithError,
  endImpl,
  isPaused,
  onClose,
  onDataEitherImpl,
  onEnd,
  onError,
  onFinish,
  onReadable,
  pause,
  pipe,
  readChunkImpl,
  readImpl,
  resume,
  setDefaultEncodingImpl,
  setEncodingImpl,
  uncork,
  undefined as $$undefined,
  unpipe,
  unpipeAll,
  writeImpl,
  writeStringImpl
} from "./foreign.js";
const writeString = w => enc => s => cb => writeStringImpl(w)((() => {
  if (enc.tag === "ASCII") { return "ASCII"; }
  if (enc.tag === "UTF8") { return "UTF8"; }
  if (enc.tag === "UTF16LE") { return "UTF16LE"; }
  if (enc.tag === "UCS2") { return "UCS2"; }
  if (enc.tag === "Base64") { return "Base64"; }
  if (enc.tag === "Latin1") { return "Latin1"; }
  if (enc.tag === "Binary") { return "Binary"; }
  if (enc.tag === "Hex") { return "Hex"; }
  $runtime.fail();
})())(s)(x => cb(Data$dNullable.nullable(x, Data$dMaybe.Nothing, Data$dMaybe.Just))());
const write = w => b => cb => writeImpl(w)(b)(x => cb(Data$dNullable.nullable(x, Data$dMaybe.Nothing, Data$dMaybe.Just))());
const setEncoding = r => enc => setEncodingImpl(r)((() => {
  if (enc.tag === "ASCII") { return "ASCII"; }
  if (enc.tag === "UTF8") { return "UTF8"; }
  if (enc.tag === "UTF16LE") { return "UTF16LE"; }
  if (enc.tag === "UCS2") { return "UCS2"; }
  if (enc.tag === "Base64") { return "Base64"; }
  if (enc.tag === "Latin1") { return "Latin1"; }
  if (enc.tag === "Binary") { return "Binary"; }
  if (enc.tag === "Hex") { return "Hex"; }
  $runtime.fail();
})());
const setDefaultEncoding = r => enc => setDefaultEncodingImpl(r)((() => {
  if (enc.tag === "ASCII") { return "ASCII"; }
  if (enc.tag === "UTF8") { return "UTF8"; }
  if (enc.tag === "UTF16LE") { return "UTF16LE"; }
  if (enc.tag === "UCS2") { return "UCS2"; }
  if (enc.tag === "Base64") { return "Base64"; }
  if (enc.tag === "Latin1") { return "Latin1"; }
  if (enc.tag === "Binary") { return "Binary"; }
  if (enc.tag === "Hex") { return "Hex"; }
  $runtime.fail();
})());
const readChunk = /* #__PURE__ */ readChunkImpl(Data$dEither.Left)(Data$dEither.Right);
const readEither = r => size => readImpl(readChunk)(Data$dMaybe.Nothing)(Data$dMaybe.Just)(r)((() => {
  if (size.tag === "Nothing") { return $$undefined; }
  if (size.tag === "Just") { return size._1; }
  $runtime.fail();
})());
const readString = r => size => enc => {
  const $3 = readEither(r)(size);
  return () => {
    const v = $3();
    if (v.tag === "Nothing") { return Data$dMaybe.Nothing; }
    if (v.tag === "Just") {
      if (v._1.tag === "Left") { return Effect$dException.throwException(Effect$dException.error("Stream encoding should not be set"))(); }
      if (v._1.tag === "Right") {
        const a$p = Node$dBuffer.mutableBufferEffect.toString(enc)(v._1._1)();
        return Data$dMaybe.$Maybe("Just", a$p);
      }
      $runtime.fail();
    }
    $runtime.fail();
  };
};
const read = r => size => {
  const $2 = readEither(r)(size);
  return () => {
    const v = $2();
    if (v.tag === "Nothing") { return Data$dMaybe.Nothing; }
    if (v.tag === "Just") {
      if (v._1.tag === "Left") { return Effect$dException.throwException(Effect$dException.error("Stream encoding should not be set"))(); }
      if (v._1.tag === "Right") { return Data$dMaybe.$Maybe("Just", v._1._1); }
      $runtime.fail();
    }
    $runtime.fail();
  };
};
const onDataEither = r => cb => onDataEitherImpl(readChunk)(r)(cb);
const onData = r => cb => onDataEitherImpl(readChunk)(r)(a => Effect.bindE((() => {
  if (a.tag === "Left") { return Effect$dException.throwException(Effect$dException.error("Stream encoding should not be set")); }
  if (a.tag === "Right") { return () => a._1; }
  $runtime.fail();
})())(cb));
const onDataString = r => enc => cb => onData(r)((() => {
  const $3 = Node$dBuffer.mutableBufferEffect.toString(enc);
  return a => Effect.bindE($3(a))(cb);
})());
const end = w => cb => endImpl(w)(x => cb(Data$dNullable.nullable(x, Data$dMaybe.Nothing, Data$dMaybe.Just))());
export {end, onData, onDataEither, onDataString, read, readChunk, readEither, readString, setDefaultEncoding, setEncoding, write, writeString};
export * from "./foreign.js";
