import * as $runtime from "../runtime.js";
import * as Data$dDateTime$dInstant from "../Data.DateTime.Instant/index.js";
import * as Data$dJSDate from "../Data.JSDate/index.js";
import {showStatsObj, statsMethod} from "./foreign.js";
const $Stats = _1 => ({tag: "Stats", _1});
const Stats = value0 => $Stats(value0);
const statusChangedTime = v => {
  const $1 = Data$dJSDate.toInstant(v._1.ctime);
  if ($1.tag === "Just") { return Data$dDateTime$dInstant.toDateTime($1._1); }
  $runtime.fail();
};
const showStats = {show: v => "Stats " + showStatsObj(v._1)};
const modifiedTime = v => {
  const $1 = Data$dJSDate.toInstant(v._1.mtime);
  if ($1.tag === "Just") { return Data$dDateTime$dInstant.toDateTime($1._1); }
  $runtime.fail();
};
const isSymbolicLink = v => statsMethod("isSymbolicLink", v._1);
const isSocket = v => statsMethod("isSocket", v._1);
const isFile = v => statsMethod("isFile", v._1);
const isFIFO = v => statsMethod("isFIFO", v._1);
const isDirectory = v => statsMethod("isDirectory", v._1);
const isCharacterDevice = v => statsMethod("isCharacterDevice", v._1);
const isBlockDevice = v => statsMethod("isBlockDevice", v._1);
const accessedTime = v => {
  const $1 = Data$dJSDate.toInstant(v._1.atime);
  if ($1.tag === "Just") { return Data$dDateTime$dInstant.toDateTime($1._1); }
  $runtime.fail();
};
export {$Stats, Stats, accessedTime, isBlockDevice, isCharacterDevice, isDirectory, isFIFO, isFile, isSocket, isSymbolicLink, modifiedTime, showStats, statusChangedTime};
export * from "./foreign.js";
