module React.Basic.Extra.Hooks.UseKeyUp where

import Prelude
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Effect (Effect)
import Hooks.Key (KeyCode, getKeyCode, intToKeyCode)
import React.Basic.Hooks (Hook, UseEffect, coerceHook, useEffect)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Window as Win

newtype UseKeyUp hooks = UseKeyUp
  (UseEffect Unit hooks)

derive instance ntUseKeyUp ∷ Newtype (UseKeyUp hooks) _

useKeyUp ∷ (KeyCode -> Effect Unit) -> Hook UseKeyUp Unit
useKeyUp doWhat = do
  coerceHook React.do
    useEffect unit do
      listener <-
        eventListener \event -> case getKeyCode event >>= intToKeyCode of
          Just keyCode -> doWhat keyCode
          Nothing -> pure unit
      win <- window
      addEventListener eventTypeKeyUp listener false (Win.toEventTarget win)
      pure (removeEventListener eventTypeKeyUp listener false (Win.toEventTarget win))

eventTypeKeyUp ∷ EventType
eventTypeKeyUp = EventType "keyup"
