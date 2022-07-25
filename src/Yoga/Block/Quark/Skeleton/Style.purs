module Yoga.Block.Quark.Skeleton.Style where

import Yoga.Prelude.Style

import Fahrtwind (transform)
import Yoga.Block.Container.Style (col, colourWithAlpha)

skeletonBox ∷ Style
skeletonBox = inlineBlock <> overflowHidden <> css
  { height: em 1.0
  , position: relative
  , backgroundColor: str (colourWithAlpha.textPaler4 0.33)
  , "&::after": nest
      { position: absolute
      , top: int 0
      , right: int 0
      , bottom: int 0
      , left: int 0
      , transform: str "translateX(-100%)"
      , backgroundImage: str
          """linear-gradient(
            90deg,
            rgba(250,245,255, 0) 0,
            rgba(250,245,255, calc(0.1 * var(--light-mode) + 0.03 * var(--dark-mode))) 20%,
            rgba(250,245,255, calc(0.2 * var(--light-mode) + 0.07 * var(--dark-mode))) 60%,
            rgba(250,245,255, 0)
            )
          """
      , animation: str "shimmer 2s infinite"
      , content: str "''"
      , animationName:
          keyframes
            { "100%": transform "translateX(100%)"
            }
      }

  }