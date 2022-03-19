module Yoga.Block.Atom.Input.Hook.UseTypingPlaceholders where

import Yoga.Prelude.View hiding (focus)

import Data.Array.NonEmpty ((!!))
import Data.Array.NonEmpty as NEA
import Data.Newtype (class Newtype)
import Data.String as String
import Data.Traversable (for)
import Effect.Aff (Fiber, Milliseconds(..), delay, killFiber, launchAff, launchAff_)
import Effect.Aff as Aff
import Effect.Random (randomRange)
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.Hooks as React
import Web.DOM.Node as Node
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML.HTMLInputElement as HTMLInputElement
import Yoga.Prelude.View (null) as Nullable

newtype UseTypingPlaceholders hooks = UseTypingPlaceholders
  ( UseEffect Unit
      ( UseRef (Maybe (Fiber Unit))
          (UseRef Boolean (UseRef Int (UseRef (Nullable Node) hooks)))
      )
  )

derive instance Newtype (UseTypingPlaceholders hooks) _

useTypingPlaceholders
  ∷ String → Array String → Hook UseTypingPlaceholders NodeRef
useTypingPlaceholders defaultPlaceholder otherPlaceholders = coerceHook React.do
  let placeholders = NEA.cons' defaultPlaceholder otherPlaceholders
  inputRef ← React.useRef Nullable.null
  placeholderIndexRef ← React.useRef 0
  isDeletingRef ← React.useRef false
  fiberRef ← React.useRef Nothing
  let
    getInputValue ∷ Effect (Maybe String)
    getInputValue = runMaybeT do
      node ← readRefMaybe inputRef # MaybeT
      inputElement ← HTMLInputElement.fromNode node # pure # MaybeT
      HTMLInputElement.value inputElement <#> pure # MaybeT

  useEffectOnce do
    let
      start = do
        fiber ← launchAff go
        writeRef fiberRef $ Just fiber

      cancel why = do
        fiberʔ ← readRef fiberRef
        launchAff_ $ for_ fiberʔ \fib → do
          killFiber (Aff.error why) fib
        writeRef fiberRef Nothing

      getPlaceholder = do
        inputElementʔ ← readRefMaybe inputRef # liftEffect <#>
          (_ >>= HTMLInputElement.fromNode)
        placeholder ← for inputElementʔ \inputElement → do
          HTMLInputElement.placeholder inputElement # liftEffect
        pure (placeholder # fromMaybe "")

      setPlaceholder s = do
        inputElementʔ ← readRefMaybe inputRef # liftEffect <#>
          (_ >>= HTMLInputElement.fromNode)
        for_ inputElementʔ \inputElement → do
          HTMLInputElement.setPlaceholder s inputElement # liftEffect

      mkOnFocusListener =
        eventListener \_ → do
          setPlaceholder defaultPlaceholder
          writeRef placeholderIndexRef 0
          writeRef isDeletingRef false
          maybeInputValue ← getInputValue
          when (maybeInputValue == Just "") start

      mkOnBlurListener =
        eventListener \_ → do
          setPlaceholder ""
          cancel "blur"

      mkOnInputListener =
        eventListener \_ → do
          inputValueʔ ← getInputValue
          if inputValueʔ /= Just "" && inputValueʔ /= Nothing then do
            cancel "on change non-empty"
          else do
            setPlaceholder ""
            writeRef placeholderIndexRef 0
            writeRef isDeletingRef false
            start

      register et listener = do
        maybeInputNode ← readRefMaybe inputRef
        for_ maybeInputNode \ie →
          addEventListener et listener false (Node.toEventTarget ie)

      unregister et listener = do
        maybeInputNode ← readRefMaybe inputRef
        for_ maybeInputNode \ie →
          removeEventListener et listener false (Node.toEventTarget ie)

      go = do
        placeholderIndex ← readRef placeholderIndexRef # liftEffect
        isDeleting ← readRef isDeletingRef # liftEffect
        for_ (placeholders !! placeholderIndex) \toWrite → do
          placeholder ← getPlaceholder
          if not isDeleting && placeholder == toWrite then do
            writeRef isDeletingRef true # liftEffect
            delay (1200.0 # Milliseconds)
            setPlaceholder
              (String.take (String.length toWrite - 1) placeholder) #
              liftEffect
            go
          else if isDeleting && placeholder == "" then do
            writeRef isDeletingRef false # liftEffect
            let
              newPlaceholderIndex =
                ( (placeholderIndex + 1) `mod` (NEA.length placeholders)
                )
            writeRef placeholderIndexRef newPlaceholderIndex # liftEffect
            let
              newToWrite = placeholders !! newPlaceholderIndex # fromMaybe'
                \_ → unsafeCrashWith "Nope"
            delay (60.0 # Milliseconds)
            setPlaceholder (String.take 1 newToWrite) # liftEffect
            go
          else if not isDeleting then do -- We're still writing
            let charactersWritten = String.length placeholder
            delayBy1 ← randomRange 40.0 100.0 # liftEffect
            delayBy2 ← randomRange 40.0 100.0 # liftEffect
            delay (min delayBy1 delayBy2 # Milliseconds)
            setPlaceholder
              (String.take (charactersWritten + 1) toWrite) # liftEffect
            go
          else do -- We're still deleting
            let charactersWritten = String.length placeholder
            let charactersDeleted = String.length toWrite - charactersWritten
            case charactersDeleted of
              1 → delay (100.0 # Milliseconds)
              2 → delay (100.0 # Milliseconds)
              3 → delay (100.0 # Milliseconds)
              c | c < 5 → delay (16.0 # Milliseconds)
              _ → delay (8.0 # Milliseconds)
            setPlaceholder (String.take (charactersWritten - 1) toWrite) #
              liftEffect
            go
    onFocusListener ← mkOnFocusListener
    onBlurListener ← mkOnBlurListener
    onInputListener ← mkOnInputListener
    register (EventType "focus") onFocusListener
    register (EventType "blur") onBlurListener
    register (EventType "input") onInputListener
    setPlaceholder defaultPlaceholder
    pure do
      cancel "Killed fiber because component was unmounted"
      unregister (EventType "focus") onFocusListener
      unregister (EventType "blur") onBlurListener
      unregister (EventType "input") onInputListener
  pure $ inputRef