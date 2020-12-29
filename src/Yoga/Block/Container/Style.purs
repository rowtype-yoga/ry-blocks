module Yoga.Block.Container.Style where

import Yoga.Prelude.Style
import Color as Color
import Data.Symbol (class IsSymbol, SProxy, reflectSymbol)
import Foreign.Object (Object)
import Foreign.Object as Object
import Heterogeneous.Mapping (class HMapWithIndex, class MappingWithIndex, hmap, hmapWithIndex)
import Unsafe.Coerce (unsafeCoerce)

data DarkOrLightMode
  = DarkMode
  | LightMode

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
            , transition: str "background,color 0.33s ease-in"
            }
    , ":root":
      nested $ variables
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
            , background: str colour.background0
            , color: str colour.text
            , margin: str "0"
            }
        <> case maybeMode of
            Nothing -> autoSwitchColourTheme
            Just DarkMode -> darkModeStyle
            Just LightMode -> lightModeStyle
    , "pre,code":
      nest
        { fontFamily: str "var(--mono-font)"
        }
    , h1:
      nested
        $ css
            { fontSize: var "--s4"
            , lineHeight: str "calc(var(--s4) * 1.4)"
            , fontWeight: str "900"
            , letterSpacing: str "calc(var(--s-5) * -1)"
            }
    , h2:
      nested
        $ css
            { fontSize: var "--s3"
            , lineHeight: str "calc(var(--s3) * 1.4)"
            , fontWeight: str "800"
            , letterSpacing: str "calc(var(--s-5) * -0.9)"
            }
    , h3:
      nested
        $ css
            { fontSize: var "--s2"
            , lineHeight: str "calc(var(--s2) * 1.4)"
            , fontWeight: str "700"
            , letterSpacing: str "calc(var(--s-5) * -0.8)"
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
            , fontFeatureSettings:
              str
                $ intercalate ","
                $ show
                <$> [ "ss03" -- curved r
                  , "cv03" -- open six
                  , "cv04" -- open nine
                  -- , "cv05" -- lower case l with tail
                  , "cv07" -- German double-s
                  , "cv09" -- Flat top three
                  ]
            }
    }

withAlpha ∷ Number -> Color -> Color
withAlpha alpha c1 = Color.rgba' r g b alpha
  where
    { r, g, b } = Color.toRGBA' c1

defaultColours ∷ Colours
defaultColours =
  { light:
    { background0: lightBg
    , background02: darken 0.02 lightBg
    , background05: darken 0.05 lightBg
    , background07: darken 0.07 lightBg
    , background10: darken 0.1 lightBg
    , background12: darken 0.12 lightBg
    , background15: darken 0.15 lightBg
    , background20: darken 0.2 lightBg
    , background25: darken 0.25 lightBg
    , background30: darken 0.3 lightBg
    , background40: darken 0.4 lightBg
    , background50: darken 0.5 lightBg
    , background60: darken 0.6 lightBg
    , background70: darken 0.7 lightBg
    , background80: darken 0.8 lightBg
    , background90: darken 0.9 lightBg
    , background100: darken 1.0 lightBg
    , backgroundInverted: darken 0.85 lightBg
    , textInverted: lightBg
    , success
    , successText
    , invalid
    , invalidText
    , required
    , interfaceBackground
    , interfaceBackgroundDangerous
    , interfaceDangerousText
    , interfaceBackgroundDisabled: darken 0.03 lightBg
    , interfaceTextDisabled: darken 0.30 lightBg
    , interfaceBackgroundHighlight: lighten 0.05 lightBg
    , highlightDisabled: (desaturate 0.80 >>> lighten 0.28) highlight
    , interfaceBackgroundShadow: darken 0.04 lightBg
    , inputBackground: lightBg
    , inputBorder: darken 0.1 lightBg
    , highlight
    , highlightLighter: withAlpha 0.2 (Color.lighten 0.5 highlight)
    , highlightDarker: withAlpha 0.15 (Color.darken 0.5 highlight)
    , highlightRotatedForwards: highlight # rotateHue 30.0
    , highlightRotatedBackwards: highlight # rotateHue (-30.0)
    , highlightText
    , text: textLightTheme
    , placeholderText: lighten 0.4 darkBg
    }
  , dark:
    { background0: darkBg
    , background02: lighten 0.02 darkBg
    , background05: lighten 0.05 darkBg
    , background07: lighten 0.07 darkBg
    , background10: lighten 0.1 darkBg
    , background12: lighten 0.12 darkBg
    , background15: lighten 0.15 darkBg
    , background20: lighten 0.2 darkBg
    , background25: lighten 0.25 darkBg
    , background30: lighten 0.3 darkBg
    , background40: lighten 0.4 darkBg
    , background50: lighten 0.5 darkBg
    , background60: lighten 0.6 darkBg
    , background70: lighten 0.7 darkBg
    , background80: lighten 0.8 darkBg
    , background90: lighten 0.9 darkBg
    , background100: lighten 1.0 darkBg
    , textInverted: darkBg
    , backgroundInverted: lightBg
    , interfaceBackground: interfaceBackgroundDark
    , interfaceBackgroundDangerous: interfaceBackgroundDangerousDark
    , interfaceDangerousText: interfaceDangerousTextDark
    , interfaceBackgroundDisabled: darken 0.3 interfaceBackgroundDark
    , interfaceTextDisabled: (desaturate 0.3 >>> lighten 0.25) interfaceBackgroundDark
    , interfaceBackgroundHighlight: lighten 0.1 interfaceBackgroundDark
    , interfaceBackgroundShadow: darken 0.1 interfaceBackgroundDark
    , inputBackground: darkBg
    , inputBorder: lighten 0.17 darkBg
    , success: successDark
    , successText
    , required
    , invalid
    , invalidText
    , highlight: highlightDark
    , highlightDisabled: (desaturate 0.76 >>> darken 0.32) highlightDark
    , highlightLighter: withAlpha 0.2 (Color.lighten 0.5 highlightDark)
    , highlightDarker: withAlpha 0.4 (Color.darken 0.5 highlightDark)
    , highlightRotatedForwards: highlightDark # rotateHue 30.0
    , highlightRotatedBackwards: highlightDark # rotateHue (-30.0)
    , highlightText
    , text: lightBg
    , placeholderText: darken 0.4 lightBg
    }
  }
  where
    highlight = Color.hsl 270.0 0.90 0.62

    highlightDark = Color.rgb 0x88 0x33 0xFF

    interfaceBackgroundDark = Color.hsl 240.0 0.10 0.33

    interfaceBackground = lightBg

    interfaceBackgroundDangerous = interfaceBackground

    interfaceDangerousText = invalid

    interfaceBackgroundDangerousDark = Color.hsl 340.0 0.55 0.30

    interfaceDangerousTextDark = Color.hsl 340.0 1.0 0.90

    highlightText = Color.rgb 0xFF 0xFF 0xFF

    success = Color.rgb 10 150 25

    successDark = Color.rgb 20 200 60

    successText = Color.rgb 250 250 250

    invalid = Color.rgb 220 40 70

    invalidText = successText

    required = Color.rgb 200 50 80

    textLightTheme = Color.rgb 16 16 32

    darkBg = Color.rgb 0 0 0

    lightBg = Color.rgb 250 250 250

type FlatTheme a =
  { background0 ∷ a
  , background02 ∷ a
  , background05 ∷ a
  , background07 ∷ a
  , background10 ∷ a
  , background12 ∷ a
  , background15 ∷ a
  , background20 ∷ a
  , background25 ∷ a
  , background30 ∷ a
  , background40 ∷ a
  , background50 ∷ a
  , background60 ∷ a
  , background70 ∷ a
  , background80 ∷ a
  , background90 ∷ a
  , background100 ∷ a
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
    { "--ratio": "1.5" # str
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
