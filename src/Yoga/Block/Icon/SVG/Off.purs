module Yoga.Block.Icon.SVG.Off where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

off ∷ JSX
off =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "1.5"
    , children:
        [ SVG.circle
            { cx: "50"
            , cy: "50"
            , r: "32"
            , fill: "none"
            , stroke: "var(--stroke-colour)"
            , strokeWidth: "17"
            }
        ]
    }
