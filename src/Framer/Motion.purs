module Framer.Motion
  ( animate
  , div
  , Exit
  , MotionProps
  , Transition
  , transition
  , Initial
  , Animate
  , Infinity
  , infinity
  , VariantLabel
  , AnimationControls
  ) where

import Prim.Row (class Union)
import React.Basic (ReactComponent)
import React.Basic.DOM (CSS, Props_div, css)
import Type.Row (type (+))
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|))

foreign import divImpl ∷ ∀ a. ReactComponent { | a }

type Transition =
  CSS

newtype VariantLabel = VariantLabel String

data Target
  = Target

type Exit =
  CSS |+| Array VariantLabel

foreign import data AnimationControls ∷ Type

type Animate =
  CSS |+| String |+| Array VariantLabel |+| AnimationControls

type Initial =
  Boolean |+| CSS |+| String |+| Array VariantLabel

type MotionProps r =
  ( initial ∷ Initial
  , animate ∷ Animate
  , variants ∷ Array CSS
  , transition ∷ Transition
  , exit ∷ Exit
  | r
  )

animate ∷ ∀ a. Coercible a Animate => a -> Animate
animate = coerce

initial ∷ ∀ a. Coercible a Initial => a -> Initial
initial = coerce

transition ∷ ∀ r. { | r } -> CSS
transition = css

variants ∷ ∀ a. Coercible a (Array VariantLabel) => a -> (Array VariantLabel)
variants = coerce

div ∷
  ∀ attrs attrs_.
  Union attrs attrs_ (MotionProps + Props_div) =>
  ReactComponent { | attrs }
div = divImpl

foreign import data Infinity ∷ Type

foreign import infinity ∷ Infinity
