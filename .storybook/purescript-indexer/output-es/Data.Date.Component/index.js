import * as $runtime from "../runtime.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dShow from "../Data.Show/index.js";
const $Month = tag => ({tag});
const $Weekday = tag => ({tag});
const Monday = /* #__PURE__ */ $Weekday("Monday");
const Tuesday = /* #__PURE__ */ $Weekday("Tuesday");
const Wednesday = /* #__PURE__ */ $Weekday("Wednesday");
const Thursday = /* #__PURE__ */ $Weekday("Thursday");
const Friday = /* #__PURE__ */ $Weekday("Friday");
const Saturday = /* #__PURE__ */ $Weekday("Saturday");
const Sunday = /* #__PURE__ */ $Weekday("Sunday");
const January = /* #__PURE__ */ $Month("January");
const February = /* #__PURE__ */ $Month("February");
const March = /* #__PURE__ */ $Month("March");
const April = /* #__PURE__ */ $Month("April");
const May = /* #__PURE__ */ $Month("May");
const June = /* #__PURE__ */ $Month("June");
const July = /* #__PURE__ */ $Month("July");
const August = /* #__PURE__ */ $Month("August");
const September = /* #__PURE__ */ $Month("September");
const October = /* #__PURE__ */ $Month("October");
const November = /* #__PURE__ */ $Month("November");
const December = /* #__PURE__ */ $Month("December");
const showYear = {show: v => "(Year " + (Data$dShow.showIntImpl(v) + ")")};
const showWeekday = {
  show: v => {
    if (v.tag === "Monday") { return "Monday"; }
    if (v.tag === "Tuesday") { return "Tuesday"; }
    if (v.tag === "Wednesday") { return "Wednesday"; }
    if (v.tag === "Thursday") { return "Thursday"; }
    if (v.tag === "Friday") { return "Friday"; }
    if (v.tag === "Saturday") { return "Saturday"; }
    if (v.tag === "Sunday") { return "Sunday"; }
    $runtime.fail();
  }
};
const showMonth = {
  show: v => {
    if (v.tag === "January") { return "January"; }
    if (v.tag === "February") { return "February"; }
    if (v.tag === "March") { return "March"; }
    if (v.tag === "April") { return "April"; }
    if (v.tag === "May") { return "May"; }
    if (v.tag === "June") { return "June"; }
    if (v.tag === "July") { return "July"; }
    if (v.tag === "August") { return "August"; }
    if (v.tag === "September") { return "September"; }
    if (v.tag === "October") { return "October"; }
    if (v.tag === "November") { return "November"; }
    if (v.tag === "December") { return "December"; }
    $runtime.fail();
  }
};
const showDay = {show: v => "(Day " + (Data$dShow.showIntImpl(v) + ")")};
const ordYear = Data$dOrd.ordInt;
const ordDay = Data$dOrd.ordInt;
const eqYear = Data$dEq.eqInt;
const eqWeekday = {
  eq: x => y => {
    if (x.tag === "Monday") { return y.tag === "Monday"; }
    if (x.tag === "Tuesday") { return y.tag === "Tuesday"; }
    if (x.tag === "Wednesday") { return y.tag === "Wednesday"; }
    if (x.tag === "Thursday") { return y.tag === "Thursday"; }
    if (x.tag === "Friday") { return y.tag === "Friday"; }
    if (x.tag === "Saturday") { return y.tag === "Saturday"; }
    if (x.tag === "Sunday") { return y.tag === "Sunday"; }
    return false;
  }
};
const ordWeekday = {
  compare: x => y => {
    if (x.tag === "Monday") {
      if (y.tag === "Monday") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Monday") { return Data$dOrdering.GT; }
    if (x.tag === "Tuesday") {
      if (y.tag === "Tuesday") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Tuesday") { return Data$dOrdering.GT; }
    if (x.tag === "Wednesday") {
      if (y.tag === "Wednesday") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Wednesday") { return Data$dOrdering.GT; }
    if (x.tag === "Thursday") {
      if (y.tag === "Thursday") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Thursday") { return Data$dOrdering.GT; }
    if (x.tag === "Friday") {
      if (y.tag === "Friday") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Friday") { return Data$dOrdering.GT; }
    if (x.tag === "Saturday") {
      if (y.tag === "Saturday") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Saturday") { return Data$dOrdering.GT; }
    if (x.tag === "Sunday") {
      if (y.tag === "Sunday") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqWeekday
};
const eqMonth = {
  eq: x => y => {
    if (x.tag === "January") { return y.tag === "January"; }
    if (x.tag === "February") { return y.tag === "February"; }
    if (x.tag === "March") { return y.tag === "March"; }
    if (x.tag === "April") { return y.tag === "April"; }
    if (x.tag === "May") { return y.tag === "May"; }
    if (x.tag === "June") { return y.tag === "June"; }
    if (x.tag === "July") { return y.tag === "July"; }
    if (x.tag === "August") { return y.tag === "August"; }
    if (x.tag === "September") { return y.tag === "September"; }
    if (x.tag === "October") { return y.tag === "October"; }
    if (x.tag === "November") { return y.tag === "November"; }
    if (x.tag === "December") { return y.tag === "December"; }
    return false;
  }
};
const ordMonth = {
  compare: x => y => {
    if (x.tag === "January") {
      if (y.tag === "January") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "January") { return Data$dOrdering.GT; }
    if (x.tag === "February") {
      if (y.tag === "February") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "February") { return Data$dOrdering.GT; }
    if (x.tag === "March") {
      if (y.tag === "March") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "March") { return Data$dOrdering.GT; }
    if (x.tag === "April") {
      if (y.tag === "April") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "April") { return Data$dOrdering.GT; }
    if (x.tag === "May") {
      if (y.tag === "May") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "May") { return Data$dOrdering.GT; }
    if (x.tag === "June") {
      if (y.tag === "June") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "June") { return Data$dOrdering.GT; }
    if (x.tag === "July") {
      if (y.tag === "July") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "July") { return Data$dOrdering.GT; }
    if (x.tag === "August") {
      if (y.tag === "August") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "August") { return Data$dOrdering.GT; }
    if (x.tag === "September") {
      if (y.tag === "September") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "September") { return Data$dOrdering.GT; }
    if (x.tag === "October") {
      if (y.tag === "October") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "October") { return Data$dOrdering.GT; }
    if (x.tag === "November") {
      if (y.tag === "November") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "November") { return Data$dOrdering.GT; }
    if (x.tag === "December") {
      if (y.tag === "December") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqMonth
};
const eqDay = Data$dEq.eqInt;
const boundedYear = {bottom: -271820, top: 275759, Ord0: () => Data$dOrd.ordInt};
const boundedWeekday = {bottom: Monday, top: Sunday, Ord0: () => ordWeekday};
const boundedMonth = {bottom: January, top: December, Ord0: () => ordMonth};
const boundedEnumYear = {
  cardinality: 547580,
  toEnum: n => {
    if (n >= -271820 && n <= 275759) { return Data$dMaybe.$Maybe("Just", n); }
    return Data$dMaybe.Nothing;
  },
  fromEnum: v => v,
  Bounded0: () => boundedYear,
  Enum1: () => enumYear
};
const enumYear = {
  succ: x => {
    const $1 = x + 1 | 0;
    if ($1 >= -271820 && $1 <= 275759) { return Data$dMaybe.$Maybe("Just", $1); }
    return Data$dMaybe.Nothing;
  },
  pred: x => {
    const $1 = x - 1 | 0;
    if ($1 >= -271820 && $1 <= 275759) { return Data$dMaybe.$Maybe("Just", $1); }
    return Data$dMaybe.Nothing;
  },
  Ord0: () => Data$dOrd.ordInt
};
const boundedEnumWeekday = {
  cardinality: 7,
  toEnum: v => {
    if (v === 1) { return Data$dMaybe.$Maybe("Just", Monday); }
    if (v === 2) { return Data$dMaybe.$Maybe("Just", Tuesday); }
    if (v === 3) { return Data$dMaybe.$Maybe("Just", Wednesday); }
    if (v === 4) { return Data$dMaybe.$Maybe("Just", Thursday); }
    if (v === 5) { return Data$dMaybe.$Maybe("Just", Friday); }
    if (v === 6) { return Data$dMaybe.$Maybe("Just", Saturday); }
    if (v === 7) { return Data$dMaybe.$Maybe("Just", Sunday); }
    return Data$dMaybe.Nothing;
  },
  fromEnum: v => {
    if (v.tag === "Monday") { return 1; }
    if (v.tag === "Tuesday") { return 2; }
    if (v.tag === "Wednesday") { return 3; }
    if (v.tag === "Thursday") { return 4; }
    if (v.tag === "Friday") { return 5; }
    if (v.tag === "Saturday") { return 6; }
    if (v.tag === "Sunday") { return 7; }
    $runtime.fail();
  },
  Bounded0: () => boundedWeekday,
  Enum1: () => enumWeekday
};
const enumWeekday = {
  succ: x => boundedEnumWeekday.toEnum((() => {
    if (x.tag === "Monday") { return 2; }
    if (x.tag === "Tuesday") { return 3; }
    if (x.tag === "Wednesday") { return 4; }
    if (x.tag === "Thursday") { return 5; }
    if (x.tag === "Friday") { return 6; }
    if (x.tag === "Saturday") { return 7; }
    if (x.tag === "Sunday") { return 8; }
    $runtime.fail();
  })()),
  pred: x => boundedEnumWeekday.toEnum((() => {
    if (x.tag === "Monday") { return 0; }
    if (x.tag === "Tuesday") { return 1; }
    if (x.tag === "Wednesday") { return 2; }
    if (x.tag === "Thursday") { return 3; }
    if (x.tag === "Friday") { return 4; }
    if (x.tag === "Saturday") { return 5; }
    if (x.tag === "Sunday") { return 6; }
    $runtime.fail();
  })()),
  Ord0: () => ordWeekday
};
const boundedEnumMonth = {
  cardinality: 12,
  toEnum: v => {
    if (v === 1) { return Data$dMaybe.$Maybe("Just", January); }
    if (v === 2) { return Data$dMaybe.$Maybe("Just", February); }
    if (v === 3) { return Data$dMaybe.$Maybe("Just", March); }
    if (v === 4) { return Data$dMaybe.$Maybe("Just", April); }
    if (v === 5) { return Data$dMaybe.$Maybe("Just", May); }
    if (v === 6) { return Data$dMaybe.$Maybe("Just", June); }
    if (v === 7) { return Data$dMaybe.$Maybe("Just", July); }
    if (v === 8) { return Data$dMaybe.$Maybe("Just", August); }
    if (v === 9) { return Data$dMaybe.$Maybe("Just", September); }
    if (v === 10) { return Data$dMaybe.$Maybe("Just", October); }
    if (v === 11) { return Data$dMaybe.$Maybe("Just", November); }
    if (v === 12) { return Data$dMaybe.$Maybe("Just", December); }
    return Data$dMaybe.Nothing;
  },
  fromEnum: v => {
    if (v.tag === "January") { return 1; }
    if (v.tag === "February") { return 2; }
    if (v.tag === "March") { return 3; }
    if (v.tag === "April") { return 4; }
    if (v.tag === "May") { return 5; }
    if (v.tag === "June") { return 6; }
    if (v.tag === "July") { return 7; }
    if (v.tag === "August") { return 8; }
    if (v.tag === "September") { return 9; }
    if (v.tag === "October") { return 10; }
    if (v.tag === "November") { return 11; }
    if (v.tag === "December") { return 12; }
    $runtime.fail();
  },
  Bounded0: () => boundedMonth,
  Enum1: () => enumMonth
};
const enumMonth = {
  succ: x => boundedEnumMonth.toEnum((() => {
    if (x.tag === "January") { return 2; }
    if (x.tag === "February") { return 3; }
    if (x.tag === "March") { return 4; }
    if (x.tag === "April") { return 5; }
    if (x.tag === "May") { return 6; }
    if (x.tag === "June") { return 7; }
    if (x.tag === "July") { return 8; }
    if (x.tag === "August") { return 9; }
    if (x.tag === "September") { return 10; }
    if (x.tag === "October") { return 11; }
    if (x.tag === "November") { return 12; }
    if (x.tag === "December") { return 13; }
    $runtime.fail();
  })()),
  pred: x => boundedEnumMonth.toEnum((() => {
    if (x.tag === "January") { return 0; }
    if (x.tag === "February") { return 1; }
    if (x.tag === "March") { return 2; }
    if (x.tag === "April") { return 3; }
    if (x.tag === "May") { return 4; }
    if (x.tag === "June") { return 5; }
    if (x.tag === "July") { return 6; }
    if (x.tag === "August") { return 7; }
    if (x.tag === "September") { return 8; }
    if (x.tag === "October") { return 9; }
    if (x.tag === "November") { return 10; }
    if (x.tag === "December") { return 11; }
    $runtime.fail();
  })()),
  Ord0: () => ordMonth
};
const boundedDay = {bottom: 1, top: 31, Ord0: () => Data$dOrd.ordInt};
const boundedEnumDay = {
  cardinality: 31,
  toEnum: n => {
    if (n >= 1 && n <= 31) { return Data$dMaybe.$Maybe("Just", n); }
    return Data$dMaybe.Nothing;
  },
  fromEnum: v => v,
  Bounded0: () => boundedDay,
  Enum1: () => enumDay
};
const enumDay = {
  succ: x => {
    const $1 = x + 1 | 0;
    if ($1 >= 1 && $1 <= 31) { return Data$dMaybe.$Maybe("Just", $1); }
    return Data$dMaybe.Nothing;
  },
  pred: x => {
    const $1 = x - 1 | 0;
    if ($1 >= 1 && $1 <= 31) { return Data$dMaybe.$Maybe("Just", $1); }
    return Data$dMaybe.Nothing;
  },
  Ord0: () => Data$dOrd.ordInt
};
export {
  $Month,
  $Weekday,
  April,
  August,
  December,
  February,
  Friday,
  January,
  July,
  June,
  March,
  May,
  Monday,
  November,
  October,
  Saturday,
  September,
  Sunday,
  Thursday,
  Tuesday,
  Wednesday,
  boundedDay,
  boundedEnumDay,
  boundedEnumMonth,
  boundedEnumWeekday,
  boundedEnumYear,
  boundedMonth,
  boundedWeekday,
  boundedYear,
  enumDay,
  enumMonth,
  enumWeekday,
  enumYear,
  eqDay,
  eqMonth,
  eqWeekday,
  eqYear,
  ordDay,
  ordMonth,
  ordWeekday,
  ordYear,
  showDay,
  showMonth,
  showWeekday,
  showYear
};
