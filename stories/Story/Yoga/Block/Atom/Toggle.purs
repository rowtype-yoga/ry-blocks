module Story.Yoga.Block.Atom.Toggle (default, toggle) where

import Prelude

import Color as Color
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Debug (spy)
import Effect (Effect)
import MediaQuery (matchMedia, matches)
import MediaQuery.Types (MediaQueryList)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Storybook.Addon.Actions (action)
import Web.HTML (window)
import Yoga ((/>), (</))
import Yoga.Block as Block
import Yoga.Block.Atom.Toggle as Toggle
import Yoga.Block.Atom.Toggle.Types (TogglePosition(..))
import Yoga.Block.Container.Style (DarkOrLightMode(..))

default ∷ { title ∷ String }
default = { title: "Atom/Toggle" }

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

  mkDarkLightToggle = do
    prefersDarkMediaQuery ← mkPrefersDark
    prefersDark ← matches prefersDarkMediaQuery
    React.reactComponent "Toggle dark night example" \_p → React.do
      togglePosition /\ setTogglePosition ← React.useState'
        (if prefersDark then ToggleIsRight else ToggleIsLeft)
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
            , left: R.text "🌜"
            , right: R.text "🌞"
            , backgroundLeft:
                Color.hsl 205.0 1.0 0.83
            , backgroundRight:
                Color.hsl 240.0 0.7 0.64
            }
      pure
        $ Block.container
            </ { themeVariant: theme }
            />
              [ content
              , element Toggle.component
                  { value: togglePosition
                  , onChange: setTogglePosition
                  , ariaLabel: "dark-light-toggle"
                  }
              ]

mkPrefersDark ∷ Effect MediaQueryList
mkPrefersDark = matchMedia "(prefers-color-scheme: dark)" =<< window
