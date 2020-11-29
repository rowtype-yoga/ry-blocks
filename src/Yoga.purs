module Yoga where

import Prelude
import Data.Symbol (SProxy(..))
import Effect.Unsafe (unsafePerformEffect)
import Prim.Row (class Lacks)
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (JSX, ReactChildren, ReactComponent, Render, reactChildrenFromArray)
import React.Basic.Hooks as Hooks
import Record as Record
import Untagged.Coercible (class Coercible, coerce)

reactComponent ∷
  ∀ hooks props.
  Lacks "children" props =>
  Lacks "key" props =>
  Lacks "ref" props =>
  String ->
  ({ | props } -> Render Unit hooks JSX) ->
  ReactComponent { | props }
reactComponent = (map map map) unsafePerformEffect Hooks.reactComponent

reactComponentWithChildren ∷
  ∀ hooks props children.
  Lacks "key" props =>
  Lacks "ref" props =>
  String ->
  ({ children ∷ Hooks.ReactChildren children | props } -> Render Unit hooks JSX) ->
  ReactComponent { children ∷ Hooks.ReactChildren children | props }
reactComponentWithChildren = (map map map) unsafePerformEffect Hooks.reactComponentWithChildren

yogaElement ∷ ∀ allProps givenProps. Coercible givenProps (Record allProps) => ReactComponent (Record allProps) -> givenProps -> JSX
yogaElement el' props = Hooks.element el' (coerce props)

el ∷
  ∀ props.
  Lacks "children" props =>
  ReactComponent { children ∷ Array JSX | props } ->
  Record props -> Array JSX -> JSX
el x props children = Hooks.element x (Record.insert (SProxy ∷ SProxy "children") children props)

el_ ∷
  ∀ props.
  Lacks "children" props =>
  ReactComponent { | props } ->
  Record props -> JSX
el_ x props = Hooks.element x props

styled ∷
  ∀ props.
  Lacks "children" props =>
  ReactComponent { className ∷ String, children ∷ Array JSX | props } ->
  { className ∷ String, css ∷ Emotion.Style | props } -> Array JSX -> JSX
styled x props children = Emotion.element x (Record.insert (SProxy ∷ SProxy "children") children props)

styledLeaf ∷
  ∀ props.
  ReactComponent { className ∷ String | props } ->
  { className ∷ String, css ∷ Emotion.Style | props } -> JSX
styledLeaf = Emotion.element
