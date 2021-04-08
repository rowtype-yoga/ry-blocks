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

type PropsF :: forall k. (Type -> k) -> Row k -> Row k
type PropsF f r =
  ( type ∷ f HTMLInputType
  | Style.Props f r
  )

type Props =
  PropsF Id (InputWritableProps)

type PropsOptional =
  PropsF OptionalProp (InputReadableProps)

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

componentOptional ∷ ∀ p q. Union p q (PropsF OptionalProp (InputWritablePropsF OptionalProp ())) => ReactComponent { | p }
componentOptional = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Input" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        inputWrapper = div </* { className: "ry-input-wrapper", css: Style.inputWrapper }
        input = emotionInput ref inputProps { className: "ry-input" , css: Style.input props }
        inputProps = props { type = HTMLInput.toString <$> props.type }
      pure do inputWrapper [ input ]
