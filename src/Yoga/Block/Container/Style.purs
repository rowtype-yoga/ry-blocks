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
            , background: str colour.background
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
        { color: str colour.text
        , textDecorationColor: str colour.text
        , "&:hover":
          nest
            { color: str colour.text
            , textDecorationColor: str colour.highlight
            }
        , "&:visited":
          nest
            { color: str colour.text
            , textDecorationColor: str colour.backgroundLayer1
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
            , "::selection":
              nest
                { color: str colour.highlightText
                , background: str colour.highlight
                }
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
    { background: lightBg
    , backgroundLayer1: darken 0.12 >>> rotateHue (0.0) >>> saturate 0.01 $ lightBg
    , backgroundLayer2: darken 0.09 >>> rotateHue (0.0) >>> saturate 0.02 $ lightBg
    , backgroundLayer3: darken 0.06 >>> rotateHue (0.0) >>> saturate 0.03 $ lightBg
    , backgroundLayer4: darken 0.03 >>> rotateHue (0.0) >>> saturate 0.04 $ lightBg
    , backgroundLayer5: lightBg
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
    { background: darkBg
    , backgroundLayer5: lighten 0.30 >>> saturate 0.07 $ darkBg
    , backgroundLayer4: lighten 0.21 >>> saturate 0.08 $ darkBg
    , backgroundLayer3: lighten 0.14 >>> saturate 0.12 $ darkBg
    , backgroundLayer2: lighten 0.07 >>> saturate 0.18 $ darkBg
    , backgroundLayer1: darkBg
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
  highlight = Color.hsl 320.0 0.62 0.49

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

  darkBg = Color.hsl 240.0 0.07 0.10

  lightBg = Color.hsl 5.0 0.27 0.99

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
