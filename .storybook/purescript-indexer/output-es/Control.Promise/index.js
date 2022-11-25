import * as $runtime from "../runtime.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Effect$dAff from "../Effect.Aff/index.js";
import * as Effect$dException from "../Effect.Exception/index.js";
import * as Foreign from "../Foreign/index.js";
import {promise, thenImpl} from "./foreign.js";
const alt = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.altExceptT(Data$dList$dTypes.semigroupNonEmptyList)(Data$dIdentity.monadIdentity).alt)();
const unsafeReadTagged = /* #__PURE__ */ Foreign.unsafeReadTagged(Data$dIdentity.monadIdentity);
const readString = /* #__PURE__ */ Foreign.unsafeReadTagged(Data$dIdentity.monadIdentity)("String");
const toAff$p = customCoerce => p => Effect$dAff.makeAff(cb => {
  const $3 = thenImpl(p)($3 => cb(Data$dEither.$Either("Left", customCoerce($3)))())(x => cb(Data$dEither.$Either("Right", x))());
  return () => {
    $3();
    return Effect$dAff.nonCanceler;
  };
});
const fromAff = aff => promise(succ => err => {
  const $3 = Effect$dAff.runAff(v2 => {
    if (v2.tag === "Left") { return err(v2._1); }
    if (v2.tag === "Right") { return succ(v2._1); }
    $runtime.fail();
  })(aff);
  return () => {
    $3();
    return Data$dUnit.unit;
  };
});
const coerce = fn => {
  const $1 = alt(unsafeReadTagged("Error")(fn))((() => {
    const $1 = readString(fn);
    if ($1.tag === "Left") { return Data$dEither.$Either("Left", $1._1); }
    if ($1.tag === "Right") { return Data$dEither.$Either("Right", Effect$dException.error($1._1)); }
    $runtime.fail();
  })());
  if ($1.tag === "Left") { return Effect$dException.error("Promise failed, couldn't extract JS Error or String"); }
  if ($1.tag === "Right") { return $1._1; }
  $runtime.fail();
};
const toAff = /* #__PURE__ */ toAff$p(coerce);
const toAffE = f => Effect$dAff._bind(Effect$dAff._liftEffect(f))(toAff$p(coerce));
export {alt, coerce, fromAff, readString, toAff, toAff$p, toAffE, unsafeReadTagged};
export * from "./foreign.js";
