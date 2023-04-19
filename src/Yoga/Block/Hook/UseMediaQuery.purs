module Yoga.Block.Hook.UseMediaQuery where

import Prelude

import Data.Newtype (class Newtype)
import Data.Tuple.Nested ((/\))
import Effect.Unsafe (unsafePerformEffect)
import MediaQuery (matchMedia, matches)
import MediaQuery.Types as MQL
import React.Basic.Hooks (UseEffect, UseState, Hook, coerceHook)
import React.Basic.Hooks as React
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Event.EventTypes as Event

newtype UseMediaQuery hooks = UseMediaQuery
  (UseEffect String (UseState Boolean hooks))

derive instance Newtype (UseMediaQuery hooks) _

useMediaQuery ∷ String → Hook UseMediaQuery Boolean
useMediaQuery query = coerceHook React.do
  let check = window >>= matchMedia query >>= matches

  queryMatches /\ setMatches ←
    React.useState' (unsafePerformEffect check)

  React.useEffect query do
    queryList ← window >>= matchMedia query
    let target = MQL.toEventTarget queryList
    listener ← eventListener (const (check >>= setMatches))
    addEventListener Event.change listener true target
    pure do
      removeEventListener Event.change listener true target

  pure queryMatches
