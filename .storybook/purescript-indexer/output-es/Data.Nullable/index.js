// | This module defines types and functions for working with nullable types
// | using the FFI.
import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import {notNull, null as $$null, nullable} from "./foreign.js";
const toNullable = v2 => {
  if (v2.tag === "Nothing") { return $$null; }
  if (v2.tag === "Just") { return notNull(v2._1); }
  $runtime.fail();
};
const toMaybe = n => nullable(n, Data$dMaybe.Nothing, Data$dMaybe.Just);
const showNullable = dictShow => (
  {
    show: x => {
      const $2 = nullable(x, Data$dMaybe.Nothing, Data$dMaybe.Just);
      if ($2.tag === "Nothing") { return "null"; }
      if ($2.tag === "Just") { return dictShow.show($2._1); }
      $runtime.fail();
    }
  }
);
const eqNullable = dictEq => (
  {
    eq: x => y => {
      const $3 = nullable(x, Data$dMaybe.Nothing, Data$dMaybe.Just);
      const $4 = nullable(y, Data$dMaybe.Nothing, Data$dMaybe.Just);
      if ($3.tag === "Nothing") { return $4.tag === "Nothing"; }
      if ($3.tag === "Just") {
        if ($4.tag === "Just") { return dictEq.eq($3._1)($4._1); }
        return false;
      }
      return false;
    }
  }
);
const ordNullable = dictOrd => {
  const eqNullable1 = eqNullable(dictOrd.Eq0());
  return {
    compare: (() => {
      const $2 = Data$dMaybe.ordMaybe(dictOrd).compare;
      return x => y => $2(nullable(x, Data$dMaybe.Nothing, Data$dMaybe.Just))(nullable(y, Data$dMaybe.Nothing, Data$dMaybe.Just));
    })(),
    Eq0: () => eqNullable1
  };
};
const eq1Nullable = {eq1: dictEq => eqNullable(dictEq).eq};
const ord1Nullable = {compare1: dictOrd => ordNullable(dictOrd).compare, Eq10: () => eq1Nullable};
export {eq1Nullable, eqNullable, ord1Nullable, ordNullable, showNullable, toMaybe, toNullable};
export * from "./foreign.js";
