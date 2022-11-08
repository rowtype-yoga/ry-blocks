import * as $runtime from "../runtime.js";
import * as Control$dApply from "../Control.Apply/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctorWithIndex from "../Data.FunctorWithIndex/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const monoidEndo = /* #__PURE__ */ (() => {
  const semigroupEndo1 = {append: v => v1 => x => v(v1(x))};
  return {mempty: x => x, Semigroup0: () => semigroupEndo1};
})();
const monoidDual = /* #__PURE__ */ (() => {
  const $0 = monoidEndo.Semigroup0();
  const semigroupDual1 = {append: v => v1 => $0.append(v1)(v)};
  return {mempty: monoidEndo.mempty, Semigroup0: () => semigroupDual1};
})();
const foldrWithIndex = dict => dict.foldrWithIndex;
const traverseWithIndex_ = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const map = $1.Functor0().map;
  return dictFoldableWithIndex => f => dictFoldableWithIndex.foldrWithIndex(i => {
    const $6 = f(i);
    return x => {
      const $8 = $6(x);
      return b => $1.apply(map(v => Control$dApply.identity)($8))(b);
    };
  })(dictApplicative.pure(Data$dUnit.unit));
};
const forWithIndex_ = dictApplicative => {
  const traverseWithIndex_1 = traverseWithIndex_(dictApplicative);
  return dictFoldableWithIndex => {
    const $3 = traverseWithIndex_1(dictFoldableWithIndex);
    return b => a => $3(a)(b);
  };
};
const foldrDefault = dictFoldableWithIndex => f => dictFoldableWithIndex.foldrWithIndex(v => f);
const foldlWithIndex = dict => dict.foldlWithIndex;
const foldlDefault = dictFoldableWithIndex => f => dictFoldableWithIndex.foldlWithIndex(v => f);
const foldableWithIndexTuple = {
  foldrWithIndex: f => z => v => f(Data$dUnit.unit)(v._2)(z),
  foldlWithIndex: f => z => v => f(Data$dUnit.unit)(z)(v._2),
  foldMapWithIndex: dictMonoid => f => v => f(Data$dUnit.unit)(v._2),
  Foldable0: () => Data$dFoldable.foldableTuple
};
const foldableWithIndexMultiplicative = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => $1(v)(z);
  },
  foldlWithIndex: f => f(Data$dUnit.unit),
  foldMapWithIndex: dictMonoid => f => f(Data$dUnit.unit),
  Foldable0: () => Data$dFoldable.foldableMultiplicative
};
const foldableWithIndexMaybe = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return v1 => v2 => {
      if (v2.tag === "Nothing") { return v1; }
      if (v2.tag === "Just") { return $1(v2._1)(v1); }
      $runtime.fail();
    };
  },
  foldlWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return v1 => v2 => {
      if (v2.tag === "Nothing") { return v1; }
      if (v2.tag === "Just") { return $1(v1)(v2._1); }
      $runtime.fail();
    };
  },
  foldMapWithIndex: dictMonoid => f => {
    const $2 = f(Data$dUnit.unit);
    return v1 => {
      if (v1.tag === "Nothing") { return dictMonoid.mempty; }
      if (v1.tag === "Just") { return $2(v1._1); }
      $runtime.fail();
    };
  },
  Foldable0: () => Data$dFoldable.foldableMaybe
};
const foldableWithIndexLast = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => {
      if (v.tag === "Nothing") { return z; }
      if (v.tag === "Just") { return $1(v._1)(z); }
      $runtime.fail();
    };
  },
  foldlWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => {
      if (v.tag === "Nothing") { return z; }
      if (v.tag === "Just") { return $1(z)(v._1); }
      $runtime.fail();
    };
  },
  foldMapWithIndex: dictMonoid => f => {
    const $2 = f(Data$dUnit.unit);
    return v => {
      if (v.tag === "Nothing") { return dictMonoid.mempty; }
      if (v.tag === "Just") { return $2(v._1); }
      $runtime.fail();
    };
  },
  Foldable0: () => Data$dFoldable.foldableLast
};
const foldableWithIndexIdentity = {
  foldrWithIndex: f => z => v => f(Data$dUnit.unit)(v)(z),
  foldlWithIndex: f => z => v => f(Data$dUnit.unit)(z)(v),
  foldMapWithIndex: dictMonoid => f => v => f(Data$dUnit.unit)(v),
  Foldable0: () => Data$dFoldable.foldableIdentity
};
const foldableWithIndexFirst = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => {
      if (v.tag === "Nothing") { return z; }
      if (v.tag === "Just") { return $1(v._1)(z); }
      $runtime.fail();
    };
  },
  foldlWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => {
      if (v.tag === "Nothing") { return z; }
      if (v.tag === "Just") { return $1(z)(v._1); }
      $runtime.fail();
    };
  },
  foldMapWithIndex: dictMonoid => f => {
    const $2 = f(Data$dUnit.unit);
    return v => {
      if (v.tag === "Nothing") { return dictMonoid.mempty; }
      if (v.tag === "Just") { return $2(v._1); }
      $runtime.fail();
    };
  },
  Foldable0: () => Data$dFoldable.foldableFirst
};
const foldableWithIndexEither = {
  foldrWithIndex: v => v1 => v2 => {
    if (v2.tag === "Left") { return v1; }
    if (v2.tag === "Right") { return v(Data$dUnit.unit)(v2._1)(v1); }
    $runtime.fail();
  },
  foldlWithIndex: v => v1 => v2 => {
    if (v2.tag === "Left") { return v1; }
    if (v2.tag === "Right") { return v(Data$dUnit.unit)(v1)(v2._1); }
    $runtime.fail();
  },
  foldMapWithIndex: dictMonoid => v => v1 => {
    if (v1.tag === "Left") { return dictMonoid.mempty; }
    if (v1.tag === "Right") { return v(Data$dUnit.unit)(v1._1); }
    $runtime.fail();
  },
  Foldable0: () => Data$dFoldable.foldableEither
};
const foldableWithIndexDual = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => $1(v)(z);
  },
  foldlWithIndex: f => f(Data$dUnit.unit),
  foldMapWithIndex: dictMonoid => f => f(Data$dUnit.unit),
  Foldable0: () => Data$dFoldable.foldableDual
};
const foldableWithIndexDisj = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => $1(v)(z);
  },
  foldlWithIndex: f => f(Data$dUnit.unit),
  foldMapWithIndex: dictMonoid => f => f(Data$dUnit.unit),
  Foldable0: () => Data$dFoldable.foldableDisj
};
const foldableWithIndexConst = {
  foldrWithIndex: v => z => v1 => z,
  foldlWithIndex: v => z => v1 => z,
  foldMapWithIndex: dictMonoid => v => v1 => dictMonoid.mempty,
  Foldable0: () => Data$dFoldable.foldableConst
};
const foldableWithIndexConj = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => $1(v)(z);
  },
  foldlWithIndex: f => f(Data$dUnit.unit),
  foldMapWithIndex: dictMonoid => f => f(Data$dUnit.unit),
  Foldable0: () => Data$dFoldable.foldableConj
};
const foldableWithIndexAdditive = {
  foldrWithIndex: f => {
    const $1 = f(Data$dUnit.unit);
    return z => v => $1(v)(z);
  },
  foldlWithIndex: f => f(Data$dUnit.unit),
  foldMapWithIndex: dictMonoid => f => f(Data$dUnit.unit),
  Foldable0: () => Data$dFoldable.foldableAdditive
};
const foldWithIndexM = dictFoldableWithIndex => dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return f => a0 => dictFoldableWithIndex.foldlWithIndex(i => ma => b => bind(ma)((() => {
    const $9 = f(i);
    return a => $9(a)(b);
  })()))(pure(a0));
};
const foldMapWithIndexDefaultR = dictFoldableWithIndex => dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return f => dictFoldableWithIndex.foldrWithIndex(i => x => acc => append(f(i)(x))(acc))(dictMonoid.mempty);
};
const foldableWithIndexArray = {
  foldrWithIndex: f => z => {
    const $2 = Data$dFoldable.foldrArray(v => y => f(v._1)(v._2)(y))(z);
    const $3 = Data$dFunctorWithIndex.mapWithIndexArray(Data$dTuple.Tuple);
    return x => $2($3(x));
  },
  foldlWithIndex: f => z => {
    const $2 = Data$dFoldable.foldlArray(y => v => f(v._1)(y)(v._2))(z);
    const $3 = Data$dFunctorWithIndex.mapWithIndexArray(Data$dTuple.Tuple);
    return x => $2($3(x));
  },
  foldMapWithIndex: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => foldableWithIndexArray.foldrWithIndex(i => x => acc => append(f(i)(x))(acc))(dictMonoid.mempty);
  },
  Foldable0: () => Data$dFoldable.foldableArray
};
const foldMapWithIndexDefaultL = dictFoldableWithIndex => dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return f => dictFoldableWithIndex.foldlWithIndex(i => acc => x => append(acc)(f(i)(x)))(dictMonoid.mempty);
};
const foldMapWithIndex = dict => dict.foldMapWithIndex;
const foldableWithIndexApp = dictFoldableWithIndex => {
  const $1 = dictFoldableWithIndex.Foldable0();
  const foldableApp = {foldr: f => i => v => $1.foldr(f)(i)(v), foldl: f => i => v => $1.foldl(f)(i)(v), foldMap: dictMonoid => $1.foldMap(dictMonoid)};
  return {
    foldrWithIndex: f => z => v => dictFoldableWithIndex.foldrWithIndex(f)(z)(v),
    foldlWithIndex: f => z => v => dictFoldableWithIndex.foldlWithIndex(f)(z)(v),
    foldMapWithIndex: dictMonoid => dictFoldableWithIndex.foldMapWithIndex(dictMonoid),
    Foldable0: () => foldableApp
  };
};
const foldableWithIndexCompose = dictFoldableWithIndex => {
  const $1 = dictFoldableWithIndex.Foldable0();
  return dictFoldableWithIndex1 => {
    const $3 = dictFoldableWithIndex1.Foldable0();
    const foldableCompose1 = {
      foldr: f => i => v => $1.foldr((() => {
        const $7 = $3.foldr(f);
        return b => a => $7(a)(b);
      })())(i)(v),
      foldl: f => i => v => $1.foldl($3.foldl(f))(i)(v),
      foldMap: dictMonoid => {
        const foldMap4 = $1.foldMap(dictMonoid);
        const foldMap5 = $3.foldMap(dictMonoid);
        return f => v => foldMap4(foldMap5(f))(v);
      }
    };
    return {
      foldrWithIndex: f => i => v => dictFoldableWithIndex.foldrWithIndex(a => {
        const $9 = dictFoldableWithIndex1.foldrWithIndex(Data$dTuple.curry(f)(a));
        return b => a$1 => $9(a$1)(b);
      })(i)(v),
      foldlWithIndex: f => i => v => dictFoldableWithIndex.foldlWithIndex(x => dictFoldableWithIndex1.foldlWithIndex(Data$dTuple.curry(f)(x)))(i)(v),
      foldMapWithIndex: dictMonoid => {
        const foldMapWithIndex3 = dictFoldableWithIndex.foldMapWithIndex(dictMonoid);
        const foldMapWithIndex4 = dictFoldableWithIndex1.foldMapWithIndex(dictMonoid);
        return f => v => foldMapWithIndex3(x => foldMapWithIndex4(Data$dTuple.curry(f)(x)))(v);
      },
      Foldable0: () => foldableCompose1
    };
  };
};
const foldableWithIndexCoproduct = dictFoldableWithIndex => {
  const foldableCoproduct = Data$dFoldable.foldableCoproduct(dictFoldableWithIndex.Foldable0());
  return dictFoldableWithIndex1 => {
    const foldableCoproduct1 = foldableCoproduct(dictFoldableWithIndex1.Foldable0());
    return {
      foldrWithIndex: f => z => {
        const $6 = dictFoldableWithIndex.foldrWithIndex(x => f(Data$dEither.$Either("Left", x)))(z);
        const $7 = dictFoldableWithIndex1.foldrWithIndex(x => f(Data$dEither.$Either("Right", x)))(z);
        return v2 => {
          if (v2.tag === "Left") { return $6(v2._1); }
          if (v2.tag === "Right") { return $7(v2._1); }
          $runtime.fail();
        };
      },
      foldlWithIndex: f => z => {
        const $6 = dictFoldableWithIndex.foldlWithIndex(x => f(Data$dEither.$Either("Left", x)))(z);
        const $7 = dictFoldableWithIndex1.foldlWithIndex(x => f(Data$dEither.$Either("Right", x)))(z);
        return v2 => {
          if (v2.tag === "Left") { return $6(v2._1); }
          if (v2.tag === "Right") { return $7(v2._1); }
          $runtime.fail();
        };
      },
      foldMapWithIndex: dictMonoid => {
        const foldMapWithIndex3 = dictFoldableWithIndex.foldMapWithIndex(dictMonoid);
        const foldMapWithIndex4 = dictFoldableWithIndex1.foldMapWithIndex(dictMonoid);
        return f => {
          const $8 = foldMapWithIndex3(x => f(Data$dEither.$Either("Left", x)));
          const $9 = foldMapWithIndex4(x => f(Data$dEither.$Either("Right", x)));
          return v2 => {
            if (v2.tag === "Left") { return $8(v2._1); }
            if (v2.tag === "Right") { return $9(v2._1); }
            $runtime.fail();
          };
        };
      },
      Foldable0: () => foldableCoproduct1
    };
  };
};
const foldableWithIndexProduct = dictFoldableWithIndex => {
  const foldableProduct = Data$dFoldable.foldableProduct(dictFoldableWithIndex.Foldable0());
  return dictFoldableWithIndex1 => {
    const foldableProduct1 = foldableProduct(dictFoldableWithIndex1.Foldable0());
    return {
      foldrWithIndex: f => z => v => dictFoldableWithIndex.foldrWithIndex(x => f(Data$dEither.$Either("Left", x)))(dictFoldableWithIndex1.foldrWithIndex(x => f(Data$dEither.$Either(
        "Right",
        x
      )))(z)(v._2))(v._1),
      foldlWithIndex: f => z => v => dictFoldableWithIndex1.foldlWithIndex(x => f(Data$dEither.$Either("Right", x)))(dictFoldableWithIndex.foldlWithIndex(x => f(Data$dEither.$Either(
        "Left",
        x
      )))(z)(v._1))(v._2),
      foldMapWithIndex: dictMonoid => {
        const append = dictMonoid.Semigroup0().append;
        const foldMapWithIndex3 = dictFoldableWithIndex.foldMapWithIndex(dictMonoid);
        const foldMapWithIndex4 = dictFoldableWithIndex1.foldMapWithIndex(dictMonoid);
        return f => v => append(foldMapWithIndex3(x => f(Data$dEither.$Either("Left", x)))(v._1))(foldMapWithIndex4(x => f(Data$dEither.$Either("Right", x)))(v._2));
      },
      Foldable0: () => foldableProduct1
    };
  };
};
const foldlWithIndexDefault = dictFoldableWithIndex => {
  const foldMapWithIndex1 = dictFoldableWithIndex.foldMapWithIndex(monoidDual);
  return c => u => xs => foldMapWithIndex1(i => {
    const $6 = c(i);
    return x => a => $6(a)(x);
  })(xs)(u);
};
const foldrWithIndexDefault = dictFoldableWithIndex => {
  const foldMapWithIndex1 = dictFoldableWithIndex.foldMapWithIndex(monoidEndo);
  return c => u => xs => foldMapWithIndex1(i => c(i))(xs)(u);
};
const surroundMapWithIndex = dictFoldableWithIndex => {
  const foldMapWithIndex1 = dictFoldableWithIndex.foldMapWithIndex(monoidEndo);
  return dictSemigroup => d => t => f => foldMapWithIndex1(i => a => m => dictSemigroup.append(d)(dictSemigroup.append(t(i)(a))(m)))(f)(d);
};
const foldMapDefault = dictFoldableWithIndex => dictMonoid => {
  const foldMapWithIndex2 = dictFoldableWithIndex.foldMapWithIndex(dictMonoid);
  return f => foldMapWithIndex2(v => f);
};
const findWithIndex = dictFoldableWithIndex => p => dictFoldableWithIndex.foldlWithIndex(v => v1 => v2 => {
  if (v1.tag === "Nothing") {
    if (p(v)(v2)) { return Data$dMaybe.$Maybe("Just", {index: v, value: v2}); }
    return v1;
  }
  return v1;
})(Data$dMaybe.Nothing);
const findMapWithIndex = dictFoldableWithIndex => f => dictFoldableWithIndex.foldlWithIndex(v => v1 => v2 => {
  if (v1.tag === "Nothing") { return f(v)(v2); }
  return v1;
})(Data$dMaybe.Nothing);
const anyWithIndex = dictFoldableWithIndex => dictHeytingAlgebra => {
  const foldMapWithIndex2 = dictFoldableWithIndex.foldMapWithIndex((() => {
    const semigroupDisj1 = {append: v => v1 => dictHeytingAlgebra.disj(v)(v1)};
    return {mempty: dictHeytingAlgebra.ff, Semigroup0: () => semigroupDisj1};
  })());
  return t => foldMapWithIndex2(i => t(i));
};
const allWithIndex = dictFoldableWithIndex => dictHeytingAlgebra => {
  const foldMapWithIndex2 = dictFoldableWithIndex.foldMapWithIndex((() => {
    const semigroupConj1 = {append: v => v1 => dictHeytingAlgebra.conj(v)(v1)};
    return {mempty: dictHeytingAlgebra.tt, Semigroup0: () => semigroupConj1};
  })());
  return t => foldMapWithIndex2(i => t(i));
};
export {
  allWithIndex,
  anyWithIndex,
  findMapWithIndex,
  findWithIndex,
  foldMapDefault,
  foldMapWithIndex,
  foldMapWithIndexDefaultL,
  foldMapWithIndexDefaultR,
  foldWithIndexM,
  foldableWithIndexAdditive,
  foldableWithIndexApp,
  foldableWithIndexArray,
  foldableWithIndexCompose,
  foldableWithIndexConj,
  foldableWithIndexConst,
  foldableWithIndexCoproduct,
  foldableWithIndexDisj,
  foldableWithIndexDual,
  foldableWithIndexEither,
  foldableWithIndexFirst,
  foldableWithIndexIdentity,
  foldableWithIndexLast,
  foldableWithIndexMaybe,
  foldableWithIndexMultiplicative,
  foldableWithIndexProduct,
  foldableWithIndexTuple,
  foldlDefault,
  foldlWithIndex,
  foldlWithIndexDefault,
  foldrDefault,
  foldrWithIndex,
  foldrWithIndexDefault,
  forWithIndex_,
  monoidDual,
  monoidEndo,
  surroundMapWithIndex,
  traverseWithIndex_
};
