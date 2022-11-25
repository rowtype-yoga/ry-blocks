module Yoga.Block.Molecule.Typeahead.Style where

import Yoga.Prelude.Style

type Props f r = (| r)

resultsContainer ∷ Style
resultsContainer =
  pXY 0
    <> mT 4
    <> mB 4
    <> maxHeight' (50.0 # vh)
    <> minHeight' (25.0 # vh)
    <> height' (230 # px)
    <> justifyEnd
    <> itemsStart
    <> gap 3
    <> roundedDefault
    <> shadowXxl
    <> overflowHidden
    <> blurredBackground'
      { blurRadius: 4
      , blurredCol: colourWithDarkLightAlpha.backgroundLayer5
          { darkAlpha: 0.5, lightAlpha: 0.5 }
      , fallbackCol: colour.inputBackground
      }
    <> border 1
    <> borderSolid
    <> borderCol' col.inputBorder
    <> css { ".TypeaheadList": nested (pXY 0 <> mXY 0) }

resultContainer ∷ Style
resultContainer =
  pX 0
    <> cursorPointer
    <> overflowHidden

item ∷ Style
item =
  focus
    ( background' col.highlight
        <> textCol' col.highlightText
        <> outlineNone
    )
    <> border 0
    <> borderBottom 1
    <> borderSolid
    <> borderCol' col.backgroundLayer3
