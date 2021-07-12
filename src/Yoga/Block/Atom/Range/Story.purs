module Yoga.Block.Atom.Range.Story where

import Prelude
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Atom.Range as Range
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
  { title: "Atom/Range"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

range ∷ Effect JSX
range =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "No Options" ]
            , element Range.component
                {}
            , R.h2_ [ R.text "Min and max" ]
            , element Range.component
                { min: 2
                , max: 10
                }
            , R.h2_ [ R.text "Controlled" ]
            , element Range.component
                { value: 88
                , style: css { width: "200px" }
                }
            , R.h2_ [ R.text "Disabled" ]
            , element Range.component
                { value: 88
                , style: css { width: "200px" }
                , disabled: true
                }
            ]
        ]
