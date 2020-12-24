module Yoga.Block.Atom.Input.Types where

import Prelude

data HTMLInput
  = Button
  | Checkbox
  | Color
  | Date
  | DatetimeLocal
  | Email
  | File
  | Hidden
  | Image
  | Month
  | Number
  | Password
  | Radio
  | Range
  | Reset
  | Search
  | Submit
  | Tel
  | Text
  | Time
  | Url
  | Week

derive instance eqHTMLInput ∷ Eq HTMLInput

toString ∷ HTMLInput -> String
toString = case _ of
  Button -> "button"
  Checkbox -> "checkbox"
  Color -> "color"
  Date -> "date"
  DatetimeLocal -> "datetime-local"
  Email -> "email"
  File -> "file"
  Hidden -> "hidden"
  Image -> "image"
  Month -> "month"
  Number -> "number"
  Password -> "password"
  Radio -> "radio"
  Range -> "range"
  Reset -> "reset"
  Search -> "search"
  Submit -> "submit"
  Tel -> "tel"
  Text -> "text"
  Time -> "time"
  Url -> "url"
  Week -> "week"
