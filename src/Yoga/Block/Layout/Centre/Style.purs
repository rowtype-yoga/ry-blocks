module Yoga.Block.Layout.Centre.Style where

import Yoga.Prelude.Style

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , maxWidth ∷ f StyleProperty
  , andText ∷ f Boolean
  , gutters ∷ f StyleProperty
  , padding ∷ f StyleProperty
  | r
  )

centre ∷ ∀ p. { | Props OptionalProp p } -> Style
centre props = styles <>? props.css
  where
  styles =
    ( if isTruthy props.andText then textCenter
      else textLeft
    ) <>
      css
        { padding: props.padding ?|| (0 # px)
        , boxSizing: contentBox
        , marginLeft: auto
        , marginRight: auto
        , maxWidth: props.maxWidth ?|| (60.0 # ch)
        , paddingLeft: props.gutters ?|| _0
        , paddingRight: props.gutters ?|| _0
        }
