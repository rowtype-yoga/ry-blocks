module Yoga.Block.Internal.OptionalProp where

import Prelude
import Control.Alt (class Alt, (<|>))
import Data.Foldable (class Foldable, foldMap, foldl, foldr)
import Data.Maybe (Maybe, maybe)
import Data.Newtype (class Newtype)
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Coercible (class Coercible)
import Untagged.Union (UndefinedOr, defined, fromUndefinedOr, maybeToUor, uorToMaybe)

type Id a =
  a

newtype OptionalProp a = OptionalProp (UndefinedOr a)

unsafeUnOptional ∷ ∀ a. OptionalProp a -> a
unsafeUnOptional = unsafeCoerce

opToMaybe ∷ ∀ a. OptionalProp a -> Maybe a
opToMaybe (OptionalProp x) = uorToMaybe x

maybeToOp ∷ ∀ a. Maybe a -> OptionalProp a
maybeToOp mb = OptionalProp (maybeToUor mb)

derive instance ntOptionalProp ∷ Newtype (OptionalProp a) _

instance semigroupOptionalProp ∷ Semigroup a => Semigroup (OptionalProp a) where
  append (OptionalProp a) (OptionalProp b) =
    OptionalProp
      (maybeToUor (uorToMaybe a <> uorToMaybe b))

instance monoidOptionalProp ∷ Monoid a => Monoid (OptionalProp a) where
  mempty = OptionalProp (defined mempty)

instance foldableOptionalProp ∷ Foldable OptionalProp where
  foldMap fn = foldMap fn <<< opToMaybe
  foldr fn acc = foldr fn acc <<< opToMaybe
  foldl fn acc = foldl fn acc <<< opToMaybe

instance functorOptionalProp ∷ Functor OptionalProp where
  map fn opt = maybeToOp $ (map fn (opToMaybe opt))

instance altOptionalProp ∷ Alt OptionalProp where
  alt op1 op2 = maybeToOp $ (opToMaybe op1) <|> (opToMaybe op2)

instance coercibleOptionalProp ∷ Coercible a (OptionalProp a)

getOr ∷ ∀ a. a -> OptionalProp a -> a
getOr default (OptionalProp o) = fromUndefinedOr default o

getOrFlipped ∷ ∀ a. OptionalProp a -> a -> a
getOrFlipped = flip getOr

ifTrue ∷ ∀ a. a -> a -> OptionalProp Boolean -> a
ifTrue v alt x = if (x ?|| false) then v else alt

isTruthy ∷ OptionalProp Boolean -> Boolean
isTruthy = getOr false

infixr 5 getOrFlipped as ?||

appendIfDefined ∷ ∀ a. (Semigroup a) => a -> OptionalProp a -> a
appendIfDefined a undefOrA = maybe a (a <> _) (opToMaybe undefOrA)

infixr 7 appendIfDefined as <>?
