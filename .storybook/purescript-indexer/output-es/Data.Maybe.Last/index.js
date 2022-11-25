import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
const Last = x => x;
const showLast = dictShow => (
  {
    show: v => {
      if (v.tag === "Just") { return "(Last (Just " + dictShow.show(v._1) + "))"; }
      if (v.tag === "Nothing") { return "(Last Nothing)"; }
      $runtime.fail();
    }
  }
);
const semigroupLast = {
  append: v => v1 => {
    if (v1.tag === "Just") { return v1; }
    if (v1.tag === "Nothing") { return v; }
    $runtime.fail();
  }
};
const ordLast = dictOrd => Data$dMaybe.ordMaybe(dictOrd);
const ord1Last = Data$dMaybe.ord1Maybe;
const newtypeLast = {Coercible0: () => undefined};
const monoidLast = {mempty: Data$dMaybe.Nothing, Semigroup0: () => semigroupLast};
const monadLast = Data$dMaybe.monadMaybe;
const invariantLast = Data$dMaybe.invariantMaybe;
const functorLast = Data$dMaybe.functorMaybe;
const extendLast = Data$dMaybe.extendMaybe;
const eqLast = dictEq => (
  {
    eq: x => y => {
      if (x.tag === "Nothing") { return y.tag === "Nothing"; }
      if (x.tag === "Just") {
        if (y.tag === "Just") { return dictEq.eq(x._1)(y._1); }
        return false;
      }
      return false;
    }
  }
);
const eq1Last = Data$dMaybe.eq1Maybe;
const boundedLast = dictBounded => Data$dMaybe.boundedMaybe(dictBounded);
const bindLast = Data$dMaybe.bindMaybe;
const applyLast = Data$dMaybe.applyMaybe;
const applicativeLast = Data$dMaybe.applicativeMaybe;
const altLast = /* #__PURE__ */ (() => ({alt: semigroupLast.append, Functor0: () => Data$dMaybe.functorMaybe}))();
const plusLast = {empty: Data$dMaybe.Nothing, Alt0: () => altLast};
const alternativeLast = {Applicative0: () => Data$dMaybe.applicativeMaybe, Plus1: () => plusLast};
export {
  Last,
  altLast,
  alternativeLast,
  applicativeLast,
  applyLast,
  bindLast,
  boundedLast,
  eq1Last,
  eqLast,
  extendLast,
  functorLast,
  invariantLast,
  monadLast,
  monoidLast,
  newtypeLast,
  ord1Last,
  ordLast,
  plusLast,
  semigroupLast,
  showLast
};
