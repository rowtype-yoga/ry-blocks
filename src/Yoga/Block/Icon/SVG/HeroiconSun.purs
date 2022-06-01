module Yoga.Block.Icon.SVG.HeroiconSun where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

heroiconSun :: JSX
heroiconSun = SVG.svg
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
          , d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
          }
      ]
  }