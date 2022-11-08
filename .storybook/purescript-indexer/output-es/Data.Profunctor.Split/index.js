import * as $runtime from "../runtime.js";
const $SplitF = (_1, _2, _3) => ({tag: "SplitF", _1, _2, _3});
const identity = x => x;
const SplitF = value0 => value1 => value2 => $SplitF(value0, value1, value2);
const unSplit = f => v => f(v._1)(v._2)(v._3);
const split = f => g => fx => $SplitF(f, g, fx);
const profunctorSplit = {dimap: f => g => v => $SplitF(x => v._1(f(x)), x => g(v._2(x)), v._3)};
const lowerSplit = dictInvariant => v => dictInvariant.imap(v._2)(v._1)(v._3);
const liftSplit = /* #__PURE__ */ split(identity)(identity);
const hoistSplit = nat => v => $SplitF(v._1, v._2, nat(v._3));
const functorSplit = {map: f => v => $SplitF(v._1, x => f(v._2(x)), v._3)};
export {$SplitF, SplitF, functorSplit, hoistSplit, identity, liftSplit, lowerSplit, profunctorSplit, split, unSplit};
