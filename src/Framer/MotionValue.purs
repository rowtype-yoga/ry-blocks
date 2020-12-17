module MotionValue where

import Prelude
import Effect (Effect)
import Effect.Uncurried (EffectFn1, mkEffectFn1, runEffectFn1)
import React.Basic.Hooks (Hook, unsafeHook)

foreign import data MotionValue ∷ Type -> Type

foreign import data UseMotionValue ∷ Type -> Type -> Type

foreign import useMotionValueImpl ∷ ∀ a. EffectFn1 a (MotionValue a)

foreign import get ∷ ∀ a. (MotionValue a) -> Effect a

foreign import setImpl ∷ ∀ a. a -> Boolean -> (MotionValue a) -> Effect Unit

setButDoNotRender ∷ ∀ a. a -> MotionValue a -> Effect Unit
setButDoNotRender v = setImpl v false

set ∷ ∀ a. a -> MotionValue a -> Effect Unit
set v = setImpl v true

foreign import isAnimating ∷ ∀ a. MotionValue a -> Effect Boolean

foreign import stop ∷ ∀ a. MotionValue a -> Effect Unit

foreign import onChangeImpl ∷ ∀ a. EffectFn1 a Unit -> MotionValue a -> Effect (Effect Unit)

onChange ∷ ∀ a. (a -> Effect Unit) -> MotionValue a -> Effect (Effect Unit)
onChange = mkEffectFn1 >>> onChangeImpl

useMotionValue ∷ ∀ a. a -> Hook (UseMotionValue a) (MotionValue a)
useMotionValue initialValue =
  unsafeHook do
    runEffectFn1 useMotionValueImpl initialValue
