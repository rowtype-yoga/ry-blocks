module Story.Yoga.Block.Molecule.Typeahead
  ( default
  , typeahead
  )
  -- (default, button, button2, test, customButton1, customButton2)
  where

import Prelude hiding (div)

import Data.Array as Array
import Data.Maybe (Maybe(..))
import Data.String as String
import Data.String.NonEmpty (nes)
import Effect (Effect)
import Fahrtwind as FW
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (element) as React
import Storybook (Meta, meta, metaDecorator)
import Storybook.Addon.Actions (action)
import Type.Proxy (Proxy(..))
import Yoga ((</*>))
import Yoga.Block as Block
import Yoga.Block.Container.Style (sizeStyle)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Molecule.Typeahead.View (inputProps, mkTypeahead)
import Yoga.Block.Molecule.Typeahead.View as Typeahead

default ∷ Meta (Typeahead.PropsOld String)
default = meta
  { title: "Molecule/Typeahead"
  , component: do
      typeahead ←
        Typeahead.mkDefaultArgs
          { suggestionToText: identity
          , contextMenuLayerId: "ctx-menu"
          } # mkTypeahead
      pure $ React.element typeahead
  , tags: [ "docsPage" ]
  , decorators:
      [ metaDecorator \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            , R.div' </*>
                { id: "ctx-menu"
                , css: FW.positionFixed <> FW.widthFull <> FW.heightFull
                    <> FW.top 0
                    <> FW.left 0
                    <> FW.ignoreClicks
                }
            ]
      ]
  }

typeahead ∷ Effect JSX
typeahead = do
  ta ←
    Typeahead.mkDefaultArgs
      { suggestionToText: identity
      , contextMenuLayerId: "ctx-menu"
      } # mkTypeahead
  pure $ React.element ta
    { onSelected: \s → do
        pure { overrideInputValue: Nothing, dismiss: true }
    , onRemoved: action "Removed"
    , renderSuggestion: \s →
        Block.box
          { padding: sizeStyle.s
          , css: FW.textSm
          }
          [ R.text s ]
    , loadSuggestions: \s →
        pure $ pure $ Array.filter (String.contains (String.Pattern s))
          [ "aardvark"
          , "about"
          , "after"
          , "among"
          , "again"
          , "above"
          , "along"
          , "alone"
          ]
    , onDismiss: action "dismissed" unit
    , inputProps: inputProps
        { placeholder: "Heinz..."
        , label: nes (Proxy ∷ _ "Test Typeahead")
        }
    }
