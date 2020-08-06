module Components.Cluster.Spec where

import Prelude.Spec
import Components.Cluster as Cluster
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The cluster" do
      it "renders without errors" do
        void
          $ renderComponent Cluster.component {}
      it "accepts div props" do
        { findByText } <-
          renderComponent Cluster.component
            { role: "Heinz"
            , children: [ R.text "Find me!" ]
            }
        elem <- findByText "Find me!"
        elem `shouldHaveAttribute` "role"
