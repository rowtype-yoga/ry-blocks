module Yoga.Block.Atom.Button.Types where

import Prelude

data ButtonType
  = Primary
  | Dangerous
  | Generic

derive instance eqButtonType ∷ Eq ButtonType

renderButtonType ∷ ButtonType -> String
renderButtonType = case _ of
  Primary -> "primary"
  Generic -> "generic"
  Dangerous -> "dangerous"

data ButtonShape
  = Rounded
  | Pill
  | Flat

derive instance eqButtonShape ∷ Eq ButtonShape

renderButtonShape ∷ ButtonShape -> String
renderButtonShape = case _ of
  Rounded -> "rounded"
  Pill -> "pill"
  Flat -> "flat"
