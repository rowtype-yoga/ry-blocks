module Yoga.Block.Atom.Tooltip.Story where

import Prelude
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga (el)
import Yoga.Block.Atom.Tooltip as Tooltip
import Yoga.Block.Container.Style as Styles

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Tooltip"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

tooltip ∷ Effect JSX
tooltip = do
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Basics" ]
            , element Tooltip.component
                { theTip: R.text "Hi"
                , target: el R.button' {} [ R.text "Holzkop" ]
                }
            ]
        ]
