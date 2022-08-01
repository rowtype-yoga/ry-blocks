module Yoga.Block.Hook.UseOnElementResize where

import Yoga.Prelude.View

import Data.Array as Array
import Data.Newtype (class Newtype)
import React.Basic.Hooks as React
import Type.Function (type (#))
import Web.DOM.ResizeObserver (ResizeObserverBoxOptions(..), observe, resizeObserver, unobserve)
import Yoga.Block.Internal (getElementFromRef)

newtype UseOnElementResizeWithRef hooks = UseOnElementResizeWithRef
  (hooks # UseLayoutEffect Unit)

derive instance Newtype (UseOnElementResizeWithRef hooks) _

type OnResize = { old :: DOMRect, new :: DOMRect } -> Effect Unit

useOnElementResizeWithRef ∷ NodeRef -> OnResize -> Hook UseOnElementResizeWithRef Unit
useOnElementResizeWithRef ref onResize =
  coerceHook React.do
    useLayoutEffectOnce do
      elʔ <- getElementFromRef ref
      case elʔ of
        Nothing -> mempty
        Just elem -> do
          observer <- resizeObserver \entries _ ->
            Array.head entries # traverse_ \{ contentRect: new } -> do
              old <- getBoundingClientRect elem
              onResize { old, new }
          elem # observe BorderBox observer
          pure (elem # unobserve observer)

newtype UseOnElementResize hooks = UseOnElementResize
  (hooks # UseRef (Nullable Node) # UseOnElementResizeWithRef)

derive instance Newtype (UseOnElementResize hooks) _

useOnElementResize ∷ OnResize -> Hook UseOnElementResize NodeRef
useOnElementResize onResize = coerceHook React.do
  ref <- React.useRef null
  useOnElementResizeWithRef ref onResize
  pure ref
