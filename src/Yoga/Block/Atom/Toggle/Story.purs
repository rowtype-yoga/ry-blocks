module Yoga.Block.Atom.Toggle.Story where

import Prelude
import Color as Color
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Yoga ((/>), (</))
import Yoga.Block as Block
import Yoga.Block.Atom.Toggle as Toggle
import Yoga.Block.Atom.Toggle.Types (TogglePosition(..))
import Yoga.Block.Container.Style (DarkOrLightMode(..))

default ∷
  { title ∷ String
  }
default =
  { title: "Atom/Toggle"
  }

toggle ∷ Effect JSX
toggle = do
  example ← mkBasicExample
  darkLight ← mkDarkLightToggle
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Basics" ]
            , element example {}
            , R.h2_ [ R.text "Dark Light toggle" ]
            , element darkLight {}
            ]
        ]
  where
  mkBasicExample =
    React.reactComponent "Toggle example" \_p → React.do
      togglePosition /\ setTogglePosition ← React.useState' ToggleIsRight
      pure
        $ element Toggle.component
            { value: togglePosition
            , onChange: setTogglePosition
            , ariaLabel: "dark-light-toggle"
            }

  mkDarkLightToggle =
    React.reactComponent "Toggle dark night example" \_p → React.do
      togglePosition /\ setTogglePosition ← React.useState' ToggleIsLeft
      theme /\ setTheme ← React.useState' Nothing
      let
        content =
          element Toggle.component
            { value: togglePosition
            , ariaLabel: "dark-light-toggle"
            , onChange:
                \newTogglePosition → do
                  setTogglePosition newTogglePosition
                  setTheme case newTogglePosition of
                    ToggleIsRight → Just DarkMode
                    ToggleIsLeft → Just LightMode
            , left: R.text "🌒"
            , right: R.text "🌞"
            , backgroundLeft:
                Color.hsl 205.0 1.0 0.83
            , backgroundRight:
                Color.hsl 260.0 0.7 0.45
            }
      pure
        $ Block.container
            </ { themeVariant: theme }
            /> [ content ]
