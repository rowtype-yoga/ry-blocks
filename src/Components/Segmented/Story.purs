module Components.Segmented.Story where

import Prelude
import Components.Container.Style as Styles
import Components.Segmented as Segmented
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (useState')
import React.Basic.Hooks as React
import Yoga (reactComponent)

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
    makeDemoComponent = do
      pure
        $ reactComponent "Segmented Demo" \{} -> React.do
            activeIndex /\ setElementIndex <- useState' 0
            pure
              $ element Segmented.component
                  { activeIndex
                  , updateActiveIndex: setElementIndex
                  , buttonContents: R.text <$> [ "Heinz", "Dembi", "Merh", "mehr", "meeehr" ]
                  }
