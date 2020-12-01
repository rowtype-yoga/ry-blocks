module Yoga.Block.Layout.Stack.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Layout.Stack as Stack
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The stack" do
      it "renders without errors" do
        void
          $ renderComponent Stack.component {}
      it "accepts div props" do
        { findByText } <-
          renderComponent Stack.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem <- findByText "Find me!"
        elem `shouldHaveAttribute` "role"
