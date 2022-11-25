// | This module contains various types and functions to allow you to spawn and
// | interact with child processes.
// |
// | It is intended to be imported qualified, as follows:
// |
// | ```purescript
// | import Node.ChildProcess (ChildProcess, CHILD_PROCESS)
// | import Node.ChildProcess as ChildProcess
// | ```
// |
// | The [Node.js documentation](https://nodejs.org/api/child_process.html)
// | forms the basis for this module and has in-depth documentation about
// | runtime behaviour.
import * as $runtime from "../runtime.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNullable from "../Data.Nullable/index.js";
import * as Data$dPosix$dSignal from "../Data.Posix.Signal/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Effect$dException from "../Effect.Exception/index.js";
import * as Effect$dUnsafe from "../Effect.Unsafe/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
import {
  execFileImpl,
  execFileSyncImpl,
  execImpl,
  execSyncImpl,
  fork,
  mkOnClose,
  mkOnExit,
  mkOnMessage,
  onDisconnect,
  onError,
  process,
  spawnImpl,
  undefined as $$undefined,
  unsafeFromNullable
} from "./foreign.js";
const $Exit = (tag, _1) => ({tag, _1});
const $StdIOBehaviour = (tag, _1) => ({tag, _1});
const Pipe = /* #__PURE__ */ $StdIOBehaviour("Pipe");
const Ignore = /* #__PURE__ */ $StdIOBehaviour("Ignore");
const ShareStream = value0 => $StdIOBehaviour("ShareStream", value0);
const ShareFD = value0 => $StdIOBehaviour("ShareFD", value0);
const Normally = value0 => $Exit("Normally", value0);
const BySignal = value0 => $Exit("BySignal", value0);
const toStandardError = Unsafe$dCoerce.unsafeCoerce;
const toActualStdIOOptions = /* #__PURE__ */ Data$dFunctor.arrayMap(x => {
  if (x.tag === "Just") {
    return Data$dNullable.notNull((() => {
      if (x._1.tag === "Pipe") { return "pipe"; }
      if (x._1.tag === "Ignore") { return "ignore"; }
      if (x._1.tag === "ShareFD") { return x._1._1; }
      if (x._1.tag === "ShareStream") { return x._1._1; }
      $runtime.fail();
    })());
  }
  return Data$dNullable.null;
});
const spawn = cmd => args => {
  const $2 = spawnImpl(cmd)(args);
  return x => $2({
    cwd: (() => {
      if (x.cwd.tag === "Nothing") { return $$undefined; }
      if (x.cwd.tag === "Just") { return x.cwd._1; }
      $runtime.fail();
    })(),
    stdio: toActualStdIOOptions(x.stdio),
    env: (() => {
      if (x.env.tag === "Nothing") { return Data$dNullable.null; }
      if (x.env.tag === "Just") { return Data$dNullable.notNull(x.env._1); }
      $runtime.fail();
    })(),
    detached: x.detached,
    uid: (() => {
      if (x.uid.tag === "Nothing") { return $$undefined; }
      if (x.uid.tag === "Just") { return x.uid._1; }
      $runtime.fail();
    })(),
    gid: (() => {
      if (x.gid.tag === "Nothing") { return $$undefined; }
      if (x.gid.tag === "Just") { return x.gid._1; }
      $runtime.fail();
    })()
  });
};
const showExit = {
  show: v => {
    if (v.tag === "Normally") { return "Normally " + Data$dShow.showIntImpl(v._1); }
    if (v.tag === "BySignal") { return "BySignal " + Data$dPosix$dSignal.toString(v._1); }
    $runtime.fail();
  }
};
const pipe = /* #__PURE__ */ Data$dFunctor.arrayMap(Data$dMaybe.Just)([Pipe, Pipe, Pipe]);
const pid = x => x.pid;
const onMessage = /* #__PURE__ */ mkOnMessage(Data$dMaybe.Nothing)(Data$dMaybe.Just);
const mkExit = code => signal => {
  const $2 = Data$dNullable.nullable(code, Data$dMaybe.Nothing, Data$dMaybe.Just);
  if ($2.tag === "Just") {
    const $3 = Data$dNullable.nullable(signal, Data$dMaybe.Nothing, Data$dMaybe.Just);
    if ($3.tag === "Just") {
      if (Data$dPosix$dSignal.fromString($3._1).tag === "Just") { return $Exit("Normally", $2._1); }
      return $Exit("Normally", $2._1);
    }
    if ($3.tag === "Nothing") { return $Exit("Normally", $2._1); }
    return $Exit("Normally", $2._1);
  }
  const $3 = Data$dNullable.nullable(signal, Data$dMaybe.Nothing, Data$dMaybe.Just);
  if ($3.tag === "Just") {
    const $4 = Data$dPosix$dSignal.fromString($3._1);
    if ($4.tag === "Just") { return $Exit("BySignal", $4._1); }
    return Effect$dUnsafe.unsafePerformEffect(Effect$dException.throwException(Effect$dException.error("Node.ChildProcess.mkExit: Invalid arguments")));
  }
  if ($3.tag === "Nothing") { return Effect$dUnsafe.unsafePerformEffect(Effect$dException.throwException(Effect$dException.error("Node.ChildProcess.mkExit: Invalid arguments"))); }
  $runtime.fail();
};
const onClose = /* #__PURE__ */ mkOnClose(mkExit);
const onExit = /* #__PURE__ */ mkOnExit(mkExit);
const send = msg => handle => v => v1 => v.send(msg, handle);
const stderr = /* #__PURE__ */ (() => {
  const $0 = unsafeFromNullable("Node.ChildProcess: stream not available: stderr\nThis is probably because you passed something other than Pipe to the stdio option when you spawned it.");
  return x => $0(x.stderr);
})();
const stdin = /* #__PURE__ */ (() => {
  const $0 = unsafeFromNullable("Node.ChildProcess: stream not available: stdin\nThis is probably because you passed something other than Pipe to the stdio option when you spawned it.");
  return x => $0(x.stdin);
})();
const stdout = /* #__PURE__ */ (() => {
  const $0 = unsafeFromNullable("Node.ChildProcess: stream not available: stdout\nThis is probably because you passed something other than Pipe to the stdio option when you spawned it.");
  return x => $0(x.stdout);
})();
const kill = sig => v => v1 => v.kill(Data$dPosix$dSignal.toString(sig));
const inherit = /* #__PURE__ */ (() => Data$dFunctor.arrayMap(Data$dMaybe.Just)([
  $StdIOBehaviour("ShareStream", process.stdin),
  $StdIOBehaviour("ShareStream", process.stdout),
  $StdIOBehaviour("ShareStream", process.stderr)
]))();
const ignore = /* #__PURE__ */ Data$dFunctor.arrayMap(Data$dMaybe.Just)([Ignore, Ignore, Ignore]);
const disconnect = x => x.disconnect;
const defaultSpawnOptions = {cwd: Data$dMaybe.Nothing, stdio: pipe, env: Data$dMaybe.Nothing, detached: false, uid: Data$dMaybe.Nothing, gid: Data$dMaybe.Nothing};
const defaultExecSyncOptions = {
  cwd: Data$dMaybe.Nothing,
  input: Data$dMaybe.Nothing,
  stdio: pipe,
  env: Data$dMaybe.Nothing,
  timeout: Data$dMaybe.Nothing,
  maxBuffer: Data$dMaybe.Nothing,
  killSignal: Data$dMaybe.Nothing,
  uid: Data$dMaybe.Nothing,
  gid: Data$dMaybe.Nothing
};
const defaultExecOptions = {
  cwd: Data$dMaybe.Nothing,
  env: Data$dMaybe.Nothing,
  encoding: Data$dMaybe.Nothing,
  shell: Data$dMaybe.Nothing,
  timeout: Data$dMaybe.Nothing,
  maxBuffer: Data$dMaybe.Nothing,
  killSignal: Data$dMaybe.Nothing,
  uid: Data$dMaybe.Nothing,
  gid: Data$dMaybe.Nothing
};
const convertExecSyncOptions = opts => (
  {
    cwd: (() => {
      if (opts.cwd.tag === "Nothing") { return $$undefined; }
      if (opts.cwd.tag === "Just") { return opts.cwd._1; }
      $runtime.fail();
    })(),
    input: (() => {
      if (opts.input.tag === "Nothing") { return $$undefined; }
      if (opts.input.tag === "Just") { return opts.input._1; }
      $runtime.fail();
    })(),
    stdio: toActualStdIOOptions(opts.stdio),
    env: (() => {
      if (opts.env.tag === "Nothing") { return $$undefined; }
      if (opts.env.tag === "Just") { return opts.env._1; }
      $runtime.fail();
    })(),
    timeout: (() => {
      if (opts.timeout.tag === "Nothing") { return $$undefined; }
      if (opts.timeout.tag === "Just") { return opts.timeout._1; }
      $runtime.fail();
    })(),
    maxBuffer: (() => {
      if (opts.maxBuffer.tag === "Nothing") { return $$undefined; }
      if (opts.maxBuffer.tag === "Just") { return opts.maxBuffer._1; }
      $runtime.fail();
    })(),
    killSignal: (() => {
      if (opts.killSignal.tag === "Nothing") { return $$undefined; }
      if (opts.killSignal.tag === "Just") { return opts.killSignal._1; }
      $runtime.fail();
    })(),
    uid: (() => {
      if (opts.uid.tag === "Nothing") { return $$undefined; }
      if (opts.uid.tag === "Just") { return opts.uid._1; }
      $runtime.fail();
    })(),
    gid: (() => {
      if (opts.gid.tag === "Nothing") { return $$undefined; }
      if (opts.gid.tag === "Just") { return opts.gid._1; }
      $runtime.fail();
    })()
  }
);
const execFileSync = cmd => args => opts => execFileSyncImpl(cmd)(args)(convertExecSyncOptions(opts));
const execSync = cmd => opts => execSyncImpl(cmd)(convertExecSyncOptions(opts));
const convertExecOptions = opts => (
  {
    cwd: (() => {
      if (opts.cwd.tag === "Nothing") { return $$undefined; }
      if (opts.cwd.tag === "Just") { return opts.cwd._1; }
      $runtime.fail();
    })(),
    env: (() => {
      if (opts.env.tag === "Nothing") { return $$undefined; }
      if (opts.env.tag === "Just") { return opts.env._1; }
      $runtime.fail();
    })(),
    encoding: (() => {
      if (opts.encoding.tag === "Nothing") { return $$undefined; }
      if (opts.encoding.tag === "Just") {
        if (opts.encoding._1.tag === "ASCII") { return "ascii"; }
        if (opts.encoding._1.tag === "UTF8") { return "utf8"; }
        if (opts.encoding._1.tag === "UTF16LE") { return "utf16le"; }
        if (opts.encoding._1.tag === "UCS2") { return "ucs2"; }
        if (opts.encoding._1.tag === "Base64") { return "base64"; }
        if (opts.encoding._1.tag === "Latin1") { return "latin1"; }
        if (opts.encoding._1.tag === "Binary") { return "binary"; }
        if (opts.encoding._1.tag === "Hex") { return "hex"; }
        $runtime.fail();
      }
      $runtime.fail();
    })(),
    shell: (() => {
      if (opts.shell.tag === "Nothing") { return $$undefined; }
      if (opts.shell.tag === "Just") { return opts.shell._1; }
      $runtime.fail();
    })(),
    timeout: (() => {
      if (opts.timeout.tag === "Nothing") { return $$undefined; }
      if (opts.timeout.tag === "Just") { return opts.timeout._1; }
      $runtime.fail();
    })(),
    maxBuffer: (() => {
      if (opts.maxBuffer.tag === "Nothing") { return $$undefined; }
      if (opts.maxBuffer.tag === "Just") { return opts.maxBuffer._1; }
      $runtime.fail();
    })(),
    killSignal: (() => {
      if (opts.killSignal.tag === "Nothing") { return $$undefined; }
      if (opts.killSignal.tag === "Just") { return opts.killSignal._1; }
      $runtime.fail();
    })(),
    uid: (() => {
      if (opts.uid.tag === "Nothing") { return $$undefined; }
      if (opts.uid.tag === "Just") { return opts.uid._1; }
      $runtime.fail();
    })(),
    gid: (() => {
      if (opts.gid.tag === "Nothing") { return $$undefined; }
      if (opts.gid.tag === "Just") { return opts.gid._1; }
      $runtime.fail();
    })()
  }
);
const exec = cmd => opts => callback => execImpl(cmd)(convertExecOptions(opts))(err => stdout$p => stderr$p => callback({
  error: Data$dNullable.nullable(err, Data$dMaybe.Nothing, Data$dMaybe.Just),
  stdout: stdout$p,
  stderr: stderr$p
}));
const execFile = cmd => args => opts => callback => execFileImpl(cmd)(args)(convertExecOptions(opts))(err => stdout$p => stderr$p => callback({
  error: Data$dNullable.nullable(err, Data$dMaybe.Nothing, Data$dMaybe.Just),
  stdout: stdout$p,
  stderr: stderr$p
}));
const connected = v => v1 => v.connected;
export {
  $Exit,
  $StdIOBehaviour,
  BySignal,
  Ignore,
  Normally,
  Pipe,
  ShareFD,
  ShareStream,
  connected,
  convertExecOptions,
  convertExecSyncOptions,
  defaultExecOptions,
  defaultExecSyncOptions,
  defaultSpawnOptions,
  disconnect,
  exec,
  execFile,
  execFileSync,
  execSync,
  ignore,
  inherit,
  kill,
  mkExit,
  onClose,
  onExit,
  onMessage,
  pid,
  pipe,
  send,
  showExit,
  spawn,
  stderr,
  stdin,
  stdout,
  toActualStdIOOptions,
  toStandardError
};
export * from "./foreign.js";
