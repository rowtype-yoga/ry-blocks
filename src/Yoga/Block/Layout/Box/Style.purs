module Yoga.Block.Layout.Box.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)

type Props f r =
  ( css ∷ f Style
  , padding ∷ f StyleProperty
  , borderWidth ∷ f String
  , invert ∷ f Boolean
  | r
  )

box ∷ ∀ p. { | Props OptionalProp p } -> Style
box props = styles <>? props.css
  where
    styles =
      css
        { padding: props.padding ?|| (1.0 # em)
        , border: str $ i ((props.borderWidth) ?|| "0") " solid"
        }
