module Yoga.Block.Layout.Grid.Story where

import Prelude
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Grid as Grid
import Data.Monoid (power)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E

default ∷
  { decorators ∷ Array (Effect JSX → JSX)
  , title ∷ String
  }
default =
  { title: "Layout/Grid"
  , decorators:
      [ \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
      ]
  }

grid ∷ Effect JSX
grid =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "No Options" ]
            , element Grid.component
                { children:
                    [ R.div
                        { children: [ R.text "Grid" ]
                        , style: css { backgroundColor: "teal" }
                        }
                    , R.div
                        { children: [ R.text $ power "Content " 10 ]
                        , style: css { backgroundColor: "darkslateblue" }
                        }
                    , R.div
                        { children: [ R.text $ power "Content " 10 ]
                        , style: css { backgroundColor: "darkslateblue" }
                        }
                    ]
                , style: css { backgroundColor: "oldlace" }
                }
            ]
        ]
