module Story.Yoga.Block.Atom.Button
  ( default
  , button
  )
  -- (default, button, button2, test, customButton1, customButton2) 
  where

import Prelude hiding (div)

import Color as Color
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Fahrtwind (withAlpha)
import Fahrtwind as FW
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (element) as React
import Storybook (Meta, Story, meta, metaDecorator, setControl, setRequired, setType, story)
import Storybook.Addon.Docs.Types (ArgTypeControl(..), enumArg, inferArgTypes)
import Untagged.Union (UndefinedOr, maybeToUor)
import Yoga.Block as Block
import Yoga.Block.Atom.Button.Types (ButtonShape, ButtonType)
import Yoga.Block.Atom.Button.Types as ButtonShape
import Yoga.Block.Atom.Button.Types as ButtonType
import Yoga.Block.Atom.Button.View as Button
import Yoga.Block.Container.Style as Styles

type Props =
  { children :: UndefinedOr String
  , buttonType :: ButtonType
  , buttonShape :: ButtonShape
  , ripple :: UndefinedOr String
  }

default ∷ Meta Props
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

button ∷ Story Props
button = story args argTypes
  where
  args =
    { children: maybeToUor (Nothing :: _ String)
    , buttonType: enumArg { "ButtonType": ButtonType.Generic }
    , buttonShape: enumArg { "ButtonShape": ButtonShape.Pill }
    , ripple: maybeToUor (Nothing :: _ String)
    }

  argTypes = inferArgTypes args
    # setType { children: "Array JSX" }
    # setControl { ripple: ColorControl [ Color.white # withAlpha 0.2 ] }
    # setRequired { buttonType: false }
    # setRequired { buttonShape: false }
