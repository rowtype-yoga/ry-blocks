import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
const $Signal = tag => ({tag});
const SIGABRT = /* #__PURE__ */ $Signal("SIGABRT");
const SIGALRM = /* #__PURE__ */ $Signal("SIGALRM");
const SIGBUS = /* #__PURE__ */ $Signal("SIGBUS");
const SIGCHLD = /* #__PURE__ */ $Signal("SIGCHLD");
const SIGCLD = /* #__PURE__ */ $Signal("SIGCLD");
const SIGCONT = /* #__PURE__ */ $Signal("SIGCONT");
const SIGEMT = /* #__PURE__ */ $Signal("SIGEMT");
const SIGFPE = /* #__PURE__ */ $Signal("SIGFPE");
const SIGHUP = /* #__PURE__ */ $Signal("SIGHUP");
const SIGILL = /* #__PURE__ */ $Signal("SIGILL");
const SIGINFO = /* #__PURE__ */ $Signal("SIGINFO");
const SIGINT = /* #__PURE__ */ $Signal("SIGINT");
const SIGIO = /* #__PURE__ */ $Signal("SIGIO");
const SIGIOT = /* #__PURE__ */ $Signal("SIGIOT");
const SIGKILL = /* #__PURE__ */ $Signal("SIGKILL");
const SIGLOST = /* #__PURE__ */ $Signal("SIGLOST");
const SIGPIPE = /* #__PURE__ */ $Signal("SIGPIPE");
const SIGPOLL = /* #__PURE__ */ $Signal("SIGPOLL");
const SIGPROF = /* #__PURE__ */ $Signal("SIGPROF");
const SIGPWR = /* #__PURE__ */ $Signal("SIGPWR");
const SIGQUIT = /* #__PURE__ */ $Signal("SIGQUIT");
const SIGSEGV = /* #__PURE__ */ $Signal("SIGSEGV");
const SIGSTKFLT = /* #__PURE__ */ $Signal("SIGSTKFLT");
const SIGSTOP = /* #__PURE__ */ $Signal("SIGSTOP");
const SIGSYS = /* #__PURE__ */ $Signal("SIGSYS");
const SIGTERM = /* #__PURE__ */ $Signal("SIGTERM");
const SIGTRAP = /* #__PURE__ */ $Signal("SIGTRAP");
const SIGTSTP = /* #__PURE__ */ $Signal("SIGTSTP");
const SIGTTIN = /* #__PURE__ */ $Signal("SIGTTIN");
const SIGTTOU = /* #__PURE__ */ $Signal("SIGTTOU");
const SIGUNUSED = /* #__PURE__ */ $Signal("SIGUNUSED");
const SIGURG = /* #__PURE__ */ $Signal("SIGURG");
const SIGUSR1 = /* #__PURE__ */ $Signal("SIGUSR1");
const SIGUSR2 = /* #__PURE__ */ $Signal("SIGUSR2");
const SIGVTALRM = /* #__PURE__ */ $Signal("SIGVTALRM");
const SIGWINCH = /* #__PURE__ */ $Signal("SIGWINCH");
const SIGXCPU = /* #__PURE__ */ $Signal("SIGXCPU");
const SIGXFSZ = /* #__PURE__ */ $Signal("SIGXFSZ");
const toString = s => {
  if (s.tag === "SIGABRT") { return "SIGABRT"; }
  if (s.tag === "SIGALRM") { return "SIGALRM"; }
  if (s.tag === "SIGBUS") { return "SIGBUS"; }
  if (s.tag === "SIGCHLD") { return "SIGCHLD"; }
  if (s.tag === "SIGCLD") { return "SIGCLD"; }
  if (s.tag === "SIGCONT") { return "SIGCONT"; }
  if (s.tag === "SIGEMT") { return "SIGEMT"; }
  if (s.tag === "SIGFPE") { return "SIGFPE"; }
  if (s.tag === "SIGHUP") { return "SIGHUP"; }
  if (s.tag === "SIGILL") { return "SIGILL"; }
  if (s.tag === "SIGINFO") { return "SIGINFO"; }
  if (s.tag === "SIGINT") { return "SIGINT"; }
  if (s.tag === "SIGIO") { return "SIGIO"; }
  if (s.tag === "SIGIOT") { return "SIGIOT"; }
  if (s.tag === "SIGKILL") { return "SIGKILL"; }
  if (s.tag === "SIGLOST") { return "SIGLOST"; }
  if (s.tag === "SIGPIPE") { return "SIGPIPE"; }
  if (s.tag === "SIGPOLL") { return "SIGPOLL"; }
  if (s.tag === "SIGPROF") { return "SIGPROF"; }
  if (s.tag === "SIGPWR") { return "SIGPWR"; }
  if (s.tag === "SIGQUIT") { return "SIGQUIT"; }
  if (s.tag === "SIGSEGV") { return "SIGSEGV"; }
  if (s.tag === "SIGSTKFLT") { return "SIGSTKFLT"; }
  if (s.tag === "SIGSTOP") { return "SIGSTOP"; }
  if (s.tag === "SIGSYS") { return "SIGSYS"; }
  if (s.tag === "SIGTERM") { return "SIGTERM"; }
  if (s.tag === "SIGTRAP") { return "SIGTRAP"; }
  if (s.tag === "SIGTSTP") { return "SIGTSTP"; }
  if (s.tag === "SIGTTIN") { return "SIGTTIN"; }
  if (s.tag === "SIGTTOU") { return "SIGTTOU"; }
  if (s.tag === "SIGUNUSED") { return "SIGUNUSED"; }
  if (s.tag === "SIGURG") { return "SIGURG"; }
  if (s.tag === "SIGUSR1") { return "SIGUSR1"; }
  if (s.tag === "SIGUSR2") { return "SIGUSR2"; }
  if (s.tag === "SIGVTALRM") { return "SIGVTALRM"; }
  if (s.tag === "SIGWINCH") { return "SIGWINCH"; }
  if (s.tag === "SIGXCPU") { return "SIGXCPU"; }
  if (s.tag === "SIGXFSZ") { return "SIGXFSZ"; }
  $runtime.fail();
};
const showSignal = {show: toString};
const fromString = s => {
  if (s === "SIGABRT") { return Data$dMaybe.$Maybe("Just", SIGABRT); }
  if (s === "SIGALRM") { return Data$dMaybe.$Maybe("Just", SIGALRM); }
  if (s === "SIGBUS") { return Data$dMaybe.$Maybe("Just", SIGBUS); }
  if (s === "SIGCHLD") { return Data$dMaybe.$Maybe("Just", SIGCHLD); }
  if (s === "SIGCLD") { return Data$dMaybe.$Maybe("Just", SIGCLD); }
  if (s === "SIGCONT") { return Data$dMaybe.$Maybe("Just", SIGCONT); }
  if (s === "SIGEMT") { return Data$dMaybe.$Maybe("Just", SIGEMT); }
  if (s === "SIGFPE") { return Data$dMaybe.$Maybe("Just", SIGFPE); }
  if (s === "SIGHUP") { return Data$dMaybe.$Maybe("Just", SIGHUP); }
  if (s === "SIGILL") { return Data$dMaybe.$Maybe("Just", SIGILL); }
  if (s === "SIGINFO") { return Data$dMaybe.$Maybe("Just", SIGINFO); }
  if (s === "SIGINT") { return Data$dMaybe.$Maybe("Just", SIGINT); }
  if (s === "SIGIO") { return Data$dMaybe.$Maybe("Just", SIGIO); }
  if (s === "SIGIOT") { return Data$dMaybe.$Maybe("Just", SIGIOT); }
  if (s === "SIGKILL") { return Data$dMaybe.$Maybe("Just", SIGKILL); }
  if (s === "SIGLOST") { return Data$dMaybe.$Maybe("Just", SIGLOST); }
  if (s === "SIGPIPE") { return Data$dMaybe.$Maybe("Just", SIGPIPE); }
  if (s === "SIGPOLL") { return Data$dMaybe.$Maybe("Just", SIGPOLL); }
  if (s === "SIGPROF") { return Data$dMaybe.$Maybe("Just", SIGPROF); }
  if (s === "SIGPWR") { return Data$dMaybe.$Maybe("Just", SIGPWR); }
  if (s === "SIGQUIT") { return Data$dMaybe.$Maybe("Just", SIGQUIT); }
  if (s === "SIGSEGV") { return Data$dMaybe.$Maybe("Just", SIGSEGV); }
  if (s === "SIGSTKFLT") { return Data$dMaybe.$Maybe("Just", SIGSTKFLT); }
  if (s === "SIGSTOP") { return Data$dMaybe.$Maybe("Just", SIGSTOP); }
  if (s === "SIGSYS") { return Data$dMaybe.$Maybe("Just", SIGSYS); }
  if (s === "SIGTERM") { return Data$dMaybe.$Maybe("Just", SIGTERM); }
  if (s === "SIGTRAP") { return Data$dMaybe.$Maybe("Just", SIGTRAP); }
  if (s === "SIGTSTP") { return Data$dMaybe.$Maybe("Just", SIGTSTP); }
  if (s === "SIGTTIN") { return Data$dMaybe.$Maybe("Just", SIGTTIN); }
  if (s === "SIGTTOU") { return Data$dMaybe.$Maybe("Just", SIGTTOU); }
  if (s === "SIGUNUSED") { return Data$dMaybe.$Maybe("Just", SIGUNUSED); }
  if (s === "SIGURG") { return Data$dMaybe.$Maybe("Just", SIGURG); }
  if (s === "SIGUSR1") { return Data$dMaybe.$Maybe("Just", SIGUSR1); }
  if (s === "SIGUSR2") { return Data$dMaybe.$Maybe("Just", SIGUSR2); }
  if (s === "SIGVTALRM") { return Data$dMaybe.$Maybe("Just", SIGVTALRM); }
  if (s === "SIGWINCH") { return Data$dMaybe.$Maybe("Just", SIGWINCH); }
  if (s === "SIGXCPU") { return Data$dMaybe.$Maybe("Just", SIGXCPU); }
  if (s === "SIGXFSZ") { return Data$dMaybe.$Maybe("Just", SIGXFSZ); }
  return Data$dMaybe.Nothing;
};
const eqSignal = {
  eq: x => y => {
    if (x.tag === "SIGABRT") { return y.tag === "SIGABRT"; }
    if (x.tag === "SIGALRM") { return y.tag === "SIGALRM"; }
    if (x.tag === "SIGBUS") { return y.tag === "SIGBUS"; }
    if (x.tag === "SIGCHLD") { return y.tag === "SIGCHLD"; }
    if (x.tag === "SIGCLD") { return y.tag === "SIGCLD"; }
    if (x.tag === "SIGCONT") { return y.tag === "SIGCONT"; }
    if (x.tag === "SIGEMT") { return y.tag === "SIGEMT"; }
    if (x.tag === "SIGFPE") { return y.tag === "SIGFPE"; }
    if (x.tag === "SIGHUP") { return y.tag === "SIGHUP"; }
    if (x.tag === "SIGILL") { return y.tag === "SIGILL"; }
    if (x.tag === "SIGINFO") { return y.tag === "SIGINFO"; }
    if (x.tag === "SIGINT") { return y.tag === "SIGINT"; }
    if (x.tag === "SIGIO") { return y.tag === "SIGIO"; }
    if (x.tag === "SIGIOT") { return y.tag === "SIGIOT"; }
    if (x.tag === "SIGKILL") { return y.tag === "SIGKILL"; }
    if (x.tag === "SIGLOST") { return y.tag === "SIGLOST"; }
    if (x.tag === "SIGPIPE") { return y.tag === "SIGPIPE"; }
    if (x.tag === "SIGPOLL") { return y.tag === "SIGPOLL"; }
    if (x.tag === "SIGPROF") { return y.tag === "SIGPROF"; }
    if (x.tag === "SIGPWR") { return y.tag === "SIGPWR"; }
    if (x.tag === "SIGQUIT") { return y.tag === "SIGQUIT"; }
    if (x.tag === "SIGSEGV") { return y.tag === "SIGSEGV"; }
    if (x.tag === "SIGSTKFLT") { return y.tag === "SIGSTKFLT"; }
    if (x.tag === "SIGSTOP") { return y.tag === "SIGSTOP"; }
    if (x.tag === "SIGSYS") { return y.tag === "SIGSYS"; }
    if (x.tag === "SIGTERM") { return y.tag === "SIGTERM"; }
    if (x.tag === "SIGTRAP") { return y.tag === "SIGTRAP"; }
    if (x.tag === "SIGTSTP") { return y.tag === "SIGTSTP"; }
    if (x.tag === "SIGTTIN") { return y.tag === "SIGTTIN"; }
    if (x.tag === "SIGTTOU") { return y.tag === "SIGTTOU"; }
    if (x.tag === "SIGUNUSED") { return y.tag === "SIGUNUSED"; }
    if (x.tag === "SIGURG") { return y.tag === "SIGURG"; }
    if (x.tag === "SIGUSR1") { return y.tag === "SIGUSR1"; }
    if (x.tag === "SIGUSR2") { return y.tag === "SIGUSR2"; }
    if (x.tag === "SIGVTALRM") { return y.tag === "SIGVTALRM"; }
    if (x.tag === "SIGWINCH") { return y.tag === "SIGWINCH"; }
    if (x.tag === "SIGXCPU") { return y.tag === "SIGXCPU"; }
    if (x.tag === "SIGXFSZ") { return y.tag === "SIGXFSZ"; }
    return false;
  }
};
const ordSignal = {
  compare: x => y => {
    if (x.tag === "SIGABRT") {
      if (y.tag === "SIGABRT") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGABRT") { return Data$dOrdering.GT; }
    if (x.tag === "SIGALRM") {
      if (y.tag === "SIGALRM") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGALRM") { return Data$dOrdering.GT; }
    if (x.tag === "SIGBUS") {
      if (y.tag === "SIGBUS") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGBUS") { return Data$dOrdering.GT; }
    if (x.tag === "SIGCHLD") {
      if (y.tag === "SIGCHLD") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGCHLD") { return Data$dOrdering.GT; }
    if (x.tag === "SIGCLD") {
      if (y.tag === "SIGCLD") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGCLD") { return Data$dOrdering.GT; }
    if (x.tag === "SIGCONT") {
      if (y.tag === "SIGCONT") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGCONT") { return Data$dOrdering.GT; }
    if (x.tag === "SIGEMT") {
      if (y.tag === "SIGEMT") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGEMT") { return Data$dOrdering.GT; }
    if (x.tag === "SIGFPE") {
      if (y.tag === "SIGFPE") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGFPE") { return Data$dOrdering.GT; }
    if (x.tag === "SIGHUP") {
      if (y.tag === "SIGHUP") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGHUP") { return Data$dOrdering.GT; }
    if (x.tag === "SIGILL") {
      if (y.tag === "SIGILL") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGILL") { return Data$dOrdering.GT; }
    if (x.tag === "SIGINFO") {
      if (y.tag === "SIGINFO") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGINFO") { return Data$dOrdering.GT; }
    if (x.tag === "SIGINT") {
      if (y.tag === "SIGINT") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGINT") { return Data$dOrdering.GT; }
    if (x.tag === "SIGIO") {
      if (y.tag === "SIGIO") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGIO") { return Data$dOrdering.GT; }
    if (x.tag === "SIGIOT") {
      if (y.tag === "SIGIOT") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGIOT") { return Data$dOrdering.GT; }
    if (x.tag === "SIGKILL") {
      if (y.tag === "SIGKILL") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGKILL") { return Data$dOrdering.GT; }
    if (x.tag === "SIGLOST") {
      if (y.tag === "SIGLOST") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGLOST") { return Data$dOrdering.GT; }
    if (x.tag === "SIGPIPE") {
      if (y.tag === "SIGPIPE") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGPIPE") { return Data$dOrdering.GT; }
    if (x.tag === "SIGPOLL") {
      if (y.tag === "SIGPOLL") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGPOLL") { return Data$dOrdering.GT; }
    if (x.tag === "SIGPROF") {
      if (y.tag === "SIGPROF") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGPROF") { return Data$dOrdering.GT; }
    if (x.tag === "SIGPWR") {
      if (y.tag === "SIGPWR") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGPWR") { return Data$dOrdering.GT; }
    if (x.tag === "SIGQUIT") {
      if (y.tag === "SIGQUIT") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGQUIT") { return Data$dOrdering.GT; }
    if (x.tag === "SIGSEGV") {
      if (y.tag === "SIGSEGV") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGSEGV") { return Data$dOrdering.GT; }
    if (x.tag === "SIGSTKFLT") {
      if (y.tag === "SIGSTKFLT") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGSTKFLT") { return Data$dOrdering.GT; }
    if (x.tag === "SIGSTOP") {
      if (y.tag === "SIGSTOP") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGSTOP") { return Data$dOrdering.GT; }
    if (x.tag === "SIGSYS") {
      if (y.tag === "SIGSYS") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGSYS") { return Data$dOrdering.GT; }
    if (x.tag === "SIGTERM") {
      if (y.tag === "SIGTERM") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGTERM") { return Data$dOrdering.GT; }
    if (x.tag === "SIGTRAP") {
      if (y.tag === "SIGTRAP") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGTRAP") { return Data$dOrdering.GT; }
    if (x.tag === "SIGTSTP") {
      if (y.tag === "SIGTSTP") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGTSTP") { return Data$dOrdering.GT; }
    if (x.tag === "SIGTTIN") {
      if (y.tag === "SIGTTIN") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGTTIN") { return Data$dOrdering.GT; }
    if (x.tag === "SIGTTOU") {
      if (y.tag === "SIGTTOU") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGTTOU") { return Data$dOrdering.GT; }
    if (x.tag === "SIGUNUSED") {
      if (y.tag === "SIGUNUSED") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGUNUSED") { return Data$dOrdering.GT; }
    if (x.tag === "SIGURG") {
      if (y.tag === "SIGURG") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGURG") { return Data$dOrdering.GT; }
    if (x.tag === "SIGUSR1") {
      if (y.tag === "SIGUSR1") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGUSR1") { return Data$dOrdering.GT; }
    if (x.tag === "SIGUSR2") {
      if (y.tag === "SIGUSR2") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGUSR2") { return Data$dOrdering.GT; }
    if (x.tag === "SIGVTALRM") {
      if (y.tag === "SIGVTALRM") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGVTALRM") { return Data$dOrdering.GT; }
    if (x.tag === "SIGWINCH") {
      if (y.tag === "SIGWINCH") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGWINCH") { return Data$dOrdering.GT; }
    if (x.tag === "SIGXCPU") {
      if (y.tag === "SIGXCPU") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SIGXCPU") { return Data$dOrdering.GT; }
    if (x.tag === "SIGXFSZ") {
      if (y.tag === "SIGXFSZ") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqSignal
};
export {
  $Signal,
  SIGABRT,
  SIGALRM,
  SIGBUS,
  SIGCHLD,
  SIGCLD,
  SIGCONT,
  SIGEMT,
  SIGFPE,
  SIGHUP,
  SIGILL,
  SIGINFO,
  SIGINT,
  SIGIO,
  SIGIOT,
  SIGKILL,
  SIGLOST,
  SIGPIPE,
  SIGPOLL,
  SIGPROF,
  SIGPWR,
  SIGQUIT,
  SIGSEGV,
  SIGSTKFLT,
  SIGSTOP,
  SIGSYS,
  SIGTERM,
  SIGTRAP,
  SIGTSTP,
  SIGTTIN,
  SIGTTOU,
  SIGUNUSED,
  SIGURG,
  SIGUSR1,
  SIGUSR2,
  SIGVTALRM,
  SIGWINCH,
  SIGXCPU,
  SIGXFSZ,
  eqSignal,
  fromString,
  ordSignal,
  showSignal,
  toString
};
