module Yoga.Block.Molecule.Modal.Style where

import Yoga.Prelude.Style

clickAway ∷ Style
clickAway =
  widthScreen
    <> heightScreen
    <> positionFixed
    <> left zero
    <> top zero
    <> acceptClicks

modal ∷ Style
modal = acceptClicks
