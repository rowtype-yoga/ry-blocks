import * as $runtime from "../runtime.js";
import * as Data$dNullable from "../Data.Nullable/index.js";
import * as Node$dFS from "../Node.FS/index.js";
import * as Node$dFS$dPerms from "../Node.FS.Perms/index.js";
import {createReadStreamImpl, createWriteStreamImpl} from "./foreign.js";
const readWrite = /* #__PURE__ */ (() => {
  const rw = {r: true, w: true, x: false};
  return {u: rw, g: rw, o: rw};
})();
const fdCreateWriteStreamWith = opts => fd => {
  const $2 = {
    fd: fd,
    mode: Node$dFS$dPerms.permsToInt(opts.perms),
    flags: (() => {
      if (opts.flags.tag === "R") { return "r"; }
      if (opts.flags.tag === "R_PLUS") { return "r+"; }
      if (opts.flags.tag === "RS") { return "rs"; }
      if (opts.flags.tag === "RS_PLUS") { return "rs+"; }
      if (opts.flags.tag === "W") { return "w"; }
      if (opts.flags.tag === "WX") { return "wx"; }
      if (opts.flags.tag === "W_PLUS") { return "w+"; }
      if (opts.flags.tag === "WX_PLUS") { return "wx+"; }
      if (opts.flags.tag === "A") { return "a"; }
      if (opts.flags.tag === "AX") { return "ax"; }
      if (opts.flags.tag === "A_PLUS") { return "a+"; }
      if (opts.flags.tag === "AX_PLUS") { return "ax+"; }
      $runtime.fail();
    })()
  };
  return () => createWriteStreamImpl(Data$dNullable.null, $2);
};
const fdCreateReadStreamWith = opts => fd => {
  const $2 = {
    fd: fd,
    mode: Node$dFS$dPerms.permsToInt(opts.perms),
    flags: (() => {
      if (opts.flags.tag === "R") { return "r"; }
      if (opts.flags.tag === "R_PLUS") { return "r+"; }
      if (opts.flags.tag === "RS") { return "rs"; }
      if (opts.flags.tag === "RS_PLUS") { return "rs+"; }
      if (opts.flags.tag === "W") { return "w"; }
      if (opts.flags.tag === "WX") { return "wx"; }
      if (opts.flags.tag === "W_PLUS") { return "w+"; }
      if (opts.flags.tag === "WX_PLUS") { return "wx+"; }
      if (opts.flags.tag === "A") { return "a"; }
      if (opts.flags.tag === "AX") { return "ax"; }
      if (opts.flags.tag === "A_PLUS") { return "a+"; }
      if (opts.flags.tag === "AX_PLUS") { return "ax+"; }
      $runtime.fail();
    })(),
    autoClose: opts.autoClose
  };
  return () => createReadStreamImpl(Data$dNullable.null, $2);
};
const defaultWriteStreamOptions = {flags: Node$dFS.W, perms: readWrite};
const fdCreateWriteStream = /* #__PURE__ */ fdCreateWriteStreamWith(defaultWriteStreamOptions);
const defaultReadStreamOptions = {flags: Node$dFS.R, perms: readWrite, autoClose: true};
const fdCreateReadStream = /* #__PURE__ */ fdCreateReadStreamWith(defaultReadStreamOptions);
const createWriteStreamWith = opts => file => {
  const $2 = Data$dNullable.notNull(file);
  const $3 = {
    mode: Node$dFS$dPerms.permsToInt(opts.perms),
    flags: (() => {
      if (opts.flags.tag === "R") { return "r"; }
      if (opts.flags.tag === "R_PLUS") { return "r+"; }
      if (opts.flags.tag === "RS") { return "rs"; }
      if (opts.flags.tag === "RS_PLUS") { return "rs+"; }
      if (opts.flags.tag === "W") { return "w"; }
      if (opts.flags.tag === "WX") { return "wx"; }
      if (opts.flags.tag === "W_PLUS") { return "w+"; }
      if (opts.flags.tag === "WX_PLUS") { return "wx+"; }
      if (opts.flags.tag === "A") { return "a"; }
      if (opts.flags.tag === "AX") { return "ax"; }
      if (opts.flags.tag === "A_PLUS") { return "a+"; }
      if (opts.flags.tag === "AX_PLUS") { return "ax+"; }
      $runtime.fail();
    })()
  };
  return () => createWriteStreamImpl($2, $3);
};
const createWriteStream = /* #__PURE__ */ createWriteStreamWith(defaultWriteStreamOptions);
const createReadStreamWith = opts => file => {
  const $2 = Data$dNullable.notNull(file);
  const $3 = {
    mode: Node$dFS$dPerms.permsToInt(opts.perms),
    flags: (() => {
      if (opts.flags.tag === "R") { return "r"; }
      if (opts.flags.tag === "R_PLUS") { return "r+"; }
      if (opts.flags.tag === "RS") { return "rs"; }
      if (opts.flags.tag === "RS_PLUS") { return "rs+"; }
      if (opts.flags.tag === "W") { return "w"; }
      if (opts.flags.tag === "WX") { return "wx"; }
      if (opts.flags.tag === "W_PLUS") { return "w+"; }
      if (opts.flags.tag === "WX_PLUS") { return "wx+"; }
      if (opts.flags.tag === "A") { return "a"; }
      if (opts.flags.tag === "AX") { return "ax"; }
      if (opts.flags.tag === "A_PLUS") { return "a+"; }
      if (opts.flags.tag === "AX_PLUS") { return "ax+"; }
      $runtime.fail();
    })(),
    autoClose: opts.autoClose
  };
  return () => createReadStreamImpl($2, $3);
};
const createReadStream = /* #__PURE__ */ createReadStreamWith(defaultReadStreamOptions);
export {
  createReadStream,
  createReadStreamWith,
  createWriteStream,
  createWriteStreamWith,
  defaultReadStreamOptions,
  defaultWriteStreamOptions,
  fdCreateReadStream,
  fdCreateReadStreamWith,
  fdCreateWriteStream,
  fdCreateWriteStreamWith,
  readWrite
};
export * from "./foreign.js";
