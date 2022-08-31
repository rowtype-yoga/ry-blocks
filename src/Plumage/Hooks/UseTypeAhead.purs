module Plumage.Hooks.UseTypeAhead where

import Yoga.Prelude.View

import Effect.Aff (attempt, delay)
import Network.RemoteData as RemoteData
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)

useTypeahead args = React.do
  input /\ setInput ← React.useState' ""
  suggestions /\ setSuggestions ← React.useState' RemoteData.NotAsked
  { activeIndex, updatedByKeyboard } /\ updateActiveIndex ← React.useState
    { activeIndex: Nothing, updatedByKeyboard: false }

  useAff input do
    setSuggestions RemoteData.Loading # liftEffect
    delay args.debounce
    result ← attempt (args.loadSuggestions input)
    let rd = RemoteData.fromEither (join result)
    setSuggestions rd # liftEffect
