module Main (indexer) where

import Control.Promise (Promise)
import Control.Promise as Promise
import Effect.Uncurried (EffectFn2, mkEffectFn2)
import PureScriptCSFIndexer as PureScriptCSFIndexer
import Storybook.CSFTools.Types (CsfFile, CsfOptions)

indexer :: EffectFn2 String CsfOptions (Promise CsfFile)
indexer = mkEffectFn2 \fn opts -> Promise.fromAff do
   PureScriptCSFIndexer.indexer fn opts
