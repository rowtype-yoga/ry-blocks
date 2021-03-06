module Yoga.Block.Palette where

import Prelude
import Color (Color, brightness, cssStringRGBA, darken, desaturate, hsl, rgba, rotateHue, saturate)
import Data.Array (intercalate)
import Yoga.Block.Container.Style (withAlpha)

type ColourVariants =
  { regular ∷ Color, darker ∷ Color, dark ∷ Color }

pink ∷ ColourVariants
pink =
  { regular
  , darker: regular # darken 0.1 >>> desaturate 0.15
  , dark: regular # darken 0.18 >>> desaturate 0.3
  }
  where
  regular = hsl 350.0 0.8 0.68

mauve ∷ ColourVariants
mauve = { regular, darker: darken 0.1 regular, dark: darken 0.2 regular }
  where
  regular = hsl 293.0 0.63 0.68

violet ∷ ColourVariants
violet = { regular, darker: darken 0.1 regular, dark: darken 0.2 regular }
  where
  regular = hsl 263.0 1.0 0.73

blue ∷ ColourVariants
blue =
  { regular
  , darker: darken 0.05 regular
  , dark: darken 0.1 regular
  }
  where
  regular = hsl 242.0 1.0 0.68

azure ∷ ColourVariants
azure = { regular, darker: darken 0.1 regular, dark: darken 0.2 regular }
  where
  regular = hsl 213.0 1.0 0.56

capri ∷ ColourVariants
capri = { regular, darker: darken 0.1 regular, dark: darken 0.2 regular }
  where
  regular = hsl 195.0 1.0 0.49

seaGreen ∷ ColourVariants
seaGreen =
  { regular
  , darker: hsl 175.0 0.92 0.3
  , dark: hsl 185.0 1.0 0.2
  }
  where
  regular = hsl 170.0 0.84 0.45

malachite ∷ ColourVariants
malachite = { regular, darker: darken 0.1 regular, dark: darken 0.18 regular }
  where
  regular = hsl 147.0 0.78 0.50

yellow ∷ ColourVariants
yellow =
  { regular
  , darker: regular # darken 0.1 # saturate 0.4
  , dark: darken 0.14 regular # desaturate 0.1 # rotateHue (-8.0)
  }
  where
  regular = hsl 54.0 0.93 0.54

mango ∷ ColourVariants
mango =
  { regular
  , darker: darken 0.12 regular # desaturate 0.1
  , dark: darken 0.15 regular # desaturate 0.18
  }
  where
  regular = hsl 33.0 1.0 0.62

coral ∷ ColourVariants
coral =
  { regular
  , darker: darken 0.1 regular # desaturate 0.3
  , dark: darken 0.15 regular # desaturate 0.4
  }
  where
  regular = hsl 10.0 1.0 0.72

transparentBlack ∷ Color
transparentBlack = rgba 0 0 0 0.0

transparentWhite ∷ Color
transparentWhite = rgba 255 255 255 0.0

shady ∷ Color
shady = rgba 0 0 0 0.2

highlighty ∷ Color
highlighty = rgba 255 255 255 0.3

gradientBox ∷ Color -> String
gradientBox = transparentGradientBox 1.0

transparentGradientBox ∷ Number -> Color -> String
transparentGradientBox alpha c =
  intercalate ","
    [ gr 180 [ transparentBlack, shady # withAlpha (min 0.2 alpha) ]
    , gr (140) [ highlighty # withAlpha (min 0.3 alpha), transparentWhite, transparentWhite, transparentWhite, transparentWhite, transparentWhite ]
    , gr (-15) ([ darker, lighter ] <#> withAlpha alpha)
    ]
  where
  rotatedForwards = rotateHue 8.0 c

  rotatedBackwards = rotateHue (-8.0) c

  { darker, lighter } =
    if brightness rotatedForwards < brightness rotatedBackwards then
      { darker: rotatedForwards, lighter: rotatedBackwards }
    else
      { darker: rotatedBackwards, lighter: rotatedForwards }

  gr deg x =
    "linear-gradient(" <> show deg <> "deg, "
      <> intercalate "," (cssStringRGBA <$> x)
      <> ")"
