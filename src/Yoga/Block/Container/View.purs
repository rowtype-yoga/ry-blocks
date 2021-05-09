module Yoga.Block.Container.View
  ( Props
  , PropsF
  , component
  , modalContainerId
  , tooltipContainerId
  ) where

import Yoga.Prelude.View
import Data.Array as Array
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.Event.EventTypes as Event
import Yoga.Block.Container.Style (DarkOrLightMode(..), matchMedia, matches, setDarkOrLightMode)
import Yoga.Block.Container.Style as Styles

type PropsF f =
  ( children ∷ Array JSX
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
  mkForwardRefComponent "Container" do
    \(props@{ children } ∷ { | PropsF OptionalProp }) ref -> React.do
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
        $ fragment
            [ R.div' </ { ref }
                /> Array.cons
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
                    children
            , R.div { id: modalContainerId }
            , E.element R.div'
                { id: tooltipContainerId
                , className: tooltipContainerId
                , css:
                  E.css
                    { width: 100.0 # E.vw
                    , height: 100.0 # E.vh
                    , position: E.fixed
                    , top: E.str "0"
                    , left: E.str "0"
                    , pointerEvents: E.none
                    , zIndex: E.str "7"
                    }
                }
            ]

modalContainerId ∷ String
modalContainerId = "ry-modal-container"

tooltipContainerId ∷ String
tooltipContainerId = "ry-tooltip-container"
