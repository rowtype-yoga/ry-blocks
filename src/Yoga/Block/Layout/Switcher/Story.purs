module Yoga.Block.Layout.Switcher.Story where

import Prelude
import Yoga.Block.Layout.Switcher as Switcher
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
  { title: "Layout/Switcher"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

switcher ∷ Effect JSX
switcher =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Limit of 5 and 5 children" ]
            , el Switcher.component
                { style: css { backgroundColor: "hotpink" }
                , limit: 5
                }
                [ R.div
                    { children: [ R.text "A child" ]
                    , style: css { backgroundColor: "darkslateblue", color: "white" }
                    }
                    `power`
                      5
                ]
            , R.h2_ [ R.text "Limit of 4 and 5 children" ]
            , el Switcher.component
                { style: css { backgroundColor: "darkslateblue" }
                , limit: 4
                , space: "0"
                }
                [ R.div
                    { children: [ R.text "A child" ]
                    , style: css { backgroundColor: "teal" }
                    }
                    `power`
                      5
                ]
            ]
        ]
