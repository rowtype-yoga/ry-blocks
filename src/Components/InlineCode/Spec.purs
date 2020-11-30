module Components.InlineCode.Spec where

import Prelude.Spec
import Components.InlineCode as InlineCode
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The inlineCode" do
      it "renders without errors" do
        void
          $ renderComponent InlineCode.component {}
      it "accepts input props" do
        { findByText } <-
          renderComponent InlineCode.component
            { disabled: true
            }
        elem <- findByText "Find me!"
        elem `shouldHaveAttribute` "disabled"
