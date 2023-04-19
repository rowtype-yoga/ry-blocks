module Yoga.Block.Layout.Box.View
  ( component
  , Props
  , PropsNoChildren
  , PropsNoChildrenF
  , PropsF
  ) where

import Yoga.Prelude.View
import Yoga.Block.Internal (DivPropsNoChildren)
import Yoga.Block.Layout.Box.Style as Style

type PropsNoChildrenF f =
  ( className ∷ f String
  | Style.Props f + DivPropsNoChildren
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

component ∷ ∀ p p_. Union p p_ Props ⇒ ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Box" do
    \(props ∷ { | PropsOptional }) ref → React.do
      pure
        $ emotionDiv
            ref
            props
            { className: "ry-box " <>? props.className
            , css: Style.box props
            }
