module Yoga.Block.Atom.Input.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)
import Yoga.Prelude.Style as Color

type Props f r =
  ( css ∷ f Style
  | r
  )

leftIconSize ∷ StyleProperty
leftIconSize = var "--left-icon-size"

rightIconSize ∷ StyleProperty
rightIconSize = var "--right-icon-size"

leftIconStyle ∷ Style
leftIconStyle =
  css
    { "--stroke-colour": str colour.interfaceTextDisabled
    , marginTop: str "4px"
    , marginLeft: str "-4px"
    }

rightIconStyle ∷ Style
rightIconStyle =
  css
    { "--stroke-colour": str colour.interfaceTextDisabled
    , paddingTop: str "6px"
    , marginRight: str "6px"
    }

textWrapper ∷ ∀ r. { | Props OptionalProp r } -> Style
textWrapper props =
  css
    { fontFamily: var "--main-font"
    , boxSizing: borderBox
    , backgroundColor: str $ colour.background07
    , display: inlineFlex
    , "--left-icon-size": var "--s0"
    , "--right-icon-size": str "calc(var(--s0) * 1.2)"
    , alignItems: center
    , justifyContent: flexStart
    , paddingLeft: var "--s-1"
    , gap: var "--s-3"
    , "--border-width": var "--s-5"
    , border: str $ "var(--border-width) solid " <> colour.inputBorder
    , borderRadius: var "--s-1"
    , "&:focus-within":
      nest
        {}
    }

input ∷ ∀ r. { | Props OptionalProp r } -> Style
input props =
  css
    { "&[type=text],&[type=search],&[type=password],&[type=number],&:not([type])":
      nest
        { color: str colour.text
        , background: str "transparent"
        , alignSelf: stretch
        , "--padding-top": str "var(--s-1)"
        , "--padding-bottom": str "calc(var(--padding-top) * 0.85)"
        , paddingTop: var "--padding-top"
        , paddingBottom: var "--padding-bottom"
        , paddingLeft: _0
        , paddingRight: _0
        -- , background: str colour.inputBackground
        , border: none
        }
    , "&[type=search]":
      nest
        { "&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-serch-results-button, &::-webkit-search-results-decoration":
          nest
            { "WebkitAppearance": none
            }
        }
    , "&:focus":
      nest
        { outline: none
        }
    , "&[type=button], &[type=submit]":
      nest
        { background: str colour.highlight
        , color: str "white"
        , boxShadow: str "0 1px 4px rgba(0,0,0,0.5)"
        , borderColour: str colour.highlight
        , height: str "auto"
        }
    }
