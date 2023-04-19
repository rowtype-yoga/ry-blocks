module Yoga.Block.Layout.Box.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Layout.Box as Box
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The codeInput" do
      it "renders without errors" do
        void
          $ renderComponent Box.component {}
      it "accepts div props" do
        { findByText } ←
          renderComponent Box.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem ← findByText "Find me!"
        elem `shouldHaveAttribute` "role"
