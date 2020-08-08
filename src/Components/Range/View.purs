module Components.Range.View (component, Props, PropsF) where

import Prelude.View
import Components.Range.Style as Style
import Data.Int as Int
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.DOM.Events as Event
import React.Basic.Hooks as React
import Web.HTML.HTMLElement (tabIndex)

type PropsF f =
  ( className ∷ f String
  , min ∷ f Int
  , max ∷ f Int
  , value ∷ f Int
  | Style.Props f InputProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component =
  mkForwardRefComponent "Range" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let min = props.min ?|| 0
      let max = props.max ?|| 100
      let v = props.value ?|| ((max - min) / 2)
      let disabled = props.disabled
      value /\ setValue <- useState' v
      hasFocus /\ setHasFocus <- useState' false
      pure
        $ styled R.div'
            { className: "ry-range"
            , css: Style.container <> guard props.disabled Style.inputDisabled
            , onFocus: handler_ $ setHasFocus true
            , onBlur: handler_ $ setHasFocus false
            , style: props.style <> css { "--val": value, "--max": max - min }
            }
            [ styledLeaf R.div'
                { className: "ry-range-filled"
                , css: Style.filled <> guard props.disabled Style.disabled
                }
            , styledLeaf R.div'
                { className: "ry-range-not-filled"
                , css: Style.notFilled <> guard props.disabled Style.disabled
                }
            , guard hasFocus
                $ styledLeaf R.div'
                    { className: "ry-range-focus-circle"
                    , css: Style.focusCircle
                    }
            , emotionInput (props { max = show max, min = show min, value = show value })
                { className: "ry-range-thumb " <>? props.className
                , css: Style.range props <> guard props.disabled Style.inputDisabled
                , style: props.style
                , tabIndex: -1
                , value: show value
                , type: "range"
                , onChange: handler Event.targetValue ((_ >>= Int.fromString) >>> (foldMap setValue))
                , ref
                }
            ]
