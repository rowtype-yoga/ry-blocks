module Yoga.Block.Layout.Layers.View where

import Yoga.Prelude.View

import Yoga.Block.Internal (DivPropsNoChildren)
import Yoga.Block.Layout.Layers.Style as Style

type PropsNoChildrenF f =
  ( className ∷ f String
  | Style.Props f DivPropsNoChildren
  )

type PropsF f =
  ( children ∷ Array JSX
  | PropsNoChildrenF f
  )

type Props =
  PropsF Id

type PropsNoChildren =
  PropsNoChildrenF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p q. Union p q Props ⇒ ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Imposter" do
    \(props ∷ { | PropsOptional }) ref → React.do
      pure
        $ emotionDiv ref props
            { className: "ry-layers " <>? props.className
            , css: Style.layers props
            }
