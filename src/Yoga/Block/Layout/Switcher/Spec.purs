module Yoga.Block.Layout.Switcher.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Layout.Switcher as Switcher
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The switcher" do
      it "renders without errors" do
        void
          $ renderComponent Switcher.component {}
      it "accepts div props" do
        { findByText } <-
          renderComponent Switcher.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem <- findByText "Find me!"
        elem `shouldHaveAttribute` "role"
