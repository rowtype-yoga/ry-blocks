module Yoga.Block.Hook.Key where

import Prelude

import Data.Array (foldl)
import Data.Maybe (Maybe(..))
import Data.Set (Set)
import Data.Set as Set
import Data.Tuple.Nested ((/\))
import Web.UIEvent.KeyboardEvent (KeyboardEvent)
import Web.UIEvent.KeyboardEvent as KeyboardEvent

foreign import getKeyImpl ∷ ∀ a. (a -> Maybe a) -> Maybe a -> KeyboardEvent -> Maybe Int

getKeyCode ∷ KeyboardEvent -> Maybe Int
getKeyCode = getKeyImpl Just Nothing

getModifiers :: KeyboardEvent -> Set Modifier
getModifiers event =
  foldl fn Set.empty
    [ KeyboardEvent.metaKey /\ Command
    , KeyboardEvent.altKey /\ Alt
    , KeyboardEvent.shiftKey /\ Shift
    , KeyboardEvent.ctrlKey /\ Control
    ]

  where
  fn acc (check /\ key) =
    if check event then Set.insert key acc
    else acc

data Modifier
  = Shift
  | Command
  | Control
  | Alt

derive instance Eq Modifier
derive instance Ord Modifier

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
  | Backspace
  | Tab

derive instance Eq KeyCode
derive instance Ord KeyCode

keyCodeToInt ∷ KeyCode -> Int
keyCodeToInt = case _ of
  Backspace -> 8
  Tab -> 9
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
  8 -> Just Backspace
  9 -> Just Tab
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
