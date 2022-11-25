import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as PureScript$dCST$dTypes from "../PureScript.CST.Types/index.js";
const $LayoutDelim = tag => ({tag});
const LytRoot = /* #__PURE__ */ $LayoutDelim("LytRoot");
const LytTopDecl = /* #__PURE__ */ $LayoutDelim("LytTopDecl");
const LytTopDeclHead = /* #__PURE__ */ $LayoutDelim("LytTopDeclHead");
const LytDeclGuard = /* #__PURE__ */ $LayoutDelim("LytDeclGuard");
const LytCase = /* #__PURE__ */ $LayoutDelim("LytCase");
const LytCaseBinders = /* #__PURE__ */ $LayoutDelim("LytCaseBinders");
const LytCaseGuard = /* #__PURE__ */ $LayoutDelim("LytCaseGuard");
const LytLambdaBinders = /* #__PURE__ */ $LayoutDelim("LytLambdaBinders");
const LytParen = /* #__PURE__ */ $LayoutDelim("LytParen");
const LytBrace = /* #__PURE__ */ $LayoutDelim("LytBrace");
const LytSquare = /* #__PURE__ */ $LayoutDelim("LytSquare");
const LytIf = /* #__PURE__ */ $LayoutDelim("LytIf");
const LytThen = /* #__PURE__ */ $LayoutDelim("LytThen");
const LytProperty = /* #__PURE__ */ $LayoutDelim("LytProperty");
const LytForall = /* #__PURE__ */ $LayoutDelim("LytForall");
const LytTick = /* #__PURE__ */ $LayoutDelim("LytTick");
const LytLet = /* #__PURE__ */ $LayoutDelim("LytLet");
const LytLetStmt = /* #__PURE__ */ $LayoutDelim("LytLetStmt");
const LytWhere = /* #__PURE__ */ $LayoutDelim("LytWhere");
const LytOf = /* #__PURE__ */ $LayoutDelim("LytOf");
const LytDo = /* #__PURE__ */ $LayoutDelim("LytDo");
const LytAdo = /* #__PURE__ */ $LayoutDelim("LytAdo");
const lytToken = pos => value => ({range: {start: pos, end: pos}, leadingComments: [], trailingComments: [], value: value});
const isIndented = v => v.tag === "LytLet" || (v.tag === "LytLetStmt" || (v.tag === "LytWhere" || (v.tag === "LytOf" || (v.tag === "LytDo" || v.tag === "LytAdo"))));
const eqLayoutDelim = {
  eq: x => y => {
    if (x.tag === "LytRoot") { return y.tag === "LytRoot"; }
    if (x.tag === "LytTopDecl") { return y.tag === "LytTopDecl"; }
    if (x.tag === "LytTopDeclHead") { return y.tag === "LytTopDeclHead"; }
    if (x.tag === "LytDeclGuard") { return y.tag === "LytDeclGuard"; }
    if (x.tag === "LytCase") { return y.tag === "LytCase"; }
    if (x.tag === "LytCaseBinders") { return y.tag === "LytCaseBinders"; }
    if (x.tag === "LytCaseGuard") { return y.tag === "LytCaseGuard"; }
    if (x.tag === "LytLambdaBinders") { return y.tag === "LytLambdaBinders"; }
    if (x.tag === "LytParen") { return y.tag === "LytParen"; }
    if (x.tag === "LytBrace") { return y.tag === "LytBrace"; }
    if (x.tag === "LytSquare") { return y.tag === "LytSquare"; }
    if (x.tag === "LytIf") { return y.tag === "LytIf"; }
    if (x.tag === "LytThen") { return y.tag === "LytThen"; }
    if (x.tag === "LytProperty") { return y.tag === "LytProperty"; }
    if (x.tag === "LytForall") { return y.tag === "LytForall"; }
    if (x.tag === "LytTick") { return y.tag === "LytTick"; }
    if (x.tag === "LytLet") { return y.tag === "LytLet"; }
    if (x.tag === "LytLetStmt") { return y.tag === "LytLetStmt"; }
    if (x.tag === "LytWhere") { return y.tag === "LytWhere"; }
    if (x.tag === "LytOf") { return y.tag === "LytOf"; }
    if (x.tag === "LytDo") { return y.tag === "LytDo"; }
    if (x.tag === "LytAdo") { return y.tag === "LytAdo"; }
    return false;
  }
};
const insertLayout = v => nextPos => stack => {
  const sepP = lytPos => v.range.start.column === lytPos.column && v.range.start.line !== lytPos.line;
  const insertStart = lyt => v1 => {
    const v2 = Data$dFoldable.find(Data$dList$dTypes.foldableList)(x => x._2.tag === "LytLet" || (
      x._2.tag === "LytLetStmt" || (x._2.tag === "LytWhere" || (x._2.tag === "LytOf" || (x._2.tag === "LytDo" || x._2.tag === "LytAdo")))
    ))(v1._1);
    const $7 = () => Data$dTuple.$Tuple(
      Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(nextPos, lyt), v1._1),
      Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
        Data$dTuple.$Tuple(
          {range: {start: nextPos, end: nextPos}, leadingComments: [], trailingComments: [], value: PureScript$dCST$dTypes.$Token("TokLayoutStart", nextPos.column)},
          Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(nextPos, lyt), v1._1)
        )
      ]))(v1._2))
    );
    if (v2.tag === "Just") {
      if (nextPos.column <= v2._1._1.column) { return v1; }
      return $7();
    }
    return $7();
  };
  const insertSep = v1 => {
    const sepTok = {
      range: {start: v.range.start, end: v.range.start},
      leadingComments: [],
      trailingComments: [],
      value: PureScript$dCST$dTypes.$Token("TokLayoutSep", v.range.start.column)
    };
    const $7 = (lyt, lytPos) => {
      if (lyt.tag === "LytOf") {
        return Data$dTuple.$Tuple(
          Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytCaseBinders), v1._1),
          Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(sepTok, v1._1)]))(v1._2))
        );
      }
      return Data$dTuple.$Tuple(v1._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(sepTok, v1._1)]))(v1._2)));
    };
    if (v1._1.tag === "Cons") {
      if (v1._1._1._2.tag === "LytTopDecl") {
        if (sepP(v1._1._1._1)) {
          return Data$dTuple.$Tuple(v1._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(sepTok, v1._1._2)]))(v1._2)));
        }
        if (
          (
            v1._1._1._2.tag === "LytLet" || (
              v1._1._1._2.tag === "LytLetStmt" || (v1._1._1._2.tag === "LytWhere" || (v1._1._1._2.tag === "LytOf" || (v1._1._1._2.tag === "LytDo" || v1._1._1._2.tag === "LytAdo")))
            )
          ) && sepP(v1._1._1._1)
        ) {
          return $7(v1._1._1._2, v1._1._1._1);
        }
        return v1;
      }
      if (v1._1._1._2.tag === "LytTopDeclHead") {
        if (sepP(v1._1._1._1)) {
          return Data$dTuple.$Tuple(v1._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(sepTok, v1._1._2)]))(v1._2)));
        }
        if (
          (
            v1._1._1._2.tag === "LytLet" || (
              v1._1._1._2.tag === "LytLetStmt" || (v1._1._1._2.tag === "LytWhere" || (v1._1._1._2.tag === "LytOf" || (v1._1._1._2.tag === "LytDo" || v1._1._1._2.tag === "LytAdo")))
            )
          ) && sepP(v1._1._1._1)
        ) {
          return $7(v1._1._1._2, v1._1._1._1);
        }
        return v1;
      }
      if (
        (
          v1._1._1._2.tag === "LytLet" || (
            v1._1._1._2.tag === "LytLetStmt" || (v1._1._1._2.tag === "LytWhere" || (v1._1._1._2.tag === "LytOf" || (v1._1._1._2.tag === "LytDo" || v1._1._1._2.tag === "LytAdo")))
          )
        ) && sepP(v1._1._1._1)
      ) {
        return $7(v1._1._1._2, v1._1._1._1);
      }
      return v1;
    }
    return v1;
  };
  const collapse = p => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const v1 = go$a0, v2 = go$a1;
        if (v1.tag === "Cons") {
          if (p(v1._1._1)(v1._1._2)) {
            go$a0 = v1._2;
            go$a1 = (() => {
              if (
                v1._1._2.tag === "LytLet" || (
                  v1._1._2.tag === "LytLetStmt" || (v1._1._2.tag === "LytWhere" || (v1._1._2.tag === "LytOf" || (v1._1._2.tag === "LytDo" || v1._1._2.tag === "LytAdo")))
                )
              ) {
                return Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
                  Data$dTuple.$Tuple(
                    {
                      range: {start: v.range.start, end: v.range.start},
                      leadingComments: [],
                      trailingComments: [],
                      value: PureScript$dCST$dTypes.$Token("TokLayoutEnd", v1._1._1.column)
                    },
                    v1._2
                  )
                ]))(v2));
              }
              return v2;
            })();
            continue;
          }
          go$c = false;
          go$r = Data$dTuple.$Tuple(v1, v2);
          continue;
        }
        go$c = false;
        go$r = Data$dTuple.$Tuple(v1, v2);
        continue;
      };
      return go$r;
    };
    return v$1 => go(v$1._1)(v$1._2);
  };
  const insertKwProperty = (k, state) => {
    const $9 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(state));
    const v1 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
    if (v1._1.tag === "Cons") {
      if (v1._1._1._2.tag === "LytProperty") { return Data$dTuple.$Tuple(v1._1._2, v1._2); }
      return k(v1);
    }
    return k(v1);
  };
  if (v.value.tag === "TokLowerName") {
    if (v.value._1.tag === "Nothing") {
      if (v.value._2 === "data") {
        const $8 = insertSep(collapse(lytPos => lyt => (
          lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
        ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
        const v2 = Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
        if (
          (() => {
            if (v2._1.tag === "Cons") {
              if (v2._1._1._2.tag === "LytWhere") {
                if (v2._1._2.tag === "Cons") {
                  if (v2._1._2._1._2.tag === "LytRoot") {
                    if (v2._1._2._2.tag === "Nil") { return v.range.start.column === v2._1._1._1.column; }
                    return false;
                  }
                  return false;
                }
                return false;
              }
              return false;
            }
            return false;
          })()
        ) {
          return Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytTopDecl), v2._1), v2._2);
        }
        if (v2._1.tag === "Cons") {
          if (eqLayoutDelim.eq(v2._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple(v2._1._2, v2._2); }
          return v2;
        }
        return v2;
      }
      if (v.value._2 === "class") {
        const $8 = insertSep(collapse(lytPos => lyt => (
          lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
        ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
        const v2 = Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
        if (
          (() => {
            if (v2._1.tag === "Cons") {
              if (v2._1._1._2.tag === "LytWhere") {
                if (v2._1._2.tag === "Cons") {
                  if (v2._1._2._1._2.tag === "LytRoot") {
                    if (v2._1._2._2.tag === "Nil") { return v.range.start.column === v2._1._1._1.column; }
                    return false;
                  }
                  return false;
                }
                return false;
              }
              return false;
            }
            return false;
          })()
        ) {
          return Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytTopDeclHead), v2._1), v2._2);
        }
        if (v2._1.tag === "Cons") {
          if (eqLayoutDelim.eq(v2._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple(v2._1._2, v2._2); }
          return v2;
        }
        return v2;
      }
      if (v.value._2 === "where") {
        const whereP = v2 => v3 => v3.tag === "LytDo" || (
          v3.tag === "LytLet" || (v3.tag === "LytLetStmt" || (v3.tag === "LytWhere" || (v3.tag === "LytOf" || (v3.tag === "LytDo" || v3.tag === "LytAdo"))))
        ) && v.range.start.column <= v2.column;
        if (stack.tag === "Cons") {
          if (stack._1._2.tag === "LytTopDeclHead") {
            return insertStart(LytWhere)(Data$dTuple.$Tuple(
              stack._2,
              Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, stack._2)]))([]))
            ));
          }
          if (stack._1._2.tag === "LytProperty") {
            return Data$dTuple.$Tuple(stack._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, stack._2)]))([])));
          }
          return insertStart(LytWhere)((() => {
            const $9 = collapse(whereP)(Data$dTuple.$Tuple(stack, []));
            return Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
          })());
        }
        return insertStart(LytWhere)((() => {
          const $9 = collapse(whereP)(Data$dTuple.$Tuple(stack, []));
          return Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
        })());
      }
      if (v.value._2 === "in") {
        const v2 = collapse(v2 => v3 => {
          if (v3.tag === "LytLet") { return false; }
          if (v3.tag === "LytAdo") { return false; }
          return v3.tag === "LytLet" || (v3.tag === "LytLetStmt" || (v3.tag === "LytWhere" || (v3.tag === "LytOf" || (v3.tag === "LytDo" || v3.tag === "LytAdo"))));
        })(Data$dTuple.$Tuple(stack, []));
        if (v2._1.tag === "Cons") {
          if (v2._1._1._2.tag === "LytLetStmt") {
            if (v2._1._2.tag === "Cons") {
              if (v2._1._2._1._2.tag === "LytAdo") {
                return Data$dTuple.$Tuple(
                  v2._1._2._2,
                  Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2._2)]))(Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
                    Data$dTuple.$Tuple(
                      {
                        range: {start: v.range.start, end: v.range.start},
                        leadingComments: [],
                        trailingComments: [],
                        value: PureScript$dCST$dTypes.$Token("TokLayoutEnd", v2._1._2._1._1.column)
                      },
                      v2._1._2._2
                    )
                  ]))(Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
                    Data$dTuple.$Tuple(
                      {
                        range: {start: v.range.start, end: v.range.start},
                        leadingComments: [],
                        trailingComments: [],
                        value: PureScript$dCST$dTypes.$Token("TokLayoutEnd", v2._1._1._1.column)
                      },
                      v2._1._2._2
                    )
                  ]))(v2._2))))))
                );
              }
              if (
                v2._1._1._2.tag === "LytLet" || (
                  v2._1._1._2.tag === "LytLetStmt" || (
                    v2._1._1._2.tag === "LytWhere" || (v2._1._1._2.tag === "LytOf" || (v2._1._1._2.tag === "LytDo" || v2._1._1._2.tag === "LytAdo"))
                  )
                )
              ) {
                return Data$dTuple.$Tuple(
                  v2._1._2,
                  Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
                    Data$dTuple.$Tuple(
                      {
                        range: {start: v.range.start, end: v.range.start},
                        leadingComments: [],
                        trailingComments: [],
                        value: PureScript$dCST$dTypes.$Token("TokLayoutEnd", v2._1._1._1.column)
                      },
                      v2._1._2
                    )
                  ]))(v2._2))))
                );
              }
              const $9 = insertSep(collapse(lytPos => lyt => (
                lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
              ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
              const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
              if ($10._1.tag === "Cons") {
                if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
                return $10;
              }
              return $10;
            }
            if (
              v2._1._1._2.tag === "LytLet" || (
                v2._1._1._2.tag === "LytLetStmt" || (
                  v2._1._1._2.tag === "LytWhere" || (v2._1._1._2.tag === "LytOf" || (v2._1._1._2.tag === "LytDo" || v2._1._1._2.tag === "LytAdo"))
                )
              )
            ) {
              return Data$dTuple.$Tuple(
                v2._1._2,
                Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
                  Data$dTuple.$Tuple(
                    {
                      range: {start: v.range.start, end: v.range.start},
                      leadingComments: [],
                      trailingComments: [],
                      value: PureScript$dCST$dTypes.$Token("TokLayoutEnd", v2._1._1._1.column)
                    },
                    v2._1._2
                  )
                ]))(v2._2))))
              );
            }
            const $9 = insertSep(collapse(lytPos => lyt => (
              lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
            ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
            const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
            if ($10._1.tag === "Cons") {
              if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
              return $10;
            }
            return $10;
          }
          if (
            v2._1._1._2.tag === "LytLet" || (
              v2._1._1._2.tag === "LytLetStmt" || (v2._1._1._2.tag === "LytWhere" || (v2._1._1._2.tag === "LytOf" || (v2._1._1._2.tag === "LytDo" || v2._1._1._2.tag === "LytAdo")))
            )
          ) {
            return Data$dTuple.$Tuple(
              v2._1._2,
              Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
                Data$dTuple.$Tuple(
                  {
                    range: {start: v.range.start, end: v.range.start},
                    leadingComments: [],
                    trailingComments: [],
                    value: PureScript$dCST$dTypes.$Token("TokLayoutEnd", v2._1._1._1.column)
                  },
                  v2._1._2
                )
              ]))(v2._2))))
            );
          }
          const $9 = insertSep(collapse(lytPos => lyt => (
            lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
          ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
          const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
          if ($10._1.tag === "Cons") {
            if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
            return $10;
          }
          return $10;
        }
        const $9 = insertSep(collapse(lytPos => lyt => (
          lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
        ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
        const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
        if ($10._1.tag === "Cons") {
          if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
          return $10;
        }
        return $10;
      }
      if (v.value._2 === "let") {
        return insertKwProperty(
          v2 => {
            if (v2._1.tag === "Cons") {
              if (v2._1._1._2.tag === "LytDo") {
                if (v2._1._1._1.column === v.range.start.column) { return insertStart(LytLetStmt)(v2); }
                return insertStart(LytLet)(v2);
              }
              if (v2._1._1._2.tag === "LytAdo") {
                if (v2._1._1._1.column === v.range.start.column) { return insertStart(LytLetStmt)(v2); }
                return insertStart(LytLet)(v2);
              }
              return insertStart(LytLet)(v2);
            }
            return insertStart(LytLet)(v2);
          },
          Data$dTuple.$Tuple(stack, [])
        );
      }
      if (v.value._2 === "do") { return insertKwProperty(insertStart(LytDo), Data$dTuple.$Tuple(stack, [])); }
      if (v.value._2 === "ado") { return insertKwProperty(insertStart(LytAdo), Data$dTuple.$Tuple(stack, [])); }
      if (v.value._2 === "case") {
        return insertKwProperty(v1 => Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytCase), v1._1), v1._2), Data$dTuple.$Tuple(stack, []));
      }
      if (v.value._2 === "of") {
        const v2 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
        if (v2._1.tag === "Cons") {
          if (v2._1._1._2.tag === "LytCase") {
            const $9 = insertStart(LytOf)(Data$dTuple.$Tuple(
              v2._1._2,
              Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(v2._2))
            ));
            return Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(nextPos, LytCaseBinders), $9._1), $9._2);
          }
          const $9 = insertSep(collapse(lytPos => lyt => (
            lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
          ) && v.range.start.column < lytPos.column)(v2));
          const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
          if ($10._1.tag === "Cons") {
            if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
            return $10;
          }
          return $10;
        }
        const $9 = insertSep(collapse(lytPos => lyt => (
          lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
        ) && v.range.start.column < lytPos.column)(v2));
        const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
        if ($10._1.tag === "Cons") {
          if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
          return $10;
        }
        return $10;
      }
      if (v.value._2 === "if") {
        return insertKwProperty(v1 => Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytIf), v1._1), v1._2), Data$dTuple.$Tuple(stack, []));
      }
      if (v.value._2 === "then") {
        const v2 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
        if (v2._1.tag === "Cons") {
          if (v2._1._1._2.tag === "LytIf") {
            return Data$dTuple.$Tuple(
              Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytThen), v2._1._2),
              Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(v2._2))
            );
          }
          const $9 = insertSep(collapse(lytPos => lyt => (
            lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
          ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
          const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
          if ($10._1.tag === "Cons") {
            if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
            return $10;
          }
          return $10;
        }
        const $9 = insertSep(collapse(lytPos => lyt => (
          lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
        ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
        const $10 = Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
        if ($10._1.tag === "Cons") {
          if (eqLayoutDelim.eq($10._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($10._1._2, $10._2); }
          return $10;
        }
        return $10;
      }
      if (v.value._2 === "else") {
        const v2 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
        const $9 = () => {
          const v3 = collapse(lytPos => lyt => (
            lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
          ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, []));
          if (
            (() => {
              if (v3._1.tag === "Cons") {
                if (v3._1._1._2.tag === "LytWhere") {
                  if (v3._1._2.tag === "Cons") {
                    if (v3._1._2._1._2.tag === "LytRoot") {
                      if (v3._1._2._2.tag === "Nil") { return v.range.start.column === v3._1._1._1.column; }
                      return false;
                    }
                    return false;
                  }
                  return false;
                }
                return false;
              }
              return false;
            })()
          ) {
            return Data$dTuple.$Tuple(v3._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v3._1)]))(v3._2)));
          }
          const $10 = insertSep(v3);
          const $11 = Data$dTuple.$Tuple($10._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $10._1)]))($10._2)));
          if ($11._1.tag === "Cons") {
            if (eqLayoutDelim.eq($11._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($11._1._2, $11._2); }
            return $11;
          }
          return $11;
        };
        if (v2._1.tag === "Cons") {
          if (v2._1._1._2.tag === "LytThen") {
            return Data$dTuple.$Tuple(v2._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(v2._2)));
          }
          return $9();
        }
        return $9();
      }
      const $8 = insertSep(collapse(lytPos => lyt => (
        lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
      ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
      const $9 = Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
      if ($9._1.tag === "Cons") {
        if (eqLayoutDelim.eq($9._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($9._1._2, $9._2); }
        return $9;
      }
      return $9;
    }
    if (v.value._2 === "do") { return insertKwProperty(insertStart(LytDo), Data$dTuple.$Tuple(stack, [])); }
    if (v.value._2 === "ado") { return insertKwProperty(insertStart(LytAdo), Data$dTuple.$Tuple(stack, [])); }
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
  }
  if (v.value.tag === "TokForall") {
    return insertKwProperty(v1 => Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytForall), v1._1), v1._2), Data$dTuple.$Tuple(stack, []));
  }
  if (v.value.tag === "TokBackslash") {
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple(
      Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytLambdaBinders), $8._1),
      Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2))
    );
  }
  if (v.value.tag === "TokRightArrow") {
    const $8 = collapse(v2 => v3 => {
      if (v3.tag === "LytDo") { return true; }
      if (v3.tag === "LytOf") { return false; }
      return (v3.tag === "LytLet" || (v3.tag === "LytLetStmt" || (v3.tag === "LytWhere" || (v3.tag === "LytOf" || (v3.tag === "LytDo" || v3.tag === "LytAdo"))))) && v.range.start.column <= v2.column;
    })(Data$dTuple.$Tuple(stack, []));
    if ($8._1.tag === "Cons") {
      if ($8._1._1._2.tag === "LytCaseBinders" || ($8._1._1._2.tag === "LytCaseGuard" || $8._1._1._2.tag === "LytLambdaBinders")) {
        return Data$dTuple.$Tuple($8._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2)]))($8._2)));
      }
      return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
    }
    return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
  }
  if (v.value.tag === "TokEquals") {
    const v2 = collapse(v2 => v3 => v3.tag === "LytWhere" || (v3.tag === "LytLet" || v3.tag === "LytLetStmt"))(Data$dTuple.$Tuple(stack, []));
    if (v2._1.tag === "Cons") {
      if (v2._1._1._2.tag === "LytDeclGuard") {
        return Data$dTuple.$Tuple(v2._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(v2._2)));
      }
      const $9 = insertSep(collapse(lytPos => lyt => (
        lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
      ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
      return Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
    }
    const $9 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
  }
  if (v.value.tag === "TokPipe") {
    const v2 = collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column <= lytPos.column)(Data$dTuple.$Tuple(stack, []));
    if (v2._1.tag === "Cons") {
      if (v2._1._1._2.tag === "LytOf") {
        return Data$dTuple.$Tuple(
          Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytCaseGuard), v2._1),
          Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
            Data$dTuple.$Tuple(v, Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytCaseGuard), v2._1))
          ]))(v2._2))
        );
      }
      if (v2._1._1._2.tag === "LytLet") {
        return Data$dTuple.$Tuple(
          Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytDeclGuard), v2._1),
          Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
            Data$dTuple.$Tuple(v, Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytDeclGuard), v2._1))
          ]))(v2._2))
        );
      }
      if (v2._1._1._2.tag === "LytLetStmt") {
        return Data$dTuple.$Tuple(
          Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytDeclGuard), v2._1),
          Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
            Data$dTuple.$Tuple(v, Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytDeclGuard), v2._1))
          ]))(v2._2))
        );
      }
      if (v2._1._1._2.tag === "LytWhere") {
        return Data$dTuple.$Tuple(
          Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytDeclGuard), v2._1),
          Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([
            Data$dTuple.$Tuple(v, Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytDeclGuard), v2._1))
          ]))(v2._2))
        );
      }
      const $9 = insertSep(collapse(lytPos => lyt => (
        lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
      ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
      return Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
    }
    const $9 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple($9._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2)));
  }
  if (v.value.tag === "TokTick") {
    const v2 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
    const $9 = () => {
      const $9 = insertSep(collapse(lytPos => lyt => (
        lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
      ) && v.range.start.column <= lytPos.column)(Data$dTuple.$Tuple(stack, [])));
      return Data$dTuple.$Tuple(
        Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytTick), $9._1),
        Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $9._1)]))($9._2))
      );
    };
    if (v2._1.tag === "Cons") {
      if (v2._1._1._2.tag === "LytTick") {
        return Data$dTuple.$Tuple(v2._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1._2)]))(v2._2)));
      }
      return $9();
    }
    return $9();
  }
  if (v.value.tag === "TokComma") {
    const v2 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
    if (v2._1.tag === "Cons") {
      if (v2._1._1._2.tag === "LytBrace") {
        return Data$dTuple.$Tuple(
          Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytProperty), v2._1),
          Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1)]))(v2._2))
        );
      }
      return Data$dTuple.$Tuple(v2._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1)]))(v2._2)));
    }
    return Data$dTuple.$Tuple(v2._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, v2._1)]))(v2._2)));
  }
  if (v.value.tag === "TokDot") {
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    const $9 = Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2));
    if ($8._1.tag === "Cons") {
      if ($8._1._1._2.tag === "LytForall") { return Data$dTuple.$Tuple($8._1._2, $9); }
      return Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytProperty), $8._1), $9);
    }
    return Data$dTuple.$Tuple(Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytProperty), $8._1), $9);
  }
  if (v.value.tag === "TokLeftParen") {
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple(
      Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytParen), $8._1),
      Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2))
    );
  }
  if (v.value.tag === "TokLeftBrace") {
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple(
      Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytProperty), Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytBrace), $8._1)),
      Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2))
    );
  }
  if (v.value.tag === "TokLeftSquare") {
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple(
      Data$dList$dTypes.$List("Cons", Data$dTuple.$Tuple(v.range.start, LytSquare), $8._1),
      Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2))
    );
  }
  if (v.value.tag === "TokRightParen") {
    const $8 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
    if ($8._1.tag === "Cons") {
      if (eqLayoutDelim.eq($8._1._1._2)(LytParen)) {
        return Data$dTuple.$Tuple($8._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2)]))($8._2)));
      }
      return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
    }
    return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
  }
  if (v.value.tag === "TokRightBrace") {
    const $8 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
    if ($8._1.tag === "Cons") {
      if (eqLayoutDelim.eq($8._1._1._2)(LytProperty)) {
        if ($8._1._2.tag === "Cons") {
          if (eqLayoutDelim.eq($8._1._2._1._2)(LytBrace)) {
            return Data$dTuple.$Tuple(
              $8._1._2._2,
              Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2._2)]))($8._2))
            );
          }
          return Data$dTuple.$Tuple($8._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2)]))($8._2)));
        }
        return Data$dTuple.$Tuple($8._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2)]))($8._2)));
      }
      if ($8._1.tag === "Cons") {
        if (eqLayoutDelim.eq($8._1._1._2)(LytBrace)) {
          return Data$dTuple.$Tuple($8._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2)]))($8._2)));
        }
        return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
      }
      return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
    }
    if ($8._1.tag === "Cons") {
      if (eqLayoutDelim.eq($8._1._1._2)(LytBrace)) {
        return Data$dTuple.$Tuple($8._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2)]))($8._2)));
      }
      return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
    }
    return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
  }
  if (v.value.tag === "TokRightSquare") {
    const $8 = collapse(v$1 => isIndented)(Data$dTuple.$Tuple(stack, []));
    if ($8._1.tag === "Cons") {
      if (eqLayoutDelim.eq($8._1._1._2)(LytSquare)) {
        return Data$dTuple.$Tuple($8._1._2, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1._2)]))($8._2)));
      }
      return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
    }
    return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
  }
  if (v.value.tag === "TokString") {
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    const $9 = Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
    if ($9._1.tag === "Cons") {
      if (eqLayoutDelim.eq($9._1._1._2)(LytProperty)) { return Data$dTuple.$Tuple($9._1._2, $9._2); }
      return $9;
    }
    return $9;
  }
  if (v.value.tag === "TokOperator") {
    const $8 = insertSep(collapse(lytPos => lyt => (
      lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
    ) && v.range.start.column <= lytPos.column)(Data$dTuple.$Tuple(stack, [])));
    return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
  }
  const $8 = insertSep(collapse(lytPos => lyt => (
    lyt.tag === "LytLet" || (lyt.tag === "LytLetStmt" || (lyt.tag === "LytWhere" || (lyt.tag === "LytOf" || (lyt.tag === "LytDo" || lyt.tag === "LytAdo"))))
  ) && v.range.start.column < lytPos.column)(Data$dTuple.$Tuple(stack, [])));
  return Data$dTuple.$Tuple($8._1, Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([Data$dTuple.$Tuple(v, $8._1)]))($8._2)));
};
const ordLayoutDelim = {
  compare: x => y => {
    if (x.tag === "LytRoot") {
      if (y.tag === "LytRoot") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytRoot") { return Data$dOrdering.GT; }
    if (x.tag === "LytTopDecl") {
      if (y.tag === "LytTopDecl") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytTopDecl") { return Data$dOrdering.GT; }
    if (x.tag === "LytTopDeclHead") {
      if (y.tag === "LytTopDeclHead") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytTopDeclHead") { return Data$dOrdering.GT; }
    if (x.tag === "LytDeclGuard") {
      if (y.tag === "LytDeclGuard") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytDeclGuard") { return Data$dOrdering.GT; }
    if (x.tag === "LytCase") {
      if (y.tag === "LytCase") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytCase") { return Data$dOrdering.GT; }
    if (x.tag === "LytCaseBinders") {
      if (y.tag === "LytCaseBinders") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytCaseBinders") { return Data$dOrdering.GT; }
    if (x.tag === "LytCaseGuard") {
      if (y.tag === "LytCaseGuard") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytCaseGuard") { return Data$dOrdering.GT; }
    if (x.tag === "LytLambdaBinders") {
      if (y.tag === "LytLambdaBinders") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytLambdaBinders") { return Data$dOrdering.GT; }
    if (x.tag === "LytParen") {
      if (y.tag === "LytParen") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytParen") { return Data$dOrdering.GT; }
    if (x.tag === "LytBrace") {
      if (y.tag === "LytBrace") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytBrace") { return Data$dOrdering.GT; }
    if (x.tag === "LytSquare") {
      if (y.tag === "LytSquare") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytSquare") { return Data$dOrdering.GT; }
    if (x.tag === "LytIf") {
      if (y.tag === "LytIf") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytIf") { return Data$dOrdering.GT; }
    if (x.tag === "LytThen") {
      if (y.tag === "LytThen") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytThen") { return Data$dOrdering.GT; }
    if (x.tag === "LytProperty") {
      if (y.tag === "LytProperty") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytProperty") { return Data$dOrdering.GT; }
    if (x.tag === "LytForall") {
      if (y.tag === "LytForall") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytForall") { return Data$dOrdering.GT; }
    if (x.tag === "LytTick") {
      if (y.tag === "LytTick") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytTick") { return Data$dOrdering.GT; }
    if (x.tag === "LytLet") {
      if (y.tag === "LytLet") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytLet") { return Data$dOrdering.GT; }
    if (x.tag === "LytLetStmt") {
      if (y.tag === "LytLetStmt") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytLetStmt") { return Data$dOrdering.GT; }
    if (x.tag === "LytWhere") {
      if (y.tag === "LytWhere") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytWhere") { return Data$dOrdering.GT; }
    if (x.tag === "LytOf") {
      if (y.tag === "LytOf") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytOf") { return Data$dOrdering.GT; }
    if (x.tag === "LytDo") {
      if (y.tag === "LytDo") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "LytDo") { return Data$dOrdering.GT; }
    if (x.tag === "LytAdo") {
      if (y.tag === "LytAdo") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqLayoutDelim
};
const currentIndent = /* #__PURE__ */ (() => {
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0;
      if (v.tag === "Cons") {
        if (
          v._1._2.tag === "LytLet" || (
            v._1._2.tag === "LytLetStmt" || (v._1._2.tag === "LytWhere" || (v._1._2.tag === "LytOf" || (v._1._2.tag === "LytDo" || v._1._2.tag === "LytAdo")))
          )
        ) {
          go$c = false;
          go$r = Data$dMaybe.$Maybe("Just", v._1._1);
          continue;
        }
        go$a0 = v._2;
        continue;
      }
      go$c = false;
      go$r = Data$dMaybe.Nothing;
      continue;
    };
    return go$r;
  };
  return go;
})();
export {
  $LayoutDelim,
  LytAdo,
  LytBrace,
  LytCase,
  LytCaseBinders,
  LytCaseGuard,
  LytDeclGuard,
  LytDo,
  LytForall,
  LytIf,
  LytLambdaBinders,
  LytLet,
  LytLetStmt,
  LytOf,
  LytParen,
  LytProperty,
  LytRoot,
  LytSquare,
  LytThen,
  LytTick,
  LytTopDecl,
  LytTopDeclHead,
  LytWhere,
  currentIndent,
  eqLayoutDelim,
  insertLayout,
  isIndented,
  lytToken,
  ordLayoutDelim
};
