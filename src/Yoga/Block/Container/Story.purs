module Yoga.Block.Container.Story where

import Prelude
import Data.Monoid (power)
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
                                [ R.div { style: css { color: colour.text }, children: [ R.text "Text" ] }
                                , R.div { style: css { color: colour.textPaler1 }, children: [ R.text "Text Paler 1" ] }
                                , R.div { style: css { color: colour.textPaler2 }, children: [ R.text "Text Paler 2" ] }
                                , R.div { style: css { color: colour.textPaler3 }, children: [ R.text "Text Paler 3" ] }
                                , R.div { style: css { color: colour.textPaler4 }, children: [ R.text "Text Paler 4" ] }
                                ]
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
                    ]
                , Block.stack { space: E.str "10px" }
                    [ Block.box
                        { style:
                            css
                              { background: colour.background
                              , color: colour.highlightTextOnBackground
                              }
                        }
                        [ R.text "Highlight Text on Background" ]
                    ]
                , Block.box
                    { style:
                        css
                          { background:
                              "linear-gradient(90deg," <> colour.highlightRotatedForwards <> "," <> colour.highlightRotatedBackwards <> ")"
                          , color: colour.highlightText
                          }
                    }
                    [ R.text "Highlight gradient" ]
                , E.element Block.box'
                    { className: ""
                    , padding: E.px 1
                    , css:
                        E.css
                          { background: E.str "linear-gradient(90deg, rgb(32, 37, 63) 0%, rgb(118, 74, 151) 15%, rgb(71, 107, 169) 20%, rgb(85, 167, 177) 29%, rgb(85, 167, 177) 32%, rgb(32, 37, 63) 40%, rgb(32, 37, 63) 50%, rgb(118, 74, 151) 60%, rgb(71, 107, 169) 70%, rgb(85, 167, 177) 80%, rgb(32, 37, 63) 100%)"
                          , backgroundSize: E.percent 500.0
                          , animation: E.str "15s linear 0s infinite normal none running"
                          , animationName:
                              E.keyframes
                                { "0%": E.css { backgroundPosition: E.str "0% center" }
                                , "100%": E.css { backgroundPosition: E.str "500% center" }
                                }
                          , color: E.str colour.highlightText
                          , overflow: E.hidden
                          , "&::before":
                              E.nested
                                $ E.css
                                    { content: E.str $ "'" <> (power "Shiny boy     " 50 <> "'")
                                    , letterSpacing: E.str "4px"
                                    , backgroundRepeat: E.str "repeat-x"
                                    , whiteSpace: E.nowrap
                                    , fontSize: E.str "12px"
                                    , overflow: E.hidden
                                    , animation: E.str "5s linear 0s infinite normal none running"
                                    , left: E.px 0
                                    , fontWeight: E.str "800"
                                    , position: E.relative
                                    , height: E.px 20
                                    , animationName:
                                        E.keyframes
                                          { "100%": E.css { left: E.str "calc(-100%)" }
                                          , "0%": E.css { left: E.str "calc(0%)" }
                                          }
                                    }
                          }
                    }
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
