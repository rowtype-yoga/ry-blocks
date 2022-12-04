module Yoga.Block.Atom.Checkbox.Style where

import Yoga.Prelude.Style

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , size ∷ f Number
  , stroke ∷ f String
  , strokeWidth ∷ f Number
  | r
  )

checkmark ∷ Style
checkmark =
  block
    <> widthFull
    <> heightFull
    <> css
      { path: nested $ css
          { transformOrigin: str "50% 50%"
          , strokeDasharray: int 48
          , strokeDashoffset: int 48
          , strokeWidth: int 4
          , fill: none
          , stroke: str "currentColor"
          }
      }

checkmarkChecked ∷ Style
checkmarkChecked =
  block
    <> widthFull
    <> heightFull
    <> css
      { path: nested $ css
          { transformOrigin: str "50% 50%"
          , strokeDasharray: int 48
          , strokeDashoffset: int 48
          , fill: none
          , stroke: str "currentColor"
          , strokeWidth: int 4
          , animation: str
              "checkmarkAnimation 0s cubic-bezier(0.35, 0, 0.45, 1) forwards"
          , animationName: keyframes
              { to: css { strokeDashoffset: int 0 } }

          }
      }

checkmarkCheckedAnimated ∷ Style
checkmarkCheckedAnimated = css
  { animation: str
      "checkmarkAnimation .25s cubic-bezier(0.35, 0, 0.45, 1) forwards"
  , animationName: keyframes
      { to: css { strokeDashoffset: int 0 } }
  , animationDelay: str "125ms"
  }

checkmarkContainer ∷ Style
checkmarkContainer =
  background' col.highlight
    <> textCol' col.highlightText
    <> positionAbsolute
    <> boxSizingContentBox
    <> boxSizingBorderBox
    <> top (-checkboxBorder)
    <> left (-checkboxBorder)
    <> width' sizeStyle.l
    <> height' sizeStyle.l
    <> transition "clip-path 0.3s ease"
    <> roundness
    <> ignoreClicks

checkmarkContainerChecked ∷ Style
checkmarkContainerChecked =
  css { clipPath: str "circle(100%)" }

checkmarkContainerNotChecked ∷ Style
checkmarkContainerNotChecked =
  css { clipPath: str "circle(0%)" }

checkboxBorder ∷ Int
checkboxBorder = 2

roundness ∷ Style
roundness =
  roundedDefault

container ∷ Style
container =
  width' sizeStyle.l
    <> height' sizeStyle.l
    <> positionRelative
    <> background' (str colour.inputBackground)
    <> boxSizingBorderBox
    <> overflowVisible
    <> border checkboxBorder
    <> borderSolid
    <> borderCol' (str colour.inputBorder)
    <> roundness
    <> shadowSm
    <> overflowVisible
    <> focusWithin
      ( afterElement
          ( content "''"
              <> roundness
              <> css
                { boxShadow:
                    str $ "0px 1px 12px 7px " <>
                      colourWithDarkLightAlpha.highlight
                        { darkAlpha: 0.8, lightAlpha: 0.4 }
                }
              <> border 1
              <> borderCol' (str $ colourWithAlpha.highlight 0.1)
              <> background' (str $ colourWithAlpha.highlight 0.1)
              <> ignoreClicks
              <> positionAbsolute
              <> widthFull
              <> heightFull
              <> top 0
              <> left 0
              <> overflowVisible
          )
      )

checkbox ∷ Style
checkbox = (css { appearance: none })
  <> widthFull
  <> heightFull
  <> focus (outlineNone)

