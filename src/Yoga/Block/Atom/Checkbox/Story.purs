module Yoga.Block.Atom.Checkbox.Story (default, checkbox) where

import Prelude hiding (div)

import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga ((</>))
import Yoga.Block.Atom.Checkbox.View as Checkbox
import Yoga.Block.Container.Style as Styles

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