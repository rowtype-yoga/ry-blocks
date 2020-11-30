module Components.CodeInput.Spec where

import Prelude.Spec
import Components.CodeInput as CodeInput
import React.Basic.DOM as R

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The codeInput" do
      it "renders without errors" do
        void
          $ renderComponent CodeInput.component {}
      it "accepts input props" do
        { findByText } <-
          renderComponent CodeInput.component
            { disabled: true
            }
        elem <- findByText "Find me!"
        elem `shouldHaveAttribute` "disabled"
