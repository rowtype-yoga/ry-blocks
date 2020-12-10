module Yoga.Block.Layout.Box.View (component, Props, PropsF) where

import Yoga.Prelude.View
import Yoga.Block.Layout.Box.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f + DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Box" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv
            ref
            props
            { className: "ry-box " <>? props.className
            , css: Style.box props
            }
