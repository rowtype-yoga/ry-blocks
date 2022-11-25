import * as $runtime from "../runtime.js";
import * as Control$dApplicative from "../Control.Applicative/index.js";
import * as Control$dPlus from "../Control.Plus/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const guard = dictAlternative => {
  const pure = dictAlternative.Applicative0().pure;
  const empty = dictAlternative.Plus1().empty;
  return v => {
    if (v) { return pure(Data$dUnit.unit); }
    return empty;
  };
};
const alternativeArray = {Applicative0: () => Control$dApplicative.applicativeArray, Plus1: () => Control$dPlus.plusArray};
export {alternativeArray, guard};
