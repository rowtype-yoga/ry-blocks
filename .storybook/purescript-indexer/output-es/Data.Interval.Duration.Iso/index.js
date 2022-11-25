import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dInterval$dDuration from "../Data.Interval.Duration/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dNumber from "../Data.Number/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
const $Error = (tag, _1) => ({tag, _1});
const foldMap1 = /* #__PURE__ */ (() => Data$dList$dTypes.foldableList.foldMap(Data$dList$dTypes.monoidList))();
const foldMap2 = /* #__PURE__ */ (() => Data$dList$dTypes.foldableList.foldMap((() => {
  const semigroupAdditive1 = {append: v => v1 => v + v1};
  return {mempty: 0.0, Semigroup0: () => semigroupAdditive1};
})()))();
const fold = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap((() => {
  const semigroupFn = {append: f => g => x => Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(g(x))(f(x))};
  return {mempty: v => Data$dList$dTypes.Nil, Semigroup0: () => semigroupFn};
})())(Data$dFoldable.identity))();
const IsEmpty = /* #__PURE__ */ $Error("IsEmpty");
const InvalidWeekComponentUsage = /* #__PURE__ */ $Error("InvalidWeekComponentUsage");
const ContainsNegativeValue = value0 => $Error("ContainsNegativeValue", value0);
const InvalidFractionalUse = value0 => $Error("InvalidFractionalUse", value0);
const unIsoDuration = v => v;
const showIsoDuration = {show: v => "(IsoDuration (Duration " + Data$dInterval$dDuration.show(v) + "))"};
const showError = {
  show: v => {
    if (v.tag === "IsEmpty") { return "(IsEmpty)"; }
    if (v.tag === "InvalidWeekComponentUsage") { return "(InvalidWeekComponentUsage)"; }
    if (v.tag === "ContainsNegativeValue") {
      if (v._1.tag === "Minute") { return "(ContainsNegativeValue Minute)"; }
      if (v._1.tag === "Second") { return "(ContainsNegativeValue Second)"; }
      if (v._1.tag === "Hour") { return "(ContainsNegativeValue Hour)"; }
      if (v._1.tag === "Day") { return "(ContainsNegativeValue Day)"; }
      if (v._1.tag === "Week") { return "(ContainsNegativeValue Week)"; }
      if (v._1.tag === "Month") { return "(ContainsNegativeValue Month)"; }
      if (v._1.tag === "Year") { return "(ContainsNegativeValue Year)"; }
      $runtime.fail();
    }
    if (v.tag === "InvalidFractionalUse") {
      if (v._1.tag === "Minute") { return "(InvalidFractionalUse Minute)"; }
      if (v._1.tag === "Second") { return "(InvalidFractionalUse Second)"; }
      if (v._1.tag === "Hour") { return "(InvalidFractionalUse Hour)"; }
      if (v._1.tag === "Day") { return "(InvalidFractionalUse Day)"; }
      if (v._1.tag === "Week") { return "(InvalidFractionalUse Week)"; }
      if (v._1.tag === "Month") { return "(InvalidFractionalUse Month)"; }
      if (v._1.tag === "Year") { return "(InvalidFractionalUse Year)"; }
      $runtime.fail();
    }
    $runtime.fail();
  }
};
const prettyError = v => {
  if (v.tag === "IsEmpty") { return "Duration is empty (has no components)"; }
  if (v.tag === "InvalidWeekComponentUsage") { return "Week component of Duration is used with other components"; }
  if (v.tag === "ContainsNegativeValue") {
    if (v._1.tag === "Minute") { return "Component `Minute` contains negative value"; }
    if (v._1.tag === "Second") { return "Component `Second` contains negative value"; }
    if (v._1.tag === "Hour") { return "Component `Hour` contains negative value"; }
    if (v._1.tag === "Day") { return "Component `Day` contains negative value"; }
    if (v._1.tag === "Week") { return "Component `Week` contains negative value"; }
    if (v._1.tag === "Month") { return "Component `Month` contains negative value"; }
    if (v._1.tag === "Year") { return "Component `Year` contains negative value"; }
    $runtime.fail();
  }
  if (v.tag === "InvalidFractionalUse") {
    if (v._1.tag === "Minute") { return "Invalid usage of Fractional value at component `Minute`"; }
    if (v._1.tag === "Second") { return "Invalid usage of Fractional value at component `Second`"; }
    if (v._1.tag === "Hour") { return "Invalid usage of Fractional value at component `Hour`"; }
    if (v._1.tag === "Day") { return "Invalid usage of Fractional value at component `Day`"; }
    if (v._1.tag === "Week") { return "Invalid usage of Fractional value at component `Week`"; }
    if (v._1.tag === "Month") { return "Invalid usage of Fractional value at component `Month`"; }
    if (v._1.tag === "Year") { return "Invalid usage of Fractional value at component `Year`"; }
    $runtime.fail();
  }
  $runtime.fail();
};
const eqIsoDuration = {eq: x => y => Data$dInterval$dDuration.eq(x)(y)};
const ordIsoDuration = {compare: x => y => Data$dInterval$dDuration.compare(x)(y), Eq0: () => eqIsoDuration};
const eqError = {
  eq: x => y => {
    if (x.tag === "IsEmpty") { return y.tag === "IsEmpty"; }
    if (x.tag === "InvalidWeekComponentUsage") { return y.tag === "InvalidWeekComponentUsage"; }
    if (x.tag === "ContainsNegativeValue") {
      if (y.tag === "ContainsNegativeValue") {
        if (x._1.tag === "Second") { return y._1.tag === "Second"; }
        if (x._1.tag === "Minute") { return y._1.tag === "Minute"; }
        if (x._1.tag === "Hour") { return y._1.tag === "Hour"; }
        if (x._1.tag === "Day") { return y._1.tag === "Day"; }
        if (x._1.tag === "Week") { return y._1.tag === "Week"; }
        if (x._1.tag === "Month") { return y._1.tag === "Month"; }
        if (x._1.tag === "Year") { return y._1.tag === "Year"; }
        return false;
      }
      return false;
    }
    if (x.tag === "InvalidFractionalUse") {
      if (y.tag === "InvalidFractionalUse") {
        if (x._1.tag === "Second") { return y._1.tag === "Second"; }
        if (x._1.tag === "Minute") { return y._1.tag === "Minute"; }
        if (x._1.tag === "Hour") { return y._1.tag === "Hour"; }
        if (x._1.tag === "Day") { return y._1.tag === "Day"; }
        if (x._1.tag === "Week") { return y._1.tag === "Week"; }
        if (x._1.tag === "Month") { return y._1.tag === "Month"; }
        if (x._1.tag === "Year") { return y._1.tag === "Year"; }
        return false;
      }
      return false;
    }
    return false;
  }
};
const ordError = {
  compare: x => y => {
    if (x.tag === "IsEmpty") {
      if (y.tag === "IsEmpty") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "IsEmpty") { return Data$dOrdering.GT; }
    if (x.tag === "InvalidWeekComponentUsage") {
      if (y.tag === "InvalidWeekComponentUsage") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "InvalidWeekComponentUsage") { return Data$dOrdering.GT; }
    if (x.tag === "ContainsNegativeValue") {
      if (y.tag === "ContainsNegativeValue") { return Data$dInterval$dDuration.ordDurationComponent.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ContainsNegativeValue") { return Data$dOrdering.GT; }
    if (x.tag === "InvalidFractionalUse") {
      if (y.tag === "InvalidFractionalUse") { return Data$dInterval$dDuration.ordDurationComponent.compare(x._1)(y._1); }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqError
};
const checkWeekUsage = v => {
  if (
    (() => {
      const $1 = Data$dMap$dInternal.lookup(Data$dInterval$dDuration.ordDurationComponent)(Data$dInterval$dDuration.Week)(v.asMap);
      return (() => {
        if ($1.tag === "Nothing") { return false; }
        if ($1.tag === "Just") { return true; }
        $runtime.fail();
      })() && Data$dMap$dInternal.size(v.asMap) > 1;
    })()
  ) {
    return Data$dList$dTypes.$List("Cons", InvalidWeekComponentUsage, Data$dList$dTypes.Nil);
  }
  return Data$dList$dTypes.Nil;
};
const checkNegativeValues = v => foldMap1(v1 => {
  if (v1._2 >= 0.0) { return Data$dList$dTypes.Nil; }
  return Data$dList$dTypes.$List("Cons", $Error("ContainsNegativeValue", v1._1), Data$dList$dTypes.Nil);
})(v.asList);
const checkFractionalUse = v => {
  const v1 = Data$dList.span(x => Data$dNumber.floor(x._2) === x._2)(v.asList).rest;
  if (v1.tag === "Cons") {
    if (foldMap2(x => Data$dNumber.abs(x._2))(v1._2) > 0.0) { return Data$dList$dTypes.$List("Cons", $Error("InvalidFractionalUse", v1._1._1), Data$dList$dTypes.Nil); }
    return Data$dList$dTypes.Nil;
  }
  return Data$dList$dTypes.Nil;
};
const checkEmptiness = v => {
  if (v.asList.tag === "Nil") { return Data$dList$dTypes.$List("Cons", IsEmpty, Data$dList$dTypes.Nil); }
  return Data$dList$dTypes.Nil;
};
const checkValidIsoDuration = v => fold([checkWeekUsage, checkEmptiness, checkFractionalUse, checkNegativeValues])({
  asList: Data$dList.reverse(Data$dMap$dInternal.toUnfoldable(Data$dList$dTypes.unfoldableList)(v)),
  asMap: v
});
const mkIsoDuration = d => {
  const $1 = checkValidIsoDuration(d);
  if ($1.tag === "Nil") { return Data$dEither.$Either("Right", d); }
  if ($1.tag === "Cons") { return Data$dEither.$Either("Left", Data$dNonEmpty.$NonEmpty($1._1, $1._2)); }
  $runtime.fail();
};
export {
  $Error,
  ContainsNegativeValue,
  InvalidFractionalUse,
  InvalidWeekComponentUsage,
  IsEmpty,
  checkEmptiness,
  checkFractionalUse,
  checkNegativeValues,
  checkValidIsoDuration,
  checkWeekUsage,
  eqError,
  eqIsoDuration,
  fold,
  foldMap1,
  foldMap2,
  mkIsoDuration,
  ordError,
  ordIsoDuration,
  prettyError,
  showError,
  showIsoDuration,
  unIsoDuration
};
