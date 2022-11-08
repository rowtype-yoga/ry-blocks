// | Mutable buffers and associated operations.
import * as $runtime from "../runtime.js";
import * as Effect from "../Effect/index.js";
import * as Node$dBuffer$dImmutable from "../Node.Buffer.Immutable/index.js";
import * as Node$dBuffer$dInternal from "../Node.Buffer.Internal/index.js";
const mutableBufferEffect = {
  create: /* #__PURE__ */ Node$dBuffer$dInternal.create(Effect.monadEffect),
  freeze: Node$dBuffer$dInternal.copyAll,
  unsafeFreeze: Effect.pureE,
  thaw: Node$dBuffer$dInternal.copyAll,
  unsafeThaw: Effect.pureE,
  fromArray: /* #__PURE__ */ Node$dBuffer$dInternal.fromArray(Effect.monadEffect),
  fromString: /* #__PURE__ */ Node$dBuffer$dInternal.fromString(Effect.monadEffect),
  fromArrayBuffer: /* #__PURE__ */ Node$dBuffer$dInternal.fromArrayBuffer(Effect.monadEffect),
  toArrayBuffer: /* #__PURE__ */ Node$dBuffer$dInternal.toArrayBuffer(Effect.monadEffect),
  read: /* #__PURE__ */ Node$dBuffer$dInternal.read(Effect.monadEffect),
  readString: /* #__PURE__ */ Node$dBuffer$dInternal.readString(Effect.monadEffect),
  toString: /* #__PURE__ */ Node$dBuffer$dInternal.toString(Effect.monadEffect),
  write: /* #__PURE__ */ Node$dBuffer$dInternal.write(Effect.monadEffect),
  writeString: /* #__PURE__ */ Node$dBuffer$dInternal.writeString(Effect.monadEffect),
  toArray: /* #__PURE__ */ Node$dBuffer$dInternal.toArray(Effect.monadEffect),
  getAtOffset: /* #__PURE__ */ Node$dBuffer$dInternal.getAtOffset(Effect.monadEffect),
  setAtOffset: Node$dBuffer$dInternal.setAtOffset,
  slice: Node$dBuffer$dImmutable.slice,
  size: /* #__PURE__ */ Node$dBuffer$dInternal.size(Effect.monadEffect),
  concat: Node$dBuffer$dInternal.concat,
  "concat'": /* #__PURE__ */ Node$dBuffer$dInternal.concat$p(Effect.monadEffect),
  copy: Node$dBuffer$dInternal.copy,
  fill: Node$dBuffer$dInternal.fill,
  Monad0: () => Effect.monadEffect
};
export {mutableBufferEffect};
