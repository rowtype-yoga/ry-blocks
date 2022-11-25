import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const $OperatorNamespace = tag => ({tag});
const $OperatorStk = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $OperatorTree = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $QualifiedOperator = (_1, _2, _3) => ({tag: "QualifiedOperator", _1, _2, _3});
const ordMaybe = /* #__PURE__ */ Data$dMaybe.ordMaybe(Data$dOrd.ordString);
const foldMap = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap(Data$dMonoid.monoidArray))();
const OperatorType = /* #__PURE__ */ $OperatorNamespace("OperatorType");
const OperatorValue = /* #__PURE__ */ $OperatorNamespace("OperatorValue");
const QualifiedOperator = value0 => value1 => value2 => $QualifiedOperator(value0, value1, value2);
const OpList = value0 => value1 => value2 => $OperatorTree("OpList", value0, value1, value2);
const OpPure = value0 => $OperatorTree("OpPure", value0);
const OpHead = value0 => $OperatorStk("OpHead", value0);
const OpPrec = value0 => value1 => value2 => $OperatorStk("OpPrec", value0, value1, value2);
const snoc = prevOps => nextPrec => nextOps => {
  const $3 = Data$dArray.unsnoc(prevOps);
  const v = (() => {
    if ($3.tag === "Just") { return $3._1; }
    $runtime.fail();
  })();
  return Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v.last._1, $OperatorTree("OpList", v.last._2, nextPrec, nextOps))]))(v.init));
};
const unwind = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => go$a2$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$a2 = go$a2$copy, go$c = true, go$r;
    while (go$c) {
      const prec = go$a0, ops = go$a1, v = go$a2;
      if (v.tag === "OpHead") {
        go$c = false;
        go$r = $OperatorTree("OpList", v._1, prec, ops);
        continue;
      }
      if (v.tag === "OpPrec") {
        go$a0 = v._2;
        go$a1 = snoc(v._3)(prec)(ops);
        go$a2 = v._1;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return v => {
    if (v.tag === "OpHead") { return v._1; }
    if (v.tag === "OpPrec") { return go(v._2)(v._3)(v._1); }
    $runtime.fail();
  };
})();
const push = push$a0$copy => push$a1$copy => {
  let push$a0 = push$a0$copy, push$a1 = push$a1$copy, push$c = true, push$r;
  while (push$c) {
    const stk = push$a0, chs = push$a1;
    if (chs.tag === "Nil") {
      push$c = false;
      push$r = stk;
      continue;
    }
    if (chs.tag === "Cons") {
      if (chs._2.tag === "Nil") {
        if (stk.tag === "OpHead") {
          push$c = false;
          push$r = $OperatorStk("OpPrec", stk, chs._1._1, chs._1._2);
          continue;
        }
        if (stk.tag === "OpPrec") {
          const v = Data$dOrd.ordInt.compare(chs._1._1)(stk._2);
          if (v.tag === "EQ") {
            push$c = false;
            push$r = $OperatorStk("OpPrec", stk._1, stk._2, Data$dSemigroup.concatArray(stk._3)(chs._1._2));
            continue;
          }
          if (v.tag === "GT") {
            push$c = false;
            push$r = $OperatorStk("OpPrec", stk, chs._1._1, chs._1._2);
            continue;
          }
          if (v.tag === "LT") {
            push$a0 = stk._1;
            push$a1 = Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(stk._2, stk._3), chs);
            continue;
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      if (stk.tag === "OpHead") {
        push$a0 = $OperatorStk("OpHead", $OperatorTree("OpList", stk._1, chs._1._1, chs._1._2));
        push$a1 = chs._2;
        continue;
      }
      if (stk.tag === "OpPrec") {
        const v = Data$dOrd.ordInt.compare(chs._1._1)(stk._2);
        if (v.tag === "EQ") {
          push$a0 = $OperatorStk("OpPrec", stk._1, stk._2, Data$dSemigroup.concatArray(stk._3)(chs._1._2));
          push$a1 = chs._2;
          continue;
        }
        if (v.tag === "GT") {
          push$a0 = $OperatorStk("OpPrec", stk._1, stk._2, snoc(stk._3)(chs._1._1)(chs._1._2));
          push$a1 = chs._2;
          continue;
        }
        if (v.tag === "LT") {
          push$a0 = stk._1;
          push$a1 = Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(stk._2, snoc(stk._3)(chs._1._1)(chs._1._2)), chs._2);
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    }
    $runtime.fail();
  };
  return push$r;
};
const eqOperatorNamespace = {
  eq: x => y => {
    if (x.tag === "OperatorType") { return y.tag === "OperatorType"; }
    if (x.tag === "OperatorValue") { return y.tag === "OperatorValue"; }
    return false;
  }
};
const eqQualifiedOperator = {
  eq: x => y => (() => {
    if (x._1.tag === "Nothing") { return y._1.tag === "Nothing"; }
    if (x._1.tag === "Just") {
      if (y._1.tag === "Just") { return x._1._1 === y._1._1; }
      return false;
    }
    return false;
  })() && (() => {
    if (x._2.tag === "OperatorType") { return y._2.tag === "OperatorType"; }
    if (x._2.tag === "OperatorValue") { return y._2.tag === "OperatorValue"; }
    return false;
  })() && x._3 === y._3
};
const ordOperatorNamespace = {
  compare: x => y => {
    if (x.tag === "OperatorType") {
      if (y.tag === "OperatorType") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "OperatorType") { return Data$dOrdering.GT; }
    if (x.tag === "OperatorValue") {
      if (y.tag === "OperatorValue") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqOperatorNamespace
};
const ordTuple = /* #__PURE__ */ Data$dTuple.ordTuple(ordOperatorNamespace)(Data$dOrd.ordString);
const filterKeys = /* #__PURE__ */ Data$dMap$dInternal.filterKeys(ordTuple);
const insertOperator = v => prec => Data$dMap$dInternal.alter(ordMaybe)(v1 => {
  if (v1.tag === "Nothing") {
    return Data$dMaybe.$Maybe("Just", Data$dMap$dInternal.$Map("Two", Data$dMap$dInternal.Leaf, Data$dTuple.$Tuple(v._2, v._3), prec, Data$dMap$dInternal.Leaf));
  }
  if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dMap$dInternal.insert(ordTuple)(Data$dTuple.$Tuple(v._2, v._3))(prec)(v1._1)); }
  $runtime.fail();
})(v._1);
const lookupOperator = v => precMap => {
  const $2 = Data$dMap$dInternal.lookup(ordMaybe)(v._1)(precMap);
  const $3 = Data$dMap$dInternal.lookup(ordTuple)(Data$dTuple.$Tuple(v._2, v._3));
  if ($2.tag === "Just") { return $3($2._1); }
  if ($2.tag === "Nothing") { return Data$dMaybe.Nothing; }
  $runtime.fail();
};
const remapOperatorTo = newModName => v => precMap => {
  const $3 = lookupOperator(v)(precMap);
  if ($3.tag === "Just") { return insertOperator($QualifiedOperator(newModName, v._2, v._3))($3._1)(precMap); }
  if ($3.tag === "Nothing") { return precMap; }
  $runtime.fail();
};
const ordQualifiedOperator = {
  compare: x => y => {
    const v = ordMaybe.compare(x._1)(y._1);
    if (v.tag === "LT") { return Data$dOrdering.LT; }
    if (v.tag === "GT") { return Data$dOrdering.GT; }
    const v1 = ordOperatorNamespace.compare(x._2)(y._2);
    if (v1.tag === "LT") { return Data$dOrdering.LT; }
    if (v1.tag === "GT") { return Data$dOrdering.GT; }
    return Data$dOrd.ordString.compare(x._3)(y._3);
  },
  Eq0: () => eqQualifiedOperator
};
const remapModuleTo = newModName => modName => precMap => {
  const $3 = Data$dMap$dInternal.lookup(ordMaybe)(Data$dMaybe.$Maybe("Just", modName))(precMap);
  if ($3.tag === "Just") {
    return Data$dMap$dInternal.alter(ordMaybe)(v => {
      if (v.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", $3._1); }
      if (v.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dMap$dInternal.unionWith(ordTuple)(Data$dFunction.const)($3._1)(v._1)); }
      $runtime.fail();
    })(newModName)(precMap);
  }
  if ($3.tag === "Nothing") { return precMap; }
  $runtime.fail();
};
const remapModuleToHiding = dictFoldable => {
  const any1 = dictFoldable.foldMap((() => {
    const semigroupDisj1 = {append: v => v1 => v || v1};
    return {mempty: false, Semigroup0: () => semigroupDisj1};
  })());
  return hiding => newModName => modName => precMap => {
    const $6 = Data$dMap$dInternal.lookup(ordMaybe)(Data$dMaybe.$Maybe("Just", modName))(precMap);
    if ($6.tag === "Just") {
      const filteredOps = filterKeys((() => {
        const $7 = QualifiedOperator(Data$dMaybe.$Maybe("Just", modName));
        return x => {
          const $9 = $7(x._1)(x._2);
          return !any1(y => (() => {
            if ($9._1.tag === "Nothing") { return y._1.tag === "Nothing"; }
            if ($9._1.tag === "Just") {
              if (y._1.tag === "Just") { return $9._1._1 === y._1._1; }
              return false;
            }
            return false;
          })() && (() => {
            if ($9._2.tag === "OperatorType") { return y._2.tag === "OperatorType"; }
            if ($9._2.tag === "OperatorValue") { return y._2.tag === "OperatorValue"; }
            return false;
          })() && $9._3 === y._3)(hiding);
        };
      })())($6._1);
      return Data$dMap$dInternal.alter(ordMaybe)(v => {
        if (v.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", filteredOps); }
        if (v.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dMap$dInternal.unionWith(ordTuple)(Data$dFunction.const)(filteredOps)(v._1)); }
        $runtime.fail();
      })(newModName)(precMap);
    }
    if ($6.tag === "Nothing") { return precMap; }
    $runtime.fail();
  };
};
const remapModuleToHiding1 = /* #__PURE__ */ remapModuleToHiding(Data$dFoldable.foldableArray);
const remapOperators = precMap => v => Data$dFoldable.foldlArray(precMap$1 => v$1 => {
  if (v$1.tag === "DeclFixity") {
    if (v$1._1.operator.tag === "FixityValue") {
      return insertOperator($QualifiedOperator(Data$dMaybe.$Maybe("Just", v.header.name.name), OperatorValue, v$1._1.operator._3.name))(v$1._1.prec._2)(insertOperator($QualifiedOperator(
        Data$dMaybe.Nothing,
        OperatorValue,
        v$1._1.operator._3.name
      ))(v$1._1.prec._2)(precMap$1));
    }
    if (v$1._1.operator.tag === "FixityType") {
      return insertOperator($QualifiedOperator(Data$dMaybe.$Maybe("Just", v.header.name.name), OperatorType, v$1._1.operator._4.name))(v$1._1.prec._2)(insertOperator($QualifiedOperator(
        Data$dMaybe.Nothing,
        OperatorType,
        v$1._1.operator._4.name
      ))(v$1._1.prec._2)(precMap$1));
    }
    $runtime.fail();
  }
  return precMap$1;
})(Data$dFoldable.foldlArray(precMap$1 => v$1 => {
  const newModName = (() => {
    if (v$1.qualified.tag === "Just") { return Data$dMaybe.$Maybe("Just", v$1.qualified._1._2.name); }
    return Data$dMaybe.Nothing;
  })();
  if (v$1.names.tag === "Nothing") { return remapModuleTo(newModName)(v$1.module.name)(precMap$1); }
  if (v$1.names.tag === "Just") {
    const impOps = Data$dSemigroup.concatArray((() => {
      if (v$1.names._1._2.value.head.tag === "ImportOp") {
        return [$QualifiedOperator(Data$dMaybe.$Maybe("Just", v$1.module.name), OperatorValue, v$1.names._1._2.value.head._1.name)];
      }
      if (v$1.names._1._2.value.head.tag === "ImportTypeOp") {
        return [$QualifiedOperator(Data$dMaybe.$Maybe("Just", v$1.module.name), OperatorType, v$1.names._1._2.value.head._2.name)];
      }
      return [];
    })())(foldMap(x => {
      if (x._2.tag === "ImportOp") { return [$QualifiedOperator(Data$dMaybe.$Maybe("Just", v$1.module.name), OperatorValue, x._2._1.name)]; }
      if (x._2.tag === "ImportTypeOp") { return [$QualifiedOperator(Data$dMaybe.$Maybe("Just", v$1.module.name), OperatorType, x._2._2.name)]; }
      return [];
    })(v$1.names._1._2.value.tail));
    if (
      (() => {
        if (v$1.names._1._1.tag === "Nothing") { return false; }
        if (v$1.names._1._1.tag === "Just") { return true; }
        $runtime.fail();
      })()
    ) {
      return remapModuleToHiding1(impOps)(newModName)(v$1.module.name)(precMap$1);
    }
    return Data$dFoldable.foldlArray(b => a => remapOperatorTo(newModName)(a)(b))(precMap$1)(impOps);
  }
  $runtime.fail();
})(precMap)(v.header.imports))(v.body.decls);
const defaultPrecedence = 10;
const toOperatorTree = precMap => getOperator => init => {
  const $3 = Data$dFoldable.foldlArray(stk => v => {
    const v1 = getOperator(v._1);
    return push(stk)(Data$dList$dTypes.$List(
      "Cons",
      Data$dTuple.$Tuple(
        (() => {
          const $6 = Data$dMap$dInternal.lookup(ordTuple)(Data$dTuple.$Tuple(v1._2, v1._3));
          const $7 = Data$dMap$dInternal.lookup(ordMaybe)(v1._1)(precMap);
          const $8 = (() => {
            if ($7.tag === "Just") { return $6($7._1); }
            if ($7.tag === "Nothing") { return Data$dMaybe.Nothing; }
            $runtime.fail();
          })();
          if ($8.tag === "Nothing") { return 10; }
          if ($8.tag === "Just") { return $8._1; }
          $runtime.fail();
        })(),
        [Data$dTuple.$Tuple(v._1, $OperatorTree("OpPure", v._2))]
      ),
      Data$dList$dTypes.Nil
    ));
  })($OperatorStk("OpHead", $OperatorTree("OpPure", init)));
  return x => unwind($3(x));
};
export {
  $OperatorNamespace,
  $OperatorStk,
  $OperatorTree,
  $QualifiedOperator,
  OpHead,
  OpList,
  OpPrec,
  OpPure,
  OperatorType,
  OperatorValue,
  QualifiedOperator,
  defaultPrecedence,
  eqOperatorNamespace,
  eqQualifiedOperator,
  filterKeys,
  foldMap,
  insertOperator,
  lookupOperator,
  ordMaybe,
  ordOperatorNamespace,
  ordQualifiedOperator,
  ordTuple,
  push,
  remapModuleTo,
  remapModuleToHiding,
  remapModuleToHiding1,
  remapOperatorTo,
  remapOperators,
  snoc,
  toOperatorTree,
  unwind
};
