module Components.Imposter.Story where

import Prelude
import Components.Container.Style as Styles
import Components.Imposter as Imposter
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
  { title: "Layout/Imposter"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

imposter ∷ Effect JSX
imposter =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "No Options" ]
            , el Imposter.component
                { style: css { backgroundColor: "hotpink" }
                }
                [ R.div_
                    $ [ power
                          ( R.div
                              { children: [ R.text "Content" ]
                              , style: css { backgroundColor: "teal" }
                              }
                          )
                          30
                      ]
                ]
            ]
        ]
