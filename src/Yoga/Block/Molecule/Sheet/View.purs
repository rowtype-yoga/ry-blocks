module Yoga.Block.Molecule.Sheet.View (component, Props) where

import Yoga.Prelude.View
import Data.Int as Int
import Data.Number (pow)
import Data.Nullable as Nullable
import Effect.Class.Console (log)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion as Motion
import MotionValue (useMotionValue)
import MotionValue as MotionValue
import React.Basic.DOM (createPortal, css)
import React.Basic.DOM as R
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Web.DOM (Element)
import Web.HTML as HTML
import Web.HTML.Window (innerHeight)
import Yoga.Block.Hook.Key as KeyCode
import Yoga.Block.Hook.UseKeyDown (useKeyDown)
import Yoga.Block.Molecule.Sheet.Style as Style

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
    $ reactComponent "Sheet Wrapper" \{ content, isOpen, onDismiss, target } -> React.do
        useKeyDown case _ of
          KeyCode.Escape -> onDismiss
          _ -> mempty
        clickAwayRef <- React.useRef Nullable.null
        let
          toRender ∷ JSX
          toRender =
            R.div' </ {}
              />
                [ Motion.animatePresence </ {} /> [ guard isOpen $ element clickaway { theRef: clickAwayRef, onDismiss } ]
                , element window { onDismiss, content, isOpen }
                ]
        pure (createPortal toRender target)

clickaway ∷ ReactComponent { theRef ∷ Ref (Nullable Node), onDismiss ∷ Effect Unit }
clickaway =
  unsafePerformEffect
    $ reactComponent "Sheet Clickaway" \{ theRef, onDismiss } -> React.do
        pure $ Emotion.elementKeyed Motion.div
          $
            { key: "ry-modal-clickaway"
            , onClick: handler_ onDismiss
            , className: "ry-modal-clickaway"
            , css: Style.clickaway
            , initial: Motion.prop $ css { opacity: 0.0 }
            , animate: Motion.prop $ css { opacity: 1.0 }
            , exit: Motion.prop $ css { opacity: 0.0 }
            , ref: theRef
            }

type WindowProps =
  { content ∷ JSX, isOpen ∷ Boolean, onDismiss ∷ Effect Unit }

window ∷ ReactComponent WindowProps
window =
  unsafePerformEffect
    $ reactComponent "Sheet Window" \({ content, onDismiss, isOpen } ∷ WindowProps) -> React.do
        ref ∷ NodeRef <- useRef null
        contentRef <- useRef null
        velocityRef <- useRef 0.0
        animationRef <- useRef Nothing
        top <- useMotionValue 0.0
        let
          getWindowHeight = do
            HTML.window >>= innerHeight <#> Int.toNumber

          getMaxHeight ∷ Effect Number
          getMaxHeight = do
            wh <- getWindowHeight
            maybeOffsetHeight <- getOffsetHeightFromRef contentRef
            pure $ maybe (0.0) (\x -> min wh (wh - x)) maybeOffsetHeight
        useEffectAlways do
          maxHeight <- getMaxHeight
          MotionValue.set maxHeight top
          mempty
        pure
          $ Motion.animatePresence
          </ {}
          />
            [ guard isOpen $ Motion.div
                </*
                  { className: "ry-sheet-background"
                  , css: Style.sheet
                  , layout: Motion.layout true
                  , style: css { top }
                  , ref
                  , initial: Motion.initial $ css { y: "100%" }
                  , animate:
                      Motion.animate
                        $ css
                            { y: "0%"
                            , transition:
                                { type: "spring"
                                , stiffness: 1200.0
                                , damping: 90.0
                                }
                            }
                  , exit: Motion.exit $ css { top: "100%" }
                  , onPanStart:
                      Motion.onPanStart \_ _ -> do
                        maybeRunningAnimation <- React.readRef animationRef
                        for_ maybeRunningAnimation MotionValue.stopAnimation
                        React.writeRef animationRef Nothing
                  , onPan:
                      Motion.onPan \_ pi -> do
                        oldY <- MotionValue.get top
                        maxHeight <- getMaxHeight
                        React.writeRef velocityRef pi.velocity.y
                        let
                          newNaiveValue = pi.delta.y + oldY
                          newY =
                            if (newNaiveValue < maxHeight) && (pi.delta.y < zero) then
                              negate (pow (negate pi.delta.y) 0.33) + oldY
                            else if (newNaiveValue < maxHeight) && (pi.delta.y > zero) then
                              (pow (pi.delta.y) 0.33) + oldY
                            else
                              newNaiveValue
                        MotionValue.set newY top
                  , onPanEnd:
                      Motion.onPanEnd \_ pi -> do
                        velocity <- React.readRef velocityRef
                        yValue <- MotionValue.get top
                        maxHeight <- getMaxHeight
                        windowHeight <- getWindowHeight
                        let percentPosition = ((yValue - maxHeight) / (windowHeight - maxHeight))
                        let
                          target =
                            if percentPosition > 0.7 then
                              windowHeight
                            else if percentPosition < 0.2 then
                              maxHeight
                            else if velocity > 70.0 then
                              windowHeight
                            else
                              maxHeight
                        animation <-
                          MotionValue.animate target
                            { type: "spring"
                            , velocity: pi.velocity.y
                            , stiffness: 1200.0
                            , damping: 90.0
                            , onComplete:
                                do
                                  log "complete"
                                  React.writeRef animationRef Nothing
                                  when (target == windowHeight) do
                                    onDismiss
                            }
                            top
                        React.writeRef animationRef (Just animation)
                  }
                />
                  [ R.div'
                      </*
                        { ref: contentRef
                        , css: Style.sheetContent
                        , className: "ry-sheet-content"
                        }
                      /> [ R.div_ [ content ] ]
                  ]
            ]
