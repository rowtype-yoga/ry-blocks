import * as $runtime from "../runtime.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const lazyUnit = {defer: v => Data$dUnit.unit};
const lazyFn = {defer: f => x => f(Data$dUnit.unit)(x)};
const defer = dict => dict.defer;
const fix = dictLazy => f => {
  const go$lazy = $runtime.binding(() => dictLazy.defer(v => f(go$lazy())));
  const go = go$lazy();
  return go;
};
export {defer, fix, lazyFn, lazyUnit};
