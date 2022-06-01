module Yoga.Block.Icon.SVG.Warn where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

warn ∷ JSX
warn =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "2"
    , children:
        [ SVG.path
            { d: "M41.478 15.313a9.704 9.704 0 0117.044 0L91.27 75.397a9.706 9.706 0 01-8.522 14.351H17.252A9.705 9.705 0 018.73 75.397l32.748-60.084zM50 77.357c2.909 0 5.432-2.432 5.455-5.455-.023-2.977-2.546-5.409-5.455-5.409-3 0-5.477 2.432-5.454 5.409C44.523 74.925 47 77.357 50 77.357zm5.046-44.137H44.932l.909 29.591h8.318l.887-29.591z"
            , fill: "var(--stroke-colour)"
            }
        ]
    }
