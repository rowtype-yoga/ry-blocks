module Story.Yoga.Block.Molecule.Modal.Story (default, modal) where

import Prelude

import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Fahrtwind (background', mXY, roundedLg, textXl)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import React.Basic.Hooks (bind, component, element, useState') as React
import Storybook (Meta, meta, metaDecorator)
import Yoga ((/>), (</*), (</>))
import Yoga.Block as Block
import Yoga.Block.Molecule.Modal as Modal
import Yoga.Block.Container.Style (col)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Icon.SVG as SVGIcon
import Yoga.Block.Layout.Types (JustifyContent(..))

default ∷ Meta Modal.Props
default = meta
  { title: "Molecule/Modal"
  , component: (pure <<< React.element) Modal.component
  , decorators:
      [ metaDecorator \storyFn →
          fragment
            [ element E.global { styles: Styles.global }
            , storyFn
            , Block.layer { id: "modals", zIndex: 10 }
            , Block.layer { id: "clickaway", zIndex: 5 }
            ]
      ]
  }

modal ∷ Effect JSX
modal = (_ $ unit) <$> React.component "ModalExample" \_ → React.do
  open /\ setOpen ← React.useState' true
  pure $
    R.div_
      [ R.h2_ [ R.text "Modal" ]
      , Block.button { onClick: handler_ (setOpen true) }
          [ R.text "Open modal" ]
      , Block.modal
          { hide: setOpen false
          , isVisible: open
          , content: modalContent (setOpen false)
          , allowClickAway: true
          , clickAwayId: "clickaway"
          , modalContainerId: "modals"
          }
      ]
  where
  modalContent dismiss =
    Block.box { css: background' col.backgroundBright4 <> roundedLg }
      [ Block.stack { splitAfter: 2 }
          [ Block.cluster { space: "0", justifyContent: JBetween }
              [ R.h2' </* { css: textXl <> mXY 0 } /> [ R.text "Skandal!" ]
              , Block.icon </> { icon: SVGIcon.cross }
              ]
          , R.p_
              [ R.text "This is the content of the modal it has a lot of text"
              , R.text "This is the content of the modal it has a lot of text"
              , R.text "This is the content of the modal it has a lot of text"
              , R.text "This is the content of the modal it has a lot of text"
              ]
          , Block.cluster { justifyContent: JEnd }
              [ Block.button { onClick: handler_ dismiss } [ R.text "OK" ] ]
          ]
      ]
