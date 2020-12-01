module Yoga.Block.Internal
  ( mkForwardRefComponent
  , mkForwardRefComponentEffect
  , unsafeEmotion
  , unsafeDiv
  , dangerous
  , DivProps
  , DivPropsF
  , InputProps
  , InputPropsF
  , emotionDiv
  , emotionDiv_
  , emotionInput
  , module Yoga.Block.Internal.OptionalProp
  , module Yoga.Block.Internal.CSS
  , createRef
  ) where

import Prelude
import Yoga.Block.Internal.OptionalProp (Id, OptionalProp(..), appendIfDefined, getOr, getOrFlipped, ifTrue, isTruthy, maybeToOp, opToMaybe, unsafeUnOptional, (<>?), (?||))
import Data.Array (fromFoldable)
import Data.Function.Uncurried (Fn2, runFn2)
import Data.Nullable (Nullable)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object (Object)
import Prim.Row (class Union)
import Prim.Row as Row
import Prim.RowList as RL
import React.Basic.DOM (CSS, unsafeCreateDOMComponent)
import React.Basic.Emotion (Style)
import React.Basic.Emotion as E
import React.Basic.Events (EventHandler)
import React.Basic.Hooks (JSX, ReactComponent, Ref, Render)
import Record.Extra (class Keys, keys)
import Record.Unsafe.Union (unsafeUnion)
import Type.Data.Row (RProxy(..))
import Web.DOM (Node)
import Yoga.Block.Internal.CSS (_0)

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

unsafeEmotion ∷ ∀ props propsA propsB ref. ReactComponent { className ∷ String, css ∷ E.Style, ref ∷ Ref ref | props } -> Record propsA -> { className ∷ String, css ∷ E.Style, ref ∷ Ref ref | propsB } -> JSX
unsafeEmotion component propsA propsB = E.element component (unsafeUnion propsB propsA)

emotionDiv_ ∷
  ∀ props props_.
  Union props props_ ( className ∷ String, css ∷ Style, ref ∷ Ref (Nullable Node) | DivProps ) =>
  (Record (DivProps)) ->
  { className ∷ String
  , css ∷ Style
  , ref ∷ Ref (Nullable Node)
  | props
  } ->
  JSX
emotionDiv_ = unsafeEmotion unsafeDiv

emotionDiv = emotionDiv_ <<< pickDefined

foreign import pickDefinedFn ∷ ∀ r1 r2. Fn2 (Array String) (Record r1) (Record r2)

pickDefined ∷
  ∀ a r b l.
  Row.Union b r a =>
  RL.RowToList b l =>
  Keys l =>
  Record a ->
  Record b
pickDefined = runFn2 pickDefinedFn ks
  where
    ks = fromFoldable $ keys (RProxy ∷ RProxy b)

unsafeDiv = dangerous "div"

emotionInput_ ∷
  ∀ props props_.
  Union props props_ ( className ∷ String, css ∷ Style, ref ∷ Ref (Nullable Node) | InputProps ) =>
  (Record (InputProps)) ->
  { className ∷ String
  , css ∷ Style
  , ref ∷ Ref (Nullable Node)
  | props
  } ->
  JSX
emotionInput_ = unsafeEmotion unsafeInput

emotionInput = emotionInput_ <<< pickDefined

unsafeInput = dangerous "input"

dangerous ∷ ∀ props. String -> ReactComponent (Record props)
dangerous = unsafePerformEffect <<< unsafeCreateDOMComponent

-- type DivProps =
--   Props_div
type DivProps =
  DivPropsF Id

type DivPropsF f =
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
  , key ∷ f String
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
  )

type InputProps =
  InputPropsF Id

type InputPropsF f =
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
  , key ∷ f String
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
  , readOnly ∷ f Boolean
  , ref ∷ f (Ref (Nullable Node))
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
  )
