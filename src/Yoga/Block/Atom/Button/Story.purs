module Yoga.Block.Atom.Button.Story where

import Prelude hiding (div)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion (str)
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import Yoga (div, (/>), (</), (</>))
import Yoga.Block as Block
import Yoga.Block.Atom.Button.Types as ButtonType
import Yoga.Block.Atom.Button.View as Button
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Icon.SVG as Icon

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Button"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

button ∷ Effect JSX
button = do
  pure
    $ fragment
        [ R.div_
            [ R.h1_ [ R.text "Button Examples" ]
            , R.h2_ [ R.text "Button types" ]
            , Block.cluster </ { space: "var(--s-1)" }
                /> [ div </ {}
                      /> [ Button.component </ { buttonType: ButtonType.Generic } /> [ R.text "Generic" ]
                        , Button.component </ { buttonType: ButtonType.Primary } /> [ R.text "Primary" ]
                        ]
                  ]
            , R.h2_ [ R.text "Button shapes" ]
            , Block.cluster </ { space: "var(--s-1)" }
                /> [ div </ {}
                      /> [ Button.component </ { buttonType: ButtonType.Generic, buttonShape: ButtonType.Pill } /> [ R.text "Generic" ]
                        , Button.component </ { buttonType: ButtonType.Primary, buttonShape: ButtonType.Pill } /> [ R.text "Primary" ]
                        ]
                  ]
            , R.h2_ [ R.text "Icon button" ]
            , Block.cluster </ { space: "var(--s-1)" }
                /> [ div </ {}
                      /> [ Button.component </ {} /> [ Block.icon </> { icon: Icon.questionMark, size: str "var(--s2)", colour: str colour.highlight } ]
                        ]
                  ]
            ]
        ]
