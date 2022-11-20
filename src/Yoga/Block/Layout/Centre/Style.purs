module Yoga.Block.Layout.Centre.Style where

import Yoga.Prelude.Style

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , maxWidth ∷ f StyleProperty
  , andText ∷ f Boolean
  , gutters ∷ f StyleProperty
  , padding ∷ f StyleProperty
  | r
  )

centre ∷ ∀ p. { | Props OptionalProp p } → Style
centre props = styles <>? props.css
  where
  styles =
    ( if isTruthy props.andText then textCenter
      else textLeft
    ) <>
      css
        { boxSizing: contentBox
        , width: str "fit-content"
        , marginInline: auto
        , maxInlineSize: props.maxWidth ?|| (60.0 # ch)
        , paddingInlineStart: props.gutters ?|| _0
        , paddingInlineEnd: props.gutters ?|| _0
        }
