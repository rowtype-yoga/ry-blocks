module Yoga.Block.Layout.Sidebar.View (component, Props, PropsF) where

import Yoga.Prelude.View
import React.Basic.DOM (div_)
import Yoga.Block.Layout.Sidebar.Style as Style

type PropsF f =
  ( className ∷ f String
  , sidebar ∷ JSX
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { sidebar ∷ JSX, children ∷ Array JSX | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Sidebar" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv ref
            props
            { className: "ry-sidebar " <>? props.className
            , css: Style.sidebar props
            , children:
              [ div_
                  [ div_ [ props.sidebar ]
                  , div_ props.children
                  ]
              ]
            }
