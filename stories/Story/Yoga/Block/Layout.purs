module Story.Yoga.Block.Atom.Layout
  ( default
  , layout
  ) where

import Yoga.Prelude.Style

import Fahrtwind as FW
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Storybook (Meta, meta, metaDecorator)
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Types (AlignItems(..), JustifyContent(..))

default ∷ Meta {}
default = meta
  { title: "layout"
  , component: mempty
  , decorators:
      [ metaDecorator \storyFn ->
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

bg = FW.background'

colBox co = Block.box { css: FW.roundedDefault <> bg co }

layout :: Effect JSX
layout = pure $ Block.box { padding: sizeStyle.s, css: bg col.highlight }
  [ Block.sidebar
      { sidebar: colBox col.backgroundLayer2 [ R.text "Sidebar" ]
      , sideWidth: size."4xl"
      }
      [ Block.stack
          { space: sizeStyle.xl
          , css: FW.background' col.backgroundLayer1
          , splitAfter: 1
          }
          [ Block.cluster { space: size.m, rowSpace: size.s, justifyContent: JEnd, alignItems: ACenter }
              [ colBox col.backgroundLayer4 [ R.text "Child Row 1 1" ], colBox col.backgroundLayer4 [ R.text "Child Row 1 2" ] ]
          , Block.cluster { space: size.s, rowSpace: size.zero }
              [ colBox col.backgroundLayer4 [ R.text "Child Row 2 1" ], colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ] ]
          ]
      ]

  ]

