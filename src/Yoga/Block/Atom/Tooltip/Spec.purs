module Yoga.Block.Atom.Tooltip.Spec where

import Yoga.Prelude.Spec
import React.Basic.DOM as R
import Yoga.Block.Atom.Tooltip as Tooltip

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The tooltip" do
      it "renders without errors" do
        void
          $ renderComponent Tooltip.component
              { theTip: R.text "Tip"
              , target: R.text "Target"
              }
