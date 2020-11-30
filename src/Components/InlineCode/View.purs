module Components.InlineCode.View (component, Props, PropsF) where

import Prelude.View
import Components.InlineCode.Style as Style
import Data.Symbol (SProxy(..))
import React.Basic.DOM as R
import Record as Record

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
  mkForwardRefComponent "InlineCode" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      pure
        $ styled R.div'
            { className: "ry-inline-code-wrapper"
            , css: Style.inlineCodeWrapper
            }
            [ emotionInput
                props
                { className: "ry-inline-code " <>? props.className
                , css: Style.inlineCode props
                , ref
                , spellCheck: false
                , onDragOver: handler preventDefault (const mempty)
                , autoComplete: "false"
                , autoCorrect: "off"
                , autoCapitalize: "off"
                }
            ]
