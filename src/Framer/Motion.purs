module Framer.Motion
  ( animate
  , makeVariantLabels
  , MakeVariantLabel
  , div
  , h1
  , custom
  , Exit
  , exit
  , MotionProps
  , initial
  , MotionPropsF
  , prop
  , Drag
  , DragMomentum
  , Transition
  , transition
  , Initial
  , BoundingBox2D
  , (>>)
  , variants
  , Animate
  , Infinity
  , infinity
  , VariantLabel
  , Variants
  , layout
  , Layout
  , AnimationControls
  , withMotion
  , motion
  , animateSharedLayout
  , AnimateSharedLayoutProps
  , AnimateSharedLayoutType
  , OnDragEnd
  , onDragEnd
  , PanInfo
  , Point2D
  , switch
  , crossfade
  , AnimatePresenceProps
  , DragConstraints
  , animatePresence
  , svg
  , path
  , rect
  ) where

import Prelude
import Data.Nullable (Nullable)
import Data.Symbol (class IsSymbol, SProxy, reflectSymbol)
import Effect (Effect)
import Effect.Uncurried (EffectFn2, mkEffectFn2)
import Foreign.Object (Object)
import Heterogeneous.Mapping (class HMapWithIndex, class MappingWithIndex, hmapWithIndex)
import Literals.Undefined (Undefined)
import Prim.Row (class Nub, class Union)
import React.Basic (JSX, ReactComponent)
import React.Basic.DOM (CSS, Props_div, Props_h1, css)
import React.Basic.DOM.Internal (SharedSVGProps)
import React.Basic.DOM.SVG (Props_svg, Props_rect, Props_path)
import React.Basic.Events (EventHandler)
import React.Basic.Hooks (ReactChildren, Ref)
import Record (disjointUnion)
import Type.Row (type (+))
import Untagged.Coercible (class Coercible, coerce)
import Untagged.Union (type (|+|), UndefinedOr)
import Web.DOM (Node)
import Web.Event.Internal.Types (Event)
import Yoga.Blocks.Internal (Id)

foreign import divImpl ∷ ∀ a. ReactComponent { | a }

foreign import h1Impl ∷ ∀ a. ReactComponent { | a }

foreign import svgImpl ∷ ∀ a. ReactComponent { | a }

foreign import pathImpl ∷ ∀ a. ReactComponent { | a }

foreign import rectImpl ∷ ∀ a. ReactComponent { | a }

type Transition =
  CSS |+| Undefined

newtype VariantLabel = VariantLabel String

data Target
  = Target

type Exit =
  CSS |+| VariantLabel |+| Array VariantLabel |+| Undefined

foreign import data AnimationControls ∷ Type

prop ∷ ∀ a b. Coercible a b => a -> b
prop = coerce

type Animate =
  CSS
    |+| VariantLabel
    |+| Array VariantLabel
    |+| AnimationControls
    |+| Undefined

type Initial =
  Boolean |+| CSS |+| VariantLabel |+| Array VariantLabel |+| Undefined

type Layout =
  Boolean |+| Undefined

type Variants =
  CSS |+| Undefined

type LayoutTransition =
  Boolean |+| Undefined

type Drag =
  Boolean |+| Undefined

type DragMomentum =
  Boolean |+| Undefined

type DragConstraints =
  Ref (Nullable Node) |+| BoundingBox2D |+| Undefined

type BoundingBox2D =
  { left ∷ Int |+| Number |+| Undefined
  , right ∷ Int |+| Number |+| Undefined
  , top ∷ Int |+| Number |+| Undefined
  , bottom ∷ Int |+| Number |+| Undefined
  }

type Point2D =
  { x ∷ Number, y ∷ Number }

type PanInfo =
  { point ∷ Point2D, delta ∷ Point2D, offset ∷ Point2D, velocity ∷ Point2D }

type OnDragEnd =
  EffectFn2 Event PanInfo Unit

onDragEnd ∷ ∀ coercible. Coercible OnDragEnd coercible => (Event -> PanInfo -> Effect Unit) -> coercible
onDragEnd fn2 = coerce ((mkEffectFn2 fn2) ∷ OnDragEnd)

type MotionPropsF f r =
  ( initial ∷ f Initial
  , animate ∷ f Animate
  , drag ∷ f Drag
  , dragMomentum ∷ f DragMomentum
  , onDragEnd ∷ f (OnDragEnd |+| Undefined)
  , dragConstraints ∷ f DragConstraints
  , variants ∷ f Variants
  , transition ∷ f Transition
  , layout ∷ f Layout
  , layoutId ∷ f String |+| Undefined
  , exit ∷ f Exit
  | r
  )

type MotionProps r =
  MotionPropsF Id r

animate ∷ ∀ a. Coercible a Animate => a -> Animate
animate = coerce

initial ∷ ∀ a. Coercible a Initial => a -> Initial
initial = coerce

transition ∷ ∀ r. { | r } -> Transition
transition = coerce <<< css

exit ∷ ∀ a. Coercible a Exit => a -> Exit
exit = coerce

variants ∷ ∀ r. { | r } -> Variants
variants = coerce <<< css

layout ∷ ∀ a. Coercible a Layout => a -> Layout
layout = coerce

data MakeVariantLabel
  = MakeVariantLabel

instance makeVariantLabels' ∷
  (IsSymbol sym) =>
  MappingWithIndex MakeVariantLabel (SProxy sym) a VariantLabel where
  mappingWithIndex MakeVariantLabel prop' _ = VariantLabel (reflectSymbol prop')

makeVariantLabels ∷ ∀ a b. HMapWithIndex MakeVariantLabel a b => a -> b
makeVariantLabels = hmapWithIndex MakeVariantLabel

div ∷ ∀ attrs attrs_. Union attrs attrs_ (MotionProps + Props_div) => ReactComponent { | attrs }
div = divImpl

svg ∷ ∀ attrs attrs_. Union attrs attrs_ (MotionProps + (SharedSVGProps Props_svg)) => ReactComponent { | attrs }
svg = svgImpl

path ∷ ∀ attrs attrs_. Union attrs attrs_ (MotionProps + (SharedSVGProps Props_path)) => ReactComponent { | attrs }
path = pathImpl

rect ∷ ∀ attrs attrs_. Union attrs attrs_ (MotionProps + (SharedSVGProps Props_rect)) => ReactComponent { | attrs }
rect = rectImpl

h1 ∷ ∀ attrs attrs_. Union attrs attrs_ (MotionProps + Props_h1) => ReactComponent { | attrs }
h1 = h1Impl

withMotion ∷
  ∀ result baseProps motionSubset.
  Union baseProps (MotionProps ()) result => Nub result result => Coercible motionSubset { | MotionProps () } => Record baseProps -> motionSubset -> Record result
withMotion old new = disjointUnion old ((coerce new) ∷ { | MotionProps () })

motion ∷
  ∀ result baseProps motionSubset.
  Union baseProps (MotionProps ()) result => Nub result result => Coercible motionSubset { | MotionProps () } => motionSubset -> Record baseProps -> Record result
motion = flip withMotion

infixr 7 withMotion as >>

foreign import data Infinity ∷ Type

foreign import infinity ∷ Infinity

foreign import custom ∷
  ∀ old.
  ReactComponent { | old } ->
  Effect (ReactComponent { | MotionProps old })

type AnimatePresenceProps =
  ( initial ∷ Boolean
  , custom ∷ ∀ a. a
  , exitBeforeEnter ∷ Boolean
  , onExitComplete ∷ Effect Unit
  , children ∷ Array JSX
  )

foreign import animatePresence ∷
  ∀ attrs attrs_.
  Union attrs attrs_ AnimatePresenceProps =>
  ReactComponent { | attrs }

type AnimateSharedLayoutProps =
  ( type ∷ AnimateSharedLayoutType
  , children ∷ Array JSX
  )

newtype AnimateSharedLayoutType = AnimateSharedLayoutType String

switch ∷ AnimateSharedLayoutType
switch = AnimateSharedLayoutType "switch"

crossfade ∷ AnimateSharedLayoutType
crossfade = AnimateSharedLayoutType "crossfade"

foreign import animateSharedLayout ∷
  ∀ attrs attrs_.
  Union attrs attrs_ AnimateSharedLayoutProps =>
  ReactComponent { | attrs }

type Props_div_no_key =
  ( _aria ∷ Object String
  , _data ∷ Object String
  , about ∷ String
  , acceptCharset ∷ String
  , accessKey ∷ String
  , allowFullScreen ∷ Boolean
  , allowTransparency ∷ Boolean
  , autoFocus ∷ Boolean
  , autoPlay ∷ Boolean
  , capture ∷ Boolean
  , cellPadding ∷ String
  , cellSpacing ∷ String
  , charSet ∷ String
  , children ∷ Array JSX
  , classID ∷ String
  , className ∷ String
  , colSpan ∷ Int
  , contentEditable ∷ Boolean
  , contextMenu ∷ String
  , crossOrigin ∷ String
  , dangerouslySetInnerHTML ∷ { __html ∷ String }
  , datatype ∷ String
  , dateTime ∷ String
  , dir ∷ String
  , draggable ∷ Boolean
  , encType ∷ String
  , formAction ∷ String
  , formEncType ∷ String
  , formMethod ∷ String
  , formNoValidate ∷ Boolean
  , formTarget ∷ String
  , frameBorder ∷ String
  , hidden ∷ Boolean
  , hrefLang ∷ String
  , htmlFor ∷ String
  , httpEquiv ∷ String
  , icon ∷ String
  , id ∷ String
  , inlist ∷ String
  , inputMode ∷ String
  , is ∷ String
  , itemID ∷ String
  , itemProp ∷ String
  , itemRef ∷ String
  , itemScope ∷ Boolean
  , itemType ∷ String
  , keyParams ∷ String
  , keyType ∷ String
  , lang ∷ String
  , marginHeight ∷ String
  , marginWidth ∷ String
  , maxLength ∷ Int
  , mediaGroup ∷ String
  , minLength ∷ Int
  , noValidate ∷ Boolean
  , onAnimationEnd ∷ EventHandler
  , onAnimationIteration ∷ EventHandler
  , onAnimationStart ∷ EventHandler
  , onBlur ∷ EventHandler
  , onClick ∷ EventHandler
  , onCompositionEnd ∷ EventHandler
  , onCompositionStart ∷ EventHandler
  , onCompositionUpdate ∷ EventHandler
  , onContextMenu ∷ EventHandler
  , onCopy ∷ EventHandler
  , onCut ∷ EventHandler
  , onDoubleClick ∷ EventHandler
  , onDrag ∷ EventHandler
  , onDragEnd ∷ EventHandler
  , onDragEnter ∷ EventHandler
  , onDragExit ∷ EventHandler
  , onDragLeave ∷ EventHandler
  , onDragOver ∷ EventHandler
  , onDragStart ∷ EventHandler
  , onDrop ∷ EventHandler
  , onFocus ∷ EventHandler
  , onGotPointerCapture ∷ EventHandler
  , onInvalid ∷ EventHandler
  , onKeyDown ∷ EventHandler
  , onKeyPress ∷ EventHandler
  , onKeyUp ∷ EventHandler
  , onLostPointerCapture ∷ EventHandler
  , onMouseDown ∷ EventHandler
  , onMouseEnter ∷ EventHandler
  , onMouseLeave ∷ EventHandler
  , onMouseMove ∷ EventHandler
  , onMouseOut ∷ EventHandler
  , onMouseOver ∷ EventHandler
  , onMouseUp ∷ EventHandler
  , onPaste ∷ EventHandler
  , onPointerCancel ∷ EventHandler
  , onPointerDown ∷ EventHandler
  , onPointerEnter ∷ EventHandler
  , onPointerLeave ∷ EventHandler
  , onPointerMove ∷ EventHandler
  , onPointerOut ∷ EventHandler
  , onPointerOver ∷ EventHandler
  , onPointerUp ∷ EventHandler
  , onSelect ∷ EventHandler
  , onSubmit ∷ EventHandler
  , onTouchCancel ∷ EventHandler
  , onTouchEnd ∷ EventHandler
  , onTouchMove ∷ EventHandler
  , onTouchStart ∷ EventHandler
  , onTransitionEnd ∷ EventHandler
  , onWheel ∷ EventHandler
  , prefix ∷ String
  , property ∷ String
  , radioGroup ∷ String
  , readOnly ∷ Boolean
  , ref ∷ Ref (Nullable Node)
  , resource ∷ String
  , role ∷ String
  , rowSpan ∷ Int
  , scoped ∷ Boolean
  , seamless ∷ Boolean
  , security ∷ String
  , spellCheck ∷ Boolean
  , srcDoc ∷ JSX
  , srcLang ∷ String
  , srcSet ∷ String
  , style ∷ CSS
  , suppressContentEditableWarning ∷ Boolean
  , tabIndex ∷ Int
  , title ∷ String
  , typeof ∷ String
  , unselectable ∷ Boolean
  , useMap ∷ String
  , vocab ∷ String
  , wmode ∷ String
  )
