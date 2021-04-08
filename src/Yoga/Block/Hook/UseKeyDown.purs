module Yoga.Block.Hook.UseKeyDown where

import Prelude
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Effect (Effect)
import Yoga.Block.Hook.Key (KeyCode, getKeyCode, intToKeyCode)
import React.Basic.Hooks (Hook, UseEffect, coerceHook, useEffectAlways)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Window as Win

newtype UseKeyDown hooks = UseKeyDown
  (UseEffect Unit hooks)

derive instance ntUseKeyDown ∷ Newtype (UseKeyDown hooks) _

useKeyDown ∷ (KeyCode -> Effect Unit) -> Hook UseKeyDown Unit
useKeyDown doWhat = do
  coerceHook React.do
    useEffectAlways do
      listener <-
        eventListener \event -> do
          case getKeyCode event >>= intToKeyCode of
            Just keyCode -> doWhat keyCode
            Nothing -> pure unit
      win <- window
      addEventListener eventTypeKeyDown listener false (Win.toEventTarget win)
      pure $ removeEventListener eventTypeKeyDown listener false (Win.toEventTarget win)

eventTypeKeyDown ∷ EventType
eventTypeKeyDown = EventType "keypress"
