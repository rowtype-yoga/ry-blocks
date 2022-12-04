module Yoga.Block.Typography.Heading.Style where

import Yoga.Prelude.Style

baseH ∷ Style
baseH = mXY zero <> pXY zero

h1 ∷ Style
h1 = baseH <> text6xl <> lineHeight "1.2em"

h2 ∷ Style
h2 = baseH <> text5xl <> css { fontWeight: str "680" } <> lineHeight "1.2em"

h3 ∷ Style
h3 = baseH <> text4xl <> css { fontWeight: str "620" } <> lineHeight "1.2em"

h4 ∷ Style
h4 = baseH <> text3xl <> fontSemibold <> lineHeight "1.2em"

h5 ∷ Style
h5 = baseH <> text2xl <> fontMedium <> pB' sizeStyle.xs

h6 ∷ Style
h6 = baseH <> textXl <> fontNormal <> pB'
  sizeStyle.xxs

highlight ∷ Style
highlight =
  textLinearGradient 20
    [ colour.highlightRotatedBackwards
    , colour.highlightTextOnBackground
    , colour.highlightRotatedForwards
    ] <> css
    { "&::selection": nested
        (textCol' col.highlightText <> css { textFillColor: col.highlightText })
    }

title ∷ Style
title = baseH <> textDefault <> fontMedium

subtitle ∷ Style
subtitle = baseH <> textDefault <> trackingTight <> fontNormal
  <> textCol' col.textPaler2

tag ∷ Style
tag = roundedFull
  <> border 1
  <> borderSolid
  <> borderCol' col.backgroundBright6
  <> background' col.backgroundBright4
  <> textCol' col.textPaler3
  <> fontMedium
  <> pX' sizeStyle.s
  <> pY' sizeStyle."3xs"
  <> textSm
  <> textTransformUppercase
  <> trackingWide
  <> shadowSm
