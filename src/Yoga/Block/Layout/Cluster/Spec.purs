module Yoga.Block.Layout.Cluster.Spec where

import Yoga.Prelude.Spec
import Foreign.Object as Object
import React.Basic.DOM as R
import Yoga.Block.Layout.Cluster as Cluster

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The cluster" do
      it "renders without errors" do
        void
          $ renderComponent Cluster.component {}
      it "accepts div props" do
        { findByTestId } <-
          renderComponent Cluster.component
            { role: "Heinz"
            , _data: Object.fromHomogeneous { testid: "cluster" }
            , children: [ R.text "Find me!" ]
            }
        elem <- findByTestId "cluster"
        shouldHaveAttributeWithValue elem "role" "Heinz"
