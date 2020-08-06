module Components.Cluster.View (component, Props, PropsF) where

import Prelude.View
import Components.Cluster.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷
  ∀ p p_.
  Union p p_ Props =>
  ReactComponent { | p }
component =
  mkForwardRefComponent "Cluster" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv props
            { className: "ry-cluster " <>? props.className
            , css: Style.cluster props
            , ref
            }
