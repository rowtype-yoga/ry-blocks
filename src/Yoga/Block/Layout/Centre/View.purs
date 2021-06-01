module Yoga.Block.Layout.Centre.View (component, Props, PropsF, PropsNoChildrenF, PropsNoChildren) where

import Yoga.Prelude.View
import Yoga.Block.Internal (DivPropsNoChildren)
import Yoga.Block.Layout.Centre.Style as Style

type PropsNoChildrenF f =
  ( className ∷ f String
  | Style.Props f + DivPropsNoChildren
  )

type PropsF f =
  ( children ∷ Array JSX
  | PropsNoChildrenF f
  )

type PropsNoChildren =
  PropsNoChildrenF Id

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Centre" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv
            ref
            props
            { className: "ry-centre " <>? props.className
            , css: Style.centre props
            }
