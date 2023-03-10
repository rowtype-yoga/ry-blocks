module Story.Yoga.Block.Atom.Button2 (default, button) where

import Prelude hiding (div)

import Color (cssStringRGBA)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Fahrtwind as F
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion (str)
import React.Basic.Emotion as E
import Yoga ((</>))
import Yoga.Block as Block
import Yoga.Block.Atom.Button.Types as ButtonType
import Yoga.Block.Container.Style (colour, size)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Icon.SVG as Icon
import Yoga.Block.Internal.CSS (nest)

default ∷
  { decorators ∷ Array (Effect JSX → JSX)
  , title ∷ String
  }
default =
  { title: "Atom/ButtonGroup"
  , decorators:
      [ \storyFn →
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
            , Block.cluster { space: "var(--s-1)" }
                [ Block.button { buttonType: ButtonType.Generic }
                    [ R.text "Generic" ]
                , Block.button { buttonType: ButtonType.Primary }
                    [ R.text "Primary" ]
                , Block.button { buttonType: ButtonType.Dangerous }
                    [ R.text "Dangerous" ]
                , Block.button
                    { css: customStyle, ripple: F.emerald._500 # cssStringRGBA }
                    [ R.text "Custom" ]
                , Block.button { css: customStyle2 } [ R.text "Custom 2" ]
                ]
            , R.h2_ [ R.text "Button shapes" ]
            , Block.cluster { space: "var(--s-1)" }
                [ Block.button
                    { buttonType: ButtonType.Generic
                    , buttonShape: ButtonType.Pill
                    }
                    [ R.text "Generic Pill" ]
                , Block.button
                    { buttonType: ButtonType.Primary
                    , buttonShape: ButtonType.Pill
                    }
                    [ R.text "Generic Primary" ]
                , Block.button
                    { buttonType: ButtonType.Generic
                    , buttonShape: ButtonType.Flat
                    }
                    [ R.text "Flat Pill" ]
                , Block.button
                    { buttonType: ButtonType.Primary
                    , buttonShape: ButtonType.Flat
                    }
                    [ R.text "Flat Primary" ]
                , Block.button
                    { css: customStyle, buttonShape: ButtonType.Pill }
                    [ R.text "+ Custom" ]
                ]
            , R.h2_ [ R.text "Icon button" ]
            , Block.cluster { space: "var(--s-1)" }
                [ Block.button {}
                    [ Block.icon' </>
                        { icon: Icon.questionMark
                        , size: str "var(--s2)"
                        , colour: str colour.highlight
                        }
                    ]
                ]
            , R.h2_ [ R.text "Disabled" ]
            , Block.cluster { space: "var(--s-1)" }
                [ Block.button
                    { buttonType: ButtonType.Generic, disabled: true }
                    [ R.text "Generic" ]
                , Block.button
                    { buttonType: ButtonType.Primary, disabled: true }
                    [ R.text "Primary" ]
                , Block.button
                    { buttonType: ButtonType.Generic
                    , buttonShape: ButtonType.Pill
                    , disabled: true
                    }
                    [ R.text "Generic" ]
                , Block.button
                    { buttonType: ButtonType.Primary
                    , buttonShape: ButtonType.Pill
                    , disabled: true
                    }
                    [ R.text "Primary" ]
                ]
            ]
        ]

customStyle ∷ E.Style
customStyle =
  E.css
    { background: E.str colour.backgroundLayer5
    , border: E.str $ "1px solid " <> colour.backgroundLayer2
    , boxShadow: E.none
    , paddingTop: E.str $ size.s
    , paddingBottom: E.str $ size.s
    , paddingLeft: E.str $ size.xl
    , paddingRight: E.str $ size.xl
    , fontWeight: E.str "500"
    , transition: str "all 0.7s ease"
    , "&:active":
        nest
          { boxShadow: E.none
          , border: E.str $ "1px solid " <> colour.highlightText
          , transform: E.none
          , background: E.str colour.highlight
          , color: E.str colour.highlightText
          }
    , "&:hover":
        nest
          { boxShadow: E.none
          , border: E.str $ "1px solid " <> colour.backgroundLayer1
          , transform: E.none
          , background: E.str colour.backgroundLayer4
          , color: E.str colour.text
          }
    }

customStyle2 ∷ E.Style
customStyle2 =
  E.css
    { background: E.color F.green._500
    , color: E.str "white"
    , border: E.none
    , fontWeight: E.str "400"
    , minWidth: E.str size."3xl"
    , "&:focus":
        nest
          { border: E.str $ "1px solid " <> colour.background
          }
    }
