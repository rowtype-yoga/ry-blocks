module Yoga.Block.Container.Spec where

import Yoga.Prelude.Spec
import React.Basic.DOM as R
import Yoga.Block.Container as Container

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The container" do
      it "renders without errors" do
        void $ renderComponent Container.component {}
      it "displays its children" do
        let content = R.text "Test Text"
        { findByText } ← renderComponent Container.component
          { children: [ content ] }
        elem ← findByText "Test Text"
        elem `textContentShouldEqual` "Test Text"
