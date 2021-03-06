module Yoga.Block.Atom.Input.Story where

import Prelude
import Data.Foldable (traverse_)
import Data.String.NonEmpty.Internal (NonEmptyString(..), nes)
import Data.Symbol (SProxy(..))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.DOM.Events (targetValue)
import React.Basic.Emotion as E
import React.Basic.Events (handler, handler_)
import React.Basic.Hooks (reactComponent, (/\))
import React.Basic.Hooks as React
import Type.Proxy (Proxy(..))
import Yoga ((</>))
import Yoga.Block as Block
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Atom.Input.Types as HTMLInput
import Yoga.Block.Atom.Input.View (passwordIcon)
import Yoga.Block.Container.Style (colour)
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
            [ R.h1_ [ R.text "Input Examples" ]
            , R.h3_ [ R.text "With a label" ]
            , Block.cluster {}
                [ element Input.component { label: nes (SProxy ∷ _ "This has a label"), value: "And text", onChange: handler_ mempty }
                , element Input.component { label: nes (SProxy ∷ _ "This has a label"), value: "", onChange: handler_ mempty }
                , element Input.component { label: nes (SProxy ∷ _ "This has a label"), placeholder: "A very long placeholder, too..." }
                , element Input.component { label: nes (SProxy ∷ _ "Pig nose"), leading: R.text "🐽🤣" }
                , element Input.component { label: nes (SProxy ∷ _ "Pig nose"), trailing: R.text "🤫" }
                , element Input.component { label: nes (SProxy ∷ _ "Pig nose"), leading: R.text "🌭" }
                , Block.box
                    { background: colour.backgroundLayer3
                    }
                    [ element Input.component
                        { label: nes (SProxy ∷ _ "Different background")
                        , leading: R.text "🌭"
                        , forceSmallLabel: true
                        }
                    ]
                , Block.box
                    { background: colour.backgroundLayer1
                    }
                    [ element Input.component
                        { label: nes (SProxy ∷ _ "Another background")
                        , background: colour.backgroundLayer3
                        , textColour: "blue"
                        , placeholderColour: colour.backgroundLayer4
                        , leading: R.text "🌭"
                        }
                    ]
                , element Input.component { label: nes (SProxy ∷ _ "Pig nose"), leading: R.text "⭐", trailing: R.text "🔮" }
                ]
            , R.h2_ [ R.text "Generic Input" ]
            , Input.component </> { value: "A Generic Input", onChange: handler_ mempty }
            , R.h2_ [ R.text "Validation on text Input" ]
            , element Input.component { type: HTMLInput.Text, label: nes (SProxy ∷ _ "Is undefined a function?"), value: "Yes, why not?", onChange: handler_ mempty, _aria: Object.singleton "invalid" "true" }
            , element Input.component { type: HTMLInput.Text, label: nes (SProxy ∷ _ "What's the type of null?"), value: "object", onChange: handler_ mempty, _aria: Object.singleton "invalid" "false" }
            , R.h2_ [ R.text "Required fields" ]
            , element Input.component
                { type: HTMLInput.Text
                , label: nes (SProxy ∷ _ "I am so important")
                , _aria: Object.singleton "required" "true"
                }
            , R.h2_ [ R.text "Overflowing label" ]
            , element Input.component
                { type: HTMLInput.Text
                , label: nes (SProxy ∷ _ "Is undefined really a function?")
                }
            , Input.component </> { type: HTMLInput.Text, label: nes (SProxy ∷ _ "Now this is really just excessively long and you should avoid it.") }
            , Input.component
                </> { css: E.css { width: E.str "500px" }
                  , type: HTMLInput.Text
                  , label: nes (SProxy ∷ _ "You can avoid this problem by setting a custom width")
                  }
            , R.h2_ [ R.text "Password" ]
            , passComponent </> {}
            , R.h2_ [ R.text "Text Input" ]
            , element Input.component { type: HTMLInput.Text, value: "Some text", onChange: handler_ mempty }
            , element Input.component { type: HTMLInput.Text, placeholder: "Placeholder", onChange: handler_ mempty }
            , element Input.component { type: HTMLInput.Text, value: "", label: NonEmptyString "Heinzi", onChange: handler_ mempty }
            , R.h2_ [ R.text "Search Input" ]
            , element Input.component { type: HTMLInput.Search, placeholder: "Search...", onChange: handler_ mempty }
            -- , element Input.component { type: "submit" }
            -- , R.h2_ [ R.text "Radio" ]
            -- , element Input.component { type: "radio" }
            -- , R.h2_ [ R.text "Checkbox" ]
            -- , element Input.component { type: "checkbox" }
            -- , R.h2_ [ R.text "File" ]
            -- , element Input.component { type: "file" }
            -- , R.h2_ [ R.text "Image" ]
            -- , element Input.component { type: "image" }
            -- , R.h2_ [ R.text "Number" ]
            -- , element Input.component { type: "number" }
            ]
        ]
  where
  passComponent =
    unsafePerformEffect
      $ reactComponent "Password Example" do
          \{} -> React.do
            password /\ setPassword <- React.useState' ""
            hidePassword /\ modifyHidePassword <- React.useState true
            pure
              $ Input.component
              </> { type: if hidePassword then HTMLInput.Password else HTMLInput.Text
                , trailing:
                  Block.tooltip
                    </> { target: passwordIcon </> { hidePassword, modifyHidePassword }, theTip: R.text if hidePassword then "Show Password" else "Hide Password"
                      }
                , value: password
                , onChange: handler targetValue (traverse_ setPassword)
                , label: nes (Proxy ∷ _ "Password")
                }
