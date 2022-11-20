module Yoga.Block.Quark.ClickAway.Style where

import Yoga.Prelude.Style

clickAway ∷ Style
clickAway =
  widthScreen
    <> heightScreen
    <> positionFixed
    <> left zero
    <> top zero
    <> acceptClicks
