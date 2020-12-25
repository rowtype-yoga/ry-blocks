module Yoga.Block.Atom.Popover.View (component, MandatoryProps, Props, PropsF) where

import Yoga.Prelude.View
import Effect.Uncurried (mkEffectFn1)
import React.Basic.Hooks as React
import React.Basic.Popper.Hook (usePopper)
import React.Basic.Popper.Placement.Types (Placement)
import React.Basic.Popper.Placement.Types as Placement
import React.Basic.Popper.Types (modifierOffset, nullRef)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Atom.Popover.Style as Style

type PropsF f
  = ( className ∷ f String
    , placement ∷ f Placement
    | Style.Props f (MandatoryProps DivProps)
    )

type MandatoryProps r
  = ( children ∷ Array JSX
    , referenceElement ∷ NodeRef
    | r
    )

type Props
  = PropsF Id

type PropsOptional
  = PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Popover" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      -- Hooks
      -- referenceElement /\ setReferenceElement <- React.useState' nullRef
      popperElement /\ setPopperElement <- React.useState' nullRef
      { styles, attributes } <-
        usePopper props.referenceElement popperElement
          { modifiers:
            [ modifierOffset { x: 0.0, y: 0.0 }
            ]
          , placement: props.placement <#> Placement.render # unsafeUnOptional
          }
      -- Handlers
      -- Elements
      let
        result = popperEl [ content ]
        content =
          emotionDiv
            ref
            props
            { className: "popper-element-content"
            , css: Style.content
            , children: props.children
            }
        popperEl =
          div
            </* { className: "popper-element"
              , css: Style.popper
              , ref: unsafeCoerce (mkEffectFn1 setPopperElement)
              , style: styles.popper
              , _data: attributes.popper
              }
      pure result
