module Yoga.Block.Quark.Layer.View where

import Yoga.Prelude.View

import React.Basic.DOM as R
import Yoga.Block.Quark.Layer.Style as Style

type Props =
  ( id ∷ String
  , zIndex ∷ Int
  )

component ∷ ReactComponent { | Props }
component = mkForwardRefComponent "FixedLayer" \props ref → React.do
  let { id, zIndex } = props
  pure
    $ div'
    </*>
      { id
      , style: R.css { zIndex }
      , className: "ry-layer"
      , css: Style.fixed
      , ref
      }
