import * as $runtime from "../runtime.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
const Down = x => x;
const showDown = dictShow => ({show: v => "(Down " + (dictShow.show(v) + ")")});
const newtypeDown = {Coercible0: () => undefined};
const eqDown = dictEq => dictEq;
const ordDown = dictOrd => {
  const eqDown1 = dictOrd.Eq0();
  return {
    compare: v => v1 => {
      const $4 = dictOrd.compare(v)(v1);
      if ($4.tag === "GT") { return Data$dOrdering.LT; }
      if ($4.tag === "EQ") { return Data$dOrdering.EQ; }
      if ($4.tag === "LT") { return Data$dOrdering.GT; }
      $runtime.fail();
    },
    Eq0: () => eqDown1
  };
};
const boundedDown = dictBounded => {
  const ordDown1 = ordDown(dictBounded.Ord0());
  return {top: dictBounded.bottom, bottom: dictBounded.top, Ord0: () => ordDown1};
};
export {Down, boundedDown, eqDown, newtypeDown, ordDown, showDown};
