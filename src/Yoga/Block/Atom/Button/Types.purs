module Yoga.Block.Atom.Button.Types where

import Prelude

data ButtonType
  = Primary
  | Generic

derive instance eqButtonType ∷ Eq ButtonType

renderButtonType ∷ ButtonType -> String
renderButtonType = case _ of
  Primary -> "primary"
  Generic -> "generic"

data ButtonShape
  = Rounded
  | Pill

derive instance eqButtonShape ∷ Eq ButtonShape

renderButtonShape ∷ ButtonShape -> String
renderButtonShape = case _ of
  Rounded -> "rounded"
  Pill -> "pill"
