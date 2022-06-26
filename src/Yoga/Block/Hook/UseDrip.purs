module Yoga.Block.Hook.UseDrip where

import Yoga.Prelude.View

import Data.Newtype (class Newtype)
import React.Basic.DOM.Events (clientX, clientY)
import React.Basic.Hooks as React

type DripReturn =
  { visible :: Boolean
  , x :: Number
  , y :: Number
  , onClick :: EventHandler
  , onComplete :: Effect Unit
  }

newtype UseDrip hooks = UseDrip
  (UseState Number (UseState Number (UseState Boolean hooks)))

derive instance Newtype (UseDrip hooks) _

useDrip :: NodeRef -> Hook UseDrip DripReturn
useDrip ref = coerceHook React.do
  visible /\ setVisible <- React.useState' false
  x /\ setX <- React.useState' zero
  y /\ setY <- React.useState' zero

  let
    dripCompletedHandle = do
      setVisible false
      setX zero
      setY zero

  let
    clickHandler = handler (merge { clientX, clientY }) \{ clientX, clientY } -> do
      bbʔ <- getBoundingBoxFromRef ref
      let
        valuesʔ = ado
          { left, top } <- bbʔ
          cx <- clientX
          cy <- clientY
          in { left, top, cx, cy }
      for_ valuesʔ \{ cx, cy, left, top } -> do
        setVisible true
        setX (cx - left)
        setY (cy - top)

  pure
    { visible: visible
    , x: x
    , y: y
    , onClick: clickHandler
    , onComplete: dripCompletedHandle
    }