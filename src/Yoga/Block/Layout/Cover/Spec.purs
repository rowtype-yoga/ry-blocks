module Yoga.Block.Layout.Cover.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Layout.Cover as Cover
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The cover" do
      it "renders without errors" do
        void
          $ renderComponent Cover.component {}
      it "accepts div props" do
        { findByText } ←
          renderComponent Cover.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem ← findByText "Find me!"
        elem `shouldHaveAttribute` "role"
