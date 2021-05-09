module Yoga.Block.Layout.Cluster.View (component, Props, PropsF) where

import Yoga.Prelude.View
import React.Basic.DOM as R
import Yoga.Block.Layout.Cluster.Style as Style

type PropsF f =
  ( className ∷ f String
  , wrapper ∷ f (Array JSX -> JSX)
  | Style.Props f DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Cluster" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let wrap = props.wrapper ?|| R.div_
      pure
        $ emotionDiv ref props
            { className: "ry-cluster " <>? props.className
            , css: Style.cluster props
            , children: [ wrap props.children ]
            }
