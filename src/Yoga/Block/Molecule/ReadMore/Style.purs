module Yoga.Block.Molecule.ReadMore.Style where

import Yoga.Prelude.Style

import Yoga.Block.Container.Style (colour)

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

container :: Style
container = styles
  where
  styles =
    css
      { maxWidth: str "100%"
      }

contractedText ∷ Style
contractedText = styles
  where
  styles =
    css
      { overflowX: hidden
      , whiteSpace: nowrap
      , minWidth: _0
      }

fadeBlock :: OptionalProp String -> Style
fadeBlock background = css
  { zIndex: str $ "1"
  , position: relative
  , "&:after": nest 
    { position: absolute
    , content: str "''"
    , right: str "0"
    , width: str "calc(var(--s3))"
    , height: str "100%"
    , overflow: str "visible"
    , background: str 
       $ "linear-gradient(90deg, transparent 0%, " <> 
       (background ?|| colour.background) <> " 90%, " <> 
       (background ?|| colour.background) <> " 100%)"
    , zIndex: str $ "2"
    }
  }

expandedText ∷ Style
expandedText = styles
  where
  styles =
    css
      { }

label ∷ Style
label = styles
  where
  styles =
    css
      { whiteSpace: nowrap
      , display: inlineBlock
      , float: str "right"
      }
