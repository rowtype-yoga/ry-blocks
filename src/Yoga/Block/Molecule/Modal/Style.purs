module Yoga.Block.Molecule.Modal.Style where

import Yoga.Prelude.Style

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

modal ∷ Style
modal = styles
  where
  styles =
    css
      {}

clickaway ∷ Style
clickaway =
  css
    { width: 100.0 # vw
    , height: 100.0 # vh
    , position: fixed
    , left: _0
    , top: _0
    , backdropFilter: str "blur(4px) brightness(80%)"
    , zIndex: str "3"
    }
