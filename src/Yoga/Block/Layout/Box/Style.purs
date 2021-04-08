module Yoga.Block.Layout.Box.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , padding ∷ f StyleProperty
  , border ∷ f StyleProperty
  , borderRadius ∷ f StyleProperty
  , foreground ∷ f StyleProperty
  , background ∷ f String
  | r
  )

box ∷ ∀ p. { | Props OptionalProp p } -> Style
box props = styles <>? props.css
  where
  styles =
    css
      { padding: props.padding ?|| (1.0 # em)
      , border: (props.border ?|| str "0 solid")
      , borderRadius: props.borderRadius ?|| mempty
      , background: (str <$> props.background) ?|| color transparent
      , color: props.foreground ?|| str "inherit"
      , margin: _0
      }
