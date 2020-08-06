module Components.Centre.View (component, Props, PropsF) where

import Prelude.View
import Components.Centre.Style as Style

type PropsF f =
  ( className ∷ f String
  | Style.Props f + DivProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component =
  mkForwardRefComponent "Centre" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionDiv
            props
            { className: "ry-centre " <>? props.className
            , css: Style.centre props
            , ref
            }
