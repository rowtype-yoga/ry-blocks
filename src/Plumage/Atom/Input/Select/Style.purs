module Plumage.Atom.Input.Select.Style where

import Plumage.Prelude.Style

import Plumage.Atom.Input.Input.Style (plumageInputStyle)
import React.Basic.DOM.SVG as SVG

plumageSelectStyle ∷ Style
plumageSelectStyle =
  plumageInputStyle
    <> css { appearance: none }
    <> pR 8
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
    <> backgroundPosition "right 4px center"
    <> backgroundNoRepeat
    <> backgroundSize "10px"