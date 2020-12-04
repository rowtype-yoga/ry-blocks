module React.Basic.SyntaxHighlighter.Story where

import Yoga.Prelude.Default
import Color as Color
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.SyntaxHighlighter.Component (mkHighlighterTheme)
import React.Basic.SyntaxHighlighter.Component as SH
import Yoga (el)
import Yoga.Block.Container.Style as Styles

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "React Syntax Highlighter"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

syntaxHighlighter ∷ Effect JSX
syntaxHighlighter = do
  pure
    $ fragment
        [ R.h2_ [ R.text "PureScript Example" ]
        , element SH.syntaxHighlighter
            { language: "purescript"
            , style:
              mkHighlighterTheme
                { grey: Color.rgb 80 80 80
                , highlightColour: Color.rgb 30 220 190
                , textColour: Color.rgb 220 220 220
                }
            , children: exampleCode
            }
        , R.h2_ [ R.text "Javascript Example" ]
        , element SH.syntaxHighlighter
            { language: "javascript"
            , style:
              mkHighlighterTheme
                { grey: Color.rgb 50 50 50
                , highlightColour: Color.rgb 230 20 90
                , textColour: Color.rgb 250 250 250
                }
            , children:
              """undefined is not a function"""
            }
        , R.h2_ [ R.text "Go Example" ]
        , element SH.syntaxHighlighter
            { language: "golang"
            , style:
              mkHighlighterTheme
                { grey: Color.rgb 50 50 50
                , highlightColour: Color.rgb 200 70 190
                , textColour: Color.rgb 250 250 250
                }
            , children:
              """if err != nil { log.Fatalf("hohoho") }"""
            }
        ]
  where
    exampleCode ∷ String
    exampleCode =
      """module Main where
import Prelude
import Effect (Effect)
import Effect.Console (log)

main ∷ Effect Unit
main = do
  log "Yay"
"""
