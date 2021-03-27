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
        ")"
        ","
        "linear-gradient(225deg,"
        colour.highlightRotatedBackwards
        ","
        colour.highlightRotatedForwards
        ")"

backgroundAnimation ∷ StyleProperty
backgroundAnimation =
  keyframes
    $ { "from": css { backgroundPosition: str "0% 50%" }
      , "to": css { backgroundPosition: str "100% 50%" }
      }

button ∷ Style
button =
  css
    { background: str colour.backgroundLayer4
    , boxShadow: str "0 1px 4px rgba(0,0,0,0.30)"
    , border: str $ i "1px solid transparent"
    , borderTop: str $ i "1px solid " colour.backgroundLayer5
    , borderBottom: str $ i "1px solid " colour.backgroundLayer3
    , display: inlineFlex
    , padding: str "calc(var(--s-1) * 0.8) var(--s0)"
    , paddingBottom: str "calc(var(--s-1) * 0.8 + 1px)"
    , justifyContent: center
    , alignItems: center
    , borderRadius: var "--s-1"
    , color: str colour.text
    , boxSizing: borderBox
    , fontSize: var "--s0"
    , fontFamily: var "--mainFont"
    , fontWeight: str "450"
    , letterSpacing: str "calc(var(--s-5)* (-0.1))"
    , userSelect: none
    , transition: str "all 0.2s ease-out" <> str "transform 50ms ease-in"
    , """&[data-button-shape="pill"]""":
      nest
        { borderRadius: str "calc(var(--s1) * 0.85)"
        , padding: str "calc(var(--s-1) * 0.85) var(--s0)"
        , paddingBottom: str "calc(var(--s-1))"
        }
    , """&[data-button-type="primary"]""":
      nest
        { background: gradientBackground
        , backgroundSize: str "200% 200%"
        , fontWeight: str "600"
        , letterSpacing: str "calc(var(--s-5)* (0.1))"
        , animation: backgroundAnimation <> str " alternate ease-out 10s infinite"
        , boxShadow: str "0 1px 4px 0px rgba(0,0,0,0.40)"
        , borderColor: str "transparent"
        , color: str colour.highlightText
        , """&:focus-visible""":
          nest
            { borderColor: str "inherit"
            }
        , """&:active""":
          nest
            { boxShadow: str "inset 0 1px 6px rgba(0,0,0,0.40)"
            , border: str $ i "1px solid transparent"
            }
        , "&:disabled":
          nest
            { background: str colour.highlightDisabled
            , border: str $ i "1px solid transparent"
            }
        }
    , """&[data-button-type="dangerous"]""":
      nest
        { color: str $ colour.interfaceDangerousText
        , background: str $ colour.interfaceBackgroundDangerous
        , fontWeight: str "600"
        , letterSpacing: str "calc(var(--s-5) * -0.10)"
        }
    , """&:focus""": nest { outline: none }
    , """&:focus-visible""":
      nest
        { boxShadow: str $ "0 0 0 var(--s-4) " <> colour.highlight
        }
    , """&:active""":
      nest
        { boxShadow: str $ "inset 0 1px var(--s-1) rgba(0,0,0,0.20)"
        , borderTop: str $ i "1px solid " colour.interfaceBackgroundShadow
        , borderBottom: str $ i "1px solid " colour.interfaceBackgroundShadow
        , transform: str "scale3d(0.92,0.92,0.92)"
        , transition: str "transform 50ms ease"
        }
    , "&:disabled":
      nest
        { color: str colour.interfaceTextDisabled
        , boxShadow: none
        , background: str colour.interfaceBackgroundDisabled
        , borderTop: str $ i "1px solid " colour.interfaceBackgroundShadow
        , borderBottom: str $ i "1px solid " colour.interfaceBackgroundShadow
        }
    }
