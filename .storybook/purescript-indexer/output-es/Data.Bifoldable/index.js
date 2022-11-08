import * as $runtime from "../runtime.js";
import * as Control$dApply from "../Control.Apply/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
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
const bifoldr = dict => dict.bifoldr;
const bitraverse_ = dictBifoldable => dictApplicative => {
  const $2 = dictApplicative.Apply0();
  const map = $2.Functor0().map;
  return f => g => dictBifoldable.bifoldr(x => {
    const $7 = f(x);
    return b => $2.apply(map(v => Control$dApply.identity)($7))(b);
  })(x => {
    const $7 = g(x);
    return b => $2.apply(map(v => Control$dApply.identity)($7))(b);
  })(dictApplicative.pure(Data$dUnit.unit));
};
const bifor_ = dictBifoldable => dictApplicative => {
  const bitraverse_2 = bitraverse_(dictBifoldable)(dictApplicative);
  return t => f => g => bitraverse_2(f)(g)(t);
};
const bisequence_ = dictBifoldable => dictApplicative => bitraverse_(dictBifoldable)(dictApplicative)(identity)(identity);
const bifoldl = dict => dict.bifoldl;
const bifoldableTuple = {
  bifoldMap: dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return f => g => v => append(f(v._1))(g(v._2));
  },
  bifoldr: f => g => z => v => f(v._1)(g(v._2)(z)),
  bifoldl: f => g => z => v => g(f(z)(v._1))(v._2)
};
const bifoldableJoker = dictFoldable => (
  {
    bifoldr: v => r => u => v1 => dictFoldable.foldr(r)(u)(v1),
    bifoldl: v => r => u => v1 => dictFoldable.foldl(r)(u)(v1),
    bifoldMap: dictMonoid => {
      const foldMap1 = dictFoldable.foldMap(dictMonoid);
      return v => r => v1 => foldMap1(r)(v1);
    }
  }
);
const bifoldableEither = {
  bifoldr: v => v1 => v2 => v3 => {
    if (v3.tag === "Left") { return v(v3._1)(v2); }
    if (v3.tag === "Right") { return v1(v3._1)(v2); }
    $runtime.fail();
  },
  bifoldl: v => v1 => v2 => v3 => {
    if (v3.tag === "Left") { return v(v2)(v3._1); }
    if (v3.tag === "Right") { return v1(v2)(v3._1); }
    $runtime.fail();
  },
  bifoldMap: dictMonoid => v => v1 => v2 => {
    if (v2.tag === "Left") { return v(v2._1); }
    if (v2.tag === "Right") { return v1(v2._1); }
    $runtime.fail();
  }
};
const bifoldableConst = {bifoldr: f => v => z => v1 => f(v1)(z), bifoldl: f => v => z => v1 => f(z)(v1), bifoldMap: dictMonoid => f => v => v1 => f(v1)};
const bifoldableClown = dictFoldable => (
  {
    bifoldr: l => v => u => v1 => dictFoldable.foldr(l)(u)(v1),
    bifoldl: l => v => u => v1 => dictFoldable.foldl(l)(u)(v1),
    bifoldMap: dictMonoid => {
      const foldMap1 = dictFoldable.foldMap(dictMonoid);
      return l => v => v1 => foldMap1(l)(v1);
    }
  }
);
const bifoldMapDefaultR = dictBifoldable => dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return f => g => dictBifoldable.bifoldr(x => append(f(x)))(x => append(g(x)))(dictMonoid.mempty);
};
const bifoldMapDefaultL = dictBifoldable => dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return f => g => dictBifoldable.bifoldl(m => a => append(m)(f(a)))(m => b => append(m)(g(b)))(dictMonoid.mempty);
};
const bifoldMap = dict => dict.bifoldMap;
const bifoldableFlip = dictBifoldable => (
  {
    bifoldr: r => l => u => v => dictBifoldable.bifoldr(l)(r)(u)(v),
    bifoldl: r => l => u => v => dictBifoldable.bifoldl(l)(r)(u)(v),
    bifoldMap: dictMonoid => {
      const bifoldMap2 = dictBifoldable.bifoldMap(dictMonoid);
      return r => l => v => bifoldMap2(l)(r)(v);
    }
  }
);
const bifoldlDefault = dictBifoldable => {
  const bifoldMap1 = dictBifoldable.bifoldMap(monoidDual);
  return f => g => z => p => bifoldMap1(x => a => f(a)(x))(x => a => g(a)(x))(p)(z);
};
const bifoldrDefault = dictBifoldable => {
  const bifoldMap1 = dictBifoldable.bifoldMap(monoidEndo);
  return f => g => z => p => bifoldMap1(x => f(x))(x => g(x))(p)(z);
};
const bifoldableProduct2 = dictBifoldable => dictBifoldable1 => (
  {
    bifoldr: l => r => u => m => bifoldrDefault(bifoldableProduct2(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m),
    bifoldl: l => r => u => m => bifoldlDefault(bifoldableProduct2(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m),
    bifoldMap: dictMonoid => {
      const append = dictMonoid.Semigroup0().append;
      const bifoldMap3 = dictBifoldable.bifoldMap(dictMonoid);
      const bifoldMap4 = dictBifoldable1.bifoldMap(dictMonoid);
      return l => r => v => append(bifoldMap3(l)(r)(v._1))(bifoldMap4(l)(r)(v._2));
    }
  }
);
const bifold = dictBifoldable => dictMonoid => dictBifoldable.bifoldMap(dictMonoid)(identity)(identity);
const biany = dictBifoldable => dictBooleanAlgebra => {
  const bifoldMap2 = dictBifoldable.bifoldMap((() => {
    const $2 = dictBooleanAlgebra.HeytingAlgebra0();
    const semigroupDisj1 = {append: v => v1 => $2.disj(v)(v1)};
    return {mempty: $2.ff, Semigroup0: () => semigroupDisj1};
  })());
  return p => q => bifoldMap2(x => p(x))(x => q(x));
};
const biall = dictBifoldable => dictBooleanAlgebra => {
  const bifoldMap2 = dictBifoldable.bifoldMap((() => {
    const $2 = dictBooleanAlgebra.HeytingAlgebra0();
    const semigroupConj1 = {append: v => v1 => $2.conj(v)(v1)};
    return {mempty: $2.tt, Semigroup0: () => semigroupConj1};
  })());
  return p => q => bifoldMap2(x => p(x))(x => q(x));
};
export {
  biall,
  biany,
  bifold,
  bifoldMap,
  bifoldMapDefaultL,
  bifoldMapDefaultR,
  bifoldableClown,
  bifoldableConst,
  bifoldableEither,
  bifoldableFlip,
  bifoldableJoker,
  bifoldableProduct2,
  bifoldableTuple,
  bifoldl,
  bifoldlDefault,
  bifoldr,
  bifoldrDefault,
  bifor_,
  bisequence_,
  bitraverse_,
  identity,
  monoidDual,
  monoidEndo
};
