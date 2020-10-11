module Components.Range.Spec where

import Prelude.Spec
import Components.Range as Range
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The range" do
      it "renders without errors" do
        void
          $ renderComponent Range.component {}
