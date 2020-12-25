module Yoga.Block.Atom.Button.Types where

import Prelude

data ButtonType
  = Primary
  | Secondary
  | Generic
derive instance eqHTMLButton ∷ Eq ButtonType
