module Yoga.Block.Icon.SVG.Plus where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

plus ∷ JSX
plus =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "2"
    , children:
      [ SVG.path
          { d: "M50.302 2.596c26.33 0 47.707 21.376 47.707 47.706 0 26.33-21.377 47.707-47.707 47.707-26.33 0-47.706-21.377-47.706-47.707 0-26.33 21.376-47.706 47.706-47.706zm8.466 38.248V17.378H40.456v23.466H16.99v18.312h23.466v23.466h18.312V59.156h23.466V40.844H58.768z"
          , fill: "var(--stroke-colour)"
          }
      ]
    }
