import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Node$dBuffer$dImmutable from "../Node.Buffer.Immutable/index.js";
import * as Node$dBuffer$dInternal from "../Node.Buffer.Internal/index.js";
const mutableBufferST = {
  create: /* #__PURE__ */ Node$dBuffer$dInternal.create(Control$dMonad$dST$dInternal.monadST),
  freeze: Node$dBuffer$dInternal.copyAll,
  unsafeFreeze: Control$dMonad$dST$dInternal.pure_,
  thaw: Node$dBuffer$dInternal.copyAll,
  unsafeThaw: Control$dMonad$dST$dInternal.pure_,
  fromArray: /* #__PURE__ */ Node$dBuffer$dInternal.fromArray(Control$dMonad$dST$dInternal.monadST),
  fromString: /* #__PURE__ */ Node$dBuffer$dInternal.fromString(Control$dMonad$dST$dInternal.monadST),
  fromArrayBuffer: /* #__PURE__ */ Node$dBuffer$dInternal.fromArrayBuffer(Control$dMonad$dST$dInternal.monadST),
  toArrayBuffer: /* #__PURE__ */ Node$dBuffer$dInternal.toArrayBuffer(Control$dMonad$dST$dInternal.monadST),
  read: /* #__PURE__ */ Node$dBuffer$dInternal.read(Control$dMonad$dST$dInternal.monadST),
  readString: /* #__PURE__ */ Node$dBuffer$dInternal.readString(Control$dMonad$dST$dInternal.monadST),
  toString: /* #__PURE__ */ Node$dBuffer$dInternal.toString(Control$dMonad$dST$dInternal.monadST),
  write: /* #__PURE__ */ Node$dBuffer$dInternal.write(Control$dMonad$dST$dInternal.monadST),
  writeString: /* #__PURE__ */ Node$dBuffer$dInternal.writeString(Control$dMonad$dST$dInternal.monadST),
  toArray: /* #__PURE__ */ Node$dBuffer$dInternal.toArray(Control$dMonad$dST$dInternal.monadST),
  getAtOffset: /* #__PURE__ */ Node$dBuffer$dInternal.getAtOffset(Control$dMonad$dST$dInternal.monadST),
  setAtOffset: Node$dBuffer$dInternal.setAtOffset,
  slice: Node$dBuffer$dImmutable.slice,
  size: /* #__PURE__ */ Node$dBuffer$dInternal.size(Control$dMonad$dST$dInternal.monadST),
  concat: Node$dBuffer$dInternal.concat,
  "concat'": /* #__PURE__ */ Node$dBuffer$dInternal.concat$p(Control$dMonad$dST$dInternal.monadST),
  copy: Node$dBuffer$dInternal.copy,
  fill: Node$dBuffer$dInternal.fill,
  Monad0: () => Control$dMonad$dST$dInternal.monadST
};
const run = st => Control$dMonad$dST$dInternal.run(Control$dMonad$dST$dInternal.bind_(st)(Control$dMonad$dST$dInternal.pure_));
export {mutableBufferST, run};
