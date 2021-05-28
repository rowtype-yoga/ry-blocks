module Yoga.Block.Atom.Button.View where

import Yoga.Prelude.View
import Data.Symbol (SProxy(..))
import Foreign.Object as Object
import Yoga.Block.Atom.Button.Style as Style
import Yoga.Block.Atom.Button.Types (ButtonShape, ButtonType, renderButtonShape, renderButtonType)
import Yoga.Block.Atom.Button.Types as Button

type PropsF :: forall k. (Type -> k) -> Row k -> Row k
type PropsF f r
  = ( buttonType ∷ f ButtonType
    , buttonShape ∷ f ButtonShape
    | Style.Props f r
    )

type Props
  = PropsF Id (ButtonWritablePropsF Id ())

type PropsOptional
  = PropsF OptionalProp (ButtonReadableProps)

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
      pure
        $ emotionButton propsRef
            props
            { className: "ry-button"
            , css: Style.button <>? props.css
            , _data
            }
