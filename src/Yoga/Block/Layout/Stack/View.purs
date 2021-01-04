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
      -- Wrapping children to use `:nth-of-type` instead of `:nth-child` 
      -- in CSS because the latter is problematic in SSR
      let wrappedChildren = props.children <#> \c -> div </ {} /> [ c ]
      pure
        $ emotionDiv ref props
            { className: "ry-stack " <>? props.className
            , css: Style.stack props
            , children: wrappedChildren
            }
