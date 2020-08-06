module Components.Cluster.Story where

import Prelude
import Components.Container.Style as Styles
import Components.Cluster as Cluster
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E

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
            , element Cluster.component
                { children:
                  [ R.div_
                      [ R.div { children: [ R.text "Child 1" ], style: css { backgroundColor: "teal" } }
                      , R.div { children: [ R.text "Child 2" ], style: css { backgroundColor: "rebeccapurple" } }
                      ]
                  ]
                , style: css { backgroundColor: "hotpink" }
                }
            , R.h2_ [ R.text "Zero Space" ]
            , element Cluster.component
                { children:
                  [ R.div_
                      [ R.div { children: [ R.text "Child 1" ], style: css { backgroundColor: "teal" } }
                      , R.div { children: [ R.text "Child 2" ], style: css { backgroundColor: "rebeccapurple" } }
                      ]
                  ]
                , style: css { backgroundColor: "darkslateblue" }
                , space: "0"
                }
            ]
        ]
