module SourceMap.Types where

import Data.Maybe (Maybe)

foreign import data SourceMapConsumer :: Type

type SourceMap =
  { file ∷ String
  , mappings ∷ String
  , names ∷ Array String
  , sourceRoot ∷ Maybe String
  , sources ∷ Array String
  , version ∷ Int
  }
