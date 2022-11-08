// | This module defines a data type representing ANSI escape codes, as well as
// | functions for serialising them as Strings.
import * as $runtime from "../runtime.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dShow$dGeneric from "../Data.Show.Generic/index.js";
const $Color = tag => ({tag});
const $EraseParam = tag => ({tag});
const $EscapeCode = (tag, _1, _2) => ({tag, _1, _2});
const $GraphicsParam = (tag, _1) => ({tag, _1});
const $RenderingMode = tag => ({tag});
const genericShowArgsArgument = {genericShowArgs: v => [Data$dShow.showIntImpl(v)]};
const Bold = /* #__PURE__ */ $RenderingMode("Bold");
const Dim = /* #__PURE__ */ $RenderingMode("Dim");
const Italic = /* #__PURE__ */ $RenderingMode("Italic");
const Underline = /* #__PURE__ */ $RenderingMode("Underline");
const Inverse = /* #__PURE__ */ $RenderingMode("Inverse");
const Strikethrough = /* #__PURE__ */ $RenderingMode("Strikethrough");
const ToEnd = /* #__PURE__ */ $EraseParam("ToEnd");
const FromBeginning = /* #__PURE__ */ $EraseParam("FromBeginning");
const Entire = /* #__PURE__ */ $EraseParam("Entire");
const Black = /* #__PURE__ */ $Color("Black");
const Red = /* #__PURE__ */ $Color("Red");
const Green = /* #__PURE__ */ $Color("Green");
const Yellow = /* #__PURE__ */ $Color("Yellow");
const Blue = /* #__PURE__ */ $Color("Blue");
const Magenta = /* #__PURE__ */ $Color("Magenta");
const Cyan = /* #__PURE__ */ $Color("Cyan");
const White = /* #__PURE__ */ $Color("White");
const BrightBlack = /* #__PURE__ */ $Color("BrightBlack");
const BrightRed = /* #__PURE__ */ $Color("BrightRed");
const BrightGreen = /* #__PURE__ */ $Color("BrightGreen");
const BrightYellow = /* #__PURE__ */ $Color("BrightYellow");
const BrightBlue = /* #__PURE__ */ $Color("BrightBlue");
const BrightMagenta = /* #__PURE__ */ $Color("BrightMagenta");
const BrightCyan = /* #__PURE__ */ $Color("BrightCyan");
const BrightWhite = /* #__PURE__ */ $Color("BrightWhite");
const Reset = /* #__PURE__ */ $GraphicsParam("Reset");
const PMode = value0 => $GraphicsParam("PMode", value0);
const PForeground = value0 => $GraphicsParam("PForeground", value0);
const PBackground = value0 => $GraphicsParam("PBackground", value0);
const Up = value0 => $EscapeCode("Up", value0);
const Down = value0 => $EscapeCode("Down", value0);
const Forward = value0 => $EscapeCode("Forward", value0);
const Back = value0 => $EscapeCode("Back", value0);
const NextLine = value0 => $EscapeCode("NextLine", value0);
const PreviousLine = value0 => $EscapeCode("PreviousLine", value0);
const HorizontalAbsolute = value0 => $EscapeCode("HorizontalAbsolute", value0);
const Position = value0 => value1 => $EscapeCode("Position", value0, value1);
const EraseData = value0 => $EscapeCode("EraseData", value0);
const EraseLine = value0 => $EscapeCode("EraseLine", value0);
const ScrollUp = value0 => $EscapeCode("ScrollUp", value0);
const ScrollDown = value0 => $EscapeCode("ScrollDown", value0);
const Graphics = value0 => $EscapeCode("Graphics", value0);
const SavePosition = /* #__PURE__ */ $EscapeCode("SavePosition");
const RestorePosition = /* #__PURE__ */ $EscapeCode("RestorePosition");
const QueryPosition = /* #__PURE__ */ $EscapeCode("QueryPosition");
const HideCursor = /* #__PURE__ */ $EscapeCode("HideCursor");
const ShowCursor = /* #__PURE__ */ $EscapeCode("ShowCursor");
const prefix = "\u001b[";
const genericRenderingMode = {
  to: x => {
    if (x.tag === "Inl") { return Bold; }
    if (x.tag === "Inr") {
      if (x._1.tag === "Inl") { return Dim; }
      if (x._1.tag === "Inr") {
        if (x._1._1.tag === "Inl") { return Italic; }
        if (x._1._1.tag === "Inr") {
          if (x._1._1._1.tag === "Inl") { return Underline; }
          if (x._1._1._1.tag === "Inr") {
            if (x._1._1._1._1.tag === "Inl") { return Inverse; }
            if (x._1._1._1._1.tag === "Inr") { return Strikethrough; }
            $runtime.fail();
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    }
    $runtime.fail();
  },
  from: x => {
    if (x.tag === "Bold") { return Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments); }
    if (x.tag === "Dim") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)); }
    if (x.tag === "Italic") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))); }
    if (x.tag === "Underline") {
      return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))));
    }
    if (x.tag === "Inverse") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
      );
    }
    if (x.tag === "Strikethrough") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.NoArguments))))
      );
    }
    $runtime.fail();
  }
};
const showRenderingMode = {
  show: /* #__PURE__ */ (() => {
    const $0 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Bold"});
    const $1 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Dim"});
    const $2 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Italic"});
    const $3 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Underline"});
    const $4 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Inverse"});
    const $5 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Strikethrough"});
    return x => {
      const $7 = genericRenderingMode.from(x);
      if ($7.tag === "Inl") { return $0["genericShow'"]($7._1); }
      if ($7.tag === "Inr") {
        if ($7._1.tag === "Inl") { return $1["genericShow'"]($7._1._1); }
        if ($7._1.tag === "Inr") {
          if ($7._1._1.tag === "Inl") { return $2["genericShow'"]($7._1._1._1); }
          if ($7._1._1.tag === "Inr") {
            if ($7._1._1._1.tag === "Inl") { return $3["genericShow'"]($7._1._1._1._1); }
            if ($7._1._1._1.tag === "Inr") {
              if ($7._1._1._1._1.tag === "Inl") { return $4["genericShow'"]($7._1._1._1._1._1); }
              if ($7._1._1._1._1.tag === "Inr") { return $5["genericShow'"]($7._1._1._1._1._1); }
              $runtime.fail();
            }
            $runtime.fail();
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
  })()
};
const genericGraphicsParam = {
  to: x => {
    if (x.tag === "Inl") { return Reset; }
    if (x.tag === "Inr") {
      if (x._1.tag === "Inl") { return $GraphicsParam("PMode", x._1._1); }
      if (x._1.tag === "Inr") {
        if (x._1._1.tag === "Inl") { return $GraphicsParam("PForeground", x._1._1._1); }
        if (x._1._1.tag === "Inr") { return $GraphicsParam("PBackground", x._1._1._1); }
        $runtime.fail();
      }
      $runtime.fail();
    }
    $runtime.fail();
  },
  from: x => {
    if (x.tag === "Reset") { return Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments); }
    if (x.tag === "PMode") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)); }
    if (x.tag === "PForeground") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1))); }
    if (x.tag === "PBackground") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", x._1))); }
    $runtime.fail();
  }
};
const genericEscapeCode = {
  to: x => {
    if (x.tag === "Inl") { return $EscapeCode("Up", x._1); }
    if (x.tag === "Inr") {
      if (x._1.tag === "Inl") { return $EscapeCode("Down", x._1._1); }
      if (x._1.tag === "Inr") {
        if (x._1._1.tag === "Inl") { return $EscapeCode("Forward", x._1._1._1); }
        if (x._1._1.tag === "Inr") {
          if (x._1._1._1.tag === "Inl") { return $EscapeCode("Back", x._1._1._1._1); }
          if (x._1._1._1.tag === "Inr") {
            if (x._1._1._1._1.tag === "Inl") { return $EscapeCode("NextLine", x._1._1._1._1._1); }
            if (x._1._1._1._1.tag === "Inr") {
              if (x._1._1._1._1._1.tag === "Inl") { return $EscapeCode("PreviousLine", x._1._1._1._1._1._1); }
              if (x._1._1._1._1._1.tag === "Inr") {
                if (x._1._1._1._1._1._1.tag === "Inl") { return $EscapeCode("HorizontalAbsolute", x._1._1._1._1._1._1._1); }
                if (x._1._1._1._1._1._1.tag === "Inr") {
                  if (x._1._1._1._1._1._1._1.tag === "Inl") { return $EscapeCode("Position", x._1._1._1._1._1._1._1._1._1, x._1._1._1._1._1._1._1._1._2); }
                  if (x._1._1._1._1._1._1._1.tag === "Inr") {
                    if (x._1._1._1._1._1._1._1._1.tag === "Inl") { return $EscapeCode("EraseData", x._1._1._1._1._1._1._1._1._1); }
                    if (x._1._1._1._1._1._1._1._1.tag === "Inr") {
                      if (x._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $EscapeCode("EraseLine", x._1._1._1._1._1._1._1._1._1._1); }
                      if (x._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                        if (x._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $EscapeCode("ScrollUp", x._1._1._1._1._1._1._1._1._1._1._1); }
                        if (x._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                          if (x._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $EscapeCode("ScrollDown", x._1._1._1._1._1._1._1._1._1._1._1._1); }
                          if (x._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                            if (x._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $EscapeCode("Graphics", x._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                            if (x._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                              if (x._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return SavePosition; }
                              if (x._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return RestorePosition; }
                                if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                  if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return QueryPosition; }
                                  if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                    if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return HideCursor; }
                                    if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") { return ShowCursor; }
                                    $runtime.fail();
                                  }
                                  $runtime.fail();
                                }
                                $runtime.fail();
                              }
                              $runtime.fail();
                            }
                            $runtime.fail();
                          }
                          $runtime.fail();
                        }
                        $runtime.fail();
                      }
                      $runtime.fail();
                    }
                    $runtime.fail();
                  }
                  $runtime.fail();
                }
                $runtime.fail();
              }
              $runtime.fail();
            }
            $runtime.fail();
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    }
    $runtime.fail();
  },
  from: x => {
    if (x.tag === "Up") { return Data$dGeneric$dRep.$Sum("Inl", x._1); }
    if (x.tag === "Down") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)); }
    if (x.tag === "Forward") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1))); }
    if (x.tag === "Back") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)))); }
    if (x.tag === "NextLine") {
      return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)))));
    }
    if (x.tag === "PreviousLine") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)))))
      );
    }
    if (x.tag === "HorizontalAbsolute") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)))))
        )
      );
    }
    if (x.tag === "Position") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.$Product(x._1, x._2))))
              )
            )
          )
        )
      );
    }
    if (x.tag === "EraseData") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)))))
            )
          )
        )
      );
    }
    if (x.tag === "EraseLine") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)))))
              )
            )
          )
        )
      );
    }
    if (x.tag === "ScrollUp") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1))))
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "ScrollDown") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1))))
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "Graphics") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1))))
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "SavePosition") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)))
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "RestorePosition") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum(
                              "Inr",
                              Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)))
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "QueryPosition") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum(
                              "Inr",
                              Data$dGeneric$dRep.$Sum(
                                "Inr",
                                Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)))
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "HideCursor") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum(
                              "Inr",
                              Data$dGeneric$dRep.$Sum(
                                "Inr",
                                Data$dGeneric$dRep.$Sum(
                                  "Inr",
                                  Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)))
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "ShowCursor") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum(
                              "Inr",
                              Data$dGeneric$dRep.$Sum(
                                "Inr",
                                Data$dGeneric$dRep.$Sum(
                                  "Inr",
                                  Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.NoArguments)))
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    $runtime.fail();
  }
};
const genericEraseParam = {
  to: x => {
    if (x.tag === "Inl") { return ToEnd; }
    if (x.tag === "Inr") {
      if (x._1.tag === "Inl") { return FromBeginning; }
      if (x._1.tag === "Inr") { return Entire; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  from: x => {
    if (x.tag === "ToEnd") { return Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments); }
    if (x.tag === "FromBeginning") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)); }
    if (x.tag === "Entire") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.NoArguments)); }
    $runtime.fail();
  }
};
const showEraseParam = {
  show: /* #__PURE__ */ (() => {
    const $0 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "ToEnd"});
    const $1 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "FromBeginning"});
    const $2 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Entire"});
    return x => {
      const $4 = genericEraseParam.from(x);
      if ($4.tag === "Inl") { return $0["genericShow'"]($4._1); }
      if ($4.tag === "Inr") {
        if ($4._1.tag === "Inl") { return $1["genericShow'"]($4._1._1); }
        if ($4._1.tag === "Inr") { return $2["genericShow'"]($4._1._1); }
        $runtime.fail();
      }
      $runtime.fail();
    };
  })()
};
const genericColor = {
  to: x => {
    if (x.tag === "Inl") { return Black; }
    if (x.tag === "Inr") {
      if (x._1.tag === "Inl") { return Red; }
      if (x._1.tag === "Inr") {
        if (x._1._1.tag === "Inl") { return Green; }
        if (x._1._1.tag === "Inr") {
          if (x._1._1._1.tag === "Inl") { return Yellow; }
          if (x._1._1._1.tag === "Inr") {
            if (x._1._1._1._1.tag === "Inl") { return Blue; }
            if (x._1._1._1._1.tag === "Inr") {
              if (x._1._1._1._1._1.tag === "Inl") { return Magenta; }
              if (x._1._1._1._1._1.tag === "Inr") {
                if (x._1._1._1._1._1._1.tag === "Inl") { return Cyan; }
                if (x._1._1._1._1._1._1.tag === "Inr") {
                  if (x._1._1._1._1._1._1._1.tag === "Inl") { return White; }
                  if (x._1._1._1._1._1._1._1.tag === "Inr") {
                    if (x._1._1._1._1._1._1._1._1.tag === "Inl") { return BrightBlack; }
                    if (x._1._1._1._1._1._1._1._1.tag === "Inr") {
                      if (x._1._1._1._1._1._1._1._1._1.tag === "Inl") { return BrightRed; }
                      if (x._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                        if (x._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return BrightGreen; }
                        if (x._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                          if (x._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return BrightYellow; }
                          if (x._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                            if (x._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return BrightBlue; }
                            if (x._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                              if (x._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return BrightMagenta; }
                              if (x._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return BrightCyan; }
                                if (x._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") { return BrightWhite; }
                                $runtime.fail();
                              }
                              $runtime.fail();
                            }
                            $runtime.fail();
                          }
                          $runtime.fail();
                        }
                        $runtime.fail();
                      }
                      $runtime.fail();
                    }
                    $runtime.fail();
                  }
                  $runtime.fail();
                }
                $runtime.fail();
              }
              $runtime.fail();
            }
            $runtime.fail();
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    }
    $runtime.fail();
  },
  from: x => {
    if (x.tag === "Black") { return Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments); }
    if (x.tag === "Red") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)); }
    if (x.tag === "Green") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))); }
    if (x.tag === "Yellow") {
      return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))));
    }
    if (x.tag === "Blue") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
      );
    }
    if (x.tag === "Magenta") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
        )
      );
    }
    if (x.tag === "Cyan") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
          )
        )
      );
    }
    if (x.tag === "White") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
            )
          )
        )
      );
    }
    if (x.tag === "BrightBlack") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
              )
            )
          )
        )
      );
    }
    if (x.tag === "BrightRed") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "BrightGreen") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "BrightYellow") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments))))
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "BrightBlue") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)))
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "BrightMagenta") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)))
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "BrightCyan") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum(
                              "Inr",
                              Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.NoArguments)))
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    if (x.tag === "BrightWhite") {
      return Data$dGeneric$dRep.$Sum(
        "Inr",
        Data$dGeneric$dRep.$Sum(
          "Inr",
          Data$dGeneric$dRep.$Sum(
            "Inr",
            Data$dGeneric$dRep.$Sum(
              "Inr",
              Data$dGeneric$dRep.$Sum(
                "Inr",
                Data$dGeneric$dRep.$Sum(
                  "Inr",
                  Data$dGeneric$dRep.$Sum(
                    "Inr",
                    Data$dGeneric$dRep.$Sum(
                      "Inr",
                      Data$dGeneric$dRep.$Sum(
                        "Inr",
                        Data$dGeneric$dRep.$Sum(
                          "Inr",
                          Data$dGeneric$dRep.$Sum(
                            "Inr",
                            Data$dGeneric$dRep.$Sum(
                              "Inr",
                              Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.NoArguments)))
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    $runtime.fail();
  }
};
const showColor = {
  show: /* #__PURE__ */ (() => {
    const $0 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Black"});
    const $1 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Red"});
    const $2 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Green"});
    const $3 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Yellow"});
    const $4 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Blue"});
    const $5 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Magenta"});
    const $6 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Cyan"});
    const $7 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "White"});
    const $8 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightBlack"});
    const $9 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightRed"});
    const $10 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightGreen"});
    const $11 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightYellow"});
    const $12 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightBlue"});
    const $13 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightMagenta"});
    const $14 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightCyan"});
    const $15 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "BrightWhite"});
    return x => {
      const $17 = genericColor.from(x);
      if ($17.tag === "Inl") { return $0["genericShow'"]($17._1); }
      if ($17.tag === "Inr") {
        if ($17._1.tag === "Inl") { return $1["genericShow'"]($17._1._1); }
        if ($17._1.tag === "Inr") {
          if ($17._1._1.tag === "Inl") { return $2["genericShow'"]($17._1._1._1); }
          if ($17._1._1.tag === "Inr") {
            if ($17._1._1._1.tag === "Inl") { return $3["genericShow'"]($17._1._1._1._1); }
            if ($17._1._1._1.tag === "Inr") {
              if ($17._1._1._1._1.tag === "Inl") { return $4["genericShow'"]($17._1._1._1._1._1); }
              if ($17._1._1._1._1.tag === "Inr") {
                if ($17._1._1._1._1._1.tag === "Inl") { return $5["genericShow'"]($17._1._1._1._1._1._1); }
                if ($17._1._1._1._1._1.tag === "Inr") {
                  if ($17._1._1._1._1._1._1.tag === "Inl") { return $6["genericShow'"]($17._1._1._1._1._1._1._1); }
                  if ($17._1._1._1._1._1._1.tag === "Inr") {
                    if ($17._1._1._1._1._1._1._1.tag === "Inl") { return $7["genericShow'"]($17._1._1._1._1._1._1._1._1); }
                    if ($17._1._1._1._1._1._1._1.tag === "Inr") {
                      if ($17._1._1._1._1._1._1._1._1.tag === "Inl") { return $8["genericShow'"]($17._1._1._1._1._1._1._1._1._1); }
                      if ($17._1._1._1._1._1._1._1._1.tag === "Inr") {
                        if ($17._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $9["genericShow'"]($17._1._1._1._1._1._1._1._1._1._1); }
                        if ($17._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                          if ($17._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $10["genericShow'"]($17._1._1._1._1._1._1._1._1._1._1._1); }
                          if ($17._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                            if ($17._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $11["genericShow'"]($17._1._1._1._1._1._1._1._1._1._1._1._1); }
                            if ($17._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                              if ($17._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $12["genericShow'"]($17._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                              if ($17._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                if ($17._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $13["genericShow'"]($17._1._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                                if ($17._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                  if ($17._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $14["genericShow'"]($17._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                                  if ($17._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") { return $15["genericShow'"]($17._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                                  $runtime.fail();
                                }
                                $runtime.fail();
                              }
                              $runtime.fail();
                            }
                            $runtime.fail();
                          }
                          $runtime.fail();
                        }
                        $runtime.fail();
                      }
                      $runtime.fail();
                    }
                    $runtime.fail();
                  }
                  $runtime.fail();
                }
                $runtime.fail();
              }
              $runtime.fail();
            }
            $runtime.fail();
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
  })()
};
const showGraphicsParam = {
  show: /* #__PURE__ */ (() => {
    const $0 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "Reset"});
    const $1 = Data$dShow$dGeneric.genericShowConstructor({genericShowArgs: v => [showRenderingMode.show(v)]})({reflectSymbol: () => "PMode"});
    const $2 = Data$dShow$dGeneric.genericShowConstructor({genericShowArgs: v => [showColor.show(v)]})({reflectSymbol: () => "PForeground"});
    const $3 = Data$dShow$dGeneric.genericShowConstructor({genericShowArgs: v => [showColor.show(v)]})({reflectSymbol: () => "PBackground"});
    return x => {
      const $5 = genericGraphicsParam.from(x);
      if ($5.tag === "Inl") { return $0["genericShow'"]($5._1); }
      if ($5.tag === "Inr") {
        if ($5._1.tag === "Inl") { return $1["genericShow'"]($5._1._1); }
        if ($5._1.tag === "Inr") {
          if ($5._1._1.tag === "Inl") { return $2["genericShow'"]($5._1._1._1); }
          if ($5._1._1.tag === "Inr") { return $3["genericShow'"]($5._1._1._1); }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
  })()
};
const showEscapeCode = {
  show: /* #__PURE__ */ (() => {
    const $0 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "Up"});
    const $1 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "Down"});
    const $2 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "Forward"});
    const $3 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "Back"});
    const $4 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "NextLine"});
    const $5 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "PreviousLine"});
    const $6 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "HorizontalAbsolute"});
    const $7 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsProduct(genericShowArgsArgument)(genericShowArgsArgument))({
      reflectSymbol: () => "Position"
    });
    const $8 = Data$dShow$dGeneric.genericShowConstructor({genericShowArgs: v => [showEraseParam.show(v)]})({reflectSymbol: () => "EraseData"});
    const $9 = Data$dShow$dGeneric.genericShowConstructor({genericShowArgs: v => [showEraseParam.show(v)]})({reflectSymbol: () => "EraseLine"});
    const $10 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "ScrollUp"});
    const $11 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "ScrollDown"});
    const $12 = Data$dShow$dGeneric.genericShowConstructor((() => {
      const $12 = Data$dList$dTypes.showNonEmptyList(showGraphicsParam);
      return {genericShowArgs: v => [$12.show(v)]};
    })())({reflectSymbol: () => "Graphics"});
    const $13 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "SavePosition"});
    const $14 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "RestorePosition"});
    const $15 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "QueryPosition"});
    const $16 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "HideCursor"});
    const $17 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsNoArguments)({reflectSymbol: () => "ShowCursor"});
    return x => {
      const $19 = genericEscapeCode.from(x);
      if ($19.tag === "Inl") { return $0["genericShow'"]($19._1); }
      if ($19.tag === "Inr") {
        if ($19._1.tag === "Inl") { return $1["genericShow'"]($19._1._1); }
        if ($19._1.tag === "Inr") {
          if ($19._1._1.tag === "Inl") { return $2["genericShow'"]($19._1._1._1); }
          if ($19._1._1.tag === "Inr") {
            if ($19._1._1._1.tag === "Inl") { return $3["genericShow'"]($19._1._1._1._1); }
            if ($19._1._1._1.tag === "Inr") {
              if ($19._1._1._1._1.tag === "Inl") { return $4["genericShow'"]($19._1._1._1._1._1); }
              if ($19._1._1._1._1.tag === "Inr") {
                if ($19._1._1._1._1._1.tag === "Inl") { return $5["genericShow'"]($19._1._1._1._1._1._1); }
                if ($19._1._1._1._1._1.tag === "Inr") {
                  if ($19._1._1._1._1._1._1.tag === "Inl") { return $6["genericShow'"]($19._1._1._1._1._1._1._1); }
                  if ($19._1._1._1._1._1._1.tag === "Inr") {
                    if ($19._1._1._1._1._1._1._1.tag === "Inl") { return $7["genericShow'"]($19._1._1._1._1._1._1._1._1); }
                    if ($19._1._1._1._1._1._1._1.tag === "Inr") {
                      if ($19._1._1._1._1._1._1._1._1.tag === "Inl") { return $8["genericShow'"]($19._1._1._1._1._1._1._1._1._1); }
                      if ($19._1._1._1._1._1._1._1._1.tag === "Inr") {
                        if ($19._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $9["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1); }
                        if ($19._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                          if ($19._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $10["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1); }
                          if ($19._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                            if ($19._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $11["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1._1); }
                            if ($19._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                              if ($19._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $12["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                              if ($19._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $13["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                                if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                  if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") { return $14["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1); }
                                  if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                    if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") {
                                      return $15["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1);
                                    }
                                    if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                      if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inl") {
                                        return $16["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1);
                                      }
                                      if ($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1.tag === "Inr") {
                                        return $17["genericShow'"]($19._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1._1);
                                      }
                                      $runtime.fail();
                                    }
                                    $runtime.fail();
                                  }
                                  $runtime.fail();
                                }
                                $runtime.fail();
                              }
                              $runtime.fail();
                            }
                            $runtime.fail();
                          }
                          $runtime.fail();
                        }
                        $runtime.fail();
                      }
                      $runtime.fail();
                    }
                    $runtime.fail();
                  }
                  $runtime.fail();
                }
                $runtime.fail();
              }
              $runtime.fail();
            }
            $runtime.fail();
          }
          $runtime.fail();
        }
        $runtime.fail();
      }
      $runtime.fail();
    };
  })()
};
const eraseParamToString = ep => {
  if (ep.tag === "ToEnd") { return "0"; }
  if (ep.tag === "FromBeginning") { return "1"; }
  if (ep.tag === "Entire") { return "2"; }
  $runtime.fail();
};
const eqRenderingMode = {
  eq: x => y => {
    if (x.tag === "Bold") { return y.tag === "Bold"; }
    if (x.tag === "Dim") { return y.tag === "Dim"; }
    if (x.tag === "Italic") { return y.tag === "Italic"; }
    if (x.tag === "Underline") { return y.tag === "Underline"; }
    if (x.tag === "Inverse") { return y.tag === "Inverse"; }
    if (x.tag === "Strikethrough") { return y.tag === "Strikethrough"; }
    return false;
  }
};
const ordRenderingMode = {
  compare: x => y => {
    if (x.tag === "Bold") {
      if (y.tag === "Bold") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Bold") { return Data$dOrdering.GT; }
    if (x.tag === "Dim") {
      if (y.tag === "Dim") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Dim") { return Data$dOrdering.GT; }
    if (x.tag === "Italic") {
      if (y.tag === "Italic") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Italic") { return Data$dOrdering.GT; }
    if (x.tag === "Underline") {
      if (y.tag === "Underline") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Underline") { return Data$dOrdering.GT; }
    if (x.tag === "Inverse") {
      if (y.tag === "Inverse") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Inverse") { return Data$dOrdering.GT; }
    if (x.tag === "Strikethrough") {
      if (y.tag === "Strikethrough") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqRenderingMode
};
const eqEraseParam = {
  eq: x => y => {
    if (x.tag === "ToEnd") { return y.tag === "ToEnd"; }
    if (x.tag === "FromBeginning") { return y.tag === "FromBeginning"; }
    if (x.tag === "Entire") { return y.tag === "Entire"; }
    return false;
  }
};
const ordEraseParam = {
  compare: x => y => {
    if (x.tag === "ToEnd") {
      if (y.tag === "ToEnd") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ToEnd") { return Data$dOrdering.GT; }
    if (x.tag === "FromBeginning") {
      if (y.tag === "FromBeginning") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "FromBeginning") { return Data$dOrdering.GT; }
    if (x.tag === "Entire") {
      if (y.tag === "Entire") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqEraseParam
};
const eqColor = {
  eq: x => y => {
    if (x.tag === "Black") { return y.tag === "Black"; }
    if (x.tag === "Red") { return y.tag === "Red"; }
    if (x.tag === "Green") { return y.tag === "Green"; }
    if (x.tag === "Yellow") { return y.tag === "Yellow"; }
    if (x.tag === "Blue") { return y.tag === "Blue"; }
    if (x.tag === "Magenta") { return y.tag === "Magenta"; }
    if (x.tag === "Cyan") { return y.tag === "Cyan"; }
    if (x.tag === "White") { return y.tag === "White"; }
    if (x.tag === "BrightBlack") { return y.tag === "BrightBlack"; }
    if (x.tag === "BrightRed") { return y.tag === "BrightRed"; }
    if (x.tag === "BrightGreen") { return y.tag === "BrightGreen"; }
    if (x.tag === "BrightYellow") { return y.tag === "BrightYellow"; }
    if (x.tag === "BrightBlue") { return y.tag === "BrightBlue"; }
    if (x.tag === "BrightMagenta") { return y.tag === "BrightMagenta"; }
    if (x.tag === "BrightCyan") { return y.tag === "BrightCyan"; }
    if (x.tag === "BrightWhite") { return y.tag === "BrightWhite"; }
    return false;
  }
};
const eqGraphicsParam = {
  eq: x => y => {
    if (x.tag === "Reset") { return y.tag === "Reset"; }
    if (x.tag === "PMode") {
      if (y.tag === "PMode") {
        if (x._1.tag === "Bold") { return y._1.tag === "Bold"; }
        if (x._1.tag === "Dim") { return y._1.tag === "Dim"; }
        if (x._1.tag === "Italic") { return y._1.tag === "Italic"; }
        if (x._1.tag === "Underline") { return y._1.tag === "Underline"; }
        if (x._1.tag === "Inverse") { return y._1.tag === "Inverse"; }
        if (x._1.tag === "Strikethrough") { return y._1.tag === "Strikethrough"; }
        return false;
      }
      return false;
    }
    if (x.tag === "PForeground") {
      if (y.tag === "PForeground") { return eqColor.eq(x._1)(y._1); }
      return false;
    }
    if (x.tag === "PBackground") {
      if (y.tag === "PBackground") { return eqColor.eq(x._1)(y._1); }
      return false;
    }
    return false;
  }
};
const eq4 = x => y => eqGraphicsParam.eq(x._1)(y._1) && (() => {
  const go = go$a0$copy => go$a1$copy => go$a2$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$a2 = go$a2$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0, v1 = go$a1, v2 = go$a2;
      if (!v2) {
        go$c = false;
        go$r = false;
        continue;
      }
      if (v.tag === "Nil") {
        if (v1.tag === "Nil") {
          go$c = false;
          go$r = v2;
          continue;
        }
        go$c = false;
        go$r = false;
        continue;
      }
      if (v.tag === "Cons") {
        if (v1.tag === "Cons") {
          go$a0 = v._2;
          go$a1 = v1._2;
          go$a2 = v2 && eqGraphicsParam.eq(v1._1)(v._1);
          continue;
        }
        go$c = false;
        go$r = false;
        continue;
      }
      go$c = false;
      go$r = false;
      continue;
    };
    return go$r;
  };
  return go(x._2)(y._2)(true);
})();
const eqEscapeCode = {
  eq: x => y => {
    if (x.tag === "Up") {
      if (y.tag === "Up") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "Down") {
      if (y.tag === "Down") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "Forward") {
      if (y.tag === "Forward") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "Back") {
      if (y.tag === "Back") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "NextLine") {
      if (y.tag === "NextLine") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "PreviousLine") {
      if (y.tag === "PreviousLine") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "HorizontalAbsolute") {
      if (y.tag === "HorizontalAbsolute") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "Position") {
      if (y.tag === "Position") { return x._1 === y._1 && x._2 === y._2; }
      return false;
    }
    if (x.tag === "EraseData") {
      if (y.tag === "EraseData") {
        if (x._1.tag === "ToEnd") { return y._1.tag === "ToEnd"; }
        if (x._1.tag === "FromBeginning") { return y._1.tag === "FromBeginning"; }
        if (x._1.tag === "Entire") { return y._1.tag === "Entire"; }
        return false;
      }
      return false;
    }
    if (x.tag === "EraseLine") {
      if (y.tag === "EraseLine") {
        if (x._1.tag === "ToEnd") { return y._1.tag === "ToEnd"; }
        if (x._1.tag === "FromBeginning") { return y._1.tag === "FromBeginning"; }
        if (x._1.tag === "Entire") { return y._1.tag === "Entire"; }
        return false;
      }
      return false;
    }
    if (x.tag === "ScrollUp") {
      if (y.tag === "ScrollUp") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "ScrollDown") {
      if (y.tag === "ScrollDown") { return x._1 === y._1; }
      return false;
    }
    if (x.tag === "Graphics") {
      if (y.tag === "Graphics") { return eq4(x._1)(y._1); }
      return false;
    }
    if (x.tag === "SavePosition") { return y.tag === "SavePosition"; }
    if (x.tag === "RestorePosition") { return y.tag === "RestorePosition"; }
    if (x.tag === "QueryPosition") { return y.tag === "QueryPosition"; }
    if (x.tag === "HideCursor") { return y.tag === "HideCursor"; }
    if (x.tag === "ShowCursor") { return y.tag === "ShowCursor"; }
    return false;
  }
};
const ordColor = {
  compare: x => y => {
    if (x.tag === "Black") {
      if (y.tag === "Black") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Black") { return Data$dOrdering.GT; }
    if (x.tag === "Red") {
      if (y.tag === "Red") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Red") { return Data$dOrdering.GT; }
    if (x.tag === "Green") {
      if (y.tag === "Green") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Green") { return Data$dOrdering.GT; }
    if (x.tag === "Yellow") {
      if (y.tag === "Yellow") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Yellow") { return Data$dOrdering.GT; }
    if (x.tag === "Blue") {
      if (y.tag === "Blue") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Blue") { return Data$dOrdering.GT; }
    if (x.tag === "Magenta") {
      if (y.tag === "Magenta") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Magenta") { return Data$dOrdering.GT; }
    if (x.tag === "Cyan") {
      if (y.tag === "Cyan") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Cyan") { return Data$dOrdering.GT; }
    if (x.tag === "White") {
      if (y.tag === "White") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "White") { return Data$dOrdering.GT; }
    if (x.tag === "BrightBlack") {
      if (y.tag === "BrightBlack") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "BrightBlack") { return Data$dOrdering.GT; }
    if (x.tag === "BrightRed") {
      if (y.tag === "BrightRed") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "BrightRed") { return Data$dOrdering.GT; }
    if (x.tag === "BrightGreen") {
      if (y.tag === "BrightGreen") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "BrightGreen") { return Data$dOrdering.GT; }
    if (x.tag === "BrightYellow") {
      if (y.tag === "BrightYellow") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "BrightYellow") { return Data$dOrdering.GT; }
    if (x.tag === "BrightBlue") {
      if (y.tag === "BrightBlue") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "BrightBlue") { return Data$dOrdering.GT; }
    if (x.tag === "BrightMagenta") {
      if (y.tag === "BrightMagenta") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "BrightMagenta") { return Data$dOrdering.GT; }
    if (x.tag === "BrightCyan") {
      if (y.tag === "BrightCyan") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "BrightCyan") { return Data$dOrdering.GT; }
    if (x.tag === "BrightWhite") {
      if (y.tag === "BrightWhite") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqColor
};
const ordGraphicsParam = {
  compare: x => y => {
    if (x.tag === "Reset") {
      if (y.tag === "Reset") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Reset") { return Data$dOrdering.GT; }
    if (x.tag === "PMode") {
      if (y.tag === "PMode") { return ordRenderingMode.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "PMode") { return Data$dOrdering.GT; }
    if (x.tag === "PForeground") {
      if (y.tag === "PForeground") { return ordColor.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "PForeground") { return Data$dOrdering.GT; }
    if (x.tag === "PBackground") {
      if (y.tag === "PBackground") { return ordColor.compare(x._1)(y._1); }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqGraphicsParam
};
const compare4 = /* #__PURE__ */ (() => Data$dList$dTypes.ordNonEmpty(ordGraphicsParam).compare)();
const ordEscapeCode = {
  compare: x => y => {
    if (x.tag === "Up") {
      if (y.tag === "Up") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Up") { return Data$dOrdering.GT; }
    if (x.tag === "Down") {
      if (y.tag === "Down") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Down") { return Data$dOrdering.GT; }
    if (x.tag === "Forward") {
      if (y.tag === "Forward") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Forward") { return Data$dOrdering.GT; }
    if (x.tag === "Back") {
      if (y.tag === "Back") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Back") { return Data$dOrdering.GT; }
    if (x.tag === "NextLine") {
      if (y.tag === "NextLine") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "NextLine") { return Data$dOrdering.GT; }
    if (x.tag === "PreviousLine") {
      if (y.tag === "PreviousLine") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "PreviousLine") { return Data$dOrdering.GT; }
    if (x.tag === "HorizontalAbsolute") {
      if (y.tag === "HorizontalAbsolute") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "HorizontalAbsolute") { return Data$dOrdering.GT; }
    if (x.tag === "Position") {
      if (y.tag === "Position") {
        const v = Data$dOrd.ordInt.compare(x._1)(y._1);
        if (v.tag === "LT") { return Data$dOrdering.LT; }
        if (v.tag === "GT") { return Data$dOrdering.GT; }
        return Data$dOrd.ordInt.compare(x._2)(y._2);
      }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Position") { return Data$dOrdering.GT; }
    if (x.tag === "EraseData") {
      if (y.tag === "EraseData") { return ordEraseParam.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "EraseData") { return Data$dOrdering.GT; }
    if (x.tag === "EraseLine") {
      if (y.tag === "EraseLine") { return ordEraseParam.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "EraseLine") { return Data$dOrdering.GT; }
    if (x.tag === "ScrollUp") {
      if (y.tag === "ScrollUp") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ScrollUp") { return Data$dOrdering.GT; }
    if (x.tag === "ScrollDown") {
      if (y.tag === "ScrollDown") { return Data$dOrd.ordInt.compare(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "ScrollDown") { return Data$dOrdering.GT; }
    if (x.tag === "Graphics") {
      if (y.tag === "Graphics") { return compare4(x._1)(y._1); }
      return Data$dOrdering.LT;
    }
    if (y.tag === "Graphics") { return Data$dOrdering.GT; }
    if (x.tag === "SavePosition") {
      if (y.tag === "SavePosition") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "SavePosition") { return Data$dOrdering.GT; }
    if (x.tag === "RestorePosition") {
      if (y.tag === "RestorePosition") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "RestorePosition") { return Data$dOrdering.GT; }
    if (x.tag === "QueryPosition") {
      if (y.tag === "QueryPosition") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "QueryPosition") { return Data$dOrdering.GT; }
    if (x.tag === "HideCursor") {
      if (y.tag === "HideCursor") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y.tag === "HideCursor") { return Data$dOrdering.GT; }
    if (x.tag === "ShowCursor") {
      if (y.tag === "ShowCursor") { return Data$dOrdering.EQ; }
      $runtime.fail();
    }
    $runtime.fail();
  },
  Eq0: () => eqEscapeCode
};
const colorSuffix = "m";
const colorCode = c => {
  if (c.tag === "Black") { return 30; }
  if (c.tag === "Red") { return 31; }
  if (c.tag === "Green") { return 32; }
  if (c.tag === "Yellow") { return 33; }
  if (c.tag === "Blue") { return 34; }
  if (c.tag === "Magenta") { return 35; }
  if (c.tag === "Cyan") { return 36; }
  if (c.tag === "White") { return 37; }
  if (c.tag === "BrightBlack") { return 90; }
  if (c.tag === "BrightRed") { return 91; }
  if (c.tag === "BrightGreen") { return 92; }
  if (c.tag === "BrightYellow") { return 93; }
  if (c.tag === "BrightBlue") { return 94; }
  if (c.tag === "BrightMagenta") { return 95; }
  if (c.tag === "BrightCyan") { return 96; }
  if (c.tag === "BrightWhite") { return 97; }
  $runtime.fail();
};
const codeForRenderingMode = m => {
  if (m.tag === "Bold") { return 1; }
  if (m.tag === "Dim") { return 2; }
  if (m.tag === "Italic") { return 3; }
  if (m.tag === "Underline") { return 4; }
  if (m.tag === "Inverse") { return 7; }
  if (m.tag === "Strikethrough") { return 9; }
  $runtime.fail();
};
const graphicsParamToString = gp => {
  if (gp.tag === "Reset") { return "0"; }
  if (gp.tag === "PMode") {
    return Data$dShow.showIntImpl((() => {
      if (gp._1.tag === "Bold") { return 1; }
      if (gp._1.tag === "Dim") { return 2; }
      if (gp._1.tag === "Italic") { return 3; }
      if (gp._1.tag === "Underline") { return 4; }
      if (gp._1.tag === "Inverse") { return 7; }
      if (gp._1.tag === "Strikethrough") { return 9; }
      $runtime.fail();
    })());
  }
  if (gp.tag === "PForeground") {
    return Data$dShow.showIntImpl((() => {
      if (gp._1.tag === "Black") { return 30; }
      if (gp._1.tag === "Red") { return 31; }
      if (gp._1.tag === "Green") { return 32; }
      if (gp._1.tag === "Yellow") { return 33; }
      if (gp._1.tag === "Blue") { return 34; }
      if (gp._1.tag === "Magenta") { return 35; }
      if (gp._1.tag === "Cyan") { return 36; }
      if (gp._1.tag === "White") { return 37; }
      if (gp._1.tag === "BrightBlack") { return 90; }
      if (gp._1.tag === "BrightRed") { return 91; }
      if (gp._1.tag === "BrightGreen") { return 92; }
      if (gp._1.tag === "BrightYellow") { return 93; }
      if (gp._1.tag === "BrightBlue") { return 94; }
      if (gp._1.tag === "BrightMagenta") { return 95; }
      if (gp._1.tag === "BrightCyan") { return 96; }
      if (gp._1.tag === "BrightWhite") { return 97; }
      $runtime.fail();
    })());
  }
  if (gp.tag === "PBackground") {
    return Data$dShow.showIntImpl((() => {
      if (gp._1.tag === "Black") { return 40; }
      if (gp._1.tag === "Red") { return 41; }
      if (gp._1.tag === "Green") { return 42; }
      if (gp._1.tag === "Yellow") { return 43; }
      if (gp._1.tag === "Blue") { return 44; }
      if (gp._1.tag === "Magenta") { return 45; }
      if (gp._1.tag === "Cyan") { return 46; }
      if (gp._1.tag === "White") { return 47; }
      if (gp._1.tag === "BrightBlack") { return 100; }
      if (gp._1.tag === "BrightRed") { return 101; }
      if (gp._1.tag === "BrightGreen") { return 102; }
      if (gp._1.tag === "BrightYellow") { return 103; }
      if (gp._1.tag === "BrightBlue") { return 104; }
      if (gp._1.tag === "BrightMagenta") { return 105; }
      if (gp._1.tag === "BrightCyan") { return 106; }
      if (gp._1.tag === "BrightWhite") { return 107; }
      $runtime.fail();
    })());
  }
  $runtime.fail();
};
const escapeCodeToString = x => {
  if (x.tag === "Up") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "A"); }
  if (x.tag === "Down") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "B"); }
  if (x.tag === "Forward") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "C"); }
  if (x.tag === "Back") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "D"); }
  if (x.tag === "NextLine") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "E"); }
  if (x.tag === "PreviousLine") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "F"); }
  if (x.tag === "HorizontalAbsolute") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "G"); }
  if (x.tag === "Position") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + (";" + (Data$dShow.showIntImpl(x._2) + "H"))); }
  if (x.tag === "EraseData") {
    if (x._1.tag === "ToEnd") { return "\u001b[0J"; }
    if (x._1.tag === "FromBeginning") { return "\u001b[1J"; }
    if (x._1.tag === "Entire") { return "\u001b[2J"; }
    $runtime.fail();
  }
  if (x.tag === "EraseLine") {
    if (x._1.tag === "ToEnd") { return "\u001b[0K"; }
    if (x._1.tag === "FromBeginning") { return "\u001b[1K"; }
    if (x._1.tag === "Entire") { return "\u001b[2K"; }
    $runtime.fail();
  }
  if (x.tag === "ScrollUp") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "S"); }
  if (x.tag === "ScrollDown") { return "\u001b[" + (Data$dShow.showIntImpl(x._1) + "T"); }
  if (x.tag === "Graphics") {
    const $1 = Data$dList$dTypes.functorNonEmptyList.map(graphicsParamToString)(x._1);
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
            if (b.init) { return {init: false, acc: v._1}; }
            return {init: false, acc: b.acc + (";" + v._1)};
          })();
          go$a1 = v._2;
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    return "\u001b[" + (go({init: false, acc: $1._1})($1._2).acc + "m");
  }
  if (x.tag === "SavePosition") { return "\u001b[s"; }
  if (x.tag === "RestorePosition") { return "\u001b[u"; }
  if (x.tag === "QueryPosition") { return "\u001b[6n"; }
  if (x.tag === "HideCursor") { return "\u001b[?25l"; }
  if (x.tag === "ShowCursor") { return "\u001b[?25h"; }
  $runtime.fail();
};
export {
  $Color,
  $EraseParam,
  $EscapeCode,
  $GraphicsParam,
  $RenderingMode,
  Back,
  Black,
  Blue,
  Bold,
  BrightBlack,
  BrightBlue,
  BrightCyan,
  BrightGreen,
  BrightMagenta,
  BrightRed,
  BrightWhite,
  BrightYellow,
  Cyan,
  Dim,
  Down,
  Entire,
  EraseData,
  EraseLine,
  Forward,
  FromBeginning,
  Graphics,
  Green,
  HideCursor,
  HorizontalAbsolute,
  Inverse,
  Italic,
  Magenta,
  NextLine,
  PBackground,
  PForeground,
  PMode,
  Position,
  PreviousLine,
  QueryPosition,
  Red,
  Reset,
  RestorePosition,
  SavePosition,
  ScrollDown,
  ScrollUp,
  ShowCursor,
  Strikethrough,
  ToEnd,
  Underline,
  Up,
  White,
  Yellow,
  codeForRenderingMode,
  colorCode,
  colorSuffix,
  compare4,
  eq4,
  eqColor,
  eqEraseParam,
  eqEscapeCode,
  eqGraphicsParam,
  eqRenderingMode,
  eraseParamToString,
  escapeCodeToString,
  genericColor,
  genericEraseParam,
  genericEscapeCode,
  genericGraphicsParam,
  genericRenderingMode,
  genericShowArgsArgument,
  graphicsParamToString,
  ordColor,
  ordEraseParam,
  ordEscapeCode,
  ordGraphicsParam,
  ordRenderingMode,
  prefix,
  showColor,
  showEraseParam,
  showEscapeCode,
  showGraphicsParam,
  showRenderingMode
};
