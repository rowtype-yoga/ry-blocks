module Yoga.Block.Molecule.Modal.View (component, Props) where

import Yoga.Prelude.View
import Data.Nullable as Nullable
import Debug (traceM)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion (withMotion)
import Framer.Motion as Motion
import React.Basic.DOM (createPortal, css)
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Unsafe.Reference (unsafeRefEq)
import Web.DOM (Element)
import Web.DOM.Element as Element
import Web.Event.Internal.Types (EventTarget)
import Yoga.Block.Layout.Imposter as Imposter
import Yoga.Block.Molecule.Modal.Style as Style

type Props =
  { content ∷ JSX
  , isOpen ∷ Boolean
  , setIsOpen ∷ Boolean -> Effect Unit
  , target ∷ Element
  | ()
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "Modal Wrapper" \{ content, isOpen, setIsOpen, target } -> React.do
        clickAwayRef <- React.useRef Nullable.null
        let
          toRender ∷ JSX
          toRender =
            fragment
              [ Motion.animatePresence </ {} /> [ guard isOpen $ element clickaway { theRef: clickAwayRef, hide: setIsOpen false } ]
              , Motion.animatePresence </ {} /> [ guard isOpen $ element window { clickAwayRef, hide: setIsOpen false, content } ]
              ]
        pure (createPortal toRender target)

clickaway ∷ ReactComponent { theRef ∷ Ref (Nullable Node), hide ∷ Effect Unit }
clickaway =
  unsafePerformEffect
    $ reactComponent "Modal Clickaway" \{ theRef, hide } -> React.do
        pure $ Emotion.elementKeyed Motion.div
          $ { key: "ry-modal-clickaway"
            , onClick: handler_ hide
            , className: "ry-modal-clickaway"
            , css: Style.clickaway
            , initial: Motion.prop $ css { opacity: 0.0 }
            , animate: Motion.prop $ css { opacity: 1.0 }
            , exit: Motion.prop $ css { opacity: 0.0 }
            , ref: theRef
            }

window ∷ ReactComponent { clickAwayRef ∷ NodeRef, content ∷ JSX, hide ∷ Effect Unit }
window =
  unsafePerformEffect
    $ reactComponent "Modal Window" \{ clickAwayRef, content, hide } -> React.do
        imposterRef <- useRef null
        pure
          $ Emotion.element motionImposter
              ( { className: "ry-modal-window"
                , css: Style.modal
                , ref: imposterRef
                , onClick: handler_ hide
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

motionImposter = unsafePerformEffect $ Motion.custom Imposter.component
