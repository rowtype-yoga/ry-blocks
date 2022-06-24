module Yoga.Block.Layout.Cover.Story where

import Prelude

import Color (cssStringRGBA)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Fahrtwind as F
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Cover as Cover

default
  ∷ { decorators ∷ Array (Effect JSX -> JSX)
    , title ∷ String
    }
default =
  { title: "Layout/Cover"
  , decorators:
      [ \storyFn ->
          R.div
            { children:
                [ element E.global { styles: Styles.global }
                , unsafePerformEffect storyFn
                ]
            , style:
                css
                  { fontWeight: "500"
                  }
            }
      ]
  }

cover ∷ Effect JSX
cover =
  pure
    $ fragment
        [ R.h2_ [ R.text "The Cover" ]
        , element Cover.component
            { children: [ R.text "Default" ]
            , style: css { backgroundColor: cssStringRGBA F.orange._500, color: "black" }
            , minHeight: E.px 300
            }
        , element Cover.component
            { children: [ R.text "With Header and Footer" ]
            , style: css { backgroundColor: cssStringRGBA F.violet._500, color: "white" }
            , header: R.text "Header"
            , footer: R.text "Footer"
            , minHeight: E.px 300
            }
        , Block.cluster_
            [ element Cover.component
                { children: [ R.text "With Header only" ]
                , style: css { backgroundColor: cssStringRGBA F.violet._600, color: "white" }
                , header: R.text "Header"
                , minHeight: E.px 300
                }
            , element Cover.component
                { children: [ R.text "With Header only centre in remaining" ]
                , style: css { backgroundColor: cssStringRGBA F.violet._600, color: "white" }
                , header: R.text "Header"
                , minHeight: E.px 300
                , centreInRemaining: true
                }
            ]
        , Block.cluster_
            [ element Cover.component
                { children: [ R.text "With Footer only" ]
                , style: css { backgroundColor: cssStringRGBA F.emerald._700, color: "white" }
                , footer: R.text "Footer"
                , minHeight: E.px 300
                }
            , element Cover.component
                { children: [ R.text "With Footer only centre in remaining" ]
                , style: css { backgroundColor: cssStringRGBA F.teal._600, color: "white" }
                , footer: R.text "Footer"
                , minHeight: E.px 300
                , centreInRemaining: true
                }
            ]
        ]
