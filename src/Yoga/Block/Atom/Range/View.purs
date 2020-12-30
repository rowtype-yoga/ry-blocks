module Yoga.Block.Atom.Range.View (component, Props, PropsF) where

import Yoga.Prelude.View
import Data.Int as Int
import Foreign.Object as Object
import React.Basic.DOM (css)
import React.Basic.DOM.Events as Event
import React.Basic.Hooks as React
import Yoga.Block.Atom.Range.Style as Style

type PropsF f =
  ( className ∷ f String
  , min ∷ f Int
  , max ∷ f Int
  , value ∷ f Int
  | Style.Props f (InputPropsF f ())
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "Range" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let min = props.min ?|| 0
      let max = props.max ?|| 100
      let v = props.value ?|| ((max - min) / 2)
      let disabled = props.disabled ?|| false
      value /\ setValue <- useState' v
      hasFocus /\ setHasFocus <- useState' false
      pure
        $ div
        </* { className: "ry-range"
          , css: Style.container <> guard disabled Style.inputDisabled
          , onFocus: handler_ $ setHasFocus true
          , onBlur: handler_ $ setHasFocus false
          , style: fold props.style <> css { "--val": value, "--max": max - min }
          , _data: Object.singleton "testid" "range-testid"
          }
        /> [ div </*> { className: "ry-range-filled", css: Style.filled <> guard disabled Style.disabled }
          , div </*> { className: "ry-range-not-filled", css: Style.notFilled <> guard disabled Style.disabled }
          , guard hasFocus do
              div </*> { className: "ry-range-focus-circle", css: Style.focusCircle }
          , emotionInput
              ref
              ( props
                  { max = show max # asOptional
                  , min = show min # asOptional
                  , value = show value # asOptional
                  }
              )
              { className: "ry-range-thumb " <>? props.className
              , css: Style.range props <> guard disabled Style.inputDisabled <>? props.css
              , type: "range"
              , onChange: handler Event.targetValue ((_ >>= Int.fromString) >>> (foldMap setValue))
              }
          ]
