module Story.Yoga.Block.Atom.Checkbox
  ( default
  , checkbox
  , withLabel
  )
  -- (default, button, button2, test, customButton1, customButton2) 
  where

import Prelude hiding (div)

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Fahrtwind (ignoreClicks, userSelectNone)
import Literals.Undefined (undefined)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (element) as React
import Storybook (Meta, Story, meta, metaDecorator, story)
import Storybook.Addon.Actions (action)
import Storybook.Addon.Docs.Types (LogAction(..), inferArgTypes)
import Untagged.Castable (cast)
import Untagged.Union (UndefinedOr)
import Yoga ((/>), (</*))
import Yoga.Block as Block
import Yoga.Block.Atom.Checkbox.View as Checkbox
import Yoga.Block.Container.Style (size)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Types (JustifyContent(..))

type Props =
  { checked :: UndefinedOr Boolean
  , id :: String
  , onChecked :: Boolean -> Effect Unit
  }

default ∷ Meta Props
default = meta
  { title: "Atom/Checkbox"
  , component: pure $ React.element Checkbox.rawComponent
  , tags: [ "docsPage" ]
  , decorators:
      [ metaDecorator \storyFn ->
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

checkbox ∷ Story Props
checkbox = story args argTypes
  where
  args =
    { checked: cast undefined :: UndefinedOr Boolean
    , id: "example"
    , onChecked: LogAction \(x :: Boolean) -> "Checkbox is: " <> show x
    }

  argTypes = inferArgTypes args

-- # setType { children: "Array JSX" }
-- # setControl { ripple: ColorControl [ Color.white # withAlpha 0.2 ] }
-- # setRequired { buttonType: false }
-- # setRequired { buttonShape: false }

withLabel :: Effect JSX
withLabel = do
  pure $ Block.cluster { space: size.xl, justifyContent: JEvenly }
    [ Block.stack { space: E.str size.m } (toLabelled <$> [ "a", "b", "c" ])
    , Block.stack { space: E.str size.m } (toReverseLabelled <$> [ "d", "e", "f" ])
    ]
  where
  toLabelled x =
    Block.cluster { space: size.s }
      [ R.label' </* { css: userSelectNone, htmlFor: x } /> [ R.text x ]
      , Block.checkbox { id: x, onChecked: action ("clicked " <> show x) }
      ]
  toReverseLabelled x =
    Block.cluster { space: size.s }
      [ Block.checkbox { id: x, onChecked: action ("clicked " <> show x) }
      , R.label' </* { css: userSelectNone, htmlFor: x } /> [ R.text x ]
      ]
