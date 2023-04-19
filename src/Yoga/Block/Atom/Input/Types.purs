module Yoga.Block.Atom.Input.Types where

import Prelude

-- No support for "button" because of the dedicated
-- HTML Element
data HTMLInputType
  = Checkbox
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

derive instance eqHTMLInput ∷ Eq HTMLInputType

toString ∷ HTMLInputType → String
toString = case _ of
  Checkbox → "checkbox"
  Color → "color"
  Date → "date"
  DatetimeLocal → "datetime-local"
  Email → "email"
  File → "file"
  Hidden → "hidden"
  Image → "image"
  Month → "month"
  Number → "number"
  Password → "password"
  Radio → "radio"
  Range → "range"
  Reset → "reset"
  Search → "search"
  Submit → "submit"
  Tel → "tel"
  Text → "text"
  Time → "time"
  Url → "url"
  Week → "week"
