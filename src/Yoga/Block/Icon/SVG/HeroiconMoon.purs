module Yoga.Block.Icon.SVG.HeroiconMoon where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

heroiconMoon ∷ JSX
heroiconMoon = SVG.svg
  { xmlns: "http://www.w3.org/2000/svg"
  , className: "h-6 w-6"
  , fill: "none"
  , viewBox: "0 0 24 24"
  , stroke: "currentColor"
  , children:
      [ SVG.path
          { strokeLinecap: "round"
          , strokeLinejoin: "round"
          , strokeWidth: "2"
          , d:
              "M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"
          }
      ]
  }