import * as $runtime from "../runtime.js";
import * as Data$dDateTime$dInstant from "../Data.DateTime.Instant/index.js";
import * as Data$dEuclideanRing from "../Data.EuclideanRing/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNullable from "../Data.Nullable/index.js";
import * as Data$dNumber from "../Data.Number/index.js";
import * as Node$dBuffer from "../Node.Buffer/index.js";
import * as Node$dFS$dPerms from "../Node.FS.Perms/index.js";
import * as Node$dFS$dStats from "../Node.FS.Stats/index.js";
import {
  appendFileSyncImpl,
  chmodSyncImpl,
  chownSyncImpl,
  closeSyncImpl,
  existsSyncImpl,
  fsyncSyncImpl,
  linkSyncImpl,
  lstatSyncImpl,
  mkdirSyncImpl,
  openSyncImpl,
  readFileSyncImpl,
  readSyncImpl,
  readdirSyncImpl,
  readlinkSyncImpl,
  realpathSyncImpl,
  renameSyncImpl,
  rmSyncImpl,
  rmdirSyncImpl,
  statSyncImpl,
  symlinkSyncImpl,
  truncateSyncImpl,
  unlinkSyncImpl,
  utimesSyncImpl,
  writeFileSyncImpl,
  writeSyncImpl
} from "./foreign.js";
const writeTextFile = encoding => file => text => {
  const $3 = {
    encoding: (() => {
      if (encoding.tag === "ASCII") { return "ASCII"; }
      if (encoding.tag === "UTF8") { return "UTF8"; }
      if (encoding.tag === "UTF16LE") { return "UTF16LE"; }
      if (encoding.tag === "UCS2") { return "UCS2"; }
      if (encoding.tag === "Base64") { return "Base64"; }
      if (encoding.tag === "Latin1") { return "Latin1"; }
      if (encoding.tag === "Binary") { return "Binary"; }
      if (encoding.tag === "Hex") { return "Hex"; }
      $runtime.fail();
    })()
  };
  return () => writeFileSyncImpl(file, text, $3);
};
const writeFile = file => buff => () => writeFileSyncImpl(file, buff, {});
const utimes = file => atime => mtime => {
  const $3 = Data$dEuclideanRing.intDiv(Data$dInt.unsafeClamp(Data$dNumber.round(Data$dDateTime$dInstant.fromDateTime(atime))))(1000);
  const $4 = Data$dEuclideanRing.intDiv(Data$dInt.unsafeClamp(Data$dNumber.round(Data$dDateTime$dInstant.fromDateTime(mtime))))(1000);
  return () => utimesSyncImpl(file, $3, $4);
};
const unlink = file => () => unlinkSyncImpl(file);
const truncate = file => len => () => truncateSyncImpl(file, len);
const symlink = src => dst => ty => {
  const $3 = (() => {
    if (ty.tag === "FileLink") { return "file"; }
    if (ty.tag === "DirLink") { return "dir"; }
    if (ty.tag === "JunctionLink") { return "junction"; }
    $runtime.fail();
  })();
  return () => symlinkSyncImpl(src, dst, $3);
};
const stat = file => () => {
  const a$p = statSyncImpl(file);
  return Node$dFS$dStats.$Stats(a$p);
};
const rmdir$p = path => opts => () => rmdirSyncImpl(path, opts);
const rmdir = path => () => rmdirSyncImpl(path, {maxRetries: 0, retryDelay: 100});
const rm$p = path => opts => () => rmSyncImpl(path, opts);
const rm = path => () => rmSyncImpl(path, {force: false, maxRetries: 100, recursive: false, retryDelay: 1000});
const rename = oldFile => newFile => () => renameSyncImpl(oldFile, newFile);
const realpath$p = path => cache => () => realpathSyncImpl(path, cache);
const realpath = path => () => realpathSyncImpl(path, {});
const readlink = path => () => readlinkSyncImpl(path);
const readdir = file => () => readdirSyncImpl(file);
const readTextFile = encoding => file => {
  const $2 = {
    encoding: (() => {
      if (encoding.tag === "ASCII") { return "ASCII"; }
      if (encoding.tag === "UTF8") { return "UTF8"; }
      if (encoding.tag === "UTF16LE") { return "UTF16LE"; }
      if (encoding.tag === "UCS2") { return "UCS2"; }
      if (encoding.tag === "Base64") { return "Base64"; }
      if (encoding.tag === "Latin1") { return "Latin1"; }
      if (encoding.tag === "Binary") { return "Binary"; }
      if (encoding.tag === "Hex") { return "Hex"; }
      $runtime.fail();
    })()
  };
  return () => readFileSyncImpl(file, $2);
};
const readFile = file => () => readFileSyncImpl(file, {});
const mkdir$p = file => v => {
  const $2 = {recursive: v.recursive, mode: Node$dFS$dPerms.permsToString(v.mode)};
  return () => mkdirSyncImpl(file, $2);
};
const mkdir = path => {
  const $1 = {
    recursive: false,
    mode: Node$dFS$dPerms.permsToString({u: Node$dFS$dPerms.semiringPerm.one, g: Node$dFS$dPerms.semiringPerm.one, o: Node$dFS$dPerms.semiringPerm.one})
  };
  return () => mkdirSyncImpl(path, $1);
};
const lstat = file => () => {
  const a$p = lstatSyncImpl(file);
  return Node$dFS$dStats.$Stats(a$p);
};
const link = src => dst => () => linkSyncImpl(src, dst);
const fdWrite = fd => buff => off => len => pos => {
  const $5 = (() => {
    if (pos.tag === "Nothing") { return Data$dNullable.null; }
    if (pos.tag === "Just") { return Data$dNullable.notNull(pos._1); }
    $runtime.fail();
  })();
  return () => writeSyncImpl(fd, buff, off, len, $5);
};
const fdRead = fd => buff => off => len => pos => {
  const $5 = (() => {
    if (pos.tag === "Nothing") { return Data$dNullable.null; }
    if (pos.tag === "Just") { return Data$dNullable.notNull(pos._1); }
    $runtime.fail();
  })();
  return () => readSyncImpl(fd, buff, off, len, $5);
};
const fdOpen = file => flags => mode => {
  const $3 = (() => {
    if (flags.tag === "R") { return "r"; }
    if (flags.tag === "R_PLUS") { return "r+"; }
    if (flags.tag === "RS") { return "rs"; }
    if (flags.tag === "RS_PLUS") { return "rs+"; }
    if (flags.tag === "W") { return "w"; }
    if (flags.tag === "WX") { return "wx"; }
    if (flags.tag === "W_PLUS") { return "w+"; }
    if (flags.tag === "WX_PLUS") { return "wx+"; }
    if (flags.tag === "A") { return "a"; }
    if (flags.tag === "AX") { return "ax"; }
    if (flags.tag === "A_PLUS") { return "a+"; }
    if (flags.tag === "AX_PLUS") { return "ax+"; }
    $runtime.fail();
  })();
  const $4 = (() => {
    if (mode.tag === "Nothing") { return Data$dNullable.null; }
    if (mode.tag === "Just") { return Data$dNullable.notNull(mode._1); }
    $runtime.fail();
  })();
  return () => openSyncImpl(file, $3, $4);
};
const fdNext = fd => buff => {
  const $2 = Node$dBuffer.mutableBufferEffect.size(buff);
  return () => {
    const sz = $2();
    return fdRead(fd)(buff)(0)(sz)(Data$dMaybe.Nothing)();
  };
};
const fdFlush = fd => () => fsyncSyncImpl(fd);
const fdClose = fd => () => closeSyncImpl(fd);
const fdAppend = fd => buff => {
  const $2 = Node$dBuffer.mutableBufferEffect.size(buff);
  return () => {
    const sz = $2();
    return fdWrite(fd)(buff)(0)(sz)(Data$dMaybe.Nothing)();
  };
};
const exists = file => () => existsSyncImpl(file);
const chown = file => uid => gid => () => chownSyncImpl(file, uid, gid);
const chmod = file => perms => {
  const $2 = Node$dFS$dPerms.permsToString(perms);
  return () => chmodSyncImpl(file, $2);
};
const appendTextFile = encoding => file => buff => {
  const $3 = {
    encoding: (() => {
      if (encoding.tag === "ASCII") { return "ASCII"; }
      if (encoding.tag === "UTF8") { return "UTF8"; }
      if (encoding.tag === "UTF16LE") { return "UTF16LE"; }
      if (encoding.tag === "UCS2") { return "UCS2"; }
      if (encoding.tag === "Base64") { return "Base64"; }
      if (encoding.tag === "Latin1") { return "Latin1"; }
      if (encoding.tag === "Binary") { return "Binary"; }
      if (encoding.tag === "Hex") { return "Hex"; }
      $runtime.fail();
    })()
  };
  return () => appendFileSyncImpl(file, buff, $3);
};
const appendFile = file => buff => () => appendFileSyncImpl(file, buff, {});
export {
  appendFile,
  appendTextFile,
  chmod,
  chown,
  exists,
  fdAppend,
  fdClose,
  fdFlush,
  fdNext,
  fdOpen,
  fdRead,
  fdWrite,
  link,
  lstat,
  mkdir,
  mkdir$p,
  readFile,
  readTextFile,
  readdir,
  readlink,
  realpath,
  realpath$p,
  rename,
  rm,
  rm$p,
  rmdir,
  rmdir$p,
  stat,
  symlink,
  truncate,
  unlink,
  utimes,
  writeFile,
  writeTextFile
};
export * from "./foreign.js";
