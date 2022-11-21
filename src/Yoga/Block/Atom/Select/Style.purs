module Yoga.Block.Atom.Select.Style where

import Yoga.Prelude.Style

import React.Basic.DOM.SVG as SVG

container ∷ Style
container =
  width' auto
    <> flexRow
    <> itemsCenter
    <> positionRelative
    <> borderSolid
    <> roundedMd
    <> textSm
    <> css { borderWidth: str "1.5px" }
    <> borderCol' (col.inputBorder)
    <> background' (col.inputBackground)
    <> textCol' col.text
    <> focusWithin (borderCol' col.highlight)

select ∷ Style
select =
  css { appearance: none }
    <> pR 8
    <> borderNone
    <> widthFull
    <> rounded (7 # px)
    <> outlineNone
    <> pY' sizeStyle.xxs
    <> pL' sizeStyle.s
    <> textDefault
    <> textCol' col.text
    <> background transparent
    <> svgBackgroundImage
      ( SVG.svg
          { viewBox: "0 0 24 24"
          , xmlns: "http://www.w3.org/2000/svg"
          , stroke: cssStringRGBA gray._400
          , fill: "none"
          , children:
              [ SVG.path
                  { strokeLinecap: "round"
                  , strokeLinejoin: "round"
                  , strokeWidth: "4"
                  , d: "M19 9l-7 7-7-7"
                  }
              ]
          }
      )
    <> backgroundPosition ("right " <> size.s <> " center")
    <> backgroundNoRepeat
    <> backgroundSize "10px"
