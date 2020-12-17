module Yoga.Block.Atom.Toggle.View (component, MandatoryProps, Props, PropsF) where

import Yoga.Prelude.View
import Color as Color
import Data.Interpolate (i)
import Effect.Class.Console as Console
import Foreign.Object as Object
import Framer.Motion as Motion
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as Emotion
import React.Basic.Hooks as React
import Yoga.Block.Atom.Toggle.Style as Style
import Yoga.Block.Container.Style (colour)

type PropsF f =
  ( className ∷ f String
  , on ∷ f JSX
  , off ∷ f JSX
  | Style.Props f (MandatoryProps InputProps)
  )

type MandatoryProps r =
  ( value ∷ Boolean
  , onToggle ∷ Boolean -> Effect Unit
  | r
  )

data TappingState
  = TapAllowed
  | TapNotAllowed

data DragState
  = NotDragging
  | Dragging { startX ∷ Number }
  | DragDone { startX ∷ Number, endX ∷ Number }

derive instance eqDragState ∷ Eq DragState

instance showDragState ∷ Show DragState where
  show = case _ of
    NotDragging -> "NotDragging"
    Dragging x -> "Dragging " <> (show x)
    DragDone x -> "DragDone " <> (show x)

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "Toggle" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let disabled = props.disabled
      tapState <- useRef TapNotAllowed
      dragState /\ setDragState <- React.useState' NotDragging
      maxLeft /\ setMaxLeft <- useState' 0.0
      buttonRef <- useRef null
      toggleRef <- useRef null
      leftState /\ setLeftState <- React.useState' 0.0
      let
        getWidth aRef = do
          bbox <- getBoundingBoxFromRef aRef
          pure $ bbox <#> _.width # fromMaybe 0.0
        buttonWidth = getWidth buttonRef
        toggleWidth = getWidth toggleRef
      useLayoutEffectAlways do
        when (maxLeft == 0.0) do
          bw <- buttonWidth
          tw <- toggleWidth
          setMaxLeft (bw - tw)
        mempty
      let
        toggleVariants =
          { off: { x: 0.0 }
          , on: { x: maxLeft }
          }
        toggleVariant = Motion.makeVariantLabels toggleVariants
        buttonVariants =
          { off: { backgroundColor: (Emotion.str <<< Color.cssStringRGBA <$> props.backgroundOn) ?|| Emotion.str colour.inputBackground }
          , on: { backgroundColor: (Emotion.str <<< Color.cssStringRGBA <$> props.backgroundOff) ?|| Emotion.str colour.success }
          }
        buttonVariant = Motion.makeVariantLabels buttonVariants
      hasFocus /\ setHasFocus <- useState' false
      useEffect dragState do
        case dragState of
          NotDragging -> mempty
          Dragging { startX } -> writeRef tapState TapNotAllowed
          DragDone { startX, endX } -> do
            maybeBbox <- getBoundingBoxFromRef buttonRef
            for_ maybeBbox \bbox -> do
              if endX - startX <= (bbox.left - startX) + (bbox.width / 2.0) then do
                props.onToggle false
              else do
                props.onToggle true
        mempty
      pure
        $ styled Motion.button
            { className: "ry-toggle"
            , css: Style.button <> guard props.disabled Style.inputDisabled
            , onFocus: handler_ $ setHasFocus true
            , onBlur: handler_ $ setHasFocus false
            , transition: Motion.transition { type: "tween", duration: 0.33, ease: "easeOut" }
            , variants: Motion.variants buttonVariants
            , animate: Motion.animate if props.value then buttonVariant.on else buttonVariant.off
            , value: show props.value
            , onClick: handler preventDefault \_ -> props.onToggle (not props.value)
            , style: props.style
            , _data: Object.singleton "testid" "toggle-testid"
            , role: "switch"
            , _aria: Object.singleton "checked" "switch"
            , ref: buttonRef
            }
            [ styled R.div'
                { className: "ry-toggle-text"
                , css: Style.toggleTextContainer
                }
                [ styled R.div'
                    { className: "ry-toggle-text-on"
                    , css: Style.toggleText
                    }
                    [ el Motion.animatePresence {}
                        [ guard (props.value)
                            $ styled Motion.div
                                { className: "ry-toggle-text-on-container"
                                , css: Style.toggleOnText
                                , key: "ry-toggle-text-on-container"
                                , initial: Motion.initial $ css { scale: 0, opacity: 0 }
                                , animate: Motion.animate $ css { scale: 1, opacity: 1 }
                                , exit: Motion.exit $ css { scale: 0, opacity: 0 }
                                }
                                [ props.on ?|| R.text "I" ]
                        ]
                    ]
                , styled R.div'
                    { className: "ry-toggle-text-off"
                    , css: Style.toggleText
                    }
                    [ el Motion.animatePresence {}
                        [ guard (not props.value)
                            $ styled Motion.div
                                { className: "ry-toggle-text-on-container"
                                , css: Style.toggleOnText
                                , key: "ry-toggle-text-on-container"
                                , initial: Motion.initial $ css { scale: 0, opacity: 0 }
                                , animate: Motion.animate $ css { scale: 1, opacity: 1 }
                                , exit: Motion.exit $ css { scale: 0, opacity: 0 }
                                }
                                [ props.off ?|| R.text "O" ]
                        ]
                    ]
                ]
            , styled Motion.div
                { className: "ry-toggle-toggle"
                , css: Style.theToggle props
                , layout: Motion.layout true
                , onClick: handler stopPropagation mempty
                , drag: Motion.drag "x"
                , dragMomentum: Motion.dragMomentum false
                , dragElastic: Motion.dragElastic false
                , dragConstraints:
                  Motion.dragConstraints
                    { left: if props.value then negate maxLeft else zero
                    , right: if props.value then zero else maxLeft
                    }
                , variants: Motion.variants toggleVariants
                , transition: Motion.transition { type: "tween", duration: 0.33, ease: "easeOut" }
                , whileTap: Motion.prop $ css { scale: 0.85, transition: { type: "tween", duration: 0.10, ease: "easeInOut" } }
                , onTapStart: Motion.onTapStart \_ _ -> writeRef tapState TapAllowed
                , onTap:
                  Motion.onTap \_ pi -> do
                    ts <- readRef tapState
                    case ts of
                      TapAllowed -> props.onToggle $ not props.value
                      _ -> mempty
                    mempty
                , onTapCancel:
                  Motion.onTapCancel \_ pi -> do
                    writeRef tapState TapNotAllowed
                    mempty
                , animate: Motion.animate if props.value then toggleVariant.on else toggleVariant.off
                , onDragStart:
                  Motion.onDragStart \_ pi -> do
                    maybeBBox <- getBoundingBoxFromRef toggleRef
                    let x = maybeBBox <#> \bbox -> bbox.left + (bbox.width / 2.0)
                    setDragState $ Dragging { startX: x # fromMaybe pi.point.x }
                , onDragEnd:
                  Motion.onDragEnd \_ pi -> do
                    case dragState of
                      Dragging { startX } -> do
                        maybeBBox <- getBoundingBoxFromRef toggleRef
                        let x = maybeBBox <#> \bbox -> bbox.left + (bbox.width / 2.0)
                        setDragState (DragDone { startX, endX: x # fromMaybe pi.point.x })
                      other -> Console.warn $ i "Unexpected drag state " (show other) " in onDragEvent"
                , ref: toggleRef
                }
                []
            ]
