module Yoga.Block.Atom.Icon.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , colour ∷ f StyleProperty
  , stroke ∷ f StyleProperty
  , fill ∷ f StyleProperty
  , size ∷ f StyleProperty
  , width ∷ f StyleProperty
  , height ∷ f StyleProperty
  , focusColour ∷ f StyleProperty
  | r
  )

span ∷ ∀ r. { | Props OptionalProp r } → Style
span props =
  inlineFlex <>
    css
      { "--stroke-colour": strokeColour
      , "--fill-colour": fillColour
      , margin: _0
      , padding: _0
      , justifyContent: center
      , alignItems: center
      , width: auto
      , height: auto
      , "& > svg":
          nest
            { width
            , height
            , margin: _0
            , padding: _0
            }
      }
  where

  strokeColour = (props.stroke <|> props.colour) ?|| (str colour.text)

  fillColour = (props.fill <|> props.colour) ?|| (str "transparent")

  width = (props.width <|> props.size) ?|| (str "1em")

  height = (props.height <|> props.size) ?|| (str "1em")
