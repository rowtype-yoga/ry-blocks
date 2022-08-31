module Plumage.Atom.Tooltip.View where

import Yoga.Prelude.View

import Effect.Unsafe (unsafePerformEffect)
import Plumage.Atom.PopOver.Types (Placement)
import Plumage.Hooks.UsePopOver (usePopOver)
import React.Basic.DOM as R
import React.Basic.Hooks as React

tooltip ∷
  { containerId ∷ String, placement ∷ Placement, tooltip ∷ JSX } → JSX → JSX
tooltip props@{ containerId, placement } child = rawComponent
  </>
    { placement
    , containerId
    , child
    , tooltipContent: props.tooltip
    }

type Props =
  { placement ∷ Placement
  , containerId ∷ String
  , child ∷ JSX
  , tooltipContent ∷ JSX
  }

rawComponent ∷ ReactComponent Props
rawComponent = unsafePerformEffect $ React.reactComponent "Tooltip" $
  \({ placement, containerId, child, tooltipContent } ∷ Props) → React.do
    { hidePopOver
    , renderInPopOver
    , targetRef
    , showPopOver
    , isVisible
    } ← usePopOver
      { dismissBehaviourʔ: Nothing
      , containerId
      , placement
      }

    pure $ fragment
      [ R.div
          { children: [ child ]
          , ref: targetRef
          , onMouseLeave: handler_ $ guard isVisible hidePopOver
          , onMouseEnter: handler_ $ guard (not isVisible) showPopOver
          }
      , renderInPopOver tooltipContent
      ]