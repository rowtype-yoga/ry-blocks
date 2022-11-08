import * as $runtime from "../runtime.js";
import * as Control$dApplicative from "../Control.Applicative/index.js";
import * as Control$dBind from "../Control.Bind/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const whenM = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const $2 = dictMonad.Applicative0();
  return mb => m => bind(mb)(b => {
    if (b) { return m; }
    return $2.pure(Data$dUnit.unit);
  });
};
const unlessM = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const $2 = dictMonad.Applicative0();
  return mb => m => bind(mb)(b => {
    if (!b) { return m; }
    if (b) { return $2.pure(Data$dUnit.unit); }
    $runtime.fail();
  });
};
const monadProxy = {Applicative0: () => Control$dApplicative.applicativeProxy, Bind1: () => Control$dBind.bindProxy};
const monadFn = {Applicative0: () => Control$dApplicative.applicativeFn, Bind1: () => Control$dBind.bindFn};
const monadArray = {Applicative0: () => Control$dApplicative.applicativeArray, Bind1: () => Control$dBind.bindArray};
const liftM1 = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return f => a => bind(a)(a$p => pure(f(a$p)));
};
const ap = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return f => a => bind(f)(f$p => bind(a)(a$p => pure(f$p(a$p))));
};
export {ap, liftM1, monadArray, monadFn, monadProxy, unlessM, whenM};
