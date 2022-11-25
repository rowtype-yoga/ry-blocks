import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dLazy from "../Data.Lazy/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as PureScript$dCST$dLexer from "../PureScript.CST.Lexer/index.js";
import * as Tidy$dPrecedence from "../Tidy.Precedence/index.js";
const ordMaybe = /* #__PURE__ */ Data$dMaybe.ordMaybe(Data$dOrd.ordString);
const union = /* #__PURE__ */ Data$dMap$dInternal.union(/* #__PURE__ */ Data$dTuple.ordTuple(Tidy$dPrecedence.ordOperatorNamespace)(Data$dOrd.ordString));
const resolveOperatorExports = precMap => v => {
  const remappedPrecMap = Tidy$dPrecedence.remapOperators(precMap)(v);
  if (v.header.exports.tag === "Nothing") {
    return Data$dFoldable.foldlArray(pm => v1 => {
      if (v1.tag === "DeclFixity") {
        if (v1._1.operator.tag === "FixityValue") {
          return Tidy$dPrecedence.insertOperator(Tidy$dPrecedence.$QualifiedOperator(
            Data$dMaybe.$Maybe("Just", v.header.name.name),
            Tidy$dPrecedence.OperatorValue,
            v1._1.operator._3.name
          ))(v1._1.prec._2)(pm);
        }
        if (v1._1.operator.tag === "FixityType") {
          return Tidy$dPrecedence.insertOperator(Tidy$dPrecedence.$QualifiedOperator(
            Data$dMaybe.$Maybe("Just", v.header.name.name),
            Tidy$dPrecedence.OperatorType,
            v1._1.operator._4.name
          ))(v1._1.prec._2)(pm);
        }
        $runtime.fail();
      }
      return pm;
    })(precMap)(v.body.decls);
  }
  if (v.header.exports.tag === "Just") {
    return Data$dFoldable.foldlArray(pm => x => {
      if (x.tag === "ExportOp") {
        const $5 = Tidy$dPrecedence.lookupOperator(Tidy$dPrecedence.$QualifiedOperator(Data$dMaybe.Nothing, Tidy$dPrecedence.OperatorValue, x._1.name))(remappedPrecMap);
        if ($5.tag === "Just") {
          return Tidy$dPrecedence.insertOperator(Tidy$dPrecedence.$QualifiedOperator(Data$dMaybe.$Maybe("Just", v.header.name.name), Tidy$dPrecedence.OperatorValue, x._1.name))($5._1)(pm);
        }
        if ($5.tag === "Nothing") { return pm; }
        $runtime.fail();
      }
      if (x.tag === "ExportTypeOp") {
        const $5 = Tidy$dPrecedence.lookupOperator(Tidy$dPrecedence.$QualifiedOperator(Data$dMaybe.Nothing, Tidy$dPrecedence.OperatorType, x._2.name))(remappedPrecMap);
        if ($5.tag === "Just") {
          return Tidy$dPrecedence.insertOperator(Tidy$dPrecedence.$QualifiedOperator(Data$dMaybe.$Maybe("Just", v.header.name.name), Tidy$dPrecedence.OperatorType, x._2.name))($5._1)(pm);
        }
        if ($5.tag === "Nothing") { return pm; }
        $runtime.fail();
      }
      if (x.tag === "ExportModule") {
        const $5 = Data$dMap$dInternal.lookup(ordMaybe)(Data$dMaybe.$Maybe("Just", x._2.name))(remappedPrecMap);
        if ($5.tag === "Just") { return Data$dMap$dInternal.insertWith(ordMaybe)(union)(Data$dMaybe.$Maybe("Just", v.header.name.name))($5._1)(pm); }
        if ($5.tag === "Nothing") { return pm; }
        $runtime.fail();
      }
      return pm;
    })(precMap)(Data$dSemigroup.concatArray([v.header.exports._1.value.head])(Data$dFunctor.arrayMap(Data$dTuple.snd)(v.header.exports._1.value.tail)));
  }
  $runtime.fail();
};
const parseOperatorPrec = /* #__PURE__ */ (() => {
  const $0 = (() => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const acc = go$a0, x = go$a1;
        const $3 = Data$dLazy.force(x);
        if ($3.tag === "TokenEOF") {
          go$c = false;
          go$r = Data$dEither.$Either("Right", acc);
          continue;
        }
        if ($3.tag === "TokenError") {
          go$c = false;
          go$r = Data$dEither.$Either("Left", $3._2);
          continue;
        }
        if ($3.tag === "TokenCons") {
          go$a0 = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([$3._1.value]))(acc));
          go$a1 = $3._3;
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go([]);
  })();
  return x => {
    const $2 = $0(PureScript$dCST$dLexer.lex(x));
    if ($2.tag === "Right") {
      if ($2._1.length === 2) {
        if ($2._1[0].tag === "TokSymbolName") {
          if ($2._1[1].tag === "TokInt") {
            if ($2._1[1]._2.tag === "SmallInt") {
              return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(Tidy$dPrecedence.$QualifiedOperator($2._1[0]._1, Tidy$dPrecedence.OperatorValue, $2._1[0]._2), $2._1[1]._2._1));
            }
            return Data$dMaybe.Nothing;
          }
          return Data$dMaybe.Nothing;
        }
        return Data$dMaybe.Nothing;
      }
      if ($2._1.length === 3) {
        if ($2._1[0].tag === "TokSymbolName") {
          if ($2._1[1].tag === "TokLowerName") {
            if ($2._1[1]._1.tag === "Nothing") {
              if ($2._1[1]._2 === "type") {
                if ($2._1[2].tag === "TokInt") {
                  if ($2._1[2]._2.tag === "SmallInt") {
                    return Data$dMaybe.$Maybe(
                      "Just",
                      Data$dTuple.$Tuple(Tidy$dPrecedence.$QualifiedOperator($2._1[0]._1, Tidy$dPrecedence.OperatorType, $2._1[0]._2), $2._1[2]._2._1)
                    );
                  }
                  return Data$dMaybe.Nothing;
                }
                return Data$dMaybe.Nothing;
              }
              return Data$dMaybe.Nothing;
            }
            return Data$dMaybe.Nothing;
          }
          return Data$dMaybe.Nothing;
        }
        return Data$dMaybe.Nothing;
      }
      return Data$dMaybe.Nothing;
    }
    return Data$dMaybe.Nothing;
  };
})();
const parseOperatorTable = /* #__PURE__ */ (() => {
  const $0 = Data$dFoldable.foldrArray(v => Tidy$dPrecedence.insertOperator(v._1)(v._2))(Data$dMap$dInternal.Leaf);
  return x => $0(Data$dArray.mapMaybe(parseOperatorPrec)(x));
})();
export {ordMaybe, parseOperatorPrec, parseOperatorTable, resolveOperatorExports, union};
