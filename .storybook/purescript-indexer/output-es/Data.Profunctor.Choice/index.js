import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dProfunctor from "../Data.Profunctor/index.js";
const identity = x => x;
const right = dict => dict.right;
const left = dict => dict.left;
const splitChoice = dictCategory => {
  const $1 = dictCategory.Semigroupoid0();
  return dictChoice => l => r => $1.compose(dictChoice.right(r))(dictChoice.left(l));
};
const fanin = dictCategory => {
  const $1 = dictCategory.Semigroupoid0();
  const $2 = dictCategory.Semigroupoid0();
  return dictChoice => {
    const dimap = dictChoice.Profunctor0().dimap;
    return l => r => $1.compose(dimap(v2 => {
      if (v2.tag === "Left") { return v2._1; }
      if (v2.tag === "Right") { return v2._1; }
      $runtime.fail();
    })(identity)(dictCategory.identity))($2.compose(dictChoice.right(r))(dictChoice.left(l)));
  };
};
const choiceFn = /* #__PURE__ */ (() => (
  {
    left: v => v1 => {
      if (v1.tag === "Left") { return Data$dEither.$Either("Left", v(v1._1)); }
      if (v1.tag === "Right") { return Data$dEither.$Either("Right", v1._1); }
      $runtime.fail();
    },
    right: Data$dEither.functorEither.map,
    Profunctor0: () => Data$dProfunctor.profunctorFn
  }
))();
export {choiceFn, fanin, identity, left, right, splitChoice};
