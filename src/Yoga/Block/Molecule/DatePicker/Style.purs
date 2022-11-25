module Yoga.Block.Molecule.DatePicker.Style where

import Yoga.Prelude.Style hiding (size)

commonDays ∷ Style
commonDays = displayGrid <> templateCols "repeat(7, 1fr)" <> textCenter

daysHeadings ∷ Style
daysHeadings = commonDays
  <> textCol gray._500
  <> fontMedium
  <> textXs
  <> pT 10
  <> pB 8

theDays ∷ Style
theDays = flexRow <> width (7 * size) <> height 260

days ∷ Style
days = commonDays <> templateRows ("repeat(7," <> show size <> "px)")

size ∷ Int
size = 42

padding ∷ Int
padding = 2

day ∷ Style
day = width size <> height size <> borderNone
  <> css { background: none }
  <> mXY 0
  <> pXY padding
  <> textCol (gray._500 # darken 0.07)
  <> fontMedium
  <> textSm

dayRound ∷ Style
dayRound = roundedXl <> widthFull <> heightFull <> boxSizingBorderBox
  <> pT 6
  <> transition "all 160ms ease-out"
  <> hover
    ( background coolGray._100
        <> borderCol coolGray._100
        <> cursorPointer
        <> textCol black
    )
  <> border 3
  <> borderCol white
  <> borderSolid

selectedDay ∷ Style
selectedDay = s <> hover s
  where
  s = background violet._100
    <> borderCol violet._500
    <> textCol violet._800

oneDay ∷ Style
oneDay = pR' (str "1px")

currentDay ∷ Style
currentDay = positionRelative
  <> css { fontVariantNumeric: str "tabular-nums" }
  <> afterElement
    ( positionAbsolute <> bottom' (6 # px) <> right' (50.0 # percent)
        <> width 18
        <> height 3
        <> background (gray._500 # withAlpha 0.5)
        <> translate "50%" "50%"
        <> roundedFull
    )

otherMonthDay ∷ Style
otherMonthDay = textCol gray._400

dateContainer ∷ Style
dateContainer = roundedLg <> shadowMd <> flexCol <> justifyCenter
  <> itemsCenter
  <> pX 12
  <> pT 16
  <> pB 12
  <> background (white)
  <> textSm
  <> overflowXHidden
  <> border 1
  <> borderSolid
  <> borderCol gray._200
  <> css { width: str "fit-content" }

titleAndControls ∷ Style
titleAndControls = flexRow
  <> justifyBetween
  <> itemsCenter
  <> widthFull

monthChangeButton ∷ Style
monthChangeButton =
  border 1
    <> roundedMd
    <> borderSolid
    <> textCol gray._600
    <> background white
    <> borderCol gray._200
    <> widthAndHeight 30
    <> shadowSm
    <> pXY 6
    <> boxSizingBorderBox
    <> mXY 0
    <> hover (background gray._100)

monthAndYear ∷ Style
monthAndYear =
  textDefault <> fontMedium <> textCol gray._600
    <> background white
    <> border 1
    <> borderSolid
    <> roundedMd
    <> borderCol gray._200
    <> pXY 0
    <> width 180
    <> height 30
    <> itemsCenter
    <> mXY 0
    <> pX 5
    <> flexRow
    <> textSm
    <> justifyBetween
    <> shadowSm

daysContainer ∷ Style
daysContainer = pT 8
