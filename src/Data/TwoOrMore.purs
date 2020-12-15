module Data.TwoOrMore where

import Prelude
import Data.Array as A
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as NEA
import Data.Foldable (class Foldable, foldr, foldl, foldMap)
import Data.FoldableWithIndex (class FoldableWithIndex, foldMapWithIndexDefaultR)
import Data.FunctorWithIndex (class FunctorWithIndex, mapWithIndex)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Traversable (class Traversable, sequence, traverseDefault)
import Data.Tuple (Tuple(..))
import Data.Tuple.Nested ((/\), type (/\))

newtype TwoOrMore a = TwoOrMore { first ∷ a, second ∷ a, rest ∷ Array a }

twoOrMore ∷ ∀ a. a -> a -> Array a -> TwoOrMore a
twoOrMore first second rest = TwoOrMore { first, second, rest }

toArray ∷ TwoOrMore ~> Array
toArray (TwoOrMore { first, second, rest }) = [ first, second ] <> rest

length ∷ ∀ a. TwoOrMore a -> Int
length (TwoOrMore { rest }) = 2 + A.length rest

head ∷ ∀ a. TwoOrMore a -> a
head (TwoOrMore { first }) = first

neck ∷ ∀ a. TwoOrMore a -> a
neck (TwoOrMore { second }) = second

last ∷ ∀ a. TwoOrMore a -> a
last (TwoOrMore { second, rest }) = A.last rest # fromMaybe second

zip ∷ ∀ a b. TwoOrMore a -> TwoOrMore b -> TwoOrMore (a /\ b)
zip (TwoOrMore as) (TwoOrMore bs) =
  TwoOrMore
    { first: as.first /\ bs.first
    , second: as.second /\ bs.second
    , rest: A.zip as.rest bs.rest
    }

findIndex ∷ ∀ a. (a -> Boolean) -> TwoOrMore a -> Maybe Int
findIndex f (TwoOrMore { first, second, rest }) =
  if f first then
    Just 0
  else
    if f second then
      Just 1
    else
      A.findIndex f rest <#> (_ + 2)

toNonEmptyArray ∷ TwoOrMore ~> NonEmptyArray
toNonEmptyArray (TwoOrMore { first, second, rest }) = NEA.cons' first ([ second ] <> rest)

index ∷ ∀ a. TwoOrMore a -> Int -> Maybe a
index (TwoOrMore { first, second, rest }) = case _ of
  0 -> Just first
  1 -> Just second
  i -> rest A.!! (i - 2)

infixl 8 index as !!

derive newtype instance eqTwoOrMore ∷ Eq a => Eq (TwoOrMore a)
derive newtype instance ordTwoOrMore ∷ Ord a => Ord (TwoOrMore a)
derive newtype instance showTwoOrMore ∷ Show a => Show (TwoOrMore a)

instance functorTwoOrMore ∷ Functor TwoOrMore where
  map f (TwoOrMore { first, second, rest }) = TwoOrMore do { first: f first, second: f second, rest: map f rest }

instance functorWithIndexTwoOrMore ∷ FunctorWithIndex Int TwoOrMore where
  mapWithIndex f (TwoOrMore { first, second, rest }) =
    TwoOrMore do
      { first: f 0 first
      , second: f 1 second
      , rest: rest # mapWithIndex (f <<< (_ + 2))
      }

instance foldableWithIndexTwoOrMore ∷ FoldableWithIndex Int TwoOrMore where
  foldrWithIndex f z = foldr (\(i /\ x) y -> f i x y) z <<< mapWithIndex Tuple
  foldlWithIndex f z = foldl (\y (i /\ x) -> f i y x) z <<< mapWithIndex Tuple
  foldMapWithIndex = foldMapWithIndexDefaultR

instance foldableTwoOrMore ∷ Foldable TwoOrMore where
  foldr f b fa = foldr f b (toArray fa)
  foldl f b fa = foldl f b (toArray fa)
  foldMap f fa = foldMap f (toArray fa)

instance traversableTwoOrMore ∷ Traversable TwoOrMore where
  sequence ∷ ∀ a m. Applicative m => TwoOrMore (m a) -> m (TwoOrMore a)
  sequence (TwoOrMore x) = ado
    first <- x.first
    second <- x.second
    rest <- sequence x.rest
    in (TwoOrMore { first, second, rest })
  traverse = traverseDefault

instance semigroupTwoOrMore ∷ Semigroup (TwoOrMore a) where
  append (TwoOrMore x) y = TwoOrMore { first: x.first, second: x.second, rest: x.rest <> toArray y }
