module Yoga.Prelude.View
  ( module Yoga.Prelude.Default
  , module React.Basic.Hooks
  , module React.Basic.Events
  , module Prim.Row
  , module Yoga
  , module Yoga.Block.Internal
  , module React.Basic.DOM
  , module React.Basic.DOM.Events
  , module Type.Row
  , module Web.DOM
  , module Web.HTML.HTMLElement
  , module Data.Nullable
  , module Untagged.Castable
  , NodeRef
  , getBoundingBoxFromRef
  ) where

import Yoga.Prelude.Default
import Data.Nullable (Nullable, notNull, null)
import Prim.Row (class Union)
import React.Basic.DOM (Props_div)
import React.Basic.DOM.Events (stopPropagation, preventDefault, targetValue)
import React.Basic.Events (class Merge, EventFn, EventHandler, SyntheticEvent, handler, handler_, merge, mergeImpl, syntheticEvent, unsafeEventFn)
import React.Basic.Hooks (type (/\), Component, Hook, JSX, Pure, ReactChildren, ReactComponent, ReactContext, Ref, Render, UnsafeReference(..), UseContext, UseDebugValue, UseEffect, UseLayoutEffect, UseMemo, UseReducer, UseRef, UseState, coerceHook, consumer, contextConsumer, contextProvider, createContext, displayName, element, elementKeyed, empty, fragment, keyed, memo, provider, reactChildrenFromArray, reactChildrenToArray, reactComponentFromHook, readRef, readRefMaybe, unsafeHook, unsafeRenderEffect, useContext, useDebugValue, useEffect, useEffectAlways, useEffectOnce, useLayoutEffect, useLayoutEffectAlways, useLayoutEffectOnce, useMemo, useReducer, useRef, useState, useState', writeRef, (/\))
import Type.Row (type (+))
import Untagged.Castable (cast)
import Web.DOM (Node)
import Web.HTML.HTMLElement (HTMLElement, DOMRect, blur, focus, getBoundingClientRect)
import Web.HTML.HTMLElement as HTMLElement
import Yoga (el, el_, styled, styledLeaf, yogaElement)
import Yoga.Block.Internal (DivProps, DivPropsF, Id, InputProps, InputPropsF, OptionalProp(..), _0, appendIfDefined, createRef, dangerous, emotionDiv, emotionInput, getOr, getOrFlipped, ifTrue, isTruthy, maybeToOp, mkForwardRefComponent, mkForwardRefComponentEffect, opToMaybe, unsafeDiv, unsafeEmotion, unsafeUnOptional, (<>?), (?||))

type NodeRef =
  Ref (Nullable Node)

getBoundingBoxFromRef ∷ Ref (Nullable Node) -> Effect (Maybe DOMRect)
getBoundingBoxFromRef itemRef =
  runMaybeT do
    node <- MaybeT $ readRefMaybe itemRef
    htmlElement <- MaybeT $ pure $ HTMLElement.fromNode node
    lift $ getBoundingClientRect htmlElement
