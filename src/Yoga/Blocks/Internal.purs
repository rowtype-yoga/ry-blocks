module Yoga.Blocks.Internal
  ( mkForwardRefComponent
  , unsafeEmotion
  , dangerous
  , DivProps
  , DivPropsF
  , emotionDiv
  , module Yoga.Blocks.Internal.OptionalProp
  , module Yoga.Blocks.Internal.CSS
  ) where

import Data.Nullable (Nullable)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object (Object)
import Prelude (Unit, (<<<))
import Prim.Row (class Union)
import React.Basic.DOM (unsafeCreateDOMComponent, CSS)
import React.Basic.Emotion (Style)
import React.Basic.Emotion as E
import React.Basic.Events (EventHandler)
import React.Basic.Hooks (JSX, ReactComponent, Ref, Render)
import Record.Extra (pick)
import Record.Unsafe.Union (unsafeUnion)
import Web.DOM (Node)
import Yoga.Blocks.Internal.CSS (_0, auto, borderBox, center, column, contentBox, flex, flexStart, left, nest, nestDynamic, right, (~:))
import Yoga.Blocks.Internal.OptionalProp

foreign import mkForwardRefComponent ∷
  ∀ inputProps props a hooks.
  String ->
  ({ | inputProps } -> Ref a -> Render Unit hooks JSX) ->
  ReactComponent { | props }

unsafeEmotion ∷ ∀ propsA propsB ref. String -> Record propsA -> { className ∷ String, css ∷ E.Style, ref ∷ Ref ref | propsB } -> JSX
unsafeEmotion name propsA propsB = E.element (dangerous name) (unsafeUnion propsA propsB)

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
emotionDiv_ = unsafeEmotion "div"

emotionDiv = emotionDiv_ <<< pick

dangerous ∷ ∀ props. String -> ReactComponent (Record props)
dangerous = unsafePerformEffect <<< unsafeCreateDOMComponent

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
