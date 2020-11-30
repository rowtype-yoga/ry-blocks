module Components.CodeInput.View (component, Props, PropsF) where

import Prelude.View
import Components.CodeInput.Style as Style
import React.Basic.DOM as R

type PropsF f =
  ( className ∷ f String
  | Style.Props f + InputProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component =
  mkForwardRefComponent "CodeInput" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ styled R.div'
            { className: "ry-inline-code-wrapper"
            , css: Style.codeInputWrapper
            }
            [ emotionInput
                props
                { className: "ry-inline-code " <>? props.className
                , css: Style.codeInput props
                , ref
                , spellCheck: false
                , onDragOver: handler preventDefault (const mempty)
                , autoComplete: "false"
                , autoCorrect: "off"
                , autoCapitalize: "off"
                }
            ]
