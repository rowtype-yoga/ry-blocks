module Yoga.Block.Hook.UseKeyUp where

import Prelude

import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Data.Set (Set)
import Effect (Effect)
import React.Basic.Hooks (Hook, UseEffect, coerceHook, useEffectOnce)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Window as Win
import Web.UIEvent.KeyboardEvent (KeyboardEvent)
import Web.UIEvent.KeyboardEvent as KeyboardEvent
import Yoga.Block.Hook.Key (KeyCode, Modifier, getKeyCode, getModifiers, intToKeyCode)

newtype UseKeyUp hooks = UseKeyUp
  (UseEffect Unit hooks)

derive instance Newtype (UseKeyUp hooks) _

useKeyUp ∷
  (KeyboardEvent → Set Modifier → KeyCode → Effect Unit) → Hook UseKeyUp Unit
useKeyUp doWhat = do
  coerceHook React.do
    useEffectOnce do
      listener ←
        eventListener $ KeyboardEvent.fromEvent >>> traverse_ \event → do
          let modifiers = getModifiers event
          case getKeyCode event >>= intToKeyCode of
            Just keyCode → doWhat event modifiers keyCode
            Nothing → pure unit
      win ← window
      addEventListener eventTypeKeyUp listener false (Win.toEventTarget win)
      pure
        ( removeEventListener eventTypeKeyUp listener false
            (Win.toEventTarget win)
        )

eventTypeKeyUp ∷ EventType
eventTypeKeyUp = EventType "keyup"
