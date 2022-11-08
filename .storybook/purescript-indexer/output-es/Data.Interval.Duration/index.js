import * as $runtime from "../runtime.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dSemiring from "../Data.Semiring/index.js";
import * as Data$dShow from "../Data.Show/index.js";
const $DurationComponent = tag => ({tag});
const Second = /* #__PURE__ */ $DurationComponent("Second");
const Minute = /* #__PURE__ */ $DurationComponent("Minute");
const Hour = /* #__PURE__ */ $DurationComponent("Hour");
const Day = /* #__PURE__ */ $DurationComponent("Day");
const Week = /* #__PURE__ */ $DurationComponent("Week");
const Month = /* #__PURE__ */ $DurationComponent("Month");
const Year = /* #__PURE__ */ $DurationComponent("Year");
const Duration = x => x;
const showDurationComponent = {
  show: v => {
    if (v.tag === "Minute") { return "Minute"; }
    if (v.tag === "Second") { return "Second"; }
    if (v.tag === "Hour") { return "Hour"; }
    if (v.tag === "Day") { return "Day"; }
    if (v.tag === "Week") { return "Week"; }
    if (v.tag === "Month") { return "Month"; }
    if (v.tag === "Year") { return "Year"; }
    $runtime.fail();
  }
};
const show = /* #__PURE__ */ (() => Data$dMap$dInternal.showMap(showDurationComponent)(Data$dShow.showNumber).show)();
const showDuration = {show: v => "(Duration " + (show(v) + ")")};
const newtypeDuration = {Coercible0: () => undefined};
const eqDurationComponent = {
  eq: x => y => {
    if (x.tag === "Second") { return y.tag === "Second"; }
    if (x.tag === "Minute") { return y.tag === "Minute"; }
    if (x.tag === "Hour") { return y.tag === "Hour"; }
    if (x.tag === "Day") { return y.tag === "Day"; }
    if (x.tag === "Week") { return y.tag === "Week"; }
    if (x.tag === "Month") { return y.tag === "Month"; }
    if (x.tag === "Year") { return y.tag === "Year"; }
    return false;
  }
};
const eq = /* #__PURE__ */ (() => Data$dMap$dInternal.eqMap(eqDurationComponent)(Data$dEq.eqNumber).eq)();
const ordDurationComponent = {
  compare: x => y => {
    if (x.tag === "Second") {
      if (y.tag === "Second") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Second") { return Data$dOrdering.GT; }
    if (x.tag === "Minute") {
      if (y.tag === "Minute") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Minute") { return Data$dOrdering.GT; }
    if (x.tag === "Hour") {
      if (y.tag === "Hour") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Hour") { return Data$dOrdering.GT; }
    if (x.tag === "Day") {
      if (y.tag === "Day") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Day") { return Data$dOrdering.GT; }
    if (x.tag === "Week") {
      if (y.tag === "Week") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Week") { return Data$dOrdering.GT; }
    if (x.tag === "Month") {
      if (y.tag === "Month") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Month") { return Data$dOrdering.GT; }
    if (x.tag === "Year") {
      if (y.tag === "Year") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqDurationComponent
};
const compare = /* #__PURE__ */ (() => Data$dMap$dInternal.ordMap(ordDurationComponent)(Data$dOrd.ordNumber).compare)();
const semigroupDuration = {append: v => v1 => Data$dMap$dInternal.unionWith(ordDurationComponent)(Data$dSemiring.numAdd)(v)(v1)};
const monoidDuration = {mempty: Data$dMap$dInternal.Leaf, Semigroup0: () => semigroupDuration};
const eqDuration = {eq: x => y => eq(x)(y)};
const ordDuration = {compare: x => y => compare(x)(y), Eq0: () => eqDuration};
const durationFromComponent = k => v => Data$dMap$dInternal.$Map("Two", Data$dMap$dInternal.Leaf, k, v, Data$dMap$dInternal.Leaf);
const hour = /* #__PURE__ */ durationFromComponent(Hour);
const millisecond = x => Data$dMap$dInternal.$Map("Two", Data$dMap$dInternal.Leaf, Second, x / 1000.0, Data$dMap$dInternal.Leaf);
const minute = /* #__PURE__ */ durationFromComponent(Minute);
const month = /* #__PURE__ */ durationFromComponent(Month);
const second = /* #__PURE__ */ durationFromComponent(Second);
const week = /* #__PURE__ */ durationFromComponent(Week);
const year = /* #__PURE__ */ durationFromComponent(Year);
const day = /* #__PURE__ */ durationFromComponent(Day);
export {
  $DurationComponent,
  Day,
  Duration,
  Hour,
  Minute,
  Month,
  Second,
  Week,
  Year,
  compare,
  day,
  durationFromComponent,
  eq,
  eqDuration,
  eqDurationComponent,
  hour,
  millisecond,
  minute,
  monoidDuration,
  month,
  newtypeDuration,
  ordDuration,
  ordDurationComponent,
  second,
  semigroupDuration,
  show,
  showDuration,
  showDurationComponent,
  week,
  year
};
