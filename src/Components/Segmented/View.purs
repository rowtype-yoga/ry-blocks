module Components.Segmented.View (component, Props, PropsF) where

import Prelude.View
import Components.Segmented.Style as Style

type PropsF f =
  ( className ∷ f String
  , activeIndex ∷ Int
  | Style.Props f InputProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component =
  mkForwardRefComponent "Segmented" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionInput props
            { className: "ry-segmented" <>? props.className
            , css: Style.segmented props
            , ref
            }
