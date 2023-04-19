module Yoga.Block.Icon.SVG.Spinner2 where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

spinner2 ∷ JSX
spinner2 = SVG.svg
  { width: "24"
  , height: "24"
  , xmlns: "http://www.w3.org/2000/svg"
  , children:
      [ SVG.style
          { children:
              [ R.text
                  "@keyframes spinner_qtyZ{0%{r:0}25%{r:3px;cx:4px}50%{r:3px;cx:12px}75%{r:3px;cx:20px}to{r:0;cx:20px}}.spinner_nOfF{animation:spinner_qtyZ 2s cubic-bezier(.36,.6,.31,1) infinite}"
              ]
          }
      , SVG.circle
          { className: "spinner_nOfF"
          , cx: "4"
          , cy: "12"
          , r: "3"
          }
      , SVG.circle
          { className: "spinner_nOfF"
          , cx: "4"
          , cy: "12"
          , r: "3"
          , style: R.css { animationDelay: "-.5s" }
          }
      , SVG.circle
          { className: "spinner_nOfF"
          , cx: "4"
          , cy: "12"
          , r: "3"
          , style: R.css { animationDelay: "-1s" }
          }
      , SVG.circle
          { className: "spinner_nOfF"
          , cx: "4"
          , cy: "12"
          , r: "3"
          , style: R.css { animationDelay: "-1.5s" }
          }
      ]
  }