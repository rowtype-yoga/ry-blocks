module Yoga.Block.Molecule.Typeahead.Style where

import Yoga.Prelude.Style

import Yoga.Block.Atom.PopOver.Style as PopOverStyle

type Props f r = (| r)

resultsContainer ∷ Style
resultsContainer =
  PopOverStyle.popOverStyle
    <> css { ".TypeaheadList": nested (pXY 0 <> mXY 0) }

resultContainer ∷ Style
resultContainer =
  (pX 0 <> cursorPointer <> overflowHidden)

item ∷ Style
item =
  focus
    ( background' (str $ colourWithAlpha.highlight 0.15)
        <> outlineNone
    )
    <> border 0
    <> borderBottom 1
    <> borderSolid
    <> borderCol' col.backgroundLayer3
