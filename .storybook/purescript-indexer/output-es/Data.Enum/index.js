import * as $runtime from "../runtime.js";
import * as Control$dAlternative from "../Control.Alternative/index.js";
import * as Data$dBounded from "../Data.Bounded/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable1 from "../Data.Unfoldable1/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {fromCharCode, toCharCode} from "./foreign.js";
const guard = /* #__PURE__ */ Control$dAlternative.guard(Data$dMaybe.alternativeMaybe);
const Cardinality = x => x;
const toEnum = dict => dict.toEnum;
const succ = dict => dict.succ;
const upFromIncluding = dictEnum => dictUnfoldable1 => dictUnfoldable1.unfoldr1(x => Data$dTuple.$Tuple(x, dictEnum.succ(x)));
const showCardinality = {show: v => "(Cardinality " + (Data$dShow.showIntImpl(v) + ")")};
const pred = dict => dict.pred;
const ordCardinality = Data$dOrd.ordInt;
const newtypeCardinality = {Coercible0: () => undefined};
const fromEnum = dict => dict.fromEnum;
const toEnumWithDefaults = dictBoundedEnum => {
  const bottom2 = dictBoundedEnum.Bounded0().bottom;
  return low => high => x => {
    const v = dictBoundedEnum.toEnum(x);
    if (v.tag === "Just") { return v._1; }
    if (v.tag === "Nothing") {
      if (x < dictBoundedEnum.fromEnum(bottom2)) { return low; }
      return high;
    }
    $runtime.fail();
  };
};
const eqCardinality = Data$dEq.eqInt;
const enumUnit = {succ: v => Data$dMaybe.Nothing, pred: v => Data$dMaybe.Nothing, Ord0: () => Data$dOrd.ordUnit};
const enumTuple = dictEnum => {
  const ordTuple = Data$dTuple.ordTuple(dictEnum.Ord0());
  return dictBoundedEnum => {
    const Bounded0 = dictBoundedEnum.Bounded0();
    const Enum1 = dictBoundedEnum.Enum1();
    const ordTuple1 = ordTuple(Enum1.Ord0());
    return {
      succ: v => {
        const $7 = dictEnum.succ(v._1);
        const $8 = (() => {
          if ($7.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple($7._1, Bounded0.bottom)); }
          return Data$dMaybe.Nothing;
        })();
        const $9 = Data$dTuple.Tuple(v._1);
        const $10 = Enum1.succ(v._2);
        if ($10.tag === "Nothing") { return $8; }
        if ($10.tag === "Just") { return Data$dMaybe.$Maybe("Just", $9($10._1)); }
        $runtime.fail();
      },
      pred: v => {
        const $7 = dictEnum.pred(v._1);
        const $8 = (() => {
          if ($7.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple($7._1, Bounded0.top)); }
          return Data$dMaybe.Nothing;
        })();
        const $9 = Data$dTuple.Tuple(v._1);
        const $10 = Enum1.pred(v._2);
        if ($10.tag === "Nothing") { return $8; }
        if ($10.tag === "Just") { return Data$dMaybe.$Maybe("Just", $9($10._1)); }
        $runtime.fail();
      },
      Ord0: () => ordTuple1
    };
  };
};
const enumOrdering = {
  succ: v => {
    if (v.tag === "LT") { return Data$dMaybe.$Maybe("Just", Data$dOrdering.EQ); }
    if (v.tag === "EQ") { return Data$dMaybe.$Maybe("Just", Data$dOrdering.GT); }
    if (v.tag === "GT") { return Data$dMaybe.Nothing; }
    $runtime.fail();
  },
  pred: v => {
    if (v.tag === "LT") { return Data$dMaybe.Nothing; }
    if (v.tag === "EQ") { return Data$dMaybe.$Maybe("Just", Data$dOrdering.LT); }
    if (v.tag === "GT") { return Data$dMaybe.$Maybe("Just", Data$dOrdering.EQ); }
    $runtime.fail();
  },
  Ord0: () => Data$dOrd.ordOrdering
};
const enumMaybe = dictBoundedEnum => {
  const bottom2 = dictBoundedEnum.Bounded0().bottom;
  const Enum1 = dictBoundedEnum.Enum1();
  const ordMaybe = Data$dMaybe.ordMaybe(Enum1.Ord0());
  return {
    succ: v => {
      if (v.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", Data$dMaybe.$Maybe("Just", bottom2)); }
      if (v.tag === "Just") {
        const $5 = Enum1.succ(v._1);
        if ($5.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dMaybe.$Maybe("Just", $5._1)); }
        return Data$dMaybe.Nothing;
      }
      $runtime.fail();
    },
    pred: v => {
      if (v.tag === "Nothing") { return Data$dMaybe.Nothing; }
      if (v.tag === "Just") { return Data$dMaybe.$Maybe("Just", Enum1.pred(v._1)); }
      $runtime.fail();
    },
    Ord0: () => ordMaybe
  };
};
const enumInt = {
  succ: n => {
    if (n < 2147483647) { return Data$dMaybe.$Maybe("Just", n + 1 | 0); }
    return Data$dMaybe.Nothing;
  },
  pred: n => {
    if (n > -2147483648) { return Data$dMaybe.$Maybe("Just", n - 1 | 0); }
    return Data$dMaybe.Nothing;
  },
  Ord0: () => Data$dOrd.ordInt
};
const enumFromTo = dictEnum => {
  const Ord0 = dictEnum.Ord0();
  const eq1 = Ord0.Eq0().eq;
  return dictUnfoldable1 => v => v1 => {
    if (eq1(v)(v1)) { return Data$dUnfoldable1.replicate1(dictUnfoldable1)(1)(v); }
    if (Ord0.compare(v)(v1).tag === "LT") {
      return dictUnfoldable1.unfoldr1(a => Data$dTuple.$Tuple(
        a,
        (() => {
          const $7 = dictEnum.succ(a);
          if ($7.tag === "Just") {
            if (guard(!(Ord0.compare($7._1)(v1).tag === "GT")).tag === "Just") { return Data$dMaybe.$Maybe("Just", $7._1); }
            return Data$dMaybe.Nothing;
          }
          if ($7.tag === "Nothing") { return Data$dMaybe.Nothing; }
          $runtime.fail();
        })()
      ))(v);
    }
    return dictUnfoldable1.unfoldr1(a => Data$dTuple.$Tuple(
      a,
      (() => {
        const $7 = dictEnum.pred(a);
        if ($7.tag === "Just") {
          if (guard(!(Ord0.compare($7._1)(v1).tag === "LT")).tag === "Just") { return Data$dMaybe.$Maybe("Just", $7._1); }
          return Data$dMaybe.Nothing;
        }
        if ($7.tag === "Nothing") { return Data$dMaybe.Nothing; }
        $runtime.fail();
      })()
    ))(v);
  };
};
const enumFromThenTo = dictUnfoldable => dictFunctor => dictBoundedEnum => a => b => c => {
  const a$p = dictBoundedEnum.fromEnum(a);
  return dictFunctor.map(x => {
    const $8 = dictBoundedEnum.toEnum(x);
    if ($8.tag === "Just") { return $8._1; }
    $runtime.fail();
  })(dictUnfoldable.unfoldr((() => {
    const $7 = dictBoundedEnum.fromEnum(b) - a$p | 0;
    const $8 = dictBoundedEnum.fromEnum(c);
    return e => {
      if (e <= $8) { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(e, e + $7 | 0)); }
      return Data$dMaybe.Nothing;
    };
  })())(a$p));
};
const enumEither = dictBoundedEnum => {
  const Enum1 = dictBoundedEnum.Enum1();
  const top2 = dictBoundedEnum.Bounded0().top;
  const ordEither = Data$dEither.ordEither(Enum1.Ord0());
  return dictBoundedEnum1 => {
    const bottom2 = dictBoundedEnum1.Bounded0().bottom;
    const Enum11 = dictBoundedEnum1.Enum1();
    const ordEither1 = ordEither(Enum11.Ord0());
    return {
      succ: v => {
        if (v.tag === "Left") {
          const $9 = Enum1.succ(v._1);
          if ($9.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", Data$dEither.$Either("Right", bottom2)); }
          if ($9.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dEither.$Either("Left", $9._1)); }
          $runtime.fail();
        }
        if (v.tag === "Right") {
          const $9 = Enum11.succ(v._1);
          if ($9.tag === "Nothing") { return Data$dMaybe.Nothing; }
          if ($9.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dEither.$Either("Right", $9._1)); }
          $runtime.fail();
        }
        $runtime.fail();
      },
      pred: v => {
        if (v.tag === "Left") {
          const $9 = Enum1.pred(v._1);
          if ($9.tag === "Nothing") { return Data$dMaybe.Nothing; }
          if ($9.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dEither.$Either("Left", $9._1)); }
          $runtime.fail();
        }
        if (v.tag === "Right") {
          const $9 = Enum11.pred(v._1);
          if ($9.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", Data$dEither.$Either("Left", top2)); }
          if ($9.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dEither.$Either("Right", $9._1)); }
          $runtime.fail();
        }
        $runtime.fail();
      },
      Ord0: () => ordEither1
    };
  };
};
const enumBoolean = {
  succ: v => {
    if (!v) { return Data$dMaybe.$Maybe("Just", true); }
    return Data$dMaybe.Nothing;
  },
  pred: v => {
    if (v) { return Data$dMaybe.$Maybe("Just", false); }
    return Data$dMaybe.Nothing;
  },
  Ord0: () => Data$dOrd.ordBoolean
};
const downFromIncluding = dictEnum => dictUnfoldable1 => dictUnfoldable1.unfoldr1(x => Data$dTuple.$Tuple(x, dictEnum.pred(x)));
const downFrom = dictEnum => dictUnfoldable => dictUnfoldable.unfoldr(x => {
  const $3 = dictEnum.pred(x);
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple($3._1, $3._1)); }
  return Data$dMaybe.Nothing;
});
const upFrom = dictEnum => dictUnfoldable => dictUnfoldable.unfoldr(x => {
  const $3 = dictEnum.succ(x);
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple($3._1, $3._1)); }
  return Data$dMaybe.Nothing;
});
const defaultToEnum = dictBounded => dictEnum => i$p => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const i = go$a0, x = go$a1;
      if (i === 0) {
        go$c = false;
        go$r = Data$dMaybe.$Maybe("Just", x);
        continue;
      }
      const v = dictEnum.succ(x);
      if (v.tag === "Just") {
        go$a0 = i - 1 | 0;
        go$a1 = v._1;
        continue;
      }
      if (v.tag === "Nothing") {
        go$c = false;
        go$r = Data$dMaybe.Nothing;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  if (i$p < 0) { return Data$dMaybe.Nothing; }
  return go(i$p)(dictBounded.bottom);
};
const defaultSucc = toEnum$p => fromEnum$p => a => toEnum$p(fromEnum$p(a) + 1 | 0);
const defaultPred = toEnum$p => fromEnum$p => a => toEnum$p(fromEnum$p(a) - 1 | 0);
const defaultFromEnum = dictEnum => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const i = go$a0, x = go$a1;
      const v = dictEnum.pred(x);
      if (v.tag === "Just") {
        go$a0 = i + 1 | 0;
        go$a1 = v._1;
        continue;
      }
      if (v.tag === "Nothing") {
        go$c = false;
        go$r = i;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(0);
};
const defaultCardinality = dictBounded => dictEnum => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const i = go$a0, x = go$a1;
      const v = dictEnum.succ(x);
      if (v.tag === "Just") {
        go$a0 = i + 1 | 0;
        go$a1 = v._1;
        continue;
      }
      if (v.tag === "Nothing") {
        go$c = false;
        go$r = i;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(1)(dictBounded.bottom);
};
const charToEnum = v => {
  if (v >= 0 && v <= 65535) { return Data$dMaybe.$Maybe("Just", fromCharCode(v)); }
  return Data$dMaybe.Nothing;
};
const enumChar = {
  succ: a => {
    const $1 = toCharCode(a) + 1 | 0;
    if ($1 >= 0 && $1 <= 65535) { return Data$dMaybe.$Maybe("Just", fromCharCode($1)); }
    return Data$dMaybe.Nothing;
  },
  pred: a => {
    const $1 = toCharCode(a) - 1 | 0;
    if ($1 >= 0 && $1 <= 65535) { return Data$dMaybe.$Maybe("Just", fromCharCode($1)); }
    return Data$dMaybe.Nothing;
  },
  Ord0: () => Data$dOrd.ordChar
};
const cardinality = dict => dict.cardinality;
const boundedEnumUnit = {
  cardinality: 1,
  toEnum: v => {
    if (v === 0) { return Data$dMaybe.$Maybe("Just", Data$dUnit.unit); }
    return Data$dMaybe.Nothing;
  },
  fromEnum: v => 0,
  Bounded0: () => Data$dBounded.boundedUnit,
  Enum1: () => enumUnit
};
const boundedEnumOrdering = {
  cardinality: 3,
  toEnum: v => {
    if (v === 0) { return Data$dMaybe.$Maybe("Just", Data$dOrdering.LT); }
    if (v === 1) { return Data$dMaybe.$Maybe("Just", Data$dOrdering.EQ); }
    if (v === 2) { return Data$dMaybe.$Maybe("Just", Data$dOrdering.GT); }
    return Data$dMaybe.Nothing;
  },
  fromEnum: v => {
    if (v.tag === "LT") { return 0; }
    if (v.tag === "EQ") { return 1; }
    if (v.tag === "GT") { return 2; }
    $runtime.fail();
  },
  Bounded0: () => Data$dBounded.boundedOrdering,
  Enum1: () => enumOrdering
};
const boundedEnumChar = {cardinality: 65535, toEnum: charToEnum, fromEnum: toCharCode, Bounded0: () => Data$dBounded.boundedChar, Enum1: () => enumChar};
const boundedEnumBoolean = {
  cardinality: 2,
  toEnum: v => {
    if (v === 0) { return Data$dMaybe.$Maybe("Just", false); }
    if (v === 1) { return Data$dMaybe.$Maybe("Just", true); }
    return Data$dMaybe.Nothing;
  },
  fromEnum: v => {
    if (!v) { return 0; }
    if (v) { return 1; }
    $runtime.fail();
  },
  Bounded0: () => Data$dBounded.boundedBoolean,
  Enum1: () => enumBoolean
};
export {
  Cardinality,
  boundedEnumBoolean,
  boundedEnumChar,
  boundedEnumOrdering,
  boundedEnumUnit,
  cardinality,
  charToEnum,
  defaultCardinality,
  defaultFromEnum,
  defaultPred,
  defaultSucc,
  defaultToEnum,
  downFrom,
  downFromIncluding,
  enumBoolean,
  enumChar,
  enumEither,
  enumFromThenTo,
  enumFromTo,
  enumInt,
  enumMaybe,
  enumOrdering,
  enumTuple,
  enumUnit,
  eqCardinality,
  fromEnum,
  guard,
  newtypeCardinality,
  ordCardinality,
  pred,
  showCardinality,
  succ,
  toEnum,
  toEnumWithDefaults,
  upFrom,
  upFromIncluding
};
export * from "./foreign.js";
