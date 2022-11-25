import * as $runtime from "../runtime.js";
import * as Data$dBifoldable from "../Data.Bifoldable/index.js";
import * as Data$dBitraversable from "../Data.Bitraversable/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
const $Interval = (tag, _1, _2) => ({tag, _1, _2});
const $RecurringInterval = (_1, _2) => ({tag: "RecurringInterval", _1, _2});
const show = v => {
  if (v.tag === "Just") { return "(Just " + (Data$dShow.showIntImpl(v._1) + ")"); }
  if (v.tag === "Nothing") { return "Nothing"; }
  $runtime.fail();
};
const compare = /* #__PURE__ */ (() => Data$dMaybe.ordMaybe(Data$dOrd.ordInt).compare)();
const StartEnd = value0 => value1 => $Interval("StartEnd", value0, value1);
const DurationEnd = value0 => value1 => $Interval("DurationEnd", value0, value1);
const StartDuration = value0 => value1 => $Interval("StartDuration", value0, value1);
const DurationOnly = value0 => $Interval("DurationOnly", value0);
const RecurringInterval = value0 => value1 => $RecurringInterval(value0, value1);
const showInterval = dictShow => dictShow1 => (
  {
    show: v => {
      if (v.tag === "StartEnd") { return "(StartEnd " + (dictShow1.show(v._1) + (" " + (dictShow1.show(v._2) + ")"))); }
      if (v.tag === "DurationEnd") { return "(DurationEnd " + (dictShow.show(v._1) + (" " + (dictShow1.show(v._2) + ")"))); }
      if (v.tag === "StartDuration") { return "(StartDuration " + (dictShow1.show(v._1) + (" " + (dictShow.show(v._2) + ")"))); }
      if (v.tag === "DurationOnly") { return "(DurationOnly " + (dictShow.show(v._1) + ")"); }
      $runtime.fail();
    }
  }
);
const showRecurringInterval = dictShow => dictShow1 => {
  const show1 = showInterval(dictShow)(dictShow1).show;
  return {show: v => "(RecurringInterval " + (show(v._1) + (" " + (show1(v._2) + ")")))};
};
const over = dictFunctor => f => v => dictFunctor.map(RecurringInterval(v._1))(f(v._2));
const foldableInterval = {
  foldl: v => v1 => v2 => {
    if (v2.tag === "StartEnd") { return v(v(v1)(v2._1))(v2._2); }
    if (v2.tag === "DurationEnd") { return v(v1)(v2._2); }
    if (v2.tag === "StartDuration") { return v(v1)(v2._1); }
    return v1;
  },
  foldr: x => Data$dFoldable.foldrDefault(foldableInterval)(x),
  foldMap: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => foldableInterval.foldl(acc => x => append(acc)(f(x)))(dictMonoid.mempty);
  }
};
const foldableRecurringInterval = {
  foldl: f => i => x => {
    if (x._2.tag === "StartEnd") { return f(f(i)(x._2._1))(x._2._2); }
    if (x._2.tag === "DurationEnd") { return f(i)(x._2._2); }
    if (x._2.tag === "StartDuration") { return f(i)(x._2._1); }
    return i;
  },
  foldr: f => i => {
    const $2 = Data$dFoldable.foldrDefault(foldableInterval)(f)(i);
    return x => $2(x._2);
  },
  foldMap: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => foldableRecurringInterval.foldl(acc => x => append(acc)(f(x)))(dictMonoid.mempty);
  }
};
const eqInterval = dictEq => dictEq1 => (
  {
    eq: x => y => {
      if (x.tag === "StartEnd") {
        if (y.tag === "StartEnd") { return dictEq1.eq(x._1)(y._1) && dictEq1.eq(x._2)(y._2); }
        return false;
      }
      if (x.tag === "DurationEnd") {
        if (y.tag === "DurationEnd") { return dictEq.eq(x._1)(y._1) && dictEq1.eq(x._2)(y._2); }
        return false;
      }
      if (x.tag === "StartDuration") {
        if (y.tag === "StartDuration") { return dictEq1.eq(x._1)(y._1) && dictEq.eq(x._2)(y._2); }
        return false;
      }
      if (x.tag === "DurationOnly") {
        if (y.tag === "DurationOnly") { return dictEq.eq(x._1)(y._1); }
        return false;
      }
      return false;
    }
  }
);
const eqRecurringInterval = dictEq => dictEq1 => {
  const eq1 = eqInterval(dictEq)(dictEq1).eq;
  return {
    eq: x => y => (() => {
      if (x._1.tag === "Nothing") { return y._1.tag === "Nothing"; }
      if (x._1.tag === "Just") {
        if (y._1.tag === "Just") { return x._1._1 === y._1._1; }
        return false;
      }
      return false;
    })() && eq1(x._2)(y._2)
  };
};
const ordInterval = dictOrd => {
  const eqInterval1 = eqInterval(dictOrd.Eq0());
  return dictOrd1 => {
    const eqInterval2 = eqInterval1(dictOrd1.Eq0());
    return {
      compare: x => y => {
        if (x.tag === "StartEnd") {
          if (y.tag === "StartEnd") {
            const v = dictOrd1.compare(x._1)(y._1);
            if (v.tag === "LT") { return Data$dOrdering.LT; }
            if (v.tag === "GT") { return Data$dOrdering.GT; }
            return dictOrd1.compare(x._2)(y._2);
          }
          return Data$dOrdering.LT;
        }
        if (y.tag === "StartEnd") { return Data$dOrdering.GT; }
        if (x.tag === "DurationEnd") {
          if (y.tag === "DurationEnd") {
            const v = dictOrd.compare(x._1)(y._1);
            if (v.tag === "LT") { return Data$dOrdering.LT; }
            if (v.tag === "GT") { return Data$dOrdering.GT; }
            return dictOrd1.compare(x._2)(y._2);
          }
          return Data$dOrdering.LT;
        }
        if (y.tag === "DurationEnd") { return Data$dOrdering.GT; }
        if (x.tag === "StartDuration") {
          if (y.tag === "StartDuration") {
            const v = dictOrd1.compare(x._1)(y._1);
            if (v.tag === "LT") { return Data$dOrdering.LT; }
            if (v.tag === "GT") { return Data$dOrdering.GT; }
            return dictOrd.compare(x._2)(y._2);
          }
          return Data$dOrdering.LT;
        }
        if (y.tag === "StartDuration") { return Data$dOrdering.GT; }
        if (x.tag === "DurationOnly") {
          if (y.tag === "DurationOnly") { return dictOrd.compare(x._1)(y._1); }
          $runtime.fail();
        }
        $runtime.fail();
      },
      Eq0: () => eqInterval2
    };
  };
};
const ordRecurringInterval = dictOrd => {
  const ordInterval1 = ordInterval(dictOrd);
  const eqRecurringInterval1 = eqRecurringInterval(dictOrd.Eq0());
  return dictOrd1 => {
    const compare1 = ordInterval1(dictOrd1).compare;
    const eqRecurringInterval2 = eqRecurringInterval1(dictOrd1.Eq0());
    return {
      compare: x => y => {
        const v = compare(x._1)(y._1);
        if (v.tag === "LT") { return Data$dOrdering.LT; }
        if (v.tag === "GT") { return Data$dOrdering.GT; }
        return compare1(x._2)(y._2);
      },
      Eq0: () => eqRecurringInterval2
    };
  };
};
const bifunctorInterval = {
  bimap: v => v1 => v2 => {
    if (v2.tag === "StartEnd") { return $Interval("StartEnd", v1(v2._1), v1(v2._2)); }
    if (v2.tag === "DurationEnd") { return $Interval("DurationEnd", v(v2._1), v1(v2._2)); }
    if (v2.tag === "StartDuration") { return $Interval("StartDuration", v1(v2._1), v(v2._2)); }
    if (v2.tag === "DurationOnly") { return $Interval("DurationOnly", v(v2._1)); }
    $runtime.fail();
  }
};
const bifunctorRecurringInterval = {bimap: f => g => v => $RecurringInterval(v._1, bifunctorInterval.bimap(f)(g)(v._2))};
const functorInterval = /* #__PURE__ */ (() => ({map: bifunctorInterval.bimap(x => x)}))();
const extendInterval = {
  extend: v => v1 => {
    if (v1.tag === "StartEnd") { return $Interval("StartEnd", v(v1), v(v1)); }
    if (v1.tag === "DurationEnd") { return $Interval("DurationEnd", v1._1, v(v1)); }
    if (v1.tag === "StartDuration") { return $Interval("StartDuration", v(v1), v1._2); }
    if (v1.tag === "DurationOnly") { return $Interval("DurationOnly", v1._1); }
    $runtime.fail();
  },
  Functor0: () => functorInterval
};
const functorRecurringInterval = {map: f => v => $RecurringInterval(v._1, bifunctorInterval.bimap(x => x)(f)(v._2))};
const extendRecurringInterval = {
  extend: f => v => $RecurringInterval(
    v._1,
    extendInterval.extend((() => {
      const $2 = f(v);
      return v$1 => $2;
    })())(v._2)
  ),
  Functor0: () => functorRecurringInterval
};
const traversableInterval = {
  traverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const Functor0 = Apply0.Functor0();
    return v => v1 => {
      if (v1.tag === "StartEnd") { return Apply0.apply(Functor0.map(StartEnd)(v(v1._1)))(v(v1._2)); }
      if (v1.tag === "DurationEnd") { return Functor0.map(DurationEnd(v1._1))(v(v1._2)); }
      if (v1.tag === "StartDuration") { return Functor0.map(v2 => $Interval("StartDuration", v2, v1._2))(v(v1._1)); }
      if (v1.tag === "DurationOnly") { return dictApplicative.pure($Interval("DurationOnly", v1._1)); }
      $runtime.fail();
    };
  },
  sequence: dictApplicative => traversableInterval.traverse(dictApplicative)(Data$dTraversable.identity),
  Functor0: () => functorInterval,
  Foldable1: () => foldableInterval
};
const traversableRecurringInterval = {
  traverse: dictApplicative => {
    const over1 = over(dictApplicative.Apply0().Functor0());
    const traverse1 = traversableInterval.traverse(dictApplicative);
    return f => i => over1(traverse1(f))(i);
  },
  sequence: dictApplicative => traversableRecurringInterval.traverse(dictApplicative)(Data$dTraversable.identity),
  Functor0: () => functorRecurringInterval,
  Foldable1: () => foldableRecurringInterval
};
const bifoldableInterval = {
  bifoldl: v => v1 => v2 => v3 => {
    if (v3.tag === "StartEnd") { return v1(v1(v2)(v3._1))(v3._2); }
    if (v3.tag === "DurationEnd") { return v1(v(v2)(v3._1))(v3._2); }
    if (v3.tag === "StartDuration") { return v1(v(v2)(v3._2))(v3._1); }
    if (v3.tag === "DurationOnly") { return v(v2)(v3._1); }
    $runtime.fail();
  },
  bifoldr: x => Data$dBifoldable.bifoldrDefault(bifoldableInterval)(x),
  bifoldMap: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => g => bifoldableInterval.bifoldl(m => a => append(m)(f(a)))(m => b => append(m)(g(b)))(dictMonoid.mempty);
  }
};
const bifoldableRecurringInterval = {
  bifoldl: f => g => i => x => {
    if (x._2.tag === "StartEnd") { return g(g(i)(x._2._1))(x._2._2); }
    if (x._2.tag === "DurationEnd") { return g(f(i)(x._2._1))(x._2._2); }
    if (x._2.tag === "StartDuration") { return g(f(i)(x._2._2))(x._2._1); }
    if (x._2.tag === "DurationOnly") { return f(i)(x._2._1); }
    $runtime.fail();
  },
  bifoldr: f => g => i => {
    const $3 = Data$dBifoldable.bifoldrDefault(bifoldableInterval)(f)(g)(i);
    return x => $3(x._2);
  },
  bifoldMap: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => g => bifoldableRecurringInterval.bifoldl(m => a => append(m)(f(a)))(m => b => append(m)(g(b)))(dictMonoid.mempty);
  }
};
const bitraversableInterval = {
  bitraverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map1 = Apply0.Functor0().map;
    return v => v1 => v2 => {
      if (v2.tag === "StartEnd") { return Apply0.apply(map1(StartEnd)(v1(v2._1)))(v1(v2._2)); }
      if (v2.tag === "DurationEnd") { return Apply0.apply(map1(DurationEnd)(v(v2._1)))(v1(v2._2)); }
      if (v2.tag === "StartDuration") { return Apply0.apply(map1(StartDuration)(v1(v2._1)))(v(v2._2)); }
      if (v2.tag === "DurationOnly") { return map1(DurationOnly)(v(v2._1)); }
      $runtime.fail();
    };
  },
  bisequence: dictApplicative => bitraversableInterval.bitraverse(dictApplicative)(Data$dBitraversable.identity)(Data$dBitraversable.identity),
  Bifunctor0: () => bifunctorInterval,
  Bifoldable1: () => bifoldableInterval
};
const bitraversableRecurringInterval = {
  bitraverse: dictApplicative => {
    const over1 = over(dictApplicative.Apply0().Functor0());
    const bitraverse1 = bitraversableInterval.bitraverse(dictApplicative);
    return l => r => i => over1(bitraverse1(l)(r))(i);
  },
  bisequence: dictApplicative => bitraversableRecurringInterval.bitraverse(dictApplicative)(Data$dBitraversable.identity)(Data$dBitraversable.identity),
  Bifunctor0: () => bifunctorRecurringInterval,
  Bifoldable1: () => bifoldableRecurringInterval
};
export {
  $Interval,
  $RecurringInterval,
  DurationEnd,
  DurationOnly,
  RecurringInterval,
  StartDuration,
  StartEnd,
  bifoldableInterval,
  bifoldableRecurringInterval,
  bifunctorInterval,
  bifunctorRecurringInterval,
  bitraversableInterval,
  bitraversableRecurringInterval,
  compare,
  eqInterval,
  eqRecurringInterval,
  extendInterval,
  extendRecurringInterval,
  foldableInterval,
  foldableRecurringInterval,
  functorInterval,
  functorRecurringInterval,
  ordInterval,
  ordRecurringInterval,
  over,
  show,
  showInterval,
  showRecurringInterval,
  traversableInterval,
  traversableRecurringInterval
};
