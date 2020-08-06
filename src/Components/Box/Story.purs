module Components.Box.Story where

import Prelude
import Components.Box as Box
import Effect (Effect)
import React.Basic (JSX)
import React.Basic.DOM as R
import Yoga (yogaElement)

default ∷ { title ∷ String }
default = { title: "Layout/Box" }

box ∷ Effect JSX
box = pure (yogaElement Box.component { kids: [ R.text "Content" ] })
