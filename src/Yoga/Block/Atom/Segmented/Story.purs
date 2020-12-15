module Yoga.Block.Atom.Segmented.Story where

import Prelude
import Data.Tuple.Nested ((/\))
import Data.TwoOrMore (twoOrMore)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent, useState')
import React.Basic.Hooks as React
import Yoga.Block.Atom.Segmented as Segmented
import Yoga.Block.Container.Style as Styles

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Segmented"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

segmented ∷ Effect JSX
segmented = do
  demoComponent <- makeDemoComponent
  pure $ element demoComponent {}
  where
    makeDemoComponent =
      reactComponent "Segmented Demo" \{} -> React.do
        activeIndex /\ setElementIndex <- useState' 2
        pure
          $ element Segmented.component
              { activeIndex
              , updateActiveIndex: setElementIndex
              , buttonContents:
                twoOrMore
                  { id: "gag", value: "2" }
                  { id: "nag", value: "1" }
                  [ { id: "two", value: "Another option" }
                  , { id: "four", value: "2" }
                  , { id: "one", value: "1" }
                  ]
              }
