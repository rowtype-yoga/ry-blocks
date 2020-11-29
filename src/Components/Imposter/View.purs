module Components.Imposter.View (component, Props, PropsF) where

import Prelude.View
import Components.Imposter.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = do
  mkForwardRefComponent "Imposter" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv props
            { className: "ry-imposter " <>? props.className
            , css: Style.imposter props
            , ref
            }
