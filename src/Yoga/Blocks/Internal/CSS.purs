module Yoga.Blocks.Internal.CSS where

import Prelude

import Color (Color, rgba)
import Foreign.Object as Object
import Prim.RowList (class RowToList)
import React.Basic.Emotion (Style, StyleProperty, css, nested, percent, str)
import Type.Row.Homogeneous (class Homogeneous, class HomogeneousRowList)
import Unsafe.Coerce (unsafeCoerce)

_0 ∷ StyleProperty
_0 = str "0"

transparent :: Color
transparent = rgba 0 0 0 0.0

left :: StyleProperty
left = str "left"

_100percent :: StyleProperty
_100percent = percent 100.0

nest :: forall r rl. RowToList r rl => HomogeneousRowList rl StyleProperty => Record r -> StyleProperty
nest = nested <<< css

nestDynamic ∷
  ∀ r.
  Homogeneous r StyleProperty =>
  String -> { | r } -> Style
nestDynamic key sp =
  unsafeCoerce
    $ Object.singleton key (css sp)

infixr 6 nestDynamic as ~:
