module Yoga.Block.Atom.Icon.View where

import Yoga.Prelude.View
import Yoga.Block.Atom.Icon.Style as Style

type Props
  = PropsF Id

type MandatoryProps r
  = ( icon ∷ JSX
    | r
    )

type PropsF f
  = ( className ∷ f String
    | Style.Props f (MandatoryProps ())
    )

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Yoga Icon" \(props ∷ { | PropsF OptionalProp }) ref -> React.do
    pure
      $ span
      </* { className: "ry-icon" <>? props.className
        , css: Style.span props
        , ref
        }
      /> [ props.icon ]
