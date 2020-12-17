module Yoga.Block.Atom.Toggle.Spec where

import Yoga.Prelude.Spec
import Yoga.Block.Atom.Toggle as Toggle

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The toggle" do
      it "renders without errors" do
        void
          $ renderComponent Toggle.component
              { value: true
              , onToggle: mempty
              }
