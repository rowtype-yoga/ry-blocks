module Yoga.Block.Quark.Drip.Style where

import Yoga.Prelude.Style

import Fahrtwind (positionAbsolute, transform)
import Fahrtwind as F

expandAnimation ∷ StyleProperty
expandAnimation = keyframes
  { "0%": F.opacity 0 <> transform "scale(0.25)"
  , "30%": F.opacity 100
  , "80%": F.opacity 50
  , "100%": transform "scale(28)" <> F.opacity 0
  }

drip ∷ Style
drip =
  positionAbsolute
    <> F.left 0
    <> F.right 0
    <> F.top 0
    <> F.bottom 0
    <> css
      { "& svg": nested
          $ positionAbsolute
          <> css
            { animation: str "350ms linear x"
            , animationName: expandAnimation
            , animationFillMode: str "forwards"
            , width: var "--s-1"
            , height: var "--s-1"
            }
      }