module Yoga.Block.Molecule.Modal.Story where

import Prelude
import Data.Foldable (foldMap)
import Data.Maybe (Maybe(..), isNothing)
import Data.String.NonEmpty.Internal (NonEmptyString(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import React.Basic.Hooks (reactComponent, useEffectAlways)
import React.Basic.Hooks as React
import Web.DOM (Element)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toNonElementParentNode)
import Web.HTML.Window (document)
import Yoga as Y
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Molecule.Modal as Modal

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
          maybeModalElement /\ setModalElement <- React.useState' Nothing
          useEffectAlways do
            when (isNothing maybeModalElement) do
              container <- getElementById "modal-container" =<< (map toNonElementParentNode $ document =<< window)
              setModalElement container
            mempty
          pure
            $ fragment
                [ R.h2_ [ R.text "No Options" ]
                , Y.el R.button'
                    { onClick: handler_ (setIsOpen true)
                    }
                    [ R.text "Show Modal"
                    ]
                , R.div { id: "modal-container" }
                , maybeModalElement
                    # foldMap \(modalElement ∷ Element) ->
                        element Modal.component
                          { content:
                            Y.el Block.box {} [ Y.leaf Block.input { label: NonEmptyString "hi" } ]
                          , isOpen
                          , setIsOpen
                          , target: modalElement
                          }
                ]
