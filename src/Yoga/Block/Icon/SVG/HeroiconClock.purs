module Yoga.Block.Icon.SVG.HeroiconClock where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

heroiconClock :: JSX
heroiconClock = SVG.svg
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
          , d: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          }
      ]
  }