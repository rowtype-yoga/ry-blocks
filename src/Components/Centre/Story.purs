module Components.Centre.Story where

import Prelude
import Components.Centre as Centre
import Components.Container.Style as Styles
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Layout/Centre"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

centre ∷ Effect JSX
centre =
  pure
    $ fragment
        [ element Centre.component
            { children: [ R.text "Default" ]
            }
        , element Centre.component
            { children: [ R.text "Text Centred" ]
            , style: css { backgroundColor: "darkslateblue" }
            , andText: true
            }
        , element Centre.component
            { children: [ R.text "With gutters" ]
            , style: css { backgroundColor: "dodgerblue" }
            , gutters: 3.0 # E.em
            }
        , E.element Centre.component
            { children: [ R.text "With custom style" ]
            , css:
              E.css
                { borderRadius: "1em" # E.str
                , backgroundColor: "darkslategrey" # E.str
                , textAlign: "center" # E.str
                }
            , className:
              "styled-centre"
            }
        ]
