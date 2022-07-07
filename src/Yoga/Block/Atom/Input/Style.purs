module Yoga.Block.Atom.Input.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

data SizeVariant = SizeMedium | SizeSmall

sizeVariantToFactor ∷ SizeVariant → String
sizeVariantToFactor = case _ of
  SizeMedium -> "1"
  SizeSmall -> "0.85"

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , sizeVariant :: f SizeVariant
  , background ∷ f String
  , textColour ∷ f String
  , placeholderColour ∷ f String
  , borderColour ∷ f String
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
    -- , display: inlineBlock
    , "--left-icon-size": str "calc(var(--s0) * var(--input-size-factor))"
    , "--right-icon-size": str "calc(var(--s0) * var(--input-size-factor)) * 1.2)"
    , "--input-border-radius": str "calc(var(--s-1) * var(--input-size-factor) * var(--input-size-factor))"
    , "--input-side-padding": var "--s-1"
    , width: inherit
    , margin: _0
    }

labelContainer ∷ Style
labelContainer =
  css
    { position: absolute
    , overflow: visible
    , left: _0
    , top: _0
    , display: inlineBlock
    , zIndex: str "2"
    , pointerEvents: none
    }

labelSmall ∷ String -> String -> Style
labelSmall background textColour =
  css
    { fontSize: var "--s-1"
    , marginTop: str "calc(var(--s-2) * var(--input-size-factor) * -1)"
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
          , background: str $ i "linear-gradient(" background " 61%, transparent 61%, transparent)"
          , color: str textColour
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
          { background: labelSmallFocusBackground
          , color: str colour.highlightText
          }
    }

labelSmallFocusBackground ∷ StyleProperty
labelSmallFocusBackground =
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

labelLarge ∷ { left ∷ Number, width ∷ Number } -> Style
labelLarge { left, width } =
  css
    { fontSize: str "calc(var(--input-size-factor) * 16px)"
    , padding: _0
    , whiteSpace: nowrap -- force on one line
    -- , height: str "calc(var(--s0) * 1.2)"
    , letterSpacing: em (-0.011)
    , maxWidth: str $ i "calc(" width "px - 2ch)"
    , marginTop: str "calc(var(--s-1) * var(--input-size-factor))"
    , marginLeft: str $ i left "px"
    , marginRight: var "--input-side-padding"
    , color: str colour.textPaler2
    , fontWeight: str "400"
    , overflowX: str "hidden"
    , textOverflow: str "ellipsis"
    , overflowY: visible
    , scrollbarWidth: none
    , "&::-webkit-scrollbar": nested $ css
        { display: none }
    -- , fontWeight: str "600"
    , """&[data-required="true"]:after""":
        nest
          { content: str "'*'"
          , color: str colour.required
          , fontFamily: str "Helvetica, Arial, Inter, sans-serif"
          , lineHeight: str "calc(var(--s0) * 0.85 * var(--input-size-factor))"
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
            { "--stroke-colour": str colour.text
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
      { "--left-icon-size": var "--s0"
      , "--right-icon-size": str "calc(var(--s0) * 1.2)"
      , "--input-side-padding": str "calc(var(--s-1) * var(--input-size-factor) * 1.2)"
      , "--input-top-padding": str "calc(var(--s-5) * var(--input-size-factor))"
      , "--input-bottom-padding": str "calc(var(--s-5) * var(--input-size-factor))"
      , "--input-size-factor": str ((props.sizeVariant ?|| SizeMedium) # sizeVariantToFactor)
      , letterSpacing: em (-0.011)
      , position: relative
      , cursor: str "text"
      , boxSizing: borderBox
      , "--base-height": str "calc(42px * var(--input-size-factor))"
      , height: str "var(--base-height)"
      , display: flex
      , """&[data-invalid="false"]""":
          nest
            { borderColor: str colour.success
            , marginTop: str "-1px"
            , marginBottom: str "-1px"
            , "--border-width": str "2px"
            }
      , """&[data-invalid="true"]""":
          nest
            { borderColor: str colour.invalid
            -- , marginTop: str "-1px"
            -- , marginBottom: str "-1px"
            -- , marginLeft: str "-1px"
            , "--border-width": str "2px"
            }
      , "&:focus-within":
          nest
            { "--border-width": str "2px"
            , borderColor: str colour.highlight
            -- , boxSizing: borderBox
            }
      , alignItems: center
      , justifyContent: center
      , border: str $ "var(--border-width) solid " <> colour.inputBorder
      , paddingLeft: str "calc((var(--input-side-padding) - var(--border-width)) * var(--input-size-factor))"
      , paddingRight: str "calc((var(--input-side-padding) - var(--border-width)) * var(--input-size-factor))"
      , paddingTop: str "calc((var(--input-top-padding) - var(--border-width)) * var(--input-size-factor))"
      , paddingBottom: str "calc((var(--input-bottom-padding)) - var(--border-width))"
      , gap: str "calc(var(--input-side-padding) / 2)"
      , borderRadius: var "--input-border-radius"
      , overflow: visible
      }

ploppedFocusWithin ∷ Style
ploppedFocusWithin = css
  { "&:focus-within":
      nest
        { transition: str "border-color 0.18s ease-out"
        }

  }

containerBackground ∷ ∀ r. { | Props OptionalProp r } -> Style
containerBackground props = css
  { background: str (props.background ?|| colour.inputBackground)
  -- , boxShadow: str
  --     """
  --           0 1px 1px rgba(200,200,255,0.2),
  --           0 2px 2px rgba(200,200,255,0.1),
  --           0 4px 8px rgba(200,200,255,0.03)"""
  , border: str $ "var(--border-width) solid " <> colour.inputBorder
  , borderRadius: var "--input-border-radius"

  }

containerContainer ∷ ∀ r. { | Props OptionalProp r } -> Style
containerContainer props = css
  { "& > *": nested $ css
      { gridColumn: int 1
      , gridRow: int 1
      }
  , "--border-width": str "1px"
  , "--input-size-factor": str ((props.sizeVariant ?|| SizeMedium) # sizeVariantToFactor)
  , "--input-border-radius": case props.sizeVariant ?|| SizeMedium of
      SizeMedium -> str "var(--s-1)"
      SizeSmall -> str "var(--s-2)"
  , borderRadius: var "--input-border-radius"
  , boxSizing: contentBox
  , display: grid
  , overflow: visible
  }

inputWrapper ∷ Style
inputWrapper =
  css
    { margin: _0
    , minWidth: _0
    , padding: _0
    , flex: str "1"
    , width: inherit
    }

input ∷ ∀ r. { | Props OptionalProp r } -> Style
input props =
  css
    { "--input-size-factor": str ((props.sizeVariant ?|| SizeMedium) # sizeVariantToFactor)
    , "&[type=text],&[type=search],&[type=password],&[type=number],&:not([type])":
        nest
          { background: str "transparent"
          , touchAction: manipulation
          , color: str (props.textColour ?|| colour.text)
          , width: _100percent
          , minWidth: _0
          , margin: _0
          , overflowY: visible
          , "--padding-top": str "calc(var(--s-1) * var(--input-size-factor))"
          , "--padding-bottom": str "calc(var(--s-1) * var(--input-size-factor))"
          , paddingTop: var "--padding-top"
          , paddingBottom: var "--padding-bottom"
          , paddingLeft: _0
          , paddingRight: _0
          , fontSize: str "calc(var(--input-size-factor) * 16px)"
          , "&::placeholder":
              nest
                { color: str (props.placeholderColour ?|| colour.placeholderText)
                }
          , "&[aria-labelledby]":
              nest
                { paddingTop: str "calc(var(--padding-top) + (var(--s-5)/2))"
                , paddingBottom: str "calc(var(--padding-bottom) - (var(--s-5)/2))"
                }
          , border: none
          }
    , "&[type=search]":
        nest
          { "&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration":
              nest
                { "WebkitAppearance": none
                }
          }
    , "&:focus":
        nest
          { outline: none
          }
    }

plopAnimation ∷ StyleProperty
plopAnimation =
  keyframes
    $
      { "from": css { transform: str "scale3d(1.003,1.02,1)" }
      , "67.7%": css { transform: str "scale3d(0.997,0.98,1)" }
      , "86.7%": css { transform: str "scale3d(1.001,1.01,1)" }
      , "to": css { transform: str "scale3d(1,1,1)" }
      }
