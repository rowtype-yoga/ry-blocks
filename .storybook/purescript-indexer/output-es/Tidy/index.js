import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dString$dCodePoints from "../Data.String.CodePoints/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dVoid from "../Data.Void/index.js";
import * as Dodo from "../Dodo/index.js";
import * as Dodo$dInternal from "../Dodo.Internal/index.js";
import * as Partial from "../Partial/index.js";
import * as PureScript$dCST$dTypes from "../PureScript.CST.Types/index.js";
import * as Tidy$dDoc from "../Tidy.Doc/index.js";
import * as Tidy$dHang from "../Tidy.Hang/index.js";
import * as Tidy$dPrecedence from "../Tidy.Precedence/index.js";
import * as Tidy$dToken from "../Tidy.Token/index.js";
import * as Tidy$dUtil from "../Tidy.Util/index.js";
const $DeclGroup = (tag, _1) => ({tag, _1});
const $DeclGroupSeparator = tag => ({tag});
const $ElseIfChain = (tag, _1, _2, _3, _4, _5) => ({tag, _1, _2, _3, _4, _5});
const $FormatGrouped = tag => ({tag});
const $ImportComparison = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $ImportModuleComparison = (_1, _2, _3, _4) => ({tag: "ImportModuleCmp", _1, _2, _3, _4});
const $ImportSortOption = tag => ({tag});
const $ImportWrapOption = tag => ({tag});
const $Poly = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $TypeArrowOption = tag => ({tag});
const lines = /* #__PURE__ */ Data$dFoldable.foldrArray(Dodo.appendBreak)(Dodo$dInternal.Empty);
const intercalate = /* #__PURE__ */ Data$dArray.intercalate1(Dodo$dInternal.monoidDoc);
const power = /* #__PURE__ */ Data$dMonoid.power(Dodo$dInternal.monoidDoc);
const power1 = /* #__PURE__ */ Data$dMonoid.power(Data$dMonoid.monoidString);
const max = x => y => {
  const v = Data$dOrd.ordInt.compare(x)(y);
  if (v.tag === "LT") { return y; }
  if (v.tag === "EQ") { return x; }
  if (v.tag === "GT") { return x; }
  $runtime.fail();
};
const foldMap2 = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap(Dodo$dInternal.monoidDoc))();
const identity = x => x;
const eq5 = /* #__PURE__ */ Data$dEq.eqArrayImpl(Data$dEq.eqStringImpl);
const compare3 = /* #__PURE__ */ (() => Data$dOrd.ordArray(Data$dOrd.ordString).compare)();
const compare7 = /* #__PURE__ */ (() => Data$dMaybe.ordMaybe(Data$dOrd.ordString).compare)();
const foldMap3 = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap(Tidy$dDoc.monoidFormatDoc))();
const TypeArrowFirst = /* #__PURE__ */ $TypeArrowOption("TypeArrowFirst");
const TypeArrowLast = /* #__PURE__ */ $TypeArrowOption("TypeArrowLast");
const PolyForall = value0 => value1 => value2 => $Poly("PolyForall", value0, value1, value2);
const PolyArrow = value0 => value1 => $Poly("PolyArrow", value0, value1);
const ImportWrapSource = /* #__PURE__ */ $ImportWrapOption("ImportWrapSource");
const ImportWrapAuto = /* #__PURE__ */ $ImportWrapOption("ImportWrapAuto");
const ImportSortSource = /* #__PURE__ */ $ImportSortOption("ImportSortSource");
const ImportSortIde = /* #__PURE__ */ $ImportSortOption("ImportSortIde");
const ImportClassCmp = value0 => $ImportComparison("ImportClassCmp", value0);
const ImportTypeOpCmp = value0 => $ImportComparison("ImportTypeOpCmp", value0);
const ImportTypeCmp = value0 => value1 => value2 => $ImportComparison("ImportTypeCmp", value0, value1, value2);
const ImportValueCmp = value0 => $ImportComparison("ImportValueCmp", value0);
const ImportOpCmp = value0 => $ImportComparison("ImportOpCmp", value0);
const ImportErrorCmp = /* #__PURE__ */ $ImportComparison("ImportErrorCmp");
const ImportModuleCmp = value0 => value1 => value2 => value3 => $ImportModuleComparison(value0, value1, value2, value3);
const Grouped = /* #__PURE__ */ $FormatGrouped("Grouped");
const NotGrouped = /* #__PURE__ */ $FormatGrouped("NotGrouped");
const IfThen = value0 => value1 => value2 => value3 => $ElseIfChain("IfThen", value0, value1, value2, value3);
const ElseIfThen = value0 => value1 => value2 => value3 => value4 => $ElseIfChain("ElseIfThen", value0, value1, value2, value3, value4);
const Else = value0 => value1 => $ElseIfChain("Else", value0, value1);
const DeclGroupSame = /* #__PURE__ */ $DeclGroupSeparator("DeclGroupSame");
const DeclGroupHard = /* #__PURE__ */ $DeclGroupSeparator("DeclGroupHard");
const DeclGroupSoft = /* #__PURE__ */ $DeclGroupSeparator("DeclGroupSoft");
const DeclGroupValueSignature = value0 => $DeclGroup("DeclGroupValueSignature", value0);
const DeclGroupValue = value0 => $DeclGroup("DeclGroupValue", value0);
const DeclGroupTypeSignature = value0 => $DeclGroup("DeclGroupTypeSignature", value0);
const DeclGroupType = value0 => $DeclGroup("DeclGroupType", value0);
const DeclGroupClass = value0 => $DeclGroup("DeclGroupClass", value0);
const DeclGroupInstance = /* #__PURE__ */ $DeclGroup("DeclGroupInstance");
const DeclGroupFixity = /* #__PURE__ */ $DeclGroup("DeclGroupFixity");
const DeclGroupForeign = /* #__PURE__ */ $DeclGroup("DeclGroupForeign");
const DeclGroupRole = /* #__PURE__ */ $DeclGroup("DeclGroupRole");
const DeclGroupUnknown = /* #__PURE__ */ $DeclGroup("DeclGroupUnknown");
const toPolytype = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const init = go$a0, v = go$a1;
      if (v.tag === "TypeForall") {
        go$a0 = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([$Poly("PolyForall", v._1, v._2, v._3)]))(init));
        go$a1 = v._4;
        continue;
      }
      if (v.tag === "TypeArrow") {
        go$a0 = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([$Poly("PolyArrow", v._1, v._2)]))(init));
        go$a1 = v._3;
        continue;
      }
      if (v.tag === "TypeConstrained") {
        go$a0 = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([$Poly("PolyArrow", v._1, v._2)]))(init));
        go$a1 = v._3;
        continue;
      }
      go$c = false;
      go$r = {init: init, last: v};
      continue;
    };
    return go$r;
  };
  return go([]);
})();
const toElseIfChain = ifte => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const acc = go$a0, curr = go$a1;
      if (curr.false.tag === "ExprIf") {
        go$a0 = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
          $ElseIfChain("ElseIfThen", curr.else, curr.false._1.keyword, curr.false._1.cond, curr.false._1.then, curr.false._1.true)
        ]))(acc));
        go$a1 = curr.false._1;
        continue;
      }
      go$c = false;
      go$r = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([$ElseIfChain("Else", curr.else, curr.false)]))(acc));
      continue;
    };
    return go$r;
  };
  return go([$ElseIfChain("IfThen", ifte.keyword, ifte.cond, ifte.then, ifte.true)])(ifte);
};
const formatString = x => {
  const $1 = Data$dArray.uncons(Tidy$dUtil.splitStringEscapeLines(x));
  if ($1.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
  if ($1.tag === "Just") {
    const v1 = Data$dArray.unsnoc($1._1.tail);
    if (v1.tag === "Nothing") { return Tidy$dDoc.text($1._1.head); }
    if (v1.tag === "Just") {
      return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(Tidy$dDoc.text($1._1.head + "\\"))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(str => Tidy$dDoc.text("\\" + (
        str + "\\"
      )))(v1._1.init)))(Tidy$dDoc.text("\\" + v1._1.last));
    }
    $runtime.fail();
  }
  $runtime.fail();
};
const formatRawString = x => {
  const $1 = Data$dArray.uncons(Tidy$dUtil.splitLines(x));
  if ($1.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
  if ($1.tag === "Just") {
    if ($1._1.tail.length === 0) { return Tidy$dDoc.text($1._1.head); }
    const $2 = lines([
      (() => {
        if ($1._1.head === "") { return Dodo$dInternal.Empty; }
        return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($1._1.head).length, $1._1.head);
      })(),
      (() => {
        const $2 = intercalate(Dodo$dInternal.Break)(Data$dFunctor.arrayMap(Dodo.text)($1._1.tail));
        return Dodo$dInternal.$Doc(
          "Local",
          options => Data$dTuple.$Tuple(
            {indent: 0, indentSpaces: "", indentUnit: options.indentUnit, indentWidth: options.indentWidth, pageWidth: options.pageWidth, ribbonRatio: options.ribbonRatio},
            $2
          )
        );
      })()
    ]);
    if ($2.tag === "Empty") { return Tidy$dDoc.monoidFormatDoc.mempty; }
    return {doc: $2, leading: Tidy$dDoc.monoidLeadingComment.mempty, isEmpty: false, multiline: false, trailing: Tidy$dDoc.monoidTrailingComment.mempty};
  }
  $runtime.fail();
};
const formatListElem = alignment => format => conf => b => Tidy$dDoc.flexGroup(Tidy$dDoc.align(alignment)((() => {
  const $4 = format(conf)(b);
  if ($4.leading.lines > 0) {
    return {
      doc: $4.doc,
      isEmpty: $4.isEmpty,
      leading: {doc: $4.leading.doc, left: $4.leading.left, lines: 0, multiline: $4.leading.multiline, right: $4.leading.right},
      multiline: true,
      trailing: $4.trailing
    };
  }
  return $4;
})()));
const formatHangingOperatorTree = formatOperator => format => conf => {
  const go = v => {
    if (v.tag === "OpPure") { return format(conf)(v._1); }
    if (v.tag === "OpList") {
      return Tidy$dHang.hangOps(go(v._1))(Data$dFunctor.arrayMap(v1 => Tidy$dHang.$HangingOp(
        v1._1.token.range.end.column - v1._1.token.range.start.column | 0,
        formatOperator(conf)(v1._1),
        go(v1._2)
      ))(v._3));
    }
    $runtime.fail();
  };
  return go;
};
const formatErrorVoid = {formatError: Data$dVoid.absurd};
const formatError = dict => dict.formatError;
const formatDeclGroups = declSeparator => k => format => conf => {
  const joinDecls = acc => {
    const newDoc = Tidy$dDoc.joinWithMap(Data$dList$dTypes.foldableNonEmptyList)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(format(conf))(acc.decls);
    if (acc.sep.tag === "DeclGroupSame") { return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(newDoc)(acc.doc); }
    if (acc.sep.tag === "DeclGroupSoft") { return Tidy$dDoc.flexDoubleBreak(newDoc)(acc.doc); }
    if (acc.sep.tag === "DeclGroupHard") {
      return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(newDoc)(Tidy$dDoc.forceMinSourceBreaks(2)(acc.doc));
    }
    $runtime.fail();
  };
  const $5 = Data$dFoldable.foldrArray(decl => x => Data$dMaybe.$Maybe(
    "Just",
    (() => {
      if (x.tag === "Nothing") { return {doc: Tidy$dDoc.monoidFormatDoc.mempty, sep: DeclGroupSame, group: k(decl), decls: Data$dNonEmpty.$NonEmpty(decl, Data$dList$dTypes.Nil)}; }
      if (x.tag === "Just") {
        const group = k(decl);
        const v1 = declSeparator(group)(x._1.group);
        if (v1.tag === "DeclGroupSame") {
          return {doc: x._1.doc, sep: x._1.sep, group: group, decls: Data$dNonEmpty.$NonEmpty(decl, Data$dList$dTypes.$List("Cons", x._1.decls._1, x._1.decls._2))};
        }
        return {doc: joinDecls(x._1), sep: v1, group: group, decls: Data$dNonEmpty.$NonEmpty(decl, Data$dList$dTypes.Nil)};
      }
      $runtime.fail();
    })()
  ))(Data$dMaybe.Nothing);
  return x => {
    const $7 = $5(x);
    if ($7.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
    if ($7.tag === "Just") { return joinDecls($7._1); }
    $runtime.fail();
  };
};
const formatComment = lineComment => blockComment => com => next => {
  if (com.tag === "Comment") {
    if (Data$dString$dCodeUnits.take(2)(com._1) === "--") { return lineComment(com._1)(next); }
    return blockComment(com._1)(next);
  }
  if (com.tag === "Line") {
    return {
      doc: next.doc,
      isEmpty: false,
      leading: {doc: next.leading.doc, left: next.leading.left, lines: next.leading.lines + com._2 | 0, multiline: next.leading.multiline, right: next.leading.right},
      multiline: next.multiline,
      trailing: next.trailing
    };
  }
  if (com.tag === "Space") { return next; }
  $runtime.fail();
};
const formatWithComments = leading => trailing => doc => Data$dFoldable.foldrArray(formatComment(Tidy$dDoc.leadingLineComment)(Tidy$dDoc.leadingBlockComment))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(doc)(Data$dFoldable.foldrArray(formatComment(Tidy$dDoc.trailingLineComment)(Tidy$dDoc.trailingBlockComment))(Tidy$dDoc.monoidFormatDoc.mempty)(trailing)))(leading);
const formatToken = conf => tok => {
  const tokStr = Tidy$dToken.printToken(conf.unicode)(tok.value);
  return formatWithComments(tok.leadingComments)(tok.trailingComments)((() => {
    if (tok.value.tag === "TokRawString") { return formatRawString(tokStr); }
    if (tok.value.tag === "TokString") { return formatString(tokStr); }
    return Tidy$dDoc.text(tokStr);
  })());
};
const formatEmptyList = conf => v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(formatToken(conf)(v.open))(formatToken(conf)(v.close));
const formatErrorRecoveredError = {
  formatError: v => {
    const v1 = Data$dArray.uncons(v.tokens);
    if (v1.tag === "Just") {
      const v2 = Data$dArray.unsnoc(v1._1.tail);
      if (v2.tag === "Just") {
        return formatWithComments(v1._1.head.leadingComments)(v2._1.last.trailingComments)((() => {
          const $3 = Dodo$dInternal.$Doc(
            "WithPosition",
            v3 => Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.semigroupDoc.append((() => {
              const $4 = Tidy$dToken.printToken(Tidy$dToken.UnicodeSource)(v1._1.head.value);
              if ($4 === "") { return Dodo$dInternal.Empty; }
              return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($4).length, $4);
            })())(Data$dFoldable.foldlArray(acc => v1$1 => {
              if (v1$1.tag === "Comment") {
                if (Data$dString$dCodeUnits.take(2)(v1$1._1) === "--") {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      if (v1$1._1 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray(v1$1._1).length, v1$1._1);
                    })())
                  };
                }
                return {line: false, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(lines(Data$dFunctor.arrayMap(Dodo.text)(Tidy$dUtil.splitLines(v1$1._1))))};
              }
              if (v1$1.tag === "Line") { return {line: true, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(power(Dodo$dInternal.Break)(v1$1._2))}; }
              if (v1$1.tag === "Space") {
                if (acc.line) {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      const $6 = power1(" ")(max(0)(v1$1._1 - v3.nextIndent | 0));
                      if ($6 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($6).length, $6);
                    })())
                  };
                }
                return {
                  line: false,
                  doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                    const $6 = power1(" ")(v1$1._1);
                    if ($6 === "") { return Dodo$dInternal.Empty; }
                    return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($6).length, $6);
                  })())
                };
              }
              $runtime.fail();
            })({line: false, doc: Dodo$dInternal.Empty})(v1._1.head.trailingComments).doc))(Dodo$dInternal.semigroupDoc.append(foldMap2(tok => Dodo$dInternal.semigroupDoc.append(Data$dFoldable.foldlArray(acc => v1$1 => {
              if (v1$1.tag === "Comment") {
                if (Data$dString$dCodeUnits.take(2)(v1$1._1) === "--") {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      if (v1$1._1 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray(v1$1._1).length, v1$1._1);
                    })())
                  };
                }
                return {line: false, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(lines(Data$dFunctor.arrayMap(Dodo.text)(Tidy$dUtil.splitLines(v1$1._1))))};
              }
              if (v1$1.tag === "Line") { return {line: true, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(power(Dodo$dInternal.Break)(v1$1._2))}; }
              if (v1$1.tag === "Space") {
                if (acc.line) {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      const $7 = power1(" ")(max(0)(v1$1._1 - v3.nextIndent | 0));
                      if ($7 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($7).length, $7);
                    })())
                  };
                }
                return {
                  line: false,
                  doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                    const $7 = power1(" ")(v1$1._1);
                    if ($7 === "") { return Dodo$dInternal.Empty; }
                    return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($7).length, $7);
                  })())
                };
              }
              $runtime.fail();
            })({line: false, doc: Dodo$dInternal.Empty})(tok.leadingComments).doc)(Dodo$dInternal.semigroupDoc.append((() => {
              const $5 = Tidy$dToken.printToken(Tidy$dToken.UnicodeSource)(tok.value);
              if ($5 === "") { return Dodo$dInternal.Empty; }
              return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($5).length, $5);
            })())(Data$dFoldable.foldlArray(acc => v1$1 => {
              if (v1$1.tag === "Comment") {
                if (Data$dString$dCodeUnits.take(2)(v1$1._1) === "--") {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      if (v1$1._1 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray(v1$1._1).length, v1$1._1);
                    })())
                  };
                }
                return {line: false, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(lines(Data$dFunctor.arrayMap(Dodo.text)(Tidy$dUtil.splitLines(v1$1._1))))};
              }
              if (v1$1.tag === "Line") { return {line: true, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(power(Dodo$dInternal.Break)(v1$1._2))}; }
              if (v1$1.tag === "Space") {
                if (acc.line) {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      const $7 = power1(" ")(max(0)(v1$1._1 - v3.nextIndent | 0));
                      if ($7 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($7).length, $7);
                    })())
                  };
                }
                return {
                  line: false,
                  doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                    const $7 = power1(" ")(v1$1._1);
                    if ($7 === "") { return Dodo$dInternal.Empty; }
                    return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($7).length, $7);
                  })())
                };
              }
              $runtime.fail();
            })({line: false, doc: Dodo$dInternal.Empty})(tok.trailingComments).doc)))(v2._1.init))(Dodo$dInternal.semigroupDoc.append(Data$dFoldable.foldlArray(acc => v1$1 => {
              if (v1$1.tag === "Comment") {
                if (Data$dString$dCodeUnits.take(2)(v1$1._1) === "--") {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      if (v1$1._1 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray(v1$1._1).length, v1$1._1);
                    })())
                  };
                }
                return {line: false, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(lines(Data$dFunctor.arrayMap(Dodo.text)(Tidy$dUtil.splitLines(v1$1._1))))};
              }
              if (v1$1.tag === "Line") { return {line: true, doc: Dodo$dInternal.semigroupDoc.append(acc.doc)(power(Dodo$dInternal.Break)(v1$1._2))}; }
              if (v1$1.tag === "Space") {
                if (acc.line) {
                  return {
                    line: false,
                    doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                      const $6 = power1(" ")(max(0)(v1$1._1 - v3.nextIndent | 0));
                      if ($6 === "") { return Dodo$dInternal.Empty; }
                      return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($6).length, $6);
                    })())
                  };
                }
                return {
                  line: false,
                  doc: Dodo$dInternal.semigroupDoc.append(acc.doc)((() => {
                    const $6 = power1(" ")(v1$1._1);
                    if ($6 === "") { return Dodo$dInternal.Empty; }
                    return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($6).length, $6);
                  })())
                };
              }
              $runtime.fail();
            })({line: false, doc: Dodo$dInternal.Empty})(v2._1.last.leadingComments).doc)((() => {
              const $4 = Tidy$dToken.printToken(Tidy$dToken.UnicodeSource)(v2._1.last.value);
              if ($4 === "") { return Dodo$dInternal.Empty; }
              return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($4).length, $4);
            })())))
          );
          if ($3.tag === "Empty") { return Tidy$dDoc.monoidFormatDoc.mempty; }
          return {doc: $3, leading: Tidy$dDoc.monoidLeadingComment.mempty, isEmpty: false, multiline: false, trailing: Tidy$dDoc.monoidTrailingComment.mempty};
        })());
      }
      if (v2.tag === "Nothing") { return formatToken({unicode: Tidy$dToken.UnicodeSource})(v1._1.head); }
      $runtime.fail();
    }
    if (v1.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
    $runtime.fail();
  }
};
const formatListTail = alignment => format => conf => Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.softBreak)(v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "Text",
  1,
  " "
))))(formatToken(conf)(v._1))(formatListElem(alignment)(format)(conf)(v._2)));
const formatList = openSpace => closeSpace => alignment => grouped => format => conf => v => {
  const listElems = closeSpace(Tidy$dDoc.softBreak(formatListElem(alignment)(format)(conf)(v.head))(formatListTail(alignment)(format)(conf)(v.tail)))(formatToken(conf)(v.close));
  if (grouped.tag === "Grouped") { return Tidy$dDoc.flexGroup(openSpace(formatToken(conf)(v.open))(listElems)); }
  if (grouped.tag === "NotGrouped") { return openSpace(formatToken(conf)(v.open))(listElems); }
  $runtime.fail();
};
const formatDelimited = openSpace => closeSpace => alignment => grouped => format => conf => v => {
  if (v.value.tag === "Nothing") { return formatEmptyList(conf)({open: v.open, close: v.close}); }
  if (v.value.tag === "Just") {
    return formatList(openSpace)(closeSpace)(alignment)(grouped)(format)(conf)({open: v.open, head: v.value._1.head, tail: v.value._1.tail, close: v.close});
  }
  $runtime.fail();
};
const formatDelimitedNonEmpty = openSpace => closeSpace => alignment => grouped => format => conf => v => formatList(openSpace)(closeSpace)(alignment)(grouped)(format)(conf)({
  open: v.open,
  head: v.value.head,
  tail: v.value.tail,
  close: v.close
});
const formatOneOrDelimited = format => conf => v => {
  if (v.tag === "One") { return format(conf)(v._1); }
  if (v.tag === "Many") { return formatDelimitedNonEmpty(Tidy$dDoc.softSpace)(Tidy$dDoc.softBreak)(2)(NotGrouped)(format)(conf)(v._1); }
  $runtime.fail();
};
const formatName = conf => v => formatToken(conf)(v.token);
const formatDataMembers = conf => v => {
  if (v.tag === "DataAll") { return formatToken(conf)(v._1); }
  if (v.tag === "DataEnumerated") { return formatDelimited(Tidy$dDoc.softSpace)(Tidy$dDoc.softBreak)(2)(NotGrouped)(formatName)(conf)(v._1); }
  $runtime.fail();
};
const formatExport = conf => v => {
  if (v.tag === "ExportValue") { return formatToken(conf)(v._1.token); }
  if (v.tag === "ExportOp") { return formatToken(conf)(v._1.token); }
  if (v.tag === "ExportType") {
    return Tidy$dDoc.flexGroup(Tidy$dDoc.softBreak(formatToken(conf)(v._1.token))(Tidy$dDoc.indent((() => {
      if (v._2.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v._2.tag === "Just") { return formatDataMembers(conf)(v._2._1); }
      $runtime.fail();
    })())));
  }
  if (v.tag === "ExportTypeOp") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1))((() => {
      const $2 = formatToken(conf)(v._2.token);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })());
  }
  if (v.tag === "ExportClass") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1))((() => {
      const $2 = formatToken(conf)(v._2.token);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })());
  }
  if (v.tag === "ExportModule") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1))((() => {
      const $2 = formatToken(conf)(v._2.token);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })());
  }
  if (v.tag === "ExportError") { return conf.formatError(v._1); }
  $runtime.fail();
};
const formatFundep = conf => v => {
  if (v.tag === "FundepDetermined") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    )))))(formatName(conf))(v._2));
  }
  if (v.tag === "FundepDetermines") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    ))))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))(formatName(conf))(v._1))(formatToken(conf)(v._2)))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    )))))(formatName(conf))(v._3));
  }
  $runtime.fail();
};
const formatImport = conf => v => {
  if (v.tag === "ImportValue") { return formatToken(conf)(v._1.token); }
  if (v.tag === "ImportOp") { return formatToken(conf)(v._1.token); }
  if (v.tag === "ImportType") {
    return Tidy$dDoc.flexGroup(Tidy$dDoc.softBreak(formatToken(conf)(v._1.token))(Tidy$dDoc.indent((() => {
      if (v._2.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v._2.tag === "Just") { return formatDataMembers(conf)(v._2._1); }
      $runtime.fail();
    })())));
  }
  if (v.tag === "ImportTypeOp") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1))((() => {
      const $2 = formatToken(conf)(v._2.token);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })());
  }
  if (v.tag === "ImportClass") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1))((() => {
      const $2 = formatToken(conf)(v._2.token);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })());
  }
  if (v.tag === "ImportError") { return conf.formatError(v._1); }
  $runtime.fail();
};
const formatImportDecl = conf => v => {
  const formatImportQualified = v1 => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v1._1))((() => {
    const $3 = formatToken(conf)(v1._2.token);
    if ($3.leading.lines > 0) {
      return {
        doc: $3.doc,
        isEmpty: $3.isEmpty,
        leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
        multiline: true,
        trailing: $3.trailing
      };
    }
    return $3;
  })());
  return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v.keyword))(Tidy$dDoc.indent((() => {
    const $3 = (() => {
      if (v.names.tag === "Just") {
        if (v.names._1._1.tag === "Just") {
          return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexSpaceBreak(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
            "Text",
            1,
            " "
          ))))(formatToken(conf)(v.module.token))((() => {
            const $3 = formatToken(conf)(v.names._1._1._1);
            if ($3.leading.lines > 0) {
              return {
                doc: $3.doc,
                isEmpty: $3.isEmpty,
                leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
                multiline: true,
                trailing: $3.trailing
              };
            }
            return $3;
          })()))((() => {
            const $3 = formatDelimitedNonEmpty(Tidy$dDoc.softSpace)(Tidy$dDoc.softBreak)(2)(NotGrouped)(formatImport)(conf)(v.names._1._2);
            if ($3.leading.lines > 0) {
              return {
                doc: $3.doc,
                isEmpty: $3.isEmpty,
                leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
                multiline: true,
                trailing: $3.trailing
              };
            }
            return $3;
          })()))((() => {
            const $3 = (() => {
              if (v.qualified.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
              if (v.qualified.tag === "Just") { return formatImportQualified(v.qualified._1); }
              $runtime.fail();
            })();
            if ($3.leading.lines > 0) {
              return {
                doc: $3.doc,
                isEmpty: $3.isEmpty,
                leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
                multiline: true,
                trailing: $3.trailing
              };
            }
            return $3;
          })());
        }
        if (v.names._1._1.tag === "Nothing") {
          return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v.module.token))((() => {
            const $3 = formatDelimitedNonEmpty(Tidy$dDoc.softSpace)(Tidy$dDoc.softBreak)(2)(NotGrouped)(formatImport)(conf)(v.names._1._2);
            if ($3.leading.lines > 0) {
              return {
                doc: $3.doc,
                isEmpty: $3.isEmpty,
                leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
                multiline: true,
                trailing: $3.trailing
              };
            }
            return $3;
          })()))((() => {
            const $3 = (() => {
              if (v.qualified.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
              if (v.qualified.tag === "Just") { return formatImportQualified(v.qualified._1); }
              $runtime.fail();
            })();
            if ($3.leading.lines > 0) {
              return {
                doc: $3.doc,
                isEmpty: $3.isEmpty,
                leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
                multiline: true,
                trailing: $3.trailing
              };
            }
            return $3;
          })());
        }
        $runtime.fail();
      }
      if (v.names.tag === "Nothing") {
        return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v.module.token))((() => {
          const $3 = (() => {
            if (v.qualified.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
            if (v.qualified.tag === "Just") { return formatImportQualified(v.qualified._1); }
            $runtime.fail();
          })();
          if ($3.leading.lines > 0) {
            return {
              doc: $3.doc,
              isEmpty: $3.isEmpty,
              leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
              multiline: true,
              trailing: $3.trailing
            };
          }
          return $3;
        })());
      }
      $runtime.fail();
    })();
    if ($3.leading.lines > 0) {
      return {
        doc: $3.doc,
        isEmpty: $3.isEmpty,
        leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
        multiline: true,
        trailing: $3.trailing
      };
    }
    return $3;
  })()));
};
const formatParens = format => conf => v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(formatToken(conf)(v.open))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
  const $3 = format(conf)(v.value);
  if ($3.leading.lines > 0) {
    return {
      doc: $3.doc,
      isEmpty: $3.isEmpty,
      leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
      multiline: true,
      trailing: $3.trailing
    };
  }
  return $3;
})())(formatToken(conf)(v.close)));
const formatParensBlock = format => conf => v => Tidy$dDoc.flexGroup(Tidy$dDoc.softSpace(formatToken(conf)(v.open))(Tidy$dDoc.softBreak(Tidy$dDoc.align(2)((() => {
  const $3 = format(conf)(v.value);
  if ($3.leading.lines > 0) {
    return {
      doc: $3.doc,
      isEmpty: $3.isEmpty,
      leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
      multiline: true,
      trailing: $3.trailing
    };
  }
  return $3;
})()))(formatToken(conf)(v.close))));
const formatQualifiedName = conf => v => formatToken(conf)(v.token);
const formatBasicListNonEmpty = /* #__PURE__ */ (() => formatDelimitedNonEmpty(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "Text",
  1,
  " "
)))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break)))))(2))();
const formatBasicList = /* #__PURE__ */ (() => formatDelimited(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "FlexAlt",
  Dodo$dInternal.$Doc("Text", 1, " "),
  Dodo$dInternal.Break
)))))(2))();
const flatten = x => {
  const $1 = Data$dArray.uncons(x);
  if ($1.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
  if ($1.tag === "Just") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))($1._1.head)(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    )))))(Tidy$dDoc.anchor)($1._1.tail)));
  }
  $runtime.fail();
};
const formatTypeVarBinding = conf => v => {
  if (v.tag === "TypeVarKinded") { return formatParensBlock(formatKindedTypeVarBinding)(conf)(v._1); }
  if (v.tag === "TypeVarName") { return formatToken(conf)(v._1.token); }
  $runtime.fail();
};
const formatType = conf => {
  const $1 = formatHangingType(conf);
  return x => Tidy$dHang.toFormatDoc($1(x));
};
const formatRowLabeled = conf => v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v.label.token))(Tidy$dDoc.indent(Tidy$dDoc.flexSpaceBreak((() => {
  const $2 = formatToken(conf)(v.separator);
  if ($2.leading.lines > 0) {
    return {
      doc: $2.doc,
      isEmpty: $2.isEmpty,
      leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
      multiline: true,
      trailing: $2.trailing
    };
  }
  return $2;
})())((() => {
  const $2 = Tidy$dHang.toFormatDoc(formatHangingType(conf)(v.value));
  if ($2.leading.lines > 0) {
    return {
      doc: $2.doc,
      isEmpty: $2.isEmpty,
      leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
      multiline: true,
      trailing: $2.trailing
    };
  }
  return $2;
})())));
const formatRow = openSpace => closeSpace => conf => v => {
  if (v.value.tail.tag === "Nothing") {
    if (v.value.labels.tag === "Nothing") { return formatEmptyList(conf)({open: v.open, close: v.close}); }
    if (v.value.labels.tag === "Just") {
      return formatDelimitedNonEmpty(openSpace)(closeSpace)(2)(Grouped)(formatRowLabeled)(conf)({open: v.open, value: v.value.labels._1, close: v.close});
    }
    $runtime.fail();
  }
  if (v.value.tail.tag === "Just") {
    if (v.value.labels.tag === "Nothing") {
      return closeSpace(openSpace(formatToken(conf)(v.open))(flatten([formatToken(conf)(v.value.tail._1._1), Tidy$dHang.toFormatDoc(formatHangingType(conf)(v.value.tail._1._2))])))(formatToken(conf)(v.close));
    }
    if (v.value.labels.tag === "Just") {
      return closeSpace(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      ))))(Tidy$dDoc.softBreak(openSpace(formatToken(conf)(v.open))(formatListElem(2)(formatRowLabeled)(conf)(v.value.labels._1.head)))(formatListTail(2)(formatRowLabeled)(conf)(v.value.labels._1.tail)))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "Text",
        1,
        " "
      ))))(formatToken(conf)(v.value.tail._1._1))(formatListElem(2)(formatType)(conf)(v.value.tail._1._2))))(formatToken(conf)(v.close));
    }
    $runtime.fail();
  }
  $runtime.fail();
};
const formatMonotype = conf => {
  const $1 = formatHangingMonotype(conf);
  return x => Tidy$dHang.toFormatDoc($1(x));
};
const formatKindedTypeVarBinding = conf => v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v.label.token))(Tidy$dDoc.indent(Tidy$dDoc.flexSpaceBreak((() => {
  const $2 = formatToken(conf)(v.separator);
  if ($2.leading.lines > 0) {
    return {
      doc: $2.doc,
      isEmpty: $2.isEmpty,
      leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
      multiline: true,
      trailing: $2.trailing
    };
  }
  return $2;
})())(Tidy$dHang.toFormatDoc(formatHangingType(conf)(v.value)))));
const formatHangingType = conf => {
  const $1 = formatHangingPolytype(identity)(conf);
  return x => $1(toPolytype(x));
};
const formatHangingPolytype = ind => conf => v => {
  if (v.init.length === 0) { return formatHangingMonotype(conf)(v.last); }
  if (conf.typeArrowPlacement.tag === "TypeArrowFirst") {
    const isUnicode = Data$dArray.all((() => {
      if (conf.unicode.tag === "UnicodeAlways") { return v$1 => true; }
      if (conf.unicode.tag === "UnicodeNever") { return v$1 => false; }
      if (conf.unicode.tag === "UnicodeSource") {
        return v1 => {
          if (v1.tag === "PolyArrow") {
            if (v1._2.value.tag === "TokRightArrow") { return v1._2.value._1.tag === "Unicode"; }
            if (v1._2.value.tag === "TokRightFatArrow") { return v1._2.value._1.tag === "Unicode"; }
            return false;
          }
          if (v1.tag === "PolyForall") {
            if (v1._1.value.tag === "TokForall") { return v1._1.value._1.tag === "Unicode"; }
            return false;
          }
          return false;
        };
      }
      $runtime.fail();
    })())(v.init);
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Data$dFoldable.foldlArray(k => v1 => {
        if (v1.tag === "PolyForall") {
          return doc => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.softBreak(k(Data$dFoldable.foldlArray(doc$1 => tyVar => Tidy$dDoc.flexSpaceBreak(doc$1)(Tidy$dDoc.indent(formatTypeVarBinding(conf)(tyVar))))(formatToken(conf)(v1._1))(v1._2)))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
            if (!isUnicode) {
              return {
                doc: Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.Empty, Dodo$dInternal.$Doc("Text", 1, " ")),
                leading: Tidy$dDoc.monoidLeadingComment.mempty,
                isEmpty: false,
                multiline: false,
                trailing: Tidy$dDoc.monoidTrailingComment.mempty
              };
            }
            return Tidy$dDoc.monoidFormatDoc.mempty;
          })())((() => {
            const $7 = formatToken(conf)(v1._3);
            if ($7.leading.lines > 0) {
              return {
                doc: $7.doc,
                isEmpty: $7.isEmpty,
                leading: {doc: $7.leading.doc, left: $7.leading.left, lines: 0, multiline: $7.leading.multiline, right: $7.leading.right},
                multiline: true,
                trailing: $7.trailing
              };
            }
            return $7;
          })())))((() => {
            const $7 = Tidy$dDoc.alignCurrentColumn(doc);
            if ($7.leading.lines > 0) {
              return {
                doc: $7.doc,
                isEmpty: $7.isEmpty,
                leading: {doc: $7.leading.doc, left: $7.leading.left, lines: 0, multiline: $7.leading.multiline, right: $7.leading.right},
                multiline: true,
                trailing: $7.trailing
              };
            }
            return $7;
          })());
        }
        if (v1.tag === "PolyArrow") {
          return doc => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
            "FlexAlt",
            Dodo$dInternal.$Doc("Text", 1, " "),
            Dodo$dInternal.Break
          ))))(k(Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingMonotype(conf)(v1._1)))))((() => {
            const $7 = formatToken(conf)(v1._2);
            if ($7.leading.lines > 0) {
              return {
                doc: $7.doc,
                isEmpty: $7.isEmpty,
                leading: {doc: $7.leading.doc, left: $7.leading.left, lines: 0, multiline: $7.leading.multiline, right: $7.leading.right},
                multiline: true,
                trailing: $7.trailing
              };
            }
            return $7;
          })()))((() => {
            const $7 = Tidy$dDoc.alignCurrentColumn(doc);
            if ($7.leading.lines > 0) {
              return {
                doc: $7.doc,
                isEmpty: $7.isEmpty,
                leading: {doc: $7.leading.doc, left: $7.leading.left, lines: 0, multiline: $7.leading.multiline, right: $7.leading.right},
                multiline: true,
                trailing: $7.trailing
              };
            }
            return $7;
          })());
        }
        $runtime.fail();
      })(ind)(v.init)((() => {
        const $4 = Tidy$dHang.toFormatDoc(formatHangingMonotype(conf)(v.last));
        if ($4.leading.lines > 0) {
          return {
            doc: $4.doc,
            isEmpty: $4.isEmpty,
            leading: {doc: $4.leading.doc, left: $4.leading.left, lines: 0, multiline: $4.leading.multiline, right: $4.leading.right},
            multiline: true,
            trailing: $4.trailing
          };
        }
        return $4;
      })()))
    );
  }
  if (conf.typeArrowPlacement.tag === "TypeArrowLast") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      ))))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      )))))(v1 => {
        if (v1.tag === "PolyForall") {
          return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(Data$dFoldable.foldlArray(doc => tyVar => Tidy$dDoc.flexSpaceBreak(doc)(Tidy$dDoc.indent(formatTypeVarBinding(conf)(tyVar))))(formatToken(conf)(v1._1))(v1._2))(Tidy$dDoc.indent((() => {
            const $4 = formatToken(conf)(v1._3);
            if ($4.leading.lines > 0) {
              return {
                doc: $4.doc,
                isEmpty: $4.isEmpty,
                leading: {doc: $4.leading.doc, left: $4.leading.left, lines: 0, multiline: $4.leading.multiline, right: $4.leading.right},
                multiline: true,
                trailing: $4.trailing
              };
            }
            return $4;
          })()));
        }
        if (v1.tag === "PolyArrow") {
          return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingPolytype(identity)(conf)(toPolytype(v1._1)))))(Tidy$dDoc.indent((() => {
            const $4 = formatToken(conf)(v1._2);
            if ($4.leading.lines > 0) {
              return {
                doc: $4.doc,
                isEmpty: $4.isEmpty,
                leading: {doc: $4.leading.doc, left: $4.leading.left, lines: 0, multiline: $4.leading.multiline, right: $4.leading.right},
                multiline: true,
                trailing: $4.trailing
              };
            }
            return $4;
          })()));
        }
        $runtime.fail();
      })(v.init))(Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingMonotype(conf)(v.last)))))
    );
  }
  $runtime.fail();
};
const formatHangingMonotype = conf => v => {
  if (v.tag === "TypeVar") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "TypeConstructor") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "TypeWildcard") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "TypeHole") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "TypeString") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "TypeInt") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
        if (v._1.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
        if (v._1.tag === "Just") { return formatToken(conf)(v._1._1); }
        $runtime.fail();
      })())(formatToken(conf)(v._2)))
    );
  }
  if (v.tag === "TypeArrowName") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "TypeOpName") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "TypeRow") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatRow(Tidy$dDoc.softSpace)(Tidy$dDoc.softBreak)(conf)(v._1))); }
  if (v.tag === "TypeRecord") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(formatRow(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      )))))(conf)(v._1))
    );
  }
  if (v.tag === "TypeApp") {
    return Tidy$dHang.hangApp(formatHangingPolytype(identity)(conf)(toPolytype(v._1)))(Data$dFunctor.arrayMap(x => formatHangingPolytype(identity)(conf)(toPolytype(x)))(v._2));
  }
  if (v.tag === "TypeParens") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatParensBlock(formatType)(conf)(v._1))); }
  if (v.tag === "TypeKinded") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dHang.toFormatDoc(formatHangingPolytype(identity)(conf)(toPolytype(v._1))))(Tidy$dDoc.indent(Tidy$dDoc.flexSpaceBreak((() => {
        const $2 = formatToken(conf)(v._2);
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })())((() => {
        const $2 = Tidy$dHang.toFormatDoc(formatHangingPolytype(identity)(conf)(toPolytype(v._3)));
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })()))))
    );
  }
  if (v.tag === "TypeOp") {
    return formatHangingOperatorTree(formatQualifiedName)(formatHangingType)(conf)(Tidy$dPrecedence.toOperatorTree(conf.operators)(v$1 => Tidy$dPrecedence.$QualifiedOperator(
      v$1.module,
      Tidy$dPrecedence.OperatorType,
      v$1.name
    ))(v._1)(v._2));
  }
  if (v.tag === "TypeError") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(conf.formatError(v._1))); }
  if (v.tag === "TypeArrow") { return Partial._crashWith("formatMonotype: TypeArrow handled by formatPolytype"); }
  if (v.tag === "TypeConstrained") { return Partial._crashWith("formatMonotype: TypeConstrained handled by formatPolytype"); }
  if (v.tag === "TypeForall") { return Partial._crashWith("formatMonotype: TypeForall handled by formatPolytype"); }
  $runtime.fail();
};
const formatHangingDataCtor = conf => v => {
  const hangingName = Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v.name.token)));
  if (v.fields.length > 0) { return Tidy$dHang.hangApp(hangingName)(Data$dFunctor.arrayMap(x => formatHangingPolytype(identity)(conf)(toPolytype(x)))(v.fields)); }
  return hangingName;
};
const formatDataCtor = conf => x => Tidy$dHang.toFormatDoc(formatHangingDataCtor(conf)(x));
const formatConstraints = conf => v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatOneOrDelimited(formatType)(conf)(v._1))((() => {
  const $2 = formatToken(conf)((() => {
    if (v._2.value.tag === "TokOperator") {
      if (v._2.value._1.tag === "Nothing") {
        if (v._2.value._2 === "<=") {
          if (
            (() => {
              if (conf.unicode.tag === "UnicodeSource") { return false; }
              return conf.unicode.tag === "UnicodeAlways";
            })()
          ) {
            return {
              value: PureScript$dCST$dTypes.$Token("TokOperator", Data$dMaybe.Nothing, "⇐"),
              leadingComments: v._2.leadingComments,
              range: v._2.range,
              trailingComments: v._2.trailingComments
            };
          }
          return v._2;
        }
        if (v._2.value._2 === "⇐") {
          if (
            (() => {
              if (conf.unicode.tag === "UnicodeSource") { return false; }
              if (conf.unicode.tag === "UnicodeAlways") { return false; }
              return conf.unicode.tag === "UnicodeNever";
            })()
          ) {
            return {
              value: PureScript$dCST$dTypes.$Token("TokOperator", Data$dMaybe.Nothing, "<="),
              leadingComments: v._2.leadingComments,
              range: v._2.range,
              trailingComments: v._2.trailingComments
            };
          }
          return v._2;
        }
        return v._2;
      }
      return v._2;
    }
    return v._2;
  })());
  if ($2.leading.lines > 0) {
    return {
      doc: $2.doc,
      isEmpty: $2.isEmpty,
      leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
      multiline: true,
      trailing: $2.trailing
    };
  }
  return $2;
})());
const formatInstanceHead = conf => v => {
  const hdTypes = Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))))((() => {
    if (v._1.constraints.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
    if (v._1.constraints.tag === "Just") { return formatConstraints(conf)(v._1.constraints._1); }
    $runtime.fail();
  })())(Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1.className.token))(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 1, " "),
    Dodo$dInternal.Break
  )))))(x => Tidy$dHang.toFormatDoc(formatHangingPolytype(identity)(conf)(toPolytype(x))))(v._1.types)))));
  if (v._1.name.tag === "Just") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexSpaceBreak(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    ))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1.keyword))((() => {
      const $3 = formatToken(conf)(v._1.name._1._1.token);
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })()))((() => {
      const $3 = formatToken(conf)(v._1.name._1._2);
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })()))(Tidy$dDoc.indent(hdTypes)))(Tidy$dDoc.indent((() => {
      if (v._2.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v._2.tag === "Just") { return formatToken(conf)(v._2._1); }
      $runtime.fail();
    })()));
  }
  if (v._1.name.tag === "Nothing") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v._1.keyword))(Tidy$dDoc.indent(hdTypes)))(Tidy$dDoc.indent((() => {
      if (v._2.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v._2.tag === "Just") { return formatToken(conf)(v._2._1); }
      $runtime.fail();
    })()));
  }
  $runtime.fail();
};
const formatClassHead = conf => v => Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v._1.keyword))(Tidy$dDoc.indent(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "Text",
  1,
  " "
))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "FlexAlt",
  Dodo$dInternal.$Doc("Text", 1, " "),
  Dodo$dInternal.Break
))))((() => {
  const $2 = (() => {
    if (v._1.super.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
    if (v._1.super.tag === "Just") { return formatConstraints(conf)(v._1.super._1); }
    $runtime.fail();
  })();
  if ($2.leading.lines > 0) {
    return {
      doc: $2.doc,
      isEmpty: $2.isEmpty,
      leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
      multiline: true,
      trailing: $2.trailing
    };
  }
  return $2;
})())(Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "FlexAlt",
  Dodo$dInternal.$Doc("Text", 1, " "),
  Dodo$dInternal.Break
))))(formatToken(conf)(v._1.name.token))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "FlexAlt",
  Dodo$dInternal.$Doc("Text", 1, " "),
  Dodo$dInternal.Break
)))))(x => Tidy$dDoc.indent(formatTypeVarBinding(conf)(x)))(v._1.vars)))))(Tidy$dDoc.flexGroup((() => {
  const $2 = (() => {
    if (v._1.fundeps.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
    if (v._1.fundeps.tag === "Just") {
      return Tidy$dDoc.softBreak(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v._1.fundeps._1._1))(formatListElem(2)(formatFundep)(conf)(v._1.fundeps._1._2.head)))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.softBreak)(v2 => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "Text",
        1,
        " "
      ))))(formatToken(conf)(v2._1))(formatListElem(2)(formatFundep)(conf)(v2._2)))(v._1.fundeps._1._2.tail));
    }
    $runtime.fail();
  })();
  if ($2.leading.lines > 0) {
    return {
      doc: $2.doc,
      isEmpty: $2.isEmpty,
      leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
      multiline: true,
      trailing: $2.trailing
    };
  }
  return $2;
})())))((() => {
  if (v._2.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
  if (v._2.tag === "Just") { return formatToken(conf)(v._2._1); }
  $runtime.fail();
})())));
const formatDataHead = conf => v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v.keyword))(Tidy$dDoc.indent(Tidy$dDoc.flexSpaceBreak((() => {
  const $2 = formatToken(conf)(v.name.token);
  if ($2.leading.lines > 0) {
    return {
      doc: $2.doc,
      isEmpty: $2.isEmpty,
      leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
      multiline: true,
      trailing: $2.trailing
    };
  }
  return $2;
})())(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
  "FlexAlt",
  Dodo$dInternal.$Doc("Text", 1, " "),
  Dodo$dInternal.Break
)))))(formatTypeVarBinding(conf))(v.vars))));
const formatSignature = conf => v => {
  if (conf.typeArrowPlacement.tag === "TypeArrowFirst") {
    const polytype = toPolytype(v.value);
    const width = (() => {
      if (
        (() => {
          if (conf.unicode.tag === "UnicodeAlways") { return true; }
          if (conf.unicode.tag === "UnicodeNever") { return false; }
          if (conf.unicode.tag === "UnicodeSource") {
            if (v.separator.value.tag === "TokDoubleColon") { return v.separator.value._1.tag === "Unicode"; }
            return false;
          }
          $runtime.fail();
        })()
      ) {
        return 2;
      }
      return 3;
    })();
    const formattedPolytype = formatHangingPolytype(Tidy$dDoc.align(width))(conf)(polytype);
    if (polytype.init.length === 0) {
      return Tidy$dDoc.flexSpaceBreak(v.label)(Tidy$dDoc.indent(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))((() => {
        const $5 = formatToken(conf)(v.separator);
        if ($5.leading.lines > 0) {
          return {
            doc: $5.doc,
            isEmpty: $5.isEmpty,
            leading: {doc: $5.leading.doc, left: $5.leading.left, lines: 0, multiline: $5.leading.multiline, right: $5.leading.right},
            multiline: true,
            trailing: $5.trailing
          };
        }
        return $5;
      })())((() => {
        const $5 = Tidy$dDoc.align(width)(Tidy$dHang.toFormatDoc(formattedPolytype));
        if ($5.leading.lines > 0) {
          return {
            doc: $5.doc,
            isEmpty: $5.isEmpty,
            leading: {doc: $5.leading.doc, left: $5.leading.left, lines: 0, multiline: $5.leading.multiline, right: $5.leading.right},
            multiline: true,
            trailing: $5.trailing
          };
        }
        return $5;
      })())));
    }
    return Tidy$dDoc.flexSpaceBreak(v.label)(Tidy$dDoc.indent(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))((() => {
      const $5 = formatToken(conf)(v.separator);
      if ($5.leading.lines > 0) {
        return {
          doc: $5.doc,
          isEmpty: $5.isEmpty,
          leading: {doc: $5.leading.doc, left: $5.leading.left, lines: 0, multiline: $5.leading.multiline, right: $5.leading.right},
          multiline: true,
          trailing: $5.trailing
        };
      }
      return $5;
    })())((() => {
      const $5 = Tidy$dHang.toFormatDoc(formattedPolytype);
      if ($5.leading.lines > 0) {
        return {
          doc: $5.doc,
          isEmpty: $5.isEmpty,
          leading: {doc: $5.leading.doc, left: $5.leading.left, lines: 0, multiline: $5.leading.multiline, right: $5.leading.right},
          multiline: true,
          trailing: $5.trailing
        };
      }
      return $5;
    })())));
  }
  if (conf.typeArrowPlacement.tag === "TypeArrowLast") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(v.label)(Tidy$dDoc.indent(Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "FlexAlt",
      Dodo$dInternal.$Doc("Text", 1, " "),
      Dodo$dInternal.Break
    ))))((() => {
      const $2 = formatToken(conf)(v.separator);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })())((() => {
      const $2 = Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingPolytype(identity)(conf)(toPolytype(v.value))));
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })()))));
  }
  $runtime.fail();
};
const eqTypeArrowOption = {
  eq: x => y => {
    if (x.tag === "TypeArrowFirst") { return y.tag === "TypeArrowFirst"; }
    if (x.tag === "TypeArrowLast") { return y.tag === "TypeArrowLast"; }
    return false;
  }
};
const eqImportWrapOption = {
  eq: x => y => {
    if (x.tag === "ImportWrapSource") { return y.tag === "ImportWrapSource"; }
    if (x.tag === "ImportWrapAuto") { return y.tag === "ImportWrapAuto"; }
    return false;
  }
};
const eqImportSortOpion = {
  eq: x => y => {
    if (x.tag === "ImportSortSource") { return y.tag === "ImportSortSource"; }
    if (x.tag === "ImportSortIde") { return y.tag === "ImportSortIde"; }
    return false;
  }
};
const eqImportComparison = {
  eq: x => y => {
    if (x.tag === "ImportClassCmp") {
      if (y.tag === "ImportClassCmp") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "ImportTypeOpCmp") {
      if (y.tag === "ImportTypeOpCmp") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "ImportTypeCmp") {
      if (y.tag === "ImportTypeCmp") { return x._1 === y._1 && x._2 === y._2 && eq5(x._3)(y._3); }
      return false;
    }
    if (x.tag === "ImportValueCmp") {
      if (y.tag === "ImportValueCmp") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "ImportOpCmp") {
      if (y.tag === "ImportOpCmp") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "ImportErrorCmp") { return y.tag === "ImportErrorCmp"; }
    return false;
  }
};
const eq10 = /* #__PURE__ */ (() => Data$dEq.eqArrayImpl(eqImportComparison.eq))();
const eqImportModuleComparison = {
  eq: x => y => x._1 === y._1 && x._2 === y._2 && eq10(x._3)(y._3) && (() => {
    if (x._4.tag === "Nothing") { return y._4.tag === "Nothing"; }
    if (x._4.tag === "Just") {
      if (y._4.tag === "Just") { return x._4._1 === y._4._1; }
      return false;
    }
    return false;
  })()
};
const ordImportComparison = {
  compare: x => y => {
    if (x.tag === "ImportClassCmp") {
      if (y.tag === "ImportClassCmp") { return Data$dOrd.ordString.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ImportClassCmp") { return Data$dOrdering.GT; }
    if (x.tag === "ImportTypeOpCmp") {
      if (y.tag === "ImportTypeOpCmp") { return Data$dOrd.ordString.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ImportTypeOpCmp") { return Data$dOrdering.GT; }
    if (x.tag === "ImportTypeCmp") {
      if (y.tag === "ImportTypeCmp") {
        const v = Data$dOrd.ordString.compare(x._1)(y._1);
        if (v.tag === "LT") { return Data$dOrdering.LT; }
        if (v.tag === "GT") { return Data$dOrdering.GT; }
        const v1 = Data$dOrd.ordBoolean.compare(x._2)(y._2);
        if (v1.tag === "LT") { return Data$dOrdering.LT; }
        if (v1.tag === "GT") { return Data$dOrdering.GT; }
        return compare3(x._3)(y._3);
      }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ImportTypeCmp") { return Data$dOrdering.GT; }
    if (x.tag === "ImportValueCmp") {
      if (y.tag === "ImportValueCmp") { return Data$dOrd.ordString.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ImportValueCmp") { return Data$dOrdering.GT; }
    if (x.tag === "ImportOpCmp") {
      if (y.tag === "ImportOpCmp") { return Data$dOrd.ordString.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ImportOpCmp") { return Data$dOrdering.GT; }
    if (x.tag === "ImportErrorCmp") {
      if (y.tag === "ImportErrorCmp") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqImportComparison
};
const compare8 = /* #__PURE__ */ (() => Data$dOrd.ordArray(ordImportComparison).compare)();
const ordImportModuleComparison = {
  compare: x => y => {
    const v = Data$dOrd.ordString.compare(x._1)(y._1);
    if (v.tag === "LT") { return Data$dOrdering.LT; }
    if (v.tag === "GT") { return Data$dOrdering.GT; }
    const v1 = Data$dOrd.ordInt.compare(x._2)(y._2);
    if (v1.tag === "LT") { return Data$dOrdering.LT; }
    if (v1.tag === "GT") { return Data$dOrdering.GT; }
    const v2 = compare8(x._3)(y._3);
    if (v2.tag === "LT") { return Data$dOrdering.LT; }
    if (v2.tag === "GT") { return Data$dOrdering.GT; }
    return compare7(x._4)(y._4);
  },
  Eq0: () => eqImportModuleComparison
};
const sortImportsIde = v => {
  const v1 = Data$dArray.unzip(v.value.tail);
  const $2 = Data$dArray.unzip(Data$dArray.sortWith(ordImportComparison)(Data$dTuple.fst)(Data$dFunctor.arrayMap(x => Data$dTuple.$Tuple(
    (() => {
      if (x.tag === "ImportValue") { return $ImportComparison("ImportValueCmp", x._1.name); }
      if (x.tag === "ImportOp") { return $ImportComparison("ImportOpCmp", x._1.name); }
      if (x.tag === "ImportType") {
        if (x._2.tag === "Nothing") { return $ImportComparison("ImportTypeCmp", x._1.name, true, []); }
        if (x._2.tag === "Just") {
          if (x._2._1.tag === "DataEnumerated") {
            if (x._2._1._1.value.tag === "Nothing") { return $ImportComparison("ImportTypeCmp", x._1.name, true, []); }
            if (x._2._1._1.value.tag === "Just") {
              return $ImportComparison(
                "ImportTypeCmp",
                x._1.name,
                true,
                Data$dFunctor.arrayMap(x$1 => x$1.name)(Data$dSemigroup.concatArray([x._2._1._1.value._1.head])(Data$dFunctor.arrayMap(Data$dTuple.snd)(x._2._1._1.value._1.tail)))
              );
            }
            $runtime.fail();
          }
          if (x._2._1.tag === "DataAll") { return $ImportComparison("ImportTypeCmp", x._1.name, false, []); }
          $runtime.fail();
        }
        $runtime.fail();
      }
      if (x.tag === "ImportTypeOp") { return $ImportComparison("ImportTypeOpCmp", x._2.name); }
      if (x.tag === "ImportClass") { return $ImportComparison("ImportClassCmp", x._2.name); }
      if (x.tag === "ImportError") { return ImportErrorCmp; }
      $runtime.fail();
    })(),
    x
  ))(Data$dSemigroup.concatArray([v.value.head])(v1._2))));
  return Data$dTuple.$Tuple(
    $2._1,
    {
      open: v.open,
      value: {
        head: (() => {
          const $3 = Data$dArray.index($2._2)(0);
          if ($3.tag === "Just") { return $3._1; }
          $runtime.fail();
        })(),
        tail: Data$dArray.zip(v1._1)((() => {
          const $3 = Data$dArray.tail($2._2);
          if ($3.tag === "Just") { return $3._1; }
          $runtime.fail();
        })())
      },
      close: v.close
    }
  );
};
const defaultFormatOptions = dictFormatError => (
  {
    formatError: dictFormatError.formatError,
    unicode: Tidy$dToken.UnicodeSource,
    typeArrowPlacement: TypeArrowFirst,
    operators: Data$dMap$dInternal.Leaf,
    importSort: ImportSortSource,
    importWrap: ImportWrapSource
  }
);
const declareHanging = label => spc => separator => value => spc(label)(Tidy$dHang.toFormatDoc(Tidy$dHang.hang(Tidy$dDoc.indent(separator))(value)));
const formatRecordLabeled = format => conf => v => {
  if (v.tag === "RecordPun") { return formatToken(conf)(v._1.token); }
  if (v.tag === "RecordField") {
    return declareHanging(formatToken(conf)(v._1.token))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity)))((() => {
      const $3 = formatToken(conf)(v._2);
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })())(format(conf)(v._3));
  }
  $runtime.fail();
};
const formatHangingBinder = conf => v => {
  if (v.tag === "BinderWildcard") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "BinderVar") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "BinderNamed") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(formatToken(conf)(v._1.token))(Tidy$dDoc.flexSoftBreak((() => {
        const $2 = formatToken(conf)(v._2);
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })())(Tidy$dDoc.indent(formatBinder(conf)(v._3)))))
    );
  }
  if (v.tag === "BinderConstructor") {
    const ctorName = Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token)));
    if (v._2.length > 0) { return Tidy$dHang.hangApp(ctorName)(Data$dFunctor.arrayMap(formatHangingBinder(conf))(v._2)); }
    return ctorName;
  }
  if (v.tag === "BinderBoolean") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "BinderChar") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "BinderString") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "BinderInt") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
        if (v._1.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
        if (v._1.tag === "Just") { return formatToken(conf)(v._1._1); }
        $runtime.fail();
      })())(formatToken(conf)(v._2)))
    );
  }
  if (v.tag === "BinderNumber") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
        if (v._1.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
        if (v._1.tag === "Just") { return formatToken(conf)(v._1._1); }
        $runtime.fail();
      })())(formatToken(conf)(v._2)))
    );
  }
  if (v.tag === "BinderArray") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatBasicList(Grouped)(formatBinder)(conf)(v._1))); }
  if (v.tag === "BinderRecord") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatBasicList(Grouped)(formatRecordLabeled(formatHangingBinder))(conf)(v._1))); }
  if (v.tag === "BinderParens") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatParensBlock(formatBinder)(conf)(v._1))); }
  if (v.tag === "BinderTyped") {
    return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatSignature(conf)({label: formatBinder(conf)(v._1), separator: v._2, value: v._3})));
  }
  if (v.tag === "BinderOp") {
    return formatHangingOperatorTree(formatQualifiedName)(formatHangingBinder)(conf)(Tidy$dPrecedence.toOperatorTree(conf.operators)(v$1 => Tidy$dPrecedence.$QualifiedOperator(
      v$1.module,
      Tidy$dPrecedence.OperatorValue,
      v$1.name
    ))(v._1)(v._2));
  }
  if (v.tag === "BinderError") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(conf.formatError(v._1))); }
  $runtime.fail();
};
const formatBinder = conf => x => Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(x));
const formatWhere = conf => v => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(formatToken(conf)(v._1))(formatLetGroups$lazy()(conf)(v._2));
const formatValueBinding = conf => v => {
  if (v.guarded.tag === "Unconditional") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    ))))(Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v.name.token))(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "FlexAlt",
      Dodo$dInternal.$Doc("Text", 1, " "),
      Dodo$dInternal.Break
    )))))(x => {
      const $3 = Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(x));
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })(v.binders))))(Tidy$dHang.toFormatDoc(Tidy$dHang.hang(Tidy$dDoc.indent((() => {
      const $2 = formatToken(conf)(v.guarded._1);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })()))(formatHangingExpr(conf)(v.guarded._2.expr)))))(Tidy$dDoc.indent((() => {
      if (v.guarded._2.bindings.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v.guarded._2.bindings.tag === "Just") { return formatWhere(conf)(v.guarded._2.bindings._1); }
      $runtime.fail();
    })()));
  }
  if (v.guarded.tag === "Guarded") {
    const valBinders = Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v.name.token))(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "FlexAlt",
      Dodo$dInternal.$Doc("Text", 1, " "),
      Dodo$dInternal.Break
    )))))(x => {
      const $3 = Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(x)));
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })(v.binders)));
    if (v.guarded._1.length === 1) {
      return Tidy$dHang.toFormatDoc(Tidy$dHang.hang(valBinders)(formatGuardedExpr(conf)((() => {
        const $3 = Data$dArray.index(v.guarded._1)(0);
        if ($3.tag === "Just") { return $3._1; }
        $runtime.fail();
      })())));
    }
    return Tidy$dDoc.flexSpaceBreak(valBinders)(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))((() => {
      const $3 = formatGuardedExpr(conf);
      return x => Tidy$dHang.toFormatDoc($3(x));
    })())(v.guarded._1)));
  }
  $runtime.fail();
};
const formatRecordUpdate = conf => v => {
  if (v.tag === "RecordUpdateLeaf") {
    return declareHanging(formatToken(conf)(v._1.token))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))(formatToken(conf)(v._2))(formatHangingExpr(conf)(v._3));
  }
  if (v.tag === "RecordUpdateBranch") {
    return Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v._1.token))(Tidy$dDoc.indent(formatBasicListNonEmpty(Grouped)(formatRecordUpdate)(conf)(v._2)));
  }
  $runtime.fail();
};
const formatPatternGuard = conf => v => {
  if (v.binder.tag === "Nothing") { return formatExpr(conf)(v.expr); }
  if (v.binder.tag === "Just") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(v.binder._1._1)))(Tidy$dDoc.indent(Tidy$dDoc.flexSpaceBreak((() => {
      const $2 = formatToken(conf)(v.binder._1._2);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })())(formatExpr(conf)(v.expr))));
  }
  $runtime.fail();
};
const formatLetBinding = conf => v => {
  if (v.tag === "LetBindingSignature") { return formatSignature(conf)({label: formatToken(conf)(v._1.label.token), separator: v._1.separator, value: v._1.value}); }
  if (v.tag === "LetBindingName") { return formatValueBinding(conf)(v._1); }
  if (v.tag === "LetBindingPattern") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    ))))(Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(v._1))))(Tidy$dHang.toFormatDoc(Tidy$dHang.hang(Tidy$dDoc.indent((() => {
      const $2 = formatToken(conf)(v._2);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })()))(formatHangingExpr(conf)(v._3.expr)))))(Tidy$dDoc.indent((() => {
      if (v._3.bindings.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v._3.bindings.tag === "Just") { return formatWhere(conf)(v._3.bindings._1); }
      $runtime.fail();
    })()));
  }
  if (v.tag === "LetBindingError") { return conf.formatError(v._1); }
  $runtime.fail();
};
const formatHangingExpr = conf => v => {
  if (v.tag === "ExprHole") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "ExprSection") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "ExprIdent") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "ExprConstructor") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "ExprBoolean") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "ExprChar") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "ExprString") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "ExprInt") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "ExprNumber") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1))); }
  if (v.tag === "ExprArray") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatBasicList(Grouped)(formatExpr)(conf)(v._1))); }
  if (v.tag === "ExprRecord") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatBasicList(Grouped)(formatRecordLabeled(formatHangingExpr))(conf)(v._1))); }
  if (v.tag === "ExprParens") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatParensBlock(formatExpr)(conf)(v._1))); }
  if (v.tag === "ExprTyped") {
    return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatSignature(conf)({label: formatExpr(conf)(v._1), separator: v._2, value: v._3})));
  }
  if (v.tag === "ExprInfix") {
    return Tidy$dHang.hangOps(formatHangingExpr(conf)(v._1))(Data$dFunctor.arrayMap(v1 => Tidy$dHang.$HangingOp(
      3,
      formatParens(formatExpr)(conf)(v1._1),
      formatHangingExpr(conf)(v1._2)
    ))(v._2));
  }
  if (v.tag === "ExprOp") {
    return formatHangingOperatorTree(formatQualifiedName)(formatHangingExpr)(conf)(Tidy$dPrecedence.toOperatorTree(conf.operators)(v$1 => Tidy$dPrecedence.$QualifiedOperator(
      v$1.module,
      Tidy$dPrecedence.OperatorValue,
      v$1.name
    ))(v._1)(v._2));
  }
  if (v.tag === "ExprOpName") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatToken(conf)(v._1.token))); }
  if (v.tag === "ExprNegate") {
    return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(formatToken(conf)(v._1))(formatExpr(conf)(v._2))));
  }
  if (v.tag === "ExprRecordAccessor") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(formatExpr(conf)(v._1.expr))(Tidy$dDoc.indent(foldMap3(Tidy$dDoc.anchor)([
        formatToken(conf)(v._1.dot),
        formatToken(conf)(v._1.path.head.token),
        foldMap3(v1 => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
          const $3 = formatToken(conf)(v1._1);
          if ($3.leading.lines > 0) {
            return {
              doc: $3.doc,
              isEmpty: $3.isEmpty,
              leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
              multiline: true,
              trailing: $3.trailing
            };
          }
          return $3;
        })())((() => {
          const $3 = formatToken(conf)(v1._2.token);
          if ($3.leading.lines > 0) {
            return {
              doc: $3.doc,
              isEmpty: $3.isEmpty,
              leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
              multiline: true,
              trailing: $3.trailing
            };
          }
          return $3;
        })()))(v._1.path.tail)
      ]))))
    );
  }
  if (v.tag === "ExprRecordUpdate") {
    return Tidy$dHang.hang(formatExpr(conf)(v._1))(Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatBasicListNonEmpty(Grouped)(formatRecordUpdate)(conf)(v._2))));
  }
  if (v.tag === "ExprApp") { return Tidy$dHang.hangApp(formatHangingExpr(conf)(v._1))(Data$dFunctor.arrayMap(formatHangingExpr(conf))(v._2)); }
  if (v.tag === "ExprLambda") {
    return Tidy$dHang.hang(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(formatToken(conf)(v._1.symbol))(Tidy$dDoc.alignCurrentColumn(Tidy$dDoc.flexGroup(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "FlexAlt",
      Dodo$dInternal.$Doc("Text", 1, " "),
      Dodo$dInternal.Break
    )))))(x => {
      const $3 = Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(x));
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })(v._1.binders)))))(Tidy$dDoc.indent((() => {
      const $2 = formatToken(conf)(v._1.arrow);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })())))(formatHangingExpr(conf)(v._1.body));
  }
  if (v.tag === "ExprIf") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatElseIfChain(conf)(toElseIfChain(v._1)))); }
  if (v.tag === "ExprCase") {
    return Tidy$dHang.hang(Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v._1.keyword))(Tidy$dDoc.indent(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "FlexAlt",
      Dodo$dInternal.$Doc("Text", 1, " "),
      Dodo$dInternal.Break
    ))))(Data$dFoldable.foldlArray(doc => v1 => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "FlexAlt",
      Dodo$dInternal.$Doc("Text", 1, " "),
      Dodo$dInternal.Break
    ))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(doc)((() => {
      const $4 = formatToken(conf)(v1._1);
      if ($4.leading.lines > 0) {
        return {
          doc: $4.doc,
          isEmpty: $4.isEmpty,
          leading: {doc: $4.leading.doc, left: $4.leading.left, lines: 0, multiline: $4.leading.multiline, right: $4.leading.right},
          multiline: true,
          trailing: $4.trailing
        };
      }
      return $4;
    })()))(Tidy$dDoc.flexGroup(formatExpr(conf)(v1._2))))(Tidy$dDoc.flexGroup(formatExpr(conf)(v._1.head.head)))(v._1.head.tail))((() => {
      const $2 = formatToken(conf)(v._1.of);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })()))))(Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))((() => {
        const $2 = formatCaseBranch(conf);
        return x => Tidy$dDoc.flexGroup($2(x));
      })())(v._1.branches))
    ));
  }
  if (v.tag === "ExprLet") {
    return Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      ))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))))(formatToken(conf)(v._1.keyword))(Tidy$dDoc.indent(formatLetGroups$lazy()(conf)(v._1.bindings))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      ))))(formatToken(conf)(v._1.in))(Tidy$dDoc.indent(Tidy$dDoc.flexGroup(formatExpr(conf)(v._1.body))))))
    );
  }
  if (v.tag === "ExprDo") {
    return Tidy$dHang.hang(formatToken(conf)(v._1.keyword))(Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))((() => {
        const $2 = formatDoStatement(conf);
        return x => Tidy$dDoc.flexGroup($2(x));
      })())(v._1.statements))
    ));
  }
  if (v.tag === "ExprAdo") {
    return Tidy$dHang.hang(formatToken(conf)(v._1.keyword))(Tidy$dHang.$HangingDoc(
      "HangBreak",
      Tidy$dDoc.flexGroup(Tidy$dDoc.flexSpaceBreak(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(formatDoStatement(conf))(v._1.statements))(Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v._1.in))(Tidy$dDoc.indent(formatExpr(conf)(v._1.result)))))
    ));
  }
  if (v.tag === "ExprError") { return Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(conf.formatError(v._1))); }
  $runtime.fail();
};
const formatGuardedExpr = conf => v => Tidy$dHang.hangWithIndent(x => Tidy$dDoc.align(2)(Tidy$dDoc.indent(x)))(Tidy$dHang.$HangingDoc(
  "HangBreak",
  Tidy$dDoc.flexGroup(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
    "Text",
    1,
    " "
  ))))(formatToken(conf)(v.bar))(Tidy$dDoc.flexGroup(Tidy$dDoc.softBreak(formatListElem(2)(formatPatternGuard)(conf)(v.patterns.head))(formatListTail(2)(formatPatternGuard)(conf)(v.patterns.tail)))))((() => {
    const $2 = formatToken(conf)(v.separator);
    if ($2.leading.lines > 0) {
      return {
        doc: $2.doc,
        isEmpty: $2.isEmpty,
        leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
        multiline: true,
        trailing: $2.trailing
      };
    }
    return $2;
  })()))
))((() => {
  if (v.where.bindings.tag === "Nothing") { return [formatHangingExpr(conf)(v.where.expr)]; }
  if (v.where.bindings.tag === "Just") {
    return [formatHangingExpr(conf)(v.where.expr), Tidy$dHang.$HangingDoc("HangBreak", Tidy$dDoc.flexGroup(formatWhere(conf)(v.where.bindings._1)))];
  }
  $runtime.fail();
})());
const formatExpr = conf => x => Tidy$dHang.toFormatDoc(formatHangingExpr(conf)(x));
const formatElseIfChain = conf => {
  const $1 = Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 1, " "),
    Dodo$dInternal.Break
  )))))(v => {
    if (v.tag === "IfThen") {
      return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v._1))(Tidy$dDoc.indent((() => {
        const $2 = Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingExpr(conf)(v._2)));
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })())))(Tidy$dHang.toFormatDoc(Tidy$dHang.hang((() => {
        const $2 = formatToken(conf)(v._3);
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })())(formatHangingExpr(conf)(v._4))));
    }
    if (v.tag === "ElseIfThen") {
      return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexSpaceBreak(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "Text",
        1,
        " "
      ))))(formatToken(conf)(v._1))(Tidy$dDoc.indent((() => {
        const $2 = formatToken(conf)(v._2);
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })())))(Tidy$dDoc.indent((() => {
        const $2 = Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingExpr(conf)(v._3)));
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })())))(Tidy$dHang.toFormatDoc(Tidy$dHang.hang((() => {
        const $2 = formatToken(conf)(v._4);
        if ($2.leading.lines > 0) {
          return {
            doc: $2.doc,
            isEmpty: $2.isEmpty,
            leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
            multiline: true,
            trailing: $2.trailing
          };
        }
        return $2;
      })())(formatHangingExpr(conf)(v._5))));
    }
    if (v.tag === "Else") { return Tidy$dHang.toFormatDoc(Tidy$dHang.hang(formatToken(conf)(v._1))(formatHangingExpr(conf)(v._2))); }
    $runtime.fail();
  });
  return x => Tidy$dDoc.flexGroup($1(x));
};
const formatDoStatement = conf => v => {
  if (v.tag === "DoLet") { return Tidy$dDoc.flexSpaceBreak(formatToken(conf)(v._1))(Tidy$dDoc.indent(formatLetGroups$lazy()(conf)(v._2))); }
  if (v.tag === "DoDiscard") { return Tidy$dHang.toFormatDoc(formatHangingExpr(conf)(v._1)); }
  if (v.tag === "DoBind") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(v._1))))(Tidy$dHang.toFormatDoc(Tidy$dHang.hang(Tidy$dDoc.indent((() => {
      const $2 = formatToken(conf)(v._2);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })()))(formatHangingExpr(conf)(v._3))));
  }
  if (v.tag === "DoError") { return conf.formatError(v._1); }
  $runtime.fail();
};
const formatCaseBranch = conf => v => {
  const caseBinders = Tidy$dDoc.flexGroup(Data$dFoldable.foldlArray(doc => v1 => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 1, " "),
    Dodo$dInternal.Break
  ))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(doc)(Tidy$dDoc.indent((() => {
    const $4 = formatToken(conf)(v1._1);
    if ($4.leading.lines > 0) {
      return {
        doc: $4.doc,
        isEmpty: $4.isEmpty,
        leading: {doc: $4.leading.doc, left: $4.leading.left, lines: 0, multiline: $4.leading.multiline, right: $4.leading.right},
        multiline: true,
        trailing: $4.trailing
      };
    }
    return $4;
  })())))(Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(v1._2)))))(Tidy$dDoc.flexGroup(Tidy$dHang.toFormatDoc(formatHangingBinder(conf)(v._1.head))))(v._1.tail));
  if (v._2.tag === "Unconditional") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    ))))(caseBinders)(Tidy$dHang.toFormatDoc(Tidy$dHang.hang(formatToken(conf)(v._2._1))(formatHangingExpr(conf)(v._2._2.expr)))))(Tidy$dDoc.indent((() => {
      if (v._2._2.bindings.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v._2._2.bindings.tag === "Just") { return formatWhere(conf)(v._2._2.bindings._1); }
      $runtime.fail();
    })()));
  }
  if (v._2.tag === "Guarded") {
    if (v._2._1.length === 1) {
      return Tidy$dHang.toFormatDoc(Tidy$dHang.hang(caseBinders)(formatGuardedExpr(conf)((() => {
        const $3 = Data$dArray.index(v._2._1)(0);
        if ($3.tag === "Just") { return $3._1; }
        $runtime.fail();
      })())));
    }
    return Tidy$dDoc.flexSpaceBreak(caseBinders)(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(x => Tidy$dHang.toFormatDoc(formatGuardedExpr(conf)(x)))(v._2._1)));
  }
  $runtime.fail();
};
const formatLetGroups$lazy = /* #__PURE__ */ $runtime.binding(() => formatDeclGroups(v => v1 => {
  if (v1.tag === "DeclGroupValueSignature") { return DeclGroupHard; }
  return DeclGroupSame;
})(v => {
  if (v.tag === "LetBindingSignature") { return $DeclGroup("DeclGroupValueSignature", v._1.label.name); }
  if (v.tag === "LetBindingName") { return $DeclGroup("DeclGroupValue", v._1.name.name); }
  if (v.tag === "LetBindingPattern") { return DeclGroupUnknown; }
  if (v.tag === "LetBindingError") { return DeclGroupUnknown; }
  $runtime.fail();
})(formatLetBinding));
const formatLetGroups = /* #__PURE__ */ formatLetGroups$lazy();
const formatInstanceBinding = conf => v => {
  if (v.tag === "InstanceBindingSignature") { return formatSignature(conf)({label: formatToken(conf)(v._1.label.token), separator: v._1.separator, value: v._1.value}); }
  if (v.tag === "InstanceBindingName") { return formatValueBinding(conf)(v._1); }
  $runtime.fail();
};
const formatInstance = conf => v => {
  if (v.body.tag === "Nothing") { return formatInstanceHead(conf)(Data$dTuple.$Tuple(v.head, Data$dMaybe.Nothing)); }
  if (v.body.tag === "Just") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(formatInstanceHead(conf)(Data$dTuple.$Tuple(
      v.head,
      Data$dMaybe.$Maybe("Just", v.body._1._1)
    )))(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(formatInstanceBinding(conf))(v.body._1._2)));
  }
  $runtime.fail();
};
const formatDecl = conf => v => {
  if (v.tag === "DeclData") {
    if (v._2.tag === "Just") {
      const formatDataElem = v1 => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(formatToken(conf)(v1._1))(formatListElem(2)(formatDataCtor)(conf)(v1._2));
      if (v._2._1._2.tail.length === 0) {
        return declareHanging(formatDataHead(conf)(v._1))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))((() => {
          const $3 = formatToken(conf)(v._2._1._1);
          if ($3.leading.lines > 0) {
            return {
              doc: $3.doc,
              isEmpty: $3.isEmpty,
              leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
              multiline: true,
              trailing: $3.trailing
            };
          }
          return $3;
        })())(formatHangingDataCtor(conf)(v._2._1._2.head));
      }
      return Tidy$dDoc.flexSpaceBreak(formatDataHead(conf)(v._1))(Tidy$dDoc.indent(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      ))))(formatDataElem(Data$dTuple.$Tuple(v._2._1._1, v._2._1._2.head)))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
        "FlexAlt",
        Dodo$dInternal.$Doc("Text", 1, " "),
        Dodo$dInternal.Break
      )))))($3 => formatDataElem($3))(v._2._1._2.tail))));
    }
    return formatDataHead(conf)(v._1);
  }
  if (v.tag === "DeclType") {
    return declareHanging(formatDataHead(conf)(v._1))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))((() => {
      const $2 = formatToken(conf)(v._2);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })())(formatHangingPolytype(identity)(conf)(toPolytype(v._3)));
  }
  if (v.tag === "DeclNewtype") {
    return declareHanging(formatDataHead(conf)(v._1))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))((() => {
      const $2 = formatToken(conf)(v._2);
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })())(formatHangingDataCtor(conf)({name: v._3, fields: [v._4]}));
  }
  if (v.tag === "DeclRole") {
    return flatten(Data$dSemigroup.concatArray([formatToken(conf)(v._1), formatToken(conf)(v._2), formatToken(conf)(v._3.token)])(Data$dFunctor.arrayMap(x => formatToken(conf)(x._1))(v._4)));
  }
  if (v.tag === "DeclFixity") {
    if (v._1.operator.tag === "FixityValue") {
      return flatten([
        formatToken(conf)(v._1.keyword._1),
        formatToken(conf)(v._1.prec._1),
        formatToken(conf)(v._1.operator._1.token),
        formatToken(conf)(v._1.operator._2),
        formatToken(conf)(v._1.operator._3.token)
      ]);
    }
    if (v._1.operator.tag === "FixityType") {
      return flatten([
        formatToken(conf)(v._1.keyword._1),
        formatToken(conf)(v._1.prec._1),
        formatToken(conf)(v._1.operator._1),
        formatToken(conf)(v._1.operator._2.token),
        formatToken(conf)(v._1.operator._3),
        formatToken(conf)(v._1.operator._4.token)
      ]);
    }
    $runtime.fail();
  }
  if (v.tag === "DeclKindSignature") {
    return formatSignature(conf)({label: flatten([formatToken(conf)(v._1), formatToken(conf)(v._2.label.token)]), separator: v._2.separator, value: v._2.value});
  }
  if (v.tag === "DeclForeign") {
    if (v._3.tag === "ForeignValue") {
      return formatSignature(conf)({
        label: flatten([formatToken(conf)(v._1), formatToken(conf)(v._2), formatToken(conf)(v._3._1.label.token)]),
        separator: v._3._1.separator,
        value: v._3._1.value
      });
    }
    if (v._3.tag === "ForeignData") {
      return formatSignature(conf)({
        label: flatten([formatToken(conf)(v._1), formatToken(conf)(v._2), formatToken(conf)(v._3._1), formatToken(conf)(v._3._2.label.token)]),
        separator: v._3._2.separator,
        value: v._3._2.value
      });
    }
    if (v._3.tag === "ForeignKind") { return flatten([formatToken(conf)(v._1), formatToken(conf)(v._2), formatToken(conf)(v._3._1), formatToken(conf)(v._3._2.token)]); }
    $runtime.fail();
  }
  if (v.tag === "DeclClass") {
    if (v._2.tag === "Nothing") { return formatClassHead(conf)(Data$dTuple.$Tuple(v._1, Data$dMaybe.Nothing)); }
    if (v._2.tag === "Just") {
      return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(formatClassHead(conf)(Data$dTuple.$Tuple(
        v._1,
        Data$dMaybe.$Maybe("Just", v._2._1._1)
      )))(Tidy$dDoc.indent(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(x => formatSignature(conf)({
        label: formatToken(conf)(x.label.token),
        separator: x.separator,
        value: x.value
      }))(v._2._1._2)));
    }
    $runtime.fail();
  }
  if (v.tag === "DeclInstanceChain") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))(formatInstance(conf)(v._1.head))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(v1 => Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    ))))(formatToken(conf)(v1._1))((() => {
      const $3 = formatInstance(conf)(v1._2);
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })()))(v._1.tail));
  }
  if (v.tag === "DeclDerive") {
    return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc(
      "Text",
      1,
      " "
    ))))(formatToken(conf)(v._1))((() => {
      if (v._2.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
      if (v._2.tag === "Just") {
        return Tidy$dDoc.indent((() => {
          const $2 = formatToken(conf)(v._2._1);
          if ($2.leading.lines > 0) {
            return {
              doc: $2.doc,
              isEmpty: $2.isEmpty,
              leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
              multiline: true,
              trailing: $2.trailing
            };
          }
          return $2;
        })());
      }
      $runtime.fail();
    })()))((() => {
      const $2 = formatInstanceHead(conf)(Data$dTuple.$Tuple(v._3, Data$dMaybe.Nothing));
      if ($2.leading.lines > 0) {
        return {
          doc: $2.doc,
          isEmpty: $2.isEmpty,
          leading: {doc: $2.leading.doc, left: $2.leading.left, lines: 0, multiline: $2.leading.multiline, right: $2.leading.right},
          multiline: true,
          trailing: $2.trailing
        };
      }
      return $2;
    })());
  }
  if (v.tag === "DeclSignature") { return formatSignature(conf)({label: flatten([formatToken(conf)(v._1.label.token)]), separator: v._1.separator, value: v._1.value}); }
  if (v.tag === "DeclValue") { return formatValueBinding(conf)(v._1); }
  if (v.tag === "DeclError") { return conf.formatError(v._1); }
  $runtime.fail();
};
const formatTopLevelGroups = /* #__PURE__ */ formatDeclGroups(v => v1 => {
  if (v1.tag === "DeclGroupValue") {
    if (v.tag === "DeclGroupValue") {
      if (v._1 === v1._1) { return DeclGroupSame; }
      return DeclGroupSoft;
    }
    if (v.tag === "DeclGroupValueSignature") {
      if (v._1 === v1._1) { return DeclGroupSame; }
      return DeclGroupHard;
    }
    return DeclGroupSoft;
  }
  if (v1.tag === "DeclGroupValueSignature") { return DeclGroupHard; }
  if (v1.tag === "DeclGroupType") {
    if (v.tag === "DeclGroupType") { return DeclGroupSoft; }
    if (v.tag === "DeclGroupTypeSignature") {
      if (v._1 === v1._1) { return DeclGroupSame; }
      return DeclGroupHard;
    }
    return DeclGroupSoft;
  }
  if (v.tag === "DeclGroupTypeSignature") {
    if (v1.tag === "DeclGroupClass") {
      if (v._1 === v1._1) { return DeclGroupSame; }
      return DeclGroupHard;
    }
    if (v1.tag === "DeclGroupTypeSignature") { return DeclGroupHard; }
    if (v1.tag === "DeclGroupInstance") { return DeclGroupHard; }
    if (v1.tag === "DeclGroupFixity") { return DeclGroupHard; }
    if (v1.tag === "DeclGroupForeign") { return DeclGroupHard; }
    if (v1.tag === "DeclGroupRole") { return DeclGroupHard; }
    return DeclGroupSoft;
  }
  if (v1.tag === "DeclGroupTypeSignature") { return DeclGroupHard; }
  if (v1.tag === "DeclGroupClass") {
    if (v.tag === "DeclGroupClass") { return DeclGroupSoft; }
    return DeclGroupHard;
  }
  if (v1.tag === "DeclGroupInstance") {
    if (v.tag === "DeclGroupInstance") { return DeclGroupSoft; }
    return DeclGroupHard;
  }
  if (v1.tag === "DeclGroupFixity") {
    if (v.tag === "DeclGroupFixity") { return DeclGroupSoft; }
    return DeclGroupHard;
  }
  if (v1.tag === "DeclGroupForeign") {
    if (v.tag === "DeclGroupForeign") { return DeclGroupSoft; }
    return DeclGroupHard;
  }
  if (v1.tag === "DeclGroupRole") {
    if (v.tag === "DeclGroupRole") { return DeclGroupSoft; }
    return DeclGroupHard;
  }
  return DeclGroupSoft;
})(v => {
  if (v.tag === "DeclData") { return $DeclGroup("DeclGroupType", v._1.name.name); }
  if (v.tag === "DeclType") { return $DeclGroup("DeclGroupType", v._1.name.name); }
  if (v.tag === "DeclNewtype") { return $DeclGroup("DeclGroupType", v._1.name.name); }
  if (v.tag === "DeclClass") { return $DeclGroup("DeclGroupClass", v._1.name.name); }
  if (v.tag === "DeclKindSignature") { return $DeclGroup("DeclGroupTypeSignature", v._2.label.name); }
  if (v.tag === "DeclSignature") { return $DeclGroup("DeclGroupValueSignature", v._1.label.name); }
  if (v.tag === "DeclValue") { return $DeclGroup("DeclGroupValue", v._1.name.name); }
  if (v.tag === "DeclInstanceChain") { return DeclGroupInstance; }
  if (v.tag === "DeclDerive") { return DeclGroupInstance; }
  if (v.tag === "DeclFixity") { return DeclGroupFixity; }
  if (v.tag === "DeclForeign") { return DeclGroupForeign; }
  if (v.tag === "DeclRole") { return DeclGroupRole; }
  if (v.tag === "DeclError") { return DeclGroupUnknown; }
  $runtime.fail();
})(formatDecl);
const formatModule = conf => v => {
  const imports = (() => {
    if (conf.importSort.tag === "ImportSortSource") {
      return Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(x => formatImportDecl(conf)(x))(v.header.imports);
    }
    if (conf.importSort.tag === "ImportSortIde") {
      const v1 = Data$dArray.partition(v1 => {
        if (v1.qualified.tag === "Nothing") {
          if (v1.names.tag === "Nothing") { return true; }
          if (v1.names.tag === "Just") { return v1.names._1._1.tag === "Just"; }
          return false;
        }
        return false;
      })(Data$dFunctor.arrayMap(Data$dTuple.snd)(Data$dArray.sortWith(ordImportModuleComparison)(Data$dTuple.fst)(Data$dFunctor.arrayMap(v1 => {
        const qualName = (() => {
          if (v1.qualified.tag === "Just") { return Data$dMaybe.$Maybe("Just", v1.qualified._1._2.name); }
          return Data$dMaybe.Nothing;
        })();
        if (v1.names.tag === "Just") {
          const v2 = sortImportsIde(v1.names._1._2);
          return Data$dTuple.$Tuple(
            $ImportModuleComparison(
              v1.module.name,
              (() => {
                if (
                  (() => {
                    if (v1.names._1._1.tag === "Nothing") { return false; }
                    if (v1.names._1._1.tag === "Just") { return true; }
                    $runtime.fail();
                  })()
                ) {
                  return 3;
                }
                return 1;
              })(),
              v2._1,
              qualName
            ),
            {keyword: v1.keyword, module: v1.module, names: Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v1.names._1._1, v2._2)), qualified: v1.qualified}
          );
        }
        if (v1.names.tag === "Nothing") { return Data$dTuple.$Tuple($ImportModuleComparison(v1.module.name, 2, [], qualName), v1); }
        $runtime.fail();
      })(v.header.imports))));
      return Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(x => Tidy$dDoc.flattenMax(0)(formatImportDecl(conf)(x)))(v1.yes))(Tidy$dDoc.forceMinSourceBreaks(2)(Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(x => Tidy$dDoc.flattenMax(0)(formatImportDecl(conf)(x)))(v1.no)));
    }
    $runtime.fail();
  })();
  return Tidy$dDoc.joinWithMap(Data$dFoldable.foldableArray)(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))(Tidy$dDoc.identity)([
    Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))((() => {
      const $3 = formatToken(conf)(v.header.keyword);
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })())(Tidy$dDoc.indent(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))))(Tidy$dDoc.flexSpaceBreak((() => {
      const $3 = formatToken(conf)(v.header.name.token);
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })())((() => {
      const $3 = (() => {
        if (v.header.exports.tag === "Nothing") { return Tidy$dDoc.monoidFormatDoc.mempty; }
        if (v.header.exports.tag === "Just") { return formatDelimitedNonEmpty(Tidy$dDoc.softSpace)(Tidy$dDoc.softBreak)(2)(NotGrouped)(formatExport)(conf)(v.header.exports._1); }
        $runtime.fail();
      })();
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })()))((() => {
      const $3 = formatToken(conf)(v.header.where);
      if ($3.leading.lines > 0) {
        return {
          doc: $3.doc,
          isEmpty: $3.isEmpty,
          leading: {doc: $3.leading.doc, left: $3.leading.left, lines: 0, multiline: $3.leading.multiline, right: $3.leading.right},
          multiline: true,
          trailing: $3.trailing
        };
      }
      return $3;
    })()))),
    Tidy$dDoc.forceMinSourceBreaks(2)((() => {
      if (conf.importWrap.tag === "ImportWrapAuto") { return imports; }
      if (conf.importWrap.tag === "ImportWrapSource") {
        return Tidy$dDoc.locally(v1 => (
          {indent: v1.indent, indentSpaces: v1.indentSpaces, indentUnit: v1.indentUnit, indentWidth: v1.indentWidth, pageWidth: 2147483647, ribbonRatio: 1.0}
        ))(imports);
      }
      $runtime.fail();
    })()),
    Tidy$dDoc.forceMinSourceBreaks(2)(formatTopLevelGroups(conf)(v.body.decls)),
    Data$dFoldable.foldrArray(formatComment(Tidy$dDoc.leadingLineComment)(Tidy$dDoc.leadingBlockComment))(Tidy$dDoc.monoidFormatDoc.mempty)(v.body.trailingComments)
  ]);
};
export {
  $DeclGroup,
  $DeclGroupSeparator,
  $ElseIfChain,
  $FormatGrouped,
  $ImportComparison,
  $ImportModuleComparison,
  $ImportSortOption,
  $ImportWrapOption,
  $Poly,
  $TypeArrowOption,
  DeclGroupClass,
  DeclGroupFixity,
  DeclGroupForeign,
  DeclGroupHard,
  DeclGroupInstance,
  DeclGroupRole,
  DeclGroupSame,
  DeclGroupSoft,
  DeclGroupType,
  DeclGroupTypeSignature,
  DeclGroupUnknown,
  DeclGroupValue,
  DeclGroupValueSignature,
  Else,
  ElseIfThen,
  Grouped,
  IfThen,
  ImportClassCmp,
  ImportErrorCmp,
  ImportModuleCmp,
  ImportOpCmp,
  ImportSortIde,
  ImportSortSource,
  ImportTypeCmp,
  ImportTypeOpCmp,
  ImportValueCmp,
  ImportWrapAuto,
  ImportWrapSource,
  NotGrouped,
  PolyArrow,
  PolyForall,
  TypeArrowFirst,
  TypeArrowLast,
  compare3,
  compare7,
  compare8,
  declareHanging,
  defaultFormatOptions,
  eq10,
  eq5,
  eqImportComparison,
  eqImportModuleComparison,
  eqImportSortOpion,
  eqImportWrapOption,
  eqTypeArrowOption,
  flatten,
  foldMap2,
  foldMap3,
  formatBasicList,
  formatBasicListNonEmpty,
  formatBinder,
  formatCaseBranch,
  formatClassHead,
  formatComment,
  formatConstraints,
  formatDataCtor,
  formatDataHead,
  formatDataMembers,
  formatDecl,
  formatDeclGroups,
  formatDelimited,
  formatDelimitedNonEmpty,
  formatDoStatement,
  formatElseIfChain,
  formatEmptyList,
  formatError,
  formatErrorRecoveredError,
  formatErrorVoid,
  formatExport,
  formatExpr,
  formatFundep,
  formatGuardedExpr,
  formatHangingBinder,
  formatHangingDataCtor,
  formatHangingExpr,
  formatHangingMonotype,
  formatHangingOperatorTree,
  formatHangingPolytype,
  formatHangingType,
  formatImport,
  formatImportDecl,
  formatInstance,
  formatInstanceBinding,
  formatInstanceHead,
  formatKindedTypeVarBinding,
  formatLetBinding,
  formatLetGroups,
  formatList,
  formatListElem,
  formatListTail,
  formatModule,
  formatMonotype,
  formatName,
  formatOneOrDelimited,
  formatParens,
  formatParensBlock,
  formatPatternGuard,
  formatQualifiedName,
  formatRawString,
  formatRecordLabeled,
  formatRecordUpdate,
  formatRow,
  formatRowLabeled,
  formatSignature,
  formatString,
  formatToken,
  formatTopLevelGroups,
  formatType,
  formatTypeVarBinding,
  formatValueBinding,
  formatWhere,
  formatWithComments,
  identity,
  intercalate,
  lines,
  max,
  ordImportComparison,
  ordImportModuleComparison,
  power,
  power1,
  sortImportsIde,
  toElseIfChain,
  toPolytype
};
