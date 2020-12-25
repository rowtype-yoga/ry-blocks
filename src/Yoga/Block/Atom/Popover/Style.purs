module Yoga.Block.Atom.Popover.Style where

import Yoga.Prelude.Style

type Props f r
  = ( css ∷ f Style
    | r
    )

content ∷ Style
content =
  css
    { zIndex: str "-1"
    }

popper ∷ Style
popper =
  css
    {}
