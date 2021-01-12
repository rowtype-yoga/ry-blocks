module Yoga.Block.Molecule.TableOfContents.Types where

import Prelude

data TableOfContentsPosition
  = TableOfContentsIsLeft
  | TableOfContentsIsRight
derive instance eqTableOfContentsPosition ∷ Eq TableOfContentsPosition

instance showTableOfContentsPosition ∷ Show TableOfContentsPosition where
  show = case _ of
    TableOfContentsIsLeft -> "TableOfContentsIsLeft"
    TableOfContentsIsRight -> "TableOfContentsIsRight"

flipTableOfContents ∷ TableOfContentsPosition -> TableOfContentsPosition
flipTableOfContents = case _ of
  TableOfContentsIsLeft -> TableOfContentsIsRight
  TableOfContentsIsRight -> TableOfContentsIsLeft
