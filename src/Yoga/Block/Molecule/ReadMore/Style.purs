module Yoga.Block.Molecule.ReadMore.Style where

import Yoga.Prelude.Style

import Yoga.Block.Container.Style (colour, withAlpha)

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

container ∷ Style
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

fadeBlock ∷ OptionalProp Color → Style
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
          $ "linear-gradient(90deg, "
          <> bgTransparent
          <> "  0%, "
          <> bg
          <> " 90%, "
          <> bg
          <> " 100%)"
      , zIndex: str $ "2"
      }
  }
  where
  bg = (cssStringRGBA <$> background) ?|| colour.background
  bgTransparent = ((withAlpha 0.0 >>> cssStringRGBA) <$> background) ?||
    colour.backgroundAlpha0

expandedText ∷ Style
expandedText = styles
  where
  styles =
    css
      {}

label ∷ Style
label = styles
  where
  styles =
    inlineBlock <>
      css
        { whiteSpace: nowrap
        , float: str "right"
        }
