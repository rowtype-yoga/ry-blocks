module Yoga.Block.Icon.SVG.EyeClosed where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

eyeClosed ∷ JSX
eyeClosed =
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
          { d: "M50.173 21.996c23.346 0 42.3 27.978 42.3 27.978s-18.954 27.979-42.3 27.979c-23.346 0-42.301-27.979-42.301-27.979s18.955-27.978 42.301-27.978z"
          , fill: "var(--stroke-colour)"
          , stroke: "var(--stroke-colour)"
          , strokeWidth: "8"
          }
      ]
    }
