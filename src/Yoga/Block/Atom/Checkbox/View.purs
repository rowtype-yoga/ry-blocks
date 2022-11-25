module Yoga.Block.Atom.Checkbox.View where

import Yoga.Prelude.View

import React.Basic.DOM as R
import React.Basic.DOM.Events (targetChecked)
import React.Basic.DOM.SVG as SVG
import React.Basic.Hooks as React
import Yoga.Block.Atom.Checkbox.Style as Style

type Props = PropsF Id

type MandatoryProps r =
  ( onChecked ∷ (Boolean → Effect Unit)
  , id ∷ String
  | r
  )

type PropsF f =
  ( checked ∷ f Boolean
  | Style.Props f (MandatoryProps ())
  )

component ∷ ∀ p p_. Union p p_ Props ⇒ ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent = mkForwardRefComponent "Checkbox"
  \(props ∷ { | PropsF OptionalProp }) ref → React.do
    checkedBackup /\ setChecked ← React.useState' false
    let checked = props.checked ?|| checkedBackup
    pure $ div "ry-checkbox-container" Style.container
      [ R.input' </*>
          { className: "ry-checkbox"
          , id: props.id
          , css: Style.checkbox
          , type: "checkbox"
          , checked
          , onChange: handler targetChecked
              ( traverse_ \isChecked → do
                  case props.checked # opToMaybe of
                    Nothing → setChecked isChecked
                    Just _ → mempty
                  props.onChecked isChecked
              )
          }
      , div "ry-checkbox-checkmark-container"
          ( Style.checkmarkContainer <>
              if checked then Style.checkmarkContainerChecked
              else Style.checkmarkContainerNotChecked
          )
          [ SVG.svg'
              </*
                { className: "ry-checkmark"
                , css: Style.checkmark <>
                    if checked then
                      Style.checkmarkChecked
                    else Style.checkmark
                , xmlns: "http://www.w3.org/2000/svg"
                , viewBox: "0 0 52 52"
                }
              />
                [ SVG.path' </> { d: "M14.1 27.2l7.1 7.2 16.7-16.8" }
                ]
          ]
      ]
