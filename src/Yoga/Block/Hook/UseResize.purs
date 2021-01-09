module Yoga.Block.Hook.UseResize where

import Prelude
import Data.Foldable (for_)
import Data.Int (toNumber)
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Data.Time.Duration (class Duration)
import Data.Time.Duration as Milliseconds
import Effect (Effect)
import Effect.Aff (Aff, Fiber, delay, error, killFiber, launchAff, launchAff_)
import Effect.Class (liftEffect)
import Math as Math
import React.Basic.Hooks (Hook, UseLayoutEffect, UseState, coerceHook, useLayoutEffect, useLayoutEffectOnce, (/\))
import React.Basic.Hooks as React
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (EventListener, EventTarget, addEventListener, eventListener, removeEventListener)
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
    size /\ setSize <- React.useState' zero
    useLayoutEffect unit do
      setSizeFromWindow setSize
      listener <- makeListener setSize
      registerListener listener
    pure size

type Dimensions =
  { height ∷ Number, width ∷ Number }

setSizeFromWindow ∷ (Dimensions -> Effect Unit) -> Effect Unit
setSizeFromWindow setSize = do
  win <- window
  width <- innerWidth win <#> toNumber
  height <- innerHeight win <#> toNumber
  setSize { width, height }

makeListener ∷ (Dimensions -> Effect Unit) -> Effect EventListener
makeListener setSize = do
  eventListener
    $ const (setSizeFromWindow setSize)

newtype UseOnResize hooks = UseOnResize
  ( UseLayoutEffect Unit
      ( UseState Dimensions
          (UseState (Maybe (Fiber Unit)) hooks)
      )
  )

derive instance ntUseOnResize ∷ Newtype (UseOnResize hooks) _

useOnResize ∷
  ∀ d.
  Duration d =>
  d ->
  ({ width ∷ Number, height ∷ Number, deltaWidth ∷ Number, deltaHeight ∷ Number } -> Effect Unit) ->
  Hook UseOnResize Unit
useOnResize debounceBy callback =
  coerceHook React.do
    mbFiber /\ setFiber <- React.useState' Nothing
    size /\ setSize <- React.useState' (zero ∷ Dimensions)
    let
      layoutEffect ∷ Effect (Effect Unit)
      layoutEffect = do
        setSizeFromWindow (setSize ∷ Dimensions -> Effect Unit)
        listener ∷ EventListener <-
          makeListener \(dimensions ∷ Dimensions) -> do
            let
              aff ∷ Aff Unit
              aff = do
                for_ mbFiber (killFiber (error "Fiber cancelled"))
                delay (Milliseconds.fromDuration debounceBy)
                let { width, height } = dimensions
                let deltaWidth = Math.abs (size.width - width)
                let deltaHeight = Math.abs (size.height - height)
                setSize dimensions # liftEffect
                callback { width, height, deltaWidth, deltaHeight } # liftEffect
            fiber ∷ Fiber _ <- launchAff aff
            setFiber (Just fiber)
        target ∷ EventTarget <- window <#> toEventTarget
        addEventListener eventType listener false target
        pure
          $ launchAff_
          $ for_ mbFiber (killFiber (error "Fiber cancelled"))
    useLayoutEffectOnce layoutEffect
