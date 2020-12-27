module Yoga.Block.Layout.Cluster.Story where

import Prelude
import Yoga.Block.Layout.Cluster as Cluster
import Yoga.Block.Container.Style as Styles
import Data.Monoid (power)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga (el)

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Layout/Cluster"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

cluster ∷ Effect JSX
cluster =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "No Options" ]
            , el Cluster.component
                { style: css { backgroundColor: "hotpink" }
                }
                [ power
                    ( R.div
                        { children: [ R.text "Content" ]
                        , style: css { backgroundColor: "teal" }
                        }
                    )
                    30
                ]
            , R.h2_ [ R.text "Zero Space" ]
            , el Cluster.component
                { style: css { backgroundColor: "darkslateblue" }
                , space: "0"
                , justify: "flex-end"
                }
                [ R.div { children: [ R.text "Child 1" ], style: css { backgroundColor: "teal" } }
                , R.div { children: [ R.text "Child 2" ], style: css { backgroundColor: "rebeccapurple" } }
                ]
            ]
        ]
