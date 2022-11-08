import * as $runtime from "../runtime.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {bind_, for as $$for, foreach, map_, modifyImpl, new as $$new, pure_, read, run, while as $$while, write} from "./foreign.js";
const modify$p = modifyImpl;
const modify = f => modifyImpl(s => {
  const s$p = f(s);
  return {state: s$p, value: s$p};
});
const functorST = {map: map_};
const monadST = {Applicative0: () => applicativeST, Bind1: () => bindST};
const bindST = {bind: bind_, Apply0: () => applyST};
const applyST = {
  apply: f => a => () => {
    const f$p = f();
    const a$p = a();
    return applicativeST.pure(f$p(a$p))();
  },
  Functor0: () => functorST
};
const applicativeST = {pure: pure_, Apply0: () => applyST};
const semigroupST = dictSemigroup => (
  {
    append: a => b => () => {
      const $3 = a();
      const a$p = b();
      return dictSemigroup.append($3)(a$p);
    }
  }
);
const monadRecST = {
  tailRecM: f => a => {
    const $2 = bind_(f(a))($$new);
    return () => {
      const r = $2();
      $$while(() => {
        const $4 = r.value;
        return $4.tag === "Loop";
      })(() => {
        const v = r.value;
        if (v.tag === "Loop") {
          const e = f(v._1)();
          r.value = e;
          return Data$dUnit.unit;
        }
        if (v.tag === "Done") { return Data$dUnit.unit; }
        $runtime.fail();
      })();
      const $5 = r.value;
      return (() => {
        if ($5.tag === "Done") { return $5._1; }
        $runtime.fail();
      })();
    };
  },
  Monad0: () => monadST
};
const monoidST = dictMonoid => {
  const $1 = dictMonoid.Semigroup0();
  const semigroupST1 = {
    append: a => b => () => {
      const $4 = a();
      const a$p = b();
      return $1.append($4)(a$p);
    }
  };
  return {mempty: () => dictMonoid.mempty, Semigroup0: () => semigroupST1};
};
export {applicativeST, applyST, bindST, functorST, modify, modify$p, monadRecST, monadST, monoidST, semigroupST};
export * from "./foreign.js";
