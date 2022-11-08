import * as $runtime from "../runtime.js";
import * as Data$dDate from "../Data.Date/index.js";
import * as Data$dDate$dComponent from "../Data.Date.Component/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
const genDate = dictMonadGen => {
  const Monad0 = dictMonadGen.Monad0();
  const Bind1 = Monad0.Bind1();
  const map = Bind1.Apply0().Functor0().map;
  const pure = Monad0.Applicative0().pure;
  return Bind1.bind(dictMonadGen.Monad0().Bind1().Apply0().Functor0().map(x => {
    if (x >= -271820 && x <= 275759) { return x; }
    $runtime.fail();
  })(dictMonadGen.chooseInt(1900)(2100)))(year => Bind1.bind(map(x => Data$dInt.toNumber(x))(dictMonadGen.chooseInt(0)((() => {
    if (Data$dDate.isLeapYear(year)) { return 365; }
    return 364;
  })())))(days => pure((() => {
    const $7 = Data$dDate.exactDate(year)(Data$dDate$dComponent.January)(1);
    const $8 = (() => {
      if ($7.tag === "Just") { return Data$dDate.adjust(days)($7._1); }
      if ($7.tag === "Nothing") { return Data$dMaybe.Nothing; }
      $runtime.fail();
    })();
    if ($8.tag === "Just") { return $8._1; }
    $runtime.fail();
  })())));
};
export {genDate};
