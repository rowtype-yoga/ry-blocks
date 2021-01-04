module Yoga.Block.Layout.Stack.View (component, Props, PropsF) where

import Yoga.Prelude.View
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Layout.Stack.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

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
      let wrappedChildren = safeChildren <#> \c -> div </ {} /> [ c ]
      pure
        $ emotionDiv ref props
            { className: "ry-stack " <>? props.className
            , css: Style.stack props
            , children: wrappedChildren
            }
