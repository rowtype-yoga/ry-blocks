module Yoga.Block.Layout.Centre.Story where

import Prelude
import Color (cssStringRGBA)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Centre as Centre
import Yoga.Block.Palette as Palette

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Layout/Centre"
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

centre ∷ Effect JSX
centre =
  pure
    $ fragment
        [ R.h2_ [ R.text "The Centre" ]
        , element Centre.component
            { children: [ R.text "Default" ]
            , style:
              css { backgroundColor: cssStringRGBA Palette.mango.regular, color: "black" }
            }
        , element Centre.component
            { children: [ R.text "Text Centred" ]
            , style:
              css { backgroundColor: cssStringRGBA Palette.violet.dark, color: "white" }
            , andText: true
            }
        , element Centre.component
            { children: [ R.text "With gutters" ]
            , style: css { backgroundColor: cssStringRGBA Palette.pink.dark, color: "white" }
            , gutters: 3.0 # E.em
            }
        , E.element Centre.component
            { children: [ R.text "With custom style" ]
            , css:
              E.css
                { borderRadius: "2em" # E.str
                , backgroundColor: Palette.azure.darker # E.color
                , color: E.str "white"
                , padding: "40px" # E.str
                }
            , className: "styled-centre"
            }
        ]
