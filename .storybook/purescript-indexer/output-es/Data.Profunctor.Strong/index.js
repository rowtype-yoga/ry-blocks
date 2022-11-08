import * as $runtime from "../runtime.js";
import * as Data$dProfunctor from "../Data.Profunctor/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const identity = x => x;
const strongFn = /* #__PURE__ */ (() => (
  {first: a2b => v => Data$dTuple.$Tuple(a2b(v._1), v._2), second: Data$dTuple.functorTuple.map, Profunctor0: () => Data$dProfunctor.profunctorFn}
))();
const second = dict => dict.second;
const first = dict => dict.first;
const splitStrong = dictCategory => {
  const $1 = dictCategory.Semigroupoid0();
  return dictStrong => l => r => $1.compose(dictStrong.second(r))(dictStrong.first(l));
};
const fanout = dictCategory => {
  const $1 = dictCategory.Semigroupoid0();
  const $2 = dictCategory.Semigroupoid0();
  return dictStrong => {
    const dimap = dictStrong.Profunctor0().dimap;
    return l => r => $1.compose($2.compose(dictStrong.second(r))(dictStrong.first(l)))(dimap(identity)(a => Data$dTuple.$Tuple(a, a))(dictCategory.identity));
  };
};
export {fanout, first, identity, second, splitStrong, strongFn};
