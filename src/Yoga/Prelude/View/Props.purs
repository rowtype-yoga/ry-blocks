module Yoga.Prelude.View.Props where

import Prelude

import Data.Maybe (Maybe)
import Data.Tuple.Nested (type (/\))
import Effect (Effect)

type Settable a = a /\ (a → Effect Unit)

type Modifiable a = a /\ (Modify a)

type Modify a = (a → a) → Effect Unit

type Alterable a = a /\ (Alter a)

type Alter a = (a → Maybe a) → Effect Unit
