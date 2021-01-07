module Yoga.Block.Container.View
  ( component, Props, PropsF
  ) where

import Yoga.Prelude.View
import Data.Array as Array
import Effect.Unsafe (unsafePerformEffect)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Event.EventTypes as Event
import Yoga.Block.Container.Style (DarkOrLightMode(..), matchMedia, matches, setDarkOrLightMode)
import Yoga.Block.Container.Style as Styles

type PropsF f =
  ( content ∷ JSX
  , themeVariant ∷ f (Maybe DarkOrLightMode)
  , onPreferredSystemThemeChange ∷ f (DarkOrLightMode -> Effect Unit)
  )

type Props =
  ( | PropsF Id )

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

mkPrefersDark ∷ Effect Styles.MediaQueryList
mkPrefersDark = matchMedia "(prefers-color-scheme: dark)" =<< window

mkPrefersLight ∷ Effect Styles.MediaQueryList
mkPrefersLight = matchMedia "(prefers-color-scheme: light)" =<< window

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  unsafeCoerce
    $ unsafePerformEffect
    $ reactComponent "Container" \(props@{ content } ∷ { | PropsF OptionalProp }) -> React.do
        let propsThemeVariant = props.themeVariant # opToMaybe # join
        let notifySystemThemeChanged = props.onPreferredSystemThemeChange ?|| mempty
        systemThemeVariant /\ setSystemThemeVariant <- React.useState' Nothing
        useEffect propsThemeVariant do
          for_ propsThemeVariant setDarkOrLightMode
          mempty
        useEffectOnce do
          prefersDarkMediaQuery <- mkPrefersDark
          prefersLightMediaQuery <- mkPrefersLight
          -- Init system preference
          whenM (matches prefersDarkMediaQuery) do
            setSystemThemeVariant (Just DarkMode)
            notifySystemThemeChanged DarkMode
          whenM (matches prefersLightMediaQuery) do
            setSystemThemeVariant (Just LightMode)
            notifySystemThemeChanged LightMode
          -- Dark Mode listener
          darkModeListener <-
            eventListener \_ -> do
              whenM (matches prefersDarkMediaQuery) do
                setSystemThemeVariant (Just DarkMode)
                notifySystemThemeChanged DarkMode
          addEventListener Event.change darkModeListener true (Styles.toEventTarget prefersDarkMediaQuery)
          -- Light Mode listener
          lightModeListener <-
            eventListener \_ -> do
              whenM (matches prefersLightMediaQuery) do
                setSystemThemeVariant (Just LightMode)
                notifySystemThemeChanged LightMode
          addEventListener Event.change darkModeListener true (Styles.toEventTarget prefersDarkMediaQuery)
          addEventListener Event.change lightModeListener true (Styles.toEventTarget prefersLightMediaQuery)
          pure do
            removeEventListener Event.change darkModeListener true (Styles.toEventTarget prefersDarkMediaQuery)
            removeEventListener Event.change lightModeListener true (Styles.toEventTarget prefersLightMediaQuery)
        pure
          $ R.div_
          $ Array.cons
              ( element E.global
                  { styles:
                    case propsThemeVariant, systemThemeVariant of
                      Nothing, Nothing -> Styles.global
                      Just Styles.DarkMode, _ -> Styles.darkMode
                      Just Styles.LightMode, _ -> Styles.lightMode
                      Nothing, Just DarkMode -> Styles.darkMode
                      Nothing, Just LightMode -> Styles.lightMode
                  }
              )
              [ content
              ]
