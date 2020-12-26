module Yoga.Block.Atom.Button.View where

import Yoga.Prelude.View
import Data.Symbol (SProxy(..))
import Foreign.Object as Object
import Yoga.Block.Atom.Button.Style as Style
import Yoga.Block.Atom.Button.Types (ButtonShape, ButtonType, renderButtonShape, renderButtonType)
import Yoga.Block.Atom.Button.Types as Button
import Yoga.Block.Internal (ButtonProps, emotionButton)

type PropsF f =
  ( buttonType ∷ f ButtonType
  , buttonShape ∷ f ButtonShape
  | Style.Props f ButtonProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

key ∷ ∀ t1. SProxy t1
key = SProxy

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Button" do
    \(props ∷ { | PropsOptional }) propsRef -> React.do
      let
        _data =
          Object.fromHomogeneous
            { "button-type": renderButtonType (props.buttonType ?|| Button.Generic)
            , "button-shape": renderButtonShape (props.buttonShape ?|| Button.Rounded)
            }
      pure $ div
        </* { css: Style.buttonContainer
          , className: "ry-button-container"
          , _data
          }
        /> [ emotionButton propsRef
              props
              { className: "ry-button"
              , css: Style.button
              }
          ]
