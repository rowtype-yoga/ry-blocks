module Yoga.Block.Icon.SVG.Cross where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

cross ∷ JSX
cross =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "2"
    , children:
      [ SVG.path
          { d: "M50 2.339c26.305 0 47.661 21.356 47.661 47.661S76.305 97.661 50 97.661 2.339 76.305 2.339 50 23.695 2.339 50 2.339zm0 38.773L31.838 22.949l-8.889 8.889L41.112 50 22.949 68.162l8.889 8.889L50 58.888l18.162 18.163 8.889-8.889L58.888 50l18.163-18.162-8.889-8.889L50 41.112z"
          , fill: "var(--stroke-colour)"
          }
      ]
    }
