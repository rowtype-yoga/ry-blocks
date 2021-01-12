module Yoga.Block.Molecule.TableOfContents.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Molecule.TableOfContents as TableOfContents
import Yoga.Block.Molecule.TableOfContents.Types (TableOfContentsPosition(..))

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The tableOfContents" do
      it "renders without errors" do
        void
          $ renderComponent TableOfContents.component
              { tableOfContentsPosition: TableOfContentsIsLeft
              , setTableOfContentsPosition: mempty
              , ariaLabel: "Example TableOfContents"
              }
      it "has an aria-label" do
        { findByRole } <-
          renderComponent TableOfContents.component
            { tableOfContentsPosition: TableOfContentsIsLeft
            , setTableOfContentsPosition: mempty
            , ariaLabel: "Example TableOfContents"
            }
        elem <- findByRole "switch"
        shouldHaveAttributeWithValue
          elem
          "aria-label"
          "Example TableOfContents"
