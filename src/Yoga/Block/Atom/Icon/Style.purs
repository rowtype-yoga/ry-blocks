module Yoga.Block.Atom.Icon.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  , colour ∷ f StyleProperty
  , stroke ∷ f StyleProperty
  , fill ∷ f StyleProperty
  , size ∷ f StyleProperty
  , width ∷ f StyleProperty
  , height ∷ f StyleProperty
  | r
  )

span ∷ ∀ r. { | Props OptionalProp r } -> Style
span props =
  css
    { "--stroke-colour": (props.stroke <|> props.colour) ?|| (str colour.text)
    , "--fill-colour": (props.fill <|> props.colour) ?|| (str "transparent")
    , display: inlineFlex
    , justifyContent: center
    , alignItems: center
    , margin: _0
    , padding: _0
    , width
    , height
    , overflow: hidden
    , "& > svg":
      nest
        { width
        , height
        , margin: _0
        , padding: _0
        }
    }
  where
    width = (props.width <|> props.size) ?|| (str "auto")

    height = (props.height <|> props.size) ?|| (str "1ch")
