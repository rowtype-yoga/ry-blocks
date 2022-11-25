// | Helper functions for working with mutable arrays using the `ST` effect.
// |
// | This module can be used when performance is important and mutation is a local effect.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import {freeze, new as $$new, peekImpl, poke, popImpl, pushAll, shiftImpl, sortByImpl, splice, thaw, toAssocArray, unsafeFreeze, unsafeThaw, unshiftAll} from "./foreign.js";
const withArray = f => xs => {
  const $2 = thaw(xs);
  return () => {
    const result = $2();
    f(result)();
    return unsafeFreeze(result)();
  };
};
const unshift = a => unshiftAll([a]);
const sortBy = comp => sortByImpl(comp)(v => {
  if (v.tag === "GT") { return 1; }
  if (v.tag === "EQ") { return 0; }
  if (v.tag === "LT") { return -1; }
  $runtime.fail();
});
const sortWith = dictOrd => f => sortBy(x => y => dictOrd.compare(f(x))(f(y)));
const sort = dictOrd => sortBy(dictOrd.compare);
const shift = /* #__PURE__ */ shiftImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const run = st => Control$dMonad$dST$dInternal.run(Control$dMonad$dST$dInternal.bind_(st)(unsafeFreeze));
const push = a => pushAll([a]);
const pop = /* #__PURE__ */ popImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const peek = /* #__PURE__ */ peekImpl(Data$dMaybe.Just)(Data$dMaybe.Nothing);
const modify = i => f => xs => {
  const $3 = peek(i)(xs);
  return () => {
    const entry = $3();
    if (entry.tag === "Just") { return poke(i)(f(entry._1))(xs)(); }
    if (entry.tag === "Nothing") { return false; }
    $runtime.fail();
  };
};
export {modify, peek, pop, push, run, shift, sort, sortBy, sortWith, unshift, withArray};
export * from "./foreign.js";
