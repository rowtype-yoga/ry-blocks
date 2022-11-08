import * as $runtime from "../runtime.js";
import * as Control$dApply from "../Control.Apply/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
const pure = dict => dict.pure;
const unless = dictApplicative => v => v1 => {
  if (!v) { return v1; }
  if (v) { return dictApplicative.pure(Data$dUnit.unit); }
  $runtime.fail();
};
const when = dictApplicative => v => v1 => {
  if (v) { return v1; }
  return dictApplicative.pure(Data$dUnit.unit);
};
const liftA1 = dictApplicative => {
  const apply = dictApplicative.Apply0().apply;
  return f => a => apply(dictApplicative.pure(f))(a);
};
const applicativeProxy = {pure: v => Type$dProxy.Proxy, Apply0: () => Control$dApply.applyProxy};
const applicativeFn = {pure: x => v => x, Apply0: () => Control$dApply.applyFn};
const applicativeArray = {pure: x => [x], Apply0: () => Control$dApply.applyArray};
export {applicativeArray, applicativeFn, applicativeProxy, liftA1, pure, unless, when};
