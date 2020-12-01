module Yoga.Block.Layout.Sidebar.View (component, Props, PropsF) where

import Yoga.Prelude.View
import Yoga.Block.Layout.Sidebar.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component =
  mkForwardRefComponent "Sidebar" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv props
            { className: "ry-sidebar " <>? props.className
            , css: Style.sidebar props
            , ref
            }
