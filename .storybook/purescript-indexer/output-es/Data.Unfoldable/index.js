// | This module provides a type class for _unfoldable functors_, i.e.
// | functors which support an `unfoldr` operation.
// |
// | This allows us to unify various operations on arrays, lists,
// | sequences, etc.
import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable1 from "../Data.Unfoldable1/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {unfoldrArrayImpl} from "./foreign.js";
const fromJust = v => {
  if (v.tag === "Just") { return v._1; }
  $runtime.fail();
};
const unfoldr = dict => dict.unfoldr;
const unfoldableMaybe = {
  unfoldr: f => b => {
    const $2 = f(b);
    if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1._1); }
    return Data$dMaybe.Nothing;
  },
  Unfoldable10: () => Data$dUnfoldable1.unfoldable1Maybe
};
const unfoldableArray = {
  unfoldr: /* #__PURE__ */ unfoldrArrayImpl(Data$dMaybe.isNothing)(fromJust)(Data$dTuple.fst)(Data$dTuple.snd),
  Unfoldable10: () => Data$dUnfoldable1.unfoldable1Array
};
const replicate = dictUnfoldable => n => v => dictUnfoldable.unfoldr(i => {
  if (i <= 0) { return Data$dMaybe.Nothing; }
  return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v, i - 1 | 0));
})(n);
const replicateA = dictApplicative => dictUnfoldable => dictTraversable => {
  const sequence = dictTraversable.sequence(dictApplicative);
  return n => m => sequence(replicate(dictUnfoldable)(n)(m));
};
const none = dictUnfoldable => dictUnfoldable.unfoldr(v => Data$dMaybe.Nothing)(Data$dUnit.unit);
const fromMaybe = dictUnfoldable => dictUnfoldable.unfoldr(b => {
  if (b.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(b._1, Data$dMaybe.Nothing)); }
  return Data$dMaybe.Nothing;
});
export {fromJust, fromMaybe, none, replicate, replicateA, unfoldableArray, unfoldableMaybe, unfoldr};
export * from "./foreign.js";
