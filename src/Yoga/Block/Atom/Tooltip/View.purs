module Yoga.Block.Atom.Tooltip.View (component, MandatoryProps, Props, PropsF) where

import Yoga.Prelude.View
import Effect.Aff (Milliseconds(..), delay)
import Effect.Uncurried (mkEffectFn1)
import Framer.Motion as Motion
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import React.Basic.Popper.Hook (usePopper)
import React.Basic.Popper.Types (modifierArrow, modifierOffset, nullRef)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Atom.Tooltip.Style as Style

type PropsF f =
  ( className ∷ f String
  , hideDelay ∷ f Milliseconds
  | Style.Props f (MandatoryProps ())
  )

type MandatoryProps r =
  ( theTip ∷ JSX
  , target ∷ JSX
  | r
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "Tooltip" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      -- Hooks
      referenceElement /\ setReferenceElement <- React.useState' nullRef
      popperElement /\ setPopperElement <- React.useState' nullRef
      arrowElement /\ setArrowElement <- React.useState' nullRef
      { styles, attributes } <-
        usePopper referenceElement popperElement
          { modifiers:
            [ modifierArrow arrowElement
            , modifierOffset { x: 0.0, y: 12.0 }
            ]
          }
      visible /\ setVisible <- React.useState' false
      touching /\ setTouching <- React.useState' false
      hovering /\ setHovering <- React.useState' false
      useAff hovering do
        if hovering then
          setVisible true # liftEffect
        else do
          delay (props.hideDelay ?|| (0.0 # Milliseconds))
          setVisible false # liftEffect
      useAff touching do
        if touching then do
          delay (1000.0 # Milliseconds)
          setVisible true # liftEffect
        else do
          delay (props.hideDelay ?|| (450.0 # Milliseconds))
          setVisible false # liftEffect
      -- Handlers
      let
        hoveredIn = setHovering true
        hoveredOut = setHovering false
        touchStarted = setTouching true
        touchEnded = setTouching false
      -- Elements
      let
        result =
          fragment
            $ [ refElem [ props.target ]
              , popperEl
                  [ animatePresence
                      $ guard visible
                          [ content
                              [ props.theTip
                              , arrow
                              ]
                          ]
                  ]
              ]
        animatePresence = Motion.animatePresence </ { initial: false }
        content =
          Motion.div
            </* { className: "popper-element-content"
              , css: Style.content props
              , initial: Motion.initial $ R.css { opacity: [ 1.0, 0.8, 0.0 ], scale: [ 1.0, 0.85 ] }
              , animate: Motion.animate $ R.css { opacity: [ 0.0, 0.3, 1.0 ], scale: [ 0.0, 1.05, 1.0, 0.98, 1.01, 1.0 ] }
              , exit: Motion.exit $ R.css { opacity: [ 1.0, 0.8, 0.0 ], scale: [ 1.0, 0.85 ] }
              , transition: Motion.transition { duration: 0.2 }
              , key: "container"
              }
        popperEl =
          div
            </* { className: "popper-element"
              , css: Style.popper
              , ref: unsafeCoerce (mkEffectFn1 setPopperElement)
              , style: styles.popper
              , _data: attributes.popper
              }
        arrow =
          div
            </*> { className: "popper-arrow"
              , id: "arrow"
              , css: Style.arrow props
              , ref: unsafeCoerce (mkEffectFn1 setArrowElement)
              , style: styles.arrow
              , _data: attributes.arrow
              }
        refElem =
          Motion.div
            </ { ref: unsafeCoerce (mkEffectFn1 setReferenceElement)
              , style: css { display: "inline-block" }
              , onHoverStart: Motion.onHoverStart \_ _ -> hoveredIn
              , onHoverEnd: Motion.onHoverEnd \_ _ -> hoveredOut
              , onTouchStart: handler_ touchStarted
              , onTouchEnd: handler_ touchEnded
              }
      pure result
