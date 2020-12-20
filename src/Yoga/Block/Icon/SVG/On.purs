module Yoga.Block.Icon.SVG.On where

import React.Basic (JSX)
-- import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

on ∷ JSX
on =
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
      , SVG.clipPath
          { id: "a"
          , children:
            [ SVG.path
                { d: "M0 0h100v100H0z"
                }
            ]
          }
      , SVG.g
          { clipPath: "url(#a)"
          , children:
            [ SVG.path
                { d: "M50 1.921v96.261"
                , fill: "none"
                , stroke: "var(--stroke-colour)"
                , strokeWidth: "20"
                }
            ]
          }
      ]
    }
