module Yoga.Block.Atom.Input.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

type Props f r
  = ( css ∷ f Style
    | r
    )

leftIconSize ∷ StyleProperty
leftIconSize = var "--left-icon-size"

rightIconSize ∷ StyleProperty
rightIconSize = var "--right-icon-size"

gapSize ∷ String
gapSize = "var(--s-3)"

iconContainer ∷ Style
iconContainer =
  css
    { display: inlineFlex
    , alignItems: center
    -- , padding: str "0px 10px"
    -- , background: str $ colour.interfaceBackground
    -- , borderLeft: str $ "1px solid " <> colour.interfaceBackgroundShadow
    }

labelAndInputWrapper ∷ Style
labelAndInputWrapper =
  css
    { position: relative
    , display: inlineBlock
    , "--left-icon-size": var "--s0"
    , "--right-icon-size": str "calc(var(--s0) * 1.2)"
    , "--input-border-radius": var "--s-1"
    , "--input-side-padding": var "--s-1"
    }

labelContainer ∷ Style
labelContainer =
  css
    { position: absolute
    , top: _0
    , left: _0
    , display: inlineBlock
    , zIndex: str "2"
    , pointerEvents: none
    }

labelSmall ∷ Style
labelSmall =
  css
    { fontSize: var "--s-1"
    , marginTop: str "calc(var(--s-3) * -1)"
    , marginLeft: var "--s-2"
    , """&[data-required="true"] > span:after""":
      nest
        { content: str "'＊'"
        }
    , "& > span":
      nest
        { fontWeight: str "500"
        , background: str colour.inputBackground
        , color: str colour.text
        , borderRadius: var "--s-4"
        , paddingLeft: var "--s-4"
        , paddingRight: var "--s-4"
        , paddingTop: var "--s-5"
        , paddingBottom: var "--s-5"
        }
    , """&[data-invalid="true"] > span""":
      nest
        { background: str colour.invalid
        , color: str colour.invalidText
        }
    , """&[data-has-focus="true"] > span""":
      nest
        { background: str colour.highlight
        , color: str colour.highlightText
        }
    }

labelLarge ∷ { leftIconWidth ∷ Maybe Number } -> Style
labelLarge { leftIconWidth } =
  css
    { fontSize: str "calc(var(--s0) * 0.85)"
    , padding: _0
    , marginTop: str "calc(var(--s-1) + var(--s-5))"
    , marginBottom: str "calc(var(--s-1) + var(--s-5))"
    , marginLeft:
      case leftIconWidth of
        Nothing -> var "--input-side-padding"
        Just size -> str $ i "calc(var(--input-side-padding) + " gapSize " + " size "px)"
    , marginRight: str "var(--input-side-padding)"
    , color: str colour.placeholderText
    , fontWeight: str "400"
    , whiteSpace: nowrap -- force on one line
    , """&[data-required="true"]:after""":
      nest
        { content: str "'*'"
        , color: str colour.required
        , fontFamily: str "Helvetica, Arial, Inter, sans-serif"
        , fontSize: str "calc(var(--s0))"
        }
    }

rightIconContainer ∷ Style
rightIconContainer =
  iconContainer
    <> css
        { display: inlineFlex
        , alignItems: center
        , justifyContent: center
        , "& > *":
          nest
            { display: inlineFlex
            , alignItems: center
            , justifyContent: center
            }
        , ".ry-icon":
          nest
            { "--stroke-colour": str colour.highlight
            }
        }

leftIconContainer ∷ Style
leftIconContainer =
  iconContainer
    <> css
        { borderRadius: str "var(--input-border-radius) 0 0 var(--input-border-radius)"
        , ".ry-icon":
          nest
            { "--stroke-colour": str colour.text
            }
        }

inputWrapper ∷ ∀ r. { | Props OptionalProp r } -> Style
inputWrapper props =
  css
    { position: relative
    , boxSizing: borderBox
    , backgroundColor: str colour.inputBackground
    , display: inlineFlex
    , "--left-icon-size": var "--s0"
    , "--right-icon-size": str "calc(var(--s0) * 1.2)"
    , "--input-border-radius": var "--s-1"
    , "--input-side-padding": var "--s-1"
    , "--input-top-padding": var "--s-5"
    , "--input-bottom-padding": var "--s-5"
    , alignItems: center
    , justifyContent: flexStart
    , paddingLeft: str "calc(var(--input-side-padding) - var(--border-width))"
    , paddingRight: str "calc(var(--input-side-padding) - var(--border-width))"
    , paddingTop: str "calc(var(--input-top-padding) - var(--border-width))"
    , paddingBottom: str "calc(var(--input-bottom-padding) - var(--border-width))"
    , gap: str "calc(var(--input-side-padding) / 2)"
    , "--border-width": str "1px"
    , border: str $ "var(--border-width) solid " <> colour.inputBorder
    , borderRadius: var "--input-border-radius"
    , """&[data-invalid="false"]""":
      nest
        { borderColor: str colour.success
        }
    , """&[data-invalid="true"]""":
      nest
        { borderColor: str colour.invalid
        }
    , "&:focus-within":
      nest
        { "--border-width": str "var(--s-5)"
        , borderColor: str colour.highlight
        }
    }

input ∷ ∀ r. { | Props OptionalProp r } -> Style
input props =
  css
    { "&[type=text],&[type=search],&[type=password],&[type=number],&:not([type])":
      nest
        { color: str colour.text
        , width: _100percent
        , flex: str "1"
        , "--padding-top": var "--s-1"
        , "--padding-bottom": var "--s-1"
        , "&[aria-labelledby]":
          nest
            { paddingTop: str "calc(var(--padding-top) + (var(--s-5)/2))"
            , paddingBottom: str "calc(var(--padding-bottom) - (var(--s-5)/2))"
            }
        , background: str "transparent"
        , margin: _0
        , paddingTop: var "--padding-top"
        , paddingBottom: var "--padding-bottom"
        , paddingLeft: _0
        , paddingRight: _0
        , fontSize: str "calc(var(--s0) * 0.85)"
        , gap: str gapSize
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
