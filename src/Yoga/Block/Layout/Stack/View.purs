module Yoga.Block.Layout.Stack.View (component, Props, PropsNoChildren, PropsNoChildrenF, PropsF) where

import Yoga.Prelude.View
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Internal (DivPropsNoChildren)
import Yoga.Block.Layout.Stack.Style as Style

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

component ∷ ∀ p q. Union p q Props => ReactComponent { children ∷ Array JSX | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Stack" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      -- Must be careful here because React fiddles with children
      let safeChildren = reactChildrenToArray (unsafeCoerce props.children)
      -- Wrapping children to use `:nth-of-type` instead of `:nth-child` 
      -- in CSS because the latter is problematic in SSR
      pure
        $ emotionDiv ref props
            { className: "ry-stack " <>? props.className
            , css: Style.stack props
            , children: safeChildren
            }
