module Hooks.UseResize where

import Prelude
import Data.Int (toNumber)
import Data.Newtype (class Newtype)
import Effect (Effect)
import React.Basic.Hooks (Hook, UseLayoutEffect, UseState, coerceHook, useLayoutEffect, useState, (/\))
import React.Basic.Hooks as React
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (EventListener, addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Window (innerHeight, innerWidth, toEventTarget)

eventType ∷ EventType
eventType = EventType "resize"

registerListener ∷ EventListener -> Effect (Effect Unit)
registerListener listener = do
  target <- window <#> toEventTarget
  addEventListener eventType listener false target
  pure $ removeEventListener eventType listener false target

newtype UseResize hooks = UseResize (UseLayoutEffect Unit (UseState { width ∷ Number, height ∷ Number } hooks))

derive instance ntUseResize ∷ Newtype (UseResize hooks) _

useResize ∷ Hook UseResize { width ∷ Number, height ∷ Number }
useResize =
  coerceHook React.do
    size /\ updateSize <- useState { width: 0.0, height: 0.0 }
    let setSize = updateSize <<< const
    useLayoutEffect unit do
      setSizeFromWindow setSize
      listener <- makeListener setSize
      registerListener listener
    pure size

setSizeFromWindow ∷ ({ height ∷ Number, width ∷ Number } -> Effect Unit) -> Effect Unit
setSizeFromWindow setSize = do
  win <- window
  width <- innerWidth win <#> toNumber
  height <- innerHeight win <#> toNumber
  setSize { width, height }

makeListener ∷ ({ height ∷ Number, width ∷ Number } -> Effect Unit) -> Effect EventListener
makeListener setSize = do
  eventListener
    $ const (setSizeFromWindow setSize)

useResize' ∷ Effect Unit -> Hook UseResize { width ∷ Number, height ∷ Number }
useResize' eff =
  coerceHook React.do
    size /\ updateSize <- useState { width: 0.0, height: 0.0 }
    let setSize = updateSize <<< const
    useLayoutEffect unit do
      setSizeFromWindow setSize
      listener <- makeListener (setSize >=> const eff)
      registerListener listener
    pure size
