import * as $runtime from "../runtime.js";
import * as Data$dLazy from "../Data.Lazy/index.js";
import * as Data$dList$dLazy from "../Data.List.Lazy/index.js";
import * as Data$dList$dLazy$dTypes from "../Data.List.Lazy.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const uncons = v => {
  const v1 = Data$dLazy.force(v);
  return {head: v1._1, tail: v1._2};
};
const toList = v => {
  const v1 = Data$dLazy.force(v);
  return Data$dLazy.defer(v$1 => Data$dList$dLazy$dTypes.$Step("Cons", v1._1, v1._2));
};
const toUnfoldable = dictUnfoldable => {
  const $1 = dictUnfoldable.unfoldr(xs => {
    const $2 = Data$dList$dLazy.uncons(xs);
    if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple($2._1.head, $2._1.tail)); }
    return Data$dMaybe.Nothing;
  });
  return x => $1((() => {
    const v1 = Data$dLazy.force(x);
    return Data$dLazy.defer(v => Data$dList$dLazy$dTypes.$Step("Cons", v1._1, v1._2));
  })());
};
const tail = v => Data$dLazy.force(v)._2;
const singleton = /* #__PURE__ */ (() => Data$dList$dLazy$dTypes.applicativeNonEmptyList.pure)();
const repeat = x => Data$dLazy.defer(v => Data$dNonEmpty.$NonEmpty(x, Data$dList$dLazy.repeat(x)));
const length = v => 1 + Data$dList$dLazy.length(Data$dLazy.force(v)._2) | 0;
const last = v => {
  const v1 = Data$dLazy.force(v);
  const $2 = Data$dList$dLazy.last(v1._2);
  if ($2.tag === "Nothing") { return v1._1; }
  if ($2.tag === "Just") { return $2._1; }
  $runtime.fail();
};
const iterate = f => x => Data$dLazy.defer(v => Data$dNonEmpty.$NonEmpty(x, Data$dList$dLazy.iterate(f)(f(x))));
const init = v => {
  const v1 = Data$dLazy.force(v);
  const $2 = Data$dList$dLazy.init(v1._2);
  if ($2.tag === "Nothing") { return Data$dList$dLazy$dTypes.nil; }
  if ($2.tag === "Just") { return Data$dLazy.defer(v$1 => Data$dList$dLazy$dTypes.$Step("Cons", v1._1, $2._1)); }
  $runtime.fail();
};
const head = v => Data$dLazy.force(v)._1;
const fromList = l => {
  const v = Data$dLazy.force(l);
  if (v.tag === "Nil") { return Data$dMaybe.Nothing; }
  if (v.tag === "Cons") { return Data$dMaybe.$Maybe("Just", Data$dLazy.defer(v1 => Data$dNonEmpty.$NonEmpty(v._1, v._2))); }
  $runtime.fail();
};
const fromFoldable = dictFoldable => {
  const $1 = dictFoldable.foldr(Data$dList$dLazy$dTypes.cons)(Data$dList$dLazy$dTypes.nil);
  return x => fromList($1(x));
};
const cons = y => v => Data$dLazy.defer(v1 => {
  const v2 = Data$dLazy.force(v);
  return Data$dNonEmpty.$NonEmpty(y, Data$dLazy.defer(v$1 => Data$dList$dLazy$dTypes.$Step("Cons", v2._1, v2._2)));
});
const concatMap = b => a => Data$dList$dLazy$dTypes.bindNonEmptyList.bind(a)(b);
const appendFoldable = dictFoldable => {
  const fromFoldable1 = dictFoldable.foldr(Data$dList$dLazy$dTypes.cons)(Data$dList$dLazy$dTypes.nil);
  return nel => ys => Data$dLazy.defer(v => Data$dNonEmpty.$NonEmpty(
    Data$dLazy.force(nel)._1,
    Data$dList$dLazy$dTypes.semigroupList.append(Data$dLazy.force(nel)._2)(fromFoldable1(ys))
  ));
};
export {appendFoldable, concatMap, cons, fromFoldable, fromList, head, init, iterate, last, length, repeat, singleton, tail, toList, toUnfoldable, uncons};
