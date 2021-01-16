module Yoga.Block.Molecule.TableOfContents.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Molecule.TableOfContents as TableOfContents

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The tableOfContents" do
      it "renders without errors" do
        void
          $ renderComponent TableOfContents.component
              { items: []
              }
