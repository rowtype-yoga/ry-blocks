module Yoga.Block.Atom.Select.View where

import Yoga.Prelude.View

import Effect.Unsafe (unsafePerformEffect)
import Yoga.Block.Atom.Select.Style as Style
import React.Basic.DOM as R
import React.Basic.Hooks as React

component ∷
  ∀ a.
  ReactComponent
    ( { choice ∷ a
      , choices ∷ Array a
      , onChange ∷ Array a → Effect Unit
      , toString ∷ a → String
      , toValue ∷ a → String
      }
    )
component = unsafePerformEffect do
  React.reactComponent "Select" \{ toString, toValue, choices } → React.do
    pure $
      div "input-container" Style.container
        [ R.select'
            </*
              { className: "select"
              , role: "listbox"
              , css: Style.select
              }
            />
              ( choices <#> \c → R.option' </ { value: toValue c } />
                  [ R.text $ toString c ]
              )
        ]
