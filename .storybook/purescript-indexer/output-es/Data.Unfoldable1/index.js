import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import {unfoldr1ArrayImpl} from "./foreign.js";
const fromJust = v => {
  if (v.tag === "Just") { return v._1; }
  $runtime.fail();
};
const unfoldr1 = dict => dict.unfoldr1;
const unfoldable1Maybe = {unfoldr1: f => b => Data$dMaybe.$Maybe("Just", f(b)._1)};
const unfoldable1Array = {unfoldr1: /* #__PURE__ */ unfoldr1ArrayImpl(Data$dMaybe.isNothing)(fromJust)(Data$dTuple.fst)(Data$dTuple.snd)};
const replicate1 = dictUnfoldable1 => n => v => dictUnfoldable1.unfoldr1(i => {
  if (i <= 0) { return Data$dTuple.$Tuple(v, Data$dMaybe.Nothing); }
  return Data$dTuple.$Tuple(v, Data$dMaybe.$Maybe("Just", i - 1 | 0));
})(n - 1 | 0);
const replicate1A = dictApply => dictUnfoldable1 => dictTraversable1 => {
  const sequence1 = dictTraversable1.sequence1(dictApply);
  return n => m => sequence1(replicate1(dictUnfoldable1)(n)(m));
};
const singleton = dictUnfoldable1 => replicate1(dictUnfoldable1)(1);
const range = dictUnfoldable1 => start => end => dictUnfoldable1.unfoldr1((() => {
  const $3 = (() => {
    if (end >= start) { return 1; }
    return -1;
  })();
  return i => {
    const i$p = i + $3 | 0;
    return Data$dTuple.$Tuple(
      i,
      (() => {
        if (i === end) { return Data$dMaybe.Nothing; }
        return Data$dMaybe.$Maybe("Just", i$p);
      })()
    );
  };
})())(start);
const iterateN = dictUnfoldable1 => n => f => s => dictUnfoldable1.unfoldr1(v => Data$dTuple.$Tuple(
  v._1,
  (() => {
    if (v._2 > 0) { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(f(v._1), v._2 - 1 | 0)); }
    return Data$dMaybe.Nothing;
  })()
))(Data$dTuple.$Tuple(s, n - 1 | 0));
export {fromJust, iterateN, range, replicate1, replicate1A, singleton, unfoldable1Array, unfoldable1Maybe, unfoldr1};
export * from "./foreign.js";
