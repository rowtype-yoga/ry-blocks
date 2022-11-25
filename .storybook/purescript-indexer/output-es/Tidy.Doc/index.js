import * as $runtime from "../runtime.js";
import * as Control$dAlternative from "../Control.Alternative/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dString$dCodePoints from "../Data.String.CodePoints/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Dodo from "../Dodo/index.js";
import * as Dodo$dInternal from "../Dodo.Internal/index.js";
import * as Tidy$dUtil from "../Tidy.Util/index.js";
const $ForceBreak = tag => ({tag});
const guard = /* #__PURE__ */ Control$dAlternative.guard(Data$dMaybe.alternativeMaybe);
const power = /* #__PURE__ */ Data$dMonoid.power(Data$dMonoid.monoidString);
const lines = /* #__PURE__ */ Data$dFoldable.foldrArray(Dodo.appendBreak)(Dodo$dInternal.Empty);
const intercalate = sep => xs => Data$dFoldable.foldlArray(v => v1 => {
  if (v.init) { return {init: false, acc: v1}; }
  return {init: false, acc: Dodo$dInternal.semigroupDoc.append(v.acc)(Dodo$dInternal.semigroupDoc.append(sep)(v1))};
})({init: true, acc: Dodo$dInternal.Empty})(xs).acc;
const max = x => y => {
  const v = Data$dOrd.ordInt.compare(x)(y);
  if (v.tag === "LT") { return y; }
  if (v.tag === "EQ") { return x; }
  if (v.tag === "GT") { return x; }
  $runtime.fail();
};
const min = x => y => {
  const v = Data$dOrd.ordInt.compare(x)(y);
  if (v.tag === "LT") { return x; }
  if (v.tag === "EQ") { return x; }
  if (v.tag === "GT") { return y; }
  $runtime.fail();
};
const identity = x => x;
const ForceNone = /* #__PURE__ */ $ForceBreak("ForceNone");
const ForceSpace = /* #__PURE__ */ $ForceBreak("ForceSpace");
const ForceBreak = /* #__PURE__ */ $ForceBreak("ForceBreak");
const LeadingComment = x => x;
const TrailingComment = x => x;
const FormatDoc = x => x;
const sourceBreak = n => v => (
  {
    doc: v.doc,
    isEmpty: false,
    leading: {doc: v.leading.doc, left: v.leading.left, lines: v.leading.lines + n | 0, multiline: v.leading.multiline, right: v.leading.right},
    multiline: v.multiline,
    trailing: v.trailing
  }
);
const mapDoc = k => v => {
  if (v.isEmpty) { return v; }
  return {doc: k(v.doc), isEmpty: v.isEmpty, leading: v.leading, multiline: v.multiline, trailing: v.trailing};
};
const locally = k => v => (
  {doc: Dodo$dInternal.$Doc("Local", options => Data$dTuple.$Tuple(k(options), v.doc)), isEmpty: v.isEmpty, leading: v.leading, multiline: v.multiline, trailing: v.trailing}
);
const indent = v => {
  if (v.isEmpty) { return v; }
  return {
    doc: (() => {
      if (v.doc.tag === "Empty") { return Dodo$dInternal.Empty; }
      return Dodo$dInternal.$Doc("Indent", v.doc);
    })(),
    isEmpty: v.isEmpty,
    leading: {
      doc: (() => {
        if (v.leading.doc.tag === "Empty") { return Dodo$dInternal.Empty; }
        return Dodo$dInternal.$Doc("Indent", v.leading.doc);
      })(),
      left: v.leading.left,
      lines: v.leading.lines,
      multiline: v.leading.multiline,
      right: v.leading.right
    },
    multiline: v.multiline,
    trailing: {
      doc: (() => {
        if (v.trailing.doc.tag === "Empty") { return Dodo$dInternal.Empty; }
        return Dodo$dInternal.$Doc("Indent", v.trailing.doc);
      })(),
      left: v.trailing.left,
      multiline: v.trailing.multiline,
      right: v.trailing.right
    }
  };
};
const formatBlockComment = x => {
  const $1 = Data$dArray.uncons(Tidy$dUtil.splitLines(x));
  if ($1.tag === "Nothing") { return Data$dTuple.$Tuple(false, Dodo$dInternal.Empty); }
  if ($1.tag === "Just") {
    const prefixSpaces = Data$dArray.index(Data$dArray.sortBy(Data$dOrd.ordInt.compare)(Data$dArray.mapMaybe(str => {
      const spaces = Data$dString$dCodeUnits.length(Data$dString$dCodePoints.take(Data$dString$dCodePoints.countPrefix(y => 32 === y)(str))(str));
      if (guard(spaces < Data$dString$dCodeUnits.length(str)).tag === "Just") { return Data$dMaybe.$Maybe("Just", spaces); }
      return Data$dMaybe.Nothing;
    })($1._1.tail)))(0);
    if (prefixSpaces.tag === "Nothing") {
      return Data$dTuple.$Tuple(
        false,
        (() => {
          if ($1._1.head === "") { return Dodo$dInternal.Empty; }
          return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($1._1.head).length, $1._1.head);
        })()
      );
    }
    if (prefixSpaces.tag === "Just") {
      return Data$dTuple.$Tuple(
        true,
        Dodo$dInternal.$Doc(
          "WithPosition",
          pos => {
            const newIndent = (() => {
              if (prefixSpaces._1 < pos.indent) { return 0; }
              return prefixSpaces._1;
            })();
            const spaces = power(" ")(newIndent);
            return lines([
              (() => {
                if ($1._1.head === "") { return Dodo$dInternal.Empty; }
                return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($1._1.head).length, $1._1.head);
              })(),
              (() => {
                const $6 = intercalate(Dodo$dInternal.Break)(Data$dFunctor.arrayMap(str => {
                  const $7 = Data$dString$dCodeUnits.stripPrefix(spaces)(str);
                  const $8 = (() => {
                    if ($7.tag === "Nothing") { return str; }
                    if ($7.tag === "Just") { return $7._1; }
                    $runtime.fail();
                  })();
                  if ($8 === "") { return Dodo$dInternal.Empty; }
                  return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray($8).length, $8);
                })($1._1.tail));
                return Dodo$dInternal.$Doc(
                  "Local",
                  options => Data$dTuple.$Tuple(
                    (() => {
                      if (newIndent < options.indent) {
                        return {
                          indent: newIndent,
                          indentSpaces: spaces,
                          indentUnit: options.indentUnit,
                          indentWidth: options.indentWidth,
                          pageWidth: options.pageWidth,
                          ribbonRatio: options.ribbonRatio
                        };
                      }
                      return options;
                    })(),
                    $6
                  )
                );
              })()
            ]);
          }
        )
      );
    }
    $runtime.fail();
  }
  $runtime.fail();
};
const forceMinSourceBreaks = n => v => {
  if (v.isEmpty) { return v; }
  return {
    doc: v.doc,
    isEmpty: v.isEmpty,
    leading: {doc: v.leading.doc, left: v.leading.left, lines: max(v.leading.lines)(n), multiline: v.leading.multiline, right: v.leading.right},
    multiline: v.multiline,
    trailing: v.trailing
  };
};
const force = k => f => m => doc => {
  if (f.tag === "ForceBreak") { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc)); }
  return Data$dTuple.$Tuple(m, k(doc));
};
const flexGroup = v => {
  if (v.multiline) { return v; }
  return {doc: Dodo.flexGroup(v.doc), isEmpty: v.isEmpty, leading: v.leading, multiline: v.multiline, trailing: v.trailing};
};
const flattenMax = n => v => (
  {
    doc: v.doc,
    isEmpty: v.isEmpty,
    leading: {doc: v.leading.doc, left: v.leading.left, lines: min(v.leading.lines)(n), multiline: v.leading.multiline, right: v.leading.right},
    multiline: v.multiline,
    trailing: v.trailing
  }
);
const flatten = /* #__PURE__ */ flattenMax(0);
const eqForceBreak = {
  eq: x => y => {
    if (x.tag === "ForceNone") { return y.tag === "ForceNone"; }
    if (x.tag === "ForceSpace") { return y.tag === "ForceSpace"; }
    if (x.tag === "ForceBreak") { return y.tag === "ForceBreak"; }
    return false;
  }
};
const ordForceBreak = {
  compare: x => y => {
    if (x.tag === "ForceNone") {
      if (y.tag === "ForceNone") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ForceNone") { return Data$dOrdering.GT; }
    if (x.tag === "ForceSpace") {
      if (y.tag === "ForceSpace") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ForceSpace") { return Data$dOrdering.GT; }
    if (x.tag === "ForceBreak") {
      if (y.tag === "ForceBreak") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqForceBreak
};
const max1 = x => y => {
  const v = ordForceBreak.compare(x)(y);
  if (v.tag === "LT") { return y; }
  if (v.tag === "EQ") { return x; }
  if (v.tag === "GT") { return x; }
  $runtime.fail();
};
const breaks = fl => n => {
  if (n >= 2) { return Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.Break); }
  if (n === 1) { return Dodo$dInternal.Break; }
  if (fl.tag === "ForceBreak") { return Dodo$dInternal.Break; }
  if (fl.tag === "ForceSpace") { return Dodo$dInternal.$Doc("Text", 1, " "); }
  if (fl.tag === "ForceNone") { return Dodo$dInternal.Empty; }
  $runtime.fail();
};
const breakDoc = br => doc => {
  if (doc.tag === "Empty") { return doc; }
  if (br.tag === "ForceBreak") { return Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc); }
  if (br.tag === "ForceSpace") { return Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))(doc); }
  if (br.tag === "ForceNone") { return doc; }
  $runtime.fail();
};
const flexDoubleBreak = v => v1 => {
  if (v.isEmpty) { return v1; }
  if (v1.isEmpty) { return v; }
  const docLeft = Dodo$dInternal.semigroupDoc.append(v.doc)(breakDoc(v.trailing.left)(v.trailing.doc));
  const docRight = Dodo$dInternal.semigroupDoc.append(v1.leading.doc)(breakDoc(v1.leading.right)(v1.doc));
  if (v1.leading.lines >= 2 || v.multiline) {
    return {
      doc: Dodo$dInternal.semigroupDoc.append(docLeft)(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(docRight))),
      isEmpty: v.isEmpty,
      leading: v.leading,
      multiline: true,
      trailing: v1.trailing
    };
  }
  return {
    doc: Dodo$dInternal.semigroupDoc.append((() => {
      if (docLeft.tag === "Empty") { return Dodo$dInternal.Empty; }
      return Dodo$dInternal.$Doc("FlexSelect", docLeft, Dodo$dInternal.Empty, Dodo$dInternal.Break);
    })())(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(docRight)),
    isEmpty: v.isEmpty,
    leading: v.leading,
    multiline: true,
    trailing: v1.trailing
  };
};
const joinDoc = spaceFn => v => v1 => {
  if (v.isEmpty) { return v1; }
  if (v1.isEmpty) { return v; }
  const docLeft = Dodo$dInternal.semigroupDoc.append(v.doc)(breakDoc(v.trailing.left)(v.trailing.doc));
  const docRight = Dodo$dInternal.semigroupDoc.append(v1.leading.doc)(breakDoc(v1.leading.right)(v1.doc));
  if (v1.leading.lines > 0) {
    return {
      doc: Dodo$dInternal.semigroupDoc.append(docLeft)(Dodo$dInternal.semigroupDoc.append(breaks(ForceBreak)(v1.leading.lines))(docRight)),
      isEmpty: v.isEmpty,
      leading: v.leading,
      multiline: true,
      trailing: v1.trailing
    };
  }
  const v2 = spaceFn(max1(v.trailing.right)(v1.leading.left))(v1.leading.multiline || v1.multiline)(docRight);
  return {
    doc: Dodo$dInternal.semigroupDoc.append(docLeft)(v2._2),
    isEmpty: v.isEmpty,
    leading: v.leading,
    multiline: v.trailing.multiline || (v.multiline || v2._1),
    trailing: v1.trailing
  };
};
const flexSoftBreak = /* #__PURE__ */ joinDoc(f => m => doc => {
  if (f.tag === "ForceBreak") { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc)); }
  if (f.tag === "ForceSpace") {
    if (m) { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))(doc)); }
    return Data$dTuple.$Tuple(
      false,
      Dodo.flexGroup(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(doc))
    );
  }
  if (f.tag === "ForceNone") {
    if (m) { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc)); }
    return Data$dTuple.$Tuple(false, Dodo.flexGroup(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.Empty, Dodo$dInternal.Break))(doc)));
  }
  $runtime.fail();
});
const flexSoftSpace = /* #__PURE__ */ joinDoc(f => m => doc => {
  if (f.tag === "ForceBreak") { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc)); }
  if (f.tag === "ForceSpace") {
    if (m) { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))(doc)); }
    return Data$dTuple.$Tuple(false, Dodo.flexGroup(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))(doc)));
  }
  if (f.tag === "ForceNone") {
    if (m) { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.Empty, Dodo$dInternal.$Doc("Text", 1, " ")))(doc)); }
    return Data$dTuple.$Tuple(
      false,
      Dodo.flexGroup(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.Empty, Dodo$dInternal.$Doc("Text", 1, " ")))(doc))
    );
  }
  $runtime.fail();
});
const flexSpaceBreak = /* #__PURE__ */ joinDoc(f => m => doc => {
  if (f.tag === "ForceBreak") { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc)); }
  if (m) { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(doc)); }
  return Data$dTuple.$Tuple(
    false,
    Dodo.flexGroup(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(doc))
  );
});
const semigroupFormatDoc = {append: /* #__PURE__ */ joinDoc(/* #__PURE__ */ force(identity))};
const softBreak = /* #__PURE__ */ joinDoc(f => m => doc => {
  if (f.tag === "ForceBreak") { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc)); }
  if (f.tag === "ForceSpace") {
    return Data$dTuple.$Tuple(m, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(doc));
  }
  if (f.tag === "ForceNone") { return Data$dTuple.$Tuple(m, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.Empty, Dodo$dInternal.Break))(doc)); }
  $runtime.fail();
});
const softSpace = /* #__PURE__ */ joinDoc(f => m => doc => {
  if (f.tag === "ForceBreak") { return Data$dTuple.$Tuple(true, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(doc)); }
  if (f.tag === "ForceSpace") { return Data$dTuple.$Tuple(m, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " "))(doc)); }
  if (f.tag === "ForceNone") {
    return Data$dTuple.$Tuple(m, Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.Empty, Dodo$dInternal.$Doc("Text", 1, " ")))(doc));
  }
  $runtime.fail();
});
const space = /* #__PURE__ */ (() => joinDoc(force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, " ")))))();
const spaceBreak = /* #__PURE__ */ (() => joinDoc(force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break)))))();
const toDoc = v => {
  if (v.isEmpty) { return Dodo$dInternal.Empty; }
  return Dodo$dInternal.semigroupDoc.append(v.leading.doc)(Dodo$dInternal.semigroupDoc.append(breakDoc(v.leading.right)(v.doc))(breakDoc(v.trailing.left)(v.trailing.doc)));
};
const semigroupLeadingComment = {
  append: v => v1 => {
    if (v.doc.tag === "Empty") { return {doc: v1.doc, left: max1(v.left)(v1.left), lines: v.lines + v1.lines | 0, multiline: v1.multiline, right: v1.right}; }
    if (v1.doc.tag === "Empty") {
      return {
        doc: Dodo$dInternal.semigroupDoc.append(v.doc)(breaks(ForceNone)(v1.lines)),
        left: v.left,
        lines: v.lines,
        multiline: v.multiline || v1.lines > 0,
        right: (() => {
          if (v1.lines > 0) { return ForceNone; }
          return max1(v.right)(v1.right);
        })()
      };
    }
    const br = max1(v.right)(v1.left);
    if (v1.lines > 0 || br.tag === "ForceBreak") {
      return {
        doc: Dodo$dInternal.semigroupDoc.append(v.doc)(Dodo$dInternal.semigroupDoc.append(breaks(ForceBreak)(v1.lines))(v1.doc)),
        left: v.left,
        lines: v.lines,
        multiline: true,
        right: v1.right
      };
    }
    return {doc: Dodo$dInternal.semigroupDoc.append(v.doc)(breakDoc(br)(v1.doc)), left: v.left, lines: v.lines, multiline: v.multiline || v1.multiline, right: v1.right};
  }
};
const leadingBlockComment = str => v => {
  const v1 = formatBlockComment(str);
  return {
    doc: v.doc,
    isEmpty: false,
    leading: semigroupLeadingComment.append({doc: v1._2, left: ForceSpace, lines: 0, multiline: v1._1, right: ForceSpace})(v.leading),
    multiline: v.multiline,
    trailing: v.trailing
  };
};
const leadingLineComment = str => v => (
  {
    doc: v.doc,
    isEmpty: false,
    leading: semigroupLeadingComment.append({
      doc: (() => {
        if (str === "") { return Dodo$dInternal.Empty; }
        return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray(str).length, str);
      })(),
      left: ForceBreak,
      lines: 0,
      multiline: false,
      right: ForceBreak
    })(v.leading),
    multiline: v.multiline,
    trailing: v.trailing
  }
);
const monoidLeadingComment = {mempty: {doc: Dodo$dInternal.Empty, left: ForceNone, lines: 0, multiline: false, right: ForceNone}, Semigroup0: () => semigroupLeadingComment};
const semigroupTrailingComment = {
  append: v => v1 => {
    if (v.doc.tag === "Empty") { return {doc: v1.doc, left: max1(v.left)(v1.left), multiline: v1.multiline, right: v1.right}; }
    if (v1.doc.tag === "Empty") { return {doc: v.doc, left: v.left, multiline: v.multiline, right: max1(v.right)(v1.right)}; }
    return {doc: Dodo$dInternal.semigroupDoc.append(v.doc)(breakDoc(max1(v.right)(v1.left))(v1.doc)), left: v.left, multiline: v.multiline || v1.multiline, right: v1.right};
  }
};
const trailingBlockComment = str => v => {
  const v1 = formatBlockComment(str);
  return {
    doc: v.doc,
    isEmpty: false,
    leading: v.leading,
    multiline: v.multiline,
    trailing: semigroupTrailingComment.append({doc: v1._2, left: ForceSpace, multiline: v1._1, right: ForceSpace})(v.trailing)
  };
};
const trailingLineComment = str => v => (
  {
    doc: v.doc,
    isEmpty: false,
    leading: v.leading,
    multiline: v.multiline,
    trailing: semigroupTrailingComment.append({
      doc: (() => {
        if (str === "") { return Dodo$dInternal.Empty; }
        return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray(str).length, str);
      })(),
      left: ForceSpace,
      multiline: false,
      right: ForceBreak
    })(v.trailing)
  }
);
const monoidTrailingComment = {mempty: {doc: Dodo$dInternal.Empty, left: ForceNone, multiline: false, right: ForceNone}, Semigroup0: () => semigroupTrailingComment};
const monoidFormatDoc = /* #__PURE__ */ (() => (
  {
    mempty: {doc: Dodo$dInternal.Empty, leading: monoidLeadingComment.mempty, isEmpty: true, multiline: false, trailing: monoidTrailingComment.mempty},
    Semigroup0: () => semigroupFormatDoc
  }
))();
const fromDoc = doc => {
  if (doc.tag === "Empty") { return monoidFormatDoc.mempty; }
  return {doc: doc, leading: monoidLeadingComment.mempty, isEmpty: false, multiline: false, trailing: monoidTrailingComment.mempty};
};
const text = x => {
  const $1 = (() => {
    if (x === "") { return Dodo$dInternal.Empty; }
    return Dodo$dInternal.$Doc("Text", Data$dString$dCodePoints.toCodePointArray(x).length, x);
  })();
  if ($1.tag === "Empty") { return monoidFormatDoc.mempty; }
  return {doc: $1, leading: monoidLeadingComment.mempty, isEmpty: false, multiline: false, trailing: monoidTrailingComment.mempty};
};
const joinWithMap = dictFoldable => op => k => dictFoldable.foldl(a => b => {
  if (a.isEmpty) { return k(b); }
  return op(a)(k(b));
})(monoidFormatDoc.mempty);
const joinWith = dictFoldable => a => joinWithMap(dictFoldable)(a)(identity);
const $$break = /* #__PURE__ */ (() => joinDoc(force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break))))();
const anchor = v => {
  if (v.leading.lines > 0) {
    return {
      doc: v.doc,
      isEmpty: v.isEmpty,
      leading: {doc: v.leading.doc, left: v.leading.left, lines: 0, multiline: v.leading.multiline, right: v.leading.right},
      multiline: true,
      trailing: v.trailing
    };
  }
  return v;
};
const alignCurrentColumn = v => {
  if (v.isEmpty) { return v; }
  return {
    doc: (() => {
      if (v.doc.tag === "Empty") { return Dodo$dInternal.Empty; }
      return Dodo$dInternal.$Doc("WithPosition", pos => Dodo.align(pos.column - pos.nextIndent | 0)(v.doc));
    })(),
    isEmpty: v.isEmpty,
    leading: {
      doc: (() => {
        if (v.leading.doc.tag === "Empty") { return Dodo$dInternal.Empty; }
        return Dodo$dInternal.$Doc("WithPosition", pos => Dodo.align(pos.column - pos.nextIndent | 0)(v.leading.doc));
      })(),
      left: v.leading.left,
      lines: v.leading.lines,
      multiline: v.leading.multiline,
      right: v.leading.right
    },
    multiline: v.multiline,
    trailing: {
      doc: (() => {
        if (v.trailing.doc.tag === "Empty") { return Dodo$dInternal.Empty; }
        return Dodo$dInternal.$Doc("WithPosition", pos => Dodo.align(pos.column - pos.nextIndent | 0)(v.trailing.doc));
      })(),
      left: v.trailing.left,
      multiline: v.trailing.multiline,
      right: v.trailing.right
    }
  };
};
const align = x => v => {
  if (v.isEmpty) { return v; }
  return {
    doc: Dodo.align(x)(v.doc),
    isEmpty: v.isEmpty,
    leading: {doc: Dodo.align(x)(v.leading.doc), left: v.leading.left, lines: v.leading.lines, multiline: v.leading.multiline, right: v.leading.right},
    multiline: v.multiline,
    trailing: {doc: Dodo.align(x)(v.trailing.doc), left: v.trailing.left, multiline: v.trailing.multiline, right: v.trailing.right}
  };
};
export {
  $ForceBreak,
  ForceBreak,
  ForceNone,
  ForceSpace,
  FormatDoc,
  LeadingComment,
  TrailingComment,
  align,
  alignCurrentColumn,
  anchor,
  $$break as break,
  breakDoc,
  breaks,
  eqForceBreak,
  flatten,
  flattenMax,
  flexDoubleBreak,
  flexGroup,
  flexSoftBreak,
  flexSoftSpace,
  flexSpaceBreak,
  force,
  forceMinSourceBreaks,
  formatBlockComment,
  fromDoc,
  guard,
  identity,
  indent,
  intercalate,
  joinDoc,
  joinWith,
  joinWithMap,
  leadingBlockComment,
  leadingLineComment,
  lines,
  locally,
  mapDoc,
  max,
  max1,
  min,
  monoidFormatDoc,
  monoidLeadingComment,
  monoidTrailingComment,
  ordForceBreak,
  power,
  semigroupFormatDoc,
  semigroupLeadingComment,
  semigroupTrailingComment,
  softBreak,
  softSpace,
  sourceBreak,
  space,
  spaceBreak,
  text,
  toDoc,
  trailingBlockComment,
  trailingLineComment
};
