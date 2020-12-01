module Yoga.Block.Atom.CodeInput.Spec where

import Yoga.Prelude.Spec
import Foreign.Object as Object
import Yoga.Block.Atom.CodeInput as CodeInput

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The codeInput" do
      it "renders without errors" do
        renderComponent CodeInput.component {} # void
      it "accepts input props" do
        { findByTestId } <-
          renderComponent CodeInput.component
            { disabled: true
            , _data: Object.singleton "testid" "code-input"
            }
        elem <- findByTestId "code-input"
        elem `shouldHaveAttribute` "disabled"
