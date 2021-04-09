module Yoga.Block.Atom.Icon.Story where

import Prelude
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Icon.SVG as SVGIcon

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Icon"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

icon ∷ Effect JSX
icon = do
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Icon" ]
            , element Icon.component { icon: SVGIcon.on, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.off, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.sun, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.moon, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.eyeClosed, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.eyeOpen, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.bin, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.cross, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.folder, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.key, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.magnifyingGlass, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.simpleKey, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.questionMark, size: E.str "var(--s2)" }
            , element Icon.component { icon: SVGIcon.plus, size: E.str "var(--s2)" }
            ]
        ]
