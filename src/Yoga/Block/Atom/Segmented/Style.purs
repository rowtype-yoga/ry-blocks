module Yoga.Block.Atom.Segmented.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  | r
  )

segmented ∷ Style
segmented = styles
  where
    styles =
      css
        { borderWidth: _0
        , margin: _0
        , padding: _0
        , width: auto
        }

activeElement ∷ Style
activeElement =
  css
    { position: fixed
    , borderRadius: str "8px"
    , background: str colour.interfaceBackground
    , border: str $ i "1px solid " colour.interfaceBackgroundShadow
    , borderTop: str $ i "1px solid " colour.interfaceBackgroundHighlight
    , borderBottom: str $ i "1px solid " colour.interfaceBackgroundShadow
    , boxShadow: str "0 0 1px rgba(0,0,0,0.55)"
    , margin: _0
    , padding: _0
    , zIndex: str "0"
    }

container ∷ Style
container =
  css
    { background: str colour.background10
    , boxShadow: str "inset 0 1 0 rgba(0,0,0,0.1)"
    , borderRadius: str "10px"
    , height: auto
    , border: str $ i "1px solid " colour.background15
    , borderBottom: str $ i "1px solid " colour.background20
    , padding: _0
    }

button ∷ { isFirst ∷ Boolean, isLast ∷ Boolean } -> Style
button { isFirst, isLast } =
  css
    { background: color transparent
    , appearance: none
    , color: str colour.text
    , border: none
    , margin: _0
    , padding: _0
    , fontSize: str "var(--s0)"
    , boxSizing: borderBox
    , zIndex: str "3"
    , "&:active": nest { outline: str "0" } -- ensures no outline on click in Chrome
    , "&:focus": nest { outline: none }
    , "&:focus > .ry-segmented-button__content":
      nest
        { boxShadow: str $ i "0px 0px 0px var(--s-4) " colour.highlight
        }
    }

buttonContent ∷ { isFirst ∷ Boolean, isLast ∷ Boolean } -> Style
buttonContent { isFirst, isLast } =
  css
    { "&:active": nest { outline: str "0" } -- ensures no outline on click in Chrome
    , "&:focus": nest { outline: none }
    , display: inlineBlock
    , padding: str "var(--s-4)"
    , paddingLeft: str if isFirst then "var(--s0)" else "calc(var(--s0)*0.9)"
    , paddingRight: str if isLast then "var(--s0)" else "calc(var(--s0)*0.9)"
    , borderRadius: str "8px"
    , margin: _0
    }

wrapper ∷ Style
wrapper =
  css
    { display: flex
    , alignItems: center
    , justifyContent: center
    }
