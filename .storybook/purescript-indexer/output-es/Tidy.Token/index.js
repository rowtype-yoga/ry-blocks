import * as $runtime from "../runtime.js";
const $UnicodeOption = tag => ({tag});
const UnicodeSource = /* #__PURE__ */ $UnicodeOption("UnicodeSource");
const UnicodeAlways = /* #__PURE__ */ $UnicodeOption("UnicodeAlways");
const UnicodeNever = /* #__PURE__ */ $UnicodeOption("UnicodeNever");
const printToken = option => v => {
  if (v.tag === "TokLeftParen") { return "("; }
  if (v.tag === "TokRightParen") { return ")"; }
  if (v.tag === "TokLeftBrace") { return "{"; }
  if (v.tag === "TokRightBrace") { return "}"; }
  if (v.tag === "TokLeftSquare") { return "["; }
  if (v.tag === "TokRightSquare") { return "]"; }
  if (v.tag === "TokLeftArrow") {
    if (option.tag === "UnicodeNever") { return "<-"; }
    if (option.tag === "UnicodeAlways") { return "←"; }
    if (option.tag === "UnicodeSource") {
      if (v._1.tag === "ASCII") { return "<-"; }
      if (v._1.tag === "Unicode") { return "←"; }
      $runtime.fail();
    }
    $runtime.fail();
  }
  if (v.tag === "TokRightArrow") {
    if (option.tag === "UnicodeNever") { return "->"; }
    if (option.tag === "UnicodeAlways") { return "→"; }
    if (option.tag === "UnicodeSource") {
      if (v._1.tag === "ASCII") { return "->"; }
      if (v._1.tag === "Unicode") { return "→"; }
      $runtime.fail();
    }
    $runtime.fail();
  }
  if (v.tag === "TokRightFatArrow") {
    if (option.tag === "UnicodeNever") { return "=>"; }
    if (option.tag === "UnicodeAlways") { return "⇒"; }
    if (option.tag === "UnicodeSource") {
      if (v._1.tag === "ASCII") { return "=>"; }
      if (v._1.tag === "Unicode") { return "⇒"; }
      $runtime.fail();
    }
    $runtime.fail();
  }
  if (v.tag === "TokDoubleColon") {
    if (option.tag === "UnicodeNever") { return "::"; }
    if (option.tag === "UnicodeAlways") { return "∷"; }
    if (option.tag === "UnicodeSource") {
      if (v._1.tag === "ASCII") { return "::"; }
      if (v._1.tag === "Unicode") { return "∷"; }
      $runtime.fail();
    }
    $runtime.fail();
  }
  if (v.tag === "TokForall") {
    if (option.tag === "UnicodeNever") { return "forall"; }
    if (option.tag === "UnicodeAlways") { return "∀"; }
    if (option.tag === "UnicodeSource") {
      if (v._1.tag === "ASCII") { return "forall"; }
      if (v._1.tag === "Unicode") { return "∀"; }
      $runtime.fail();
    }
    $runtime.fail();
  }
  if (v.tag === "TokEquals") { return "="; }
  if (v.tag === "TokPipe") { return "|"; }
  if (v.tag === "TokTick") { return "`"; }
  if (v.tag === "TokDot") { return "."; }
  if (v.tag === "TokComma") { return ","; }
  if (v.tag === "TokUnderscore") { return "_"; }
  if (v.tag === "TokBackslash") { return "\\"; }
  if (v.tag === "TokAt") { return "@"; }
  if (v.tag === "TokLowerName") {
    if (v._1.tag === "Nothing") { return v._2; }
    if (v._1.tag === "Just") { return v._1._1 + ("." + v._2); }
    $runtime.fail();
  }
  if (v.tag === "TokUpperName") {
    if (v._1.tag === "Nothing") { return v._2; }
    if (v._1.tag === "Just") { return v._1._1 + ("." + v._2); }
    $runtime.fail();
  }
  if (v.tag === "TokOperator") {
    if (v._1.tag === "Nothing") { return v._2; }
    if (v._1.tag === "Just") { return v._1._1 + ("." + v._2); }
    $runtime.fail();
  }
  if (v.tag === "TokSymbolName") {
    const $2 = "(" + (v._2 + ")");
    if (v._1.tag === "Nothing") { return $2; }
    if (v._1.tag === "Just") { return v._1._1 + ("." + $2); }
    $runtime.fail();
  }
  if (v.tag === "TokSymbolArrow") {
    if (option.tag === "UnicodeNever") { return "(->)"; }
    if (option.tag === "UnicodeAlways") { return "(→)"; }
    if (option.tag === "UnicodeSource") {
      if (v._1.tag === "ASCII") { return "(->)"; }
      if (v._1.tag === "Unicode") { return "(→)"; }
      $runtime.fail();
    }
    $runtime.fail();
  }
  if (v.tag === "TokHole") { return "?" + v._1; }
  if (v.tag === "TokChar") { return "'" + (v._1 + "'"); }
  if (v.tag === "TokString") { return "\"" + (v._1 + "\""); }
  if (v.tag === "TokRawString") { return "\"\"\"" + (v._1 + "\"\"\""); }
  if (v.tag === "TokInt") { return v._1; }
  if (v.tag === "TokNumber") { return v._1; }
  if (v.tag === "TokLayoutStart") { return ""; }
  if (v.tag === "TokLayoutSep") { return ""; }
  if (v.tag === "TokLayoutEnd") { return ""; }
  $runtime.fail();
};
const eqUnicodeOption = {
  eq: x => y => {
    if (x.tag === "UnicodeSource") { return y.tag === "UnicodeSource"; }
    if (x.tag === "UnicodeAlways") { return y.tag === "UnicodeAlways"; }
    if (x.tag === "UnicodeNever") { return y.tag === "UnicodeNever"; }
    return false;
  }
};
export {$UnicodeOption, UnicodeAlways, UnicodeNever, UnicodeSource, eqUnicodeOption, printToken};
