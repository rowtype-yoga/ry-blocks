module Yoga.Block.Quark.Layer.Style where

import Yoga.Prelude.Style

fixed ∷ Style
fixed =
  positionFixed
    <> widthScreen
    <> heightScreen
    <> top 0
    <> left 0
    <> ignoreClicks
