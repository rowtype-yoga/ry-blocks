module Yoga.Block.Organism.NotificationCentre.Notification.Style where

import Yoga.Prelude.Style hiding (top, bottom, left)

import Fahrtwind (acceptClicks, background, background', backgroundImage, backgroundPosition, backgroundSize, border, borderBottom, borderCol', flexCol, fontMedium, gap, gray, height, heightFull, left, overflowHidden, pB, pX, pXY, pY, positionAbsolute, positionFixed, positionRelative, right, rounded2xl, roundedLg, shadow, shadowDefault, textCol, textCol', textSm, textXs, top, width, widthAndHeight, widthFull)
import React.Basic.Emotion as E
import Yoga.Block.Container.Style (col, colour)

defaultNotificationStyle ∷ Style
defaultNotificationStyle = rounded2xl
  <> shadow "0 0 16px rgba(0,0,0,0.1), 0 0 32px rgba(0,0,0,0.1)"
  <> width 340
  <> height 120
  <> overflowHidden
  <> border 1
  <> borderCol' col.backgroundBright1

defaultNotificationContentContainerStyle ∷ Style
defaultNotificationContentContainerStyle = widthFull
  <> heightFull
  <> background' col.background
  <> flexCol
  <> positionRelative

defaultNotificationContentStyle ∷ Style
defaultNotificationContentStyle = pX 12 <> pY 12 <> positionRelative

defaultNotificationTitleStyle ∷ Style
defaultNotificationTitleStyle =
  textCol' col.textPaler2 <> textSm <> fontMedium <> pB 6

defaultNotificationBodyStyle ∷ Style
defaultNotificationBodyStyle = textCol' col.text <> textXs

defaultNotificationContainerStyle ∷ Style
defaultNotificationContainerStyle =
  positionFixed <> top 16 <> right 16 <> flexCol <> gap 8 <> acceptClicks

defaultDismissButtonStyle ∷ Style
defaultDismissButtonStyle = positionAbsolute <> right 8 <> top 8
  <> textCol' col.textPaler2
  <> border 0
  <> shadowDefault
  <> borderCol' col.backgroundLayer3
  <> roundedLg
  <> background' col.backgroundLayer5
  <> widthAndHeight 26
  <> pXY 3

defaultAutoHideNotificationBackgroundStyle ∷ Style
defaultAutoHideNotificationBackgroundStyle =
  backgroundImage
    ( "linear-gradient(to right, "
        <> colour.backgroundLayer4
        <> " 50%, "
        <> colour.backgroundLayer5
        <> " 0)"
    )
    <> border 8
    <> borderCol' col.highlight
    <> backgroundSize "200% 100%"
    <> backgroundPosition "right"
    <> positionAbsolute
    <> top 0
    <> left 0
    <> widthFull
    <> heightFull
    <> overflowHidden
    <> css
      { animation:
          str "_ var(--auto-hide-duration) 0s forwards ease-out"
      , animationName: E.keyframes
          { "100%": backgroundPosition "left"
          }
      , display: E.block
      }