module Yoga where

import Prelude
import Data.Nullable (Nullable)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object (Object)
import Prim.Row (class Lacks)
import React.Basic.DOM (CSS)
import React.Basic.Events (EventHandler)
import React.Basic.Hooks (JSX, ReactComponent, Ref, Render)
import React.Basic.Hooks as Hooks
import Untagged.Coercible (class Coercible, coerce)
import Web.DOM (Node)

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
yogaElement el props = Hooks.element el (coerce props)
