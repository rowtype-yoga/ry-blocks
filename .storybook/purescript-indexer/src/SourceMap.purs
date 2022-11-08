module SourceMap (withSourceMapConsumer) where

import Prelude

import Control.Promise (Promise)
import Control.Promise as Promise
import Effect.Aff (Aff)
import Effect.Uncurried (EffectFn1, EffectFn2, mkEffectFn1, runEffectFn2)
import Foreign (Foreign)
import SourceMap.Types (SourceMapConsumer, SourceMap)
import Yoga.JSON as JSON

foreign import withSourceMapConsumerImpl ::
  EffectFn2
     -- handler
     (EffectFn1 SourceMapConsumer (Promise Unit))
     -- the map
     Foreign
     (Promise Unit)

withSourceMapConsumer
  :: (SourceMapConsumer -> Aff Unit) ->
     SourceMap ->
     Aff Unit
withSourceMapConsumer handler map =
 Promise.toAffE do
  runEffectFn2 withSourceMapConsumerImpl
    (mkEffectFn1 (Promise.fromAff <<< handler))
    (JSON.write map)
