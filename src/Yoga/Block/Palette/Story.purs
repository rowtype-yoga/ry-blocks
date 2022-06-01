module Yoga.Block.Palette.Story (default, box) where

import Prelude
import Color (Color, cssStringRGBA, isLight)
import Data.Symbol (class IsSymbol, reflectSymbol)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Prim.Row (class Cons)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Record as Record
import Type.Prelude (Proxy(..))
import Yoga ((/>), (</))
import Yoga.Block as Block
import Yoga.Block.Container.Style as Style
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Palette (ColourVariants)
import Yoga.Block.Palette as Palette

default
  ∷ { decorators ∷ Array (Effect JSX -> JSX)
    , title ∷ String
    }
default =
  { title: "Palette"
  , decorators:
      [ \storyFn ->
          R.div_
            [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
      ]
  }

box ∷ Effect JSX
box =
  pure
    $ fragment
        [ Block.grid { min: "100px" }
            $ colourBoxes "Pink" Palette.pink
                <> colourBoxes "Mauve" Palette.mauve
                <> colourBoxes "Violet" Palette.violet
                <> colourBoxes "Blue" Palette.blue
                <> colourBoxes "Azure" Palette.azure
                <> colourBoxes "Capri" Palette.capri
                <> colourBoxes "Sea Green" Palette.seaGreen
                <> colourBoxes "Malachite" Palette.malachite
                <> colourBoxes "Yellow" Palette.yellow
                <> colourBoxes "Mango" Palette.mango
        ]

colourBoxes ∷ String -> ColourVariants -> Array JSX
colourBoxes name colours =
  [ colourBox name (Proxy ∷ _ "regular") colours
  , colourBox name (Proxy ∷ _ "darker") colours
  , colourBox name (Proxy ∷ _ "dark") colours
  ]

colourBox
  ∷ ∀ t14 t15 colourVariant
   . IsSymbol colourVariant
  => Cons colourVariant Color t15 t14
  => String
  -> Proxy colourVariant
  -> Record t14
  -> JSX
colourBox name proxy colours =
  Box.component
    </
      { background: cssStringRGBA colour
      , css: E.css { color: E.str if isLight colour then "black" else "white" }
      , borderRadius: E.var "--s0"
      , boxShadow: E.str $ "0 1px 6px " <> Style.colour.boxShadow
      }
    /> [ R.text (name <> " (" <> reflectSymbol proxy <> ")") ]
  where
  colour = Record.get proxy colours
