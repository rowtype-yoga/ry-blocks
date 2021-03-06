module Yoga.Block.Atom.Popover.View (component, MandatoryProps, Props, PropsF) where

import Yoga.Prelude.View
import Effect.Uncurried (mkEffectFn1)
import React.Basic.DOM (createPortal)
import React.Basic.Hooks as React
import React.Basic.Popper (modifierArrow, modifierMatchReferenceSize, modifierOffset, nullRef)
import React.Basic.Popper.Hook (usePopper)
import React.Basic.Popper.Placement.Types (Placement(..))
import React.Basic.Popper.Placement.Types as Placement
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM.Element (Element)
import Yoga.Block.Atom.Popover.Style as Style
import Yoga.Block.Container.View as Container
import Yoga.Block.Internal (findElementByIdInDocument)

type PropsF f =
  ( className ∷ f String
  , placement ∷ f Placement
  , renderArrow ∷ f Boolean
  , background ∷ f String
  , borderRadius ∷ f String
  , offsets ∷ f { xOffset ∷ Number, yOffset ∷ Number }
  , targetElement ∷ f Element
  | Style.Props f (MandatoryProps DivProps)
  )

type MandatoryProps r =
  ( children ∷ Array JSX
  , referenceElement ∷ NodeRef
  | r
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Popover" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      -- Hooks
      arrowElement /\ setArrowElement <- React.useState' nullRef
      popperElement /\ setPopperElement <- React.useState' nullRef
      popoverContainer /\ setPopoverContainer <- React.useState' Nothing
      useEffectOnce do
        maybeElem <- findElementByIdInDocument Container.tooltipContainerId
        setPopoverContainer maybeElem
        mempty
      let renderArrow = props.renderArrow # isTruthy
      let placement = props.placement ?|| Placement Placement.Auto Nothing
      let
        { xOffset, yOffset } =
          props.offsets
            ?|| if not renderArrow then
                zero
              else case placement of
                Placement Placement.Bottom _ -> { xOffset: 0.0, yOffset: 8.0 }
                Placement Placement.Top _ -> { xOffset: 0.0, yOffset: 8.0 }
                Placement Placement.Left _ -> { xOffset: 8.0, yOffset: 0.0 }
                Placement Placement.Right _ -> { xOffset: 8.0, yOffset: 0.0 }
                Placement Placement.Auto _ -> { xOffset: 0.0, yOffset: 0.0 }
      { styles, attributes } <-
        usePopper props.referenceElement popperElement
          { modifiers:
            [ modifierOffset { x: xOffset, y: yOffset }
            , modifierMatchReferenceSize
            ]
              <> guard renderArrow [ modifierArrow { element: arrowElement, padding: 8 } ]
          , placement: props.placement <#> Placement.render # unsafeUnOptional
          }
      -- Handlers
      -- Elements
      let
        result =
          popper
            [ content
            , guard renderArrow arrow
            ]
        content =
          emotionDiv
            ref
            props
            { className: "ry-popover-popper-element-content"
            , css: Style.content
            , children: props.children
            }
        popper =
          div
            </* { className: "ry-popover-popper-element"
              , css: Style.popper props.background
              , ref: unsafeCoerce (mkEffectFn1 setPopperElement)
              , style: styles.popper
              , _data: attributes.popper
              }
        arrow =
          div
            </*> { className: "ry-popover-arrow-element"
              , css: Style.arrow
              , ref: unsafeCoerce (mkEffectFn1 setArrowElement)
              , style: styles.arrow
              , _data: attributes.arrow
              , id: "arrow"
              }
      pure case opToMaybe props.targetElement of
        Just target -> createPortal result target
        Nothing -> case popoverContainer of
          Just pc -> createPortal result pc
          Nothing -> result
