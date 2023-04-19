module Yoga.Block.Atom.DatePicker.View where

import Yoga.Prelude.View

import Data.Date (Date, Day, Month(..), Weekday(..), Year)
import Data.Date as Date
import Data.Enum (enumFromTo, fromEnum)
import Data.Enum as Enum
import Data.String as String
import Data.Time.Duration (Days(..), negateDuration)
import Fahrtwind.Icon.Heroicons as Heroicons
import Framer.Motion as M
import Literals.Undefined (undefined)
import Prelude as Bounded
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Record (disjointUnion)
import Yoga.Block.Molecule.DatePicker.Style as Style

type Props = { state ∷ State, dispatch ∷ Action → Effect Unit }

data Action
  = DateSelected Date
  | ShowPreviousMonth
  | ShowNextMonth
  | ShowMonthAndYear (Month /\ Year)
  | Open { currentDate ∷ Date, selectedDateʔ ∷ Maybe Date }
  | StartTransition TransitionDirection
  | Dismiss

data TransitionDirection = Opening | ToNextMonth | ToPreviousMonth | Closing

derive instance Eq TransitionDirection

type State = Maybe
  { selectedDateʔ ∷ Maybe Date
  , currentDate ∷ Date
  , showingMonth ∷ (Month /\ Year)
  , transitioningʔ ∷ Maybe TransitionDirection
  }

defaultState ∷ State
defaultState = Nothing

reduce ∷ State → Action → State
reduce = case _, _ of
  Just s, DateSelected d → Just (s { selectedDateʔ = Just d })
  Just s, ShowMonthAndYear my → Just
    (s { showingMonth = my, transitioningʔ = Nothing })
  Just s, ShowNextMonth → Just
    (s { showingMonth = nextMonth s.showingMonth, transitioningʔ = Nothing })
  Just s, ShowPreviousMonth → Just
    ( s
        { showingMonth = previousMonth s.showingMonth
        , transitioningʔ = Nothing
        }
    )

  -- User clicking very fast. Without this they have to wait for the transition
  -- to finish on every click
  Just s@{ transitioningʔ: Just running }, StartTransition transition
    | running == transition → case running of
        ToNextMonth → Just s { showingMonth = nextMonth s.showingMonth }
        ToPreviousMonth → Just s { showingMonth = previousMonth s.showingMonth }
        _ → Just s
  Just s, StartTransition transition → Just
    (s { transitioningʔ = Just transition })
  Just _, Dismiss → Nothing
  Nothing, Open { currentDate, selectedDateʔ } → do
    let date = fromMaybe currentDate selectedDateʔ
    Just
      { selectedDateʔ
      , currentDate
      , showingMonth: (Date.month date /\ Date.year date)
      , transitioningʔ: Nothing
      }
  s, _ → s

mkDatePickerView ∷ React.Component Props
mkDatePickerView = do
  React.component "DatePickerView" \props → React.do
    let { state, dispatch } = props
    pure case state of
      Just s → renderDate ({ dispatch } `disjointUnion` s)
      Nothing → mempty

renderDate ∷
  { dispatch ∷ Action → Effect Unit
  , currentDate ∷ Date
  , selectedDateʔ ∷ Maybe Date
  , showingMonth ∷ Month /\ Year
  , transitioningʔ ∷ Maybe TransitionDirection
  } →
  JSX
renderDate
  { dispatch
  , currentDate
  , selectedDateʔ
  , transitioningʔ
  , showingMonth: showingMonth /\ showingYear
  } = do
  let date = Date.canonicalDate showingYear showingMonth Bounded.bottom
  let nextMonth /\ nextYear = nextMonth (showingMonth /\ showingYear)
  let nextDate = Date.canonicalDate nextYear nextMonth Bounded.bottom
  let
    previousMonth /\ previousYear = previousMonth (showingMonth /\ showingYear)
  let
    previousDate = Date.canonicalDate previousYear previousMonth Bounded.bottom
  div_ Style.dateContainer
    [ div_ Style.titleAndControls
        [ E.element R.button'
            { className: "ry-cal-btn"
            , css: Style.monthChangeButton
            , onClick: handler_ (dispatch (StartTransition ToPreviousMonth))
            , children: [ Heroicons.chevronLeft ]
            }
        -- , E.element R.button'
        --     { className: "monthAndYear"
        --     , css: monthAndYearStyle
        --     , children:
        --         [ R.div_
        --             [ R.text $ monthName showingMonth <>
        --                 if showingYear == Date.year currentDate then ""
        --                 else " " <> yearString showingYear
        --             ]
        --         , div_
        --             ( width 20
        --                 <> height' (E.str "calc(100% - 6px)")
        --                 <> flexRow
        --                 <> itemsCenter
        --                 <> justifyEnd
        --                 <> border 0
        --                 <> borderLeft 1
        --                 <> borderSolid
        --                 <> borderCol gray._200
        --             )
        --             [ div_ (widthAndHeight 16)
        --                 [ Heroicons.chevronDown ]
        --             ]
        --         ]
        --     }
        , R.text $ monthName showingMonth <>
            if showingYear == Date.year currentDate then ""
            else " " <> yearString showingYear

        , E.element R.button'
            { className: "ry-cal-btn"
            , css: Style.monthChangeButton
            , onClick: handler_ (dispatch (StartTransition ToNextMonth))
            , children: [ Heroicons.chevronRight ]
            }
        ]
    , E.element R.div'
        { className: "days-container"
        , css: Style.daysContainer
        , children:
            [ div_ Style.daysHeadings
                ( enumFromTo Monday Sunday <#>
                    (weekdayName >>> String.take 3 >>> \n → R.div_ [ R.text n ])
                )
            , E.element M.div
                { className: "the-days"
                , key: monthName showingMonth
                , css: Style.theDays
                , initial: M.initial $ R.css { x: "-100%" }
                , animate: M.animate case transitioningʔ of
                    Just ToNextMonth → R.css
                      { x: "-200%", transition: { duration: 0.2 } }
                    Just ToPreviousMonth → R.css
                      { x: "0%", transition: { duration: 0.2 } }
                    _ → R.css { x: "-100%" }
                , onAnimationComplete: M.onAnimationComplete
                    case transitioningʔ of
                      Just ToNextMonth → const $ dispatch ShowNextMonth
                      Just ToPreviousMonth → const $ dispatch ShowPreviousMonth
                      _ → mempty
                , children:
                    [ div "days" Style.days
                        $ renderMonthNumbers
                            { date: previousDate
                            , selectedDateʔ: Nothing
                            , currentDateʔ: Nothing
                            , showingMonth: previousMonth
                            , dispatch: mempty
                            }
                    , div "days" Style.days
                        $ renderMonthNumbers
                            { date
                            , selectedDateʔ
                            , currentDateʔ: Just currentDate
                            , showingMonth
                            , dispatch
                            }
                    , div "days" Style.days
                        $ renderMonthNumbers
                            { date: nextDate
                            , selectedDateʔ: Nothing
                            , currentDateʔ: Nothing
                            , showingMonth: nextMonth
                            , dispatch: mempty
                            }
                    ]
                }
            ]
        }
    ]

renderMonthNumbers ∷
  { currentDateʔ ∷ Maybe Date
  , date ∷ Date
  , dispatch ∷ Action → Effect Unit
  , selectedDateʔ ∷ Maybe Date
  , showingMonth ∷ Month
  } →
  Array JSX
renderMonthNumbers { date, selectedDateʔ, currentDateʔ, showingMonth, dispatch } =
  do
    let firstDay = firstMondayBefore $ setDay Bounded.bottom date
    let lastDay = Date.adjust (41.0 # Days) firstDay # fromMaybe Bounded.top
    ( ( enumFromTo firstDay lastDay
      -- ( firstSundayAfter
      --     $ setDay (lastDayOfMonth (Date.year date) (Date.month date)) date
      -- )
      )
        <#> \(d ∷ Date) →
          E.element R.button'
            { className: "day"
            , css: Style.day <>
                if Date.month d /= showingMonth then
                  Style.otherMonthDay
                else mempty
            , children:
                [ E.element M.div
                    { css:
                        Style.dayRound
                          <>
                            ( if selectedDateʔ == Just d then
                                Style.selectedDay
                              else mempty
                            )
                          <>
                            ( if Just d == currentDateʔ then Style.currentDay
                              else mempty
                            )
                          <>
                            if (fromEnum $ Date.day d) == 1 then Style.oneDay
                            else mempty
                    , initial:
                        if selectedDateʔ == Just d then
                          M.initial $ R.css { scale: 1.2 }
                        else M.initial $ undefined
                    , animate:
                        M.animate $ R.css
                          { scale: 1
                          , transition:
                              { type: "spring"
                              , delay: 0.1
                              , stiffness: 100
                              , mass: 0.5
                              , damping: 5
                              }
                          }
                    , className: "cn"
                    , children: [ R.text $ show $ fromEnum $ Date.day d ]
                    }
                ]
            , onClick: handler_
                if Date.month d < showingMonth then do
                  dispatch (StartTransition ToPreviousMonth)
                  dispatch (DateSelected d)
                else if Date.month d > showingMonth then do
                  dispatch (StartTransition ToNextMonth)
                  dispatch (DateSelected d)
                else do
                  dispatch $ DateSelected d
            }
    )

nextMonth ∷ Month /\ Year → Month /\ Year
nextMonth (currentMonth /\ currentYear) = do
  let monthSuccʔ = Enum.succ currentMonth
  case monthSuccʔ of
    Nothing → Bounded.bottom /\ (Enum.succ currentYear # fromMaybe Bounded.top)
    Just monthSucc → monthSucc /\ currentYear

previousMonth ∷ Month /\ Year → Month /\ Year
previousMonth (currentMonth /\ currentYear) = do
  let monthPredʔ = Enum.pred currentMonth
  case monthPredʔ of
    Nothing → Bounded.top /\ (Enum.pred currentYear # fromMaybe Bounded.bottom)
    Just monthPred → monthPred /\ currentYear

setDay ∷ Day → Date → Date
setDay day date = Date.canonicalDate (Date.year date) (Date.month date) day

firstMondayBefore ∷ Date → Date
firstMondayBefore date = go date
  where
  go d =
    if Date.weekday d == Monday then d
    else do
      Date.adjust (negateDuration (Days 1.0)) d # maybe d go

firstSundayAfter ∷ Date → Date
firstSundayAfter date = go date
  where
  go d =
    if Date.weekday d == Sunday then d
    else Date.adjust (Days 1.0) d # maybe d go

yearString ∷ Year → String
yearString = fromEnum >>> show

monthName ∷ Month → String
monthName = case _ of
  January → "January"
  February → "February"
  March → "March"
  April → "April"
  May → "May"
  June → "June"
  July → "July"
  August → "August"
  September → "September"
  October → "October"
  November → "November"
  December → "December"

weekdayName ∷ Weekday → String
weekdayName = case _ of
  Monday → "Monday"
  Tuesday → "Tuesday"
  Wednesday → "Wednesday"
  Thursday → "Thursday"
  Friday → "Friday"
  Saturday → "Saturday"
  Sunday → "Sunday"
