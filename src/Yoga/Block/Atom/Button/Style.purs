module Yoga.Block.Atom.Button.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  | r
  )

button ∷ Style
button =
  css
    { background:
      str
        $ i "linear-gradient(180deg,"
            colour.highlightLighter
            ","
            colour.highlightDarker
            "), linear-gradient(225deg,"
            colour.highlightRotatedBackwards
            ","
            colour.highlightRotatedForwards
            ")"
    , color: str colour.highlightText
    , fontSize: var "--s0"
    , fontFamily: var "--mainFont"
    , fontWeight: str "550"
    , padding: str "var(--s-1) var(--s0)"
    , borderRadius: var "--s0"
    , border: str $ "var(--s-5) solid " <> colour.interfaceBackgroundShadow
    , borderWidth: _0
    , """&[data-button-shape="pill"]""":
      nest
        { borderRadius: var "--s1"
        , padding: str "var(--s-1) var(--s1)"
        }
    , """&[data-button-shape="square"]""":
      nest
        { borderRadius: _0
        , padding: str "var(--s-1) var(--s1)"
        }
    , """&[data-button-type="primary"]""":
      nest
        {}
    }
