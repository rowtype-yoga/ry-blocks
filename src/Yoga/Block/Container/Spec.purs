module Yoga.Block.Container.Spec where

import Yoga.Prelude.Spec
import React.Basic.DOM as R
import React.Basic.Hooks (JSX)
import Yoga.Block.Container as Container

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The container" do
      it "renders without errors" do
        void $ renderComponent Container.component { content: mempty ∷ JSX }
      it "displays its children" do
        let content = R.text "Test Text"
        { findByText } <- renderComponent Container.component { content }
        elem <- findByText "Test Text"
        elem `textContentShouldEqual` "Test Text"
