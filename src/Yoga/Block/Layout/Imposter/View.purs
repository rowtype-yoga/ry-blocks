module Yoga.Block.Layout.Imposter.View (component, Props, PropsF) where

import Yoga.Prelude.View
import Yoga.Block.Layout.Imposter.Style as Style

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
  mkForwardRefComponent "Imposter" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv ref props
            { className: "ry-imposter " <>? props.className
            , css: Style.imposter props
            }
