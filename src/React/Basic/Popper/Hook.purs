module React.Basic.Popper.Hook where

import Prelude
import Data.String as String
import Data.Tuple (Tuple(..))
import Effect.Uncurried (EffectFn3, runEffectFn3)
import Foreign.Object (Object)
import Foreign.Object as Object
import Prim.Row (class Union)
import React.Basic.DOM (CSS)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Prelude.View (Hook, NodeRef, unsafeHook)

foreign import data UsePopper ∷ Type -> Type -> Type

type ReferenceElement =
  NodeRef

type PopperElement =
  NodeRef

type ArrowElement =
  NodeRef

type DataAttributes =
  { popper ∷ Object String, arrow ∷ Object String }

type Styles =
  { popper ∷ CSS, arrow ∷ CSS }

type PopperData =
  { styles ∷ Styles, attributes ∷ DataAttributes }

foreign import data Modifier ∷ Type

modifierArrow ∷ ArrowElement -> Modifier
modifierArrow element = unsafeCoerce { name: "arrow", options: { element } }

modifierOffset ∷ { x ∷ Number, y ∷ Number } -> Modifier
modifierOffset { x, y } = unsafeCoerce { name: "offset", options: { offset: [ x, y ] } }

type Options =
  ( modifiers ∷ Array Modifier
  , strategy ∷ String
  )

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
