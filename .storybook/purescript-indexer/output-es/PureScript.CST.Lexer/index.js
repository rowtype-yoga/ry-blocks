import * as $runtime from "../runtime.js";
import * as Control$dApply from "../Control.Apply/index.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dEnum from "../Data.Enum/index.js";
import * as Data$dEuclideanRing from "../Data.EuclideanRing/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dLazy from "../Data.Lazy/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dNumber from "../Data.Number/index.js";
import * as Data$dString$dCodePoints from "../Data.String.CodePoints/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data$dString$dCommon from "../Data.String.Common/index.js";
import * as Data$dString$dRegex from "../Data.String.Regex/index.js";
import * as Data$dString$dRegex$dFlags from "../Data.String.Regex.Flags/index.js";
import * as Data$dString$dRegex$dUnsafe from "../Data.String.Regex.Unsafe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Partial from "../Partial/index.js";
import * as PureScript$dCST$dErrors from "../PureScript.CST.Errors/index.js";
import * as PureScript$dCST$dLayout from "../PureScript.CST.Layout/index.js";
import * as PureScript$dCST$dTokenStream from "../PureScript.CST.TokenStream/index.js";
import * as PureScript$dCST$dTypes from "../PureScript.CST.Types/index.js";
const $LexResult = (tag, _1, _2) => ({tag, _1, _2});
const fold1 = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap(Data$dMonoid.monoidRecord()((() => {
  const semigroupRecordCons1 = {appendRecord: v => ra => rb => ({raw: ra.raw + rb.raw, string: ra.string + rb.string})};
  return {memptyRecord: v => ({raw: "", string: ""}), SemigroupRecord0: () => semigroupRecordCons1};
})()))(Data$dFoldable.identity))();
const consTokens = /* #__PURE__ */ PureScript$dCST$dTokenStream.consTokens(Data$dFoldable.foldableArray);
const LexFail = value0 => value1 => $LexResult("LexFail", value0, value1);
const LexSucc = value0 => value1 => $LexResult("LexSucc", value0, value1);
const $$try = v => str => {
  const v1 = v(str);
  if (v1.tag === "LexFail") { return $LexResult("LexFail", v1._1, str); }
  if (v1.tag === "LexSucc") { return $LexResult("LexSucc", v1._1, v1._2); }
  $runtime.fail();
};
const toModuleName = v => {
  if (v === "") { return Data$dMaybe.Nothing; }
  return Data$dMaybe.$Maybe("Just", Data$dString$dCodeUnits.take(Data$dString$dCodeUnits.length(v) - 1 | 0)(v));
};
const optional = v => str => {
  const v1 = v(str);
  if (v1.tag === "LexFail") {
    if (Data$dString$dCodeUnits.length(str) === Data$dString$dCodeUnits.length(v1._2)) { return $LexResult("LexSucc", Data$dMaybe.Nothing, str); }
    return $LexResult("LexFail", v1._1, v1._2);
  }
  if (v1.tag === "LexSucc") { return $LexResult("LexSucc", Data$dMaybe.$Maybe("Just", v1._1), v1._2); }
  $runtime.fail();
};
const mkUnexpected = str => {
  const start = Data$dString$dCodePoints.take(6)(str);
  const len = Data$dString$dCodePoints.toCodePointArray(start).length;
  if (len === 0) { return "end of file"; }
  if (len < 6) { return start; }
  return start + "...";
};
const regex = mkErr => regexStr => {
  const matchRegex = Data$dString$dRegex$dUnsafe.unsafeRegex("^(?:" + (regexStr + ")"))(Data$dString$dRegex$dFlags.unicode);
  return str => {
    const v = Data$dString$dRegex.match(matchRegex)(str);
    if (v.tag === "Just") {
      const $5 = Data$dArray.index(v._1)(0);
      const $6 = (() => {
        if ($5.tag === "Just") { return $5._1; }
        $runtime.fail();
      })();
      if ($6.tag === "Just") { return $LexResult("LexSucc", $6._1, Data$dString$dCodeUnits.drop(Data$dString$dCodeUnits.length($6._1))(str)); }
      return $LexResult("LexFail", v3 => mkErr(mkUnexpected(str)), str);
    }
    return $LexResult("LexFail", v3 => mkErr(mkUnexpected(str)), str);
  };
};
const satisfy = mkErr => p => str => {
  const v = Data$dString$dCodeUnits.charAt(0)(str);
  if (v.tag === "Just") {
    if (p(v._1)) { return $LexResult("LexSucc", v._1, Data$dString$dCodeUnits.drop(1)(str)); }
    return $LexResult("LexFail", v1 => mkErr(mkUnexpected(str)), str);
  }
  return $LexResult("LexFail", v1 => mkErr(mkUnexpected(str)), str);
};
const string = mkErr => match => str => {
  if (Data$dString$dCodeUnits.take(Data$dString$dCodeUnits.length(match))(str) === match) {
    return $LexResult("LexSucc", match, Data$dString$dCodeUnits.drop(Data$dString$dCodeUnits.length(match))(str));
  }
  return $LexResult("LexFail", v => mkErr(mkUnexpected(str)), str);
};
const many = v => str => Control$dMonad$dST$dInternal.run(() => {
  const valuesRef = Data$dArray$dST.new();
  const strRef = {value: str};
  const contRef = {value: true};
  const resRef = {value: $LexResult("LexSucc", [], str)};
  Control$dMonad$dST$dInternal.while(() => contRef.value)(() => {
    const str$p = strRef.value;
    const v1 = v(str$p);
    if (v1.tag === "LexFail") {
      if (Data$dString$dCodeUnits.length(str$p) === Data$dString$dCodeUnits.length(v1._2)) {
        const values = Data$dArray$dST.unsafeFreeze(valuesRef)();
        resRef.value = $LexResult("LexSucc", values, v1._2);
        contRef.value = false;
        return Data$dUnit.unit;
      }
      resRef.value = $LexResult("LexFail", v1._1, v1._2);
      contRef.value = false;
      return Data$dUnit.unit;
    }
    if (v1.tag === "LexSucc") {
      Data$dArray$dST.pushAll([v1._1])(valuesRef)();
      strRef.value = v1._2;
      return Data$dUnit.unit;
    }
    $runtime.fail();
  })();
  return resRef.value;
});
const functorLex = {
  map: f => v => str => {
    const v1 = v(str);
    if (v1.tag === "LexFail") { return $LexResult("LexFail", v1._1, v1._2); }
    if (v1.tag === "LexSucc") { return $LexResult("LexSucc", f(v1._1), v1._2); }
    $runtime.fail();
  }
};
const spaceComment = /* #__PURE__ */ (() => functorLex.map(Data$dString$dCodeUnits.length)(regex(PureScript$dCST$dErrors.LexExpected("spaces"))(" +")))();
const char$p = mkErr => res => match => str => {
  if (Data$dString$dCodeUnits.singleton(match) === Data$dString$dCodeUnits.take(1)(str)) { return $LexResult("LexSucc", res, Data$dString$dCodeUnits.drop(1)(str)); }
  return $LexResult("LexFail", v => mkErr(mkUnexpected(str)), str);
};
const $$char = mkErr => match => str => {
  if (Data$dString$dCodeUnits.singleton(match) === Data$dString$dCodeUnits.take(1)(str)) { return $LexResult("LexSucc", match, Data$dString$dCodeUnits.drop(1)(str)); }
  return $LexResult("LexFail", v => mkErr(mkUnexpected(str)), str);
};
const bumpText = v => colOffset => str => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const n = go$a0, ix = go$a1;
      const v1 = Data$dString$dCodeUnits.indexOf$p("\n")(ix)(str);
      if (v1.tag === "Just") {
        go$a0 = n + 1 | 0;
        go$a1 = v1._1 + 1 | 0;
        continue;
      }
      if (v1.tag === "Nothing") {
        if (n === 0) {
          go$c = false;
          go$r = {line: v.line, column: (v.column + Data$dString$dCodePoints.toCodePointArray(str).length | 0) + (colOffset * 2 | 0) | 0};
          continue;
        }
        go$c = false;
        go$r = {line: v.line + n | 0, column: Data$dString$dCodePoints.toCodePointArray(Data$dString$dCodeUnits.drop(ix)(str)).length + colOffset | 0};
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(0)(0);
};
const bumpToken = v => v1 => {
  if (v1.tag === "TokLeftParen") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokRightParen") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokLeftBrace") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokRightBrace") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokLeftSquare") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokRightSquare") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokLeftArrow") {
    if (v1._1.tag === "ASCII") { return {line: v.line, column: v.column + 2 | 0}; }
    if (v1._1.tag === "Unicode") { return {line: v.line, column: v.column + 1 | 0}; }
    $runtime.fail();
  }
  if (v1.tag === "TokRightArrow") {
    if (v1._1.tag === "ASCII") { return {line: v.line, column: v.column + 2 | 0}; }
    if (v1._1.tag === "Unicode") { return {line: v.line, column: v.column + 1 | 0}; }
    $runtime.fail();
  }
  if (v1.tag === "TokRightFatArrow") {
    if (v1._1.tag === "ASCII") { return {line: v.line, column: v.column + 2 | 0}; }
    if (v1._1.tag === "Unicode") { return {line: v.line, column: v.column + 1 | 0}; }
    $runtime.fail();
  }
  if (v1.tag === "TokDoubleColon") {
    if (v1._1.tag === "ASCII") { return {line: v.line, column: v.column + 2 | 0}; }
    if (v1._1.tag === "Unicode") { return {line: v.line, column: v.column + 1 | 0}; }
    $runtime.fail();
  }
  if (v1.tag === "TokForall") {
    if (v1._1.tag === "ASCII") { return {line: v.line, column: v.column + 6 | 0}; }
    if (v1._1.tag === "Unicode") { return {line: v.line, column: v.column + 1 | 0}; }
    $runtime.fail();
  }
  if (v1.tag === "TokEquals") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokPipe") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokTick") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokDot") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokComma") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokUnderscore") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokBackslash") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokAt") { return {line: v.line, column: v.column + 1 | 0}; }
  if (v1.tag === "TokLowerName") {
    return {
      line: v.line,
      column: (() => {
        if (v1._1.tag === "Nothing") { return v.column + 0 | 0; }
        if (v1._1.tag === "Just") { return v.column + (1 + Data$dString$dCodePoints.toCodePointArray(v1._1._1).length | 0) | 0; }
        $runtime.fail();
      })() + Data$dString$dCodePoints.toCodePointArray(v1._2).length | 0
    };
  }
  if (v1.tag === "TokUpperName") {
    return {
      line: v.line,
      column: (() => {
        if (v1._1.tag === "Nothing") { return v.column + 0 | 0; }
        if (v1._1.tag === "Just") { return v.column + (1 + Data$dString$dCodePoints.toCodePointArray(v1._1._1).length | 0) | 0; }
        $runtime.fail();
      })() + Data$dString$dCodePoints.toCodePointArray(v1._2).length | 0
    };
  }
  if (v1.tag === "TokOperator") {
    return {
      line: v.line,
      column: (() => {
        if (v1._1.tag === "Nothing") { return v.column + 0 | 0; }
        if (v1._1.tag === "Just") { return v.column + (1 + Data$dString$dCodePoints.toCodePointArray(v1._1._1).length | 0) | 0; }
        $runtime.fail();
      })() + Data$dString$dCodePoints.toCodePointArray(v1._2).length | 0
    };
  }
  if (v1.tag === "TokSymbolName") {
    return {
      line: v.line,
      column: (
        (() => {
          if (v1._1.tag === "Nothing") { return v.column + 0 | 0; }
          if (v1._1.tag === "Just") { return v.column + (1 + Data$dString$dCodePoints.toCodePointArray(v1._1._1).length | 0) | 0; }
          $runtime.fail();
        })() + Data$dString$dCodePoints.toCodePointArray(v1._2).length | 0
      ) + 2 | 0
    };
  }
  if (v1.tag === "TokSymbolArrow") {
    if (v1._1.tag === "Unicode") { return {line: v.line, column: v.column + 3 | 0}; }
    if (v1._1.tag === "ASCII") { return {line: v.line, column: v.column + 4 | 0}; }
    $runtime.fail();
  }
  if (v1.tag === "TokHole") { return {line: v.line, column: (v.column + Data$dString$dCodePoints.toCodePointArray(v1._1).length | 0) + 1 | 0}; }
  if (v1.tag === "TokChar") { return {line: v.line, column: (v.column + Data$dString$dCodePoints.toCodePointArray(v1._1).length | 0) + 2 | 0}; }
  if (v1.tag === "TokInt") { return {line: v.line, column: v.column + Data$dString$dCodePoints.toCodePointArray(v1._1).length | 0}; }
  if (v1.tag === "TokNumber") { return {line: v.line, column: v.column + Data$dString$dCodePoints.toCodePointArray(v1._1).length | 0}; }
  if (v1.tag === "TokString") { return bumpText(v)(1)(v1._1); }
  if (v1.tag === "TokRawString") { return bumpText(v)(3)(v1._1); }
  if (v1.tag === "TokLayoutStart") { return v; }
  if (v1.tag === "TokLayoutSep") { return v; }
  if (v1.tag === "TokLayoutEnd") { return v; }
  $runtime.fail();
};
const bumpComment = v => v1 => {
  if (v1.tag === "Comment") { return bumpText(v)(0)(v1._1); }
  if (v1.tag === "Space") { return {line: v.line, column: v.column + v1._1 | 0}; }
  if (v1.tag === "Line") { return {line: v.line + v1._2 | 0, column: 0}; }
  $runtime.fail();
};
const applyLex = {
  apply: v => v1 => str => {
    const v2 = v(str);
    if (v2.tag === "LexFail") { return $LexResult("LexFail", v2._1, v2._2); }
    if (v2.tag === "LexSucc") {
      const v3 = v1(v2._2);
      if (v3.tag === "LexFail") { return $LexResult("LexFail", v3._1, v3._2); }
      if (v3.tag === "LexSucc") { return $LexResult("LexSucc", v2._1(v3._1), v3._2); }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Functor0: () => functorLex
};
const bindLex = {
  bind: v => k => str => {
    const v1 = v(str);
    if (v1.tag === "LexFail") { return $LexResult("LexFail", v1._1, v1._2); }
    if (v1.tag === "LexSucc") { return k(v1._1)(v1._2); }
    $runtime.fail();
  },
  Apply0: () => applyLex
};
const altLex = {
  alt: v => v1 => str => {
    const v2 = v(str);
    if (v2.tag === "LexFail") {
      if (Data$dString$dCodeUnits.length(str) === Data$dString$dCodeUnits.length(v2._2)) { return v1(str); }
      return $LexResult("LexFail", v2._1, v2._2);
    }
    if (v2.tag === "LexSucc") { return $LexResult("LexSucc", v2._1, v2._2); }
    $runtime.fail();
  },
  Functor0: () => functorLex
};
const comment = /* #__PURE__ */ (() => altLex.alt(regex(PureScript$dCST$dErrors.LexExpected("block comment"))("\\{-(-(?!\\})|[^-]+)*(-\\}|$)"))(regex(PureScript$dCST$dErrors.LexExpected("line comment"))("--[^\\r\\n]*")))();
const lineComment = /* #__PURE__ */ (() => altLex.alt(functorLex.map((() => {
  const $0 = PureScript$dCST$dTypes.Line(PureScript$dCST$dTypes.LF);
  return x => $0(Data$dString$dCodePoints.toCodePointArray(x).length);
})())(regex(PureScript$dCST$dErrors.LexExpected("newline"))("\n+")))(functorLex.map((() => {
  const $0 = PureScript$dCST$dTypes.Line(PureScript$dCST$dTypes.CRLF);
  return x => $0(Data$dEuclideanRing.intDiv(Data$dString$dCodePoints.toCodePointArray(x).length)(2));
})())(regex(PureScript$dCST$dErrors.LexExpected("newline"))("(?:\r\n)+"))))();
const leadingComments = /* #__PURE__ */ (() => many(altLex.alt(functorLex.map(PureScript$dCST$dTypes.Comment)(comment))(altLex.alt(functorLex.map(PureScript$dCST$dTypes.Space)(spaceComment))(lineComment))))();
const token = /* #__PURE__ */ (() => {
  const tokenRightParen = char$p(PureScript$dCST$dErrors.LexExpected("right paren"))(PureScript$dCST$dTypes.TokRightParen)(")");
  const tokenLeftParen = char$p(PureScript$dCST$dErrors.LexExpected("left paren"))(PureScript$dCST$dTypes.TokLeftParen)("(");
  const stripUnderscores = Data$dString$dCommon.replaceAll("_")("");
  const parseSymbolIdent = regex(PureScript$dCST$dErrors.LexExpected("symbol"))("(?:[:!#$%&*+./<=>?@\\\\^|~-]|(?!\\p{P})\\p{S})+");
  const parseProper = regex(PureScript$dCST$dErrors.LexExpected("proper name"))("\\p{Lu}[\\p{L}0-9_']*");
  const parseIdent = regex(PureScript$dCST$dErrors.LexExpected("ident"))("[\\p{Ll}_][\\p{L}0-9_']*");
  const intPartRegex = regex(PureScript$dCST$dErrors.LexExpected("int part"))("(0|[1-9][0-9_]*)");
  const parseHexEscape = bindLex.bind(regex(PureScript$dCST$dErrors.LexExpected("hex"))("[a-fA-F0-9]{1,6}"))(esc => {
    const $8 = Data$dInt.fromStringAs(16)(esc);
    if ($8.tag === "Just") {
      if ($8._1 >= 0 && $8._1 <= 65535) { return LexSucc({raw: "\\x" + esc, char: Data$dEnum.fromCharCode($8._1)}); }
      return LexFail(v => PureScript$dCST$dErrors.$ParseError("LexCharEscapeOutOfRange", esc));
    }
    if ($8.tag === "Nothing") { return LexFail(v => PureScript$dCST$dErrors.$ParseError("LexCharEscapeOutOfRange", esc)); }
    $runtime.fail();
  });
  const charSingleQuote = $$char(PureScript$dCST$dErrors.LexExpected("single quote"))("'");
  const charQuote = $$char(PureScript$dCST$dErrors.LexExpected("quote"))("\"");
  const charAny = satisfy(PureScript$dCST$dErrors.LexExpected("char"))(v => true);
  const parseEscape = bindLex.bind(charAny)(ch => {
    if (ch === "t") { return LexSucc({raw: "\\t", char: "\t"}); }
    if (ch === "r") { return LexSucc({raw: "\\r", char: "\r"}); }
    if (ch === "n") { return LexSucc({raw: "\\n", char: "\n"}); }
    if (ch === "\"") { return LexSucc({raw: "\\\"", char: "\""}); }
    if (ch === "'") { return LexSucc({raw: "\\'", char: "'"}); }
    if (ch === "\\") { return LexSucc({raw: "\\\\", char: "\\"}); }
    if (ch === "x") { return parseHexEscape; }
    const $12 = PureScript$dCST$dErrors.$ParseError("LexInvalidCharEscape", Data$dString$dCodeUnits.singleton(ch));
    return LexFail(v => $12);
  });
  return altLex.alt(functorLex.map(v => PureScript$dCST$dTypes.$Token("TokHole", v))($$try(applyLex.apply(functorLex.map(v => Control$dApply.identity)($$char(PureScript$dCST$dErrors.LexExpected("question mark"))("?")))(altLex.alt(parseIdent)(parseProper)))))(altLex.alt(applyLex.apply(functorLex.map(v => v1 => v1(toModuleName(v)))(regex(PureScript$dCST$dErrors.LexExpected("module name"))("(?:(?:\\p{Lu}[\\p{L}0-9_']*)\\.)*")))(altLex.alt(functorLex.map(v => v1 => {
    if (v1.tag === "Nothing") {
      if (v === "forall") { return PureScript$dCST$dTypes.$Token("TokForall", PureScript$dCST$dTypes.ASCII); }
      if (v === "_") { return PureScript$dCST$dTypes.TokUnderscore; }
      return PureScript$dCST$dTypes.$Token("TokLowerName", Data$dMaybe.Nothing, v);
    }
    return PureScript$dCST$dTypes.$Token("TokLowerName", v1, v);
  })(parseIdent))(altLex.alt(functorLex.map(b => a => PureScript$dCST$dTypes.$Token("TokUpperName", a, b))(parseProper))(altLex.alt(functorLex.map(v => v1 => {
    if (v1.tag === "Nothing") {
      if (v === "<-") { return PureScript$dCST$dTypes.$Token("TokLeftArrow", PureScript$dCST$dTypes.ASCII); }
      if (v === "←") { return PureScript$dCST$dTypes.$Token("TokLeftArrow", PureScript$dCST$dTypes.Unicode); }
      if (v === "->") { return PureScript$dCST$dTypes.$Token("TokRightArrow", PureScript$dCST$dTypes.ASCII); }
      if (v === "→") { return PureScript$dCST$dTypes.$Token("TokRightArrow", PureScript$dCST$dTypes.Unicode); }
      if (v === "=>") { return PureScript$dCST$dTypes.$Token("TokRightFatArrow", PureScript$dCST$dTypes.ASCII); }
      if (v === "⇒") { return PureScript$dCST$dTypes.$Token("TokRightFatArrow", PureScript$dCST$dTypes.Unicode); }
      if (v === "::") { return PureScript$dCST$dTypes.$Token("TokDoubleColon", PureScript$dCST$dTypes.ASCII); }
      if (v === "∷") { return PureScript$dCST$dTypes.$Token("TokDoubleColon", PureScript$dCST$dTypes.Unicode); }
      if (v === "∀") { return PureScript$dCST$dTypes.$Token("TokForall", PureScript$dCST$dTypes.Unicode); }
      if (v === "=") { return PureScript$dCST$dTypes.TokEquals; }
      if (v === ".") { return PureScript$dCST$dTypes.TokDot; }
      if (v === "\\") { return PureScript$dCST$dTypes.TokBackslash; }
      if (v === "|") { return PureScript$dCST$dTypes.TokPipe; }
      if (v === "@") { return PureScript$dCST$dTypes.TokAt; }
      if (v === "`") { return PureScript$dCST$dTypes.TokTick; }
      return PureScript$dCST$dTypes.$Token("TokOperator", Data$dMaybe.Nothing, v);
    }
    return PureScript$dCST$dTypes.$Token("TokOperator", v1, v);
  })(parseSymbolIdent))(functorLex.map(v => v1 => {
    if (v1.tag === "Nothing") {
      if (v === "->") { return PureScript$dCST$dTypes.$Token("TokSymbolArrow", PureScript$dCST$dTypes.ASCII); }
      if (v === "→") { return PureScript$dCST$dTypes.$Token("TokSymbolArrow", PureScript$dCST$dTypes.Unicode); }
      return PureScript$dCST$dTypes.$Token("TokSymbolName", Data$dMaybe.Nothing, v);
    }
    return PureScript$dCST$dTypes.$Token("TokSymbolName", v1, v);
  })($$try(applyLex.apply(functorLex.map(Data$dFunction.const)(applyLex.apply(functorLex.map(v => Control$dApply.identity)(tokenLeftParen))(parseSymbolIdent)))(tokenRightParen))))))))(altLex.alt(functorLex.map(v => PureScript$dCST$dTypes.$Token(
    "TokChar",
    v.raw,
    v.char
  ))(applyLex.apply(functorLex.map(Data$dFunction.const)(applyLex.apply(functorLex.map(v => Control$dApply.identity)(charSingleQuote))(bindLex.bind(charAny)(ch => {
    if (ch === "\\") { return parseEscape; }
    if (ch === "'") { return LexFail(v => PureScript$dCST$dErrors.$ParseError("LexExpected", "character", "empty character literal")); }
    return LexSucc({raw: Data$dString$dCodeUnits.singleton(ch), char: ch});
  }))))(charSingleQuote)))(altLex.alt(altLex.alt(functorLex.map(v => PureScript$dCST$dTypes.$Token(
    "TokRawString",
    (() => {
      const $13 = Data$dString$dCodeUnits.drop(3)(v);
      return Data$dString$dCodeUnits.take(Data$dString$dCodeUnits.length($13) - 3 | 0)($13);
    })()
  ))(regex(PureScript$dCST$dErrors.LexExpected("raw string characters"))("\"\"\"\"{0,2}([^\"]+\"{1,2})*[^\"]*\"\"\"")))(functorLex.map(v => {
    const v1 = fold1(v);
    return PureScript$dCST$dTypes.$Token("TokString", v1.raw, v1.string);
  })(applyLex.apply(functorLex.map(Data$dFunction.const)(applyLex.apply(functorLex.map(v => Control$dApply.identity)(charQuote))(many(altLex.alt(functorLex.map(v => (
    {raw: v, string: v}
  ))(regex(PureScript$dCST$dErrors.LexExpected("string characters"))("[^\"\\\\]+")))(altLex.alt(functorLex.map(v => ({raw: v, string: ""}))(regex(PureScript$dCST$dErrors.LexExpected("whitespace escape"))("\\\\[ \\r\\n]+\\\\")))(functorLex.map(v => (
    {raw: v.raw, string: Data$dString$dCodeUnits.singleton(v.char)}
  ))(applyLex.apply(functorLex.map(v => Control$dApply.identity)($$char(PureScript$dCST$dErrors.LexExpected("backslash"))("\\")))(parseEscape))))))))(charQuote))))(altLex.alt(altLex.alt(bindLex.bind(applyLex.apply(functorLex.map(v => Control$dApply.identity)(string(PureScript$dCST$dErrors.LexExpected("hex int prefix"))("0x")))(regex(PureScript$dCST$dErrors.LexExpected("hex int"))("[a-fA-F0-9]+")))(raw => {
    const v = Data$dInt.fromStringAs(16)(raw);
    if (v.tag === "Just") { return LexSucc(PureScript$dCST$dTypes.$Token("TokInt", "0x" + raw, PureScript$dCST$dTypes.$IntValue("SmallInt", v._1))); }
    if (v.tag === "Nothing") { return LexSucc(PureScript$dCST$dTypes.$Token("TokInt", "0x" + raw, PureScript$dCST$dTypes.$IntValue("BigHex", raw))); }
    $runtime.fail();
  }))(bindLex.bind(intPartRegex)(intPart => bindLex.bind(optional($$try(applyLex.apply(functorLex.map(v => Control$dApply.identity)($$char(PureScript$dCST$dErrors.LexExpected("dot"))(".")))(regex(PureScript$dCST$dErrors.LexExpected("fraction part"))("[0-9_]+")))))(fractionPart => bindLex.bind(optional(applyLex.apply(functorLex.map(v => Control$dApply.identity)($$char(PureScript$dCST$dErrors.LexExpected("exponent"))("e")))(applyLex.apply(functorLex.map(v => v1 => (
    {sign: v, exponent: v1}
  ))(optional(altLex.alt(string(PureScript$dCST$dErrors.LexExpected("negative"))("-"))(string(PureScript$dCST$dErrors.LexExpected("positive"))("+")))))(intPartRegex))))(exponentPart => {
    if (
      (() => {
        if (fractionPart.tag === "Nothing") { return true; }
        if (fractionPart.tag === "Just") { return false; }
        $runtime.fail();
      })() && (() => {
        if (exponentPart.tag === "Nothing") { return true; }
        if (exponentPart.tag === "Just") { return false; }
        $runtime.fail();
      })()
    ) {
      const intVal = stripUnderscores(intPart);
      const v = Data$dInt.fromString(intVal);
      if (v.tag === "Just") { return LexSucc(PureScript$dCST$dTypes.$Token("TokInt", intPart, PureScript$dCST$dTypes.$IntValue("SmallInt", v._1))); }
      if (v.tag === "Nothing") { return LexSucc(PureScript$dCST$dTypes.$Token("TokInt", intPart, PureScript$dCST$dTypes.$IntValue("BigInt", intVal))); }
      $runtime.fail();
    }
    const raw = intPart + (
      (() => {
        if (fractionPart.tag === "Nothing") { return ""; }
        if (fractionPart.tag === "Just") { return "." + fractionPart._1; }
        $runtime.fail();
      })() + (() => {
        if (exponentPart.tag === "Nothing") { return ""; }
        if (exponentPart.tag === "Just") {
          if (exponentPart._1.sign.tag === "Nothing") { return "e" + exponentPart._1.exponent; }
          if (exponentPart._1.sign.tag === "Just") { return "e" + (exponentPart._1.sign._1 + exponentPart._1.exponent); }
          $runtime.fail();
        }
        $runtime.fail();
      })()
    );
    const v = Data$dNumber.fromStringImpl(stripUnderscores(raw), Data$dNumber.isFinite, Data$dMaybe.Just, Data$dMaybe.Nothing);
    if (v.tag === "Just") { return LexSucc(PureScript$dCST$dTypes.$Token("TokNumber", raw, v._1)); }
    if (v.tag === "Nothing") { return LexFail(v$1 => PureScript$dCST$dErrors.$ParseError("LexNumberOutOfRange", raw)); }
    $runtime.fail();
  })))))(altLex.alt(tokenLeftParen)(altLex.alt(tokenRightParen)(altLex.alt(char$p(PureScript$dCST$dErrors.LexExpected("left brace"))(PureScript$dCST$dTypes.TokLeftBrace)("{"))(altLex.alt(char$p(PureScript$dCST$dErrors.LexExpected("right brace"))(PureScript$dCST$dTypes.TokRightBrace)("}"))(altLex.alt(char$p(PureScript$dCST$dErrors.LexExpected("left square"))(PureScript$dCST$dTypes.TokLeftSquare)("["))(altLex.alt(char$p(PureScript$dCST$dErrors.LexExpected("right square"))(PureScript$dCST$dTypes.TokRightSquare)("]"))(altLex.alt(char$p(PureScript$dCST$dErrors.LexExpected("backtick"))(PureScript$dCST$dTypes.TokTick)("`"))(char$p(PureScript$dCST$dErrors.LexExpected("comma"))(PureScript$dCST$dTypes.TokComma)(",")))))))))))));
})();
const lexToken = x => {
  const $1 = token(x);
  if ($1.tag === "LexSucc") {
    if ($1._2 === "") { return Data$dEither.$Either("Right", $1._1); }
    return Data$dEither.$Either("Left", v1 => PureScript$dCST$dErrors.$ParseError("ExpectedEof", $1._1));
  }
  if ($1.tag === "LexFail") { return Data$dEither.$Either("Left", $1._1); }
  $runtime.fail();
};
const trailingComments = /* #__PURE__ */ (() => many(altLex.alt(functorLex.map(PureScript$dCST$dTypes.Comment)(comment))(functorLex.map(PureScript$dCST$dTypes.Space)(spaceComment))))();
const lexWithState = /* #__PURE__ */ (() => {
  const go = stack => startPos => leading => str => Data$dLazy.defer(v => {
    if (str === "") {
      return Data$dLazy.force(PureScript$dCST$dTokenStream.unwindLayout(startPos)(Data$dLazy.defer(v1 => PureScript$dCST$dTokenStream.$TokenStep("TokenEOF", startPos, leading)))(stack));
    }
    const v1 = applyLex.apply(applyLex.apply(functorLex.map(v$1 => v1 => v2 => ({token: v$1, trailing: v1, nextLeading: v2}))(token))(trailingComments))(leadingComments)(str);
    if (v1.tag === "LexFail") {
      return PureScript$dCST$dTokenStream.$TokenStep(
        "TokenError",
        bumpText(startPos)(0)(Data$dString$dCodeUnits.take(Data$dString$dCodeUnits.length(str) - Data$dString$dCodeUnits.length(v1._2) | 0)(str)),
        v1._1(Data$dUnit.unit),
        Data$dMaybe.Nothing,
        stack
      );
    }
    if (v1.tag === "LexSucc") {
      const endPos = bumpToken(startPos)(v1._1.token);
      const nextStart = Data$dFoldable.foldlArray(bumpComment)(Data$dFoldable.foldlArray(bumpComment)(endPos)(v1._1.trailing))(v1._1.nextLeading);
      const v2 = PureScript$dCST$dLayout.insertLayout({range: {start: startPos, end: endPos}, leadingComments: leading, trailingComments: v1._1.trailing, value: v1._1.token})(nextStart)(stack);
      return Data$dLazy.force(consTokens(v2._2)(Data$dTuple.$Tuple(nextStart, go(v2._1)(nextStart)(v1._1.nextLeading)(v1._2)))._2);
    }
    $runtime.fail();
  });
  return initStack => initPos => str => Data$dLazy.defer(v => {
    const v1 = leadingComments(str);
    if (v1.tag === "LexFail") { return Partial._crashWith("Leading comments can't fail."); }
    if (v1.tag === "LexSucc") { return Data$dLazy.force(go(initStack)(Data$dFoldable.foldlArray(bumpComment)(initPos)(v1._1))(v1._1)(v1._2)); }
    $runtime.fail();
  });
})();
const lex = /* #__PURE__ */ lexWithState(/* #__PURE__ */ Data$dList$dTypes.$List(
  "Cons",
  /* #__PURE__ */ Data$dTuple.$Tuple({line: 0, column: 0}, PureScript$dCST$dLayout.LytRoot),
  Data$dList$dTypes.Nil
))({line: 0, column: 0});
export {
  $LexResult,
  LexFail,
  LexSucc,
  altLex,
  applyLex,
  bindLex,
  bumpComment,
  bumpText,
  bumpToken,
  $$char as char,
  char$p,
  comment,
  consTokens,
  fold1,
  functorLex,
  leadingComments,
  lex,
  lexToken,
  lexWithState,
  lineComment,
  many,
  mkUnexpected,
  optional,
  regex,
  satisfy,
  spaceComment,
  string,
  toModuleName,
  token,
  trailingComments,
  $$try as try
};
