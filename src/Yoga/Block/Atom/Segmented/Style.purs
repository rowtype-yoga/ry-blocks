module Yoga.Block.Atom.Segmented.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  | r
  )

cluster ∷ Style
cluster =
  css
    { overflow: auto
    , flex: str "1"
    , display: str "inline-flex"
    }

segmented ∷ Style
segmented = styles
  where
    styles =
      css
        { borderWidth: _0
        , margin: _0
        , width: auto
        , display: flex
        , flex: str "1"
        , minHeight: str "min-content"
        , background: str colour.background10
        , boxShadow: str "inset 0 1 0 rgba(0,0,0,0.1)"
        , borderRadius: str "10px"
        , border: str $ i "1px solid " colour.background15
        , borderBottom: str $ i "1px solid " colour.background20
        , padding: _0
        , overflow: scroll
        }

activeElement ∷ Style
activeElement =
  css
    { position: absolute
    , borderRadius: str "8px"
    , background: str colour.interfaceBackground
    , border: str $ i "1px solid " colour.interfaceBackgroundShadow
    , borderTop: str $ i "1px solid " colour.interfaceBackgroundHighlight
    , borderBottom: str $ i "1px solid " colour.interfaceBackgroundShadow
    , boxShadow: str "0 0 1px rgba(0,0,0,0.55)"
    , margin: _0
    , padding: _0
    , zIndex: str "3"
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
    , "&:active": nest { outline: str "0" }
    , "&:focus": nest { outline: none }
    , "&:focus > .ry-segmented-button__content":
      nest
        { borderColor: str colour.highlight
        }
    }

buttonContent ∷ { isFirst ∷ Boolean, isLast ∷ Boolean } -> Style
buttonContent { isFirst, isLast } =
  css
    { "&:active": nest { outline: str "0" }
    , "&:focus": nest { outline: none }
    , paddingLeft: str if isFirst then edgePadding else inBetweenPadding
    , paddingRight: str if isLast then edgePadding else inBetweenPadding
    , borderRadius: str "8px"
    , border: str $ i borderSize " solid transparent"
    , display: flex
    , alignItems: center
    , justifyContent: center
    , margin: _0
    , minHeight: _100percent
    , overflow: visible
    }
  where
    borderSize = "var(--s-4)"

    edgePadding = i "calc(var(--s0) - " borderSize ")"

    inBetweenPadding = i "calc(var(--s0)*0.9 - " borderSize ")"
