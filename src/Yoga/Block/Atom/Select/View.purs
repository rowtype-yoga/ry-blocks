module Yoga.Block.Atom.Select.View where

import Yoga.Prelude.View

import Data.Array as Array
import Effect.Unsafe (unsafePerformEffect)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Yoga.Block.Atom.Select.Style as Style

type Props a =
  { choice ∷ a
  , choices ∷ Array a
  , onChange ∷ a → Effect Unit
  , toString ∷ a → String
  , toValue ∷ a → String
  }

component ∷ ∀ a. ReactComponent (Props a)
component = unsafePerformEffect do
  React.reactComponent "Select" \{ toString, toValue, choices, onChange } →
    React.do
      pure $
        div "input-container" Style.container
          [ R.select'
              </*
                { className: "select"
                , role: "listbox"
                , css: Style.select
                , onChange: handler targetValue
                    \maybeVal → traverse_ onChange do
                      val ← maybeVal
                      choices # Array.find (toValue >>> (_ == val))

                }
              />
                ( choices <#> \c → R.option' </ { value: toValue c } />
                    [ R.text $ toString c ]
                )
          ]
