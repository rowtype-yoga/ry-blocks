module Yoga.Block.Layout.Switcher.View
  ( component
  , Props
  , PropsNoChildren
  , PropsF
  ) where

import Yoga.Prelude.View

import React.Basic.DOM as R
import Yoga.Block.Internal (DivPropsNoChildrenF)
import Yoga.Block.Layout.Switcher.Style as Style

type PropsF ∷ ∀ k. (Type → k) → Row k → Row k
type PropsF f r =
  ( className ∷ f String
  | Style.Props f r
  )

type PropsNoChildren =
  PropsF Id (DivPropsNoChildrenF Id ())

type Props =
  PropsF Id (DivPropsF Id ())

type PropsOptional =
  PropsF OptionalProp (DivProps)

component ∷ ∀ p p_. Union p p_ Props ⇒ ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Switcher" do
    \(props ∷ { | PropsOptional }) ref → React.do
      pure
        $ emotionDiv ref props
            { className: "ry-switcher " <>? props.className
            , css: Style.switcher props
            , children: props.children
            }
