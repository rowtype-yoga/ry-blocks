module Yoga.Block.Molecule.Sheet.Story where

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
import Yoga ((/>), (</), (</>))
import Yoga as Y
import Yoga.Block as Block
import Yoga.Block.Atom.Button.Types as ButtonType
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Molecule.Sheet as Sheet

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Molecule/Sheet"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

sheet ∷ Effect JSX
sheet = do
  pure $ React.element compo {}
  where
  compo =
    unsafePerformEffect
      $ reactComponent "Sheet Story" \{} -> React.do
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
                    [ R.text "Show Sheet"
                    ]
                , R.div { id: "modal-container" }
                , maybeModalElement
                    # foldMap \(modalElement ∷ Element) ->
                        element Sheet.component
                          { content:
                            Block.stack </ {}
                              /> [ R.text "Who are you?"
                                , Block.cluster </ { justify: "flex-end" }
                                    /> [ Block.button </ {} /> [ R.text "hi" ]
                                      , Block.button
                                          </ { buttonType: ButtonType.Dangerous, onClick: handler_ (setIsOpen false)
                                            }
                                          /> [ R.text "Close" ]
                                      ]
                                ]
                          , isOpen
                          , onDismiss: setIsOpen false
                          , target: modalElement
                          }
                ]
