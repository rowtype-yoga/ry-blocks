module Yoga.Block.Hook.UseKeyUp where

import Prelude
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Effect (Effect)
import React.Basic.Hooks (Hook, UseEffect, coerceHook, useEffectOnce)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Window as Win
import Yoga.Block.Hook.Key (KeyCode, getKeyCode, intToKeyCode)

newtype UseKeyUp hooks = UseKeyUp
  (UseEffect Unit hooks)

derive instance ntUseKeyUp ∷ Newtype (UseKeyUp hooks) _

useKeyUp ∷ (KeyCode -> Effect Unit) -> Hook UseKeyUp Unit
useKeyUp doWhat = do
  coerceHook React.do
    useEffectOnce do
      listener <-
        eventListener \event -> do
          case getKeyCode event >>= intToKeyCode of
            Just keyCode -> doWhat keyCode
            Nothing -> pure unit
      win <- window
      addEventListener eventTypeKeyUp listener false (Win.toEventTarget win)
      pure (removeEventListener eventTypeKeyUp listener false (Win.toEventTarget win))

eventTypeKeyUp ∷ EventType
eventTypeKeyUp = EventType "keyup"
