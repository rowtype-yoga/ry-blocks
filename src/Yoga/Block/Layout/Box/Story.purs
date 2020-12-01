module Yoga.Block.Layout.Box.Story where

import Prelude
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Container.Style as Styles
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Layout/Box"
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
        [ element Box.component
            { children: [ R.text "Default" ]
            }
        ]
