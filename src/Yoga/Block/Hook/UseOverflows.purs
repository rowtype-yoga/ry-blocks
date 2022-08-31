module Yoga.Block.Hook.UseOverflows where

import Debug
import Yoga.Prelude.View

import Data.Array as Array
import Data.Newtype (class Newtype)
import Data.Traversable (traverse)
import React.Basic.Hooks (type (&))
import React.Basic.Hooks as React
import Web.DOM.Element (clientHeight, clientWidth, scrollHeight, scrollWidth)
import Web.DOM.ResizeObserver (ResizeObserverBoxOptions(..), observe, resizeObserver, unobserve)
import Web.HTML.HTMLElement (offsetTop)
import Web.HTML.HTMLElement as HTMLElement
import Yoga.Block.Container.Style (getElementStyle, getStyleProperty, removeStyleProperty, setStyleProperty)
import Yoga.Block.Hook.UseStateEq (UseStateEq, useStateEq')
import Yoga.Block.Internal (getElementFromRef)

newtype UseOverflows hooks = UseOverflows
  ( hooks
      & UseStateEq { x :: Boolean, y :: Boolean }
      & UseRef (Nullable Node)
      & UseLayoutEffect Unit
  )

derive instance Newtype (UseOverflows hooks) _

useOverflows ∷ Hook UseOverflows { ref :: NodeRef, xOverflows :: Boolean, yOverflows :: Boolean }
useOverflows = coerceHook React.do
  overflowState /\ setOverflowState <- useStateEq' { x: false, y: false }
  ref <- React.useRef null
  useLayoutEffectOnce do
    elʔ <- getElementFromRef ref
    case elʔ of
      Nothing -> mempty
      Just element -> do
        observer <- resizeObserver \entries _ ->
          Array.head entries # traverse_ \{ target } -> do
            -- get old style
            styleʔ <- elʔ # traverse getElementStyle
            oldOverflowʔ <- styleʔ # traverse (getStyleProperty "overflow")
            for_ styleʔ \style -> do
              setStyleProperty "overflow" "scroll" style
              -- force reflow: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
              -- (elʔ >>= HTMLElement.fromElement) # traverse_ (offsetTop)
              pure unit
            -- get sizes
            sw <- scrollWidth target
            sh <- scrollHeight target
            cw <- clientWidth target
            ch <- clientHeight target
            setOverflowState { x: sw > cw, y: sh > ch }
            -- reset old style
            for_ styleʔ \s ->
              case oldOverflowʔ of
                Nothing -> removeStyleProperty "overflow" s
                Just oo -> setStyleProperty "overflow" oo s
        element # observe BorderBox observer
        pure (element # unobserve observer)

  pure { ref, xOverflows: overflowState.x, yOverflows: overflowState.y }
