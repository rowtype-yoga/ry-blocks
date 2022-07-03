module Yoga.Block.Atom.Checkbox.Story (default, checkbox) where

import Prelude hiding (div)

import Color (cssStringRGBA)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Fahrtwind as F
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion (str)
import React.Basic.Emotion as E
import Yoga ((</>))
import Yoga.Block as Block
import Yoga.Block.Atom.Button.Types as ButtonType
import Yoga.Block.Atom.Checkbox.View as Checkbox
import Yoga.Block.Container.Style (colour, size)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Icon.SVG as Icon
import Yoga.Block.Internal.CSS (nest)

default
  ∷ { decorators ∷ Array (Effect JSX -> JSX)
    , title ∷ String
    }
default =
  { title: "Atom/Checkbox"
  , decorators:
      [ \storyFn ->
          R.div_
            [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
      ]
  }

checkbox ∷ Effect JSX
checkbox = do
  pure $ Checkbox.component </> {}