module Story.Yoga.Block.Atom.Input
  ( default
  , input
  ) where

import Prelude hiding (div)

import Color (Color)
import Color as Color
import Data.Maybe (Maybe(..))
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NES
import Fahrtwind (withAlpha)
import Foreign.Object (Object)
import Foreign.Object as Object
import Literals.Undefined (undefined)
import React.Basic (element)
import React.Basic as React
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Storybook (Meta, Story, meta, metaDecorator, setControl, setType, story)
import Storybook.Addon.Docs.Types (ArgTypeControl(..), EnumArg, enumArg, inferArgTypes)
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Union (UndefinedOr, maybeToUor, uorToMaybe)
import Yoga.Block.Atom.Input.Style (SizeVariant(..))
import Yoga.Block.Atom.Input.View as Input
import Yoga.Block.Container.Style as Styles

type Props =
  { disabled ∷ Boolean
  , forceSmallLabel ∷ Boolean
  , label ∷ UndefinedOr NonEmptyString
  , placeholder ∷ String
  , value ∷ UndefinedOr String
  , _aria :: Object String
  , sizeVariant :: SizeVariant
  , background ∷ UndefinedOr String
  , textColour ∷ UndefinedOr String
  , placeholderColour ∷ UndefinedOr String
  , borderColour ∷ UndefinedOr String
  , leading :: UndefinedOr String
  , trailing :: UndefinedOr String
  }

default ∷ Meta Props
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

baseArgs =
  { disabled: false
  , forceSmallLabel: false
  , label: maybeToUor (Nothing :: _ String)
  , placeholder: "Placeholder"
  , value: maybeToUor (Nothing :: _ String)
  , _aria: Object.singleton "required" "true"
  , sizeVariant: enumArg { "SizeVariant": SizeTiny }
  , background: maybeToUor (Nothing :: _ String)
  , textColour: maybeToUor (Nothing :: _ String)
  , placeholderColour: maybeToUor (Nothing :: _ String)
  , borderColour: maybeToUor (Nothing :: _ String)
  , leading: maybeToUor (Nothing :: _ String)
  , trailing: maybeToUor (Nothing :: _ String)
  }

-- -- A normal input
input ∷ Story Props
input = story baseArgs argTypes
  where

  argTypes = inferArgTypes baseArgs
    # setType { label: "NonEmptyString" }
    # setType { leading: "JSX" }
    # setType { trailing: "JSX" }
    # setControl { sizeVariant: RadioControl [ "SizeMedium", "SizeSmall", "SizeTiny" ] }
    # setControl { textColour: ColorControl [ Color.white # withAlpha 0.2 ] }
    # setControl { background: ColorControl [ Color.white # withAlpha 0.2 ] }
    # setControl { placeholderColour: ColorControl [ Color.white # withAlpha 0.2 ] }
    # setControl { borderColour: ColorControl [ Color.white # withAlpha 0.2 ] }

