module Yoga.Block.Atom.Segmented.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

cluster ∷ Style
cluster =
  css
    { overflow: str "visible"
    , display: str "inline-flex"
    , userSelect: none
    , padding: _0
    , margin: _0
    }

segmented ∷ Style
segmented = styles
  where
  styles =
    flex <>
      css
        { borderWidth: _0
        , margin: _0
        , width: auto
        , boxSizing: borderBox
        , flex: str "1"
        , minHeight: str "min-content"
        , background: str colour.backgroundLayer2
        , boxShadow: str "inset 0 1 0 rgba(0,0,0,0.1)"
        , borderRadius: str "calc(var(--s-1) * 0.8)"
        , border: str $ i "1px solid " colour.backgroundLayer1
        , borderBottom: str $ i "1px solid " colour.backgroundLayer1
        , padding: _0
        , overflow: str "visible"
        , userSelect: none
        }

activeElementWrapper ∷ Style
activeElementWrapper =
  positionRelative <> boxSizingBorderBox <> width 0
    <> pXY 0
    <> mXY 0
    <> css { overflow: str "visible" }

activeElement ∷ Style
activeElement =
  block <>
    css
      { position: absolute
      , boxSizing: borderBox
      , borderRadius: str "calc(var(--s-1) * 0.8)"
      , background: str colour.backgroundLayer4
      , borderTop: str $ i "1px solid " colour.backgroundLayer5
      , borderBottom: str $ i "1px solid " colour.backgroundLayer3
      , boxShadow: str "0 1px 2px rgba(20,20,20,0.67)"
      , padding: _0
      , margin: _0
      , zIndex: str "3"
      }

button ∷ { isFirst ∷ Boolean, isLast ∷ Boolean } -> Style
button _ =
  css
    { background: color transparent
    , appearance: none
    , color: str colour.text
    , overflow: str "visible"
    , border: none
    , padding: _0
    , fontSize: str "var(--s0)"
    , margin: _0
    , boxSizing: borderBox
    , zIndex: str "3"
    , minWidth: var "--s2"
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
  flex <>
    css
      { "&:active": nest { outline: str "0" }
      , "&:focus": nest { outline: none }
      , margin: _0
      , paddingTop: str "var(--s-5)"
      , paddingBottom: str "var(--s-4)"
      , paddingLeft: str if isFirst then edgePadding else inBetweenPadding
      , paddingRight: str if isLast then edgePadding else inBetweenPadding
      , borderRadius: str "calc(var(--s-1) * 0.75)"
      , border: str $ i borderSize " solid transparent"
      , alignItems: center
      , justifyContent: center
      , overflow: str "visible"
      , userSelect: none
      }
  where
  borderSize = "var(--s-4)"

  edgePadding = i "calc(var(--s0) - " borderSize ")"

  inBetweenPadding = i "calc(var(--s0)*0.9 - " borderSize ")"
