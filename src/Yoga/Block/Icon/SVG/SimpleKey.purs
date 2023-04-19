module Yoga.Block.Icon.SVG.SimpleKey where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

simpleKey ∷ JSX
simpleKey =
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
                [ SVG.ellipse
                    { cx: "30.65"
                    , cy: "70.546"
                    , rx: "26.614"
                    , ry: "26.639"
                    }
                , SVG.path
                    { d:
                        "M79.123 7.855h10.701l.833.776.266 3.361v12.21l-8.681 3.927-2.311 10.777-12.195 6.78-6.678 14.839-17.216 8.651-20.256-9.646L79.123 7.855z"
                    }
                ]
            }
        ]
    }
