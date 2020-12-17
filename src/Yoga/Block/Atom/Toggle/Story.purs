module Yoga.Block.Atom.Toggle.Story where

import Prelude
import Color as Color
import Data.Maybe (Maybe(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Yoga.Block as Block
import Yoga.Block.Atom.Toggle as Toggle
import Yoga.Block.Container.Style (DarkOrLightMode(..))

default ∷
  { title ∷ String
  }
default =
  { title: "Atom/Toggle"
  }

toggle ∷ Effect JSX
toggle = do
  example <- mkBasicExample
  darkLight <- mkDarkLightToggle
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
      React.reactComponent "Toggle example" \p -> React.do
        isOn /\ turnOnOrOff <- React.useState' false
        pure
          $ element Toggle.component
              { value: isOn
              , onToggle: turnOnOrOff
              }

    mkDarkLightToggle =
      React.reactComponent "Toggle dark night example" \p -> React.do
        isOn /\ turnOnOrOff <- React.useState' false
        theme /\ setTheme <- React.useState' Nothing
        let
          content =
            element Toggle.component
              { value: isOn
              , onToggle:
                \b -> do
                  turnOnOrOff b
                  setTheme (Just if b then DarkMode else LightMode)
              , on: R.text "🌒"
              , off: R.text "🌞"
              , backgroundOn:
                Color.hsl 205.0 1.0 0.93
              , backgroundOff:
                Color.hsl 260.0 0.7 0.45
              }
        pure
          $ case theme of
              Nothing -> element Block.container { content }
              Just themeVariant ->
                element Block.container
                  { content
                  , themeVariant: themeVariant
                  }
