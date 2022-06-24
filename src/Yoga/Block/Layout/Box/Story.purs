module Yoga.Block.Layout.Box.Story where

import Prelude

import Color (cssStringRGBA, darken)
import Color as Color
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Fahrtwind as F
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga ((/>), (</))
import Yoga.Block as Block
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Box as Box

default
  ∷ { decorators ∷ Array (Effect JSX -> JSX)
    , title ∷ String
    }
default =
  { title: "Layout/Box"
  , decorators:
      [ \storyFn ->
          R.div_
            [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
      ]
  }

box ∷ Effect JSX
box =
  pure
    $ fragment
        [ element Box.component { children: [ R.text "Default" ] }
        , Block.stack {}
            [ Box.component </ myBox "var(--s1)" /> [ R.text "Shadow" ]
            , cluster
                [ Box.component </ colBox1 F.pink._300 "var(--s0)" /> [ colText1 F.pink._300 "text" ]
                , Box.component </ colBox1 F.pink._500 "var(--s0)" /> [ colText1 F.pink._500 "text" ]
                , Box.component </ colBox1 F.pink._700 "var(--s0)" /> [ colText1 F.pink._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.purple._300 "var(--s-1)" /> [ colText1 F.purple._300 "text" ]
                , Box.component </ colBox1 F.purple._500 "var(--s0)" /> [ colText1 F.purple._500 "text" ]
                , Box.component </ colBox1 F.purple._700 "var(--s0)" /> [ colText1 F.purple._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.violet._300 "var(--s-1)" /> [ colText1 F.violet._300 "text" ]
                , Box.component </ colBox1 F.violet._500 "var(--s0)" /> [ colText1 F.violet._500 "text" ]
                , Box.component </ colBox1 F.violet._700 "var(--s0)" /> [ colText1 F.violet._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.blue._300 "var(--s0)" /> [ colText1 F.blue._700 "text" ]
                , Box.component </ colBox1 F.blue._500 "var(--s0)" /> [ colText1 F.blue._500 "text" ]
                , Box.component </ colBox1 F.blue._700 "var(--s0)" /> [ colText1 F.blue._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.lightBlue._300 "var(--s0)" /> [ colText1 F.lightBlue._700 "text" ]
                , Box.component </ colBox1 F.lightBlue._500 "var(--s0)" /> [ colText1 F.lightBlue._500 "text" ]
                , Box.component </ colBox1 F.lightBlue._700 "var(--s0)" /> [ colText1 F.lightBlue._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.teal._300 "var(--s-1)" /> [ colText1 F.teal._300 "text" ]
                , Box.component </ colBox1 F.teal._500 "var(--s0)" /> [ colText1 F.teal._500 "text" ]
                , Box.component </ colBox1 F.teal._700 "var(--s0)" /> [ colText1 F.teal._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.emerald._300 "var(--s0)" /> [ colText1 F.emerald._300 "text" ]
                , Box.component </ colBox1 F.emerald._500 "var(--s0)" /> [ colText1 F.emerald._500 "text" ]
                , Box.component </ colBox1 F.emerald._700 "var(--s0)" /> [ colText1 F.emerald._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.lime._300 "var(--s-1)" /> [ colText1 F.lime._300 "text" ]
                , Box.component </ colBox1 F.lime._500 "var(--s0)" /> [ colText1 F.lime._500 "text" ]
                , Box.component </ colBox1 F.lime._700 "var(--s0)" /> [ colText1 F.lime._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.yellow._300 "var(--s-1)" /> [ colText1 F.yellow._300 "text" ]
                , Box.component </ colBox1 F.yellow._500 "var(--s0)" /> [ colText1 F.yellow._500 "text" ]
                , Box.component </ colBox1 F.yellow._700 "var(--s0)" /> [ colText1 F.yellow._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.red._300 "var(--s-1)" /> [ colText1 F.red._300 "text" ]
                , Box.component </ colBox1 F.red._500 "var(--s0)" /> [ colText1 F.red._500 "text" ]
                , Box.component </ colBox1 F.red._700 "var(--s0)" /> [ colText1 F.red._700 "text" ]
                ]
            , cluster
                [ Box.component </ colBox1 F.rose._300 "var(--s-1)" /> [ colText1 F.rose._300 "text" ]
                , Box.component </ colBox1 F.rose._500 "var(--s0)" /> [ colText1 F.rose._500 "text" ]
                , Box.component </ colBox1 F.rose._700 "var(--s0)" /> [ colText1 F.rose._700 "text" ]
                ]
            ]
        ]
  where
  cluster = Block.cluster { space: "0px", justify: "space-between" }

  colText1 col1 text =
    R.span'
      </
        { style:
            R.css
              { color:
                  if Color.isReadable (darken 0.10 col1) Color.white then
                    "white"
                  else
                    "black"
              }
        }
      /> [ R.text text ]

  myBox depth =
    { boxShadow: E.str ("0 var(--s-3) " <> depth <> " " <> colour.boxShadow)
    , background: colour.backgroundCard
    , borderRadius: E.str "var(--s0)"
    , style: R.css { borderStyle: "inset" }
    }

  colBox1 col1 depth =
    (myBox depth)
      { background = cssStringRGBA col1
      , borderRadius = E.str "var(--s1)"
      , style = R.css { width: "33%", padding: "20px", textAlign: "center", fontWeight: 500 }
      }
