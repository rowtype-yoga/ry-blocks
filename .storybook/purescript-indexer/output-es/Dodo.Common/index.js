import * as $runtime from "../runtime.js";
import * as Dodo from "../Dodo/index.js";
import * as Dodo$dInternal from "../Dodo.Internal/index.js";
const trailingComma = /* #__PURE__ */ (() => Dodo$dInternal.$Doc(
  "FlexAlt",
  Dodo$dInternal.$Doc("Text", 2, ", "),
  Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, ","))(Dodo$dInternal.Break)
))();
const pursSquares = /* #__PURE__ */ (() => {
  const $0 = Dodo.encloseEmptyAlt(Dodo$dInternal.$Doc("Text", 2, "[ "))(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 2, " ]"),
    Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.$Doc("Text", 1, "]"))
  ))(Dodo$dInternal.$Doc("Text", 2, "[]"));
  return x => Dodo.flexGroup($0(x));
})();
const pursParensExpr = x => Dodo.flexGroup(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, "("))(Dodo$dInternal.semigroupDoc.append((() => {
  if (x.tag === "Empty") { return Dodo$dInternal.Empty; }
  return Dodo$dInternal.$Doc("Indent", x);
})())(Dodo$dInternal.$Doc("Text", 1, ")"))));
const pursParens = /* #__PURE__ */ (() => {
  const $0 = Dodo.encloseEmptyAlt(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, "("), Dodo$dInternal.$Doc("Text", 2, "( ")))(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 1, ")"),
    Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.$Doc("Text", 1, ")"))
  ))(Dodo$dInternal.$Doc("Text", 2, "()"));
  return x => Dodo.flexGroup($0(x));
})();
const pursCurlies = /* #__PURE__ */ (() => {
  const $0 = Dodo.encloseEmptyAlt(Dodo$dInternal.$Doc("Text", 2, "{ "))(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 2, " }"),
    Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.$Doc("Text", 1, "}"))
  ))(Dodo$dInternal.$Doc("Text", 2, "{}"));
  return x => Dodo.flexGroup($0(x));
})();
const leadingComma = /* #__PURE__ */ (() => Dodo$dInternal.$Doc(
  "FlexAlt",
  Dodo$dInternal.$Doc("Text", 2, ", "),
  Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.$Doc("Text", 2, ", "))
))();
const jsSquares = /* #__PURE__ */ (() => {
  const $0 = Dodo.encloseEmptyAlt(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 1, "["),
    Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, "["))(Dodo$dInternal.Break)
  ))(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, "]"), Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.$Doc("Text", 1, "]"))))(Dodo$dInternal.$Doc(
    "Text",
    2,
    "[]"
  ));
  return x => Dodo.flexGroup($0((() => {
    if (x.tag === "Empty") { return Dodo$dInternal.Empty; }
    return Dodo$dInternal.$Doc("Indent", x);
  })()));
})();
const jsParens = /* #__PURE__ */ (() => {
  const $0 = Dodo.encloseEmptyAlt(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 1, "("),
    Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, "("))(Dodo$dInternal.Break)
  ))(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, ")"), Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.$Doc("Text", 1, ")"))))(Dodo$dInternal.$Doc(
    "Text",
    2,
    "()"
  ));
  return x => Dodo.flexGroup($0((() => {
    if (x.tag === "Empty") { return Dodo$dInternal.Empty; }
    return Dodo$dInternal.$Doc("Indent", x);
  })()));
})();
const jsCurlies = /* #__PURE__ */ (() => {
  const $0 = Dodo.encloseEmptyAlt(Dodo$dInternal.$Doc(
    "FlexAlt",
    Dodo$dInternal.$Doc("Text", 1, "{"),
    Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.$Doc("Text", 1, "{"))(Dodo$dInternal.Break)
  ))(Dodo$dInternal.$Doc("FlexAlt", Dodo$dInternal.$Doc("Text", 1, "}"), Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(Dodo$dInternal.$Doc("Text", 1, "}"))))(Dodo$dInternal.$Doc(
    "Text",
    2,
    "{}"
  ));
  return x => Dodo.flexGroup($0((() => {
    if (x.tag === "Empty") { return Dodo$dInternal.Empty; }
    return Dodo$dInternal.$Doc("Indent", x);
  })()));
})();
export {jsCurlies, jsParens, jsSquares, leadingComma, pursCurlies, pursParens, pursParensExpr, pursSquares, trailingComma};
