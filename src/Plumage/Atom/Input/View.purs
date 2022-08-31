module Plumage.Atom.Input.View where

import Plumage.Prelude.Style

import Plumage.Atom.Input.Input.Style (plumageInputContainerStyle, plumageInputStyle)
import Plumage.Util.HTML as Styled
import React.Basic.DOM as R
import React.Basic.Hooks (Component)
import React.Basic.Hooks as React
import Yoga ((</*>))
import Yoga.Block.Atom.Input.Hook.UseTypingPlaceholders (useTypingPlaceholders)
import Yoga.Prelude.View (handler, targetValue)

type InputProps =
  { id ∷ String
  , value ∷ String
  , setValue ∷ String → Effect Unit
  , placeholder ∷ String
  , placeholders ∷ Array String
  }

mkInput ∷ Component InputProps
mkInput = React.component "Input" render
  where
  render ∷ InputProps → _
  render (props@{ id, value, setValue } ∷ InputProps) = React.do
    inputRef ← useTypingPlaceholders props.placeholder props.placeholders
    pure $
      Styled.div "input-container" plumageInputContainerStyle
        [ R.input'
            </*>
              { id
              , className: "plm-input"
              , css: plumageInputStyle
              , value
              , onChange: handler targetValue (traverse_ setValue)
              , ref: inputRef
              }
        ]
