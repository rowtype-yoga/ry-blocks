module Framer.Motion.Types where

import Prelude
import Data.Nullable (Nullable)
import Data.Symbol (class IsSymbol, SProxy, reflectSymbol)
import Effect (Effect)
import Effect.Uncurried (EffectFn1, EffectFn2, mkEffectFn1, mkEffectFn2)
import Foreign (Foreign, unsafeToForeign)
import Foreign.Object (Object)
import Heterogeneous.Mapping (class HMapWithIndex, class MappingWithIndex, hmapWithIndex)
import Literals.Undefined (Undefined)
import React.Basic (JSX)
import React.Basic.DOM (CSS, css)
import React.Basic.Hooks (Ref)
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Castable (class Castable, cast)
import Untagged.Union (type (|+|))
import Web.DOM (Node)
import Web.Event.Internal.Types (Event)
import Web.UIEvent.MouseEvent (MouseEvent)
import Yoga.Block.Internal (Id)

type Transition
  = CSS |+| Undefined

newtype VariantLabel
  = VariantLabel String

data Target
  = Target

type Exit
  = CSS |+| VariantLabel |+| Array VariantLabel |+| Undefined

foreign import data AnimationControls ∷ Type

prop ∷ ∀ a b. Castable a b => a -> b
prop = cast

type Animate
  = CSS
      |+| VariantLabel
      |+| Array VariantLabel
      |+| AnimationControls
      |+| Undefined

type Initial
  = Boolean |+| CSS |+| VariantLabel |+| Array VariantLabel |+| Undefined

type Layout
  = Boolean |+| Undefined

type Variants
  = CSS |+| Undefined

type LayoutTransition
  = Boolean |+| Undefined

type Drag
  = Boolean |+| String |+| Undefined

type DragMomentum
  = Boolean |+| Undefined

dragMomentum ∷ ∀ c. Castable c DragMomentum => c -> DragMomentum
dragMomentum = cast

type DragConstraints
  = Ref (Nullable Node) |+| BoundingBox2D |+| Undefined

type DragElastic
  = Boolean |+| Number |+| Undefined

dragElastic ∷ ∀ c. Castable c DragElastic => c -> DragElastic
dragElastic = cast

type BoundingBox2D
  = { left ∷ Int |+| Number |+| Undefined
    , right ∷ Int |+| Number |+| Undefined
    , top ∷ Int |+| Number |+| Undefined
    , bottom ∷ Int |+| Number |+| Undefined
    }

boundingBox2D ∷ ∀ c. Castable c BoundingBox2D => c -> BoundingBox2D
boundingBox2D = cast

type Point2D
  = { x ∷ Number, y ∷ Number }

type PanInfo
  = { point ∷ Point2D, delta ∷ Point2D, offset ∷ Point2D, velocity ∷ Point2D }

type OnDragStart
  = (EffectFn2 Event PanInfo Unit |+| Undefined)

type OnDragEnd
  = (EffectFn2 Event PanInfo Unit |+| Undefined)

type OnDrag
  = (EffectFn2 Event PanInfo Unit |+| Undefined)

type WhileTap
  = TargetAndTransition |+| String |+| Undefined

type OnTap
  = (EffectFn2 Event TapInfo Unit |+| Undefined)

type OnTapStart
  = (EffectFn2 Event TapInfo Unit |+| Undefined)

type OnTapEnd
  = (EffectFn2 Event TapInfo Unit |+| Undefined)

type OnTapCancel
  = (EffectFn2 Event TapInfo Unit |+| Undefined)

onTapStart ∷ (Event -> TapInfo -> Effect Unit) -> OnTapStart
onTapStart = cast <<< toEffectFn

onTapEnd ∷ (Event -> TapInfo -> Effect Unit) -> OnTapEnd
onTapEnd = cast <<< toEffectFn

onTap ∷ (Event -> TapInfo -> Effect Unit) -> OnTap
onTap fn2 = cast (mkEffectFn2 fn2)

onTapCancel ∷ (Event -> TapInfo -> Effect Unit) -> OnTap
onTapCancel fn2 = cast (mkEffectFn2 fn2)

type EventInfo
  = { point ∷ { x ∷ Number, y ∷ Number }
    }

type WhileHover
  = (EffectFn2 MouseEvent EventInfo Unit |+| Undefined)

type OnHoverEnd
  = (EffectFn2 MouseEvent EventInfo Unit |+| Undefined)

type OnHoverStart
  = (EffectFn2 MouseEvent EventInfo Unit |+| Undefined)

onHoverStart ∷ (MouseEvent -> EventInfo -> Effect Unit) -> OnHoverStart
onHoverStart = cast <<< toEffectFn

onHoverEnd ∷ (MouseEvent -> EventInfo -> Effect Unit) -> OnHoverEnd
onHoverEnd = cast <<< toEffectFn

whileHover ∷ ∀ c. Castable c WhileHover => c -> WhileHover
whileHover = cast

type TapInfo
  = { x ∷ Number, y ∷ Number }

-- Can contain "transition" and "transitionEnd"
type TargetAndTransition
  = CSS

type DragPropagation
  = Boolean |+| Undefined

whileTap ∷ ∀ c. Castable c WhileTap => c -> WhileTap
whileTap = cast

class EffectFnMaker fn effectFn | fn -> effectFn where
  toEffectFn ∷ fn -> effectFn

instance callbackableEffectFn2 ∷ EffectFnMaker (a -> b -> Effect c) (EffectFn2 a b c) where
  toEffectFn = mkEffectFn2

instance callbackableEffectFn1 ∷ EffectFnMaker (a -> Effect b) (EffectFn1 a b) where
  toEffectFn = mkEffectFn1

callback ∷ ∀ a c f. Castable c a => EffectFnMaker f c => f -> a
callback = cast <<< toEffectFn

onDragStart ∷ (Event -> PanInfo -> Effect Unit) -> OnDragStart
onDragStart = cast <<< toEffectFn

onDragEnd ∷ (Event -> PanInfo -> Effect Unit) -> OnDragEnd
onDragEnd = cast <<< toEffectFn

onDrag ∷ (Event -> PanInfo -> Effect Unit) -> OnDrag
onDrag fn2 = cast (mkEffectFn2 fn2)

customProp ∷ ∀ a. a -> Foreign
customProp = unsafeToForeign

type LayoutId
  = String |+| Undefined

layoutId ∷ ∀ a. Castable a LayoutId => a -> LayoutId
layoutId = cast

type MotionPropsF f r
  = ( initial ∷ f Initial
    , animate ∷ f Animate
    , custom ∷ f Foreign
    , drag ∷ f Drag
    , dragMomentum ∷ f DragMomentum
    , dragElastic ∷ f DragElastic
    , onDragStart ∷ f OnDragStart
    , onDrag ∷ f OnDrag
    , onDragEnd ∷ f OnDragEnd
    , dragConstraints ∷ f DragConstraints
    , dragPropagation ∷ f DragPropagation
    , variants ∷ f Variants
    , transition ∷ f Transition
    , layout ∷ f Layout
    , layoutId ∷ f LayoutId
    , whileTap ∷ f WhileTap
    , onTap ∷ f OnTap
    , onTapStart ∷ f OnTapStart
    , onTapEnd ∷ f OnTapEnd
    , onTapCancel ∷ f OnTapCancel
    , whileHover ∷ f WhileHover
    , onHoverStart ∷ f OnHoverStart
    , onHoverEnd ∷ f OnHoverEnd
    , exit ∷ f Exit
    | r
    )

type MotionProps r
  = MotionPropsF Id r

animate ∷ ∀ a. Castable a Animate => a -> Animate
animate = cast

initial ∷ ∀ a. Castable a Initial => a -> Initial
initial = cast

transition ∷ ∀ r. { | r } -> Transition
transition = cast <<< css

drag ∷ ∀ a. Castable a Drag => a -> Drag
drag = cast

dragConstraints ∷ ∀ a. Castable a BoundingBox2D => a -> DragConstraints
dragConstraints x = cast ((cast x) ∷ BoundingBox2D)

dragPropagation ∷ ∀ a. Castable a DragPropagation => a -> DragPropagation
dragPropagation = cast

exit ∷ ∀ a. Castable a Exit => a -> Exit
exit = cast

variants ∷ ∀ r. { | r } -> Variants
variants = cast <<< css

variantsFromObject ∷ ∀ o. Object o -> Variants
variantsFromObject = cast <<< (unsafeCoerce ∷ _ -> CSS)

layout ∷ ∀ a. Castable a Layout => a -> Layout
layout = cast

data MakeVariantLabel
  = MakeVariantLabel

instance makeVariantLabels' ∷
  (IsSymbol sym) =>
  MappingWithIndex MakeVariantLabel (SProxy sym) a VariantLabel where
  mappingWithIndex MakeVariantLabel prop' _ = VariantLabel (reflectSymbol prop')

makeVariantLabels ∷ ∀ a b. HMapWithIndex MakeVariantLabel a b => a -> b
makeVariantLabels = hmapWithIndex MakeVariantLabel

foreign import data Infinity ∷ Type

foreign import infinity ∷ Infinity

type AnimatePresenceProps
  = ( initial ∷ Boolean
    , custom ∷ ∀ a. a
    , exitBeforeEnter ∷ Boolean
    , onExitComplete ∷ Effect Unit
    , children ∷ Array JSX
    )

type AnimateSharedLayoutProps
  = ( type ∷ AnimateSharedLayoutType
    , children ∷ Array JSX
    )

newtype AnimateSharedLayoutType
  = AnimateSharedLayoutType String

switch ∷ AnimateSharedLayoutType
switch = AnimateSharedLayoutType "switch"

crossfade ∷ AnimateSharedLayoutType
crossfade = AnimateSharedLayoutType "crossfade"
