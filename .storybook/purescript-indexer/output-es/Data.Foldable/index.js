import * as $runtime from "../runtime.js";
import * as Control$dApply from "../Control.Apply/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMaybe$dFirst from "../Data.Maybe.First/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import {foldlArray, foldrArray} from "./foreign.js";
const identity = x => x;
const monoidEndo = /* #__PURE__ */ (() => {
  const semigroupEndo1 = {append: v => v1 => x => v(v1(x))};
  return {mempty: x => x, Semigroup0: () => semigroupEndo1};
})();
const monoidDual = /* #__PURE__ */ (() => {
  const $0 = monoidEndo.Semigroup0();
  const semigroupDual1 = {append: v => v1 => $0.append(v1)(v)};
  return {mempty: monoidEndo.mempty, Semigroup0: () => semigroupDual1};
})();
const foldr = dict => dict.foldr;
const indexr = dictFoldable => idx => {
  const $2 = dictFoldable.foldr(a => cursor => {
    if (cursor.elem.tag === "Just") { return cursor; }
    if (cursor.pos === idx) { return {elem: Data$dMaybe.$Maybe("Just", a), pos: cursor.pos}; }
    return {pos: cursor.pos + 1 | 0, elem: cursor.elem};
  })({elem: Data$dMaybe.Nothing, pos: 0});
  return x => $2(x).elem;
};
const $$null = dictFoldable => dictFoldable.foldr(v => v1 => false)(true);
const oneOf = dictFoldable => dictPlus => dictFoldable.foldr(dictPlus.Alt0().alt)(dictPlus.empty);
const oneOfMap = dictFoldable => dictPlus => {
  const alt = dictPlus.Alt0().alt;
  return f => dictFoldable.foldr(x => alt(f(x)))(dictPlus.empty);
};
const traverse_ = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const map = $1.Functor0().map;
  return dictFoldable => f => dictFoldable.foldr(x => {
    const $6 = f(x);
    return b => $1.apply(map(v => Control$dApply.identity)($6))(b);
  })(dictApplicative.pure(Data$dUnit.unit));
};
const for_ = dictApplicative => {
  const traverse_1 = traverse_(dictApplicative);
  return dictFoldable => {
    const $3 = traverse_1(dictFoldable);
    return b => a => $3(a)(b);
  };
};
const sequence_ = dictApplicative => {
  const traverse_1 = traverse_(dictApplicative);
  return dictFoldable => traverse_1(dictFoldable)(identity);
};
const foldl = dict => dict.foldl;
const indexl = dictFoldable => idx => {
  const $2 = dictFoldable.foldl(cursor => a => {
    if (cursor.elem.tag === "Just") { return cursor; }
    if (cursor.pos === idx) { return {elem: Data$dMaybe.$Maybe("Just", a), pos: cursor.pos}; }
    return {pos: cursor.pos + 1 | 0, elem: cursor.elem};
  })({elem: Data$dMaybe.Nothing, pos: 0});
  return x => $2(x).elem;
};
const intercalate = dictFoldable => dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return sep => xs => dictFoldable.foldl(v => v1 => {
    if (v.init) { return {init: false, acc: v1}; }
    return {init: false, acc: append(v.acc)(append(sep)(v1))};
  })({init: true, acc: dictMonoid.mempty})(xs).acc;
};
const length = dictFoldable => dictSemiring => dictFoldable.foldl(c => v => dictSemiring.add(dictSemiring.one)(c))(dictSemiring.zero);
const maximumBy = dictFoldable => cmp => dictFoldable.foldl(v => v1 => {
  if (v.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", v1); }
  if (v.tag === "Just") {
    return Data$dMaybe.$Maybe(
      "Just",
      (() => {
        if (cmp(v._1)(v1).tag === "GT") { return v._1; }
        return v1;
      })()
    );
  }
  $runtime.fail();
})(Data$dMaybe.Nothing);
const maximum = dictOrd => dictFoldable => maximumBy(dictFoldable)(dictOrd.compare);
const minimumBy = dictFoldable => cmp => dictFoldable.foldl(v => v1 => {
  if (v.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", v1); }
  if (v.tag === "Just") {
    return Data$dMaybe.$Maybe(
      "Just",
      (() => {
        if (cmp(v._1)(v1).tag === "LT") { return v._1; }
        return v1;
      })()
    );
  }
  $runtime.fail();
})(Data$dMaybe.Nothing);
const minimum = dictOrd => dictFoldable => minimumBy(dictFoldable)(dictOrd.compare);
const product = dictFoldable => dictSemiring => dictFoldable.foldl(dictSemiring.mul)(dictSemiring.one);
const sum = dictFoldable => dictSemiring => dictFoldable.foldl(dictSemiring.add)(dictSemiring.zero);
const foldableTuple = {foldr: f => z => v => f(v._2)(z), foldl: f => z => v => f(z)(v._2), foldMap: dictMonoid => f => v => f(v._2)};
const foldableMultiplicative = {foldr: f => z => v => f(v)(z), foldl: f => z => v => f(z)(v), foldMap: dictMonoid => f => v => f(v)};
const foldableMaybe = {
  foldr: v => v1 => v2 => {
    if (v2.tag === "Nothing") { return v1; }
    if (v2.tag === "Just") { return v(v2._1)(v1); }
    $runtime.fail();
  },
  foldl: v => v1 => v2 => {
    if (v2.tag === "Nothing") { return v1; }
    if (v2.tag === "Just") { return v(v1)(v2._1); }
    $runtime.fail();
  },
  foldMap: dictMonoid => v => v1 => {
    if (v1.tag === "Nothing") { return dictMonoid.mempty; }
    if (v1.tag === "Just") { return v(v1._1); }
    $runtime.fail();
  }
};
const foldableIdentity = {foldr: f => z => v => f(v)(z), foldl: f => z => v => f(z)(v), foldMap: dictMonoid => f => v => f(v)};
const foldableEither = {
  foldr: v => v1 => v2 => {
    if (v2.tag === "Left") { return v1; }
    if (v2.tag === "Right") { return v(v2._1)(v1); }
    $runtime.fail();
  },
  foldl: v => v1 => v2 => {
    if (v2.tag === "Left") { return v1; }
    if (v2.tag === "Right") { return v(v1)(v2._1); }
    $runtime.fail();
  },
  foldMap: dictMonoid => v => v1 => {
    if (v1.tag === "Left") { return dictMonoid.mempty; }
    if (v1.tag === "Right") { return v(v1._1); }
    $runtime.fail();
  }
};
const foldableDual = {foldr: f => z => v => f(v)(z), foldl: f => z => v => f(z)(v), foldMap: dictMonoid => f => v => f(v)};
const foldableDisj = {foldr: f => z => v => f(v)(z), foldl: f => z => v => f(z)(v), foldMap: dictMonoid => f => v => f(v)};
const foldableConst = {foldr: v => z => v1 => z, foldl: v => z => v1 => z, foldMap: dictMonoid => v => v1 => dictMonoid.mempty};
const foldableConj = {foldr: f => z => v => f(v)(z), foldl: f => z => v => f(z)(v), foldMap: dictMonoid => f => v => f(v)};
const foldableAdditive = {foldr: f => z => v => f(v)(z), foldl: f => z => v => f(z)(v), foldMap: dictMonoid => f => v => f(v)};
const foldMapDefaultR = dictFoldable => dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return f => dictFoldable.foldr(x => acc => append(f(x))(acc))(dictMonoid.mempty);
};
const foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => foldableArray.foldr(x => acc => append(f(x))(acc))(dictMonoid.mempty);
  }
};
const foldMapDefaultL = dictFoldable => dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return f => dictFoldable.foldl(acc => x => append(acc)(f(x)))(dictMonoid.mempty);
};
const foldMap = dict => dict.foldMap;
const foldableApp = dictFoldable => (
  {foldr: f => i => v => dictFoldable.foldr(f)(i)(v), foldl: f => i => v => dictFoldable.foldl(f)(i)(v), foldMap: dictMonoid => dictFoldable.foldMap(dictMonoid)}
);
const foldableCompose = dictFoldable => dictFoldable1 => (
  {
    foldr: f => i => v => dictFoldable.foldr((() => {
      const $5 = dictFoldable1.foldr(f);
      return b => a => $5(a)(b);
    })())(i)(v),
    foldl: f => i => v => dictFoldable.foldl(dictFoldable1.foldl(f))(i)(v),
    foldMap: dictMonoid => {
      const foldMap4 = dictFoldable.foldMap(dictMonoid);
      const foldMap5 = dictFoldable1.foldMap(dictMonoid);
      return f => v => foldMap4(foldMap5(f))(v);
    }
  }
);
const foldableCoproduct = dictFoldable => dictFoldable1 => (
  {
    foldr: f => z => {
      const $4 = dictFoldable.foldr(f)(z);
      const $5 = dictFoldable1.foldr(f)(z);
      return v2 => {
        if (v2.tag === "Left") { return $4(v2._1); }
        if (v2.tag === "Right") { return $5(v2._1); }
        $runtime.fail();
      };
    },
    foldl: f => z => {
      const $4 = dictFoldable.foldl(f)(z);
      const $5 = dictFoldable1.foldl(f)(z);
      return v2 => {
        if (v2.tag === "Left") { return $4(v2._1); }
        if (v2.tag === "Right") { return $5(v2._1); }
        $runtime.fail();
      };
    },
    foldMap: dictMonoid => {
      const foldMap4 = dictFoldable.foldMap(dictMonoid);
      const foldMap5 = dictFoldable1.foldMap(dictMonoid);
      return f => {
        const $6 = foldMap4(f);
        const $7 = foldMap5(f);
        return v2 => {
          if (v2.tag === "Left") { return $6(v2._1); }
          if (v2.tag === "Right") { return $7(v2._1); }
          $runtime.fail();
        };
      };
    }
  }
);
const foldableFirst = {
  foldr: f => z => v => {
    if (v.tag === "Nothing") { return z; }
    if (v.tag === "Just") { return f(v._1)(z); }
    $runtime.fail();
  },
  foldl: f => z => v => {
    if (v.tag === "Nothing") { return z; }
    if (v.tag === "Just") { return f(z)(v._1); }
    $runtime.fail();
  },
  foldMap: dictMonoid => f => v => {
    if (v.tag === "Nothing") { return dictMonoid.mempty; }
    if (v.tag === "Just") { return f(v._1); }
    $runtime.fail();
  }
};
const foldableLast = {
  foldr: f => z => v => {
    if (v.tag === "Nothing") { return z; }
    if (v.tag === "Just") { return f(v._1)(z); }
    $runtime.fail();
  },
  foldl: f => z => v => {
    if (v.tag === "Nothing") { return z; }
    if (v.tag === "Just") { return f(z)(v._1); }
    $runtime.fail();
  },
  foldMap: dictMonoid => f => v => {
    if (v.tag === "Nothing") { return dictMonoid.mempty; }
    if (v.tag === "Just") { return f(v._1); }
    $runtime.fail();
  }
};
const foldableProduct = dictFoldable => dictFoldable1 => (
  {
    foldr: f => z => v => dictFoldable.foldr(f)(dictFoldable1.foldr(f)(z)(v._2))(v._1),
    foldl: f => z => v => dictFoldable1.foldl(f)(dictFoldable.foldl(f)(z)(v._1))(v._2),
    foldMap: dictMonoid => {
      const append = dictMonoid.Semigroup0().append;
      const foldMap4 = dictFoldable.foldMap(dictMonoid);
      const foldMap5 = dictFoldable1.foldMap(dictMonoid);
      return f => v => append(foldMap4(f)(v._1))(foldMap5(f)(v._2));
    }
  }
);
const foldlDefault = dictFoldable => {
  const foldMap2 = dictFoldable.foldMap(monoidDual);
  return c => u => xs => foldMap2(x => a => c(a)(x))(xs)(u);
};
const foldrDefault = dictFoldable => {
  const foldMap2 = dictFoldable.foldMap(monoidEndo);
  return c => u => xs => foldMap2(x => c(x))(xs)(u);
};
const lookup = dictFoldable => {
  const foldMap2 = dictFoldable.foldMap(Data$dMaybe$dFirst.monoidFirst);
  return dictEq => a => foldMap2(v => {
    if (dictEq.eq(a)(v._1)) { return Data$dMaybe.$Maybe("Just", v._2); }
    return Data$dMaybe.Nothing;
  });
};
const surroundMap = dictFoldable => {
  const foldMap2 = dictFoldable.foldMap(monoidEndo);
  return dictSemigroup => d => t => f => foldMap2(a => m => dictSemigroup.append(d)(dictSemigroup.append(t(a))(m)))(f)(d);
};
const surround = dictFoldable => {
  const surroundMap1 = surroundMap(dictFoldable);
  return dictSemigroup => {
    const surroundMap2 = surroundMap1(dictSemigroup);
    return d => surroundMap2(d)(identity);
  };
};
const foldM = dictFoldable => dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return f => b0 => dictFoldable.foldl(b => a => bind(b)(a$1 => f(a$1)(a)))(pure(b0));
};
const fold = dictFoldable => dictMonoid => dictFoldable.foldMap(dictMonoid)(identity);
const findMap = dictFoldable => p => dictFoldable.foldl(v => v1 => {
  if (v.tag === "Nothing") { return p(v1); }
  return v;
})(Data$dMaybe.Nothing);
const find = dictFoldable => p => dictFoldable.foldl(v => v1 => {
  if (v.tag === "Nothing") {
    if (p(v1)) { return Data$dMaybe.$Maybe("Just", v1); }
    return v;
  }
  return v;
})(Data$dMaybe.Nothing);
const any = dictFoldable => dictHeytingAlgebra => dictFoldable.foldMap((() => {
  const semigroupDisj1 = {append: v => v1 => dictHeytingAlgebra.disj(v)(v1)};
  return {mempty: dictHeytingAlgebra.ff, Semigroup0: () => semigroupDisj1};
})());
const elem = dictFoldable => {
  const any1 = dictFoldable.foldMap((() => {
    const semigroupDisj1 = {append: v => v1 => v || v1};
    return {mempty: false, Semigroup0: () => semigroupDisj1};
  })());
  return dictEq => x => any1(dictEq.eq(x));
};
const notElem = dictFoldable => {
  const any1 = dictFoldable.foldMap((() => {
    const semigroupDisj1 = {append: v => v1 => v || v1};
    return {mempty: false, Semigroup0: () => semigroupDisj1};
  })());
  return dictEq => x => {
    const $4 = any1(dictEq.eq(x));
    return x$1 => !$4(x$1);
  };
};
const or = dictFoldable => dictHeytingAlgebra => dictFoldable.foldMap((() => {
  const semigroupDisj1 = {append: v => v1 => dictHeytingAlgebra.disj(v)(v1)};
  return {mempty: dictHeytingAlgebra.ff, Semigroup0: () => semigroupDisj1};
})())(identity);
const all = dictFoldable => dictHeytingAlgebra => dictFoldable.foldMap((() => {
  const semigroupConj1 = {append: v => v1 => dictHeytingAlgebra.conj(v)(v1)};
  return {mempty: dictHeytingAlgebra.tt, Semigroup0: () => semigroupConj1};
})());
const and = dictFoldable => dictHeytingAlgebra => dictFoldable.foldMap((() => {
  const semigroupConj1 = {append: v => v1 => dictHeytingAlgebra.conj(v)(v1)};
  return {mempty: dictHeytingAlgebra.tt, Semigroup0: () => semigroupConj1};
})())(identity);
export {
  all,
  and,
  any,
  elem,
  find,
  findMap,
  fold,
  foldM,
  foldMap,
  foldMapDefaultL,
  foldMapDefaultR,
  foldableAdditive,
  foldableApp,
  foldableArray,
  foldableCompose,
  foldableConj,
  foldableConst,
  foldableCoproduct,
  foldableDisj,
  foldableDual,
  foldableEither,
  foldableFirst,
  foldableIdentity,
  foldableLast,
  foldableMaybe,
  foldableMultiplicative,
  foldableProduct,
  foldableTuple,
  foldl,
  foldlDefault,
  foldr,
  foldrDefault,
  for_,
  identity,
  indexl,
  indexr,
  intercalate,
  length,
  lookup,
  maximum,
  maximumBy,
  minimum,
  minimumBy,
  monoidDual,
  monoidEndo,
  notElem,
  $$null as null,
  oneOf,
  oneOfMap,
  or,
  product,
  sequence_,
  sum,
  surround,
  surroundMap,
  traverse_
};
export * from "./foreign.js";
