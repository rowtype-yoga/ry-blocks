import * as $runtime from "../runtime.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import {arrayApply} from "./foreign.js";
const identity = x => x;
const applyProxy = {apply: v => v1 => Type$dProxy.Proxy, Functor0: () => Data$dFunctor.functorProxy};
const applyFn = {apply: f => g => x => f(x)(g(x)), Functor0: () => Data$dFunctor.functorFn};
const applyArray = {apply: arrayApply, Functor0: () => Data$dFunctor.functorArray};
const apply = dict => dict.apply;
const applyFirst = dictApply => {
  const map = dictApply.Functor0().map;
  return a => b => dictApply.apply(map(Data$dFunction.const)(a))(b);
};
const applySecond = dictApply => {
  const map = dictApply.Functor0().map;
  return a => b => dictApply.apply(map(v => identity)(a))(b);
};
const lift2 = dictApply => {
  const map = dictApply.Functor0().map;
  return f => a => b => dictApply.apply(map(f)(a))(b);
};
const lift3 = dictApply => {
  const map = dictApply.Functor0().map;
  return f => a => b => c => dictApply.apply(dictApply.apply(map(f)(a))(b))(c);
};
const lift4 = dictApply => {
  const map = dictApply.Functor0().map;
  return f => a => b => c => d => dictApply.apply(dictApply.apply(dictApply.apply(map(f)(a))(b))(c))(d);
};
const lift5 = dictApply => {
  const map = dictApply.Functor0().map;
  return f => a => b => c => d => e => dictApply.apply(dictApply.apply(dictApply.apply(dictApply.apply(map(f)(a))(b))(c))(d))(e);
};
export {apply, applyArray, applyFirst, applyFn, applyProxy, applySecond, identity, lift2, lift3, lift4, lift5};
export * from "./foreign.js";
