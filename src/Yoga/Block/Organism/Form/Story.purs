module Yoga.Block.Organism.Form.Story where

import Prelude
import Data.Lens.Record (prop)
import Data.Maybe (Maybe(..))
import Data.String.NonEmpty (NonEmptyString, nes)
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.DOM.Events (preventDefault)
import React.Basic.Emotion as E
import React.Basic.Events (handler)
import React.Basic.Hooks (reactComponent, useState, useState')
import React.Basic.Hooks as React
import Type.Prelude (Proxy(..))
import Yoga ((</>))
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Organism.Form (FormBuilder, formDefaults)
import Yoga.Block.Organism.Form as Form
import Yoga.Block.Organism.Form.Types (RequiredField(..))

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Organism/Form"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

type User =
  { firstName ∷ Form.Validated String
  , lastName ∷ Form.Validated String
  }

type ValidUser =
  { firstName ∷ NonEmptyString
  , lastName ∷ NonEmptyString
  }

aForm ∷ Effect JSX
aForm = do
  example <- mkExample
  pure $ example </> {}
  where
  mkExample =
    reactComponent "FormExample" \_ -> React.do
      userDialog /\ setUserDialog <- useState' Nothing
      { setModified, reset, validated, form } <-
        Form.useForm userForm
          { initialState: formDefaults
          , inlineTable: false
          , formProps:
            { readOnly: false
            }
          }
      pure
        $ R.form -- Forms should be enclosed in a single "<form>" element to enable
            -- default browser behavior, such as the enter key. Use "type=submit"
            -- on the form's submit button and `preventDefault` to keep the browser
            -- from reloading the page on submission.
            { onSubmit:
              handler preventDefault \_ -> case validated of
                Nothing -> do
                  setModified
                Just { firstName, lastName } -> setUserDialog $ Just { firstName, lastName }
            , style: R.css { alignSelf: "stretch" }
            , children: [ form ]
            }
    where
    userForm ∷ ∀ props. FormBuilder { readOnly ∷ Boolean | props } User ValidUser
    userForm = ado
      firstName <-
        Form.focus (prop (Proxy ∷ _ "firstName"))
          $ Form.validated (Form.nonEmpty "First name")
          $ Form.inputBox (nes (Proxy ∷ _ "First Name")) Required
              { placeholder: "First name" }
      lastName <-
        Form.focus (prop (Proxy ∷ _ "lastName"))
          $ Form.validated (Form.nonEmpty "Last name")
          $ Form.inputBox (nes (Proxy ∷ _ "Last Name")) Required
              { placeholder: "Last name"
              }
      in { firstName, lastName }
