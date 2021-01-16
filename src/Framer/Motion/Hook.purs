module Framer.Motion.Hook
  ( useViewportScroll
  , UseViewportScroll
  , useTransform
  , useSpringWithMotionValue
  , useSpringWithNumber
  , UseSpring
  , SpringProps
  , UseTransform
  , ViewportScrollValues
  , TransformOptions
  , Ease
  ) where

import Prelude
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Uncurried (EffectFn2, EffectFn4, runEffectFn2, runEffectFn4)
import Literals.Undefined (Undefined, undefined)
import MotionValue (MotionValue)
import React.Basic.Hooks (Hook, unsafeHook)
import Untagged.Castable (class Castable, cast)
import Untagged.Union (type (|+|), UndefinedOr, maybeToUor)

-- UseViewportScroll
type ViewportScrollValues =
  { scrollX ∷ MotionValue Number
  , scrollY ∷ MotionValue Number
  , scrollXProgress ∷ MotionValue Number
  , scrollYProgress ∷ MotionValue Number
  }

foreign import data UseViewportScroll ∷ Type -> Type

foreign import useViewportScrollImpl ∷ Effect ViewportScrollValues

useViewportScroll ∷ Hook UseViewportScroll ViewportScrollValues
useViewportScroll = unsafeHook useViewportScrollImpl

data Ease
  = EaseFn (Number -> Number)
  | EaseFns (Array (Number -> Number))

-- UseTransform
type TransformOptionsImpl a =
  { clamp ∷ UndefinedOr Boolean
  , ease ∷ UndefinedOr ((Number -> Number) |+| (Array (Number -> Number)))
  }

type TransformOptions a =
  { clamp ∷ Maybe Boolean
  , ease ∷ Maybe Ease
  }

transformOptionsToTransformOptionsImpl ∷ ∀ a. TransformOptions a -> TransformOptionsImpl a
transformOptionsToTransformOptionsImpl { clamp, ease } =
  { clamp: maybeToUor clamp
  , ease:
    case ease of
      Just (EaseFn fn) -> cast fn
      Just (EaseFns fns) -> cast fns
      Nothing -> cast undefined
  }

foreign import data UseTransform ∷ Type -> Type -> Type

foreign import useTransformImpl ∷
  ∀ a.
  EffectFn4
    (MotionValue a)
    (Array Number)
    (Array a)
    (UndefinedOr (TransformOptionsImpl a))
    (MotionValue a)

useTransform ∷
  ∀ a. MotionValue a -> Array Number -> Array a -> Maybe (TransformOptions a) -> Hook (UseTransform a) (MotionValue a)
useTransform motionValue numbers as options =
  unsafeHook do
    runEffectFn4
      useTransformImpl
      motionValue
      numbers
      as
      (maybeToUor $ transformOptionsToTransformOptionsImpl <$> options)

-- UseSpring
type SpringProps =
  { from ∷ Number |+| Int |+| Undefined
  , to ∷ Number |+| Int |+| Undefined
  , stiffness ∷ Number |+| Int |+| Undefined
  , damping ∷ Number |+| Int |+| Undefined
  , mass ∷ Number |+| Int |+| Undefined
  , velocity ∷ Number |+| Int |+| Undefined
  , restSpeed ∷ Number |+| Int |+| Undefined
  , restDelta ∷ Number |+| Int |+| Undefined
  }

foreign import data UseSpring ∷ Type -> Type -> Type

foreign import useSpringImpl ∷
  ∀ a b.
  EffectFn2
    (MotionValue a |+| Number)
    SpringProps
    b

useSpringWithMotionValue ∷
  ∀ a opts. Castable opts SpringProps => MotionValue a -> opts -> Hook (UseSpring (MotionValue a)) a
useSpringWithMotionValue motionValue springProps =
  unsafeHook do
    runEffectFn2
      useSpringImpl
      (cast motionValue ∷ MotionValue a |+| Number)
      (cast springProps)

useSpringWithNumber ∷
  ∀ opts. Castable opts SpringProps => Number -> opts -> Hook (UseSpring Number) Number
useSpringWithNumber number springProps =
  unsafeHook do
    runEffectFn2
      useSpringImpl
      (cast number ∷ MotionValue Number |+| Number)
      (cast springProps)
