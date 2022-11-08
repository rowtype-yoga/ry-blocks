import * as $runtime from "../runtime.js";
import * as Effect$dAff from "../Effect.Aff/index.js";
import * as Node$dFS$dAsync from "../Node.FS.Async/index.js";
const toAff1 = f => a => {
  const $2 = f(a);
  return Effect$dAff.makeAff(k => {
    const $4 = $2(k);
    return () => {
      $4();
      return Effect$dAff.nonCanceler;
    };
  });
};
const unlink = /* #__PURE__ */ toAff1(Node$dFS$dAsync.unlink);
const toAff2 = f => a => b => {
  const $3 = f(a)(b);
  return Effect$dAff.makeAff(k => {
    const $5 = $3(k);
    return () => {
      $5();
      return Effect$dAff.nonCanceler;
    };
  });
};
const truncate = /* #__PURE__ */ toAff2(Node$dFS$dAsync.truncate);
const writeFile = /* #__PURE__ */ toAff2(Node$dFS$dAsync.writeFile);
const toAff3 = f => a => b => c => {
  const $4 = f(a)(b)(c);
  return Effect$dAff.makeAff(k => {
    const $6 = $4(k);
    return () => {
      $6();
      return Effect$dAff.nonCanceler;
    };
  });
};
const utimes = /* #__PURE__ */ toAff3(Node$dFS$dAsync.utimes);
const writeTextFile = /* #__PURE__ */ toAff3(Node$dFS$dAsync.writeTextFile);
const toAff5 = f => a => b => c => d => e => {
  const $6 = f(a)(b)(c)(d)(e);
  return Effect$dAff.makeAff(k => {
    const $8 = $6(k);
    return () => {
      $8();
      return Effect$dAff.nonCanceler;
    };
  });
};
const symlink = /* #__PURE__ */ toAff3(Node$dFS$dAsync.symlink);
const stat = /* #__PURE__ */ toAff1(Node$dFS$dAsync.stat);
const rmdir$p = /* #__PURE__ */ toAff2(Node$dFS$dAsync.rmdir$p);
const rmdir = /* #__PURE__ */ toAff1(Node$dFS$dAsync.rmdir);
const rm$p = /* #__PURE__ */ toAff2(Node$dFS$dAsync.rm$p);
const rm = /* #__PURE__ */ toAff1(Node$dFS$dAsync.rmdir);
const rename = /* #__PURE__ */ toAff2(Node$dFS$dAsync.rename);
const realpath$p = /* #__PURE__ */ toAff2(Node$dFS$dAsync.realpath$p);
const realpath = /* #__PURE__ */ toAff1(Node$dFS$dAsync.realpath);
const readlink = /* #__PURE__ */ toAff1(Node$dFS$dAsync.readlink);
const readdir = /* #__PURE__ */ toAff1(Node$dFS$dAsync.readdir);
const readTextFile = /* #__PURE__ */ toAff2(Node$dFS$dAsync.readTextFile);
const readFile = /* #__PURE__ */ toAff1(Node$dFS$dAsync.readFile);
const mkdir$p = /* #__PURE__ */ toAff2(Node$dFS$dAsync.mkdir$p);
const mkdir = /* #__PURE__ */ toAff1(Node$dFS$dAsync.mkdir);
const link = /* #__PURE__ */ toAff2(Node$dFS$dAsync.link);
const fdWrite = /* #__PURE__ */ toAff5(Node$dFS$dAsync.fdWrite);
const fdRead = /* #__PURE__ */ toAff5(Node$dFS$dAsync.fdRead);
const fdOpen = /* #__PURE__ */ toAff3(Node$dFS$dAsync.fdOpen);
const fdNext = /* #__PURE__ */ toAff2(Node$dFS$dAsync.fdNext);
const fdClose = /* #__PURE__ */ toAff1(Node$dFS$dAsync.fdClose);
const fdAppend = /* #__PURE__ */ toAff2(Node$dFS$dAsync.fdAppend);
const chown = /* #__PURE__ */ toAff3(Node$dFS$dAsync.chown);
const chmod = /* #__PURE__ */ toAff2(Node$dFS$dAsync.chmod);
const appendTextFile = /* #__PURE__ */ toAff3(Node$dFS$dAsync.appendTextFile);
const appendFile = /* #__PURE__ */ toAff2(Node$dFS$dAsync.appendFile);
export {
  appendFile,
  appendTextFile,
  chmod,
  chown,
  fdAppend,
  fdClose,
  fdNext,
  fdOpen,
  fdRead,
  fdWrite,
  link,
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
  toAff1,
  toAff2,
  toAff3,
  toAff5,
  truncate,
  unlink,
  utimes,
  writeFile,
  writeTextFile
};
