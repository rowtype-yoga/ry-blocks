// | This module defines the `RWS` monad.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRWS$dTrans from "../Control.Monad.RWS.Trans/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
const execRWST = /* #__PURE__ */ Control$dMonad$dRWS$dTrans.execRWST(Data$dIdentity.monadIdentity);
const evalRWST = /* #__PURE__ */ Control$dMonad$dRWS$dTrans.evalRWST(Data$dIdentity.monadIdentity);
const withRWS = Control$dMonad$dRWS$dTrans.withRWST;
const rws = f => r => s => f(r)(s);
const runRWS = m => r => s => m(r)(s);
const mapRWS = f => v => r => s => f(v(r)(s));
const execRWS = m => r => s => execRWST(m)(r)(s);
const evalRWS = m => r => s => evalRWST(m)(r)(s);
export {evalRWS, evalRWST, execRWS, execRWST, mapRWS, runRWS, rws, withRWS};
