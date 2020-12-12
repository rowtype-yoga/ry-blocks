module Hooks.Key where

import Data.Maybe (Maybe(..))
import Web.Event.Event (Event)

foreign import getKeyImpl ∷ ∀ a. (a -> Maybe a) -> Maybe a -> Event -> Maybe Int

getKeyCode ∷ Event -> Maybe Int
getKeyCode = getKeyImpl Just Nothing

data KeyCode
  = Return
  | Escape
  | End
  | Home
  | Left
  | Up
  | Right
  | Down
  | Delete

keyCodeToInt ∷ KeyCode -> Int
keyCodeToInt = case _ of
  Return -> 13
  Escape -> 27
  End -> 35
  Home -> 36
  Left -> 37
  Up -> 38
  Right -> 39
  Down -> 40
  Delete -> 46

intToKeyCode ∷ Int -> Maybe KeyCode
intToKeyCode = case _ of
  13 -> Just Return
  27 -> Just Escape
  35 -> Just End
  36 -> Just Home
  37 -> Just Left
  38 -> Just Up
  39 -> Just Right
  40 -> Just Down
  46 -> Just Delete
  _ -> Nothing
