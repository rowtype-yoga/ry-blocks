module Yoga.Block.Atom.Toggle.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Atom.Toggle as Toggle
import Yoga.Block.Atom.Toggle.Types (TogglePosition(..))

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The toggle" do
      it "renders without errors" do
        void
          $ renderComponent Toggle.component
              { togglePosition: ToggleIsLeft
              , setTogglePosition: mempty
              , ariaLabel: "Example Toggle"
              }
      it "has an aria-label" do
        { findByRole } <-
          renderComponent Toggle.component
            { togglePosition: ToggleIsLeft
            , setTogglePosition: mempty
            , ariaLabel: "Example Toggle"
            }
        elem <- findByRole "switch"
        shouldHaveAttributeWithValue
          elem
          "aria-label"
          "Example Toggle"
