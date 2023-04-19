module Yoga.Prelude.Default
  ( module Prelude
  , module Control.Alt
  , module Control.Monad.Maybe.Trans
  , module Control.Monad.Trans.Class
  , module Data.Maybe
  , module Data.Either
  , module Effect
  , module Effect.Class
  , module Data.Monoid
  , module Data.Foldable
  , module Data.FoldableWithIndex
  , module Data.FunctorWithIndex
  , runMaybeT_
  ) where

import Prelude hiding (top, bottom)
import Control.Alt ((<|>))
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.Trans.Class (lift)
import Data.Either (Either(..), note, hush)
import Data.Foldable (fold, foldMap, for_, intercalate, traverse_)
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Maybe (Maybe(..), fromMaybe, fromMaybe', isJust, maybe)
import Data.Monoid (guard)
import Effect (Effect)
import Effect.Class (liftEffect)

runMaybeT_ ∷ ∀ f a. Functor f ⇒ MaybeT f a → f Unit
runMaybeT_ = void <<< runMaybeT
