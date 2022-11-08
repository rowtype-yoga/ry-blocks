import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dLazy from "../Data.Lazy/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as PureScript$dCST$dLexer from "../PureScript.CST.Lexer/index.js";
import * as PureScript$dCST$dParser from "../PureScript.CST.Parser/index.js";
import * as PureScript$dCST$dParser$dMonad from "../PureScript.CST.Parser.Monad/index.js";
import * as PureScript$dCST$dPrint from "../PureScript.CST.Print/index.js";
import * as PureScript$dCST$dRange from "../PureScript.CST.Range/index.js";
import * as PureScript$dCST$dRange$dTokenList from "../PureScript.CST.Range.TokenList/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const $RecoveredParserResult = (tag, _1, _2) => ({tag, _1, _2});
const foldMap = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap(Data$dMonoid.monoidString))();
const ParseSucceeded = value0 => $RecoveredParserResult("ParseSucceeded", value0);
const ParseSucceededWithErrors = value0 => value1 => $RecoveredParserResult("ParseSucceededWithErrors", value0, value1);
const ParseFailed = value0 => $RecoveredParserResult("ParseFailed", value0);
const PartialModule = x => x;
const toRecoveredParserResult = v => {
  if (v.tag === "Right") {
    if (v._1._2.length > 0) { return $RecoveredParserResult("ParseSucceededWithErrors", v._1._1, v._1._2); }
    if (v.tag === "Right") { return $RecoveredParserResult("ParseSucceeded", v._1._1); }
    if (v.tag === "Left") { return $RecoveredParserResult("ParseFailed", v._1); }
    $runtime.fail();
  }
  if (v.tag === "Right") { return $RecoveredParserResult("ParseSucceeded", v._1._1); }
  if (v.tag === "Left") { return $RecoveredParserResult("ParseFailed", v._1); }
  $runtime.fail();
};
const toRecovered = Unsafe$dCoerce.unsafeCoerce;
const runRecoveredParser = p => x => toRecoveredParserResult(PureScript$dCST$dParser$dMonad.fromParserResult(PureScript$dCST$dParser$dMonad.runParser$p({
  consumed: false,
  errors: [],
  stream: PureScript$dCST$dLexer.lex(x)
})(p)));
const printModule = dictTokensOf => {
  const tokensOf = PureScript$dCST$dRange.tokensOfModule(dictTokensOf).tokensOf;
  return mod => foldMap(PureScript$dCST$dPrint.printSourceTokenWithOption(PureScript$dCST$dPrint.HideLayout))(PureScript$dCST$dRange$dTokenList.toArray(tokensOf(mod))) + foldMap(PureScript$dCST$dPrint.printComment(PureScript$dCST$dPrint.printLineFeed))(mod.body.trailingComments);
};
const parseType = /* #__PURE__ */ runRecoveredParser(PureScript$dCST$dParser.parseType);
const parsePartialModule = src => toRecoveredParserResult((() => {
  const v = PureScript$dCST$dParser$dMonad.runParser$p({consumed: false, errors: [], stream: PureScript$dCST$dLexer.lex(src)})(PureScript$dCST$dParser.parseModuleHeader);
  if (v.tag === "ParseSucc") {
    return Data$dEither.$Either(
      "Right",
      Data$dTuple.$Tuple(
        {
          header: v._1,
          full: Data$dLazy.defer(v1 => toRecoveredParserResult(PureScript$dCST$dParser$dMonad.fromParserResult(PureScript$dCST$dParser$dMonad.runParser$p(v._2)((
            state1,
            more,
            resume,
            done
          ) => PureScript$dCST$dParser.parseModuleBody(state1, more, resume, (state2, a) => more(v1$1 => done(state2, {header: v._1, body: a})))))))
        },
        v._2.errors
      )
    );
  }
  if (v.tag === "ParseFail") { return Data$dEither.$Either("Left", v._1); }
  $runtime.fail();
})());
const parseModule = /* #__PURE__ */ runRecoveredParser(PureScript$dCST$dParser.parseModule);
const parseImportDecl = /* #__PURE__ */ runRecoveredParser(PureScript$dCST$dParser.parseImportDecl);
const parseExpr = /* #__PURE__ */ runRecoveredParser(PureScript$dCST$dParser.parseExpr);
const parseDecl = /* #__PURE__ */ runRecoveredParser(PureScript$dCST$dParser.parseDecl);
const parseBinder = /* #__PURE__ */ runRecoveredParser(PureScript$dCST$dParser.parseBinder);
export {
  $RecoveredParserResult,
  ParseFailed,
  ParseSucceeded,
  ParseSucceededWithErrors,
  PartialModule,
  foldMap,
  parseBinder,
  parseDecl,
  parseExpr,
  parseImportDecl,
  parseModule,
  parsePartialModule,
  parseType,
  printModule,
  runRecoveredParser,
  toRecovered,
  toRecoveredParserResult
};
