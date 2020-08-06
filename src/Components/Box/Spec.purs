module Components.Box.Spec where

import Prelude.Spec
import Components.Box as Box
import React.Basic.DOM as R
import React.Basic.Hooks (JSX)
import Untagged.Coercible (coerce)

spec ∷ Spec Unit
spec =
  after_ cleanup do
    describe "The box" do
      it "renders without errors" do
        void $ renderComponent Box.component (coerce { kids: [] ∷ _ JSX })
      it "displays its children" do
        let kids = [ R.text "Test Text" ]
        { findByText } <- renderComponent Box.component (coerce { kids })
        elem <- findByText "Test Text"
        elem `textContentShouldEqual` "Test Text"
