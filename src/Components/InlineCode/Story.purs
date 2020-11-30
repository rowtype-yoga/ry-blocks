module Components.InlineCode.Story where

import Prelude
import Components.InlineCode as InlineCode
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
  { title: "Atom/InlineCode"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

inlineCode ∷ Effect JSX
inlineCode =
  pure
    $ fragment
        [ element InlineCode.component
            {}
        ]
