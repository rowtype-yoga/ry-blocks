import * as $runtime from "../runtime.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const $Either = (tag, _1) => ({tag, _1});
const Left = value0 => $Either("Left", value0);
const Right = value0 => $Either("Right", value0);
const showEither = dictShow => dictShow1 => (
  {
    show: v => {
      if (v.tag === "Left") { return "(Left " + (dictShow.show(v._1) + ")"); }
      if (v.tag === "Right") { return "(Right " + (dictShow1.show(v._1) + ")"); }
      $runtime.fail();
    }
  }
);
const note$p = f => v2 => {
  if (v2.tag === "Nothing") { return $Either("Left", f(Data$dUnit.unit)); }
  if (v2.tag === "Just") { return $Either("Right", v2._1); }
  $runtime.fail();
};
const note = a => v2 => {
  if (v2.tag === "Nothing") { return $Either("Left", a); }
  if (v2.tag === "Just") { return $Either("Right", v2._1); }
  $runtime.fail();
};
const genericEither = {
  to: x => {
    if (x.tag === "Inl") { return $Either("Left", x._1); }
    if (x.tag === "Inr") { return $Either("Right", x._1); }
    $runtime.fail();
  },
  from: x => {
    if (x.tag === "Left") { return Data$dGeneric$dRep.$Sum("Inl", x._1); }
    if (x.tag === "Right") { return Data$dGeneric$dRep.$Sum("Inr", x._1); }
    $runtime.fail();
  }
};
const functorEither = {
  map: f => m => {
    if (m.tag === "Left") { return $Either("Left", m._1); }
    if (m.tag === "Right") { return $Either("Right", f(m._1)); }
    $runtime.fail();
  }
};
const invariantEither = {imap: f => v => functorEither.map(f)};
const fromRight$p = v => v1 => {
  if (v1.tag === "Right") { return v1._1; }
  return v(Data$dUnit.unit);
};
const fromRight = v => v1 => {
  if (v1.tag === "Right") { return v1._1; }
  return v;
};
const fromLeft$p = v => v1 => {
  if (v1.tag === "Left") { return v1._1; }
  return v(Data$dUnit.unit);
};
const fromLeft = v => v1 => {
  if (v1.tag === "Left") { return v1._1; }
  return v;
};
const extendEither = {
  extend: v => v1 => {
    if (v1.tag === "Left") { return $Either("Left", v1._1); }
    return $Either("Right", v(v1));
  },
  Functor0: () => functorEither
};
const eqEither = dictEq => dictEq1 => (
  {
    eq: x => y => {
      if (x.tag === "Left") {
        if (y.tag === "Left") { return dictEq.eq(x._1)(y._1); }
        return false;
      }
      if (x.tag === "Right") {
        if (y.tag === "Right") { return dictEq1.eq(x._1)(y._1); }
        return false;
      }
      return false;
    }
  }
);
const ordEither = dictOrd => {
  const $1 = dictOrd.Eq0();
  return dictOrd1 => {
    const $3 = dictOrd1.Eq0();
    const eqEither2 = {
      eq: x => y => {
        if (x.tag === "Left") {
          if (y.tag === "Left") { return $1.eq(x._1)(y._1); }
          return false;
        }
        if (x.tag === "Right") {
          if (y.tag === "Right") { return $3.eq(x._1)(y._1); }
          return false;
        }
        return false;
      }
    };
    return {
      compare: x => y => {
        if (x.tag === "Left") {
          if (y.tag === "Left") { return dictOrd.compare(x._1)(y._1); }
          return Data$dOrdering.LT;
        }
        if (y.tag === "Left") { return Data$dOrdering.GT; }
        if (x.tag === "Right") {
          if (y.tag === "Right") { return dictOrd1.compare(x._1)(y._1); }
          $runtime.fail();
        }
        $runtime.fail();
      },
      Eq0: () => eqEither2
    };
  };
};
const eq1Either = dictEq => (
  {
    eq1: dictEq1 => x => y => {
      if (x.tag === "Left") {
        if (y.tag === "Left") { return dictEq.eq(x._1)(y._1); }
        return false;
      }
      if (x.tag === "Right") {
        if (y.tag === "Right") { return dictEq1.eq(x._1)(y._1); }
        return false;
      }
      return false;
    }
  }
);
const ord1Either = dictOrd => {
  const ordEither1 = ordEither(dictOrd);
  const $2 = dictOrd.Eq0();
  const eq1Either1 = {
    eq1: dictEq1 => x => y => {
      if (x.tag === "Left") {
        if (y.tag === "Left") { return $2.eq(x._1)(y._1); }
        return false;
      }
      if (x.tag === "Right") {
        if (y.tag === "Right") { return dictEq1.eq(x._1)(y._1); }
        return false;
      }
      return false;
    }
  };
  return {compare1: dictOrd1 => ordEither1(dictOrd1).compare, Eq10: () => eq1Either1};
};
const either = v => v1 => v2 => {
  if (v2.tag === "Left") { return v(v2._1); }
  if (v2.tag === "Right") { return v1(v2._1); }
  $runtime.fail();
};
const hush = v2 => {
  if (v2.tag === "Left") { return Data$dMaybe.Nothing; }
  if (v2.tag === "Right") { return Data$dMaybe.$Maybe("Just", v2._1); }
  $runtime.fail();
};
const isLeft = v2 => {
  if (v2.tag === "Left") { return true; }
  if (v2.tag === "Right") { return false; }
  $runtime.fail();
};
const isRight = v2 => {
  if (v2.tag === "Left") { return false; }
  if (v2.tag === "Right") { return true; }
  $runtime.fail();
};
const choose = dictAlt => {
  const map1 = dictAlt.Functor0().map;
  return a => b => dictAlt.alt(map1(Left)(a))(map1(Right)(b));
};
const boundedEither = dictBounded => {
  const ordEither1 = ordEither(dictBounded.Ord0());
  return dictBounded1 => {
    const ordEither2 = ordEither1(dictBounded1.Ord0());
    return {top: $Either("Right", dictBounded1.top), bottom: $Either("Left", dictBounded.bottom), Ord0: () => ordEither2};
  };
};
const blush = v2 => {
  if (v2.tag === "Left") { return Data$dMaybe.$Maybe("Just", v2._1); }
  if (v2.tag === "Right") { return Data$dMaybe.Nothing; }
  $runtime.fail();
};
const applyEither = {
  apply: v => v1 => {
    if (v.tag === "Left") { return $Either("Left", v._1); }
    if (v.tag === "Right") {
      if (v1.tag === "Left") { return $Either("Left", v1._1); }
      if (v1.tag === "Right") { return $Either("Right", v._1(v1._1)); }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Functor0: () => functorEither
};
const bindEither = {
  bind: v2 => {
    if (v2.tag === "Left") { return v => $Either("Left", v2._1); }
    if (v2.tag === "Right") { return f => f(v2._1); }
    $runtime.fail();
  },
  Apply0: () => applyEither
};
const semigroupEither = dictSemigroup => (
  {
    append: x => y => applyEither.apply((() => {
      if (x.tag === "Left") { return $Either("Left", x._1); }
      if (x.tag === "Right") { return $Either("Right", dictSemigroup.append(x._1)); }
      $runtime.fail();
    })())(y)
  }
);
const applicativeEither = {pure: Right, Apply0: () => applyEither};
const monadEither = {Applicative0: () => applicativeEither, Bind1: () => bindEither};
const altEither = {
  alt: v => v1 => {
    if (v.tag === "Left") { return v1; }
    return v;
  },
  Functor0: () => functorEither
};
export {
  $Either,
  Left,
  Right,
  altEither,
  applicativeEither,
  applyEither,
  bindEither,
  blush,
  boundedEither,
  choose,
  either,
  eq1Either,
  eqEither,
  extendEither,
  fromLeft,
  fromLeft$p,
  fromRight,
  fromRight$p,
  functorEither,
  genericEither,
  hush,
  invariantEither,
  isLeft,
  isRight,
  monadEither,
  note,
  note$p,
  ord1Either,
  ordEither,
  semigroupEither,
  showEither
};
