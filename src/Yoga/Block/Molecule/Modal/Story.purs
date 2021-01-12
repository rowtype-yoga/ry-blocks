module Yoga.Block.Molecule.Modal.Story where

import Prelude
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Yoga as Y
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Modal as Modal

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Molecule/Modal"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

modal ∷ Effect JSX
modal = do
  pure $ React.element compo {}
  where
  compo =
    unsafePerformEffect
      $ reactComponent "Modal Story" \{} -> React.do
          isOpen /\ setIsOpen <- React.useState' true
          pure
            $ fragment
                [ R.h2_ [ R.text "No Options" ]
                , Y.el R.button'
                    { onClick: handler_ (setIsOpen true)
                    }
                    [ R.text "Show Modal"
                    ]
                , element Modal.component
                    { content:
                      Y.el Block.box {} [ R.text "hi" ]
                    , isOpen
                    , setIsOpen
                    }
                ]
