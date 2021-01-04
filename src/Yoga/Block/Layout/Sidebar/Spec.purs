module Yoga.Block.Layout.Sidebar.Spec where

import Yoga.Prelude.Spec
import React.Basic.DOM as R
import Yoga.Block.Layout.Sidebar as Sidebar

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The sidebar" do
      it "renders without errors" do
        void
          $ renderComponent Sidebar.component { children: [] }
      it "accepts div props" do
        { findByText } <-
          renderComponent Sidebar.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem <- findByText "Find me!"
        parent <- elem # getParentOrFailWith "Sidebar has no parent"
        parent `shouldHaveAttribute` "role"
