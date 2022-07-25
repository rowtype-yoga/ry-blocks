module Yoga.Block.Atom.Checkbox.Style where

import Yoga.Prelude.Style

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

checkmark ∷ Style
checkmark =
  block <>
    css
      { path: nested $ css
          { transformOrigin: str "50% 50%"
          , strokeDasharray: int 48
          , strokeDashoffset: int 48
          , animation: str
              "checkmarkAnimation .25s cubic-bezier(0.65, 0, 0.45, 1) forwards"
          , animationName: keyframes
              { to: css { strokeDashoffset: int 0 } }
          }
      }