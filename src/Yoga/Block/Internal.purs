module Yoga.Block.Internal
  ( mkForwardRefComponent
  , mkForwardRefComponentEffect
  , forwardedRefAsMaybe
  , unsafeEmotion
  , unsafeDiv
  , dangerous
  , DivProps
  , DivPropsF
  , InputReadableProps
  , InputWritableProps
  , InputReadablePropsF
  , InputWritablePropsF
  , ButtonWritableProps
  , ButtonReadableProps
  , ButtonReadablePropsF
  , ButtonWritablePropsF
  , NodeRef
  , emotionDiv
  , emotionInput
  , emotionButton
  , module Yoga.Block.Internal.OptionalProp
  , module Yoga.Block.Internal.CSS
  , unsafeUnionDroppingUndefined
  , unsafeMergeSecond
  , createRef
  , getBoundingBoxFromRef
  , getHTMLElementFromRef
  , getOffsetHeightFromRef
  , getOffsetWidthFromRef
  , getOffsetDimensionsFromRef
  , getScrollHeightFromRef
  , getScrollWidthFromRef
  , getScrollDimensionsFromRef
  ) where

import Prelude
import Control.Monad.Cont.Trans (lift)
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Data.Array as Array
import Data.Function.Uncurried (Fn3, runFn3)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable)
import Data.Nullable as Nullable
import Data.Traversable (for)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object (Object)
import Prim.Row (class Lacks, class Union)
import Prim.Row as Row
import Prim.RowList as RL
import React.Basic.DOM (CSS, unsafeCreateDOMComponent)
import React.Basic.Emotion (Style)
import React.Basic.Emotion as E
import React.Basic.Events (EventHandler)
import React.Basic.Hooks (JSX, ReactComponent, Ref, Render, readRefMaybe)
import Record.Extra (class Keys, keys)
import Type.Data.Row (RProxy(..))
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Union (UndefinedOr, uorToMaybe)
import Web.DOM (Element, Node)
import Web.DOM.Element (scrollHeight, scrollWidth)
import Web.DOM.Element as Element
import Web.HTML.HTMLElement (DOMRect, HTMLElement, getBoundingClientRect, offsetHeight, offsetWidth)
import Web.HTML.HTMLElement as HTMLElement
import Yoga.Block.Internal.CSS (_0)
import Yoga.Block.Internal.OptionalProp (OptionalProp(..), Id, appendIfDefined, asOptional, composeHandler, getOr, getOrFlipped, ifTrue, isTruthy, maybeToOp, opToMaybe, setOrDelete, unsafeUnMaybe, unsafeUnOptional, (<>?), (?||))

foreign import mkForwardRefComponent ∷
  ∀ inputProps props a hooks.
  String ->
  ({ | inputProps } -> Ref a -> Render Unit hooks JSX) ->
  ReactComponent { | props }

foreign import mkForwardRefComponentEffect ∷
  ∀ inputProps props a hooks.
  String ->
  ({ | inputProps } -> Ref a -> Render Unit hooks JSX) ->
  Effect (ReactComponent { | props })

foreign import createRef ∷ ∀ a. Effect (Ref a)

type NodeRef =
  Ref (Nullable Node)

getBoundingBoxFromRef ∷ NodeRef -> Effect (Maybe DOMRect)
getBoundingBoxFromRef itemRef = do
  htmlElem <- getHTMLElementFromRef itemRef
  for htmlElem getBoundingClientRect

getOffsetWidthFromRef ∷ NodeRef -> Effect (Maybe Number)
getOffsetWidthFromRef itemRef = do
  htmlElem <- getHTMLElementFromRef itemRef
  for htmlElem offsetWidth

getOffsetHeightFromRef ∷ NodeRef -> Effect (Maybe Number)
getOffsetHeightFromRef itemRef = do
  htmlElem <- getHTMLElementFromRef itemRef
  for htmlElem offsetHeight

getOffsetDimensionsFromRef ∷ NodeRef -> Effect (Maybe { height ∷ Number, width ∷ Number })
getOffsetDimensionsFromRef itemRef =
  runMaybeT do
    node <- MaybeT $ readRefMaybe itemRef
    elem <- MaybeT $ pure $ HTMLElement.fromNode node
    width <- lift $ offsetWidth elem
    height <- lift $ offsetHeight elem
    pure { width, height }

getScrollWidthFromRef ∷ NodeRef -> Effect (Maybe Number)
getScrollWidthFromRef itemRef = do
  elem <- getElementFromRef itemRef
  for elem scrollWidth

getScrollHeightFromRef ∷ NodeRef -> Effect (Maybe Number)
getScrollHeightFromRef itemRef = do
  elem <- getElementFromRef itemRef
  for elem scrollHeight

getScrollDimensionsFromRef ∷ NodeRef -> Effect (Maybe { height ∷ Number, width ∷ Number })
getScrollDimensionsFromRef itemRef =
  runMaybeT do
    node <- MaybeT $ readRefMaybe itemRef
    elem <- MaybeT $ pure $ Element.fromNode node
    width <- lift $ scrollWidth elem
    height <- lift $ scrollHeight elem
    pure { width, height }

getHTMLElementFromRef ∷ Ref (Nullable Node) -> Effect (Maybe HTMLElement)
getHTMLElementFromRef itemRef =
  runMaybeT do
    node <- MaybeT $ readRefMaybe itemRef
    MaybeT $ pure $ HTMLElement.fromNode node

getElementFromRef ∷ Ref (Nullable Node) -> Effect (Maybe Element)
getElementFromRef itemRef =
  runMaybeT do
    node <- MaybeT $ readRefMaybe itemRef
    MaybeT $ pure $ Element.fromNode node

forwardedRefAsMaybe ∷ ∀ a. Ref a -> Maybe (Ref a)
forwardedRefAsMaybe r = safelyWrapped # uorToMaybe >>= Nullable.toMaybe
  where
  safelyWrapped ∷ UndefinedOr (Nullable (Ref a))
  safelyWrapped = unsafeCoerce r

foreign import unsafeUnionDroppingUndefined ∷ ∀ r1 r2 r3. Record r1 -> Record r2 -> Record r3

foreign import unsafeMergeSecond ∷ ∀ r1 r2 r3. Record r1 -> Record r2 -> Record r3

unsafeEmotion ∷ ∀ props propsA propsB. ReactComponent { className ∷ String, css ∷ E.Style | props } -> Record propsA -> { className ∷ String, css ∷ E.Style | propsB } -> JSX
unsafeEmotion component propsA propsB = E.element component (unsafeUnionDroppingUndefined propsB propsA)

emotionDiv_ ∷
  ∀ props props_.
  Lacks "ref" props =>
  Union props props_ ( className ∷ String, css ∷ Style, ref ∷ Ref (Nullable Node) | DivProps ) =>
  (Record (DivProps)) ->
  { className ∷ String
  , css ∷ Style
  | props
  } ->
  JSX
emotionDiv_ = unsafeEmotion unsafeDiv

emotionDiv ∷
  ∀ props props_ more.
  Lacks "ref" props =>
  Union props props_ ( className ∷ String, css ∷ Style, ref ∷ Ref (Nullable Node) | DivProps ) =>
  Ref (Nullable Node) ->
  { | DivPropsF Id more } ->
  { className ∷ String
  , css ∷ Style
  | props
  } ->
  JSX
emotionDiv ref = emotionDiv_ <<< pickDefined ref

unsafeDiv ∷ ∀ r. ReactComponent (Record r)
unsafeDiv = dangerous "div"

foreign import pickDefinedFn ∷ ∀ r1 r2. Fn3 (Ref (Nullable Node)) (Array String) (Record r1) (Record r2)

pickDefined ∷
  ∀ a r b l.
  Row.Union b r a =>
  RL.RowToList b l =>
  Ref (Nullable Node) ->
  Keys l =>
  Record a ->
  { ref ∷ Ref (Nullable Node) | b }
pickDefined ref = runFn3 pickDefinedFn ref ks
  where
  ks = Array.fromFoldable $ keys (RProxy ∷ RProxy b)

emotionInput_ ∷
  ∀ props props_.
  Union props props_ ( className ∷ String, css ∷ Style | InputWritablePropsF Id () ) =>
  { | InputWritableProps } ->
  { className ∷ String
  , css ∷ Style
  | props
  } ->
  JSX
emotionInput_ = unsafeEmotion unsafeInput

emotionInput ∷
  ∀ props props_ more.
  Union props props_ ( className ∷ String, css ∷ Style | InputWritableProps ) =>
  Ref (Nullable Node) ->
  { | InputReadablePropsF OptionalProp more } ->
  { className ∷ String
  , css ∷ Style
  | props
  } ->
  JSX
emotionInput ref = emotionInput_ <<< pickDefined ref <<< coerceUnOptional
  where
  coerceUnOptional ∷ { | InputReadablePropsF OptionalProp more } -> { | InputReadablePropsF Id more }
  coerceUnOptional = unsafeCoerce

unsafeInput ∷ ∀ r. ReactComponent (Record r)
unsafeInput = dangerous "input"

emotionButton_ ∷
  ∀ props props_.
  Union props props_ ( className ∷ String, css ∷ Style | ButtonWritableProps ) =>
  { | ButtonWritableProps } ->
  { className ∷ String
  , css ∷ Style
  | props
  } ->
  JSX
emotionButton_ = unsafeEmotion unsafeButton

emotionButton ∷
  ∀ props props_ more.
  Lacks "ref" props =>
  Union props props_ ( className ∷ String, css ∷ Style | ButtonWritableProps ) =>
  Ref (Nullable Node) ->
  { | ButtonReadablePropsF OptionalProp more } ->
  { className ∷ String
  , css ∷ Style
  | props
  } ->
  JSX
emotionButton ref = emotionButton_ <<< pickDefined ref <<< coerceUnOptional
  where
  coerceUnOptional ∷ { | ButtonReadablePropsF OptionalProp more } -> { | ButtonReadablePropsF Id more }
  coerceUnOptional = unsafeCoerce

unsafeButton ∷ ∀ r. ReactComponent (Record r)
unsafeButton = dangerous "button"

dangerous ∷ ∀ props. String -> ReactComponent (Record props)
dangerous = unsafePerformEffect <<< unsafeCreateDOMComponent

-- type DivProps =
--   Props_div
type DivProps =
  DivPropsF Id ()

type DivPropsF f more =
  ( _aria ∷ f (Object String)
  , _data ∷ f (Object String)
  , about ∷ f String
  , acceptCharset ∷ f String
  , accessKey ∷ f String
  , allowFullScreen ∷ f Boolean
  , autoFocus ∷ f Boolean
  , autoPlay ∷ f Boolean
  , capture ∷ f Boolean
  , cellPadding ∷ f String
  , cellSpacing ∷ f String
  , charSet ∷ f String
  , children ∷ f (Array JSX)
  , classID ∷ f String
  , colSpan ∷ f Int
  , contentEditable ∷ f Boolean
  , contextMenu ∷ f String
  , crossOrigin ∷ f String
  , dangerouslySetInnerHTML ∷ f { __html ∷ f String }
  , datatype ∷ f String
  , dateTime ∷ f String
  , dir ∷ f String
  , draggable ∷ f Boolean
  , encType ∷ f String
  , formAction ∷ f String
  , formEncType ∷ f String
  , formMethod ∷ f String
  , formNoValidate ∷ f Boolean
  , formTarget ∷ f String
  , frameBorder ∷ f String
  , hidden ∷ f Boolean
  , hrefLang ∷ f String
  , htmlFor ∷ f String
  , httpEquiv ∷ f String
  , icon ∷ f String
  , id ∷ f String
  , inlist ∷ f String
  , inputMode ∷ f String
  , is ∷ f String
  , itemID ∷ f String
  , itemProp ∷ f String
  , itemRef ∷ f String
  , itemScope ∷ f Boolean
  , itemType ∷ f String
  , keyParams ∷ f String
  , keyType ∷ f String
  , lang ∷ f String
  , marginHeight ∷ f String
  , marginWidth ∷ f String
  , maxLength ∷ f Int
  , mediaGroup ∷ f String
  , minLength ∷ f Int
  , noValidate ∷ f Boolean
  , onAnimationEnd ∷ f EventHandler
  , onAnimationIteration ∷ f EventHandler
  , onAnimationStart ∷ f EventHandler
  , onBlur ∷ f EventHandler
  , onClick ∷ f EventHandler
  , onCompositionEnd ∷ f EventHandler
  , onCompositionStart ∷ f EventHandler
  , onCompositionUpdate ∷ f EventHandler
  , onContextMenu ∷ f EventHandler
  , onCopy ∷ f EventHandler
  , onCut ∷ f EventHandler
  , onDoubleClick ∷ f EventHandler
  , onDrag ∷ f EventHandler
  , onDragEnd ∷ f EventHandler
  , onDragEnter ∷ f EventHandler
  , onDragExit ∷ f EventHandler
  , onDragLeave ∷ f EventHandler
  , onDragOver ∷ f EventHandler
  , onDragStart ∷ f EventHandler
  , onDrop ∷ f EventHandler
  , onFocus ∷ f EventHandler
  , onGotPointerCapture ∷ f EventHandler
  , onInvalid ∷ f EventHandler
  , onKeyDown ∷ f EventHandler
  , onKeyPress ∷ f EventHandler
  , onKeyUp ∷ f EventHandler
  , onLostPointerCapture ∷ f EventHandler
  , onMouseDown ∷ f EventHandler
  , onMouseEnter ∷ f EventHandler
  , onMouseLeave ∷ f EventHandler
  , onMouseMove ∷ f EventHandler
  , onMouseOut ∷ f EventHandler
  , onMouseOver ∷ f EventHandler
  , onMouseUp ∷ f EventHandler
  , onPaste ∷ f EventHandler
  , onPointerCancel ∷ f EventHandler
  , onPointerDown ∷ f EventHandler
  , onPointerEnter ∷ f EventHandler
  , onPointerLeave ∷ f EventHandler
  , onPointerMove ∷ f EventHandler
  , onPointerOut ∷ f EventHandler
  , onPointerOver ∷ f EventHandler
  , onPointerUp ∷ f EventHandler
  , onSelect ∷ f EventHandler
  , onSubmit ∷ f EventHandler
  , onTouchCancel ∷ f EventHandler
  , onTouchEnd ∷ f EventHandler
  , onTouchMove ∷ f EventHandler
  , onTouchStart ∷ f EventHandler
  , onTransitionEnd ∷ f EventHandler
  , onWheel ∷ f EventHandler
  , prefix ∷ f String
  , property ∷ f String
  , radioGroup ∷ f String
  , readOnly ∷ f Boolean
  , ref ∷ f (Ref (Nullable Node))
  , resource ∷ f String
  , role ∷ f String
  , rowSpan ∷ f Int
  , scoped ∷ f Boolean
  , seamless ∷ f Boolean
  , security ∷ f String
  , spellCheck ∷ f Boolean
  , srcDoc ∷ f JSX
  , srcLang ∷ f String
  , srcSet ∷ f String
  , style ∷ f CSS
  , suppressContentEditableWarning ∷ f Boolean
  , tabIndex ∷ f Int
  , title ∷ f String
  , typeof ∷ f String
  , unselectable ∷ f Boolean
  , useMap ∷ f String
  , vocab ∷ f String
  , wmode ∷ f String
  | more
  )

type InputReadableProps =
  InputReadablePropsF OptionalProp ()

type InputWritableProps =
  InputWritablePropsF Id ()

type InputWritablePropsF f more =
  InputReadablePropsF f
    ( ref ∷ f (Ref (Nullable Node))
    | more
    )

type InputReadablePropsF f more =
  ( _aria ∷ f (Object String)
  , _data ∷ f (Object String)
  , about ∷ f String
  , accept ∷ f String
  , acceptCharset ∷ f String
  , accessKey ∷ f String
  , allowFullScreen ∷ f Boolean
  , alt ∷ f String
  , autoCapitalize ∷ f String
  , autoComplete ∷ f String
  , autoCorrect ∷ f String
  , autoFocus ∷ f Boolean
  , autoPlay ∷ f Boolean
  , autoSave ∷ f String
  , capture ∷ f Boolean
  , cellPadding ∷ f String
  , cellSpacing ∷ f String
  , charSet ∷ f String
  , checked ∷ f Boolean
  , classID ∷ f String
  , colSpan ∷ f Int
  , contentEditable ∷ f Boolean
  , contextMenu ∷ f String
  , crossOrigin ∷ f String
  , dangerouslySetInnerHTML ∷ f { __html ∷ f String }
  , datatype ∷ f String
  , dateTime ∷ f String
  , defaultChecked ∷ f String
  , defaultValue ∷ f String
  , dir ∷ f String
  , disabled ∷ f Boolean
  , draggable ∷ f Boolean
  , encType ∷ f String
  , form ∷ f String
  , formAction ∷ f String
  , formEncType ∷ f String
  , formMethod ∷ f String
  , formNoValidate ∷ f Boolean
  , formTarget ∷ f String
  , frameBorder ∷ f String
  , height ∷ f String
  , hidden ∷ f Boolean
  , hrefLang ∷ f String
  , htmlFor ∷ f String
  , httpEquiv ∷ f String
  , icon ∷ f String
  , id ∷ f String
  , inlist ∷ f String
  , inputMode ∷ f String
  , is ∷ f String
  , itemID ∷ f String
  , itemProp ∷ f String
  , itemRef ∷ f String
  , itemScope ∷ f Boolean
  , itemType ∷ f String
  , keyParams ∷ f String
  , keyType ∷ f String
  , lang ∷ f String
  , list ∷ f String
  , marginHeight ∷ f String
  , marginWidth ∷ f String
  , maxLength ∷ f Int
  , mediaGroup ∷ f String
  , minLength ∷ f Int
  , multiple ∷ f Boolean
  , name ∷ f String
  , noValidate ∷ f Boolean
  , onAnimationEnd ∷ f EventHandler
  , onAnimationIteration ∷ f EventHandler
  , onAnimationStart ∷ f EventHandler
  , onBlur ∷ f EventHandler
  , onChange ∷ f EventHandler
  , onClick ∷ f EventHandler
  , onCompositionEnd ∷ f EventHandler
  , onCompositionStart ∷ f EventHandler
  , onCompositionUpdate ∷ f EventHandler
  , onContextMenu ∷ f EventHandler
  , onCopy ∷ f EventHandler
  , onCut ∷ f EventHandler
  , onDoubleClick ∷ f EventHandler
  , onDrag ∷ f EventHandler
  , onDragEnd ∷ f EventHandler
  , onDragEnter ∷ f EventHandler
  , onDragExit ∷ f EventHandler
  , onDragLeave ∷ f EventHandler
  , onDragOver ∷ f EventHandler
  , onDragStart ∷ f EventHandler
  , onDrop ∷ f EventHandler
  , onFocus ∷ f EventHandler
  , onGotPointerCapture ∷ f EventHandler
  , onInvalid ∷ f EventHandler
  , onKeyDown ∷ f EventHandler
  , onKeyPress ∷ f EventHandler
  , onKeyUp ∷ f EventHandler
  , onLostPointerCapture ∷ f EventHandler
  , onMouseDown ∷ f EventHandler
  , onMouseEnter ∷ f EventHandler
  , onMouseLeave ∷ f EventHandler
  , onMouseMove ∷ f EventHandler
  , onMouseOut ∷ f EventHandler
  , onMouseOver ∷ f EventHandler
  , onMouseUp ∷ f EventHandler
  , onPaste ∷ f EventHandler
  , onPointerCancel ∷ f EventHandler
  , onPointerDown ∷ f EventHandler
  , onPointerEnter ∷ f EventHandler
  , onPointerLeave ∷ f EventHandler
  , onPointerMove ∷ f EventHandler
  , onPointerOut ∷ f EventHandler
  , onPointerOver ∷ f EventHandler
  , onPointerUp ∷ f EventHandler
  , onSelect ∷ f EventHandler
  , onSubmit ∷ f EventHandler
  , onTouchCancel ∷ f EventHandler
  , onTouchEnd ∷ f EventHandler
  , onTouchMove ∷ f EventHandler
  , onTouchStart ∷ f EventHandler
  , onTransitionEnd ∷ f EventHandler
  , onWheel ∷ f EventHandler
  , pattern ∷ f String
  , placeholder ∷ f String
  , prefix ∷ f String
  , property ∷ f String
  , radioGroup ∷ f String
  -- , ref ∷ f (Ref (Nullable Node))
  , readOnly ∷ f Boolean
  , required ∷ f Boolean
  , resource ∷ f String
  , results ∷ f String
  , role ∷ f String
  , rowSpan ∷ f Int
  , scoped ∷ f Boolean
  , seamless ∷ f Boolean
  , security ∷ f String
  , size ∷ f Int
  , spellCheck ∷ f Boolean
  , src ∷ f String
  , srcDoc ∷ f JSX
  , srcLang ∷ f String
  , srcSet ∷ f String
  , step ∷ f String
  , style ∷ f CSS
  , suppressContentEditableWarning ∷ f Boolean
  , tabIndex ∷ f Int
  , title ∷ f String
  , type ∷ f String
  , typeof ∷ f String
  , unselectable ∷ f Boolean
  , useMap ∷ f String
  , value ∷ f String
  , vocab ∷ f String
  , width ∷ f String
  , wmode ∷ f String
  , min ∷ f (String)
  , max ∷ f (String)
  | more
  )

type ButtonReadableProps =
  ButtonReadablePropsF OptionalProp ()

type ButtonWritableProps =
  ButtonWritablePropsF Id ()

type ButtonWritablePropsF f more =
  ButtonReadablePropsF f
    ( ref ∷ f (Ref (Nullable Node))
    | more
    )

type ButtonReadablePropsF f more =
  ( _aria ∷ f (Object String)
  , _data ∷ f (Object String)
  , about ∷ f String
  , acceptCharset ∷ f String
  , accessKey ∷ f String
  , allowFullScreen ∷ f Boolean
  , allowTransparency ∷ f Boolean
  , autoFocus ∷ f Boolean
  , autoPlay ∷ f Boolean
  , capture ∷ f Boolean
  , cellPadding ∷ f String
  , cellSpacing ∷ f String
  , charSet ∷ f String
  , children ∷ f (Array JSX)
  , classID ∷ f String
  , className ∷ f String
  , colSpan ∷ f Int
  , contentEditable ∷ f Boolean
  , contextMenu ∷ f String
  , crossOrigin ∷ f String
  , dangerouslySetInnerHTML ∷ f { __html ∷ String }
  , datatype ∷ f String
  , dateTime ∷ f String
  , dir ∷ f String
  , disabled ∷ f Boolean
  , draggable ∷ f Boolean
  , encType ∷ f String
  , form ∷ f String
  , formAction ∷ f String
  , formEncType ∷ f String
  , formMethod ∷ f String
  , formNoValidate ∷ f Boolean
  , formTarget ∷ f String
  , frameBorder ∷ f String
  , hidden ∷ f Boolean
  , hrefLang ∷ f String
  , htmlFor ∷ f String
  , httpEquiv ∷ f String
  , icon ∷ f String
  , id ∷ f String
  , inlist ∷ f String
  , inputMode ∷ f String
  , is ∷ f String
  , itemID ∷ f String
  , itemProp ∷ f String
  , itemRef ∷ f String
  , itemScope ∷ f Boolean
  , itemType ∷ f String
  , key ∷ f String
  , keyParams ∷ f String
  , keyType ∷ f String
  , lang ∷ f String
  , marginHeight ∷ f String
  , marginWidth ∷ f String
  , maxLength ∷ f Int
  , mediaGroup ∷ f String
  , minLength ∷ f Int
  , name ∷ f String
  , noValidate ∷ f Boolean
  , onAnimationEnd ∷ f EventHandler
  , onAnimationIteration ∷ f EventHandler
  , onAnimationStart ∷ f EventHandler
  , onBlur ∷ f EventHandler
  , onClick ∷ f EventHandler
  , onCompositionEnd ∷ f EventHandler
  , onCompositionStart ∷ f EventHandler
  , onCompositionUpdate ∷ f EventHandler
  , onContextMenu ∷ f EventHandler
  , onCopy ∷ f EventHandler
  , onCut ∷ f EventHandler
  , onDoubleClick ∷ f EventHandler
  , onDrag ∷ f EventHandler
  , onDragEnd ∷ f EventHandler
  , onDragEnter ∷ f EventHandler
  , onDragExit ∷ f EventHandler
  , onDragLeave ∷ f EventHandler
  , onDragOver ∷ f EventHandler
  , onDragStart ∷ f EventHandler
  , onDrop ∷ f EventHandler
  , onFocus ∷ f EventHandler
  , onGotPointerCapture ∷ f EventHandler
  , onInvalid ∷ f EventHandler
  , onKeyDown ∷ f EventHandler
  , onKeyPress ∷ f EventHandler
  , onKeyUp ∷ f EventHandler
  , onLostPointerCapture ∷ f EventHandler
  , onMouseDown ∷ f EventHandler
  , onMouseEnter ∷ f EventHandler
  , onMouseLeave ∷ f EventHandler
  , onMouseMove ∷ f EventHandler
  , onMouseOut ∷ f EventHandler
  , onMouseOver ∷ f EventHandler
  , onMouseUp ∷ f EventHandler
  , onPaste ∷ f EventHandler
  , onPointerCancel ∷ f EventHandler
  , onPointerDown ∷ f EventHandler
  , onPointerEnter ∷ f EventHandler
  , onPointerLeave ∷ f EventHandler
  , onPointerMove ∷ f EventHandler
  , onPointerOut ∷ f EventHandler
  , onPointerOver ∷ f EventHandler
  , onPointerUp ∷ f EventHandler
  , onSelect ∷ f EventHandler
  , onSubmit ∷ f EventHandler
  , onTouchCancel ∷ f EventHandler
  , onTouchEnd ∷ f EventHandler
  , onTouchMove ∷ f EventHandler
  , onTouchStart ∷ f EventHandler
  , onTransitionEnd ∷ f EventHandler
  , onWheel ∷ f EventHandler
  , prefix ∷ f String
  , property ∷ f String
  , radioGroup ∷ f String
  , readOnly ∷ f Boolean
  , resource ∷ f String
  , role ∷ f String
  , rowSpan ∷ f Int
  , scoped ∷ f Boolean
  , seamless ∷ f Boolean
  , security ∷ f String
  , spellCheck ∷ f Boolean
  , srcDoc ∷ f JSX
  , srcLang ∷ f String
  , srcSet ∷ f String
  , style ∷ f CSS
  , suppressContentEditableWarning ∷ f Boolean
  , tabIndex ∷ f Int
  , title ∷ f String
  , type ∷ f String
  , typeof ∷ f String
  , unselectable ∷ f Boolean
  , useMap ∷ f String
  , value ∷ f String
  , vocab ∷ f String
  , wmode ∷ f String
  | more
  )
