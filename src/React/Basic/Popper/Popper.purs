module React.Basic.Popper where

import Data.Nullable (null)
import React.Basic.Popper.Types (ArrowElement, Modifier)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Internal (NodeRef)

nullRef ∷ NodeRef
nullRef = unsafeCoerce null

modifierArrow ∷ ArrowElement -> Modifier
modifierArrow element = unsafeCoerce { name: "arrow", options: { element } }

modifierOffset ∷ { x ∷ Number, y ∷ Number } -> Modifier
modifierOffset { x, y } = unsafeCoerce { name: "offset", options: { offset: [ x, y ] } }

foreign import modifierMatchReferenceSize ∷ Modifier
