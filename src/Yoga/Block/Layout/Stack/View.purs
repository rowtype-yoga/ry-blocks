module Yoga.Block.Layout.Stack.View (component, Props, PropsF) where

import Yoga.Prelude.View
import Yoga.Block.Layout.Stack.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Stack" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv ref props
            { className: "ry-stack " <>? props.className
            , css: Style.stack props
            }
