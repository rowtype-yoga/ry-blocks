module Yoga.Block.Molecule.Sheet.View
  ( component
  , PropsF
  , Props
  , PropsNoChildren
  , PropsNoChildrenF
  ) where

import Yoga.Prelude.View

import Data.Int as Int
import Data.Number (pow)
import Effect.Class.Console (log)
import Framer.Motion as Motion
import MotionValue (useMotionValue)
import MotionValue as MotionValue
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Emotion as Emotion
import React.Basic.Hooks as React
import Web.HTML as HTML
import Web.HTML.Window (innerHeight)
import Yoga.Block.Hook.Key as KeyCode
import Yoga.Block.Hook.UseKeyDown (useKeyDown)
import Yoga.Block.Hook.UseRenderInPortal (useRenderInPortal)
import Yoga.Block.Layout.Stack as Stack
import Yoga.Block.Molecule.Sheet.Style as Style

type PropsNoChildrenF f =
  ( className ∷ f String
  , header :: f JSX
  , footer :: f JSX
  , isOpen ∷ Boolean
  , onDismiss ∷ f (Effect Unit)
  , containerId ∷ String
  , clickAwayId :: String
  | Style.Props OptionalProp ()
  )

type PropsF f = (children ∷ Array JSX | PropsNoChildrenF f)

type PropsNoChildren =
  PropsNoChildrenF Id

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props ⇒ ReactComponent { | p }
component = rawComponent

rawComponent ∷ forall p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "SheetWrapper" \props ref -> React.do
    let { header, children, footer, isOpen, onDismiss, containerId } = props :: { | PropsOptional }
    windowRef <- useRef null
    renderInPortal <- useRenderInPortal containerId
    useKeyDown $ \_ _ -> case _ of
      KeyCode.Escape -> onDismiss ?|| mempty
      _ -> mempty
    let
      toRender ∷ JSX
      toRender = R.div' </ { ref } />
        [ Motion.animatePresence </ {} />
            [ guard isOpen $ element clickaway props
            ]
        , element window { onDismiss, header, children, footer, ref: windowRef, isOpen }
        ]
    pure (renderInPortal toRender)

clickaway ∷ forall p. ReactComponent (Record p)
clickaway =
  mkForwardRefComponent "SheetClickaway" \props_ ref -> React.do
    let props@{ containerId, onDismiss } = props_ :: { | PropsOptional }
    renderInPortal <- useRenderInPortal containerId
    pure $ renderInPortal $ Emotion.elementKeyed Motion.div
      $
        { key: "ry-modal-clickaway"
        , ref
        , onClick: handler_ (onDismiss ?|| mempty :: Effect Unit)
        , className: "ry-modal-clickaway"
        , css: Style.clickaway props
        , initial: Motion.prop $ css { opacity: 0.0 }
        , animate: Motion.prop $ css { opacity: 1.0 }
        , exit: Motion.prop $ css { opacity: 0.0 }
        }

type WindowPropsR =
  ( header :: OptionalProp JSX
  , footer :: OptionalProp JSX
  , children ∷ Array JSX
  , isOpen ∷ Boolean
  , onDismiss ∷ OptionalProp (Effect Unit)
  )

type WindowProps = { ref ∷ NodeRef | WindowPropsR }

window ∷ ReactComponent WindowProps
window =
  mkForwardRefComponent "SheetWindow" \props ref -> React.do
    let { header, children, footer, onDismiss, isOpen } = props ∷ { | WindowPropsR }
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
                                onDismiss ?|| mempty
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
                  />
                    [ Stack.component </ { space: E.str "0" } />
                        [ header ?|| mempty
                        , R.div' </* { css: Style.sheetBody } /> children
                        , footer ?|| mempty
                        ]
                    ]
              ]
        ]
