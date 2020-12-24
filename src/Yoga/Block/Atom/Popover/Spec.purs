module Yoga.Block.Atom.Popover.Spec where

import Yoga.Prelude.Spec
import React.Basic.DOM as R
import Yoga.Block.Atom.Popover as Popover

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The popover" do
      it "renders without errors" do
        void
          $ renderComponent Popover.component
              { theTip: R.text "Tip"
              , target: R.text "Target"
              }
