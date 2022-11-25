import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
const withExcept = /* #__PURE__ */ Control$dMonad$dExcept$dTrans.withExceptT(Data$dIdentity.functorIdentity);
const runExcept = x => x;
const mapExcept = f => v => f(v);
export {mapExcept, runExcept, withExcept};
