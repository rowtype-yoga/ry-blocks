module Yoga.Block.Atom.Tooltip.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  , backgroundColour ∷ f Color
  | r
  )

backgroundColour ∷ String
backgroundColour = colour.text

arrow ∷ ∀ r. { | Props OptionalProp r } -> Style
arrow props =
  css
    { position: str "absolute"
    , width: str "12px"
    , height: str "12px"
    , zIndex: str "0"
    , "&::before":
      nest
        { position: str "absolute"
        , width: str "12px"
        , height: str "12px"
        , borderRadius: str "2px"
        , content: str "''"
        , transform: str "rotate(45deg)"
        , background: str $ (cssStringRGBA <$> props.backgroundColour) ?|| backgroundColour
        }
    }

content ∷ ∀ r. { | Props OptionalProp r } -> Style
content props =
  css
    { background: str $ (cssStringRGBA <$> props.backgroundColour) ?|| backgroundColour
    , minWidth: str "50px"
    , padding: str "6px"
    , zIndex: str "-1"
    , color: str colour.background
    , boxShadow: str "0 1px 8px rgba(0,0,0,0.33)"
    , borderRadius: var "--s-2"
    }

popper ∷ Style
popper =
  css
    { "&[data-popper-placement^='top'] > * > .popper-arrow":
      nest { bottom: str "-4px" }
    , "&[data-popper-placement^='bottom'] > * >  .popper-arrow":
      nest { top: str "-4px" }
    , "&[data-popper-placement^='left'] > * >  .popper-arrow":
      nest { right: str "-4px" }
    , "&[data-popper-placement^='right'] > * > .popper-arrow":
      nest { left: str "-4px" }
    }
