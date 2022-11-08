import * as $runtime from "../runtime.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
const identity = x => x;
const parTraverse_ = dictParallel => {
  const traverse_ = Data$dFoldable.traverse_(dictParallel.Applicative1());
  return dictFoldable => {
    const traverse_1 = traverse_(dictFoldable);
    return f => {
      const $5 = traverse_1(x => dictParallel.parallel(f(x)));
      return x => dictParallel.sequential($5(x));
    };
  };
};
const parTraverse = dictParallel => {
  const Applicative1 = dictParallel.Applicative1();
  return dictTraversable => {
    const traverse = dictTraversable.traverse(Applicative1);
    return f => {
      const $5 = traverse(x => dictParallel.parallel(f(x)));
      return x => dictParallel.sequential($5(x));
    };
  };
};
const parSequence_ = dictParallel => {
  const parTraverse_1 = parTraverse_(dictParallel);
  return dictFoldable => parTraverse_1(dictFoldable)(identity);
};
const parSequence = dictParallel => {
  const Applicative1 = dictParallel.Applicative1();
  return dictTraversable => {
    const $3 = dictTraversable.traverse(Applicative1)(x => dictParallel.parallel(x));
    return x => dictParallel.sequential($3(x));
  };
};
const parOneOfMap = dictParallel => dictAlternative => {
  const Plus1 = dictAlternative.Plus1();
  return dictFoldable => {
    const alt = Plus1.Alt0().alt;
    return dictFunctor => f => {
      const $7 = dictFoldable.foldr(x => alt(dictParallel.parallel(f(x))))(Plus1.empty);
      return x => dictParallel.sequential($7(x));
    };
  };
};
const parOneOf = dictParallel => dictAlternative => {
  const Plus1 = dictAlternative.Plus1();
  return dictFoldable => {
    const alt = Plus1.Alt0().alt;
    return dictFunctor => {
      const $6 = dictFoldable.foldr(x => alt(dictParallel.parallel(x)))(Plus1.empty);
      return x => dictParallel.sequential($6(x));
    };
  };
};
const parApply = dictParallel => {
  const apply = dictParallel.Applicative1().Apply0().apply;
  return mf => ma => dictParallel.sequential(apply(dictParallel.parallel(mf))(dictParallel.parallel(ma)));
};
export {identity, parApply, parOneOf, parOneOfMap, parSequence, parSequence_, parTraverse, parTraverse_};
