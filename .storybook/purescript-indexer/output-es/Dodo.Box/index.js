import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dNumber from "../Data.Number/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Dodo$dInternal from "../Dodo.Internal/index.js";
import * as Partial from "../Partial/index.js";
const $Align = tag => ({tag});
const $DocBox = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $DocBoxStep = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $DocBuildCmd = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const $DocBuildSize = (tag, _1) => ({tag, _1});
const $DocBuildStk = (tag, _1, _2, _3, _4) => ({tag, _1, _2, _3, _4});
const $DocLine = (tag, _1, _2) => ({tag, _1, _2});
const $DocResumeCmd = (tag, _1) => ({tag, _1});
const $DocResumeStk = (tag, _1, _2, _3) => ({tag, _1, _2, _3});
const max = x => y => {
  const v = Data$dOrd.ordInt.compare(x)(y);
  if (v.tag === "LT") { return y; }
  if (v.tag === "EQ") { return x; }
  if (v.tag === "GT") { return x; }
  $runtime.fail();
};
const power = /* #__PURE__ */ Data$dMonoid.power(Dodo$dInternal.monoidDoc);
const LinePad = value0 => $DocLine("LinePad", value0);
const LineDoc = value0 => $DocLine("LineDoc", value0);
const LineAppend = value0 => value1 => $DocLine("LineAppend", value0, value1);
const FullHeight = value0 => $DocBuildSize("FullHeight", value0);
const FullWidth = value0 => $DocBuildSize("FullWidth", value0);
const AsIs = /* #__PURE__ */ $DocBuildSize("AsIs");
const StpDone = /* #__PURE__ */ $DocBoxStep("StpDone");
const StpLine = value0 => value1 => $DocBoxStep("StpLine", value0, value1);
const StpPad = value0 => value1 => value2 => $DocBoxStep("StpPad", value0, value1, value2);
const StpHorz = value0 => value1 => value2 => $DocBoxStep("StpHorz", value0, value1, value2);
const ResumeEnter = value0 => $DocResumeCmd("ResumeEnter", value0);
const ResumeLeave = value0 => $DocResumeCmd("ResumeLeave", value0);
const ResumeHorzR = value0 => value1 => value2 => $DocResumeStk("ResumeHorzR", value0, value1, value2);
const ResumeHorzH = value0 => value1 => value2 => $DocResumeStk("ResumeHorzH", value0, value1, value2);
const ResumeNil = /* #__PURE__ */ $DocResumeStk("ResumeNil");
const Start = /* #__PURE__ */ $Align("Start");
const Middle = /* #__PURE__ */ $Align("Middle");
const End = /* #__PURE__ */ $Align("End");
const DocLine = value0 => value1 => $DocBox("DocLine", value0, value1);
const DocVApp = value0 => value1 => value2 => $DocBox("DocVApp", value0, value1, value2);
const DocHApp = value0 => value1 => value2 => $DocBox("DocHApp", value0, value1, value2);
const DocAlign = value0 => value1 => value2 => $DocBox("DocAlign", value0, value1, value2);
const DocPad = value0 => $DocBox("DocPad", value0);
const DocEmpty = /* #__PURE__ */ $DocBox("DocEmpty");
const BuildEnter = value0 => value1 => value2 => $DocBuildCmd("BuildEnter", value0, value1, value2);
const BuildLeave = value0 => $DocBuildCmd("BuildLeave", value0);
const BuildVAppR = value0 => value1 => value2 => $DocBuildStk("BuildVAppR", value0, value1, value2);
const BuildHAppR = value0 => value1 => value2 => value3 => $DocBuildStk("BuildHAppR", value0, value1, value2, value3);
const BuildHAppH = value0 => value1 => value2 => $DocBuildStk("BuildHAppH", value0, value1, value2);
const BuildNil = /* #__PURE__ */ $DocBuildStk("BuildNil");
const Horizontal = x => x;
const Vertical = x => x;
const newtypeVertical_ = {Coercible0: () => undefined};
const newtypeHorizontal_ = {Coercible0: () => undefined};
const functorDocBox = {
  map: f => m => {
    if (m.tag === "DocLine") { return $DocBox("DocLine", Dodo$dInternal.functorDoc.map(f)(m._1), m._2); }
    if (m.tag === "DocVApp") { return $DocBox("DocVApp", functorDocBox.map(f)(m._1), functorDocBox.map(f)(m._2), m._3); }
    if (m.tag === "DocHApp") { return $DocBox("DocHApp", functorDocBox.map(f)(m._1), functorDocBox.map(f)(m._2), m._3); }
    if (m.tag === "DocAlign") { return $DocBox("DocAlign", m._1, m._2, functorDocBox.map(f)(m._3)); }
    if (m.tag === "DocPad") { return $DocBox("DocPad", m._1); }
    if (m.tag === "DocEmpty") { return DocEmpty; }
    $runtime.fail();
  }
};
const functorHorizontal = functorDocBox;
const functorVertical = functorDocBox;
const eqAlign = {
  eq: x => y => {
    if (x.tag === "Start") { return y.tag === "Start"; }
    if (x.tag === "Middle") { return y.tag === "Middle"; }
    if (x.tag === "End") { return y.tag === "End"; }
    return false;
  }
};
const vpadding = height => {
  if (height <= 0) { return DocEmpty; }
  return $DocBox("DocPad", {height: height, width: 0});
};
const valign = a => v => {
  if (v.tag === "DocAlign") {
    if (a.tag === "Start") {
      if (v._2.tag === "Start") { return v._3; }
      if (v.tag === "DocAlign") { return $DocBox("DocAlign", a, v._2, v._3); }
      return $DocBox("DocAlign", a, Start, v);
    }
    if (v.tag === "DocAlign") { return $DocBox("DocAlign", a, v._2, v._3); }
    return $DocBox("DocAlign", a, Start, v);
  }
  if (v.tag === "DocAlign") { return $DocBox("DocAlign", a, v._2, v._3); }
  return $DocBox("DocAlign", a, Start, v);
};
const sizeOf = sizeOf$a0$copy => {
  let sizeOf$a0 = sizeOf$a0$copy, sizeOf$c = true, sizeOf$r;
  while (sizeOf$c) {
    const v = sizeOf$a0;
    if (v.tag === "DocLine") {
      sizeOf$c = false;
      sizeOf$r = {width: v._2, height: 1};
      continue;
    }
    if (v.tag === "DocVApp") {
      sizeOf$c = false;
      sizeOf$r = v._3;
      continue;
    }
    if (v.tag === "DocHApp") {
      sizeOf$c = false;
      sizeOf$r = v._3;
      continue;
    }
    if (v.tag === "DocAlign") {
      sizeOf$a0 = v._3;
      continue;
    }
    if (v.tag === "DocPad") {
      sizeOf$c = false;
      sizeOf$r = v._1;
      continue;
    }
    if (v.tag === "DocEmpty") {
      sizeOf$c = false;
      sizeOf$r = {width: 0, height: 0};
      continue;
    }
    $runtime.fail();
  };
  return sizeOf$r;
};
const vappend = v => v1 => {
  if (v.tag === "DocEmpty") { return v1; }
  if (v1.tag === "DocEmpty") { return v; }
  if (v.tag === "DocPad") {
    if (v1.tag === "DocPad") { return $DocBox("DocPad", {width: max(v._1.width)(v1._1.width), height: v._1.height + v1._1.height | 0}); }
    return $DocBox(
      "DocVApp",
      v,
      v1,
      (() => {
        const $2 = sizeOf(v);
        const $3 = sizeOf(v1);
        return {width: max($2.width)($3.width), height: $2.height + $3.height | 0};
      })()
    );
  }
  return $DocBox(
    "DocVApp",
    v,
    v1,
    (() => {
      const $2 = sizeOf(v);
      const $3 = sizeOf(v1);
      return {width: max($2.width)($3.width), height: $2.height + $3.height | 0};
    })()
  );
};
const vertical = dictFoldable => dictFoldable.foldr(vappend)(DocEmpty);
const semigroupVertical = {append: vappend};
const monoidVertical = {mempty: DocEmpty, Semigroup0: () => semigroupVertical};
const power1 = /* #__PURE__ */ Data$dMonoid.power(monoidVertical);
const resume = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const cmd = go$a0, stack = go$a1;
      if (cmd.tag === "ResumeEnter") {
        if (cmd._1.tag === "StpDone") {
          go$a0 = $DocResumeCmd("ResumeLeave", Data$dMaybe.Nothing);
          go$a1 = stack;
          continue;
        }
        if (cmd._1.tag === "StpLine") {
          go$a0 = $DocResumeCmd("ResumeLeave", Data$dMaybe.$Maybe("Just", {line: $DocLine("LineDoc", cmd._1._1), next: cmd._1._2}));
          go$a1 = stack;
          continue;
        }
        if (cmd._1.tag === "StpPad") {
          if (cmd._1._2 === 0) {
            go$a0 = $DocResumeCmd("ResumeEnter", cmd._1._3);
            go$a1 = stack;
            continue;
          }
          go$a0 = $DocResumeCmd(
            "ResumeLeave",
            Data$dMaybe.$Maybe("Just", {line: $DocLine("LinePad", cmd._1._1), next: $DocBoxStep("StpPad", cmd._1._1, cmd._1._2 - 1 | 0, cmd._1._3)})
          );
          go$a1 = stack;
          continue;
        }
        if (cmd._1.tag === "StpHorz") {
          go$a0 = $DocResumeCmd("ResumeEnter", cmd._1._2);
          go$a1 = $DocResumeStk("ResumeHorzR", cmd._1._1, cmd._1._3, stack);
          continue;
        }
        $runtime.fail();
      }
      if (cmd.tag === "ResumeLeave") {
        if (stack.tag === "ResumeHorzR") {
          go$a0 = $DocResumeCmd("ResumeEnter", stack._1);
          go$a1 = $DocResumeStk("ResumeHorzH", cmd._1, stack._2, stack._3);
          continue;
        }
        if (stack.tag === "ResumeHorzH") {
          if (cmd._1.tag === "Just") {
            if (stack._1.tag === "Just") {
              go$a0 = $DocResumeCmd(
                "ResumeLeave",
                Data$dMaybe.$Maybe(
                  "Just",
                  {line: $DocLine("LineAppend", cmd._1._1.line, stack._1._1.line), next: $DocBoxStep("StpHorz", cmd._1._1.next, stack._1._1.next, stack._2)}
                )
              );
              go$a1 = stack._3;
              continue;
            }
            go$a0 = $DocResumeCmd("ResumeEnter", stack._2);
            go$a1 = stack._3;
            continue;
          }
          go$a0 = $DocResumeCmd("ResumeEnter", stack._2);
          go$a1 = stack._3;
          continue;
        }
        if (stack.tag === "ResumeNil") {
          go$c = false;
          go$r = cmd._1;
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return go$r;
  };
  return x => go($DocResumeCmd("ResumeEnter", x))(ResumeNil);
})();
const padWithAlign = appendFn => paddingFn => padWidth => doc => v => {
  if (v.tag === "Start") { return appendFn(doc)(paddingFn(padWidth)); }
  if (v.tag === "Middle") {
    const mid = Data$dInt.toNumber(padWidth) / 2.0;
    return appendFn(appendFn(paddingFn(Data$dInt.unsafeClamp(Data$dNumber.floor(mid))))(doc))(paddingFn(Data$dInt.unsafeClamp(Data$dNumber.ceil(mid))));
  }
  if (v.tag === "End") { return appendFn(paddingFn(padWidth))(doc); }
  $runtime.fail();
};
const isEmpty = v => v.tag === "DocEmpty";
const hpadding = width => {
  if (width <= 0) { return DocEmpty; }
  return $DocBox("DocPad", {height: 1, width: width});
};
const happend = v => v1 => {
  if (v.tag === "DocEmpty") { return v1; }
  if (v1.tag === "DocEmpty") { return v; }
  if (v.tag === "DocPad") {
    if (v1.tag === "DocPad") { return $DocBox("DocPad", {width: v._1.width + v1._1.width | 0, height: max(v._1.height)(v1._1.height)}); }
    return $DocBox(
      "DocHApp",
      v,
      v1,
      (() => {
        const $2 = sizeOf(v);
        const $3 = sizeOf(v1);
        return {width: $2.width + $3.width | 0, height: max($2.height)($3.height)};
      })()
    );
  }
  return $DocBox(
    "DocHApp",
    v,
    v1,
    (() => {
      const $2 = sizeOf(v);
      const $3 = sizeOf(v1);
      return {width: $2.width + $3.width | 0, height: max($2.height)($3.height)};
    })()
  );
};
const horizontal = dictFoldable => dictFoldable.foldr(happend)(DocEmpty);
const horizontalWithAlign = dictFoldable => align => dictFoldable.foldr(a => b => happend(valign(align)(a))(b))(DocEmpty);
const semigroupHorizontal = {append: happend};
const monoidHorizontal = {mempty: DocEmpty, Semigroup0: () => semigroupHorizontal};
const halign = b => v => {
  if (v.tag === "DocAlign") {
    if (v._1.tag === "Start") {
      if (b.tag === "Start") { return v._3; }
      if (v.tag === "DocAlign") { return $DocBox("DocAlign", v._1, b, v._3); }
      return $DocBox("DocAlign", Start, b, v);
    }
    if (v.tag === "DocAlign") { return $DocBox("DocAlign", v._1, b, v._3); }
    return $DocBox("DocAlign", Start, b, v);
  }
  if (v.tag === "DocAlign") { return $DocBox("DocAlign", v._1, b, v._3); }
  return $DocBox("DocAlign", Start, b, v);
};
const resize = newSize => box => {
  const size = sizeOf(box);
  const vpad = newSize.height - size.height | 0;
  const hpad = newSize.width - size.width | 0;
  const box$p = (() => {
    if (box.tag === "DocAlign") { return box._3; }
    return box;
  })();
  const hdoc = (() => {
    if (hpad <= 0) { return valign(Start)(box$p); }
    return padWithAlign(happend)(hpadding)(hpad)(box)((() => {
      if (box.tag === "DocAlign") { return box._2; }
      return Start;
    })());
  })();
  if (vpad <= 0) { return halign(Start)(hdoc); }
  return padWithAlign(vappend)(vpadding)(vpad)(hdoc)((() => {
    if (box.tag === "DocAlign") { return box._1; }
    return Start;
  })());
};
const verticalWithAlign = dictFoldable => align => dictFoldable.foldr(a => b => vappend(halign(align)(a))(b))(DocEmpty);
const formatLine = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const acc = go$a0, v = go$a1;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = acc;
        continue;
      }
      if (v.tag === "Cons") {
        if (v._1.tag === "LinePad") {
          if (acc.tag === "Empty") {
            go$a0 = acc;
            go$a1 = v._2;
            continue;
          }
          go$a0 = Dodo$dInternal.semigroupDoc.append(power(Dodo$dInternal.$Doc("Text", 1, " "))(v._1._1))(acc);
          go$a1 = v._2;
          continue;
        }
        if (v._1.tag === "LineDoc") {
          go$a0 = Dodo$dInternal.semigroupDoc.append(v._1._1)(acc);
          go$a1 = v._2;
          continue;
        }
        if (v._1.tag === "LineAppend") {
          go$a0 = acc;
          go$a1 = Data$dList$dTypes.$List("Cons", v._1._2, Data$dList$dTypes.$List("Cons", v._1._1, v._2));
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return go$r;
  };
  const $1 = go(Dodo$dInternal.Empty);
  return x => $1(Data$dList$dTypes.$List("Cons", x, Data$dList$dTypes.Nil));
})();
const fill = ch => v => power1((() => {
  if (ch.tag === "Annotate") {
    return $DocBox(
      "DocLine",
      (() => {
        const $2 = Dodo$dInternal.Annotate(ch._1);
        const $3 = power(ch._2)(v.width);
        if ($3.tag === "Empty") { return Dodo$dInternal.Empty; }
        return $2($3);
      })(),
      v.width
    );
  }
  return $DocBox("DocLine", power(ch)(v.width), v.width);
})())(v.height);
const empty = DocEmpty;
const docBox = /* #__PURE__ */ (() => {
  const stkToDoc = (() => {
    const go = go$a0$copy => go$a1$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
      while (go$c) {
        const b = go$a0, v = go$a1;
        if (v.tag === "Nil") {
          go$c = false;
          go$r = b;
          continue;
        }
        if (v.tag === "Cons") {
          go$a0 = (() => {
            if (v._1.tag === "Left") {
              const $3 = Dodo$dInternal.Annotate(v._1._1);
              if (b.tag === "Empty") { return Dodo$dInternal.Empty; }
              return $3(b);
            }
            if (v._1.tag === "Right") { return Dodo$dInternal.semigroupDoc.append(v._1._1)(b); }
            $runtime.fail();
          })();
          go$a1 = v._2;
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return go(Dodo$dInternal.Empty);
  })();
  return {
    emptyBuffer: {currentIndent: Dodo$dInternal.Empty, currentLine: Data$dList$dTypes.Nil, currentWidth: 0, lines: DocEmpty},
    writeText: width => text => v => (
      {
        currentIndent: v.currentIndent,
        currentLine: (() => {
          if (v.currentLine.tag === "Cons") {
            if (v.currentLine._1.tag === "Right") {
              return Data$dList$dTypes.$List(
                "Cons",
                Data$dEither.$Either("Right", Dodo$dInternal.semigroupDoc.append(v.currentLine._1._1)(Dodo$dInternal.$Doc("Text", width, text))),
                v.currentLine._2
              );
            }
            return Data$dList$dTypes.$List("Cons", Data$dEither.$Either("Right", Dodo$dInternal.$Doc("Text", width, text)), v.currentLine);
          }
          return Data$dList$dTypes.$List("Cons", Data$dEither.$Either("Right", Dodo$dInternal.$Doc("Text", width, text)), v.currentLine);
        })(),
        currentWidth: v.currentWidth + width | 0,
        lines: v.lines
      }
    ),
    writeIndent: width => text => v => (
      {
        currentIndent: Dodo$dInternal.semigroupDoc.append(v.currentIndent)(Dodo$dInternal.$Doc("Text", width, text)),
        currentLine: v.currentLine,
        currentWidth: v.currentWidth + width | 0,
        lines: v.lines
      }
    ),
    writeBreak: v => (
      {
        currentIndent: Dodo$dInternal.Empty,
        currentLine: Data$dList.filter(Data$dEither.isLeft)(v.currentLine),
        currentWidth: 0,
        lines: vappend(v.lines)($DocBox("DocLine", Dodo$dInternal.semigroupDoc.append(v.currentIndent)(stkToDoc(v.currentLine)), v.currentWidth))
      }
    ),
    enterAnnotation: ann => v => v1 => (
      {
        currentIndent: v1.currentIndent,
        currentLine: Data$dList$dTypes.$List("Cons", Data$dEither.$Either("Left", ann), v1.currentLine),
        currentWidth: v1.currentWidth,
        lines: v1.lines
      }
    ),
    leaveAnnotation: v => v1 => v2 => (
      {
        currentIndent: v2.currentIndent,
        currentLine: (() => {
          if (v2.currentLine.tag === "Cons") {
            if (v2.currentLine._2.tag === "Cons") {
              if (v2.currentLine._2._1.tag === "Left") {
                if (v2.currentLine._1.tag === "Right") {
                  return Data$dList$dTypes.$List(
                    "Cons",
                    Data$dEither.$Either(
                      "Right",
                      (() => {
                        const $4 = Dodo$dInternal.Annotate(v2.currentLine._2._1._1);
                        if (v2.currentLine._1._1.tag === "Empty") { return Dodo$dInternal.Empty; }
                        return $4(v2.currentLine._1._1);
                      })()
                    ),
                    v2.currentLine._2._2
                  );
                }
                if (v2.currentLine._1.tag === "Left") { return v2.currentLine._2; }
                return Partial._crashWith("leaveAnnotation: docs and annotations must be interleaved");
              }
              if (v2.currentLine._1.tag === "Left") { return v2.currentLine._2; }
              return Partial._crashWith("leaveAnnotation: docs and annotations must be interleaved");
            }
            if (v2.currentLine._1.tag === "Left") { return v2.currentLine._2; }
            return Partial._crashWith("leaveAnnotation: docs and annotations must be interleaved");
          }
          return Partial._crashWith("leaveAnnotation: docs and annotations must be interleaved");
        })(),
        currentWidth: v2.currentWidth,
        lines: v2.lines
      }
    ),
    flushBuffer: v => {
      if (v.lines.tag === "DocEmpty" && v.currentLine.tag === "Nil") { return DocEmpty; }
      return vappend(v.lines)($DocBox("DocLine", Dodo$dInternal.semigroupDoc.append(v.currentIndent)(stkToDoc(v.currentLine)), v.currentWidth));
    }
  };
})();
const build = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const cmd = go$a0, stack = go$a1;
      if (cmd.tag === "BuildEnter") {
        if (cmd._1.tag === "FullHeight") {
          if (cmd._3.tag === "DocHApp") {
            go$a0 = $DocBuildCmd("BuildEnter", cmd._1, StpDone, cmd._3._2);
            go$a1 = $DocBuildStk("BuildHAppR", cmd._1._1, cmd._3._1, cmd._2, stack);
            continue;
          }
          go$a0 = $DocBuildCmd("BuildEnter", AsIs, cmd._2, resize({width: 0, height: cmd._1._1})(cmd._3));
          go$a1 = stack;
          continue;
        }
        if (cmd._1.tag === "FullWidth") {
          if (cmd._3.tag === "DocVApp") {
            go$a0 = $DocBuildCmd("BuildEnter", cmd._1, cmd._2, cmd._3._2);
            go$a1 = $DocBuildStk("BuildVAppR", cmd._1._1, cmd._3._1, stack);
            continue;
          }
          go$a0 = $DocBuildCmd("BuildEnter", AsIs, cmd._2, resize({width: cmd._1._1, height: 0})(cmd._3));
          go$a1 = stack;
          continue;
        }
        if (cmd._1.tag === "AsIs") {
          if (cmd._3.tag === "DocVApp") {
            go$a0 = $DocBuildCmd("BuildEnter", $DocBuildSize("FullWidth", cmd._3._3.width), cmd._2, cmd._3._2);
            go$a1 = $DocBuildStk("BuildVAppR", cmd._3._3.width, cmd._3._1, stack);
            continue;
          }
          if (cmd._3.tag === "DocHApp") {
            go$a0 = $DocBuildCmd("BuildEnter", $DocBuildSize("FullHeight", cmd._3._3.height), StpDone, cmd._3._2);
            go$a1 = $DocBuildStk("BuildHAppR", cmd._3._3.height, cmd._3._1, cmd._2, stack);
            continue;
          }
          if (cmd._3.tag === "DocAlign") {
            go$a0 = $DocBuildCmd("BuildEnter", cmd._1, cmd._2, cmd._3._3);
            go$a1 = stack;
            continue;
          }
          if (cmd._3.tag === "DocLine") {
            go$a0 = $DocBuildCmd("BuildLeave", $DocBoxStep("StpLine", cmd._3._1, cmd._2));
            go$a1 = stack;
            continue;
          }
          if (cmd._3.tag === "DocPad") {
            go$a0 = $DocBuildCmd("BuildLeave", $DocBoxStep("StpPad", cmd._3._1.width, cmd._3._1.height, cmd._2));
            go$a1 = stack;
            continue;
          }
          if (cmd._3.tag === "DocEmpty") {
            go$a0 = $DocBuildCmd("BuildLeave", StpDone);
            go$a1 = stack;
            continue;
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      if (cmd.tag === "BuildLeave") {
        if (stack.tag === "BuildVAppR") {
          go$a0 = $DocBuildCmd("BuildEnter", $DocBuildSize("FullWidth", stack._1), cmd._1, stack._2);
          go$a1 = stack._3;
          continue;
        }
        if (stack.tag === "BuildHAppR") {
          go$a0 = $DocBuildCmd("BuildEnter", $DocBuildSize("FullHeight", stack._1), StpDone, stack._2);
          go$a1 = $DocBuildStk("BuildHAppH", cmd._1, stack._3, stack._4);
          continue;
        }
        if (stack.tag === "BuildHAppH") {
          go$a0 = $DocBuildCmd("BuildLeave", $DocBoxStep("StpHorz", cmd._1, stack._1, stack._2));
          go$a1 = stack._3;
          continue;
        }
        if (stack.tag === "BuildNil") {
          go$c = false;
          go$r = cmd._1;
          continue;
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
    return go$r;
  };
  return size => next => box => go($DocBuildCmd("BuildEnter", size, next, box))(BuildNil);
})();
const toDoc = /* #__PURE__ */ (() => {
  const go2 = go2$a0$copy => go2$a1$copy => {
    let go2$a0 = go2$a0$copy, go2$a1 = go2$a1$copy, go2$c = true, go2$r;
    while (go2$c) {
      const acc = go2$a0, v = go2$a1;
      if (v.tag === "Nothing") {
        go2$c = false;
        go2$r = acc;
        continue;
      }
      if (v.tag === "Just") {
        go2$a0 = Dodo$dInternal.semigroupDoc.append(acc)(Dodo$dInternal.semigroupDoc.append(Dodo$dInternal.Break)(formatLine(v._1.line)));
        go2$a1 = resume(v._1.next);
        continue;
      }
      $runtime.fail();
    };
    return go2$r;
  };
  const $1 = build(AsIs)(StpDone);
  return x => {
    const $3 = resume($1(x));
    if ($3.tag === "Nothing") { return Dodo$dInternal.Empty; }
    if ($3.tag === "Just") { return go2(formatLine($3._1.line))(resume($3._1.next)); }
    $runtime.fail();
  };
})();
export {
  $Align,
  $DocBox,
  $DocBoxStep,
  $DocBuildCmd,
  $DocBuildSize,
  $DocBuildStk,
  $DocLine,
  $DocResumeCmd,
  $DocResumeStk,
  AsIs,
  BuildEnter,
  BuildHAppH,
  BuildHAppR,
  BuildLeave,
  BuildNil,
  BuildVAppR,
  DocAlign,
  DocEmpty,
  DocHApp,
  DocLine,
  DocPad,
  DocVApp,
  End,
  FullHeight,
  FullWidth,
  Horizontal,
  LineAppend,
  LineDoc,
  LinePad,
  Middle,
  ResumeEnter,
  ResumeHorzH,
  ResumeHorzR,
  ResumeLeave,
  ResumeNil,
  Start,
  StpDone,
  StpHorz,
  StpLine,
  StpPad,
  Vertical,
  build,
  docBox,
  empty,
  eqAlign,
  fill,
  formatLine,
  functorDocBox,
  functorHorizontal,
  functorVertical,
  halign,
  happend,
  horizontal,
  horizontalWithAlign,
  hpadding,
  isEmpty,
  max,
  monoidHorizontal,
  monoidVertical,
  newtypeHorizontal_,
  newtypeVertical_,
  padWithAlign,
  power,
  power1,
  resize,
  resume,
  semigroupHorizontal,
  semigroupVertical,
  sizeOf,
  toDoc,
  valign,
  vappend,
  vertical,
  verticalWithAlign,
  vpadding
};
