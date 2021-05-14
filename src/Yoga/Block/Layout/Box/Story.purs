module Yoga.Block.Layout.Box.Story where

import Prelude
import Color (darken)
import Color as Color
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga ((/>), (</))
import Yoga.Block as Block
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Palette as Palette

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
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
        , Block.stack </ {}
            /> [ Box.component </ myBox "var(--s1)" /> [ R.text "Shadow" ]
              , cluster
                  [ Box.component </ colBox1 Palette.pink.regular "var(--s0)" /> [ colText1 Palette.pink.regular "text" ]
                  , Box.component </ colBox1 Palette.pink.darker "var(--s0)" /> [ colText1 Palette.pink.darker "text" ]
                  , Box.component </ colBox1 Palette.pink.dark "var(--s0)" /> [ colText1 Palette.pink.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.mauve.regular "var(--s-1)" /> [ colText1 Palette.mauve.regular "text" ]
                  , Box.component </ colBox1 Palette.mauve.darker "var(--s0)" /> [ colText1 Palette.mauve.darker "text" ]
                  , Box.component </ colBox1 Palette.mauve.dark "var(--s0)" /> [ colText1 Palette.mauve.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.violet.regular "var(--s-1)" /> [ colText1 Palette.violet.regular "text" ]
                  , Box.component </ colBox1 Palette.violet.darker "var(--s0)" /> [ colText1 Palette.violet.darker "text" ]
                  , Box.component </ colBox1 Palette.violet.dark "var(--s0)" /> [ colText1 Palette.violet.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.blue.regular "var(--s0)" /> [ colText1 Palette.blue.dark "text" ]
                  , Box.component </ colBox1 Palette.blue.darker "var(--s0)" /> [ colText1 Palette.blue.darker "text" ]
                  , Box.component </ colBox1 Palette.blue.dark "var(--s0)" /> [ colText1 Palette.blue.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.azure.regular "var(--s0)" /> [ colText1 Palette.azure.dark "text" ]
                  , Box.component </ colBox1 Palette.azure.darker "var(--s0)" /> [ colText1 Palette.azure.darker "text" ]
                  , Box.component </ colBox1 Palette.azure.dark "var(--s0)" /> [ colText1 Palette.azure.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.capri.regular "var(--s-1)" /> [ colText1 Palette.capri.regular "text" ]
                  , Box.component </ colBox1 Palette.capri.darker "var(--s0)" /> [ colText1 Palette.capri.darker "text" ]
                  , Box.component </ colBox1 Palette.capri.dark "var(--s0)" /> [ colText1 Palette.capri.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.seaGreen.regular "var(--s0)" /> [ colText1 Palette.seaGreen.regular "text" ]
                  , Box.component </ colBox1 Palette.seaGreen.darker "var(--s0)" /> [ colText1 Palette.seaGreen.darker "text" ]
                  , Box.component </ colBox1 Palette.seaGreen.dark "var(--s0)" /> [ colText1 Palette.seaGreen.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.malachite.regular "var(--s-1)" /> [ colText1 Palette.malachite.regular "text" ]
                  , Box.component </ colBox1 Palette.malachite.darker "var(--s0)" /> [ colText1 Palette.malachite.darker "text" ]
                  , Box.component </ colBox1 Palette.malachite.dark "var(--s0)" /> [ colText1 Palette.malachite.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.yellow.regular "var(--s-1)" /> [ colText1 Palette.yellow.regular "text" ]
                  , Box.component </ colBox1 Palette.yellow.darker "var(--s0)" /> [ colText1 Palette.yellow.darker "text" ]
                  , Box.component </ colBox1 Palette.yellow.dark "var(--s0)" /> [ colText1 Palette.yellow.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.mango.regular "var(--s-1)" /> [ colText1 Palette.mango.regular "text" ]
                  , Box.component </ colBox1 Palette.mango.darker "var(--s0)" /> [ colText1 Palette.mango.darker "text" ]
                  , Box.component </ colBox1 Palette.mango.dark "var(--s0)" /> [ colText1 Palette.mango.dark "text" ]
                  ]
              , cluster
                  [ Box.component </ colBox1 Palette.coral.regular "var(--s-1)" /> [ colText1 Palette.coral.regular "text" ]
                  , Box.component </ colBox1 Palette.coral.darker "var(--s0)" /> [ colText1 Palette.coral.darker "text" ]
                  , Box.component </ colBox1 Palette.coral.dark "var(--s0)" /> [ colText1 Palette.coral.dark "text" ]
                  ]
              ]
        ]
  where
  cluster = Block.cluster </ { space: "0px", justify: "space-between" }

  colText1 col1 text =
    R.span'
      </ { style:
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
      { background = Palette.gradientBox col1
      , borderRadius = E.str "var(--s1)"
      , style = R.css { width: "33%", padding: "20px", textAlign: "center", fontWeight: 500 }
      }
