module Yoga.Block.Atom.Toggle.View (component, MandatoryProps, Props, PropsF) where

import Yoga.Prelude.View
import Color as Color
import Data.Interpolate (i)
import Data.Maybe (isNothing)
import Effect.Class.Console as Console
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion as Motion
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Toggle.Style as Style
import Yoga.Block.Atom.Toggle.Types (TogglePosition(..), flipToggle)
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Icon.SVG as SVGIcon

type PropsF f =
  ( className ∷ f String
  , left ∷ f JSX
  , right ∷ f JSX
  | Style.Props f (MandatoryProps InputProps)
  )

type MandatoryProps r =
  ( togglePosition ∷ TogglePosition
  , setTogglePosition ∷ TogglePosition -> Effect Unit
  | r
  )

data TappingState
  = TapAllowed
  | TapNotAllowed

data DragState
  = NotDragging
  | Dragging { startX ∷ Number, currentX ∷ Number }
  | DragDone { startX ∷ Number, endX ∷ Number }

derive instance eqDragState ∷ Eq DragState

instance showDragState ∷ Show DragState where
  show = case _ of
    NotDragging -> "NotDragging"
    Dragging x -> "Dragging " <> show x
    DragDone x -> "DragDone " <> show x

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
      buttonRef <- useRef null
      toggleRef <- useRef null
      tapState <- useRef TapNotAllowed
      dragState /\ setDragState <- React.useState' NotDragging
      useEffect dragState do
        case dragState of
          NotDragging -> mempty
          Dragging { startX, currentX } -> do
            writeRef tapState TapNotAllowed
          DragDone { startX, endX } -> do
            maybeBbox <- getBoundingBoxFromRef buttonRef
            for_ maybeBbox \bbox -> do
              if endX - startX <= (bbox.left - startX) + (bbox.width / 2.0) then do
                props.setTogglePosition ToggleIsLeft
              else do
                props.setTogglePosition ToggleIsRight
        mempty
      let
        buttonVariants =
          { left: { backgroundColor: (Emotion.str <<< Color.cssStringRGBA <$> props.backgroundLeft) ?|| Emotion.str colour.inputBackground }
          , right: { backgroundColor: (Emotion.str <<< Color.cssStringRGBA <$> props.backgroundRight) ?|| Emotion.str colour.success }
          }
        buttonVariant = Motion.makeVariantLabels buttonVariants
      -- components
      let
        result =
          container
            [ animateTextPresence
                [ textContainer
                    [ textOnContainer
                        [ guard (props.togglePosition == ToggleIsRight)
                            $ textOn
                                [ props.left
                                    ?|| el_ Icon.component { icon: SVGIcon.on, stroke: Style.successTextColour }
                                ]
                        ]
                    , textOffContainer
                        [ guard (props.togglePosition == ToggleIsLeft)
                            $ textOff
                                [ props.right
                                    ?|| el_ Icon.component { icon: SVGIcon.off, stroke: Style.disabledTextColour }
                                ]
                        ]
                    ]
                ]
            , toggle
            ]
        container =
          styled Motion.button
            { className: "ry-toggle"
            , css: Style.button
            , transition: Motion.transition { type: "tween", duration: 0.33, ease: "easeOut" }
            , variants: Motion.variants buttonVariants
            , animate:
              Motion.animate case props.togglePosition of
                ToggleIsRight -> buttonVariant.right
                ToggleIsLeft -> buttonVariant.left
            , value: show props.togglePosition
            , onClick: handler preventDefault \_ -> props.setTogglePosition (flipToggle props.togglePosition)
            , style: props.style
            , _data: Object.singleton "testid" "toggle-testid"
            , role: "switch"
            , _aria: Object.singleton "checked" "switch"
            , ref: buttonRef
            }
        textContainer =
          styled R.div'
            { className: "ry-toggle-text"
            , css: Style.toggleTextContainer
            }
        textOnContainer =
          styled R.div'
            { className: "ry-toggle-text-on"
            , css: Style.toggleText
            }
        textOffContainer =
          styled R.div'
            { className: "ry-toggle-text-off"
            , css: Style.toggleText
            }
        textOn =
          el Motion.div
            { className: "ry-toggle-text-container"
            , key: "ry-toggle-text-on-container"
            , initial: Motion.initial $ css { scale: 0, opacity: 0 }
            , animate: Motion.animate $ css { scale: 1, opacity: 1 }
            , exit: Motion.exit $ css { scale: 0, opacity: 0 }
            }
        textOff =
          el Motion.div
            { className: "ry-toggle-text-container"
            , key: "ry-toggle-text-off-container"
            , initial: Motion.initial $ css { scale: 0, opacity: 0 }
            , animate: Motion.animate $ css { scale: 1, opacity: 1 }
            , exit: Motion.exit $ css { scale: 0, opacity: 0 }
            }
        animateTextPresence = el Motion.animatePresence {}
        toggle =
          el_ toggleCircle
            { buttonRef
            , toggleRef
            , togglePosition: props.togglePosition
            , setTogglePosition: props.setTogglePosition
            , dragState
            , setDragState
            , tapState
            }
      pure result

toggleCircle ∷
  ReactComponent
    { setTogglePosition ∷ TogglePosition -> Effect Unit
    , toggleRef ∷ NodeRef
    , buttonRef ∷ NodeRef
    , togglePosition ∷ TogglePosition
    , dragState ∷ DragState
    , setDragState ∷ DragState -> Effect Unit
    , tapState ∷ Ref TappingState
    }
toggleCircle =
  unsafePerformEffect
    $ reactComponent "ToggleCircle" do
        \( { togglePosition
          , setTogglePosition
          , toggleRef
          , buttonRef
          , dragState
          , setDragState
          , tapState
          }
        ) -> React.do
          maxLeft /\ setMaxLeft <- useState' Nothing
          useEffectAlways do
            when (maxLeft == Nothing) do
              runMaybeT_ do
                b <- getBoundingBoxFromRef buttonRef # MaybeT
                t <- getBoundingBoxFromRef toggleRef # MaybeT
                let ml = b.width - t.width - (2.0 * (t.left - b.left))
                setMaxLeft (Just ml) # lift
            mempty
          let
            toggleVariants =
              { left: { x: 0.0 }
              , right: { x: maxLeft # fromMaybe 0.0 }
              }
            toggleVariant = Motion.makeVariantLabels toggleVariants
          pure
            $ styledLeaf Motion.div
                { className: "ry-toggle-toggle"
                , layout: Motion.layout true
                , onClick: handler stopPropagation mempty
                , onTouchStart: handler stopPropagation mempty
                , onTouchEnd: handler stopPropagation mempty
                , css: Style.theToggle
                , drag: Motion.drag "x"
                , dragMomentum: Motion.dragMomentum false
                , key: if isNothing maxLeft then "initialising" else "ready"
                , dragElastic: Motion.dragElastic false
                , dragConstraints:
                  Motion.dragConstraints
                    { left:
                      case togglePosition of
                        ToggleIsLeft -> zero
                        ToggleIsRight -> negate (maxLeft # fromMaybe 0.0)
                    , right:
                      case togglePosition of
                        ToggleIsRight -> zero
                        ToggleIsLeft -> maxLeft # fromMaybe 0.0
                    }
                , variants: Motion.variants toggleVariants
                , transition: Motion.transition { type: "tween", duration: 0.33, ease: "easeOut" }
                , whileTap: Motion.prop $ css { scale: 1.1, transition: { type: "tween", duration: 0.10, ease: "easeInOut" } }
                , onTapStart: Motion.onTapStart \_ _ -> writeRef tapState TapAllowed
                , onTap:
                  Motion.onTap \_ pi -> do
                    ts <- readRef tapState
                    case ts of
                      TapAllowed -> setTogglePosition (flipToggle togglePosition)
                      _ -> mempty
                    mempty
                , onTapCancel:
                  Motion.onTapCancel \_ pi -> do
                    writeRef tapState TapNotAllowed
                    mempty
                , initial: Motion.initial false
                , animate:
                  Motion.animate case togglePosition of
                    ToggleIsLeft -> toggleVariant.left
                    ToggleIsRight -> toggleVariant.right
                , onDragStart:
                  Motion.onDragStart \_ pi -> do
                    maybeBBox <- getBoundingBoxFromRef toggleRef
                    let x = maybeBBox <#> \bbox -> bbox.left + (bbox.width / 2.0)
                    setDragState $ Dragging { startX: x # fromMaybe pi.point.x, currentX: pi.point.x }
                , onDrag:
                  Motion.onDrag \_ pi -> do
                    case dragState of
                      Dragging { startX } -> do
                        setDragState $ Dragging { startX, currentX: pi.point.x }
                      other -> Console.warn $ i "Unexpected drag state " (show other) " in onDragEvent"
                , onDragEnd:
                  Motion.onDragEnd \_ pi -> do
                    case dragState of
                      Dragging { startX } -> do
                        maybeBBox <- getBoundingBoxFromRef toggleRef
                        let x = maybeBBox <#> \bbox -> bbox.left + (bbox.width / 2.0)
                        setDragState (DragDone { startX, endX: x # fromMaybe' \_ -> unsafeCrashWith "shit" })
                      other -> Console.warn $ i "Unexpected drag state " (show other) " in onDragEvent"
                , ref: toggleRef
                }
