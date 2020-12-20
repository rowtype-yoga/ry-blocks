module Yoga.Block.Icon.SVG.MagnifyingGlass where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

magnifyingGlass ∷ JSX
magnifyingGlass =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "1.5"
    , children:
      [ SVG.path
          { fill: "none"
          , d: "M0 0h100v100H0z"
          }
      , SVG.circle
          { cx: "42.994"
          , cy: "42.837"
          , r: "30.313"
          , fill: "none"
          , stroke: "var(--stroke-colour)"
          , strokeWidth: "10"
          }
      , SVG.path
          { d: "M66.723 66.665l24.062 24.062"
          , fill: "none"
          , stroke: "var(--stroke-colour)"
          , strokeWidth: "8"
          }
      ]
    }
