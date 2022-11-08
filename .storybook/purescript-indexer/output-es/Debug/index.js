import * as $runtime from "../runtime.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {_debugger, _spy, _trace, _traceTime} from "./foreign.js";
const warn = () => ({});
const traceTime = () => $1 => $2 => _traceTime($1, $2);
const trace = () => a => k => _trace(a, k);
const traceM = () => dictMonad => {
  const discard1 = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return s => discard1(pure(Data$dUnit.unit))(() => _trace(s, v => pure(Data$dUnit.unit)));
};
const spy = () => tag => a => _spy(tag, a);
const spyWith = () => msg => f => a => a;
const $$debugger = () => f => _debugger(f);
export {$$debugger as debugger, spy, spyWith, trace, traceM, traceTime, warn};
export * from "./foreign.js";
