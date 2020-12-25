module Yoga.Block.Atom.Button.Style where

import Yoga.Prelude.Style

type Props f r
  = ( css ∷ f Style
    | r
    )

button :: Style
button = css {}
