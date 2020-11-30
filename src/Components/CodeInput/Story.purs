module Components.CodeInput.Story where

import Prelude
import Components.CodeInput as CodeInput
import Components.Container.Style as Styles
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
  { title: "Atom/CodeInput"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

codeInput ∷ Effect JSX
codeInput =
  pure
    $ fragment
        [ element CodeInput.component
            {}
        , element CodeInput.component
            { maxLength: 3 }
        ]
