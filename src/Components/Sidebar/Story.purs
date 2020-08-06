module Components.Sidebar.Story where

import Prelude
import Components.Container.Style as Styles
import Components.Sidebar as Sidebar
import Components.Sidebar.Style (SidebarSide(..))
import Data.Monoid (power)
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
  { title: "Layout/Sidebar"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

sidebar ∷ Effect JSX
sidebar =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "No Options" ]
            , element Sidebar.component
                { children:
                  [ R.div_
                      [ R.div { children: [ R.text "Sidebar" ], style: css { backgroundColor: "teal" } }
                      , R.div { children: [ R.text $ power "Content " 10 ], style: css { backgroundColor: "darkslateblue" } }
                      ]
                  ]
                , style: css { backgroundColor: "oldlace" }
                }
            , R.h2_ [ R.text "Zero Space" ]
            , element Sidebar.component
                { children:
                  [ R.div_
                      [ R.div { children: [ R.text "Child 1" ], style: css { backgroundColor: "teal" } }
                      , R.div { children: [ R.text "Child 2" ], style: css { backgroundColor: "darkslateblue" } }
                      ]
                  ]
                , style: css { backgroundColor: "oldlace" }
                , space: "0"
                }
            , R.h2_ [ R.text "Sidebar Right" ]
            , element Sidebar.component
                { children:
                  [ R.div_
                      [ R.div { children: [ R.text $ power "Content " 50 ], style: css { backgroundColor: "darkslateblue" } }
                      , R.div { children: [ R.text "Sidebar" ], style: css { backgroundColor: "teal" } }
                      ]
                  ]
                , style: css { backgroundColor: "oldlace" }
                , sideWidth: "40px"
                , contentMin: "80%"
                , space: "2em"
                , side: SidebarRight
                }
            ]
        ]
