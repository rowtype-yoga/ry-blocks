import * as $runtime from "../runtime.js";
import * as Data$dBifoldable from "../Data.Bifoldable/index.js";
import * as Data$dBifunctor from "../Data.Bifunctor/index.js";
import * as Data$dConst from "../Data.Const/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFunctor$dClown from "../Data.Functor.Clown/index.js";
import * as Data$dFunctor$dFlip from "../Data.Functor.Flip/index.js";
import * as Data$dFunctor$dJoker from "../Data.Functor.Joker/index.js";
import * as Data$dFunctor$dProduct2 from "../Data.Functor.Product2/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const identity = x => x;
const bitraverse = dict => dict.bitraverse;
const lfor = dictBitraversable => dictApplicative => {
  const bitraverse2 = dictBitraversable.bitraverse(dictApplicative);
  return t => f => bitraverse2(f)(dictApplicative.pure)(t);
};
const ltraverse = dictBitraversable => dictApplicative => {
  const bitraverse2 = dictBitraversable.bitraverse(dictApplicative);
  return f => bitraverse2(f)(dictApplicative.pure);
};
const rfor = dictBitraversable => dictApplicative => {
  const bitraverse2 = dictBitraversable.bitraverse(dictApplicative);
  return t => f => bitraverse2(dictApplicative.pure)(f)(t);
};
const rtraverse = dictBitraversable => dictApplicative => dictBitraversable.bitraverse(dictApplicative)(dictApplicative.pure);
const bitraversableTuple = {
  bitraverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map = Apply0.Functor0().map;
    return f => g => v => Apply0.apply(map(Data$dTuple.Tuple)(f(v._1)))(g(v._2));
  },
  bisequence: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    const map = Apply0.Functor0().map;
    return v => Apply0.apply(map(Data$dTuple.Tuple)(v._1))(v._2);
  },
  Bifunctor0: () => Data$dBifunctor.bifunctorTuple,
  Bifoldable1: () => Data$dBifoldable.bifoldableTuple
};
const bitraversableJoker = dictTraversable => {
  const $1 = dictTraversable.Functor0();
  const bifunctorJoker = {bimap: v => g => v1 => $1.map(g)(v1)};
  const $3 = dictTraversable.Foldable1();
  const bifoldableJoker = {
    bifoldr: v => r => u => v1 => $3.foldr(r)(u)(v1),
    bifoldl: v => r => u => v1 => $3.foldl(r)(u)(v1),
    bifoldMap: dictMonoid => {
      const foldMap1 = $3.foldMap(dictMonoid);
      return v => r => v1 => foldMap1(r)(v1);
    }
  };
  return {
    bitraverse: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const traverse1 = dictTraversable.traverse(dictApplicative);
      return v => r => v1 => map(Data$dFunctor$dJoker.Joker)(traverse1(r)(v1));
    },
    bisequence: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const sequence1 = dictTraversable.sequence(dictApplicative);
      return v => map(Data$dFunctor$dJoker.Joker)(sequence1(v));
    },
    Bifunctor0: () => bifunctorJoker,
    Bifoldable1: () => bifoldableJoker
  };
};
const bitraversableEither = {
  bitraverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => v1 => v2 => {
      if (v2.tag === "Left") { return map(Data$dEither.Left)(v(v2._1)); }
      if (v2.tag === "Right") { return map(Data$dEither.Right)(v1(v2._1)); }
      $runtime.fail();
    };
  },
  bisequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => {
      if (v.tag === "Left") { return map(Data$dEither.Left)(v._1); }
      if (v.tag === "Right") { return map(Data$dEither.Right)(v._1); }
      $runtime.fail();
    };
  },
  Bifunctor0: () => Data$dBifunctor.bifunctorEither,
  Bifoldable1: () => Data$dBifoldable.bifoldableEither
};
const bitraversableConst = {
  bitraverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => v1 => map(Data$dConst.Const)(f(v1));
  },
  bisequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dConst.Const)(v);
  },
  Bifunctor0: () => Data$dBifunctor.bifunctorConst,
  Bifoldable1: () => Data$dBifoldable.bifoldableConst
};
const bitraversableClown = dictTraversable => {
  const $1 = dictTraversable.Functor0();
  const bifunctorClown = {bimap: f => v => v1 => $1.map(f)(v1)};
  const $3 = dictTraversable.Foldable1();
  const bifoldableClown = {
    bifoldr: l => v => u => v1 => $3.foldr(l)(u)(v1),
    bifoldl: l => v => u => v1 => $3.foldl(l)(u)(v1),
    bifoldMap: dictMonoid => {
      const foldMap1 = $3.foldMap(dictMonoid);
      return l => v => v1 => foldMap1(l)(v1);
    }
  };
  return {
    bitraverse: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const traverse1 = dictTraversable.traverse(dictApplicative);
      return l => v => v1 => map(Data$dFunctor$dClown.Clown)(traverse1(l)(v1));
    },
    bisequence: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const sequence1 = dictTraversable.sequence(dictApplicative);
      return v => map(Data$dFunctor$dClown.Clown)(sequence1(v));
    },
    Bifunctor0: () => bifunctorClown,
    Bifoldable1: () => bifoldableClown
  };
};
const bisequenceDefault = dictBitraversable => dictApplicative => dictBitraversable.bitraverse(dictApplicative)(identity)(identity);
const bisequence = dict => dict.bisequence;
const bitraversableFlip = dictBitraversable => {
  const $1 = dictBitraversable.Bifunctor0();
  const bifunctorFlip = {bimap: f => g => v => $1.bimap(g)(f)(v)};
  const $3 = dictBitraversable.Bifoldable1();
  const bifoldableFlip = {
    bifoldr: r => l => u => v => $3.bifoldr(l)(r)(u)(v),
    bifoldl: r => l => u => v => $3.bifoldl(l)(r)(u)(v),
    bifoldMap: dictMonoid => {
      const bifoldMap2 = $3.bifoldMap(dictMonoid);
      return r => l => v => bifoldMap2(l)(r)(v);
    }
  };
  return {
    bitraverse: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const bitraverse2 = dictBitraversable.bitraverse(dictApplicative);
      return r => l => v => map(Data$dFunctor$dFlip.Flip)(bitraverse2(l)(r)(v));
    },
    bisequence: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const bisequence2 = dictBitraversable.bisequence(dictApplicative);
      return v => map(Data$dFunctor$dFlip.Flip)(bisequence2(v));
    },
    Bifunctor0: () => bifunctorFlip,
    Bifoldable1: () => bifoldableFlip
  };
};
const bitraversableProduct2 = dictBitraversable => {
  const bifunctorProduct2 = Data$dFunctor$dProduct2.bifunctorProduct2(dictBitraversable.Bifunctor0());
  const bifoldableProduct2 = Data$dBifoldable.bifoldableProduct2(dictBitraversable.Bifoldable1());
  return dictBitraversable1 => {
    const bifunctorProduct21 = bifunctorProduct2(dictBitraversable1.Bifunctor0());
    const bifoldableProduct21 = bifoldableProduct2(dictBitraversable1.Bifoldable1());
    return {
      bitraverse: dictApplicative => {
        const Apply0 = dictApplicative.Apply0();
        const map = Apply0.Functor0().map;
        const bitraverse3 = dictBitraversable.bitraverse(dictApplicative);
        const bitraverse4 = dictBitraversable1.bitraverse(dictApplicative);
        return l => r => v => Apply0.apply(map(Data$dFunctor$dProduct2.Product2)(bitraverse3(l)(r)(v._1)))(bitraverse4(l)(r)(v._2));
      },
      bisequence: dictApplicative => {
        const Apply0 = dictApplicative.Apply0();
        const map = Apply0.Functor0().map;
        const bisequence3 = dictBitraversable.bisequence(dictApplicative);
        const bisequence4 = dictBitraversable1.bisequence(dictApplicative);
        return v => Apply0.apply(map(Data$dFunctor$dProduct2.Product2)(bisequence3(v._1)))(bisequence4(v._2));
      },
      Bifunctor0: () => bifunctorProduct21,
      Bifoldable1: () => bifoldableProduct21
    };
  };
};
const bitraverseDefault = dictBitraversable => {
  const bimap = dictBitraversable.Bifunctor0().bimap;
  return dictApplicative => {
    const bisequence2 = dictBitraversable.bisequence(dictApplicative);
    return f => g => t => bisequence2(bimap(f)(g)(t));
  };
};
const bifor = dictBitraversable => dictApplicative => {
  const bitraverse2 = dictBitraversable.bitraverse(dictApplicative);
  return t => f => g => bitraverse2(f)(g)(t);
};
export {
  bifor,
  bisequence,
  bisequenceDefault,
  bitraversableClown,
  bitraversableConst,
  bitraversableEither,
  bitraversableFlip,
  bitraversableJoker,
  bitraversableProduct2,
  bitraversableTuple,
  bitraverse,
  bitraverseDefault,
  identity,
  lfor,
  ltraverse,
  rfor,
  rtraverse
};
