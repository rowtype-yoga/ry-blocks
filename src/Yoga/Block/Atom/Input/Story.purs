module Yoga.Block.Atom.Input.Story where

import Prelude
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Container.Style as Styles

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Input"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

input ∷ Effect JSX
input = do
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Generic Input" ]
            , element Input.component { value: "A Generic Input", onChange: handler_ mempty }
            , R.h2_ [ R.text "Password" ]
            , element Input.component { type: "password" }
            , R.h2_ [ R.text "Text Input" ]
            , element Input.component { type: "text", value: "Some text", onChange: handler_ mempty }
            , R.h2_ [ R.text "Search Input" ]
            , element Input.component { type: "search", value: "Search...", onChange: handler_ mempty }
            , R.h2_ [ R.text "Button" ]
            , element Input.component { type: "button", value: "A button", onChange: handler_ mempty }
            , R.h2_ [ R.text "Submit" ]
            , element Input.component { type: "submit" }
            , R.h2_ [ R.text "Radio" ]
            , element Input.component { type: "radio" }
            , R.h2_ [ R.text "Checkbox" ]
            , element Input.component { type: "checkbox" }
            , R.h2_ [ R.text "File" ]
            , element Input.component { type: "file" }
            , R.h2_ [ R.text "Image" ]
            , element Input.component { type: "image" }
            , R.h2_ [ R.text "Number" ]
            , element Input.component { type: "number" }
            ]
        ]
