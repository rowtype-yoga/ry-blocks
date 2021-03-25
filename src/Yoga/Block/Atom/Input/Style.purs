module Yoga.Block.Atom.Input.Style where

import Yoga.Prelude.Style

import Data.Interpolate (i)
import Debug (spy)
import Yoga.Block.Container.Style (colour)

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , background ∷ f StyleProperty
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
    , overflow: visible
    , top: _0
    , left: _0
    , display: inlineBlock
    , zIndex: str "2"
    , pointerEvents: none
    }

labelSmall ∷ StyleProperty -> Style
labelSmall background =
  css
    { fontSize: var "--s-1"
    , marginTop: str "calc(var(--s-3) * -1)"
    , marginLeft: var "--s-2"
    , userSelect: none
    , """&[data-required="true"] > span:after""":
      nest
        { content: str "'＊'"
        }
    , "& > span":
      nest
        { fontWeight: str "500"
        , whiteSpace: str "nowrap"
        , background
        , color: str colour.text
        , borderRadius: var "--s-4"
        , paddingLeft: var "--s-4"
        , paddingRight: var "--s-4"
        -- , paddingTop: str "calc(var(--s-5)*0.67)"
        , paddingBottom: var "--s-5"
        }
    , """&[data-invalid="true"] > span""":
      nest
        { background: str colour.invalid
        , color: str colour.invalidText
        }
    , """&[data-has-focus="true"] > span""":
      nest
        { background:
          str
            $ i "linear-gradient(225deg,"
                colour.highlightLighter
                ","
                colour.highlightDarker
                "), linear-gradient(225deg,"
                colour.highlightRotatedBackwards
                ","
                colour.highlightRotatedForwards
                ")"
        , color: str colour.highlightText
        }
    }

labelLarge ∷ { left ∷ Number, width ∷ Number } -> Style
labelLarge { left, width } =
  css
    { fontSize: str "calc(var(--s0) * 0.85)"
    , padding: _0
    , whiteSpace: nowrap -- force on one line
    , overflow: str "hidden"
    , height: str "calc(var(--s0) * 0.95)"
    , maxWidth: str $ i width "px"
    , textOverflow: str "ellipsis"
    , marginTop: str "calc(var(--s-1) + var(--s-5))"
    -- , marginBottom: str $ i "calc(" "var(--s-1)" "+" "var(--s-5)" " + " top "px" ")"
    , marginLeft: str $ i (spy "left" left) "px"
    , marginRight: var "--input-side-padding"
    , color: str colour.placeholderText
    , fontWeight: str "400"
    -- , fontWeight: str "600"
    , """&[data-required="true"]:after""":
      nest
        { content: str "'*'"
        , color: str colour.required
        , fontFamily: str "Helvetica, Arial, Inter, sans-serif"
        , fontSize: str "calc(var(--s0))"
        , lineHeight: str "calc(var(--s0) * 0.85)"
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

inputContainer ∷ ∀ r. { | Props OptionalProp r } -> Style
inputContainer props = theCss <>? props.css
  where
  theCss =
    css
      {  "--left-icon-size": var "--s0"
      , "--right-icon-size": str "calc(var(--s0) * 1.2)"
      , "--input-border-radius": var "--s-1"
      , "--input-side-padding": var "--s-1"
      , "--input-top-padding": var "--s-5"
      , "--input-bottom-padding": var "--s-5"
      , "--border-width": str "1px"
      , position: relative
      , boxSizing: borderBox
      , background: (props.background ?|| str colour.interfaceBackground)
      , display: flex
      , width: str "calc(var(--s4) * 2)"
      , """&[data-invalid="false"]""":
        nest
          { borderColor: str colour.success
          , "--border-width": str "2px"
          }
      , """&[data-invalid="true"]""":
        nest
          { borderColor: str colour.invalid
          , "--border-width": str "2px)"
          }
      , "&:focus-within":
        nest
          { "--border-width": str "2px"
          , borderColor: str colour.highlight
          , transition: str "border-color 0s linear 0.1s"
          }
      , alignItems: center
      , justifyContent: center
      , border: str $ "var(--border-width) solid " <> colour.inputBorder
      , paddingLeft: str "calc(var(--input-side-padding) - var(--border-width))"
      , paddingRight: str "calc(var(--input-side-padding) - var(--border-width))"
      , paddingTop: str "calc(var(--input-top-padding) - var(--border-width))"
      , paddingBottom: str "calc(var(--input-bottom-padding) - var(--border-width))"
      , height: str "calc(var(--s2) * 0.9)"
      , gap: str "calc(var(--input-side-padding) / 2)"
      , borderRadius: var "--input-border-radius"
      }

inputWrapper ∷ Style
inputWrapper =
  css
    { margin: _0
    , minWidth: _0
    , padding: _0
    , flex: str "1"
    }

input ∷ Style
input =
  css
    { "&[type=text],&[type=search],&[type=password],&[type=number],&:not([type])":
      nest
        { background: str "transparent"
        , color: str colour.text
        , width: _100percent
        , minWidth: _0
        , margin: _0
        , paddingTop: var "--padding-top"
        , paddingBottom: var "--padding-bottom"
        , paddingLeft: _0
        , paddingRight: _0
        , fontSize: str "calc(var(--s0) * 0.85)"
        , "--padding-top": var "--s-1"
        , "--padding-bottom": var "--s-1"
        , "&[aria-labelledby]":
          nest
            { paddingTop: str "calc(var(--padding-top) + (var(--s-5)/2))"
            , paddingBottom: str "calc(var(--padding-bottom) - (var(--s-5)/2))"
            }
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
    }
