module Yoga.Block.Icon.SVG.EyeOpen where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

eyeOpen ∷ JSX
eyeOpen =
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
        , SVG.path
            { d:
                "M50.173 21.996c23.346 0 42.3 27.978 42.3 27.978s-18.954 27.979-42.3 27.979c-23.346 0-42.301-27.979-42.301-27.979s18.955-27.978 42.301-27.978z"
            , fill: "none"
            , stroke: "var(--stroke-colour)"
            , strokeWidth: "8"
            }
        , SVG.circle
            { cx: "49.963"
            , cy: "50.087"
            , r: "19.869"
            , fill: "none"
            , stroke: "var(--stroke-colour)"
            , strokeWidth: "6"
            }
        , SVG.path
            { d:
                "M49.963 40.748c5.155 0 9.339 4.184 9.339 9.339 0 5.154-4.184 9.339-9.339 9.339-5.154 0-9.339-4.185-9.339-9.339 0-5.155 4.185-9.339 9.339-9.339zm2.405 2.279a3.517 3.517 0 013.516 3.515 3.517 3.517 0 01-3.516 3.516 3.517 3.517 0 010-7.031z"
            , fill: "var(--stroke-colour)"
            }
        ]
    }
