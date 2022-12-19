module Yoga.Block.Hook.UseTheme where

import Prelude

import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..))
import Data.Newtype (class Newtype)
import Data.Tuple.Nested ((/\))
import Debug (spy)
import Effect.Aff (Milliseconds(..), launchAff_)
import Effect.Aff as Aff
import Effect.Class (liftEffect)
import Effect.Console as Console
import MediaQuery (matchMedia, matches)
import MediaQuery.Types as MQL
import React.Basic.Hooks (UseEffect, UseState, Hook, coerceHook)
import React.Basic.Hooks as React
import Web.DOM.Document as Document
import Web.DOM.Element as Element
import Web.DOM.MutationObserver (mutationObserver)
import Web.DOM.MutationObserver as MutationObserver
import Web.DOM.NonElementParentNode (getElementById)
import Web.DOM.NonElementParentNode as NEPN
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Event.EventTypes as Event
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.Window (document)
import Yoga.Block.Container.Style (DarkOrLightMode(..), getDarkOrLightMode)

newtype UseThemeVariant hooks = UseMediaQuery
  (UseEffect Unit (UseState DarkOrLightMode hooks))

derive instance Newtype (UseThemeVariant hooks) _

useThemeVariant ∷ Hook UseThemeVariant DarkOrLightMode
useThemeVariant = coerceHook React.do
  themeVariant /\ setThemeVariant ← React.useState' DarkMode
  let query = "(prefers-color-scheme: dark)"
  let mkPrefersDarkQuery = window >>= matchMedia query
  let prefersDark = mkPrefersDarkQuery >>= matches
  let
    refresh = getDarkOrLightMode >>= traverse_
      \m → when (m /= themeVariant) do setThemeVariant m

  React.useEffectOnce do
    refresh
    -- Listener for system dark/light mode change
    queryList ← mkPrefersDarkQuery
    let target = MQL.toEventTarget queryList
    systemModeListener ← eventListener \_ → do
      currentMode ← getDarkOrLightMode
      case currentMode of
        Just m → setThemeVariant m
        -- This means no preference
        Nothing → do
          prefersDarkMode ← prefersDark
          if prefersDarkMode then
            setThemeVariant DarkMode
          else
            setThemeVariant LightMode

    addEventListener Event.change systemModeListener true target

    -- Listener for changes to html `style` attribute
    observer ← mutationObserver \x y → do
      refresh

    nepn ← window >>= document <#>
      (HTMLDocument.toDocument >>> Document.toNonElementParentNode)

    elemMB ← getElementById "ry-block-container" nepn <#>
      map Element.toNode

    elemMB # traverse_
      ( \n → MutationObserver.observe n { attributeFilter: [ "style" ] }
          observer
      )

    pure do
      MutationObserver.disconnect observer
      removeEventListener Event.change systemModeListener true target

  pure themeVariant
