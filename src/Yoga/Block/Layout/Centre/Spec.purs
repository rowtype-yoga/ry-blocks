module Yoga.Block.Layout.Centre.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Layout.Centre as Centre
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The centre" do
      it "renders without errors" do
        void
          $ renderComponent Centre.component {}
      it "accepts div props" do
        { findByText } <-
          renderComponent Centre.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem <- findByText "Find me!"
        elem `shouldHaveAttribute` "role"
