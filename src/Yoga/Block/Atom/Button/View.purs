module Yoga.Block.Atom.Button.View where

import Yoga.Prelude.View
import Data.Symbol (SProxy(..))
import Record.Builder as RB
import Yoga.Block.Atom.Button.Style as Style
import Yoga.Block.Atom.Button.Types (ButtonType)
import Yoga.Block.Internal (ButtonProps, emotionButton)

type PropsF f =
  ( buttonType ∷ f ButtonType
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
      pure
        $ emotionButton propsRef
            ( props
                # RB.build
                    ( RB.delete (key ∷ _ "css") >>> RB.delete (key ∷ _ "buttonType")
                    )
            )
            { className: "ry-button"
            , css: Style.button
            }
