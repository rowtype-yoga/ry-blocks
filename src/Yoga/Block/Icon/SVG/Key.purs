module Yoga.Block.Icon.SVG.Key where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

key ∷ JSX
key =
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
            [ SVG.path
                { d: "M30.65 43.906c14.689 0 26.614 11.937 26.614 26.64 0 14.702-11.925 26.639-26.614 26.639-14.688 0-26.614-11.937-26.614-26.639 0-14.703 11.926-26.64 26.614-26.64zm-9.215 28.741a6.454 6.454 0 010 12.907 6.454 6.454 0 010-12.907z"
                }
            , SVG.path
                { d: "M79.123 7.855h10.701l.833.776-47.719 44.401 2.491 2.286 45.494-43.326v12.21l-8.681 3.927-2.311 10.777-12.195 6.78-6.678 14.839-17.216 8.651-20.256-9.646L79.123 7.855z"
                }
            ]
          }
      ]
    }
