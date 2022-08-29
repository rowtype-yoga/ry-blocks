module Yoga.Block.Molecule.Sheet.Style where

import Yoga.Prelude.Style

import Fahrtwind (maxHeight', overflowYScroll, pX', pY')
import Fahrtwind.Style.ScrollBar (scrollBar')
import Yoga.Block.Container.Style (col, colour)

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

sheet ∷ Style
sheet = styles
  where
  styles =
    css
      { zIndex: str "3"
      , position: fixed
      , left: str "0"
      , pointerEvents: auto
      , width: str "100vw"
      , background: str colour.backgroundLayer4
      , borderRadius: str $ "var(--s1) var(--s1) 0 0"
      , borderTop: str $ "1px solid " <> colour.backgroundLayer5
      , boxShadow: str $ "0 0 var(--s3) rgba(0,0,0,0.1)"
      , height: str "100vh"
      }

sheetContent ∷ Style
sheetContent = styles
  where
  styles =
    pX' (var "--s0") <> pY' (var "--s1")
      <> css
        { maxHeight: str "calc(100vh - var(--s3))"
        }
      <> maxHeight' (vh 90.0)

sheetBody :: Style
sheetBody =
  maxHeight' (vh 67.7)
    <> overflowYScroll
    <> scrollBar'
      { background: col.backgroundLayer4
      , col: col.textPaler3
      , width: str "calc(var(--s0) * 0.75)"
      , borderRadius: str "var(--s-1)"
      , borderWidth: str "var(--s-3)"
      }

clickaway ∷ Style
clickaway =
  css
    { width: 100.0 # vw
    , height: 100.0 # vh
    , position: fixed
    , left: _0
    , top: _0
    , pointerEvents: auto
    , backdropFilter: str "blur(4px) brightness(80%)"
    , zIndex: str "3"
    }
