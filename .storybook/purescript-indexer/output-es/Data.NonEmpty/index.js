// | This module defines a generic non-empty data structure, which adds an
// | additional element to any container type.
import * as $runtime from "../runtime.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
const $NonEmpty = (_1, _2) => ({tag: "NonEmpty", _1, _2});
const NonEmpty = value0 => value1 => $NonEmpty(value0, value1);
const unfoldable1NonEmpty = dictUnfoldable => (
  {
    unfoldr1: f => b => {
      const $3 = f(b);
      return $NonEmpty($3._1, dictUnfoldable.unfoldr(Data$dMaybe.functorMaybe.map(f))($3._2));
    }
  }
);
const tail = v => v._2;
const singleton = dictPlus => a => $NonEmpty(a, dictPlus.empty);
const showNonEmpty = dictShow => dictShow1 => ({show: v => "(NonEmpty " + (dictShow.show(v._1) + (" " + (dictShow1.show(v._2) + ")")))});
const semigroupNonEmpty = dictApplicative => dictSemigroup => (
  {append: v => v1 => $NonEmpty(v._1, dictSemigroup.append(v._2)(dictSemigroup.append(dictApplicative.pure(v1._1))(v1._2)))}
);
const oneOf = dictAlternative => {
  const alt = dictAlternative.Plus1().Alt0().alt;
  const pure = dictAlternative.Applicative0().pure;
  return v => alt(pure(v._1))(v._2);
};
const head = v => v._1;
const functorNonEmpty = dictFunctor => ({map: f => m => $NonEmpty(f(m._1), dictFunctor.map(f)(m._2))});
const functorWithIndex = dictFunctorWithIndex => {
  const functorNonEmpty1 = functorNonEmpty(dictFunctorWithIndex.Functor0());
  return {
    mapWithIndex: f => v => $NonEmpty(f(Data$dMaybe.Nothing)(v._1), dictFunctorWithIndex.mapWithIndex(x => f(Data$dMaybe.$Maybe("Just", x)))(v._2)),
    Functor0: () => functorNonEmpty1
  };
};
const fromNonEmpty = f => v => f(v._1)(v._2);
const foldableNonEmpty = dictFoldable => (
  {
    foldMap: dictMonoid => {
      const append1 = dictMonoid.Semigroup0().append;
      const foldMap1 = dictFoldable.foldMap(dictMonoid);
      return f => v => append1(f(v._1))(foldMap1(f)(v._2));
    },
    foldl: f => b => v => dictFoldable.foldl(f)(f(b)(v._1))(v._2),
    foldr: f => b => v => f(v._1)(dictFoldable.foldr(f)(b)(v._2))
  }
);
const foldableWithIndexNonEmpty = dictFoldableWithIndex => {
  const $1 = dictFoldableWithIndex.Foldable0();
  const foldableNonEmpty1 = {
    foldMap: dictMonoid => {
      const append1 = dictMonoid.Semigroup0().append;
      const foldMap1 = $1.foldMap(dictMonoid);
      return f => v => append1(f(v._1))(foldMap1(f)(v._2));
    },
    foldl: f => b => v => $1.foldl(f)(f(b)(v._1))(v._2),
    foldr: f => b => v => f(v._1)($1.foldr(f)(b)(v._2))
  };
  return {
    foldMapWithIndex: dictMonoid => {
      const append1 = dictMonoid.Semigroup0().append;
      const foldMapWithIndex1 = dictFoldableWithIndex.foldMapWithIndex(dictMonoid);
      return f => v => append1(f(Data$dMaybe.Nothing)(v._1))(foldMapWithIndex1(x => f(Data$dMaybe.$Maybe("Just", x)))(v._2));
    },
    foldlWithIndex: f => b => v => dictFoldableWithIndex.foldlWithIndex(x => f(Data$dMaybe.$Maybe("Just", x)))(f(Data$dMaybe.Nothing)(b)(v._1))(v._2),
    foldrWithIndex: f => b => v => f(Data$dMaybe.Nothing)(v._1)(dictFoldableWithIndex.foldrWithIndex(x => f(Data$dMaybe.$Maybe("Just", x)))(b)(v._2)),
    Foldable0: () => foldableNonEmpty1
  };
};
const traversableNonEmpty = dictTraversable => {
  const functorNonEmpty1 = functorNonEmpty(dictTraversable.Functor0());
  const $2 = dictTraversable.Foldable1();
  const foldableNonEmpty1 = {
    foldMap: dictMonoid => {
      const append1 = dictMonoid.Semigroup0().append;
      const foldMap1 = $2.foldMap(dictMonoid);
      return f => v => append1(f(v._1))(foldMap1(f)(v._2));
    },
    foldl: f => b => v => $2.foldl(f)(f(b)(v._1))(v._2),
    foldr: f => b => v => f(v._1)($2.foldr(f)(b)(v._2))
  };
  return {
    sequence: dictApplicative => {
      const Apply0 = dictApplicative.Apply0();
      const map2 = Apply0.Functor0().map;
      const sequence1 = dictTraversable.sequence(dictApplicative);
      return v => Apply0.apply(map2(NonEmpty)(v._1))(sequence1(v._2));
    },
    traverse: dictApplicative => {
      const Apply0 = dictApplicative.Apply0();
      const map2 = Apply0.Functor0().map;
      const traverse1 = dictTraversable.traverse(dictApplicative);
      return f => v => Apply0.apply(map2(NonEmpty)(f(v._1)))(traverse1(f)(v._2));
    },
    Functor0: () => functorNonEmpty1,
    Foldable1: () => foldableNonEmpty1
  };
};
const traversableWithIndexNonEmpty = dictTraversableWithIndex => {
  const functorWithIndex1 = functorWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
  const foldableWithIndexNonEmpty1 = foldableWithIndexNonEmpty(dictTraversableWithIndex.FoldableWithIndex1());
  const traversableNonEmpty1 = traversableNonEmpty(dictTraversableWithIndex.Traversable2());
  return {
    traverseWithIndex: dictApplicative => {
      const Apply0 = dictApplicative.Apply0();
      const map2 = Apply0.Functor0().map;
      const traverseWithIndex1 = dictTraversableWithIndex.traverseWithIndex(dictApplicative);
      return f => v => Apply0.apply(map2(NonEmpty)(f(Data$dMaybe.Nothing)(v._1)))(traverseWithIndex1(x => f(Data$dMaybe.$Maybe("Just", x)))(v._2));
    },
    FunctorWithIndex0: () => functorWithIndex1,
    FoldableWithIndex1: () => foldableWithIndexNonEmpty1,
    Traversable2: () => traversableNonEmpty1
  };
};
const foldable1NonEmpty = dictFoldable => {
  const foldableNonEmpty1 = {
    foldMap: dictMonoid => {
      const append1 = dictMonoid.Semigroup0().append;
      const foldMap1 = dictFoldable.foldMap(dictMonoid);
      return f => v => append1(f(v._1))(foldMap1(f)(v._2));
    },
    foldl: f => b => v => dictFoldable.foldl(f)(f(b)(v._1))(v._2),
    foldr: f => b => v => f(v._1)(dictFoldable.foldr(f)(b)(v._2))
  };
  return {
    foldMap1: dictSemigroup => f => v => dictFoldable.foldl(s => a1 => dictSemigroup.append(s)(f(a1)))(f(v._1))(v._2),
    foldr1: f => v => {
      const $4 = f(v._1);
      const $5 = dictFoldable.foldr(a1 => {
        const $6 = f(a1);
        return x => Data$dMaybe.$Maybe(
          "Just",
          (() => {
            if (x.tag === "Nothing") { return a1; }
            if (x.tag === "Just") { return $6(x._1); }
            $runtime.fail();
          })()
        );
      })(Data$dMaybe.Nothing)(v._2);
      if ($5.tag === "Nothing") { return v._1; }
      if ($5.tag === "Just") { return $4($5._1); }
      $runtime.fail();
    },
    foldl1: f => v => dictFoldable.foldl(f)(v._1)(v._2),
    Foldable0: () => foldableNonEmpty1
  };
};
const foldl1 = dictFoldable => foldable1NonEmpty(dictFoldable).foldl1;
const eqNonEmpty = dictEq1 => dictEq => {
  const eq11 = dictEq1.eq1(dictEq);
  return {eq: x => y => dictEq.eq(x._1)(y._1) && eq11(x._2)(y._2)};
};
const ordNonEmpty = dictOrd1 => {
  const $1 = dictOrd1.Eq10();
  return dictOrd => {
    const compare11 = dictOrd1.compare1(dictOrd);
    const $4 = dictOrd.Eq0();
    const eq11 = $1.eq1($4);
    const eqNonEmpty2 = {eq: x => y => $4.eq(x._1)(y._1) && eq11(x._2)(y._2)};
    return {
      compare: x => y => {
        const v = dictOrd.compare(x._1)(y._1);
        if (v.tag === "LT") { return Data$dOrdering.LT; }
        if (v.tag === "GT") { return Data$dOrdering.GT; }
        return compare11(x._2)(y._2);
      },
      Eq0: () => eqNonEmpty2
    };
  };
};
const eq1NonEmpty = dictEq1 => (
  {
    eq1: dictEq => {
      const eq11 = dictEq1.eq1(dictEq);
      return x => y => dictEq.eq(x._1)(y._1) && eq11(x._2)(y._2);
    }
  }
);
const ord1NonEmpty = dictOrd1 => {
  const ordNonEmpty1 = ordNonEmpty(dictOrd1);
  const $2 = dictOrd1.Eq10();
  const eq1NonEmpty1 = {
    eq1: dictEq => {
      const eq11 = $2.eq1(dictEq);
      return x => y => dictEq.eq(x._1)(y._1) && eq11(x._2)(y._2);
    }
  };
  return {compare1: dictOrd => ordNonEmpty1(dictOrd).compare, Eq10: () => eq1NonEmpty1};
};
export {
  $NonEmpty,
  NonEmpty,
  eq1NonEmpty,
  eqNonEmpty,
  foldable1NonEmpty,
  foldableNonEmpty,
  foldableWithIndexNonEmpty,
  foldl1,
  fromNonEmpty,
  functorNonEmpty,
  functorWithIndex,
  head,
  oneOf,
  ord1NonEmpty,
  ordNonEmpty,
  semigroupNonEmpty,
  showNonEmpty,
  singleton,
  tail,
  traversableNonEmpty,
  traversableWithIndexNonEmpty,
  unfoldable1NonEmpty
};
