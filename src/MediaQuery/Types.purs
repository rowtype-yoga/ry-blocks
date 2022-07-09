module MediaQuery.Types where

import Unsafe.Coerce (unsafeCoerce)
import Web.Event.EventTarget (EventTarget)

foreign import data MediaQueryList ∷ Type

toEventTarget ∷ MediaQueryList → EventTarget
toEventTarget = unsafeCoerce
