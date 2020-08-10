module Components.Segmented.Spec where

import Prelude.Spec
import Components.Segmented as Segmented
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The segmented" do
      it "renders without errors" do
        void
          $ renderComponent Segmented.component {}
      it "accepts div props" do
        { findByText } <-
          renderComponent Segmented.component
            { role: "Heinz"
            }
        elem <- findByText "Find me!"
        elem `shouldHaveAttribute` "role"
