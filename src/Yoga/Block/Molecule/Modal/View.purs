module Yoga.Block.Molecule.Modal.View (component, Props) where

import Yoga.Prelude.View
import Data.Nullable as Nullable
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion (withMotion)
import Framer.Motion as Motion
import React.Basic.DOM (createPortal, css)
import React.Basic.DOM as R
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import React.FocusTrap (focusTrap)
import Web.DOM (Element)
import Yoga.Block.Hook.Key as KeyCode
import Yoga.Block.Hook.UseKeyDown (useKeyDown)
import Yoga.Block.Layout.Imposter as Imposter
import Yoga.Block.Molecule.Modal.Style as Style

type Props =
  { content ∷ JSX
  , isOpen ∷ Boolean
  , onDismiss ∷ Effect Unit
  , target ∷ Element
  | ()
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "Modal Wrapper" \{ content, isOpen, onDismiss, target } -> React.do
        useKeyDown case _ of
          KeyCode.Escape -> onDismiss
          _ -> mempty
        clickAwayRef <- React.useRef Nullable.null
        let
          toRender ∷ JSX
          toRender =
            React.element focusTrap
              { active: isOpen
              , children:
                R.div' </ {}
                  /> [ Motion.animatePresence </ {} /> [ guard isOpen $ element clickaway { theRef: clickAwayRef, onDismiss } ]
                    , Motion.animatePresence </ {} /> [ guard isOpen $ element window { clickAwayRef, onDismiss, content } ]
                    ]
              }
        pure (createPortal toRender target)

clickaway ∷ ReactComponent { theRef ∷ Ref (Nullable Node), onDismiss ∷ Effect Unit }
clickaway =
  unsafePerformEffect
    $ reactComponent "Modal Clickaway" \{ theRef, onDismiss } -> React.do
        pure $ Emotion.elementKeyed Motion.div
          $ { key: "ry-modal-clickaway"
            , onClick: handler_ onDismiss
            , className: "ry-modal-clickaway"
            , css: Style.clickaway
            , initial: Motion.prop $ css { opacity: 0.0 }
            , animate: Motion.prop $ css { opacity: 1.0 }
            , exit: Motion.prop $ css { opacity: 0.0 }
            , ref: theRef
            }

window ∷ ReactComponent { clickAwayRef ∷ NodeRef, content ∷ JSX, onDismiss ∷ Effect Unit }
window =
  unsafePerformEffect
    $ reactComponent "Modal Window" \{ clickAwayRef, content, onDismiss } -> React.do
        imposterRef <- useRef null
        pure
          $ Emotion.element motionImposter
              ( { className: "ry-modal-window"
                , css: Style.modal
                , ref: imposterRef
                , onClick: handler_ onDismiss
                , children:
                  [ Motion.div
                      </* { className: "ry-modal"
                        , css: Style.modal
                        , drag: Motion.prop true
                        , dragMomentum: Motion.prop false
                        , dragConstraints: Motion.prop clickAwayRef
                        , onClick: handler stopPropagation mempty
                        }
                      /> [ content ]
                  ]
                }
                  `withMotion`
                    { initial: css { transform: "translate(-50%, -50%) scale3d(0.1,0.1,0.1)", opacity: 0 }
                    , animate: css { transform: "translate(-50%, -50%) scale3d(1,1,1)", opacity: 1 }
                    , exit: css { transform: "translate(-50%, -50%) scale3d(0.1,0.1,0.1)", opacity: 0 }
                    }
              )
  where
  motionImposter = unsafePerformEffect $ Motion.custom Imposter.component
