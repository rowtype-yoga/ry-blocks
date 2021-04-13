module Yoga.Block.Molecule.ReadMore.Story where

import Prelude
import Data.Monoid (power)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Yoga ((/>), (</))
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Molecule.ReadMore as ReadMore

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Molecule/Read More"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

readMore ∷ Effect JSX
readMore = do
  pure $ React.element compo {}
  where
  compo =
    unsafePerformEffect
      $ reactComponent "ReadMore Story" \{} -> React.do
          pure
            $ fragment
                [ R.h2_ [ R.text "Long text" ]
                , ReadMore.component
                    </ { moreLabel: R.text "more"
                      , lessLabel: R.text "less"
                      }
                    /> [ R.text (power "A very long text " 20) ]
                , R.h2_ [ R.text "Short text" ]
                , ReadMore.component
                    </ { moreLabel: R.text "more"
                      , lessLabel: R.text "less"
                      }
                    /> [ R.text "Quite a short text that probably fits on one line" ]
                ]
