import * as $runtime from "../runtime.js";
import * as Data$dLazy from "../Data.Lazy/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as PureScript$dCST$dTypes from "../PureScript.CST.Types/index.js";
const $TokenStep = (tag, _1, _2, _3, _4) => ({tag, _1, _2, _3, _4});
const TokenEOF = value0 => value1 => $TokenStep("TokenEOF", value0, value1);
const TokenError = value0 => value1 => value2 => value3 => $TokenStep("TokenError", value0, value1, value2, value3);
const TokenCons = value0 => value1 => value2 => value3 => $TokenStep("TokenCons", value0, value1, value2, value3);
const TokenStream = x => x;
const newtypeTokenStream = {Coercible0: () => undefined};
const step = x => Data$dLazy.force(x);
const unwindLayout = pos => eof => {
  const go = stk => Data$dLazy.defer(v => {
    if (stk.tag === "Nil") { return Data$dLazy.force(eof); }
    if (stk.tag === "Cons") {
      if (stk._1._2.tag === "LytRoot") { return Data$dLazy.force(eof); }
      if (
        stk._1._2.tag === "LytLet" || (
          stk._1._2.tag === "LytLetStmt" || (stk._1._2.tag === "LytWhere" || (stk._1._2.tag === "LytOf" || (stk._1._2.tag === "LytDo" || stk._1._2.tag === "LytAdo")))
        )
      ) {
        return $TokenStep(
          "TokenCons",
          {range: {start: pos, end: pos}, leadingComments: [], trailingComments: [], value: PureScript$dCST$dTypes.$Token("TokLayoutEnd", stk._1._1.column)},
          pos,
          go(stk._2),
          stk._2
        );
      }
      return Data$dLazy.force(go(stk._2));
    }
    $runtime.fail();
  });
  return go;
};
const layoutStack = stream => {
  const v = Data$dLazy.force(stream);
  if (v.tag === "TokenEOF") { return Data$dList$dTypes.Nil; }
  if (v.tag === "TokenError") { return v._4; }
  if (v.tag === "TokenCons") { return v._4; }
  $runtime.fail();
};
const consTokens = dictFoldable => {
  const $1 = dictFoldable.foldr(v => v1 => Data$dTuple.$Tuple(v._1.range.start, Data$dLazy.defer(v2 => $TokenStep("TokenCons", v._1, v1._1, v1._2, v._2))));
  return b => a => $1(a)(b);
};
export {$TokenStep, TokenCons, TokenEOF, TokenError, TokenStream, consTokens, layoutStack, newtypeTokenStream, step, unwindLayout};
