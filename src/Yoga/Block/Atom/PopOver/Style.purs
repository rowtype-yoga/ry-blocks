module Yoga.Block.Atom.PopOver.Style where

import Yoga.Prelude.Style

popOverStyle ∷ Style
popOverStyle =
  roundedXl
    <> shadowLg
    <> border 1
    <> borderBottom 0
    <>
      ( borderGradient
          { borderGradient: linearGradientString' 90
              [ colourWithDarkLightAlpha.backgroundInverted
                  { darkAlpha: 0.18, lightAlpha: 0.0 }
              , colourWithDarkLightAlpha.backgroundInverted
                  { darkAlpha: 0.45, lightAlpha: 0.0 }
              , colourWithDarkLightAlpha.backgroundInverted
                  { darkAlpha: 0.18, lightAlpha: 0.0 }
              ]
          , backgroundGradient: linearGradientString' 0
              [ colourWithAlpha.backgroundBright2 0.99
              , colourWithAlpha.backgroundBright2 0.99
              ]
          }
      )

popOverSeparatorCol ∷ String
popOverSeparatorCol =
  colour.backgroundLayer3

popOverSelection ∷ Style
popOverSelection = background' $ str $ colourWithDarkLightAlpha.highlight
  { darkAlpha: 0.2, lightAlpha: 0.2 }
