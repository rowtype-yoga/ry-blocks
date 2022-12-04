module Yoga.Block.Layout.Grid.View (component, Props, PropsF) where

import Yoga.Prelude.View
import Yoga.Block.Layout.Grid.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷
  ∀ p p_. Union p p_ Props ⇒ ReactComponent { children ∷ Array JSX | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Grid" do
    \(props ∷ { | PropsOptional }) ref → React.do
      pure
        $ emotionDiv ref props
            { className: "ry-grid " <>? props.className
            , css: Style.grid props
            , children: props.children
            }
