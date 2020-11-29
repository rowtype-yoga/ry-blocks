module Components.Modal.Story where

import Prelude
import Components.Container.Style as Styles
import Components.Modal as Modal
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Literals.Undefined (undefined)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import React.Basic.Hooks as React
import Untagged.Coercible (coerce)
import Yoga as RY
import Yoga as Y
import Yoga.Block as Block

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
      RY.reactComponent "Modal Story" \{} -> React.do
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
                    element Block.box { kids: [ R.text "Hi" ], nodeRef: coerce undefined }
                  , isOpen
                  , setIsOpen
                  }
              ]
