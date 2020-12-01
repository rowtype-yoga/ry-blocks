module Yoga.Block.Atom.Range.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Atom.Range as Range

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The range" do
      it "renders without errors" do
        void
          $ renderComponent Range.component {}
