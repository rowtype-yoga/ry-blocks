module Yoga.Block.Atom.Image.Style where

import Yoga.Prelude.Style

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

style ∷ ∀ r. { | Props OptionalProp r } → Style
style props = css {} <>? props.css