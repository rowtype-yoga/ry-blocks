module React.Basic.Popper.Hook where

import Prelude
import Data.String as String
import Data.Tuple (Tuple(..))
import Effect.Uncurried (EffectFn3, runEffectFn3)
import Foreign.Object (Object)
import Foreign.Object as Object
import Prim.Row (class Union)
import Yoga.Prelude.View (Hook, unsafeHook)
import React.Basic.Popper.Types (Options, PopperData, PopperElement, ReferenceElement)

foreign import data UsePopper ∷ Type -> Type -> Type

foreign import usePopperImpl ∷ ∀ opts. EffectFn3 ReferenceElement PopperElement { | opts } PopperData

toDataAttributes ∷ Object String -> Object String
toDataAttributes o = Object.toArrayWithKey (Tuple <<< dropPrefix) o # Object.fromFoldable
  where
    dropPrefix = String.drop (String.length "data-")

usePopper ∷ ∀ opts opts_. Union opts opts_ Options => ReferenceElement -> PopperElement -> { | opts } -> Hook (UsePopper { | opts }) PopperData
usePopper elemRef popperRef opts =
  unsafeHook do
    result <- runEffectFn3 usePopperImpl elemRef popperRef opts
    pure
      $ result
          { attributes
            { popper = toDataAttributes result.attributes.popper
            , arrow = toDataAttributes result.attributes.arrow
            }
          }
