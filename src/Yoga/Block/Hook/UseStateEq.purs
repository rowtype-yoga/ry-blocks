module Yoga.Block.Hook.UseStateEq where

import Prelude

import Data.Newtype (class Newtype)
import Data.Tuple.Nested (type (/\), (/\))
import Effect (Effect)
import React.Basic.Hooks (UseState, Hook, coerceHook)
import React.Basic.Hooks as React

newtype UseStateEq a hooks = UseStateEq (UseState a hooks)

derive instance Newtype (UseStateEq a hooks) _

-- [TODO] I'm too stupid to write this
-- useStateEq :: forall a. Eq a => a -> Hook (UseStateEq a) (a /\ ((a -> a) -> Effect Unit))
-- useStateEq initialValue = coerceHook React.do
--   value /\ update <- React.useState initialValue
--   let
--     updateEq modify = do
--       modified <- modify value
--       when (modified /= value) do update (const modified)
--   pure (value /\ updateEq)

useStateEq' :: forall a. Eq a => a -> Hook (UseStateEq a) (a /\ (a -> Effect Unit))
useStateEq' initialValue = coerceHook React.do
  value /\ setValue <- React.useState' initialValue
  let updateEq newValue = do when (newValue /= value) do setValue newValue
  pure (value /\ updateEq)