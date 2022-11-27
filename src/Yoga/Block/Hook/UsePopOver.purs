module Yoga.Block.Hook.UsePopOver where

import Yoga.Prelude.View

import Data.Newtype (class Newtype)
import Effect.Unsafe (unsafePerformEffect)
import Yoga.Block.Atom.PopOver.Types (HookDismissBehaviour, Placement, toDismissBehaviour)
import Yoga.Block.Atom.PopOver.View (mkPopOverView)
import Yoga.Block.Atom.PopOver.View as PopOver
import React.Basic.Hooks as React

type Options =
  { dismissBehaviourʔ ∷ Maybe HookDismissBehaviour
  , containerId ∷ String
  , placement ∷ Placement
  , fallbackPlacements ∷ Array Placement
  }

type Result =
  { hidePopOver ∷ Effect Unit
  , renderInPopOver ∷ JSX → JSX
  , targetRef ∷ NodeRef
  , showPopOver ∷ Effect Unit
  , isVisible ∷ Boolean
  }

newtype UsePopOver hooks = UsePopOver
  (UseRef (Nullable Node) (UseState Boolean hooks))

derive instance Newtype (UsePopOver hooks) _

usePopOver ∷ Options → Hook UsePopOver Result
usePopOver options = coerceHook React.do
  isVisible /\ setIsVisible ← React.useState' false
  targetRef ← React.useRef null
  let
    renderInPopOver content = popOverComponent
      { hide: when isVisible $ setIsVisible false
      , childʔ: if isVisible then Just content else Nothing
      , placementRef: targetRef
      , placement: options.placement
      , fallbackPlacements: options.fallbackPlacements
      , dismissBehaviourʔ: options.dismissBehaviourʔ <#> toDismissBehaviour
          targetRef
      , containerId: options.containerId
      , onAnimationStateChange: mempty
      }
  pure
    { targetRef
    , renderInPopOver
    , hidePopOver: when isVisible $ setIsVisible false
    , showPopOver: unless isVisible $ setIsVisible true
    , isVisible
    }

popOverComponent ∷ PopOver.PopOverViewProps → JSX
popOverComponent = unsafePerformEffect mkPopOverView
