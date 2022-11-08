import * as $runtime from "../runtime.js";
import * as Data$dRing from "../Data.Ring/index.js";
const recip = dict => dict.recip;
const rightDiv = dictDivisionRing => {
  const mul = dictDivisionRing.Ring0().Semiring0().mul;
  return a => b => mul(a)(dictDivisionRing.recip(b));
};
const leftDiv = dictDivisionRing => {
  const mul = dictDivisionRing.Ring0().Semiring0().mul;
  return a => b => mul(dictDivisionRing.recip(b))(a);
};
const divisionringNumber = {recip: x => 1.0 / x, Ring0: () => Data$dRing.ringNumber};
export {divisionringNumber, leftDiv, recip, rightDiv};
