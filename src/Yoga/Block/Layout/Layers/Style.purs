module Yoga.Block.Layout.Layers.Style where

import Yoga.Prelude.Style

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , width ∷ f StyleProperty
  , height ∷ f StyleProperty
  | r
  )

layers ∷ ∀ p. { | Props OptionalProp p } → Style
layers props = styles <>? props.css
  where
  styles = displayGrid <>
    css
      { "& > *": nested (css { gridArea: str "1 / 1 / 1 / 1" })
      , width: props.width ?|| (str "fit-content")
      , height: props.height ?|| (str "fit-content")
      , gridTemplateColumns: str "1fr"
      , gridTemplateRows: str "1fr"
      }
