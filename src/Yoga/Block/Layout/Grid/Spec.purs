module Yoga.Block.Layout.Grid.Spec where

import Yoga.Prelude.Spec
import React.Basic.DOM as R
import Yoga.Block.Layout.Grid as Grid

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The sidebar" do
      it "renders without errors" do
        void
          $ renderComponent Grid.component { children: [] }
      it "accepts div props" do
        { findByText } <-
          renderComponent Grid.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem <- findByText "Find me!"
        parent <- elem # getParentOrFailWith "Grid has no parent"
        parent `shouldHaveAttribute` "role"
