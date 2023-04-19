module Yoga.Block.Layout.Box.Style where

import Yoga.Prelude.Style

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , padding ∷ f StyleProperty
  , border ∷ f StyleProperty
  , borderTop ∷ f StyleProperty
  , borderBottom ∷ f StyleProperty
  , borderLeft ∷ f StyleProperty
  , borderRight ∷ f StyleProperty
  , borderRadius ∷ f StyleProperty
  , foreground ∷ f StyleProperty
  , background ∷ f String
  , boxShadow ∷ f StyleProperty
  | r
  )

box ∷ ∀ p. { | Props OptionalProp p } → Style
box props = styles <>? props.css
  where
  styles =
    css
      { padding: props.padding ?|| (1.0 # em)
      , border: (props.border ?|| str "0 solid")
      , borderTop: props.borderTop ?|| mempty
      , borderRight: props.borderRight ?|| mempty
      , borderBottom: props.borderBottom ?|| mempty
      , borderLeft: props.borderLeft ?|| mempty
      , borderRadius: props.borderRadius ?|| mempty
      , background: (str <$> props.background) ?|| color transparent
      , color: props.foreground ?|| str "inherit"
      , boxShadow: props.boxShadow ?|| none
      , margin: _0
      }
