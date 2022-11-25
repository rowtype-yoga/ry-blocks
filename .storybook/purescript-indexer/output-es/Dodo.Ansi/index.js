// | This module provides functions printing with cascading ANSI styles.
// | ANSI annotations closer to the root will cascade down to child nodes,
// | where styles closer to the leaves take precedence. Indentation is
// | never printed with ANSI styles, only the text elements of the document.
import * as $runtime from "../runtime.js";
import * as Ansi$dCodes from "../Ansi.Codes/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Dodo from "../Dodo/index.js";
const AnsiBuffer = x => x;
const underline = /* #__PURE__ */ Dodo.annotate(/* #__PURE__ */ Ansi$dCodes.$GraphicsParam("PMode", Ansi$dCodes.Underline));
const strikethrough = /* #__PURE__ */ Dodo.annotate(/* #__PURE__ */ Ansi$dCodes.$GraphicsParam("PMode", Ansi$dCodes.Strikethrough));
const reset = /* #__PURE__ */ Dodo.annotate(Ansi$dCodes.Reset);
const italic = /* #__PURE__ */ Dodo.annotate(/* #__PURE__ */ Ansi$dCodes.$GraphicsParam("PMode", Ansi$dCodes.Italic));
const inverse = /* #__PURE__ */ Dodo.annotate(/* #__PURE__ */ Ansi$dCodes.$GraphicsParam("PMode", Ansi$dCodes.Inverse));
const foreground = color => Dodo.annotate(Ansi$dCodes.$GraphicsParam("PForeground", color));
const dim = /* #__PURE__ */ Dodo.annotate(/* #__PURE__ */ Ansi$dCodes.$GraphicsParam("PMode", Ansi$dCodes.Dim));
const bold = /* #__PURE__ */ Dodo.annotate(/* #__PURE__ */ Ansi$dCodes.$GraphicsParam("PMode", Ansi$dCodes.Bold));
const background = color => Dodo.annotate(Ansi$dCodes.$GraphicsParam("PBackground", color));
const ansiGraphics = /* #__PURE__ */ (() => {
  const resetCode = Ansi$dCodes.escapeCodeToString(Ansi$dCodes.$EscapeCode("Graphics", Data$dNonEmpty.$NonEmpty(Ansi$dCodes.Reset, Data$dList$dTypes.Nil)));
  const $1 = Data$dList.takeWhile(v => !Ansi$dCodes.eqGraphicsParam.eq(v)(Ansi$dCodes.Reset));
  const $2 = Data$dList.nubByEq(v => v1 => {
    if (v.tag === "Reset") { return v1.tag === "Reset"; }
    if (v.tag === "PForeground") { return v1.tag === "PForeground"; }
    if (v.tag === "PBackground") { return v1.tag === "PBackground"; }
    if (v.tag === "PMode") {
      if (v1.tag === "PMode") {
        if (v._1.tag === "Bold") { return v1._1.tag === "Bold"; }
        if (v._1.tag === "Dim") { return v1._1.tag === "Dim"; }
        if (v._1.tag === "Italic") { return v1._1.tag === "Italic"; }
        if (v._1.tag === "Underline") { return v1._1.tag === "Underline"; }
        if (v._1.tag === "Inverse") { return v1._1.tag === "Inverse"; }
        if (v._1.tag === "Strikethrough") { return v1._1.tag === "Strikethrough"; }
        return false;
      }
      return false;
    }
    return false;
  });
  return {
    emptyBuffer: {output: "", pending: Data$dMaybe.Nothing, current: Data$dList$dTypes.Nil, previous: Data$dList$dTypes.Nil},
    writeText: v => text => output => {
      if (output.pending.tag === "Nothing") { return {output: output.output + text, pending: output.pending, current: output.current, previous: Data$dList$dTypes.Nil}; }
      if (output.pending.tag === "Just") {
        return {
          output: output.output + Ansi$dCodes.escapeCodeToString(Ansi$dCodes.$EscapeCode("Graphics", output.pending._1)) + text,
          pending: Data$dMaybe.Nothing,
          current: output.current,
          previous: Data$dList$dTypes.Nil
        };
      }
      $runtime.fail();
    },
    writeIndent: v => text => v1 => ({output: v1.output + text, pending: v1.pending, current: v1.current, previous: v1.previous}),
    writeBreak: v => {
      const pending = (() => {
        if (v.current.tag === "Nil") { return Data$dMaybe.Nothing; }
        if (v.current.tag === "Cons") {
          return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(Ansi$dCodes.Reset, Data$dList$dTypes.$List("Cons", v.current._1, v.current._2)));
        }
        $runtime.fail();
      })();
      return {
        output: (() => {
          if (
            (() => {
              if (pending.tag === "Nothing") { return true; }
              if (pending.tag === "Just") { return false; }
              $runtime.fail();
            })() && v.previous.tag === "Nil"
          ) {
            return v.output + "\n";
          }
          return v.output + (resetCode + "\n");
        })(),
        pending: pending,
        current: v.current,
        previous: v.previous
      };
    },
    enterAnnotation: a => as => v => {
      const current = Data$dList.reverse($2($1(Data$dList$dTypes.$List("Cons", a, as))));
      return {
        output: v.output,
        pending: (() => {
          if (current.tag === "Nil") { return Data$dMaybe.Nothing; }
          if (current.tag === "Cons") { return Data$dMaybe.$Maybe("Just", Data$dNonEmpty.$NonEmpty(Ansi$dCodes.Reset, Data$dList$dTypes.$List("Cons", current._1, current._2))); }
          $runtime.fail();
        })(),
        current: current,
        previous: v.current
      };
    },
    leaveAnnotation: v => as => v1 => {
      const current = Data$dList.reverse($2($1(as)));
      return {
        output: v1.output,
        pending: Data$dMaybe.$Maybe(
          "Just",
          (() => {
            if (current.tag === "Nil") { return Data$dNonEmpty.$NonEmpty(Ansi$dCodes.Reset, Data$dList$dTypes.Nil); }
            if (current.tag === "Cons") { return Data$dNonEmpty.$NonEmpty(Ansi$dCodes.Reset, Data$dList$dTypes.$List("Cons", current._1, current._2)); }
            $runtime.fail();
          })()
        ),
        current: current,
        previous: v1.current
      };
    },
    flushBuffer: ansiBuffer => {
      if (ansiBuffer.pending.tag === "Nothing") { return ansiBuffer.output; }
      if (ansiBuffer.pending.tag === "Just") { return ansiBuffer.output + Ansi$dCodes.escapeCodeToString(Ansi$dCodes.$EscapeCode("Graphics", ansiBuffer.pending._1)); }
      $runtime.fail();
    }
  };
})();
export {AnsiBuffer, ansiGraphics, background, bold, dim, foreground, inverse, italic, reset, strikethrough, underline};
