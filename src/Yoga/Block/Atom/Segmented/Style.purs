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
    , userSelect: none
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
        , borderRadius: var "--s-1"
        , border: str $ i "1px solid " colour.background15
        , borderBottom: str $ i "1px solid " colour.background20
        , padding: _0
        , overflow: scroll
        , userSelect: none
        }

activeElement ∷ Style
activeElement =
  css
    { position: absolute
    , borderRadius: str "calc(var(--s-1) * 0.75)"
    , background: str colour.interfaceBackground
    , borderTop: str $ i "1px solid " colour.interfaceBackgroundHighlight
    , borderBottom: str $ i "1px solid " colour.interfaceBackgroundShadow
    , boxShadow: str "0 1px 2px rgba(20,20,20,0.67)"
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
    , padding: _0
    , fontSize: str "var(--s0)"
    , marginLeft: str if isFirst then "1px" else "0"
    , marginRight: str if isLast then "1px" else "0"
    , boxSizing: borderBox
    , zIndex: str "3"
    , minWidth: var "--s3"
    , "&:active": nest { outline: str "0" }
    , "&:focus": nest { outline: none }
    , "&:focus > .ry-segmented-button__content":
      nest
        { borderColor: str colour.highlight
        , transition: str "all 0.083s ease 0.083s"
        }
    , userSelect: none
    }

buttonContent ∷ { isFirst ∷ Boolean, isLast ∷ Boolean } -> Style
buttonContent { isFirst, isLast } =
  css
    { "&:active": nest { outline: str "0" }
    , "&:focus": nest { outline: none }
    , paddingTop: str "1px"
    , paddingBottom: str "1px"
    , paddingLeft: str if isFirst then edgePadding else inBetweenPadding
    , paddingRight: str if isLast then edgePadding else inBetweenPadding
    , borderRadius: str "calc(var(--s-1) * 0.75)"
    , border: str $ i borderSize " solid transparent"
    , display: flex
    , alignItems: center
    , outlineRight: str "1px solid red"
    , justifyContent: center
    , overflow: visible
    , userSelect: none
    }
  where
    borderSize = "var(--s-4)"

    edgePadding = i "calc(var(--s0) - " borderSize ")"

    inBetweenPadding = i "calc(var(--s0)*0.9 - " borderSize ")"
