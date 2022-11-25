import * as $runtime from "../runtime.js";
const $FileFlags = tag => ({tag});
const $SymlinkType = tag => ({tag});
const FileLink = /* #__PURE__ */ $SymlinkType("FileLink");
const DirLink = /* #__PURE__ */ $SymlinkType("DirLink");
const JunctionLink = /* #__PURE__ */ $SymlinkType("JunctionLink");
const R = /* #__PURE__ */ $FileFlags("R");
const R_PLUS = /* #__PURE__ */ $FileFlags("R_PLUS");
const RS = /* #__PURE__ */ $FileFlags("RS");
const RS_PLUS = /* #__PURE__ */ $FileFlags("RS_PLUS");
const W = /* #__PURE__ */ $FileFlags("W");
const WX = /* #__PURE__ */ $FileFlags("WX");
const W_PLUS = /* #__PURE__ */ $FileFlags("W_PLUS");
const WX_PLUS = /* #__PURE__ */ $FileFlags("WX_PLUS");
const A = /* #__PURE__ */ $FileFlags("A");
const AX = /* #__PURE__ */ $FileFlags("AX");
const A_PLUS = /* #__PURE__ */ $FileFlags("A_PLUS");
const AX_PLUS = /* #__PURE__ */ $FileFlags("AX_PLUS");
const symlinkTypeToNode = ty => {
  if (ty.tag === "FileLink") { return "file"; }
  if (ty.tag === "DirLink") { return "dir"; }
  if (ty.tag === "JunctionLink") { return "junction"; }
  $runtime.fail();
};
const showSymlinkType = {
  show: v => {
    if (v.tag === "FileLink") { return "FileLink"; }
    if (v.tag === "DirLink") { return "DirLink"; }
    if (v.tag === "JunctionLink") { return "JunctionLink"; }
    $runtime.fail();
  }
};
const showFileFlags = {
  show: v => {
    if (v.tag === "R") { return "R"; }
    if (v.tag === "R_PLUS") { return "R_PLUS"; }
    if (v.tag === "RS") { return "RS"; }
    if (v.tag === "RS_PLUS") { return "RS_PLUS"; }
    if (v.tag === "W") { return "W"; }
    if (v.tag === "WX") { return "WX"; }
    if (v.tag === "W_PLUS") { return "W_PLUS"; }
    if (v.tag === "WX_PLUS") { return "WX_PLUS"; }
    if (v.tag === "A") { return "A"; }
    if (v.tag === "AX") { return "AX"; }
    if (v.tag === "A_PLUS") { return "A_PLUS"; }
    if (v.tag === "AX_PLUS") { return "AX_PLUS"; }
    $runtime.fail();
  }
};
const fileFlagsToNode = ff => {
  if (ff.tag === "R") { return "r"; }
  if (ff.tag === "R_PLUS") { return "r+"; }
  if (ff.tag === "RS") { return "rs"; }
  if (ff.tag === "RS_PLUS") { return "rs+"; }
  if (ff.tag === "W") { return "w"; }
  if (ff.tag === "WX") { return "wx"; }
  if (ff.tag === "W_PLUS") { return "w+"; }
  if (ff.tag === "WX_PLUS") { return "wx+"; }
  if (ff.tag === "A") { return "a"; }
  if (ff.tag === "AX") { return "ax"; }
  if (ff.tag === "A_PLUS") { return "a+"; }
  if (ff.tag === "AX_PLUS") { return "ax+"; }
  $runtime.fail();
};
const eqSymlinkType = {
  eq: v => v1 => {
    if (v.tag === "FileLink") { return v1.tag === "FileLink"; }
    if (v.tag === "DirLink") { return v1.tag === "DirLink"; }
    if (v.tag === "JunctionLink") { return v1.tag === "JunctionLink"; }
    return false;
  }
};
const eqFileFlags = {
  eq: x => y => (() => {
    if (x.tag === "R") { return "R"; }
    if (x.tag === "R_PLUS") { return "R_PLUS"; }
    if (x.tag === "RS") { return "RS"; }
    if (x.tag === "RS_PLUS") { return "RS_PLUS"; }
    if (x.tag === "W") { return "W"; }
    if (x.tag === "WX") { return "WX"; }
    if (x.tag === "W_PLUS") { return "W_PLUS"; }
    if (x.tag === "WX_PLUS") { return "WX_PLUS"; }
    if (x.tag === "A") { return "A"; }
    if (x.tag === "AX") { return "AX"; }
    if (x.tag === "A_PLUS") { return "A_PLUS"; }
    if (x.tag === "AX_PLUS") { return "AX_PLUS"; }
    $runtime.fail();
  })() === (() => {
    if (y.tag === "R") { return "R"; }
    if (y.tag === "R_PLUS") { return "R_PLUS"; }
    if (y.tag === "RS") { return "RS"; }
    if (y.tag === "RS_PLUS") { return "RS_PLUS"; }
    if (y.tag === "W") { return "W"; }
    if (y.tag === "WX") { return "WX"; }
    if (y.tag === "W_PLUS") { return "W_PLUS"; }
    if (y.tag === "WX_PLUS") { return "WX_PLUS"; }
    if (y.tag === "A") { return "A"; }
    if (y.tag === "AX") { return "AX"; }
    if (y.tag === "A_PLUS") { return "A_PLUS"; }
    if (y.tag === "AX_PLUS") { return "AX_PLUS"; }
    $runtime.fail();
  })()
};
export {
  $FileFlags,
  $SymlinkType,
  A,
  AX,
  AX_PLUS,
  A_PLUS,
  DirLink,
  FileLink,
  JunctionLink,
  R,
  RS,
  RS_PLUS,
  R_PLUS,
  W,
  WX,
  WX_PLUS,
  W_PLUS,
  eqFileFlags,
  eqSymlinkType,
  fileFlagsToNode,
  showFileFlags,
  showSymlinkType,
  symlinkTypeToNode
};
