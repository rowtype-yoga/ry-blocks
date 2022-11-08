module Story.Yoga.Block.Atom.Input (default, input) where

import Prelude hiding (div)

import Data.Maybe (Maybe(..))
import Data.String.NonEmpty as NES
import Foreign.Object as Object
import Literals.Undefined (undefined)
import React.Basic (element)
import React.Basic as React
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Storybook (Meta, Story, meta, metaDecorator, story)
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Union (maybeToUor)
import Yoga.Block.Atom.Input.View as Input
import Yoga.Block.Container.Style as Styles

default ∷ Meta
default = meta
  { title: "Atom/Input"
  , component: pure $ React.element Input.rawComponent
  , tags: [ "docsPage" ]
  , decorators:
      [ metaDecorator \storyFn ->
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

deleteEmptyString :: String -> String
deleteEmptyString string = if string == "" then string else undefined # unsafeCoerce

-- A normal input
input ∷ Story
input = story
  { render: \input' args -> input'
      { value: args.text # deleteEmptyString
      , disabled: args.disabled
      , label: NES.fromString args.label # maybeToUor # unsafeCoerce
      , placeholder: (if args.placeholder == "" then Nothing else Just args.placeholder) # maybeToUor # unsafeCoerce
      , _aria: if args.required then Object.singleton "required" "true" else mempty
      , forceSmallLabel: args.forceSmallLabel
      }
  , component: pure $ React.element Input.component
  , args:
      { text: "Input"
      , disabled: false
      , label: ""
      , placeholder: ""
      , required: false
      , forceSmallLabel: false
      }
  , argTypes
  }

  where

  argTypes = { text, disabled, label, required, placeholder, forceSmallLabel }
    where
    text =
      { name: "children"
      , type: { name: "Array JSX", required: false }
      , defaultValue: "Input"
      , description: "The text or other content to display in the button."
      , table: { type: { summary: "Array JSX" }, defaultValue: { summary: "[]" } }
      , control: { type: "text" }
      }
    label =
      { name: "label"
      , type: { name: "String", required: false }
      , description: "The label of the input"
      , control: { type: "text" }
      }
    placeholder =
      { name: "placeholder"
      , type: { name: "String", required: false }
      , description: "The text that is displayed while the input is empty of the input"
      , control: { type: "text" }
      }
    disabled =
      { name: "disabled"
      , type: { name: "Boolean", required: false }
      , defaultValue: "false"
      , description: "Whether the button can be focused and activated"
      , table: { type: { summary: "Array JSX" }, defaultValue: { summary: "[]" } }
      , control: { type: "boolean" }
      }
    required =
      { name: "required"
      , type: { name: "Boolean", required: false }
      , defaultValue: "false"
      , description: "Whether the input is required"
      , table: { type: { summary: "Object.singleton \"required\"" }, defaultValue: { summary: "false" } }
      , control: { type: "boolean" }
      }
    forceSmallLabel =
      { name: "forceSmallLabel"
      , type: { name: "Boolean", required: false }
      , defaultValue: "false"
      , description: "Whether the label is always small in the corner"
      , control: { type: "boolean" }
      }
