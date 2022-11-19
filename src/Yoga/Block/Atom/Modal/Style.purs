module Yoga.Block.Atom.Modal.Style where

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
modal =
  positionFixed
    <> left' (50.0 # percent)
    <> top zero
    <> translate "-50%" "0"
    <> acceptClicks
