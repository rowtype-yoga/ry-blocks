module Yoga.Blocks.Internal.CSS where

import Prelude
import React.Basic.Emotion
import Foreign.Object (Object)
import Foreign.Object as Object
import Type.Row.Homogeneous (class Homogeneous)
import Unsafe.Coerce (unsafeCoerce)

center ∷ StyleProperty
center = str "center"

left ∷ StyleProperty
left = str "left"

right ∷ StyleProperty
right = str "right"

auto ∷ StyleProperty
auto = str "auto"

relative ∷ StyleProperty
relative = str "relative"

absolute ∷ StyleProperty
absolute = str "absolute"

contentBox ∷ StyleProperty
contentBox = str "content-box"

borderBox ∷ StyleProperty
borderBox = str "border-box"

_0 ∷ StyleProperty
_0 = str "0"

_100percent = percent 100.0

flex = str "flex"

hidden = str "hidden"

wrap = str "wrap"

column = str "column"

flexStart = str "flex-start"

nest = nested <<< css

nestDynamic ∷
  ∀ r.
  Homogeneous r StyleProperty =>
  String -> { | r } -> Style
nestDynamic key sp =
  unsafeCoerce
    $ Object.singleton key (css sp)

infixr 6 nestDynamic as ~:
