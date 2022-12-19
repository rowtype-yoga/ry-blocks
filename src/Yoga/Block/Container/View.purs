module Yoga.Block.Container.View
  ( Props
  , PropsF
  , component
  ) where

import Yoga.Prelude.View

import Data.Array as Array
import Fahrtwind as F
import MediaQuery (matchMedia, matches)
import MediaQuery.Types (MediaQueryList)
import MediaQuery.Types as MediaQueryList
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Event.EventTypes as Event
import Yoga.Block.Container.Style (DarkOrLightMode(..), setDarkOrLightMode)
import Yoga.Block.Container.Style as Styles

type PropsF f =
  ( children ∷ Array JSX
  , themeVariant ∷ f (Maybe DarkOrLightMode)
  , onPreferredSystemThemeChange ∷ f (DarkOrLightMode → Effect Unit)
  , globalStyles ∷ f E.Style
  )

type Props =
  (| PropsF Id)

component ∷ ∀ p q. Union p q Props ⇒ ReactComponent { | p }
component = rawComponent

mkPrefersDark ∷ Effect MediaQueryList
mkPrefersDark = matchMedia "(prefers-color-scheme: dark)" =<< window

mkPrefersLight ∷ Effect MediaQueryList
mkPrefersLight = matchMedia "(prefers-color-scheme: light)" =<< window

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Container" do
    \(props@{ children } ∷ { | PropsF OptionalProp }) _ref → React.do
      let propsThemeVariant = props.themeVariant # opToMaybe # join
      let
        notifySystemThemeChanged = props.onPreferredSystemThemeChange ?|| mempty
      systemThemeVariant /\ setSystemThemeVariant ← React.useState' Nothing
      useEffect propsThemeVariant do
        for_ propsThemeVariant setDarkOrLightMode
        mempty
      useEffectOnce do
        prefersDarkMediaQuery ← mkPrefersDark
        prefersLightMediaQuery ← mkPrefersLight
        -- Init system preference
        whenM (matches prefersDarkMediaQuery) do
          setSystemThemeVariant (Just DarkMode)
          notifySystemThemeChanged DarkMode
        whenM (matches prefersLightMediaQuery) do
          setSystemThemeVariant (Just LightMode)
          notifySystemThemeChanged LightMode
        -- Dark Mode listener
        darkModeListener ←
          eventListener \_ → do
            whenM (matches prefersDarkMediaQuery) do
              setSystemThemeVariant (Just DarkMode)
              notifySystemThemeChanged DarkMode
        addEventListener Event.change darkModeListener true
          (MediaQueryList.toEventTarget prefersDarkMediaQuery)
        -- Light Mode listener
        lightModeListener ←
          eventListener \_ → do
            whenM (matches prefersLightMediaQuery) do
              setSystemThemeVariant (Just LightMode)
              notifySystemThemeChanged LightMode
        addEventListener Event.change darkModeListener true
          (MediaQueryList.toEventTarget prefersDarkMediaQuery)
        addEventListener Event.change lightModeListener true
          (MediaQueryList.toEventTarget prefersLightMediaQuery)
        pure do
          removeEventListener Event.change darkModeListener true
            (MediaQueryList.toEventTarget prefersDarkMediaQuery)
          removeEventListener Event.change lightModeListener true
            (MediaQueryList.toEventTarget prefersLightMediaQuery)

      pure
        $ fragment
            [ element E.global
                { styles: F.globalStyles <> (_ <>? props.globalStyles)
                    case propsThemeVariant, systemThemeVariant of
                      Nothing, Nothing → Styles.global
                      Just Styles.DarkMode, _ → Styles.darkMode
                      Just Styles.LightMode, _ → Styles.lightMode
                      Nothing, Just DarkMode → Styles.darkMode
                      Nothing, Just LightMode → Styles.lightMode
                }
            , R.div'
                </
                  { id: "ry-block-container"
                  , style: R.css
                      { "--theme-variant":
                          case systemThemeVariant of
                            Just DarkMode → "dark"
                            _ → "light"
                      , "--light-mode":
                          case systemThemeVariant of
                            Just DarkMode → 0
                            _ → 1
                      , "--dark-mode":
                          case systemThemeVariant of
                            Just DarkMode → 1
                            _ → 0
                      }
                  }
                /> children
            ]
