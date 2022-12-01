module Story.Yoga.Block.Organism.Form where

import Prelude

import Data.Lens.Record (prop)
import Data.Maybe (Maybe(..))
import Data.String.NonEmpty (NonEmptyString, nes)
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.DOM.Events (preventDefault)
import React.Basic.Emotion as E
import React.Basic.Events (handler)
import React.Basic.Hooks (reactComponent, useState')
import React.Basic.Hooks as React
import Type.Prelude (Proxy(..))
import Yoga ((/>), (</), (</>))
import Yoga.Block as Block
import Yoga.Block.Atom.Input.Hook.UseTypingPlaceholders (useTypingPlaceholders)
import Yoga.Block.Atom.Input.Style (SizeVariant(..))
import Yoga.Block.Atom.Input.Types as InputType
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal (NodeRef)
import Yoga.Block.Organism.Form (FormBuilder, Validated(..), formDefaults)
import Yoga.Block.Organism.Form as Form
import Yoga.Block.Organism.Form.Types (RequiredField(..))

default ∷
  { decorators ∷ Array (Effect JSX → JSX)
  , title ∷ String
  }
default =
  { title: "Organism/Form"
  , decorators:
      [ \storyFn →
          Block.container
            </ {}
            />
              [ element E.global { styles: Styles.global }
              , unsafePerformEffect storyFn
              ]
      ]
  }

type User =
  { firstName ∷ Form.Validated String
  , lastName ∷ Form.Validated String
  , tags ∷ Array (Form.Validated String)
  , isAdmin ∷ Boolean
  , friends ∷ Array Friend
  }

type ValidUser =
  { firstName ∷ NonEmptyString
  , lastName ∷ NonEmptyString
  , isAdmin ∷ Boolean
  , tags ∷ Array NonEmptyString
  , friends ∷ Array ValidFriend
  }

type Friend =
  { nickname ∷ Form.Validated String
  , age ∷ Form.Validated String
  }

type ValidFriend =
  { nickname ∷ NonEmptyString
  , age ∷ Int
  }

form ∷ Effect JSX
form = do
  example ← mkExample
  pure $ example </> {}
  where
  mkExample =
    reactComponent "FormExample" \_ → React.do
      inputRef ← useTypingPlaceholders "First name"
        [ "Type in your given name", "WAAAAARUMÄ" ]
      _userDialog /\ setUserDialog ← useState' Nothing
      { setModified, reset: _reset, validated, form } ←
        Form.useForm (userForm inputRef)
          { initialState: formDefaults
          , formProps:
              { readOnly: false
              }
          }
      pure
        $ fragment
            [ R.form -- Forms should be enclosed in a single "<form>" element to enable
                -- default browser behavior, such as the enter key. Use "type=submit"
                -- on the form's submit button and `preventDefault` to keep the browser
                -- from reloading the page on submission.
                { onSubmit:
                    handler preventDefault \_ → case validated of
                      Nothing → do
                        setModified
                      Just { firstName, lastName } → setUserDialog $ Just
                        { firstName, lastName }
                , style: R.css { alignSelf: "stretch" }
                , children: [ form ]
                }
            , R.text $ show validated
            ]
    where
    tagsForm ∷
      ∀ props.
      FormBuilder { readOnly ∷ Boolean | props } (Form.Validated String)
        NonEmptyString
    tagsForm =
      Form.validated
        ( Form.nonEmpty' "You need to provide some tags"
        )
        $ Form.inputBox (nes (Proxy ∷ _ "Tag")) Required
            { placeholder: "Tag" }

    friendForm ∷
      ∀ props. FormBuilder { readOnly ∷ Boolean | props } Friend ValidFriend
    friendForm = ado
      nickname ←
        Form.focus (prop (Proxy ∷ _ "nickname"))
          $ Form.validated (Form.nonEmpty "Nickname")
          $ Form.inputBox (nes (Proxy ∷ _ "Nickname")) Required
              { placeholder: "for example Eddy..." }
      age ←
        Form.focus (prop (Proxy ∷ _ "age"))
          $ Form.validated
              (Form.validNatBetween (Proxy ∷ _ "18") (Proxy ∷ _ "69") "Age")
          $ Form.inputBox (nes (Proxy ∷ _ "Age")) Required
              { placeholder: "for example 78..."
              , min: "1"
              , max: (show (top ∷ Int))
              , type: InputType.Number
              }
      in { nickname, age }

    userForm ∷
      ∀ props.
      NodeRef →
      FormBuilder { readOnly ∷ Boolean | props } User ValidUser
    userForm inputRef = ado
      firstName ←
        Form.focus (prop (Proxy ∷ _ "firstName"))
          $ Form.validated (Form.nonEmpty' "You must have a first name")
          $ Form.labelledInputBox
              { label: (nes (Proxy ∷ _ "First Name"))
              , id: "Heinz"
              }
              Required
              { id: "firstName", inputRef }
      lastName ←
        Form.focus (prop (Proxy ∷ _ "lastName"))
          $ Form.validated
              ( Form.nonEmpty'
                  "I am telling you now for the very last time that you need to make sure Last name is provided to me so I can create a user for you"
              )
          $ Form.inputBox (nes (Proxy ∷ _ "Last Name")) Required
              { placeholder: "Last name"
              }
      lastName2 ←
        Form.focus (prop (Proxy ∷ _ "lastName"))
          $ Form.validated
              ( Form.nonEmpty'
                  "I am telling you now for the very last time that you need to make sure Last name is provided to me so I can create a user for you"
              )
          $ Form.inputBox (nes (Proxy ∷ _ "gast yame")) Required
              { placeholder: "Last name"
              , sizeVariant: SizeSmall
              }
      lastName3 ←
        Form.focus (prop (Proxy ∷ _ "lastName"))
          $ Form.validated
              ( Form.nonEmpty'
                  "I am telling you now for the very last time that you need to make sure Last name is provided to me so I can create a user for you"
              )
          $ Form.inputBox (nes (Proxy ∷ _ "gajt yamT")) Required
              { placeholder: "Last name"
              , sizeVariant: SizeTiny
              }
      tags ←
        Form.indent "Tags" Neither
          $ Form.focus (prop (Proxy ∷ _ "tags"))
          $ Form.sortableArray
              { label: "Tag"
              , addLabel: "Add Tag"
              , defaultValue: formDefaults
              , editor: tagsForm
              }
      friends ←
        Form.indent "Friends" Neither
          $ Form.focus (prop (Proxy ∷ _ "friends"))
          $ Form.array
              { label: "Friends"
              , addLabel: "Add Friend"
              , defaultValue: { nickname: Fresh "", age: Fresh "" }
              , editor: friendForm
              }
      isAdmin ←
        Form.indent "Admin?" Neither
          $ Form.focus (prop (Proxy ∷ _ "isAdmin"))
          $ Form.toggle {}
      in { firstName, lastName, isAdmin, friends, tags }
