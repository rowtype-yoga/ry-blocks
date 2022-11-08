// | Functions and types to support the other modules. Not for public use.
import * as $runtime from "../runtime.js";
import * as Node$dBuffer$dImmutable from "../Node.Buffer.Immutable/index.js";
import {copy, copyAll, fill, setAtOffset, writeInternal, writeStringInternal} from "./foreign.js";
const writeString = dictMonad => x => writeStringInternal((() => {
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
const write = dictMonad => x => writeInternal((() => {
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
const unsafeThaw = dictMonad => dictMonad.Applicative0().pure;
const usingToImmutable = dictMonad => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return f => x => unsafeThaw1(f(x));
};
const unsafeFreeze = dictMonad => dictMonad.Applicative0().pure;
const usingFromImmutable = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return f => buf => map(f)(unsafeFreeze1(buf));
};
const toString = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return m => {
    const $4 = Node$dBuffer$dImmutable.toString(m);
    return buf => map($4)(unsafeFreeze1(buf));
  };
};
const toArrayBuffer = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return buf => map(Node$dBuffer$dImmutable.toArrayBuffer)(unsafeFreeze1(buf));
};
const toArray = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return buf => map(Node$dBuffer$dImmutable.toArray)(unsafeFreeze1(buf));
};
const slice = Node$dBuffer$dImmutable.slice;
const size = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return buf => map(Node$dBuffer$dImmutable.size)(unsafeFreeze1(buf));
};
const readString = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return m => o => o$p => {
    const $6 = Node$dBuffer$dImmutable.readString(m)(o)(o$p);
    return buf => map($6)(unsafeFreeze1(buf));
  };
};
const read = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return t => o => {
    const $5 = Node$dBuffer$dImmutable.read(t)(o);
    return buf => map($5)(unsafeFreeze1(buf));
  };
};
const getAtOffset = dictMonad => {
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  const unsafeFreeze1 = dictMonad.Applicative0().pure;
  return o => {
    const $4 = Node$dBuffer$dImmutable.getAtOffset(o);
    return buf => map($4)(unsafeFreeze1(buf));
  };
};
const fromString = dictMonad => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return s => {
    const $3 = Node$dBuffer$dImmutable.fromString(s);
    return x => unsafeThaw1($3(x));
  };
};
const fromArrayBuffer = dictMonad => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return x => unsafeThaw1(Node$dBuffer$dImmutable.fromArrayBuffer(x));
};
const fromArray = dictMonad => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return x => unsafeThaw1(Node$dBuffer$dImmutable.fromArray(x));
};
const create = dictMonad => {
  const unsafeThaw1 = dictMonad.Applicative0().pure;
  return x => unsafeThaw1(Node$dBuffer$dImmutable.create(x));
};
const concat$p = dictMonad => arrs => n => v => Node$dBuffer$dImmutable.concatToLength(arrs)(n);
const concat = arrs => v => Node$dBuffer$dImmutable.concat(arrs);
export {
  concat,
  concat$p,
  create,
  fromArray,
  fromArrayBuffer,
  fromString,
  getAtOffset,
  read,
  readString,
  size,
  slice,
  toArray,
  toArrayBuffer,
  toString,
  unsafeFreeze,
  unsafeThaw,
  usingFromImmutable,
  usingToImmutable,
  write,
  writeString
};
export * from "./foreign.js";
