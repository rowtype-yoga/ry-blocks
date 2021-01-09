module React.Basic.SyntaxHighlighter.Component where

import Prelude
import Color (Color, ColorSpace(..))
import Color as Color
import React.Basic (ReactComponent)
import React.Basic.DOM (CSS, css)

foreign import syntaxHighlighter ∷
  ReactComponent
    { language ∷ String
    , style ∷ HighlighterTheme
    , children ∷ String
    }

type HighlighterTheme =
  { hljs ∷ CSS
  , "hljs-addition" ∷ CSS
  , "hljs-attribute" ∷ CSS
  , "hljs-built_in" ∷ CSS
  , "hljs-bullet" ∷ CSS
  , "hljs-comment" ∷ CSS
  , "hljs-deletion" ∷ CSS
  , "hljs-doctag" ∷ CSS
  , "hljs-emphasis" ∷ CSS
  , "hljs-keyword" ∷ CSS
  , "hljs-link" ∷ CSS
  , "hljs-literal" ∷ CSS
  , "hljs-meta" ∷ CSS
  , "hljs-name" ∷ CSS
  , "hljs-quote" ∷ CSS
  , "hljs-section" ∷ CSS
  , "hljs-selector-tag" ∷ CSS
  , "hljs-string" ∷ CSS
  , "hljs-strong" ∷ CSS
  , "hljs-subst" ∷ CSS
  , "hljs-symbol" ∷ CSS
  , "hljs-template-tag" ∷ CSS
  , "hljs-template-variable" ∷ CSS
  , "hljs-title" ∷ CSS
  , "hljs-type" ∷ CSS
  , "hljs-variable" ∷ CSS
  }

mkHighlighterTheme ∷
  { grey ∷ Color
  , highlightColour ∷ Color
  , textColour ∷ Color
  } ->
  HighlighterTheme
mkHighlighterTheme theme =
  { hljs:
    css
      { display: "inline"
      , overflowX: "auto"
      , color: Color.cssStringRGBA $ Color.mix HSL (Color.desaturate 0.5 theme.highlightColour) (Color.desaturate 0.3 theme.textColour) 0.4
      }
  , "hljs-keyword":
    css
      { color: "var(--highlight)"
      , fontWeight: "normal"
      }
  , "hljs-symbol":
    css
      { color: Color.cssStringRGBA $ theme.highlightColour
      }
  , "hljs-type":
    css
      { color: Color.cssStringRGBA theme.highlightColour
      , fontWeight: "normal"
      }
  , "hljs-string":
    css
      { color: Color.cssStringRGBA $ theme.highlightColour # Color.rotateHue (-15.0)
      }
  , "hljs-title":
    css
      { color: Color.cssStringRGBA $ theme.highlightColour # Color.rotateHue 15.0
      }
  , "hljs-comment":
    css
      { color: Color.cssStringRGBA $ theme.grey
      }
  , "hljs-selector-tag":
    css
      { color: "yellow"
      , fontWeight: "bold"
      }
  , "hljs-literal":
    css
      { color: "green"
      , fontWeight: "bold"
      }
  , "hljs-section":
    css
      { color: "darkslateblue"
      , fontWeight: "bold"
      }
  , "hljs-link":
    css
      { color: "yellow"
      }
  , "hljs-subst":
    css
      { color: "#ddd"
      }
  , "hljs-name":
    css
      { color: "#d88"
      , fontWeight: "bold"
      }
  , "hljs-attribute":
    css
      { color: "hotpink"
      }
  , "hljs-bullet":
    css
      { color: "#d88"
      }
  , "hljs-built_in":
    css
      { color: "#d88"
      }
  , "hljs-addition":
    css
      { color: "#d88"
      }
  , "hljs-variable":
    css
      { color: "#d88"
      }
  , "hljs-template-tag":
    css
      { color: "#d88"
      }
  , "hljs-template-variable":
    css
      { color: "#d88"
      }
  , "hljs-quote":
    css
      { color: "#777"
      }
  , "hljs-deletion":
    css
      { color: "#777"
      }
  , "hljs-meta":
    css
      { color: "#777"
      }
  , "hljs-doctag":
    css
      { fontWeight: "bold"
      }
  , "hljs-strong":
    css
      { fontWeight: "bold"
      }
  , "hljs-emphasis":
    css
      { fontStyle: "italic"
      }
  }
