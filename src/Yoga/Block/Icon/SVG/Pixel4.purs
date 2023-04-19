module Yoga.Block.Icon.SVG.Pixel4 where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

pixel4 ∷ JSX
pixel4 = SVG.svg
  { xmlns: "http://www.w3.org/2000/svg"
  , height: "1475"
  , width: "690"
  , children:
      [ SVG.rect
          { strokeLinejoin: "round"
          , fillRule: "evenodd"
          , rx: "100"
          , ry: "100"
          , height: "1467"
          , width: "684"
          , stroke: "#ddd"
          , strokeLinecap: "round"
          , y: "4"
          , x: "4"
          , strokeWidth: "4"
          }
      , SVG.rect
          { fillRule: "evenodd"
          , rx: "55"
          , ry: "55"
          , height: "1310"
          , width: "630"
          , y: "105"
          , x: "29"
          , fill: "#ddd"
          }
      , SVG.circle
          { strokeLinejoin: "round"
          , cx: "190.56"
          , strokeLinecap: "round"
          , stroke: "#444"
          , cy: "68.889"
          , r: "10"
          , strokeWidth: "3"
          , fill: "none"
          }
      , SVG.rect
          { strokeLinejoin: "round"
          , rx: "5"
          , ry: "5"
          , height: "12.5"
          , width: "80"
          , stroke: "#444"
          , strokeLinecap: "round"
          , y: "61.5"
          , x: "309"
          , strokeWidth: "3"
          , fill: "none"
          }
      ]
  }