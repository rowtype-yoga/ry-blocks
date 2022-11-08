import * as $runtime from "../runtime.js";
import * as Data$dConst from "../Data.Const/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dFunctor$dApp from "../Data.Functor.App/index.js";
import * as Data$dFunctor$dCompose from "../Data.Functor.Compose/index.js";
import * as Data$dFunctor$dCoproduct from "../Data.Functor.Coproduct/index.js";
import * as Data$dFunctor$dProduct from "../Data.Functor.Product/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMaybe$dFirst from "../Data.Maybe.First/index.js";
import * as Data$dMaybe$dLast from "../Data.Maybe.Last/index.js";
import * as Data$dMonoid$dAdditive from "../Data.Monoid.Additive/index.js";
import * as Data$dMonoid$dConj from "../Data.Monoid.Conj/index.js";
import * as Data$dMonoid$dDisj from "../Data.Monoid.Disj/index.js";
import * as Data$dMonoid$dDual from "../Data.Monoid.Dual/index.js";
import * as Data$dMonoid$dMultiplicative from "../Data.Monoid.Multiplicative/index.js";
import * as Data$dTraversable$dAccum$dInternal from "../Data.Traversable.Accum.Internal/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import {traverseArrayImpl} from "./foreign.js";
const identity = x => x;
const traverse = dict => dict.traverse;
const traversableTuple = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => map(Data$dTuple.Tuple(v._1))(f(v._2));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dTuple.Tuple(v._1))(v._2);
  },
  Functor0: () => Data$dTuple.functorTuple,
  Foldable1: () => Data$dFoldable.foldableTuple
};
const traversableMultiplicative = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => map(Data$dMonoid$dMultiplicative.Multiplicative)(f(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dMonoid$dMultiplicative.Multiplicative)(v);
  },
  Functor0: () => Data$dMonoid$dMultiplicative.functorMultiplicative,
  Foldable1: () => Data$dFoldable.foldableMultiplicative
};
const traversableMaybe = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => v1 => {
      if (v1.tag === "Nothing") { return dictApplicative.pure(Data$dMaybe.Nothing); }
      if (v1.tag === "Just") { return map(Data$dMaybe.Just)(v(v1._1)); }
      $runtime.fail();
    };
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => {
      if (v.tag === "Nothing") { return dictApplicative.pure(Data$dMaybe.Nothing); }
      if (v.tag === "Just") { return map(Data$dMaybe.Just)(v._1); }
      $runtime.fail();
    };
  },
  Functor0: () => Data$dMaybe.functorMaybe,
  Foldable1: () => Data$dFoldable.foldableMaybe
};
const traversableIdentity = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => map(Data$dIdentity.Identity)(f(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dIdentity.Identity)(v);
  },
  Functor0: () => Data$dIdentity.functorIdentity,
  Foldable1: () => Data$dFoldable.foldableIdentity
};
const traversableEither = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => v1 => {
      if (v1.tag === "Left") { return dictApplicative.pure(Data$dEither.$Either("Left", v1._1)); }
      if (v1.tag === "Right") { return map(Data$dEither.Right)(v(v1._1)); }
      $runtime.fail();
    };
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => {
      if (v.tag === "Left") { return dictApplicative.pure(Data$dEither.$Either("Left", v._1)); }
      if (v.tag === "Right") { return map(Data$dEither.Right)(v._1); }
      $runtime.fail();
    };
  },
  Functor0: () => Data$dEither.functorEither,
  Foldable1: () => Data$dFoldable.foldableEither
};
const traversableDual = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => map(Data$dMonoid$dDual.Dual)(f(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dMonoid$dDual.Dual)(v);
  },
  Functor0: () => Data$dMonoid$dDual.functorDual,
  Foldable1: () => Data$dFoldable.foldableDual
};
const traversableDisj = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => map(Data$dMonoid$dDisj.Disj)(f(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dMonoid$dDisj.Disj)(v);
  },
  Functor0: () => Data$dMonoid$dDisj.functorDisj,
  Foldable1: () => Data$dFoldable.foldableDisj
};
const traversableConst = {
  traverse: dictApplicative => v => v1 => dictApplicative.pure(v1),
  sequence: dictApplicative => v => dictApplicative.pure(v),
  Functor0: () => Data$dConst.functorConst,
  Foldable1: () => Data$dFoldable.foldableConst
};
const traversableConj = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => map(Data$dMonoid$dConj.Conj)(f(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dMonoid$dConj.Conj)(v);
  },
  Functor0: () => Data$dMonoid$dConj.functorConj,
  Foldable1: () => Data$dFoldable.foldableConj
};
const traversableCompose = dictTraversable => {
  const $1 = dictTraversable.Functor0();
  const $2 = dictTraversable.Foldable1();
  return dictTraversable1 => {
    const $4 = dictTraversable1.Functor0();
    const functorCompose1 = {map: f => v => $1.map($4.map(f))(v)};
    const $6 = dictTraversable1.Foldable1();
    const foldableCompose1 = {
      foldr: f => i => v => $2.foldr((() => {
        const $10 = $6.foldr(f);
        return b => a => $10(a)(b);
      })())(i)(v),
      foldl: f => i => v => $2.foldl($6.foldl(f))(i)(v),
      foldMap: dictMonoid => {
        const foldMap4 = $2.foldMap(dictMonoid);
        const foldMap5 = $6.foldMap(dictMonoid);
        return f => v => foldMap4(foldMap5(f))(v);
      }
    };
    return {
      traverse: dictApplicative => {
        const map = dictApplicative.Apply0().Functor0().map;
        const traverse4 = dictTraversable.traverse(dictApplicative);
        const traverse5 = dictTraversable1.traverse(dictApplicative);
        return f => v => map(Data$dFunctor$dCompose.Compose)(traverse4(traverse5(f))(v));
      },
      sequence: dictApplicative => traversableCompose(dictTraversable)(dictTraversable1).traverse(dictApplicative)(identity),
      Functor0: () => functorCompose1,
      Foldable1: () => foldableCompose1
    };
  };
};
const traversableAdditive = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return f => v => map(Data$dMonoid$dAdditive.Additive)(f(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    return v => map(Data$dMonoid$dAdditive.Additive)(v);
  },
  Functor0: () => Data$dMonoid$dAdditive.functorAdditive,
  Foldable1: () => Data$dFoldable.foldableAdditive
};
const sequenceDefault = dictTraversable => dictApplicative => dictTraversable.traverse(dictApplicative)(identity);
const traversableArray = {
  traverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(Apply0.apply)(Apply0.Functor0().map)(dictApplicative.pure);
  },
  sequence: dictApplicative => traversableArray.traverse(dictApplicative)(identity),
  Functor0: () => Data$dFunctor.functorArray,
  Foldable1: () => Data$dFoldable.foldableArray
};
const sequence = dict => dict.sequence;
const traversableApp = dictTraversable => {
  const functorApp = dictTraversable.Functor0();
  const $2 = dictTraversable.Foldable1();
  const foldableApp = {foldr: f => i => v => $2.foldr(f)(i)(v), foldl: f => i => v => $2.foldl(f)(i)(v), foldMap: dictMonoid => $2.foldMap(dictMonoid)};
  return {
    traverse: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const traverse3 = dictTraversable.traverse(dictApplicative);
      return f => v => map(Data$dFunctor$dApp.App)(traverse3(f)(v));
    },
    sequence: dictApplicative => {
      const map = dictApplicative.Apply0().Functor0().map;
      const sequence3 = dictTraversable.sequence(dictApplicative);
      return v => map(Data$dFunctor$dApp.App)(sequence3(v));
    },
    Functor0: () => functorApp,
    Foldable1: () => foldableApp
  };
};
const traversableCoproduct = dictTraversable => {
  const functorCoproduct = Data$dFunctor$dCoproduct.functorCoproduct(dictTraversable.Functor0());
  const foldableCoproduct = Data$dFoldable.foldableCoproduct(dictTraversable.Foldable1());
  return dictTraversable1 => {
    const functorCoproduct1 = functorCoproduct(dictTraversable1.Functor0());
    const foldableCoproduct1 = foldableCoproduct(dictTraversable1.Foldable1());
    return {
      traverse: dictApplicative => {
        const map = dictApplicative.Apply0().Functor0().map;
        const traverse4 = dictTraversable.traverse(dictApplicative);
        const traverse5 = dictTraversable1.traverse(dictApplicative);
        return f => {
          const $11 = map(x => Data$dEither.$Either("Left", x));
          const $12 = traverse4(f);
          const $13 = map(x => Data$dEither.$Either("Right", x));
          const $14 = traverse5(f);
          return v2 => {
            if (v2.tag === "Left") { return $11($12(v2._1)); }
            if (v2.tag === "Right") { return $13($14(v2._1)); }
            $runtime.fail();
          };
        };
      },
      sequence: dictApplicative => {
        const map = dictApplicative.Apply0().Functor0().map;
        const $8 = map(x => Data$dEither.$Either("Left", x));
        const $9 = dictTraversable.sequence(dictApplicative);
        const $10 = map(x => Data$dEither.$Either("Right", x));
        const $11 = dictTraversable1.sequence(dictApplicative);
        return v2 => {
          if (v2.tag === "Left") { return $8($9(v2._1)); }
          if (v2.tag === "Right") { return $10($11(v2._1)); }
          $runtime.fail();
        };
      },
      Functor0: () => functorCoproduct1,
      Foldable1: () => foldableCoproduct1
    };
  };
};
const traversableFirst = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    const traverse2 = traversableMaybe.traverse(dictApplicative);
    return f => v => map(Data$dMaybe$dFirst.First)(traverse2(f)(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    const sequence2 = traversableMaybe.sequence(dictApplicative);
    return v => map(Data$dMaybe$dFirst.First)(sequence2(v));
  },
  Functor0: () => Data$dMaybe.functorMaybe,
  Foldable1: () => Data$dFoldable.foldableFirst
};
const traversableLast = {
  traverse: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    const traverse2 = traversableMaybe.traverse(dictApplicative);
    return f => v => map(Data$dMaybe$dLast.Last)(traverse2(f)(v));
  },
  sequence: dictApplicative => {
    const map = dictApplicative.Apply0().Functor0().map;
    const sequence2 = traversableMaybe.sequence(dictApplicative);
    return v => map(Data$dMaybe$dLast.Last)(sequence2(v));
  },
  Functor0: () => Data$dMaybe.functorMaybe,
  Foldable1: () => Data$dFoldable.foldableLast
};
const traversableProduct = dictTraversable => {
  const functorProduct = Data$dFunctor$dProduct.functorProduct(dictTraversable.Functor0());
  const foldableProduct = Data$dFoldable.foldableProduct(dictTraversable.Foldable1());
  return dictTraversable1 => {
    const functorProduct1 = functorProduct(dictTraversable1.Functor0());
    const foldableProduct1 = foldableProduct(dictTraversable1.Foldable1());
    return {
      traverse: dictApplicative => {
        const $7 = dictApplicative.Apply0();
        const map = $7.Functor0().map;
        const traverse4 = dictTraversable.traverse(dictApplicative);
        const traverse5 = dictTraversable1.traverse(dictApplicative);
        return f => v => $7.apply(map(Data$dFunctor$dProduct.product)(traverse4(f)(v._1)))(traverse5(f)(v._2));
      },
      sequence: dictApplicative => {
        const $7 = dictApplicative.Apply0();
        const map = $7.Functor0().map;
        const sequence4 = dictTraversable.sequence(dictApplicative);
        const sequence5 = dictTraversable1.sequence(dictApplicative);
        return v => $7.apply(map(Data$dFunctor$dProduct.product)(sequence4(v._1)))(sequence5(v._2));
      },
      Functor0: () => functorProduct1,
      Foldable1: () => foldableProduct1
    };
  };
};
const traverseDefault = dictTraversable => {
  const map = dictTraversable.Functor0().map;
  return dictApplicative => {
    const sequence3 = dictTraversable.sequence(dictApplicative);
    return f => ta => sequence3(map(f)(ta));
  };
};
const mapAccumR = dictTraversable => {
  const traverse2 = dictTraversable.traverse(Data$dTraversable$dAccum$dInternal.applicativeStateR);
  return f => s0 => xs => traverse2(a => s => f(s)(a))(xs)(s0);
};
const scanr = dictTraversable => {
  const mapAccumR1 = mapAccumR(dictTraversable);
  return f => b0 => xs => mapAccumR1(b => a => {
    const b$p = f(a)(b);
    return {accum: b$p, value: b$p};
  })(b0)(xs).value;
};
const mapAccumL = dictTraversable => {
  const traverse2 = dictTraversable.traverse(Data$dTraversable$dAccum$dInternal.applicativeStateL);
  return f => s0 => xs => traverse2(a => s => f(s)(a))(xs)(s0);
};
const scanl = dictTraversable => {
  const mapAccumL1 = mapAccumL(dictTraversable);
  return f => b0 => xs => mapAccumL1(b => a => {
    const b$p = f(b)(a);
    return {accum: b$p, value: b$p};
  })(b0)(xs).value;
};
const $$for = dictApplicative => dictTraversable => {
  const traverse2 = dictTraversable.traverse(dictApplicative);
  return x => f => traverse2(f)(x);
};
export {
  $$for as for,
  identity,
  mapAccumL,
  mapAccumR,
  scanl,
  scanr,
  sequence,
  sequenceDefault,
  traversableAdditive,
  traversableApp,
  traversableArray,
  traversableCompose,
  traversableConj,
  traversableConst,
  traversableCoproduct,
  traversableDisj,
  traversableDual,
  traversableEither,
  traversableFirst,
  traversableIdentity,
  traversableLast,
  traversableMaybe,
  traversableMultiplicative,
  traversableProduct,
  traversableTuple,
  traverse,
  traverseDefault
};
export * from "./foreign.js";
