module Yoga.Block.Atom.Input.View.HTMLInput
  ( Props
  , PropsF
  , PropsOptional
  , component
  , componentOptional
  ) where

import Yoga.Prelude.View
import Yoga.Block.Atom.Input.Style as Style
import Yoga.Block.Atom.Input.Types (HTMLInputType)
import Yoga.Block.Atom.Input.Types as HTMLInput

type PropsF f =
  ( type ∷ f HTMLInputType
  | Style.Props f (InputPropsF f ())
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

componentOptional ∷ ∀ p q. Union p q PropsOptional => ReactComponent { | p }
componentOptional = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Input" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        result = inputWrapper [ input ]
        inputWrapper = div </* { className: "ry-input-wrapper", css: Style.inputWrapper }
        input = emotionInput ref inputProps { className: "ry-input", css: Style.input }
        inputProps = props { type = HTMLInput.toString <$> props.type }
      pure result
