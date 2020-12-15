module Hooks.Scroll where

import Prelude
import Data.Newtype (class Newtype)
import Effect (Effect)
import React.Basic.Hooks (Hook, UseLayoutEffect, UseState, coerceHook, useLayoutEffectAlways, useState', (/\))
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (EventListener, addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Window (toEventTarget)

eventType ∷ EventType
eventType = EventType "scroll"

registerListener ∷ EventListener -> Effect (Effect Unit)
registerListener listener = do
  target <- window <#> toEventTarget
  addEventListener eventType listener false target
  pure $ removeEventListener eventType listener false target

newtype UseScrollPosition hooks = UseScrollPosition (UseLayoutEffect Unit (UseState ScrollPosition hooks))

derive instance ntUseScrollPosition ∷ Newtype (UseScrollPosition hooks) _

type ScrollPosition =
  { scrollX ∷ Number, scrollY ∷ Number }

useScrollPosition ∷ Hook UseScrollPosition ScrollPosition
useScrollPosition =
  coerceHook React.do
    scroll /\ setScroll <- useState' zero
    useLayoutEffectAlways $ makeListener setScroll >>= registerListener
    pure scroll

makeListener ∷ (ScrollPosition -> Effect Unit) -> Effect EventListener
makeListener setScroll = eventListener (const (window <#> unsafeCoerce >>= setScroll))
