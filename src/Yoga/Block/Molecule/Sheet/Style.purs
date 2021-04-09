module Yoga.Block.Molecule.Sheet.Style where

import Yoga.Prelude.Style

import Yoga.Block.Container.Style (colour)

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
      , width: str "100vw"
      , background: str colour.backgroundLayer3
      , borderRadius: str $ "var(--s1) var(--s1) 0 0" 
      , borderTop: str $ "1px solid " <>  colour.backgroundLayer5
      , boxShadow: str $ "0 0 var(--s3) rgba(0,0,0,0.1)"
      , height: str "100vh"
      }

sheetContent ∷ Style
sheetContent = styles
  where
  styles =
    css
      { padding: str "var(--s1) var(--s0)" 
      , maxHeight: str "calc(100vh - var(--s3))"
      , overflow: scroll
      }

clickaway ∷ Style
clickaway =
  css
    { width: 100.0 # vw
    , height: 100.0 # vh
    , position: fixed
    , left: _0
    , top: _0
    , backdropFilter: str "blur(4px) brightness(80%)"
    , zIndex: str "3"
    }
