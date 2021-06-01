module Yoga.Block.Container.Story where

import Prelude
import Effect (Effect)
import React.Basic (JSX, element)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga (el, styledLeaf)
import Yoga.Block as Block
import Yoga.Block.Container as Container
import Yoga.Block.Container.Style (colour, inputFocus)
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Layout.Cluster as Cluster
import Yoga.Block.Layout.Stack as Stack

default ∷ { title ∷ String }
default = { title: "Pages/Container" }

container ∷ Effect JSX
container =
  pure
    ( element Container.component
        { children:
          [ el Box.component { style: css { background: colour.backgroundLayer1 } }
              [ el Box.component { style: css { background: colour.backgroundLayer2 } }
                  [ el Box.component { style: css { background: colour.backgroundLayer3 } }
                      [ el Box.component { style: css { background: colour.backgroundLayer4 } }
                          [ el Box.component { style: css { background: colour.backgroundLayer5 } }
                              []
                          ]
                      ]
                  ]
              ]
          , Block.box {}
              [ Block.stack { space: E.str "10px" }
                  [ Block.box
                      { style:
                        css
                          { background: colour.highlight
                          , color: colour.highlightText
                          }
                      }
                      [ R.text "Highlight" ]
                  , Block.box
                      { style:
                        css
                          { background:
                            "linear-gradient(90deg," <> colour.highlightRotatedForwards <> "," <> colour.highlightRotatedBackwards <> ")"
                          , color: colour.highlightText
                          }
                      }
                      [ R.text "Highlight gradient" ]
                  ]
              ]
          , R.text "Content"
          , el Stack.component {}
              [ el Cluster.component {}
                  [ R.input { value: "Text" }
                  , R.input { type: "number", value: "0" }
                  , styledLeaf R.input'
                      { className: "styledinput"
                      , css: inputFocus
                      , value: "focus"
                      }
                  , R.input
                      { className: "styledinput"
                      , value: "focus"
                      , disabled: true
                      }
                  ]
              , R.input { type: "file" }
              , el Cluster.component {}
                  [ R.input { type: "checkbox" }
                  , R.input { type: "checkbox", checked: true }
                  , R.input { type: "radio" }
                  , R.input { type: "radio", checked: true }
                  ]
              , R.input { type: "range" }
              ]
          , R.h1_ [ R.text "Largest heading (h1)" ]
          , psParagraph
          , R.h2_ [ R.text "Second largest heading (h2)" ]
          , psParagraph
          , R.h3_ [ R.text "Third largest heading (h3)" ]
          , psParagraph
          , R.p_ [ R.text "Make sure to have the following meta tag in your head" ]
          , R.code_
              [ R.text
                  """<meta name="viewport" content="width=device-width, initial-scale=1.0">"""
              ]
          , R.h1_ [ R.text "Very long largest heading that can result in multiple lines" ]
          ]
        }
    )
  where
  psParagraph ∷ JSX
  psParagraph =
    R.p_
      [ R.text
          """PureScript is a strongly-typed, purely-functional programming language that compiles to JavaScript. It can be used to develop web applications, server side apps, and also desktop applications with use of Electron. Its syntax is mostly comparable to that of Haskell. In addition, it introduces row polymorphism and extensible records.[2] Also, contrary to Haskell, PureScript adheres to a strict evaluation strategy. """
      ]
