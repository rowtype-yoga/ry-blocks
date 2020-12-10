module Yoga.Block.Atom.CodeInput.Story where

import Prelude
import Control.Monad.Maybe.Trans (lift, runMaybeT)
import Data.Foldable (traverse_)
import Data.Newtype (wrap)
import Data.Nullable as Nullable
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, elementKeyed, fragment)
import React.Basic.DOM as R
import React.Basic.DOM.Events (targetValue)
import React.Basic.Emotion as E
import React.Basic.Events (handler)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Web.HTML.HTMLElement (focus)
import Web.HTML.HTMLElement as HTMLElement
import Yoga.Block.Atom.CodeInput as CodeInput
import Yoga.Block.Container.Style as Styles

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
codeInput = do
  pure
    $ fragment
        [ R.h2_ [ R.text "No Options" ]
        , element CodeInput.component
            {}
        , element CodeInput.component
            { maxLength: 3 }
        , React.element refCompo {}
        , React.element controlled {}
        ]
  where
    refCompo =
      unsafePerformEffect
        $ reactComponent "Code Input Story" \{} -> React.do
            ref <- React.useRef Nullable.null
            React.useEffectAlways
              $ do
                  _ <-
                    runMaybeT do
                      node <- React.readRefMaybe ref # wrap
                      elem <- HTMLElement.fromNode node # pure # wrap
                      focus elem # lift
                  mempty
            pure
              $ fragment
                  [ R.h2_ [ R.text "With Ref" ]
                  , element CodeInput.component
                      { ref
                      }
                  ]

    controlled =
      unsafePerformEffect
        $ reactComponent "Code Input Controlled Story" \{} -> React.do
            text /\ setText <- React.useState' ""
            pure
              $ fragment
                  [ R.h2_ [ R.text "Controlled" ]
                  , elementKeyed CodeInput.component
                      { value: text
                      , onChange: handler targetValue (traverse_ setText)
                      , key: "robinson-crusoe"
                      }
                  ]
