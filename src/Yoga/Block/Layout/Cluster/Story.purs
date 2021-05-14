module Yoga.Block.Layout.Cluster.Story where

import Prelude
import Color (cssStringRGBA)
import Data.Monoid (power)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga (el)
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Cluster as Cluster
import Yoga.Block.Palette as Palette

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
        [ R.div
            { style: css { fontWeight: "500" }
            , children:
              [ R.h2_ [ R.text "No Options" ]
              , el Cluster.component
                  { style: css { backgroundColor: cssStringRGBA Palette.blue.regular } }
                  [ power
                      ( R.div
                          { children: [ R.text "Content" ]
                          , style: css { backgroundColor: colour.background }
                          }
                      )
                      30
                  ]
              , R.br {}
              , R.h2_ [ R.text "Zero Space" ]
              , el Cluster.component
                  { style:
                    css
                      { backgroundColor: cssStringRGBA Palette.blue.regular
                      , color: "white"
                      , fontSize: "20pt"
                      }
                  , space: "0"
                  , justify: "flex-end"
                  }
                  [ R.div
                      { children: [ R.text "Child 1" ]
                      , style: css { backgroundColor: cssStringRGBA Palette.pink.dark }
                      }
                  , R.div
                      { children: [ R.text "Child 2" ]
                      , style: css { backgroundColor: cssStringRGBA Palette.seaGreen.dark }
                      }
                  ]
              ]
            }
        ]
