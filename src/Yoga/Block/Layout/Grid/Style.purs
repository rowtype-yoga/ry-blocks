module Yoga.Block.Layout.Grid.Style where

import Yoga.Prelude.Style

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , min ∷ f String
  , gridGap ∷ f StyleProperty
  | r
  )

grid ∷ ∀ p. { | Props OptionalProp p } → Style
grid props = styles <>? props.css
  where
  styles =
    css
      { display: str "grid"
      , gridGap: props.gridGap ?|| var "--s1"
      , gridTemplateColumns: str $ "repeat(auto-fit, minmax(min("
          <> (props.min ?|| "20rem")
          <> ", 100%), 1fr))"
      }
