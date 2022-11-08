import * as $runtime from "../runtime.js";
import * as Data$dSemigroup$dFoldable from "../Data.Semigroup.Foldable/index.js";
const $CoyonedaF = (_1, _2) => ({tag: "CoyonedaF", _1, _2});
const CoyonedaF = value0 => value1 => $CoyonedaF(value0, value1);
const Coyoneda = x => x;
const unCoyoneda = f => v => f(v._1)(v._2);
const lowerCoyoneda = dictFunctor => v => dictFunctor.map(v._1)(v._2);
const foldableCoyoneda = dictFoldable => (
  {
    foldr: f => z => v => dictFoldable.foldr(x => f(v._1(x)))(z)(v._2),
    foldl: f => z => v => dictFoldable.foldl(x => {
      const $5 = f(x);
      return x$1 => $5(v._1(x$1));
    })(z)(v._2),
    foldMap: dictMonoid => {
      const foldMap1 = dictFoldable.foldMap(dictMonoid);
      return f => v => foldMap1(x => f(v._1(x)))(v._2);
    }
  }
);
const foldable1Coyoneda = dictFoldable1 => {
  const foldableCoyoneda1 = foldableCoyoneda(dictFoldable1.Foldable0());
  return {
    foldMap1: dictSemigroup => {
      const foldMap11 = dictFoldable1.foldMap1(dictSemigroup);
      return f => v => foldMap11(x => f(v._1(x)))(v._2);
    },
    foldr1: Data$dSemigroup$dFoldable.foldr1Default(foldable1Coyoneda(dictFoldable1)),
    foldl1: Data$dSemigroup$dFoldable.foldl1Default(foldable1Coyoneda(dictFoldable1)),
    Foldable0: () => foldableCoyoneda1
  };
};
const eqCoyoneda = dictFunctor => dictEq1 => dictEq => {
  const eq11 = dictEq1.eq1(dictEq);
  return {eq: x => y => eq11(dictFunctor.map(x._1)(x._2))(dictFunctor.map(y._1)(y._2))};
};
const ordCoyoneda = dictFunctor => dictOrd1 => {
  const $2 = dictOrd1.Eq10();
  return dictOrd => {
    const compare11 = dictOrd1.compare1(dictOrd);
    const eq11 = $2.eq1(dictOrd.Eq0());
    const eqCoyoneda3 = {eq: x => y => eq11(dictFunctor.map(x._1)(x._2))(dictFunctor.map(y._1)(y._2))};
    return {compare: x => y => compare11(dictFunctor.map(x._1)(x._2))(dictFunctor.map(y._1)(y._2)), Eq0: () => eqCoyoneda3};
  };
};
const eq1Coyoneda = dictFunctor => dictEq1 => (
  {
    eq1: dictEq => {
      const eq11 = dictEq1.eq1(dictEq);
      return x => y => eq11(dictFunctor.map(x._1)(x._2))(dictFunctor.map(y._1)(y._2));
    }
  }
);
const ord1Coyoneda = dictFunctor => dictOrd1 => {
  const ordCoyoneda2 = ordCoyoneda(dictFunctor)(dictOrd1);
  const $3 = dictOrd1.Eq10();
  const eq1Coyoneda2 = {
    eq1: dictEq => {
      const eq11 = $3.eq1(dictEq);
      return x => y => eq11(dictFunctor.map(x._1)(x._2))(dictFunctor.map(y._1)(y._2));
    }
  };
  return {compare1: dictOrd => ordCoyoneda2(dictOrd).compare, Eq10: () => eq1Coyoneda2};
};
const coyoneda = k => fi => $CoyonedaF(k, fi);
const functorCoyoneda = {map: f => v => $CoyonedaF(x => f(v._1(x)), v._2)};
const invatiantCoyoneda = {imap: f => v => functorCoyoneda.map(f)};
const hoistCoyoneda = nat => v => $CoyonedaF(v._1, nat(v._2));
const liftCoyoneda = /* #__PURE__ */ coyoneda(x => x);
const distributiveCoyoneda = dictDistributive => {
  const $1 = dictDistributive.Functor0();
  return {
    collect: dictFunctor => {
      const collect1 = dictDistributive.collect(dictFunctor);
      return f => {
        const $5 = collect1(x => {
          const $6 = f(x);
          return $1.map($6._1)($6._2);
        });
        return x => $CoyonedaF(x$1 => x$1, $5(x));
      };
    },
    distribute: dictFunctor => {
      const $3 = dictDistributive.collect(dictFunctor)(v => $1.map(v._1)(v._2));
      return x => $CoyonedaF(x$1 => x$1, $3(x));
    },
    Functor0: () => functorCoyoneda
  };
};
const extendCoyoneda = dictExtend => ({extend: f => v => $CoyonedaF(x => x, dictExtend.extend(x => f($CoyonedaF(v._1, x)))(v._2)), Functor0: () => functorCoyoneda});
const monadTransCoyoneda = {lift: dictMonad => liftCoyoneda};
const traversableCoyoneda = dictTraversable => {
  const foldableCoyoneda1 = foldableCoyoneda(dictTraversable.Foldable1());
  return {
    traverse: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const traverse1 = dictTraversable.traverse(dictApplicative);
      return f => v => map(liftCoyoneda)(traverse1(x => f(v._1(x)))(v._2));
    },
    sequence: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const traverse1 = dictTraversable.traverse(dictApplicative);
      return v => map(liftCoyoneda)(traverse1(v._1)(v._2));
    },
    Functor0: () => functorCoyoneda,
    Foldable1: () => foldableCoyoneda1
  };
};
const traversable1Coyoneda = dictTraversable1 => {
  const Traversable1 = dictTraversable1.Traversable1();
  const map = Traversable1.Functor0().map;
  const foldable1Coyoneda1 = foldable1Coyoneda(dictTraversable1.Foldable10());
  const traversableCoyoneda1 = traversableCoyoneda(Traversable1);
  return {
    traverse1: dictApply => {
      const map1 = dictApply.Functor0().map;
      const traverse11 = dictTraversable1.traverse1(dictApply);
      return f => v => map1(liftCoyoneda)(traverse11(x => f(v._1(x)))(v._2));
    },
    sequence1: dictApply => {
      const map1 = dictApply.Functor0().map;
      const sequence11 = dictTraversable1.sequence1(dictApply);
      return v => map1(liftCoyoneda)(sequence11(map(v._1)(v._2)));
    },
    Foldable10: () => foldable1Coyoneda1,
    Traversable1: () => traversableCoyoneda1
  };
};
const comonadCoyoneda = dictComonad => {
  const extendCoyoneda1 = extendCoyoneda(dictComonad.Extend0());
  return {extract: v => v._1(dictComonad.extract(v._2)), Extend0: () => extendCoyoneda1};
};
const applyCoyoneda = dictApply => {
  const $1 = dictApply.Functor0();
  return {apply: f => g => $CoyonedaF(x => x, dictApply.apply($1.map(f._1)(f._2))($1.map(g._1)(g._2))), Functor0: () => functorCoyoneda};
};
const bindCoyoneda = dictBind => {
  const Apply0 = dictBind.Apply0();
  const $2 = Apply0.Functor0();
  const applyCoyoneda1 = applyCoyoneda(Apply0);
  return {
    bind: v => f => $CoyonedaF(
      x => x,
      dictBind.bind(v._2)(x => {
        const $7 = f(v._1(x));
        return $2.map($7._1)($7._2);
      })
    ),
    Apply0: () => applyCoyoneda1
  };
};
const applicativeCoyoneda = dictApplicative => {
  const applyCoyoneda1 = applyCoyoneda(dictApplicative.Apply0());
  return {pure: x => $CoyonedaF(x$1 => x$1, dictApplicative.pure(x)), Apply0: () => applyCoyoneda1};
};
const monadCoyoneda = dictMonad => {
  const applicativeCoyoneda1 = applicativeCoyoneda(dictMonad.Applicative0());
  const bindCoyoneda1 = bindCoyoneda(dictMonad.Bind1());
  return {Applicative0: () => applicativeCoyoneda1, Bind1: () => bindCoyoneda1};
};
const altCoyoneda = dictAlt => {
  const $1 = dictAlt.Functor0();
  return {alt: x => y => $CoyonedaF(x$1 => x$1, dictAlt.alt($1.map(x._1)(x._2))($1.map(y._1)(y._2))), Functor0: () => functorCoyoneda};
};
const plusCoyoneda = dictPlus => {
  const altCoyoneda1 = altCoyoneda(dictPlus.Alt0());
  return {empty: $CoyonedaF(x => x, dictPlus.empty), Alt0: () => altCoyoneda1};
};
const alternativeCoyoneda = dictAlternative => {
  const applicativeCoyoneda1 = applicativeCoyoneda(dictAlternative.Applicative0());
  const plusCoyoneda1 = plusCoyoneda(dictAlternative.Plus1());
  return {Applicative0: () => applicativeCoyoneda1, Plus1: () => plusCoyoneda1};
};
const monadPlusCoyoneda = dictMonadPlus => {
  const monadCoyoneda1 = monadCoyoneda(dictMonadPlus.Monad0());
  const alternativeCoyoneda1 = alternativeCoyoneda(dictMonadPlus.Alternative1());
  return {Monad0: () => monadCoyoneda1, Alternative1: () => alternativeCoyoneda1};
};
export {
  $CoyonedaF,
  Coyoneda,
  CoyonedaF,
  altCoyoneda,
  alternativeCoyoneda,
  applicativeCoyoneda,
  applyCoyoneda,
  bindCoyoneda,
  comonadCoyoneda,
  coyoneda,
  distributiveCoyoneda,
  eq1Coyoneda,
  eqCoyoneda,
  extendCoyoneda,
  foldable1Coyoneda,
  foldableCoyoneda,
  functorCoyoneda,
  hoistCoyoneda,
  invatiantCoyoneda,
  liftCoyoneda,
  lowerCoyoneda,
  monadCoyoneda,
  monadPlusCoyoneda,
  monadTransCoyoneda,
  ord1Coyoneda,
  ordCoyoneda,
  plusCoyoneda,
  traversable1Coyoneda,
  traversableCoyoneda,
  unCoyoneda
};
