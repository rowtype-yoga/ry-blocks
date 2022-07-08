module Yoga.Block.Molecule.Sheet.Story where

import Prelude
import Data.Monoid (power)
import Data.Time.Duration (Seconds(..), fromDuration)
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Aff (delay, launchAff_)
import Effect.Class (liftEffect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Yoga ((/>))
import Yoga.Block as Block
import Yoga.Block.Atom.Button.Types as ButtonType
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Molecule.Sheet as Sheet

default
  ∷ { decorators ∷ Array (Effect JSX -> JSX)
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
          text /\ setText <- React.useState' "In order to spy on you we need your consent. Will you give it?"
          isOpen /\ setIsOpen <- React.useState' true
          pure
            $ fragment
                [ R.h2_ [ R.text "No Options" ]
                , R.div { id: "modal-container" }
                , element Sheet.component
                    { header: R.h2_ [ R.text "Would you like us to track you?" ]
                    , footer: Block.cluster { justify: "flex-end", space: "var(--s-1)" }
                        />
                          [ Block.button
                              { buttonType: ButtonType.Primary
                              , onClick:
                                  handler_ do
                                    launchAff_ do
                                      delay (fromDuration $ (2.0 # Seconds))
                                      liftEffect do
                                        setText "Thanks, that's very nice of you"
                                        setIsOpen true
                                    setIsOpen false
                              }
                              [ R.text "Yes" ]
                          , Block.button
                              { buttonType: ButtonType.Dangerous
                              , onClick:
                                  handler_ do
                                    launchAff_ do
                                      delay (fromDuration $ (2.0 # Seconds))
                                      liftEffect do
                                        setText (power "Oh, but please! " 200)
                                        setIsOpen true
                                    setIsOpen false
                              }
                              [ R.text "No" ]
                          ]

                    , content: R.p_ [ R.text text ]
                    , isOpen
                    , onDismiss:
                        do
                          launchAff_ do
                            delay (fromDuration $ (0.8 # Seconds))
                            liftEffect do
                              setText "Please answer the question"
                              setIsOpen true
                          setIsOpen false
                    , target: "modal-container"
                    }
                ]
