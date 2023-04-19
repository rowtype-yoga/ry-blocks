module Yoga.Block.Atom.Toggle.Types where

import Prelude

data TogglePosition
  = ToggleIsLeft
  | ToggleIsRight

derive instance eqTogglePosition ∷ Eq TogglePosition

instance showTogglePosition ∷ Show TogglePosition where
  show = case _ of
    ToggleIsLeft → "ToggleIsLeft"
    ToggleIsRight → "ToggleIsRight"

flipToggle ∷ TogglePosition → TogglePosition
flipToggle = case _ of
  ToggleIsLeft → ToggleIsRight
  ToggleIsRight → ToggleIsLeft
