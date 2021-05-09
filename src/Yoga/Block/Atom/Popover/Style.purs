module Yoga.Block.Atom.Popover.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour, size)

type Props f r =
  ( css ∷ f Style
  | r
  )

content ∷ Style
content =
  css
    { zIndex: str "-1"
    }

popper ∷ OptionalProp String -> Style
popper background =
  css
    { "&[data-popper-placement^='top'] > #arrow":
      nest
        { bottom: px (arrowSize / -2)
        , "&::before, &::after":
          nest
            { borderTopColor: str "transparent"
            , borderLeftColor: str "transparent"
            , clipPath: str $ i "polygon( " arrowSize "px " arrowSize "px, 0px " arrowSize "px, " arrowSize "px 0px)"
            }
        , "&::after": nest { bottom: px zero }
        , "&::before": nest { bottom: px (1) }
        }
    , "&[data-popper-placement^='bottom'] > #arrow":
      nest
        { top: px (arrowSize / -2)
        , "&::before, &::after":
          nest
            { borderBottomColor: str "transparent"
            , borderRightColor: str "transparent"
            , clipPath: str $ i "polygon(0px 0px, " arrowSize "px 0px, 0px " arrowSize "px)"
            }
        , "&::after": nest { top: px zero }
        , "&::before": nest { top: px (1) }
        }
    , "&[data-popper-placement^='left'] > #arrow":
      nest
        { right: px (arrowSize / -2)
        , "&::before, &::after":
          nest
            { borderBottomColor: str "transparent"
            , borderLeftColor: str "transparent"
            , clipPath: str $ i "polygon(0px 0px, " arrowSize "px 0px, " arrowSize "px " arrowSize "px)"
            }
        , "&::after": nest { right: px zero }
        , "&::before": nest { right: px (1) }
        }
    , "&[data-popper-placement^='right'] > #arrow":
      nest
        { left: px (arrowSize / -2)
        , "&::before, &::after":
          nest
            { borderTopColor: str "transparent"
            , borderRightColor: str "transparent"
            , clipPath: str $ i "polygon(" arrowSize "px " arrowSize "px, 0px " arrowSize "px, 0px 0px)"
            }
        , "&::after": nest { left: px zero }
        , "&::before": nest { left: px (1) }
        }
    , zIndex: str "6"
    , border: str $ "1px solid " <> colour.popperOuterBorder
    , boxSizing: contentBox
    , borderRadius: str size.s
    , position: relative
    , "&:before":
      nest
        { content: str "''"
        , position: absolute
        , border: str $ "1px solid " <> colour.popperInnerBorder
        , borderRadius: str $ "calc(" <> size.s <> " - 1px" <> ")"
        , boxShadow: str $ "var(--s-5) 0 var(--s-2) rgba(0,0,0,0.1)"
        , background: str colour.popperBackground
        , backdropFilter: str "blur(10px)"
        , zIndex: str "-1"
        , top: px 0
        , boxSizing: contentBox
        , left: px 0
        , right: px 0
        , bottom: px 0
        }
    }

arrow ∷ Style
arrow =
  common
    <> css
        { visibility: hidden
        , "&::before":
          nested
            $ common
            <> css
                { visibility: visible
                , content: str "''"
                , transform: str "rotate(45deg)"
                , border: str $ "1px solid " <> colour.popperInnerBorder
                , background: str colour.popperBackgroundNoAlpha
                }
        , "&::after":
          nested
            $ common
            <> css
                { visibility: visible
                , content: str "''"
                , transform: str "rotate(45deg)"
                , border: str $ "1px solid " <> colour.popperOuterBorder
                , zIndex: str "-1"
                }
        }
  where
  common =
    css
      { position: absolute
      , width: px arrowSize
      , height: px arrowSize
      , boxSizing: borderBox
      }

arrowSize = 14
