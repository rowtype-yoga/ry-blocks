module Yoga.Block.Atom.Popover.View (component, MandatoryProps, Props, PropsF) where

import Yoga.Prelude.View
import Effect.Uncurried (mkEffectFn1)
import Framer.Motion as Motion
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import React.Basic.Popper.Hook (usePopper)
import React.Basic.Popper.Types (modifierOffset, nullRef)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Atom.Input.Placement.Types (Placement)
import Yoga.Block.Atom.Input.Placement.Types as Placement
import Yoga.Block.Atom.Popover.Style as Style

type PropsF f =
  ( className ∷ f String
  , placement ∷ f Placement
  | Style.Props f (MandatoryProps ())
  )

type MandatoryProps r =
  ( children ∷ Array JSX
  , target ∷ JSX
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
      referenceElement /\ setReferenceElement <- React.useState' nullRef
      popperElement /\ setPopperElement <- React.useState' nullRef
      { styles, attributes } <-
        usePopper referenceElement popperElement
          { modifiers:
            [ modifierOffset { x: 0.0, y: 0.0 }
            ]
          , placement: props.placement <#> Placement.render # unsafeUnOptional
          }
      -- Handlers
      -- Elements
      let
        result =
          fragment
            $ [ refElem
              , popperEl
                  [ content
                      props.children
                  ]
              ]
        content =
          styled R.div'
            { className: "popper-element-content"
            , css: Style.content
            , key: "container"
            }
        popperEl =
          styled R.div'
            { className: "popper-element"
            , css: Style.popper
            , ref: unsafeCoerce (mkEffectFn1 setPopperElement)
            , style: styles.popper
            , _data: attributes.popper
            }
        refElem =
          element Motion.div
            { ref: unsafeCoerce (mkEffectFn1 setReferenceElement)
            , style: css { display: "inline-block" }
            , children: [ props.target ]
            }
      pure result
