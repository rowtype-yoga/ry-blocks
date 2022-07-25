module Yoga.Block.Hook.UseKeyDown where

import Prelude

import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Data.Set (Set)
import Effect (Effect)
import React.Basic.Hooks (Hook, UseEffect, coerceHook, useEffectAlways)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Window as Win
import Web.UIEvent.KeyboardEvent (KeyboardEvent, metaKey)
import Web.UIEvent.KeyboardEvent as KeyboardEvent
import Yoga.Block.Hook.Key (KeyCode, Modifier, getKeyCode, getModifiers, intToKeyCode)

newtype UseKeyDown hooks = UseKeyDown
  (UseEffect Unit hooks)

derive instance Newtype (UseKeyDown hooks) _

useKeyDown ∷ (KeyboardEvent -> Set Modifier -> KeyCode -> Effect Unit) -> Hook UseKeyDown Unit
useKeyDown doWhat = do
  coerceHook React.do
    useEffectAlways do
      listener <-
        eventListener $ KeyboardEvent.fromEvent >>> traverse_ \event -> do
          let modifiers = getModifiers event
          case getKeyCode event >>= intToKeyCode of
            Just keyCode -> doWhat event modifiers keyCode
            Nothing -> pure unit
      win <- window
      addEventListener eventTypeKeyDown listener false (Win.toEventTarget win)
      pure $ removeEventListener eventTypeKeyDown listener false (Win.toEventTarget win)

eventTypeKeyDown ∷ EventType
eventTypeKeyDown = EventType "keydown"
