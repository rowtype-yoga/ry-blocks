module Plumage.Atom.Input.Input.Style where

import Plumage.Prelude.Style

import React.Basic.Emotion (auto, px)
import Yoga.Block.Internal.CSS (transparent)

blockContainerStyle ∷ Style
blockContainerStyle =
  flexCol
    <> textCol gray._700
    <> focusWithin blockContainerFocusWithinStyle

blockContainerFocusWithinStyle ∷ Style
blockContainerFocusWithinStyle = css
  { "&>label": nested
      $ translate "0px" "4px"
      <> textCol violet._50
      <> background violet._500
  }

defaultLabelStyle ∷ Style
defaultLabelStyle =
  (textSized 0.8 1.2)
    <> trackingTight
    <> textTransformUppercase
    <> css { borderRadius: str "4px 4px 0 0" }
    <> pL 6
    <> pY 3
    <> transition "all 0.2s ease-in-out"
    <> fontMedium

smallLabelStyle ∷ Style
smallLabelStyle = defaultLabelStyle <> textSized 0.67 0.7

inputBackground ∷ Color
inputBackground = (coolGray._700 # rotateHue 30.0 # desaturate 0.1)

defaultInputStyle ∷ Style
defaultInputStyle =
  border 3
    <> textCol gray._800
    <> borderCol (gray._300 # withAlpha 0.5)
    <> transition "all 0.2s ease-in-out"
    <> roundedDefault
    <> textLg
    <> pY 6
    <> pX 8
    <> hover
      ( borderCol (gray._500 # withAlpha 0.5)
      )
    <> shadow "inset 0 1px 4px rgba(0,0,0,0.3)"
    <> focus
      defaultInputFocusStyle
    <> outlineNone
    <> placeholder (textCol (gray._500))

defaultInputFocusStyle ∷ Style
defaultInputFocusStyle =
  borderCol violet._500
    -- <> E.css { backgroundImage: E.none }
    -- <> background (violet._900 # darken 0.1)
    <> textCol violet._100
    <> placeholder (textCol violet._400)

type InputProps =
  { id ∷ String
  , value ∷ String
  , setValue ∷ String → Effect Unit
  , placeholder ∷ String
  , placeholders ∷ Array String
  }

plumageInputContainerStyle ∷ Style
plumageInputContainerStyle =
  width' auto
    <> flexRow
    <> itemsCenter
    <> positionRelative
    <> borderSolid
    <> roundedMd
    <> textSm
    <> border 2
    <> borderCol' (var "--plm-inputBorder-colour")
    <> background' (var "--plm-inputBackground-colour")
    <> textCol' (var "--plm-inputIcon--colour")
    <> focusWithin plumageInputContainerFocusWithinStyle
    <>
      ( attributeValueStyle "data-input-size" "small"
          ( rounded (5 # px)
              <> border 1
              <> fontSize 12
          )
      )

plumageInputContainerFocusWithinStyle ∷ Style
plumageInputContainerFocusWithinStyle = borderCol'
  (var "--plm-inputBorderActive-colour")

plumageInputStyle ∷ Style
plumageInputStyle =
  userSelectText
    <> height 32
    <> background transparent
    <> border 0
    <> mXY 0
    <> width 1
    <> flexGrow 1
    <> outlineNone
    <> textCol' (var "--plm-inputText-colour")
    <> pB 1
    <> pL 8
    <> css
      { autocomplete: str "off"
      , autocorrect: str "off"
      , spellcheck: str "false"
      }
    <> css
      { "&[data-input-size='small']": nested
          $ pT 0
          <> pB 1
          <> pL 8
          <> height 26

      }