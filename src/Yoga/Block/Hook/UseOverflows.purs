module Yoga.Block.Hook.UseOverflows where

import Prelude

import Data.Array as Array
import Data.Newtype (class Newtype)
import Data.Time.Duration (Milliseconds(..))
import Effect.Aff (Error, error, launchAff)
import Effect.Aff as Aff
import Effect.Class (liftEffect)
import React.Basic.Hooks as React
import Type.Function (type (#))
import Web.DOM.Element (clientHeight, clientWidth, scrollHeight, scrollWidth)
import Web.DOM.ResizeObserver (ResizeObserverBoxOptions(..), observe, resizeObserver, unobserve)
import Yoga.Block.Container.Style (getElementStyle, getStyleProperty, setStyleProperty)
import Yoga.Block.Hook.UseStateEq (UseStateEq, useStateEq')
import Yoga.Block.Internal (getElementFromRef)
import Yoga.Prelude.View (Hook, Maybe(..), Node, NodeRef, Nullable, Unit, UseLayoutEffect, UseRef, bind, coerceHook, discard, mempty, null, pure, traverse_, useLayoutEffectOnce, (#), (/\), (>))

newtype UseOverflows hooks = UseOverflows
  ( hooks
      # UseStateEq { x ∷ Boolean, y ∷ Boolean }
      # UseRef (Nullable Node)
      # UseLayoutEffect Unit
  )

derive instance Newtype (UseOverflows hooks) _

useOverflows ∷
  Hook UseOverflows
    { ref ∷ NodeRef, xOverflows ∷ Boolean, yOverflows ∷ Boolean }
useOverflows = coerceHook React.do
  overflowState /\ setOverflowState ← useStateEq' { x: false, y: false }
  ref ← React.useRef null

  useLayoutEffectOnce do
    elementMB ← getElementFromRef ref
    case elementMB of
      Nothing → mempty
      Just element → do
        observer ← resizeObserver \entries _ → do
          Array.head entries # traverse_ \{ target } → do
            -- get old style
            style ← getElementStyle element
            oldOverflow ← getStyleProperty "overflow" style
            setStyleProperty "overflow" "scroll" style
            -- force reflow: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
            -- get sizes
            sw ← scrollWidth target
            sh ← scrollHeight target
            cw ← clientWidth target
            ch ← clientHeight target
            setOverflowState { x: sw > cw, y: sh > ch }
            -- reset old style
            setStyleProperty "overflow" oldOverflow style
        element # observe BorderBox observer
        pure (element # unobserve observer)

  pure
    { ref
    , xOverflows: overflowState.x
    , yOverflows: overflowState.y
    }

getOverflowsFromRef nodeRef = do
  elementMB ← getElementFromRef nodeRef
  case elementMB of
    Nothing → pure { x: false, y: false }
    Just element → do
      -- get old style
      style ← getElementStyle element
      oldOverflow ← getStyleProperty "overflow" style
      setStyleProperty "overflow" "scroll" style
      -- force reflow: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
      -- get sizes
      sw ← scrollWidth element
      sh ← scrollHeight element
      cw ← clientWidth element
      ch ← clientHeight element
      -- reset old style
      setStyleProperty "overflow" oldOverflow style
      pure { x: sw > cw, y: sh > ch }

useOnSizeChange ref callback = React.do
  fibRef ← React.useRef Nothing
  let
    check element target = do
      fib ← launchAff do
        liftEffect (React.readRef fibRef) >>= traverse_
          (Aff.killFiber (error "debounced"))
        Aff.delay (8.333333 # Milliseconds)
        liftEffect do
          -- get old style
          style ← getElementStyle element
          oldOverflow ← getStyleProperty "overflow" style
          setStyleProperty "overflow" "scroll" style
          -- force reflow: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
          -- HTMLElement.fromElement el # traverse_ (offsetTop)
          -- get sizes
          sw ← scrollWidth target
          sh ← scrollHeight target
          cw ← clientWidth target
          ch ← clientHeight target
          let x = sw > cw
          let y = sh > ch
          -- React.writeRef overflowRef { x, y }
          -- when (x /= prev.x || y /= prev.x) do
          callback
            { xOverflows: x
            , yOverflows: y
            , scrollHeight: sh
            , scrollWidth: sw
            , clientHeight: ch
            , clientWidth: cw
            , ref
            }
          -- reset old style
          setStyleProperty "overflow" oldOverflow style
      React.writeRef fibRef (Just fib)

  useLayoutEffectOnce do
    elementMB ← getElementFromRef ref
    case elementMB of
      Nothing → mempty
      Just element → do
        check element element
        observer ← resizeObserver \entries _ → do
          Array.head entries # traverse_ \{ target } → do
            check element target
        element # observe BorderBox observer
        pure (element # unobserve observer)
  pure ref
