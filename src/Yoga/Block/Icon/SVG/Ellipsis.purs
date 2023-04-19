module Yoga.Block.Icon.SVG.Ellipsis where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

ellipsis ∷ JSX
ellipsis =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "2"
    , children:
        [ SVG.g
            { fill: "var(--stroke-colour)"
            , children:
                [ SVG.circle { cx: "50", cy: "50", r: "10" }
                , SVG.circle { cx: "80", cy: "50", r: "10" }
                , SVG.circle { cx: "20", cy: "50", r: "10" }
                ]
            }
        ]
    }
