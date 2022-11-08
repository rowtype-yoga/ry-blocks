import * as $runtime from "../runtime.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Dodo$dInternal from "../Dodo.Internal/index.js";
import * as Tidy$dDoc from "../Tidy.Doc/index.js";
const $HangingDoc = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $HangingOp = (_1, _2, _3) => ({tag: "HangingOp", _1, _2, _3});
const max = x => y => {
  const v = Tidy$dDoc.ordForceBreak.compare(x)(y);
  if (v.tag === "LT") { return y; }
  if (v.tag === "EQ") { return x; }
  if (v.tag === "GT") { return x; }
  $runtime.fail();
};
const identity = x => x;
const HangBreak = value0 => $HangingDoc("HangBreak", value0);
const HangOps = value0 => value1 => value2 => $HangingDoc("HangOps", value0, value1, value2);
const HangApp = value0 => value1 => value2 => $HangingDoc("HangApp", value0, value1, value2);
const HangingOp = value0 => value1 => value2 => $HangingOp(value0, value1, value2);
const overHangHead = f => {
  const go = v => {
    if (v.tag === "HangBreak") { return $HangingDoc("HangBreak", f(v._1)); }
    if (v.tag === "HangOps") { return $HangingDoc("HangOps", v._1, go(v._2), v._3); }
    if (v.tag === "HangApp") { return $HangingDoc("HangApp", v._1, go(v._2), v._3); }
    $runtime.fail();
  };
  return go;
};
const hangWithIndent = ind => a => {
  const $2 = HangApp(ind)(a);
  return x => {
    if (x.length > 0) { return $2(x); }
    return a;
  };
};
const hangOps = /* #__PURE__ */ HangOps(Tidy$dDoc.indent);
const hangHead = hangHead$a0$copy => {
  let hangHead$a0 = hangHead$a0$copy, hangHead$c = true, hangHead$r;
  while (hangHead$c) {
    const v = hangHead$a0;
    if (v.tag === "HangBreak") {
      hangHead$c = false;
      hangHead$r = v._1;
      continue;
    }
    if (v.tag === "HangOps") {
      hangHead$a0 = v._2;
      continue;
    }
    if (v.tag === "HangApp") {
      hangHead$a0 = v._2;
      continue;
    }
    $runtime.fail();
  };
  return hangHead$r;
};
const hangConcatApp = a => b => {
  if (a.tag === "HangApp") { return $HangingDoc("HangApp", a._1, a._2, Data$dSemigroup.concatArray(a._3)(b)); }
  return $HangingDoc("HangApp", Tidy$dDoc.indent, a, b);
};
const hangBreak = x => $HangingDoc("HangBreak", Tidy$dDoc.flexGroup(x));
const hangApp = /* #__PURE__ */ HangApp(Tidy$dDoc.indent);
const hang = a => {
  const $1 = HangApp(Tidy$dDoc.indent)($HangingDoc("HangBreak", Tidy$dDoc.flexGroup(a)));
  return x => $1([x]);
};
const breaks = fl => n => {
  if (fl.tag === "ForceBreak" || n > 0) {
    if (n >= 2) { return Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.Break); }
    return Dodo$dInternal.Break;
  }
  if (fl.tag === "ForceSpace") { return Dodo$dInternal.$Doc("Text", 1, " "); }
  return Dodo$dInternal.Empty;
};
const toFormatDoc = /* #__PURE__ */ (() => {
  const realignOp = realignOp$a0$copy => realignOp$a1$copy => {
    let realignOp$a0 = realignOp$a0$copy, realignOp$a1 = realignOp$a1$copy, realignOp$c = true, realignOp$r;
    while (realignOp$c) {
      const op = realignOp$a0, doc = realignOp$a1;
      const v = hangHead(doc);
      if (
        (op.leading.left.tag === "ForceNone" || (op.leading.left.tag === "ForceSpace" || !(op.leading.left.tag === "ForceBreak"))) && (
          op.leading.lines === 0 && (
            (op.trailing.right.tag === "ForceNone" || (op.trailing.right.tag === "ForceSpace" || !(op.trailing.right.tag === "ForceBreak"))) && (
              (v.leading.left.tag === "ForceNone" || (v.leading.left.tag === "ForceSpace" || !(v.leading.left.tag === "ForceBreak"))) && v.leading.lines > 0
            )
          )
        )
      ) {
        realignOp$a0 = Tidy$dDoc.forceMinSourceBreaks(1)(op);
        realignOp$a1 = overHangHead(Tidy$dDoc.flattenMax(0))(doc);
        continue;
      }
      if (doc.tag === "HangBreak") {
        if (
          (op.trailing.right.tag === "ForceNone" || (op.trailing.right.tag === "ForceSpace" || !(op.trailing.right.tag === "ForceBreak"))) && (
            (v.leading.left.tag === "ForceNone" || (v.leading.left.tag === "ForceSpace" || !(v.leading.left.tag === "ForceBreak"))) && (
              v.leading.lines === 0 && (v.leading.multiline || op.multiline)
            )
          )
        ) {
          realignOp$c = false;
          realignOp$r = Data$dTuple.$Tuple(op, overHangHead(Tidy$dDoc.forceMinSourceBreaks(1))(doc));
          continue;
        }
        realignOp$c = false;
        realignOp$r = Data$dTuple.$Tuple(op, doc);
        continue;
      }
      realignOp$c = false;
      realignOp$r = Data$dTuple.$Tuple(op, doc);
      continue;
    };
    return realignOp$r;
  };
  const goLastOperand = prevAlgn => prevInd => v => {
    if (v.tag === "HangBreak") {
      const doc$p = Tidy$dDoc.flexGroup((() => {
        if (v._1.isEmpty) { return v._1; }
        if (
          (() => {
            if (v._1.leading.left.tag === "ForceNone") { return false; }
            if (v._1.leading.left.tag === "ForceSpace") { return false; }
            return v._1.leading.left.tag === "ForceBreak";
          })() || v._1.leading.lines > 0
        ) {
          return v._1;
        }
        if (v._1.leading.multiline || v._1.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)(v._1); }
        return {
          doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append(v._1.leading.doc)(Tidy$dDoc.breakDoc(v._1.leading.right)(v._1.doc))),
          isEmpty: v._1.isEmpty,
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          multiline: v._1.multiline,
          trailing: v._1.trailing
        };
      })());
      return Data$dTuple.$Tuple(doc$p, prevInd(doc$p));
    }
    if (v.tag === "HangApp") {
      const $5 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($5.tag === "Just") { return $5._1; }
        $runtime.fail();
      })();
      const $$this = goInit((() => {
        if (v._2.tag === "HangApp") { return overHangHead(Tidy$dDoc.forceMinSourceBreaks(1))(v._2); }
        return v._2;
      })())._1;
      const next = Data$dFoldable.foldrArray(goInitApp)(goLastApp(v1.last))(v1.init);
      const docIndent = (() => {
        if (v._2.tag === "HangApp") { return next._1; }
        return v._1(next._1);
      })();
      return Data$dTuple.$Tuple(
        (() => {
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($$this.leading.left.tag === "ForceNone") { return false; }
                if ($$this.leading.left.tag === "ForceSpace") { return false; }
                return $$this.leading.left.tag === "ForceBreak";
              })() || $$this.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))(Tidy$dDoc.breakDoc($$this.trailing.left)($$this.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(next._1.leading.left))(next._1.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._1.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._1.doc))(Tidy$dDoc.breakDoc(next._1.trailing.left)(next._1.trailing.doc))));
          return {
            doc: (() => {
              const $12 = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(docIndent.leading.left))(docIndent.leading.lines))(Dodo$dInternal.semigroupDoc.append(docIndent.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(docIndent.doc))(Tidy$dDoc.breakDoc(docIndent.trailing.left)(docIndent.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $12);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $$this.leading.multiline || ($$this.multiline || $$this.trailing.multiline) || (
              next._1.leading.multiline || (next._1.multiline || next._1.trailing.multiline)
            ) && (docIndent.leading.multiline || (docIndent.multiline || docIndent.trailing.multiline)),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max(next._1.trailing.right)(docIndent.trailing.right)}
          };
        })(),
        (() => {
          const $10 = prevInd($$this);
          const $11 = prevAlgn(docIndent);
          const $12 = prevInd(docIndent);
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($10.leading.left.tag === "ForceNone") { return false; }
                if ($10.leading.left.tag === "ForceSpace") { return false; }
                return $10.leading.left.tag === "ForceBreak";
              })() || $10.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($10.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($10.leading.right)($10.doc))(Tidy$dDoc.breakDoc($10.trailing.left)($10.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($10.trailing.right)($11.leading.left))($11.leading.lines))(Dodo$dInternal.semigroupDoc.append($11.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($11.leading.right)($11.doc))(Tidy$dDoc.breakDoc($11.trailing.left)($11.trailing.doc))));
          return {
            doc: (() => {
              const $15 = Dodo$dInternal.semigroupDoc.append(breaks(max($10.trailing.right)($12.leading.left))($12.leading.lines))(Dodo$dInternal.semigroupDoc.append($12.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($11.leading.right)($12.doc))(Tidy$dDoc.breakDoc($12.trailing.left)($12.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $15);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $10.leading.multiline || ($10.multiline || $10.trailing.multiline) || ($11.leading.multiline || ($11.multiline || $11.trailing.multiline)) && (
              $12.leading.multiline || ($12.multiline || $12.trailing.multiline)
            ),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max($11.trailing.right)($12.trailing.right)}
          };
        })()
      );
    }
    if (v.tag === "HangOps") {
      const $5 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($5.tag === "Just") { return $5._1; }
        $runtime.fail();
      })();
      const $$this = goInit(v._2)._1;
      const next = Data$dFoldable.foldrArray(goInitOp(v._1))(goLastOp(v._1)(v1.last))(v1.init);
      const docIndent = v._1(next._1);
      return Data$dTuple.$Tuple(
        (() => {
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($$this.leading.left.tag === "ForceNone") { return false; }
                if ($$this.leading.left.tag === "ForceSpace") { return false; }
                return $$this.leading.left.tag === "ForceBreak";
              })() || $$this.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))(Tidy$dDoc.breakDoc($$this.trailing.left)($$this.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(next._1.leading.left))(next._1.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._1.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._1.doc))(Tidy$dDoc.breakDoc(next._1.trailing.left)(next._1.trailing.doc))));
          return {
            doc: (() => {
              const $12 = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(docIndent.leading.left))(docIndent.leading.lines))(Dodo$dInternal.semigroupDoc.append(docIndent.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(docIndent.doc))(Tidy$dDoc.breakDoc(docIndent.trailing.left)(docIndent.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $12);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $$this.leading.multiline || ($$this.multiline || $$this.trailing.multiline) || (
              next._1.leading.multiline || (next._1.multiline || next._1.trailing.multiline)
            ) && (docIndent.leading.multiline || (docIndent.multiline || docIndent.trailing.multiline)),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max(next._1.trailing.right)(docIndent.trailing.right)}
          };
        })(),
        (() => {
          const $10 = prevInd($$this);
          const $11 = prevAlgn(docIndent);
          const $12 = prevInd(docIndent);
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($10.leading.left.tag === "ForceNone") { return false; }
                if ($10.leading.left.tag === "ForceSpace") { return false; }
                return $10.leading.left.tag === "ForceBreak";
              })() || $10.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($10.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($10.leading.right)($10.doc))(Tidy$dDoc.breakDoc($10.trailing.left)($10.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($10.trailing.right)($11.leading.left))($11.leading.lines))(Dodo$dInternal.semigroupDoc.append($11.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($11.leading.right)($11.doc))(Tidy$dDoc.breakDoc($11.trailing.left)($11.trailing.doc))));
          return {
            doc: (() => {
              const $15 = Dodo$dInternal.semigroupDoc.append(breaks(max($10.trailing.right)($12.leading.left))($12.leading.lines))(Dodo$dInternal.semigroupDoc.append($12.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($11.leading.right)($12.doc))(Tidy$dDoc.breakDoc($12.trailing.left)($12.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $15);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $10.leading.multiline || ($10.multiline || $10.trailing.multiline) || ($11.leading.multiline || ($11.multiline || $11.trailing.multiline)) && (
              $12.leading.multiline || ($12.multiline || $12.trailing.multiline)
            ),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max($11.trailing.right)($12.trailing.right)}
          };
        })()
      );
    }
    $runtime.fail();
  };
  const goLastOp = ind => v => {
    const next = goLastOperand((() => {
      if (v._1 <= 1) { return Tidy$dDoc.align(2); }
      return identity;
    })())(ind)(v._3);
    return Data$dTuple.$Tuple(
      (() => {
        const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
          if (
            (() => {
              if (v._2.leading.left.tag === "ForceNone") { return false; }
              if (v._2.leading.left.tag === "ForceSpace") { return false; }
              return v._2.leading.left.tag === "ForceBreak";
            })() || v._2.leading.lines > 0
          ) {
            return Dodo$dInternal.Break;
          }
          return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
        })())(Dodo$dInternal.semigroupDoc.append(v._2.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(v._2.leading.right)(v._2.doc))(Tidy$dDoc.breakDoc(v._2.trailing.left)(v._2.trailing.doc))));
        const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max(v._2.trailing.right)(next._1.leading.left))(next._1.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._1.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._1.doc))(Tidy$dDoc.breakDoc(next._1.trailing.left)(next._1.trailing.doc))));
        return {
          doc: (() => {
            const $7 = Dodo$dInternal.semigroupDoc.append(breaks(max(v._2.trailing.right)(next._2.leading.left))(next._2.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._2.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._2.doc))(Tidy$dDoc.breakDoc(next._2.trailing.left)(next._2.trailing.doc))));
            if (doc1$p.tag === "Empty") { return doc2$p; }
            return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $7);
          })(),
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          isEmpty: false,
          multiline: v._2.leading.multiline || (v._2.multiline || v._2.trailing.multiline) || (next._1.leading.multiline || (next._1.multiline || next._1.trailing.multiline)) && (
            next._2.leading.multiline || (next._2.multiline || next._2.trailing.multiline)
          ),
          trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max(next._1.trailing.right)(next._2.trailing.right)}
        };
      })(),
      Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
        if (v._2.isEmpty) { return v._2; }
        if (
          (() => {
            if (v._2.leading.left.tag === "ForceNone") { return false; }
            if (v._2.leading.left.tag === "ForceSpace") { return false; }
            return v._2.leading.left.tag === "ForceBreak";
          })() || v._2.leading.lines > 0
        ) {
          return v._2;
        }
        if (v._2.leading.multiline || v._2.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)(v._2); }
        return {
          doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append(v._2.leading.doc)(Tidy$dDoc.breakDoc(v._2.leading.right)(v._2.doc))),
          isEmpty: v._2.isEmpty,
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          multiline: v._2.multiline,
          trailing: v._2.trailing
        };
      })())(next._2)
    );
  };
  const goLastApp = doc => {
    const $$this = goLast(doc);
    return Data$dTuple.$Tuple(Tidy$dDoc.flexGroup($$this._1), $$this._2);
  };
  const goLast = v => {
    if (v.tag === "HangBreak") {
      const doc$p = (() => {
        if (v._1.isEmpty) { return v._1; }
        if (
          (() => {
            if (v._1.leading.left.tag === "ForceNone") { return false; }
            if (v._1.leading.left.tag === "ForceSpace") { return false; }
            return v._1.leading.left.tag === "ForceBreak";
          })() || v._1.leading.lines > 0
        ) {
          return v._1;
        }
        if (v._1.leading.multiline || v._1.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)(v._1); }
        return {
          doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append(v._1.leading.doc)(Tidy$dDoc.breakDoc(v._1.leading.right)(v._1.doc))),
          isEmpty: v._1.isEmpty,
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          multiline: v._1.multiline,
          trailing: v._1.trailing
        };
      })();
      return Data$dTuple.$Tuple(doc$p, doc$p);
    }
    if (v.tag === "HangApp") {
      const $3 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($3.tag === "Just") { return $3._1; }
        $runtime.fail();
      })();
      const $$this = goInit(v._2)._1;
      const next = Data$dFoldable.foldrArray(goInitApp)(goLastApp(v1.last))(v1.init);
      return Data$dTuple.$Tuple(
        (() => {
          const $7 = (() => {
            if (v._2.tag === "HangApp") { return next._1; }
            return v._1(next._1);
          })();
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($$this.leading.left.tag === "ForceNone") { return false; }
                if ($$this.leading.left.tag === "ForceSpace") { return false; }
                return $$this.leading.left.tag === "ForceBreak";
              })() || $$this.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))(Tidy$dDoc.breakDoc($$this.trailing.left)($$this.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(next._1.leading.left))(next._1.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._1.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._1.doc))(Tidy$dDoc.breakDoc(next._1.trailing.left)(next._1.trailing.doc))));
          return {
            doc: (() => {
              const $10 = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)($7.leading.left))($7.leading.lines))(Dodo$dInternal.semigroupDoc.append($7.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)($7.doc))(Tidy$dDoc.breakDoc($7.trailing.left)($7.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $10);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $$this.leading.multiline || ($$this.multiline || $$this.trailing.multiline) || (
              next._1.leading.multiline || (next._1.multiline || next._1.trailing.multiline)
            ) && ($7.leading.multiline || ($7.multiline || $7.trailing.multiline)),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max(next._1.trailing.right)($7.trailing.right)}
          };
        })(),
        Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
          if ($$this.isEmpty) { return $$this; }
          if (
            (() => {
              if ($$this.leading.left.tag === "ForceNone") { return false; }
              if ($$this.leading.left.tag === "ForceSpace") { return false; }
              return $$this.leading.left.tag === "ForceBreak";
            })() || $$this.leading.lines > 0
          ) {
            return $$this;
          }
          if ($$this.leading.multiline || $$this.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)($$this); }
          return {
            doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))),
            isEmpty: $$this.isEmpty,
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            multiline: $$this.multiline,
            trailing: $$this.trailing
          };
        })())((() => {
          if (v._2.tag === "HangApp") { return next._1; }
          return v._1(next._1);
        })())
      );
    }
    if (v.tag === "HangOps") {
      const $3 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($3.tag === "Just") { return $3._1; }
        $runtime.fail();
      })();
      const $$this = goInit(v._2)._1;
      const next = Data$dFoldable.foldrArray(goInitOp(v._1))(goLastOp(v._1)(v1.last))(v1.init);
      return Data$dTuple.$Tuple(
        (() => {
          const $7 = v._1(next._1);
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($$this.leading.left.tag === "ForceNone") { return false; }
                if ($$this.leading.left.tag === "ForceSpace") { return false; }
                return $$this.leading.left.tag === "ForceBreak";
              })() || $$this.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))(Tidy$dDoc.breakDoc($$this.trailing.left)($$this.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(next._1.leading.left))(next._1.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._1.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._1.doc))(Tidy$dDoc.breakDoc(next._1.trailing.left)(next._1.trailing.doc))));
          return {
            doc: (() => {
              const $10 = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)($7.leading.left))($7.leading.lines))(Dodo$dInternal.semigroupDoc.append($7.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)($7.doc))(Tidy$dDoc.breakDoc($7.trailing.left)($7.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $10);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $$this.leading.multiline || ($$this.multiline || $$this.trailing.multiline) || (
              next._1.leading.multiline || (next._1.multiline || next._1.trailing.multiline)
            ) && ($7.leading.multiline || ($7.multiline || $7.trailing.multiline)),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max(next._1.trailing.right)($7.trailing.right)}
          };
        })(),
        Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))((() => {
          if ($$this.isEmpty) { return $$this; }
          if (
            (() => {
              if ($$this.leading.left.tag === "ForceNone") { return false; }
              if ($$this.leading.left.tag === "ForceSpace") { return false; }
              return $$this.leading.left.tag === "ForceBreak";
            })() || $$this.leading.lines > 0
          ) {
            return $$this;
          }
          if ($$this.leading.multiline || $$this.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)($$this); }
          return {
            doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))),
            isEmpty: $$this.isEmpty,
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            multiline: $$this.multiline,
            trailing: $$this.trailing
          };
        })())(v._1(next._2))
      );
    }
    $runtime.fail();
  };
  const goInitOperand = prevAlgn => prevInd => v => {
    if (v.tag === "HangBreak") {
      const doc$p = prevInd(Tidy$dDoc.flexGroup((() => {
        if (v._1.isEmpty) { return v._1; }
        if (
          (() => {
            if (v._1.leading.left.tag === "ForceNone") { return false; }
            if (v._1.leading.left.tag === "ForceSpace") { return false; }
            return v._1.leading.left.tag === "ForceBreak";
          })() || v._1.leading.lines > 0
        ) {
          return v._1;
        }
        if (v._1.leading.multiline || v._1.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)(v._1); }
        return {
          doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append(v._1.leading.doc)(Tidy$dDoc.breakDoc(v._1.leading.right)(v._1.doc))),
          isEmpty: v._1.isEmpty,
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          multiline: v._1.multiline,
          trailing: v._1.trailing
        };
      })()));
      return Data$dTuple.$Tuple(doc$p, doc$p);
    }
    if (v.tag === "HangApp") {
      const $5 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($5.tag === "Just") { return $5._1; }
        $runtime.fail();
      })();
      const $$this = goInit(v._2)._1;
      const next = Data$dFoldable.foldrArray(goInitApp)(goLastApp(v1.last))(v1.init);
      return Data$dTuple.$Tuple(
        (() => {
          const $9 = prevInd($$this);
          const $10 = (() => {
            if (v._2.tag === "HangApp") { return next._1; }
            return prevAlgn(v._1(next._1));
          })();
          const $11 = prevInd((() => {
            if (v._2.tag === "HangApp") { return next._1; }
            return v._1(next._1);
          })());
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($9.leading.left.tag === "ForceNone") { return false; }
                if ($9.leading.left.tag === "ForceSpace") { return false; }
                return $9.leading.left.tag === "ForceBreak";
              })() || $9.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($9.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($9.leading.right)($9.doc))(Tidy$dDoc.breakDoc($9.trailing.left)($9.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($9.trailing.right)($10.leading.left))($10.leading.lines))(Dodo$dInternal.semigroupDoc.append($10.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($10.leading.right)($10.doc))(Tidy$dDoc.breakDoc($10.trailing.left)($10.trailing.doc))));
          return {
            doc: (() => {
              const $14 = Dodo$dInternal.semigroupDoc.append(breaks(max($9.trailing.right)($11.leading.left))($11.leading.lines))(Dodo$dInternal.semigroupDoc.append($11.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($10.leading.right)($11.doc))(Tidy$dDoc.breakDoc($11.trailing.left)($11.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $14);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $9.leading.multiline || ($9.multiline || $9.trailing.multiline) || ($10.leading.multiline || ($10.multiline || $10.trailing.multiline)) && (
              $11.leading.multiline || ($11.multiline || $11.trailing.multiline)
            ),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max($10.trailing.right)($11.trailing.right)}
          };
        })(),
        prevInd(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
          if ($$this.isEmpty) { return $$this; }
          if (
            (() => {
              if ($$this.leading.left.tag === "ForceNone") { return false; }
              if ($$this.leading.left.tag === "ForceSpace") { return false; }
              return $$this.leading.left.tag === "ForceBreak";
            })() || $$this.leading.lines > 0
          ) {
            return $$this;
          }
          if ($$this.leading.multiline || $$this.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)($$this); }
          return {
            doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))),
            isEmpty: $$this.isEmpty,
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            multiline: $$this.multiline,
            trailing: $$this.trailing
          };
        })())(v._1(next._2)))
      );
    }
    if (v.tag === "HangOps") {
      const $5 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($5.tag === "Just") { return $5._1; }
        $runtime.fail();
      })();
      const $$this = goInit(v._2)._1;
      const next = Data$dFoldable.foldrArray(goInitOp(v._1))(goLastOp(v._1)(v1.last))(v1.init);
      return Data$dTuple.$Tuple(
        (() => {
          const $9 = prevInd($$this);
          const $10 = prevAlgn(v._1(next._1));
          const $11 = prevInd(v._1(next._1));
          const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
            if (
              (() => {
                if ($9.leading.left.tag === "ForceNone") { return false; }
                if ($9.leading.left.tag === "ForceSpace") { return false; }
                return $9.leading.left.tag === "ForceBreak";
              })() || $9.leading.lines > 0
            ) {
              return Dodo$dInternal.Break;
            }
            return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
          })())(Dodo$dInternal.semigroupDoc.append($9.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($9.leading.right)($9.doc))(Tidy$dDoc.breakDoc($9.trailing.left)($9.trailing.doc))));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($9.trailing.right)($10.leading.left))($10.leading.lines))(Dodo$dInternal.semigroupDoc.append($10.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($10.leading.right)($10.doc))(Tidy$dDoc.breakDoc($10.trailing.left)($10.trailing.doc))));
          return {
            doc: (() => {
              const $14 = Dodo$dInternal.semigroupDoc.append(breaks(max($9.trailing.right)($11.leading.left))($11.leading.lines))(Dodo$dInternal.semigroupDoc.append($11.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($10.leading.right)($11.doc))(Tidy$dDoc.breakDoc($11.trailing.left)($11.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $14);
            })(),
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            isEmpty: false,
            multiline: $9.leading.multiline || ($9.multiline || $9.trailing.multiline) || ($10.leading.multiline || ($10.multiline || $10.trailing.multiline)) && (
              $11.leading.multiline || ($11.multiline || $11.trailing.multiline)
            ),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max($10.trailing.right)($11.trailing.right)}
          };
        })(),
        prevInd(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
          if ($$this.isEmpty) { return $$this; }
          if (
            (() => {
              if ($$this.leading.left.tag === "ForceNone") { return false; }
              if ($$this.leading.left.tag === "ForceSpace") { return false; }
              return $$this.leading.left.tag === "ForceBreak";
            })() || $$this.leading.lines > 0
          ) {
            return $$this;
          }
          if ($$this.leading.multiline || $$this.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)($$this); }
          return {
            doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))),
            isEmpty: $$this.isEmpty,
            leading: Tidy$dDoc.monoidLeadingComment.mempty,
            multiline: $$this.multiline,
            trailing: $$this.trailing
          };
        })())(v._1(next._2)))
      );
    }
    $runtime.fail();
  };
  const goInitOp = ind => v => next => {
    const v1 = realignOp(v._2)(v._3);
    const docOprd = goInitOperand((() => {
      if (v._1 <= 1) { return Tidy$dDoc.align(2); }
      return identity;
    })())(ind)(v1._2)._1;
    return Data$dTuple.$Tuple(
      (() => {
        const $7 = Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(v1._1)(docOprd);
        const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
          if (
            (() => {
              if ($7.leading.left.tag === "ForceNone") { return false; }
              if ($7.leading.left.tag === "ForceSpace") { return false; }
              return $7.leading.left.tag === "ForceBreak";
            })() || $7.leading.lines > 0
          ) {
            return Dodo$dInternal.Break;
          }
          return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
        })())(Dodo$dInternal.semigroupDoc.append($7.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($7.leading.right)($7.doc))(Tidy$dDoc.breakDoc($7.trailing.left)($7.trailing.doc))));
        const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($7.trailing.right)(next._1.leading.left))(next._1.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._1.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._1.doc))(Tidy$dDoc.breakDoc(next._1.trailing.left)(next._1.trailing.doc))));
        return {
          doc: (() => {
            const $10 = Dodo$dInternal.semigroupDoc.append(breaks(max($7.trailing.right)(next._2.leading.left))(next._2.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._2.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._2.doc))(Tidy$dDoc.breakDoc(next._2.trailing.left)(next._2.trailing.doc))));
            if (doc1$p.tag === "Empty") { return doc2$p; }
            return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $10);
          })(),
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          isEmpty: false,
          multiline: $7.leading.multiline || ($7.multiline || $7.trailing.multiline) || (next._1.leading.multiline || (next._1.multiline || next._1.trailing.multiline)) && (
            next._2.leading.multiline || (next._2.multiline || next._2.trailing.multiline)
          ),
          trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max(next._1.trailing.right)(next._2.trailing.right)}
        };
      })(),
      Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
        if (v1._1.isEmpty) { return v1._1; }
        if (
          (() => {
            if (v1._1.leading.left.tag === "ForceNone") { return false; }
            if (v1._1.leading.left.tag === "ForceSpace") { return false; }
            return v1._1.leading.left.tag === "ForceBreak";
          })() || v1._1.leading.lines > 0
        ) {
          return v1._1;
        }
        if (v1._1.leading.multiline || v1._1.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)(v1._1); }
        return {
          doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append(v1._1.leading.doc)(Tidy$dDoc.breakDoc(v1._1.leading.right)(v1._1.doc))),
          isEmpty: v1._1.isEmpty,
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          multiline: v1._1.multiline,
          trailing: v1._1.trailing
        };
      })())(Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(docOprd)(next._2))
    );
  };
  const goInitApp = doc => next => {
    const $$this = goInit(doc)._1;
    return Data$dTuple.$Tuple(
      (() => {
        const doc1$p = Dodo$dInternal.semigroupDoc.append((() => {
          if (
            (() => {
              if ($$this.leading.left.tag === "ForceNone") { return false; }
              if ($$this.leading.left.tag === "ForceSpace") { return false; }
              return $$this.leading.left.tag === "ForceBreak";
            })() || $$this.leading.lines > 0
          ) {
            return Dodo$dInternal.Break;
          }
          return Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break);
        })())(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))(Tidy$dDoc.breakDoc($$this.trailing.left)($$this.trailing.doc))));
        const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(next._1.leading.left))(next._1.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._1.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._1.doc))(Tidy$dDoc.breakDoc(next._1.trailing.left)(next._1.trailing.doc))));
        return {
          doc: (() => {
            const $7 = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)(next._2.leading.left))(next._2.leading.lines))(Dodo$dInternal.semigroupDoc.append(next._2.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc(next._1.leading.right)(next._2.doc))(Tidy$dDoc.breakDoc(next._2.trailing.left)(next._2.trailing.doc))));
            if (doc1$p.tag === "Empty") { return doc2$p; }
            return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $7);
          })(),
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          isEmpty: false,
          multiline: $$this.leading.multiline || ($$this.multiline || $$this.trailing.multiline) || (next._1.leading.multiline || (next._1.multiline || next._1.trailing.multiline)) && (
            next._2.leading.multiline || (next._2.multiline || next._2.trailing.multiline)
          ),
          trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max(next._1.trailing.right)(next._2.trailing.right)}
        };
      })(),
      Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))((() => {
        if ($$this.isEmpty) { return $$this; }
        if (
          (() => {
            if ($$this.leading.left.tag === "ForceNone") { return false; }
            if ($$this.leading.left.tag === "ForceSpace") { return false; }
            return $$this.leading.left.tag === "ForceBreak";
          })() || $$this.leading.lines > 0
        ) {
          return $$this;
        }
        if ($$this.leading.multiline || $$this.multiline) { return Tidy$dDoc.forceMinSourceBreaks(1)($$this); }
        return {
          doc: Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, " "), Dodo$dInternal.Break))(Dodo$dInternal.semigroupDoc.append($$this.leading.doc)(Tidy$dDoc.breakDoc($$this.leading.right)($$this.doc))),
          isEmpty: $$this.isEmpty,
          leading: Tidy$dDoc.monoidLeadingComment.mempty,
          multiline: $$this.multiline,
          trailing: $$this.trailing
        };
      })())(next._2)
    );
  };
  const goInit = v => {
    if (v.tag === "HangBreak") { return Data$dTuple.$Tuple(v._1, v._1); }
    if (v.tag === "HangApp") {
      const $3 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($3.tag === "Just") { return $3._1; }
        $runtime.fail();
      })();
      const $$this = goInit(v._2)._1;
      const next = Data$dFoldable.foldrArray(goInitApp)(goLastApp(v1.last))(v1.init);
      return Data$dTuple.$Tuple(
        (() => {
          const $7 = v._1(next._1);
          const $8 = (() => {
            if (v._2.tag === "HangApp") { return next._1; }
            return v._1(next._1);
          })();
          const doc1$p = Dodo$dInternal.semigroupDoc.append($$this.doc)(Tidy$dDoc.breakDoc($$this.trailing.left)($$this.trailing.doc));
          const doc2$p = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)($7.leading.left))($7.leading.lines))(Dodo$dInternal.semigroupDoc.append($7.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($7.leading.right)($7.doc))(Tidy$dDoc.breakDoc($7.trailing.left)($7.trailing.doc))));
          return {
            doc: (() => {
              const $11 = Dodo$dInternal.semigroupDoc.append(breaks(max($$this.trailing.right)($8.leading.left))($8.leading.lines))(Dodo$dInternal.semigroupDoc.append($8.leading.doc)(Dodo$dInternal.semigroupDoc.append(Tidy$dDoc.breakDoc($7.leading.right)($8.doc))(Tidy$dDoc.breakDoc($8.trailing.left)($8.trailing.doc))));
              if (doc1$p.tag === "Empty") { return doc2$p; }
              return Dodo$dInternal.$Doc("FlexSelect", doc1$p, doc2$p, $11);
            })(),
            leading: $$this.leading,
            isEmpty: false,
            multiline: $$this.multiline || $$this.trailing.multiline || ($7.leading.multiline || ($7.multiline || $7.trailing.multiline)) && (
              $8.leading.multiline || ($8.multiline || $8.trailing.multiline)
            ),
            trailing: {doc: Dodo$dInternal.Empty, left: Tidy$dDoc.ForceNone, multiline: false, right: max($7.trailing.right)($8.trailing.right)}
          };
        })(),
        Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))($$this)(v._1(next._2))
      );
    }
    if (v.tag === "HangOps") {
      const $3 = Data$dArray.unsnoc(v._3);
      const v1 = (() => {
        if ($3.tag === "Just") { return $3._1; }
        $runtime.fail();
      })();
      const $$this = goInit(v._2)._1;
      const next = Data$dFoldable.foldrArray(goInitOp(v._1))(goLastOp(v._1)(v1.last))(v1.init);
      return Data$dTuple.$Tuple(
        Tidy$dDoc.joinDoc(Tidy$dDoc.force(Tidy$dDoc.identity))(Tidy$dDoc.flexGroup($$this))(v._1(next._1)),
        Tidy$dDoc.joinDoc(Tidy$dDoc.force(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)))($$this)(v._1(next._2))
      );
    }
    $runtime.fail();
  };
  return x => goInit(x)._1;
})();
export {
  $HangingDoc,
  $HangingOp,
  HangApp,
  HangBreak,
  HangOps,
  HangingOp,
  breaks,
  hang,
  hangApp,
  hangBreak,
  hangConcatApp,
  hangHead,
  hangOps,
  hangWithIndent,
  identity,
  max,
  overHangHead,
  toFormatDoc
};
