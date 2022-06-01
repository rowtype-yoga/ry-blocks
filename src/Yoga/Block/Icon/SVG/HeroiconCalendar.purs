module Yoga.Block.Icon.SVG.HeroiconCalendar where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

heroiconCalendar :: JSX
heroiconCalendar = SVG.svg
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
          , d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
          }
      ]
  }