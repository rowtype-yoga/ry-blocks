// | This module provides the `Effect` type, which is used to represent
// | _native_ effects. The `Effect` type provides a typed API for effectful
// | computations, while at the same time generating efficient JavaScript.
import * as $runtime from "../runtime.js";
import {bindE, forE, foreachE, pureE, untilE, whileE} from "./foreign.js";
const monadEffect = {Applicative0: () => applicativeEffect, Bind1: () => bindEffect};
const bindEffect = {bind: bindE, Apply0: () => applyEffect};
const applyEffect = {
  apply: f => a => () => {
    const f$p = f();
    const a$p = a();
    return applicativeEffect.pure(f$p(a$p))();
  },
  Functor0: () => functorEffect
};
const applicativeEffect = {pure: pureE, Apply0: () => applyEffect};
const functorEffect = {
  map: f => a => () => {
    const a$p = a();
    return f(a$p);
  }
};
const semigroupEffect = dictSemigroup => (
  {
    append: a => b => () => {
      const a$p = a();
      const a$p$1 = b();
      return dictSemigroup.append(a$p)(a$p$1);
    }
  }
);
const monoidEffect = dictMonoid => {
  const $1 = dictMonoid.Semigroup0();
  const semigroupEffect1 = {
    append: a => b => () => {
      const a$p = a();
      const a$p$1 = b();
      return $1.append(a$p)(a$p$1);
    }
  };
  return {mempty: () => dictMonoid.mempty, Semigroup0: () => semigroupEffect1};
};
export {applicativeEffect, applyEffect, bindEffect, functorEffect, monadEffect, monoidEffect, semigroupEffect};
export * from "./foreign.js";
