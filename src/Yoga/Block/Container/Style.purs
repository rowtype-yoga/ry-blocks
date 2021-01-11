module Yoga.Block.Container.Style where

import Yoga.Prelude.Style
import Color as Color
import Data.Symbol (class IsSymbol, SProxy, reflectSymbol)
import Effect.Uncurried (EffectFn2, runEffectFn2)
import Foreign.Object (Object)
import Foreign.Object as Object
import Heterogeneous.Mapping (class HMapWithIndex, class MappingWithIndex, hmap, hmapWithIndex)
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM (Element)
import Web.DOM.Document (documentElement)
import Web.Event.Internal.Types (EventTarget)
import Web.HTML (Window, window)
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.Window (document)

data DarkOrLightMode
  = DarkMode
  | LightMode

derive instance eqDarkOrLightMode ∷ Eq DarkOrLightMode

lightModeStyle ∷ Style
lightModeStyle = unsafeCoerce lightModeVariables

darkModeStyle ∷ Style
darkModeStyle = unsafeCoerce darkModeVariables

darkMode ∷ Style
darkMode = mkGlobal (Just DarkMode)

lightMode ∷ Style
lightMode = mkGlobal (Just LightMode)

global ∷ Style
global = mkGlobal Nothing

-- [TODO] Move this all out
foreign import data ComputedStyle ∷ Type

foreign import getComputedStyleImpl ∷ EffectFn2 Element Window ComputedStyle

getComputedStyle ∷ Element -> Window -> Effect ComputedStyle
getComputedStyle = runEffectFn2 getComputedStyleImpl

foreign import getPropertyValueImpl ∷ EffectFn2 String ComputedStyle String -- Not sure it always returns a string

getPropertyValue ∷ String -> ComputedStyle -> Effect String
getPropertyValue = runEffectFn2 getPropertyValueImpl

foreign import data ElementStyle ∷ Type

foreign import getElementStyle ∷ Element -> Effect ElementStyle

foreign import setStyleProperty ∷ String -> String -> ElementStyle -> Effect Unit

foreign import data MediaQueryList ∷ Type

foreign import matchMedia ∷ String -> Window -> Effect MediaQueryList

foreign import matches ∷ MediaQueryList -> Effect Boolean

toEventTarget ∷ MediaQueryList -> EventTarget
toEventTarget = unsafeCoerce

getDocumentElement ∷ MaybeT Effect Element
getDocumentElement = do
  win <- window # lift
  htmlDoc <- document win # lift
  let doc = HTMLDocument.toDocument htmlDoc
  documentElement doc # MaybeT

getDarkOrLightMode ∷ Effect (Maybe DarkOrLightMode)
getDarkOrLightMode =
  runMaybeT do
    win <- window # lift
    docElem ∷ Element <- getDocumentElement
    computedStyle <- getComputedStyle docElem win # lift
    pv <- getPropertyValue "--theme-variant" computedStyle # lift
    if pv == "dark" then
      DarkMode # pure
    else
      if pv == "light" then
        LightMode # pure
      else
        Nothing # pure # MaybeT

setDarkOrLightMode ∷ DarkOrLightMode -> Effect Unit
setDarkOrLightMode desiredMode =
  runMaybeT_ do
    docElem <- getDocumentElement
    style <- getElementStyle docElem # lift
    style
      # setStyleProperty "--theme-variant" case desiredMode of
          LightMode -> "light"
          DarkMode -> "dark"
      # lift

-- [TODO] Move out end
--
mkGlobal ∷ Maybe DarkOrLightMode -> Style
mkGlobal maybeMode =
  css
    { "body, html":
      nested
        $ css
            { minHeight: 100.0 # vh
            , minWidth: 100.0 # vw
            , lineHeight: str "1.15"
            , "WebkitTextSizeAdjust": _100percent
            }
    , ":root":
      nested
        $ css
            { "@media (prefers-color-scheme: dark)":
              nest { "--theme-variant": str "dark" }
            }
        <> variables
        <> fontVariables { main: "Inter", mono: "Victor Mono, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console" }
    , html:
      nested
        $ css
            { boxSizing: str "border-box"
            }
    , body:
      nested
        $ css
            { fontFamily: str "var(--main-font)"
            , backgroundColor: str colour.background
            , color: str colour.text
            , margin: str "0"
            , transition: str "background-color 4000ms linear"
            }
        <> case maybeMode of
            Nothing -> autoSwitchColourTheme
            Just DarkMode -> darkModeStyle
            Just LightMode -> lightModeStyle
    , "pre,code":
      nest
        { fontFamily: str "var(--mono-font)"
        }
    , "h1,h2,h3,h4":
      nest
        { lineHeight: var "--line-height-small"
        , fontWeight: str "700"
        , marginTop: str "var(--s-3)"
        }
    , h1:
      nested
        $ css
            { "--h1size": str "calc( min( var(--s2) + 2vw , var(--s4) ) )"
            , fontSize: var "--h1size"
            , letterSpacing: str "calc(var(--h1size) * -0.04)"
            }
    , h2:
      nested
        $ css
            { "--h2size": str "calc( min( (var(--s1)*1.1) + 2vw , var(--s3) ) )"
            , fontSize: var "--h2size"
            , letterSpacing: str "calc(var(--h2size) * -0.035)"
            }
    , h3:
      nested
        $ css
            { "--h3size": str "calc( min( var(--s0) + 2vw , var(--s2) ) )"
            , fontSize: var "--h3size"
            , letterSpacing: str "calc(var(--h3size) * -0.03)"
            }
    , p:
      nested
        $ css
            { "--psize": str "calc( min( (var(--s-1) * 1.7) + 0.7vw , var(--s0)*1.1 ) )"
            , fontSize: var "--psize"
            , letterSpacing: str "calc(var(--psize) * -0.03)"
            }
    , a:
      nest
        { color: str colour.link
        , textDecoration: str "none"
        , "&:hover":
          nest
            { textDecoration: str $ "underline " <> colour.link
            }
        }
    , "::selection":
      nest
        { color: str colour.highlightText
        , background: str colour.highlight
        }
    , "*, *:before, *:after":
      nested
        $ css
            { boxSizing: str "inherit"
            -- , fontFeatureSettings:
            --   str
            --     $ intercalate ","
            --     $ show
            --     <$> [ "ss03" -- curved r
            --       , "cv03" -- open six
            --       , "cv04" -- open nine
            --       -- , "cv05" -- lower case l with tail
            --       , "cv07" -- German double-s
            --       , "cv09" -- Flat top three
            --       ]
            }
    }

withAlpha ∷ Number -> Color -> Color
withAlpha alpha c1 = Color.rgba' r g b alpha
  where
  { r, g, b } = Color.toRGBA' c1

defaultColours ∷ Colours
defaultColours =
  { light:
    { background: lightBg
    , backgroundInverted: darken 0.85 lightBg
    , backgroundLayer1: darken 0.12 >>> rotateHue (0.0) >>> saturate 0.01 $ lightBg
    , backgroundLayer2: darken 0.09 >>> rotateHue (0.0) >>> saturate 0.02 $ lightBg
    , backgroundLayer3: darken 0.06 >>> rotateHue (0.0) >>> saturate 0.03 $ lightBg
    , backgroundLayer4: darken 0.03 >>> rotateHue (0.0) >>> saturate 0.04 $ lightBg
    , backgroundLayer5: lightBg
    , highlight
    , highlightDarker: withAlpha 0.15 (Color.darken 0.5 highlight)
    , highlightDisabled: (desaturate 0.80 >>> lighten 0.28) highlight
    , highlightLighter: withAlpha 0.2 (Color.lighten 0.5 highlight)
    , highlightRotatedBackwards: highlight # rotateHue (-30.0)
    , highlightRotatedForwards: highlight # rotateHue 30.0
    , highlightText
    , inputBackground: lightBg
    , inputBorder: darken 0.1 lightBg
    , interfaceBackground
    , interfaceBackgroundDangerous
    , interfaceBackgroundDisabled: darken 0.03 lightBg
    , interfaceBackgroundHighlight: lighten 0.05 lightBg
    , interfaceBackgroundShadow: darken 0.04 lightBg
    , interfaceDangerousText
    , interfaceTextDisabled: darken 0.30 lightBg
    , invalid
    , invalidText
    , link
    , placeholderText: lighten 0.4 darkBg
    , required
    , success
    , successText
    , text: text
    , textInverted: lightBg
    }
  , dark:
    { background: darkBg
    , backgroundInverted: lightBg
    , backgroundLayer1: darkBg
    , backgroundLayer2: lighten 0.07 >>> saturate 0.18 $ darkBg
    , backgroundLayer3: lighten 0.14 >>> saturate 0.12 $ darkBg
    , backgroundLayer4: lighten 0.21 >>> saturate 0.08 $ darkBg
    , backgroundLayer5: lighten 0.30 >>> saturate 0.07 $ darkBg
    , highlight: highlightDark
    , highlightDarker: withAlpha 0.4 (Color.darken 0.5 highlightDark)
    , highlightDisabled: (desaturate 0.76 >>> darken 0.32) highlightDark
    , highlightLighter: withAlpha 0.2 (Color.lighten 0.5 highlightDark)
    , highlightRotatedBackwards: highlightDark # rotateHue (-30.0)
    , highlightRotatedForwards: highlightDark # rotateHue 30.0
    , highlightText
    , inputBackground: darkBg
    , inputBorder: lighten 0.17 darkBg
    , interfaceBackground: interfaceBackgroundDark
    , interfaceBackgroundDangerous: interfaceBackgroundDangerousDark
    , interfaceBackgroundDisabled: lighten 0.14 >>> saturate 0.02 $ darkBg
    , interfaceBackgroundHighlight: lighten 0.1 interfaceBackgroundDark
    , interfaceBackgroundShadow: darken 0.1 interfaceBackgroundDark
    , interfaceDangerousText: interfaceDangerousTextDark
    , interfaceTextDisabled: (desaturate 0.3 >>> lighten 0.25 >>> desaturate 0.3) interfaceBackgroundDark
    , invalid
    , invalidText
    , link: linkDark
    , placeholderText: darken 0.4 white
    , required
    , success: successDark
    , successText
    , text: textDark
    , textInverted: darkBg
    }
  }
  where
  darkBg = Color.hsl 240.0 0.07 0.10

  highlight = Color.hsl 320.0 0.62 0.49

  highlightDark = Color.hsl 265.0 1.00 0.6

  highlightText = Color.rgb 0xFF 0xFF 0xFF

  interfaceBackground = lightBg

  interfaceBackgroundDangerous = interfaceBackground

  interfaceBackgroundDangerousDark = Color.hsl 340.0 0.55 0.30

  interfaceBackgroundDark = lighten 0.14 >>> saturate 0.12 $ darkBg

  interfaceDangerousText = invalid

  interfaceDangerousTextDark = Color.hsl 340.0 1.0 0.90

  invalid = Color.rgb 220 40 70

  invalidText = successText

  lightBg = Color.hsl 5.0 0.27 0.99

  link = Color.hsl 320.0 1.0 0.33

  linkDark = Color.hsl 265.0 1.0 0.83

  required = Color.rgb 200 50 80

  success = Color.rgb 10 150 25

  successDark = Color.rgb 20 200 60

  successText = Color.rgb 250 250 250

  text = Color.rgb 16 16 32

  textDark = Color.rgb 220 210 220

type FlatTheme a =
  { background ∷ a
  , backgroundLayer1 ∷ a
  , backgroundLayer2 ∷ a
  , backgroundLayer3 ∷ a
  , backgroundLayer4 ∷ a
  , backgroundLayer5 ∷ a
  , backgroundInverted ∷ a
  , interfaceBackground ∷ a
  , interfaceBackgroundDangerous ∷ a
  , interfaceDangerousText ∷ a
  , interfaceBackgroundDisabled ∷ a
  , interfaceTextDisabled ∷ a
  , interfaceBackgroundHighlight ∷ a
  , interfaceBackgroundShadow ∷ a
  , inputBackground ∷ a
  , inputBorder ∷ a
  , link ∷ a
  , highlight ∷ a
  , highlightRotatedBackwards ∷ a
  , highlightRotatedForwards ∷ a
  , highlightDarker ∷ a
  , highlightLighter ∷ a
  , highlightDisabled ∷ a
  , highlightText ∷ a
  , success ∷ a
  , successText ∷ a
  , invalid ∷ a
  , invalidText ∷ a
  , required ∷ a
  , text ∷ a
  , textInverted ∷ a
  , placeholderText ∷ a
  }

type Colours =
  { dark ∷ FlatTheme Color
  , light ∷ FlatTheme Color
  }

data MakeCSSVarLabels
  = MakeCSSVarLabels

instance makeCSSVarLabels' ∷
  (IsSymbol sym) =>
  MappingWithIndex MakeCSSVarLabels (SProxy sym) a String where
  mappingWithIndex MakeCSSVarLabels prop _ = "--" <> (reflectSymbol prop)

makeCSSVarLabels ∷ ∀ a b. HMapWithIndex MakeCSSVarLabels a b => a -> b
makeCSSVarLabels = hmapWithIndex MakeCSSVarLabels

colour ∷ FlatTheme String
colour =
  hmap (\x -> "var(" <> x <> ")")
    $ makeCSSVarLabels defaultColours.light

autoSwitchColourTheme ∷ Style
autoSwitchColourTheme = lightT
  where
  darkT ∷ Style
  darkT = unsafeCoerce darkObj

  darkObj ∷ Object StyleProperty
  darkObj =
    Object.fromHomogeneous defaultColours.dark
      # Object.foldMap \k v ->
          Object.singleton ("--" <> k) (str (Color.cssStringRGBA v))

  lightObj ∷ Object StyleProperty
  lightObj =
    Object.fromHomogeneous defaultColours.light
      # Object.foldMap \k v ->
          Object.singleton ("--" <> k) (str (Color.cssStringRGBA v))
            # Object.insert "@media (prefers-color-scheme: dark)" (nested darkT)
            # Object.insert "&:th" (nested darkT)

  lightT ∷ Style
  lightT = unsafeCoerce lightObj

lightModeVariables ∷ Object StyleProperty
lightModeVariables =
  Object.fromHomogeneous defaultColours.light
    # Object.foldMap \k v ->
        Object.singleton ("--" <> k) (str (Color.cssStringRGBA v))

darkModeVariables ∷ Object StyleProperty
darkModeVariables =
  Object.fromHomogeneous defaultColours.dark
    # Object.foldMap \k v ->
        Object.singleton ("--" <> k) (str (Color.cssStringRGBA v))

variables ∷ Style
variables =
  css
    { "--ratio": "1.61" # str
    , "--line-height": str "var(--ratio)"
    , "--line-height-small": str "calc(var(--ratio) * 0.8)"
    , "--s-5": str "calc(var(--s-4) / var(--ratio))"
    , "--s-4": str "calc(var(--s-3) / var(--ratio))"
    , "--s-3": str "calc(var(--s-2) / var(--ratio))"
    , "--s-2": str "calc(var(--s-1) / var(--ratio))"
    , "--s-1": str "calc(var(--s0) / var(--ratio))"
    , "--s0": 1.0 # rem
    , "--s1": str "calc(var(--s0) * var(--ratio))"
    , "--s2": str "calc(var(--s1) * var(--ratio))"
    , "--s3": str "calc(var(--s2) * var(--ratio))"
    , "--s4": str "calc(var(--s3) * var(--ratio))"
    , "--s5": str "calc(var(--s4) * var(--ratio))"
    , "--theme-variant": str "light"
    }

fontVariables ∷ { main ∷ String, mono ∷ String } -> Style
fontVariables { main, mono } =
  css
    { "--main-font": str $ main <> """, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol""""
    , "--mono-font": str $ mono <> ", monospace, monospace"
    }

-- Standalone style for storybook
inputFocus ∷ Style
inputFocus =
  css
    { outline: none
    , border: str "1px solid var(--highlight-col)"
    }
