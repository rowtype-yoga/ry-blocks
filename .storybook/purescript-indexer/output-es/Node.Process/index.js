// | Bindings to the global `process` object in Node.js. See also [the Node API documentation](https://nodejs.org/api/process.html)
import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dPosix$dSignal from "../Data.Posix.Signal/index.js";
import * as Foreign$dObject from "../Foreign.Object/index.js";
import * as Node$dPlatform from "../Node.Platform/index.js";
import {chdir, copyArray, copyObject, exit, onBeforeExit, onExit, onSignalImpl, onUncaughtException, onUnhandledRejection, process, setEnv, unsetEnv} from "./foreign.js";
const version = /* #__PURE__ */ (() => process.version)();
const stdoutIsTTY = /* #__PURE__ */ (() => process.stdout.isTTY)();
const stdout = /* #__PURE__ */ (() => process.stdout)();
const stdinIsTTY = /* #__PURE__ */ (() => process.stdin.isTTY)();
const stdin = /* #__PURE__ */ (() => process.stdin)();
const stderrIsTTY = /* #__PURE__ */ (() => process.stderr.isTTY)();
const stderr = /* #__PURE__ */ (() => process.stderr)();
const platform = /* #__PURE__ */ (() => Node$dPlatform.fromString(process.platform))();
const pid = /* #__PURE__ */ (() => process.pid)();
const onSignal = sig => onSignalImpl(Data$dPosix$dSignal.toString(sig));
const nextTick = callback => v => process.nextTick(callback);
const lookupMutableObject = k => o => v => Foreign$dObject._lookup(Data$dMaybe.Nothing, Data$dMaybe.Just, k, o);
const lookupEnv = k => lookupMutableObject(k)(process.env);
const getEnv = /* #__PURE__ */ (() => copyObject(process.env))();
const execPath = v => process.execPath;
const execArgv = /* #__PURE__ */ (() => copyArray(process.execArgv))();
const cwd = /* #__PURE__ */ (() => process.cwd)();
const argv = /* #__PURE__ */ (() => copyArray(process.argv))();
export {
  argv,
  cwd,
  execArgv,
  execPath,
  getEnv,
  lookupEnv,
  lookupMutableObject,
  nextTick,
  onSignal,
  pid,
  platform,
  stderr,
  stderrIsTTY,
  stdin,
  stdinIsTTY,
  stdout,
  stdoutIsTTY,
  version
};
export * from "./foreign.js";
