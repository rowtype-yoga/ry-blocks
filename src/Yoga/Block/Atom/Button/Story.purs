module Yoga.Block.Atom.Button.Story where

import Prelude
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import Yoga.Block.Atom.Button.View as Button
import Yoga.Block.Container.Style as Styles
import Yoga ((</), (/>))

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Button"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

button ∷ Effect JSX
button = do
  pure
    $ fragment
        [ R.div_
            [ R.h1_ [ R.text "Button Examples" ]
            , R.h2_ [ R.text "Generic Button" ]
            , Button.component </ { onClick: handler_ mempty } /> [ R.text "Click" ]
            ]
        ]
