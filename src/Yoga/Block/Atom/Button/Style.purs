module Yoga.Block.Atom.Button.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  | r
  )

gradientBackground ∷ StyleProperty
gradientBackground =
  str
    $ i "linear-gradient(0deg,"
        colour.highlightDarker
        ","
        colour.highlightLighter
        "),linear-gradient(225deg,"
        colour.highlightRotatedBackwards
        ","
        colour.highlightRotatedForwards
        ")"

buttonContainer ∷ Style
buttonContainer =
  css
    { background: str colour.interfaceBackground
    , boxShadow: str "0 1px 4px rgba(0,0,0,0.30)"
    , borderTop: str $ i "1px solid " colour.interfaceBackgroundHighlight
    , borderBottom: str $ i "1px solid " colour.interfaceBackgroundShadow
    , display: inlineFlex
    , padding: str "2px"
    , justifyContent: center
    , alignItems: center
    , borderRadius: var "--s-1"
    , """&[data-button-shape="pill"]""":
      nest
        { borderRadius: var "--s1"
        , "& > button":
          nest
            { padding: str "calc(var(--s-1) * 0.8) var(--s0)"
            }
        }
    , """&[data-button-type="primary"]""":
      nest
        { background: gradientBackground
        , backgroundSize: str "200% 200%"
        , animation: backgroundAnimation <> str " alternate ease-out 10s infinite"
        , boxShadow: str "0 1px 4px 0px rgba(0,0,0,0.40)"
        , borderColor: str "transparent"
        , "& > button":
          nest
            { color: str colour.highlightText
            }
        }
    }

backgroundAnimation ∷ StyleProperty
backgroundAnimation =
  keyframes
    $ { "from": css { backgroundPosition: str "0% 50%" }
      , "to": css { backgroundPosition: str "100% 50%" }
      }

button ∷ Style
button =
  css
    { background: str "transparent"
    , color: str colour.text
    , boxSizing: borderBox
    , fontSize: var "--s0"
    , fontFamily: var "--mainFont"
    , fontWeight: str "500"
    , letterSpacing: str "calc(var(--s-5)*0.2)"
    , padding: str "calc(var(--s-1) * 0.85) var(--s0)"
    , border: none
    , userSelect: none
    , "&:focus": nest { outline: none }
    }
