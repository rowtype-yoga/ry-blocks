module Yoga.Block.Atom.Input.Placement.Types (render, Placement(..), Primary(..), Secondary(..)) where

import Prelude
import Data.Foldable (foldMap)
import Data.Maybe (Maybe)

data Placement
  = Placement Primary (Maybe Secondary)

render ∷ Placement -> String
render (Placement primary maybeSecondary) = do
  renderPrimary primary <> foldMap ("-" <> _) (renderSecondary <$> maybeSecondary)

data Primary
  = Auto
  | Left
  | Right
  | Top
  | Bottom

data Secondary
  = Start
  | End

renderPrimary ∷ Primary -> String
renderPrimary = case _ of
  Auto -> "auto"
  Left -> "left"
  Right -> "right"
  Top -> "top"
  Bottom -> "bottom"

renderSecondary ∷ Secondary -> String
renderSecondary = case _ of
  Start -> "start"
  End -> "end"
