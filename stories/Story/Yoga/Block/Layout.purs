module Story.Yoga.Block.Atom.Layout
  ( default
  , layout
  ) where

import Yoga.Prelude.Style

import Data.Tuple.Nested ((/\))
import Effect.Unsafe (unsafePerformEffect)
import Fahrtwind as F
import Fahrtwind as FW
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Storybook (Meta, meta, metaDecorator)
import Yoga ((</>))
import Yoga.Block as Block
import Yoga.Block.Atom.Button.Types (ButtonShape(..), ButtonType(..))
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Types (AlignItems(..), JustifyContent(..))

default ∷ Meta {}
default = meta
  { title: "layout"
  , component: mempty
  , decorators:
      [ metaDecorator \storyFn →
          fragment
            [ element E.global
                { styles: Styles.global
                    <> css { "highlight-col": str "#ec0" }
                }
            , storyFn
            ]
      ]
  }

bg = FW.background'

colBox co = Block.box { css: FW.roundedDefault <> bg co }

mainContent = Block.stack
  { space: sizeStyle.s
  , css: FW.background' col.backgroundLayer1
  , splitAfter: 3
  }
  [ colBox col.backgroundLayer1
      [ Block.cluster
          { space: size.m
          , rowSpace: size.s
          , justifyContent: JEnd
          , alignItems: ACenter
          }
          [ Block.button
              { buttonType: Primary
              }
              [ R.text "Sign up" ]
          , Block.button {} [ R.text "Sign in" ]
          ]
      ]
  , Block.box_
      [ Block.grid { min: "150px" }
          [ colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          ]
      ]
  , Block.box_
      [ Block.cluster { space: size.s, rowSpace: size.xs }
          [ colBox col.backgroundLayer4 [ R.text "Child Row 2 1" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          , colBox col.backgroundLayer4 [ R.text "Child Row 2 2" ]
          ]
      ]
  , Block.box_
      [ Block.switcher { rowGap: "8px" }
          [ colBox col.backgroundLayer4 [ R.text "Switch me up" ]
          , colBox col.backgroundLayer4 [ R.text "Switch me too" ]
          , colBox col.backgroundLayer4 [ R.text "Switchy" ]
          ]
      ]
  ]

leftSidebar = Block.sidebar
  { sidebar: Block.stack
      { space: sizeStyle.xxs
      , splitAfter: 1
      }
      [ Block.button
          { buttonShape: Flat
          , css: widthFull
          , backgroundCol: col.backgroundLayer4
          , hoverBackgroundCol: col.backgroundLayer5
          , textCol: str (colour.text)
          , ripple: colourWithAlpha.text 0.3
          }
          [ Block.box
              { css: textLeft <> widthFull
              , padding: str "4px 0"
              }
              [ R.text "Sidebar First" ]
          ]
      , colBox col.backgroundLayer3 [ R.text "Sidebar Second" ]
      ]
  , space: "8px"
  , sideWidth: size."3xl"
  , css: heightFull
  }

layout ∷ Effect JSX
layout = pure $ layoutCompo </> {}

layoutCompo =
  unsafePerformEffect $ React.reactComponent "LayoutExample" \_ → React.do
    modalVisible /\ setModalVisible ← React.useState false
    pure $ Block.box
      { css: heightFull
          <> background' col.backgroundBright3
      }
      [ leftSidebar [ mainContent ]
      ]
