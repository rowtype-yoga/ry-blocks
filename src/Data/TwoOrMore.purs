module Data.TwoOrMore
  ( TwoOrMore
  , twoOrMore
  , fromArray
  , pushFront
  , pushBack
  , toArray
  , length
  , head
  , neck
  , tail
  , last
  , zip
  , findIndex
  , mapWithIndex
  , toNonEmptyArray
  , index
  , (!!)
  ) where

import Prelude
import Data.Array as A
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as NEA
import Data.Foldable (class Foldable)
import Data.FoldableWithIndex (class FoldableWithIndex)
import Data.FunctorWithIndex (class FunctorWithIndex)
import Data.Maybe (Maybe(..))
import Data.Traversable (class Traversable)
import Data.Tuple.Nested (type (/\))
import Partial.Unsafe (unsafePartial)

newtype TwoOrMore a = TwoOrMore (Array a)

twoOrMore ∷ ∀ a. a -> a -> Array a -> TwoOrMore a
twoOrMore first second rest = TwoOrMore ([ first, second ] <> rest)

fromArray ∷ ∀ a. Array a -> Maybe (TwoOrMore a)
fromArray xs = if A.length xs >= 2 then Just (TwoOrMore xs) else Nothing

toArray ∷ TwoOrMore ~> Array
toArray (TwoOrMore xs) = xs

length ∷ ∀ a. TwoOrMore a -> Int
length (TwoOrMore xs) = A.length xs

head ∷ ∀ a. TwoOrMore a -> a
head (TwoOrMore xs) = unsafePartial A.unsafeIndex xs 0

pushFront ∷ ∀ a. a -> TwoOrMore a -> TwoOrMore a
pushFront x (TwoOrMore xs) = TwoOrMore (A.cons x xs)

pushBack ∷ ∀ a. a -> TwoOrMore a -> TwoOrMore a
pushBack x (TwoOrMore xs) = TwoOrMore (A.snoc xs x)

neck ∷ ∀ a. TwoOrMore a -> a
neck (TwoOrMore xs) = unsafePartial A.unsafeIndex xs 1

tail ∷ TwoOrMore ~> NonEmptyArray
tail twoOrMore'@(TwoOrMore xs) = NEA.cons' (neck twoOrMore') (A.drop 2 xs)

last ∷ ∀ a. TwoOrMore a -> a
last (TwoOrMore xs) = unsafePartial A.unsafeIndex xs (A.length xs - 1)

zip ∷ ∀ a b. TwoOrMore a -> TwoOrMore b -> TwoOrMore (a /\ b)
zip (TwoOrMore as) (TwoOrMore bs) = TwoOrMore (A.zip as bs)

findIndex ∷ ∀ a. (a -> Boolean) -> TwoOrMore a -> Maybe Int
findIndex f (TwoOrMore xs) = A.findIndex f xs

mapWithIndex ∷ ∀ a b. (Int -> a -> b) -> TwoOrMore a -> TwoOrMore b
mapWithIndex f (TwoOrMore xs) = TwoOrMore (A.mapWithIndex f xs)

toNonEmptyArray ∷ TwoOrMore ~> NonEmptyArray
toNonEmptyArray twoOrMore' = NEA.cons (head twoOrMore') (tail twoOrMore')

index ∷ ∀ a. TwoOrMore a -> Int -> Maybe a
index (TwoOrMore xs) = A.index xs

infixl 8 index as !!

derive newtype instance eqTwoOrMore ∷ Eq a => Eq (TwoOrMore a)
derive newtype instance ordTwoOrMore ∷ Ord a => Ord (TwoOrMore a)
derive newtype instance showTwoOrMore ∷ Show a => Show (TwoOrMore a)
derive newtype instance functorTwoOrMore ∷ Functor TwoOrMore
derive newtype instance functorWithIndexTwoOrMore ∷ FunctorWithIndex Int TwoOrMore
derive newtype instance foldableWithIndexTwoOrMore ∷ FoldableWithIndex Int TwoOrMore
derive newtype instance foldableTwoOrMore ∷ Foldable TwoOrMore
derive newtype instance traversableTwoOrMore ∷ Traversable TwoOrMore
derive newtype instance semigroupTwoOrMore ∷ Semigroup (TwoOrMore a)
