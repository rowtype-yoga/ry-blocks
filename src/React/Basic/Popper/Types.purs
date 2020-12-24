module React.Basic.Popper.Types where

import Foreign.Object (Object)
import React.Basic.DOM (CSS)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Prelude.View (NodeRef, null)

nullRef ∷ NodeRef
nullRef = unsafeCoerce null

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
  , placement ∷ String
  )
