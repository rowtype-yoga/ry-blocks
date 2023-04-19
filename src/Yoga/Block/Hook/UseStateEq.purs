module Yoga.Block.Hook.UseStateEq where

import Prelude

import Data.Newtype (class Newtype)
import Data.Tuple.Nested (type (/\), (/\))
import Effect (Effect)
import React.Basic.Hooks (UseState, Hook, coerceHook)
import React.Basic.Hooks as React

-- Thanks to
useStateEq ∷ ∀ a. Eq a ⇒ a → Hook (UseStateEq a) (a /\ ((a → a) → Effect Unit))
useStateEq initialValue = coerceHook React.do
  value /\ setValue ← React.useState initialValue
  let
    updateEq f = setValue \value' → do
      let newValue = f value'
      if newValue /= value' then newValue else value'
  pure (value /\ updateEq)

newtype UseStateEq a hooks = UseStateEq (UseState a hooks)

derive instance Newtype (UseStateEq a hooks) _

useStateEq' ∷ ∀ a. Eq a ⇒ a → Hook (UseStateEq a) (a /\ (a → Effect Unit))
useStateEq' initialValue = coerceHook React.do
  value /\ setValue ← React.useState' initialValue
  let updateEq newValue = when (newValue /= value) (setValue newValue)
  pure (value /\ updateEq)