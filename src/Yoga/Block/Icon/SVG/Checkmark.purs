module Yoga.Block.Icon.SVG.Checkmark where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

checkmark ∷ JSX
checkmark =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinecap: "round"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "1.5"
    , children:
      [ SVG.path
          { d: "M16.073 57.774l21.285 21.868 52.637-52.637"
          , fill: "none"
          , stroke: "var(--stroke-colour)"
          , strokeWidth: "13"
          }
      ]
    }
