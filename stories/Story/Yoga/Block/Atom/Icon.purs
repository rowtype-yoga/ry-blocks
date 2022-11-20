module Story.Yoga.Block.Atom.Icon.Story where

import Prelude

import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic as React
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Storybook (Meta, meta, metaDecorator)
import Yoga ((</>))
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Icon.SVG as SVGIcon

default ∷ Meta { | Icon.Props }
default = meta
  { title: "Atom/Icon"
  , component: (pure <<< React.element) Icon.component
  , decorators:
      [ metaDecorator \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

icon ∷ Effect JSX
icon = do
  pure $
    R.div_
      [ R.h2_ [ R.text "Icon" ]
      , icon SVGIcon.on
      , icon SVGIcon.off
      , icon SVGIcon.sun
      , icon SVGIcon.moon
      , icon SVGIcon.eyeClosed
      , icon SVGIcon.eyeOpen
      , icon SVGIcon.bin
      , icon SVGIcon.cross
      , icon SVGIcon.folder
      , icon SVGIcon.key
      , icon SVGIcon.magnifyingGlass
      , icon SVGIcon.simpleKey
      , icon SVGIcon.questionMark
      , icon SVGIcon.plus
      , icon SVGIcon.warn
      ]
  where
  icon svg = Icon.component </>
    { icon: svg, size: E.str "var(--s2)" }
