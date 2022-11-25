import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const $Iterator = (_1, _2) => ({tag: "Iterator", _1, _2});
const Iterator = value0 => value1 => $Iterator(value0, value1);
const peek = v => () => {
  const i = v._2.value;
  return v._1(i);
};
const next = v => () => {
  const i = v._2.value;
  const $2 = v._2.value;
  v._2.value = $2 + 1 | 0;
  return v._1(i);
};
const pushWhile = p => iter => array => () => {
  const $$break = {value: false};
  return Control$dMonad$dST$dInternal.while(() => {
    const $4 = $$break.value;
    return !$4;
  })(() => {
    const i = iter._2.value;
    const mx = iter._1(i);
    if (mx.tag === "Just") {
      if (p(mx._1)) {
        Data$dArray$dST.pushAll([mx._1])(array)();
        iter._2.value;
        const $8 = iter._2.value;
        iter._2.value = $8 + 1 | 0;
        return Data$dUnit.unit;
      }
      $$break.value = true;
      return Data$dUnit.unit;
    }
    $$break.value = true;
    return Data$dUnit.unit;
  })();
};
const pushAll = /* #__PURE__ */ pushWhile(v => true);
const iterator = f => {
  const $1 = Iterator(f);
  return () => {
    const $2 = {value: 0};
    return $1($2);
  };
};
const iterate = iter => f => () => {
  const $$break = {value: false};
  return Control$dMonad$dST$dInternal.while(() => {
    const $3 = $$break.value;
    return !$3;
  })(() => {
    const i = iter._2.value;
    const $4 = iter._2.value;
    iter._2.value = $4 + 1 | 0;
    const mx = iter._1(i);
    if (mx.tag === "Just") { return f(mx._1)(); }
    if (mx.tag === "Nothing") {
      $$break.value = true;
      return Data$dUnit.unit;
    }
    $runtime.fail();
  })();
};
const exhausted = /* #__PURE__ */ (() => {
  const $0 = Control$dMonad$dST$dInternal.map_(Data$dMaybe.isNothing);
  return x => $0(() => {
    const i = x._2.value;
    return x._1(i);
  });
})();
export {$Iterator, Iterator, exhausted, iterate, iterator, next, peek, pushAll, pushWhile};
