module Yoga.Block.Molecule.Typeahead.Style where

import Yoga.Prelude.Style

resultsContainer ∷ Style
resultsContainer =
  background' col.inputBackground
    <> pT 0
    <> pX 0
    <> flexCol
    <> justifyEnd
    <> itemsStart
    <> gap 3
    <> roundedLg
    <> textXs
    <> shadowLg
    <> borderCol gray._200
    <> overflowHidden

resultContainer ∷ Style
resultContainer = pY 2 <> cursorPointer <> overflowHidden

item ∷ Style
item =
  focus
    ( background' col.highlight
        <> textCol' col.highlightText
        <> outlineNone
    )
