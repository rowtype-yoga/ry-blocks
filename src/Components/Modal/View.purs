module Components.Modal.View (component, Props) where

import Prelude.View
import Components.Imposter as Imposter
import Components.Modal.Style as Style
import Data.Nullable (Nullable)
import Data.Nullable as Nullable
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion (withMotion)
import Framer.Motion as Motion
import React.Basic.DOM (css)
import React.Basic.Emotion as Emotion
import React.Basic.Hooks as React
import Web.DOM (Node)

type Props =
  { content ∷ JSX
  , isOpen ∷ Boolean
  , setIsOpen ∷ Boolean -> Effect Unit
  | ()
  }

component ∷ ReactComponent Props
component =
  reactComponent "Modal Wrapper" \{ content, isOpen, setIsOpen } -> React.do
    clickAwayRef <- React.useRef Nullable.null
    pure
      $ fragment
          [ el Motion.animatePresence {}
              $ guard isOpen
                  [ element clickaway { theRef: clickAwayRef, hide: setIsOpen false }
                  ]
          , el Motion.animatePresence {}
              [ guard isOpen
                  $ element window { clickAwayRef, hide: setIsOpen false, content }
              ]
          ]

clickaway ∷ ReactComponent { theRef ∷ Ref (Nullable Node), hide ∷ Effect Unit }
clickaway =
  reactComponent "Modal Clickaway" \{ theRef, hide } -> React.do
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

window ∷ ReactComponent { clickAwayRef ∷ Ref (Nullable Node), content ∷ JSX, hide ∷ Effect Unit }
window =
  reactComponent "Modal Window" \{ clickAwayRef, content, hide } -> React.do
    pure
      $ Emotion.elementKeyed motionImposter
          ( { className: "ry-modal-window"
            , css: Style.modal
            , key: "ry-modal-window"
            , children:
              [ styled Motion.div
                  { className: "ry-modal"
                  , css: Style.modal
                  , drag: Motion.prop true
                  , dragMomentum: Motion.prop false
                  , dragConstraints: Motion.prop clickAwayRef
                  }
                  [ content ]
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