module Plumage.Atom.Input.Select where

import Prelude

import Effect (Effect)
import Plumage.Atom.Input.Input.Style (plumageInputContainerStyle)
import Plumage.Atom.Input.Select.Style (plumageSelectStyle)
import Plumage.Util.HTML as Styled
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Yoga ((/>), (</), (</*))

mkSelect ∷
  ∀ a.
  React.Component
    ( { choice ∷ a
      , choices ∷ Array a
      , onChange ∷ Array a → Effect Unit
      , toString ∷ a → String
      , toValue ∷ a → String
      }
    )
mkSelect = do
  React.component "Select" \{ toString, toValue, choices } → React.do
    pure $
      Styled.div "input-container" plumageInputContainerStyle
        [ R.select'
            </*
              { className: "select"
              , role: "listbox"
              , css: plumageSelectStyle
              }
            />
              ( choices <#> \c → R.option' </ { value: toValue c } />
                  [ R.text $ toString c ]
              )
        ]

-- [ R.div_ [ R.text (toString choice) ]
-- , H.div_ (widthAndHeight 16)
--     [ Heroicons.chevronDown ]

-- ]
