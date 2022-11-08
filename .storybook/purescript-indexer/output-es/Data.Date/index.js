import * as $runtime from "../runtime.js";
import * as Data$dDate$dComponent from "../Data.Date.Component/index.js";
import * as Data$dEuclideanRing from "../Data.EuclideanRing/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import {calcDiff, calcWeekday, canonicalDateImpl} from "./foreign.js";
const $Date = (_1, _2, _3) => ({tag: "Date", _1, _2, _3});
const greaterThan = /* #__PURE__ */ (() => {
  const $0 = Data$dMaybe.ordMaybe(Data$dOrd.ordInt);
  return a1 => a2 => $0.compare(a1)(a2).tag === "GT";
})();
const $$Date = value0 => value1 => value2 => $Date(value0, value1, value2);
const year = v => v._1;
const weekday = v => {
  const n = calcWeekday(
    v._1,
    (() => {
      if (v._2.tag === "January") { return 1; }
      if (v._2.tag === "February") { return 2; }
      if (v._2.tag === "March") { return 3; }
      if (v._2.tag === "April") { return 4; }
      if (v._2.tag === "May") { return 5; }
      if (v._2.tag === "June") { return 6; }
      if (v._2.tag === "July") { return 7; }
      if (v._2.tag === "August") { return 8; }
      if (v._2.tag === "September") { return 9; }
      if (v._2.tag === "October") { return 10; }
      if (v._2.tag === "November") { return 11; }
      if (v._2.tag === "December") { return 12; }
      $runtime.fail();
    })(),
    v._3
  );
  if (n === 0) {
    const $2 = Data$dDate$dComponent.boundedEnumWeekday.toEnum(7);
    if ($2.tag === "Just") { return $2._1; }
    $runtime.fail();
  }
  const $2 = Data$dDate$dComponent.boundedEnumWeekday.toEnum(n);
  if ($2.tag === "Just") { return $2._1; }
  $runtime.fail();
};
const showDate = {
  show: v => "(Date (Year " + (Data$dShow.showIntImpl(v._1) + ")") + (
    " " + (
      (() => {
        if (v._2.tag === "January") { return "January"; }
        if (v._2.tag === "February") { return "February"; }
        if (v._2.tag === "March") { return "March"; }
        if (v._2.tag === "April") { return "April"; }
        if (v._2.tag === "May") { return "May"; }
        if (v._2.tag === "June") { return "June"; }
        if (v._2.tag === "July") { return "July"; }
        if (v._2.tag === "August") { return "August"; }
        if (v._2.tag === "September") { return "September"; }
        if (v._2.tag === "October") { return "October"; }
        if (v._2.tag === "November") { return "November"; }
        if (v._2.tag === "December") { return "December"; }
        $runtime.fail();
      })() + (" (Day " + Data$dShow.showIntImpl(v._3) + "))")
    )
  )
};
const month = v => v._2;
const isLeapYear = y => Data$dEuclideanRing.intMod(y)(4) === 0 && (Data$dEuclideanRing.intMod(y)(400) === 0 || Data$dEuclideanRing.intMod(y)(100) !== 0);
const lastDayOfMonth = y => m => {
  if (m.tag === "January") { return 31; }
  if (m.tag === "February") {
    if (isLeapYear(y)) { return 29; }
    return 28;
  }
  if (m.tag === "March") { return 31; }
  if (m.tag === "April") { return 30; }
  if (m.tag === "May") { return 31; }
  if (m.tag === "June") { return 30; }
  if (m.tag === "July") { return 31; }
  if (m.tag === "August") { return 31; }
  if (m.tag === "September") { return 30; }
  if (m.tag === "October") { return 31; }
  if (m.tag === "November") { return 30; }
  if (m.tag === "December") { return 31; }
  $runtime.fail();
};
const eqDate = {
  eq: x => y => x._1 === y._1 && (() => {
    if (x._2.tag === "January") { return y._2.tag === "January"; }
    if (x._2.tag === "February") { return y._2.tag === "February"; }
    if (x._2.tag === "March") { return y._2.tag === "March"; }
    if (x._2.tag === "April") { return y._2.tag === "April"; }
    if (x._2.tag === "May") { return y._2.tag === "May"; }
    if (x._2.tag === "June") { return y._2.tag === "June"; }
    if (x._2.tag === "July") { return y._2.tag === "July"; }
    if (x._2.tag === "August") { return y._2.tag === "August"; }
    if (x._2.tag === "September") { return y._2.tag === "September"; }
    if (x._2.tag === "October") { return y._2.tag === "October"; }
    if (x._2.tag === "November") { return y._2.tag === "November"; }
    if (x._2.tag === "December") { return y._2.tag === "December"; }
    return false;
  })() && x._3 === y._3
};
const ordDate = {
  compare: x => y => {
    const v = Data$dOrd.ordInt.compare(x._1)(y._1);
    if (v.tag === "LT") { return Data$dOrdering.LT; }
    if (v.tag === "GT") { return Data$dOrdering.GT; }
    const v1 = Data$dDate$dComponent.ordMonth.compare(x._2)(y._2);
    if (v1.tag === "LT") { return Data$dOrdering.LT; }
    if (v1.tag === "GT") { return Data$dOrdering.GT; }
    return Data$dOrd.ordInt.compare(x._3)(y._3);
  },
  Eq0: () => eqDate
};
const enumDate = {
  succ: v => {
    const sm = Data$dDate$dComponent.enumMonth.succ(v._2);
    const $2 = v._3 + 1 | 0;
    const v1 = (() => {
      if ($2 >= 1 && $2 <= 31) { return Data$dMaybe.$Maybe("Just", $2); }
      return Data$dMaybe.Nothing;
    })();
    const sd = (() => {
      if (greaterThan(v1)(Data$dMaybe.$Maybe("Just", lastDayOfMonth(v._1)(v._2)))) { return Data$dMaybe.Nothing; }
      return v1;
    })();
    return Data$dMaybe.applyMaybe.apply(Data$dMaybe.applyMaybe.apply((() => {
      if (
        (() => {
          if (sd.tag === "Nothing") { return true; }
          if (sd.tag === "Just") { return false; }
          $runtime.fail();
        })() && (() => {
          if (sm.tag === "Nothing") { return true; }
          if (sm.tag === "Just") { return false; }
          $runtime.fail();
        })()
      ) {
        const $5 = v._1 + 1 | 0;
        if ($5 >= -271820 && $5 <= 275759) { return Data$dMaybe.$Maybe("Just", $$Date($5)); }
        return Data$dMaybe.Nothing;
      }
      return Data$dMaybe.$Maybe("Just", $$Date(v._1));
    })())(Data$dMaybe.$Maybe(
      "Just",
      (() => {
        if (
          (() => {
            if (sd.tag === "Nothing") { return true; }
            if (sd.tag === "Just") { return false; }
            $runtime.fail();
          })()
        ) {
          if (sm.tag === "Nothing") { return Data$dDate$dComponent.January; }
          if (sm.tag === "Just") { return sm._1; }
          $runtime.fail();
        }
        return v._2;
      })()
    )))((() => {
      if (
        (() => {
          if (sd.tag === "Nothing") { return true; }
          if (sd.tag === "Just") { return false; }
          $runtime.fail();
        })()
      ) {
        return Data$dMaybe.$Maybe("Just", 1);
      }
      return sd;
    })());
  },
  pred: v => {
    const pm = Data$dDate$dComponent.enumMonth.pred(v._2);
    const $2 = v._3 - 1 | 0;
    const pd = (() => {
      if ($2 >= 1 && $2 <= 31) { return Data$dMaybe.$Maybe("Just", $2); }
      return Data$dMaybe.Nothing;
    })();
    const m$p = (() => {
      if (
        (() => {
          if (pd.tag === "Nothing") { return true; }
          if (pd.tag === "Just") { return false; }
          $runtime.fail();
        })()
      ) {
        if (pm.tag === "Nothing") { return Data$dDate$dComponent.December; }
        if (pm.tag === "Just") { return pm._1; }
        $runtime.fail();
      }
      return v._2;
    })();
    const l = lastDayOfMonth(v._1)(m$p);
    return Data$dMaybe.applyMaybe.apply(Data$dMaybe.applyMaybe.apply((() => {
      if (
        (() => {
          if (pd.tag === "Nothing") { return true; }
          if (pd.tag === "Just") { return false; }
          $runtime.fail();
        })() && (() => {
          if (pm.tag === "Nothing") { return true; }
          if (pm.tag === "Just") { return false; }
          $runtime.fail();
        })()
      ) {
        const $6 = v._1 - 1 | 0;
        if ($6 >= -271820 && $6 <= 275759) { return Data$dMaybe.$Maybe("Just", $$Date($6)); }
        return Data$dMaybe.Nothing;
      }
      return Data$dMaybe.$Maybe("Just", $$Date(v._1));
    })())(Data$dMaybe.$Maybe("Just", m$p)))((() => {
      if (
        (() => {
          if (pd.tag === "Nothing") { return true; }
          if (pd.tag === "Just") { return false; }
          $runtime.fail();
        })()
      ) {
        return Data$dMaybe.$Maybe("Just", l);
      }
      return pd;
    })());
  },
  Ord0: () => ordDate
};
const diff = dictDuration => v => v1 => dictDuration.toDuration(calcDiff(
  v._1,
  (() => {
    if (v._2.tag === "January") { return 1; }
    if (v._2.tag === "February") { return 2; }
    if (v._2.tag === "March") { return 3; }
    if (v._2.tag === "April") { return 4; }
    if (v._2.tag === "May") { return 5; }
    if (v._2.tag === "June") { return 6; }
    if (v._2.tag === "July") { return 7; }
    if (v._2.tag === "August") { return 8; }
    if (v._2.tag === "September") { return 9; }
    if (v._2.tag === "October") { return 10; }
    if (v._2.tag === "November") { return 11; }
    if (v._2.tag === "December") { return 12; }
    $runtime.fail();
  })(),
  v._3,
  v1._1,
  (() => {
    if (v1._2.tag === "January") { return 1; }
    if (v1._2.tag === "February") { return 2; }
    if (v1._2.tag === "March") { return 3; }
    if (v1._2.tag === "April") { return 4; }
    if (v1._2.tag === "May") { return 5; }
    if (v1._2.tag === "June") { return 6; }
    if (v1._2.tag === "July") { return 7; }
    if (v1._2.tag === "August") { return 8; }
    if (v1._2.tag === "September") { return 9; }
    if (v1._2.tag === "October") { return 10; }
    if (v1._2.tag === "November") { return 11; }
    if (v1._2.tag === "December") { return 12; }
    $runtime.fail();
  })(),
  v1._3
));
const day = v => v._3;
const canonicalDate = y => m => d => canonicalDateImpl(
  y$p => m$p => d$p => $Date(
    y$p,
    (() => {
      const $6 = Data$dDate$dComponent.boundedEnumMonth.toEnum(m$p);
      if ($6.tag === "Just") { return $6._1; }
      $runtime.fail();
    })(),
    d$p
  ),
  y,
  (() => {
    if (m.tag === "January") { return 1; }
    if (m.tag === "February") { return 2; }
    if (m.tag === "March") { return 3; }
    if (m.tag === "April") { return 4; }
    if (m.tag === "May") { return 5; }
    if (m.tag === "June") { return 6; }
    if (m.tag === "July") { return 7; }
    if (m.tag === "August") { return 8; }
    if (m.tag === "September") { return 9; }
    if (m.tag === "October") { return 10; }
    if (m.tag === "November") { return 11; }
    if (m.tag === "December") { return 12; }
    $runtime.fail();
  })(),
  d
);
const exactDate = y => m => d => {
  if (eqDate.eq(canonicalDate(y)(m)(d))($Date(y, m, d))) { return Data$dMaybe.$Maybe("Just", $Date(y, m, d)); }
  return Data$dMaybe.Nothing;
};
const boundedDate = {
  bottom: /* #__PURE__ */ $Date(-271820, Data$dDate$dComponent.January, 1),
  top: /* #__PURE__ */ $Date(275759, Data$dDate$dComponent.December, 31),
  Ord0: () => ordDate
};
const adjust = v => date => {
  const adj = v1 => v2 => {
    if (v1 === 0) { return Data$dMaybe.$Maybe("Just", v2); }
    const j = v1 + v2._3 | 0;
    const low = j < 1;
    const l = lastDayOfMonth(v2._1)((() => {
      if (low) {
        const $7 = Data$dDate$dComponent.enumMonth.pred(v2._2);
        if ($7.tag === "Nothing") { return Data$dDate$dComponent.December; }
        if ($7.tag === "Just") { return $7._1; }
        $runtime.fail();
      }
      return v2._2;
    })());
    const hi = j > l;
    const $9 = adj((() => {
      if (low) { return j; }
      if (hi) { return (j - l | 0) - 1 | 0; }
      return 0;
    })());
    const $10 = (() => {
      if (low) { return enumDate.pred($Date(v2._1, v2._2, 1)); }
      if (hi) { return enumDate.succ($Date(v2._1, v2._2, l)); }
      const $10 = $$Date(v2._1)(v2._2);
      if (j >= 1 && j <= 31) { return Data$dMaybe.$Maybe("Just", $10(j)); }
      return Data$dMaybe.Nothing;
    })();
    if ($10.tag === "Just") { return $9($10._1); }
    if ($10.tag === "Nothing") { return Data$dMaybe.Nothing; }
    $runtime.fail();
  };
  const $3 = Data$dInt.fromNumber(v);
  if ($3.tag === "Just") { return adj($3._1)(date); }
  if ($3.tag === "Nothing") { return Data$dMaybe.Nothing; }
  $runtime.fail();
};
export {
  $Date,
  $$Date as Date,
  adjust,
  boundedDate,
  canonicalDate,
  day,
  diff,
  enumDate,
  eqDate,
  exactDate,
  greaterThan,
  isLeapYear,
  lastDayOfMonth,
  month,
  ordDate,
  showDate,
  weekday,
  year
};
export * from "./foreign.js";
