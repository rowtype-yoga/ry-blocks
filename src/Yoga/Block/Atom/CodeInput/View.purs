module Yoga.Block.Atom.CodeInput.View
  ( component
  , Props
  , PropsF
  , EmotionProps
  ) where

import Yoga.Prelude.View
import React.Basic.Emotion (Style)
import Yoga.Block.Atom.CodeInput.Style as Style

type PropsF f =
  ( 
  | Style.Props f (InputPropsF f EmotionProps)
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

type EmotionProps =
  ( className ∷ String, css ∷ Style )

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ r. ReactComponent { | r }
rawComponent =
  mkForwardRefComponent "CodeInput" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ emotionInput ref
            props
            { className: "ry-inline-code"
            , css: Style.codeInput props
            , spellCheck: false
            , autoComplete: "false"
            , autoCorrect: "off"
            , autoCapitalize: "off"
            }
