// | This module defines data type for the different platforms supported by
// | Node.js
import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
const $Platform = tag => ({tag});
const AIX = /* #__PURE__ */ $Platform("AIX");
const Darwin = /* #__PURE__ */ $Platform("Darwin");
const FreeBSD = /* #__PURE__ */ $Platform("FreeBSD");
const Linux = /* #__PURE__ */ $Platform("Linux");
const OpenBSD = /* #__PURE__ */ $Platform("OpenBSD");
const SunOS = /* #__PURE__ */ $Platform("SunOS");
const Win32 = /* #__PURE__ */ $Platform("Win32");
const Android = /* #__PURE__ */ $Platform("Android");
const toString = v => {
  if (v.tag === "AIX") { return "aix"; }
  if (v.tag === "Darwin") { return "darwin"; }
  if (v.tag === "FreeBSD") { return "freebsd"; }
  if (v.tag === "Linux") { return "linux"; }
  if (v.tag === "OpenBSD") { return "openbsd"; }
  if (v.tag === "SunOS") { return "sunos"; }
  if (v.tag === "Win32") { return "win32"; }
  if (v.tag === "Android") { return "android"; }
  $runtime.fail();
};
const showPlatform = {
  show: v => {
    if (v.tag === "AIX") { return "AIX"; }
    if (v.tag === "Darwin") { return "Darwin"; }
    if (v.tag === "FreeBSD") { return "FreeBSD"; }
    if (v.tag === "Linux") { return "Linux"; }
    if (v.tag === "OpenBSD") { return "OpenBSD"; }
    if (v.tag === "SunOS") { return "SunOS"; }
    if (v.tag === "Win32") { return "Win32"; }
    if (v.tag === "Android") { return "Android"; }
    $runtime.fail();
  }
};
const fromString = v => {
  if (v === "aix") { return Data$dMaybe.$Maybe("Just", AIX); }
  if (v === "darwin") { return Data$dMaybe.$Maybe("Just", Darwin); }
  if (v === "freebsd") { return Data$dMaybe.$Maybe("Just", FreeBSD); }
  if (v === "linux") { return Data$dMaybe.$Maybe("Just", Linux); }
  if (v === "openbsd") { return Data$dMaybe.$Maybe("Just", OpenBSD); }
  if (v === "sunos") { return Data$dMaybe.$Maybe("Just", SunOS); }
  if (v === "win32") { return Data$dMaybe.$Maybe("Just", Win32); }
  if (v === "android") { return Data$dMaybe.$Maybe("Just", Android); }
  return Data$dMaybe.Nothing;
};
const eqPlatform = {
  eq: x => y => {
    if (x.tag === "AIX") { return y.tag === "AIX"; }
    if (x.tag === "Darwin") { return y.tag === "Darwin"; }
    if (x.tag === "FreeBSD") { return y.tag === "FreeBSD"; }
    if (x.tag === "Linux") { return y.tag === "Linux"; }
    if (x.tag === "OpenBSD") { return y.tag === "OpenBSD"; }
    if (x.tag === "SunOS") { return y.tag === "SunOS"; }
    if (x.tag === "Win32") { return y.tag === "Win32"; }
    if (x.tag === "Android") { return y.tag === "Android"; }
    return false;
  }
};
const ordPlatform = {
  compare: x => y => {
    if (x.tag === "AIX") {
      if (y.tag === "AIX") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "AIX") { return Data$dOrdering.GT; }
    if (x.tag === "Darwin") {
      if (y.tag === "Darwin") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Darwin") { return Data$dOrdering.GT; }
    if (x.tag === "FreeBSD") {
      if (y.tag === "FreeBSD") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "FreeBSD") { return Data$dOrdering.GT; }
    if (x.tag === "Linux") {
      if (y.tag === "Linux") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Linux") { return Data$dOrdering.GT; }
    if (x.tag === "OpenBSD") {
      if (y.tag === "OpenBSD") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "OpenBSD") { return Data$dOrdering.GT; }
    if (x.tag === "SunOS") {
      if (y.tag === "SunOS") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SunOS") { return Data$dOrdering.GT; }
    if (x.tag === "Win32") {
      if (y.tag === "Win32") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Win32") { return Data$dOrdering.GT; }
    if (x.tag === "Android") {
      if (y.tag === "Android") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqPlatform
};
export {$Platform, AIX, Android, Darwin, FreeBSD, Linux, OpenBSD, SunOS, Win32, eqPlatform, fromString, ordPlatform, showPlatform, toString};
