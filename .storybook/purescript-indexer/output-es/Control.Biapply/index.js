import * as $runtime from "../runtime.js";
import * as Data$dBifunctor from "../Data.Bifunctor/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const identity = x => x;
const biapplyTuple = {biapply: v => v1 => Data$dTuple.$Tuple(v._1(v1._1), v._2(v1._2)), Bifunctor0: () => Data$dBifunctor.bifunctorTuple};
const biapply = dict => dict.biapply;
const biapplyFirst = dictBiapply => {
  const bimap = dictBiapply.Bifunctor0().bimap;
  return a => b => dictBiapply.biapply(bimap(v => identity)(v => identity)(a))(b);
};
const biapplySecond = dictBiapply => {
  const bimap = dictBiapply.Bifunctor0().bimap;
  return a => b => dictBiapply.biapply(bimap(Data$dFunction.const)(Data$dFunction.const)(a))(b);
};
const bilift2 = dictBiapply => {
  const bimap = dictBiapply.Bifunctor0().bimap;
  return f => g => a => b => dictBiapply.biapply(bimap(f)(g)(a))(b);
};
const bilift3 = dictBiapply => {
  const bimap = dictBiapply.Bifunctor0().bimap;
  return f => g => a => b => c => dictBiapply.biapply(dictBiapply.biapply(bimap(f)(g)(a))(b))(c);
};
export {biapply, biapplyFirst, biapplySecond, biapplyTuple, bilift2, bilift3, identity};
