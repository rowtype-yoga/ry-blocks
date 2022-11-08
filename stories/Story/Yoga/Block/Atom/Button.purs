module Story.Yoga.Block.Atom.Button (default, button, customButton1, customButton2) where

import Prelude hiding (div)

import Color (cssStringRGBA)
import Data.Enum (class BoundedEnum)
import Data.Enum as Enum
import Data.Maybe (fromJust)
import Data.String.CodeUnits as String
import Fahrtwind as F
import Partial.Unsafe (unsafePartial)
import Prelude as Bounded
import React.Basic (element)
import React.Basic as React
import React.Basic.DOM as R
import React.Basic.Emotion (str)
import React.Basic.Emotion as E
import Storybook (Meta, Story, meta, metaDecorator, simpleStory, story)
import Type.Proxy (Proxy(..))
import Yoga.Block.Atom.Button.Types (ButtonShape, ButtonType)
import Yoga.Block.Atom.Button.Types as ButtonShape
import Yoga.Block.Atom.Button.Types as ButtonType
import Yoga.Block.Atom.Button.View as Button
import Yoga.Block.Container.Style (colour, size)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal.CSS (nest)
import Yoga.JSON (class ReadForeign, class WriteForeign, readJSON_, writeJSON)

default ∷ Meta
default = meta
  { title: "Atom/Button"
  , component: pure $ React.element Button.rawComponent
  , tags: [ "docsPage" ]
  , decorators:
      [ metaDecorator \storyFn ->
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

button ∷ Story
button = story
  { render: \btn args -> btn
      { children: [ R.text args.text ]
      , buttonType: unStringify args.buttonType
      , buttonShape: unStringify args.buttonShape
      , disabled: args.disabled
      }
  , component: pure $ React.element Button.component
  , args:
      { text: "Button"
      , buttonType: ButtonType.Primary # stringify
      , buttonShape: ButtonShape.Rounded # stringify
      , disabled: false
      }
  , argTypes
  , parameters: { docs: { source: { language: "purescript", code: "haha" } } }
  }

  where

  argTypes = { text, disabled, buttonType, buttonShape }
    where
    text =
      { name: "children"
      , type: { name: "Array JSX", required: false }
      , defaultValue: "Button"
      , description: "The text or other content to display in the button."
      , table: { type: { summary: "Array JSX" }, defaultValue: { summary: "[]" } }
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
    buttonType =
      { name: "buttonType"
      , type: { name: "string", required: false }
      , defaultValue: ButtonType.Generic # stringify
      , description: "The semantic colour of the button"
      , table: { type: { summary: "ButtonType" }, defaultValue: { summary: "Generic" } }
      , options: listAll (Proxy :: _ ButtonType)
      , control: { type: "select" }
      }
    buttonShape =
      { name: "buttonShape"
      , type: { name: "string", required: false }
      , defaultValue: ButtonShape.Rounded # stringify
      , description: "The shape of the button"
      , table: { type: { summary: "ButtonShape" }, defaultValue: { summary: "Rounded" } }
      , options: listAll (Proxy :: _ ButtonShape)
      , control: { type: "select" }
      }

listAll :: forall a. WriteForeign a => BoundedEnum a => Proxy a -> Array String
listAll _ = ((Enum.enumFromTo Bounded.bottom Bounded.top) :: Array a)
  <#> stringify

stringify ∷ ∀ a. WriteForeign a ⇒ a → String
stringify = writeJSON >>> String.dropRight 1 >>> String.drop 1

unStringify ∷ ∀ a. ReadForeign a ⇒ String → a
unStringify x = unsafePartial (fromJust (show x # readJSON_))

-- do
--   pure
--     $ fragment
--         [ R.div_
--             [ R.h1_ [ R.text "Button Examples" ]
--             , R.h2_ [ R.text "Button types" ]
--             , Block.cluster { space: "var(--s-1)" }
--                 [ Block.button { buttonType: ButtonType.Generic } [ R.text "Generic" ]
--                 , Block.button { buttonType: ButtonType.Primary } [ R.text "Primary" ]
--                 , Block.button { buttonType: ButtonType.Dangerous } [ R.text "Dangerous" ]
--                 , Block.button { css: customStyle, ripple: F.emerald._500 # cssStringRGBA } [ R.text "Custom" ]
--                 , Block.button { css: customStyle2 } [ R.text "Custom 2" ]
--                 ]
--             , R.h2_ [ R.text "Button shapes" ]
--             , Block.cluster { space: "var(--s-1)" }
--                 [ Block.button { buttonType: ButtonType.Generic, buttonShape: ButtonType.Pill } [ R.text "Generic Pill" ]
--                 , Block.button { buttonType: ButtonType.Primary, buttonShape: ButtonType.Pill } [ R.text "Generic Primary" ]
--                 , Block.button { buttonType: ButtonType.Generic, buttonShape: ButtonType.Flat } [ R.text "Flat Pill" ]
--                 , Block.button { buttonType: ButtonType.Primary, buttonShape: ButtonType.Flat } [ R.text "Flat Primary" ]
--                 , Block.button { css: customStyle, buttonShape: ButtonType.Pill } [ R.text "+ Custom" ]
--                 ]
--             , R.h2_ [ R.text "Icon button" ]
--             , Block.cluster { space: "var(--s-1)" }
--                 [ Block.button {} [ Block.icon </> { icon: Icon.questionMark, size: str "var(--s2)", colour: str colour.highlight } ]
--                 ]
--             , R.h2_ [ R.text "Disabled" ]
--             , Block.cluster { space: "var(--s-1)" }
--                 [ Block.button { buttonType: ButtonType.Generic, disabled: true } [ R.text "Generic" ]
--                 , Block.button { buttonType: ButtonType.Primary, disabled: true } [ R.text "Primary" ]
--                 , Block.button { buttonType: ButtonType.Generic, buttonShape: ButtonType.Pill, disabled: true } [ R.text "Generic" ]
--                 , Block.button { buttonType: ButtonType.Primary, buttonShape: ButtonType.Pill, disabled: true } [ R.text "Primary" ]
--                 ]
--             ]
--         ]

customButton1 ∷ Story
customButton1 = simpleStory
  { children: [ R.text "Hi" ]
  , css: customStyle
  , ripple: F.emerald._500 # cssStringRGBA
  }

customButton2 ∷ Story
customButton2 = simpleStory
  { children: [ R.text "Hi" ]
  , css: customStyle2
  }

customStyle ∷ E.Style
customStyle =
  E.css
    { background: E.str colour.backgroundLayer5
    , border: E.str $ "1px solid " <> colour.backgroundLayer2
    , boxShadow: E.none
    , paddingTop: E.str $ size.s
    , paddingBottom: E.str $ size.s
    , paddingLeft: E.str $ size.xl
    , paddingRight: E.str $ size.xl
    , fontWeight: E.str "500"
    , transition: str "all 0.7s ease"
    , "&:active":
        nest
          { boxShadow: E.none
          , border: E.str $ "1px solid " <> colour.highlightText
          , transform: E.none
          , background: E.str colour.highlight
          , color: E.str colour.highlightText
          }
    , "&:hover":
        nest
          { boxShadow: E.none
          , border: E.str $ "1px solid " <> colour.backgroundLayer1
          , transform: E.none
          , background: E.str colour.backgroundLayer4
          , color: E.str colour.text
          }
    }

customStyle2 ∷ E.Style
customStyle2 =
  E.css
    { background: E.color F.green._600
    , color: E.str "white"
    , border: E.none
    , fontWeight: E.str "400"
    , minWidth: E.str size."3xl"
    , "&:focus": nest 
      { border: E.str $ "1px solid " <> colour.background, outline: E.none }
    , "&:active": 
      nest { border: E.str $ "1px solid " <> colour.background }
    }
