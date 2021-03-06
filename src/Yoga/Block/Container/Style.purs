module Yoga.Block.Container.Style where

import Yoga.Prelude.Style
import Color as Color
import Data.Symbol (class IsSymbol, reflectSymbol)
import Effect.Uncurried (EffectFn2, runEffectFn2)
import Foreign.Object (Object)
import Foreign.Object as Object
import Heterogeneous.Mapping (class HMapWithIndex, class MappingWithIndex, hmap, hmapWithIndex)
import Type.Proxy (Proxy)
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
        { fontWeight: str "700"
        -- , margin: _0
        }
    -- , h1:
    --     nested
    --       $ css
    --           { "--h1size": str "calc( min( var(--s2) + 2vw , var(--s4) ) )"
    --           , fontSize: var "--h1size"
    --           , letterSpacing: str "calc(var(--h1size) * -0.04)"
    --           -- , marginBottom: var "--s0"
    --           -- , marginTop: var "--s-1"
    --           }
    -- , h2:
    --     nested
    --       $ css
    --           { "--h2size": str "calc( min( (var(--s1)*1.1) + 2vw , var(--s3) ) )"
    --           , fontSize: var "--h2size"
    --           , letterSpacing: str "calc(var(--h2size) * -0.035)"
    --           -- , marginBottom: var "--s-1"
    --           -- , marginTop: var "--s-2"
    --           }
    -- , h3:
    --     nested
    --       $ css
    --           { "--h3size": str "calc( min( var(--s0) + 2vw , var(--s2) ) )"
    --           , fontSize: var "--h3size"
    --           , letterSpacing: str "calc(var(--h3size) * -0.03)"
    --           -- , marginBottom: var "--s-2"
    --           -- , marginTop: var "--s-3"
    --           }
    -- , p:
    --     nested
    --       $ css
    --           { "--psize": str "calc( min( (var(--s-1) * 1.7) + 0.7vw , var(--s0)*1.1 ) )"
    --           , fontSize: var "--psize"
    --           , letterSpacing: str "calc(var(--psize) * -0.03)"
    --           }
    , a:
      nest
        { fontWeight: str "600"
        , textDecoration: str "underline"
        , cursor: str "pointer"
        , "&:hover":
          nest
            { textDecoration: str "none"
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
    , backgroundAlpha0: withAlpha 0.0 lightBg
    , backgroundAlpha25: withAlpha 0.25 lightBg
    , backgroundAlpha50: withAlpha 0.5 lightBg
    , backgroundAlpha75: withAlpha 0.75 lightBg
    , backgroundInverted: darken 0.85 lightBg
    , backgroundLayer1: darken 0.096 >>> desaturate 0.17 $ lightBg
    , backgroundLayer2: darken 0.074 >>> desaturate 0.13 $ lightBg
    , backgroundLayer3: darken 0.043 >>> desaturate 0.05 $ lightBg
    , backgroundLayer4: darken 0.02 >>> desaturate 0.01 $ lightBg
    , backgroundLayer5: lightBg
    , backgroundLayer5Border: lightBg
    , backgroundCard: lightBg
    , popperBackground: (withAlpha 0.9 >>> darken 0.07 >>> desaturate 0.3) lightBg
    , popperBackgroundNoAlpha: (darken 0.07 >>> desaturate 0.3) lightBg
    , popperInnerBorder: (withAlpha 0.9 >>> darken 0.25 >>> desaturate 0.3) lightBg
    , popperOuterBorder: transparent
    , highlight
    , highlightAlpha25: highlightBase 0.25
    , highlightAlpha50: highlightBase 0.50
    , highlightAlpha67: highlightBase 0.67
    , highlightDarker: withAlpha 0.15 (Color.darken 0.2 highlight)
    , highlightDisabled: (desaturate 0.60 >>> lighten 0.5) highlight
    , highlightLighter: withAlpha 0.2 (Color.lighten 0.2 highlight)
    , highlightRotatedBackwards: highlight # rotateHue (-13.0) # darken 0.05
    , highlightRotatedForwards: highlight # rotateHue 3.0 # lighten 0.05 # saturate 0.1
    , highlightText
    , inputBackground: lightBg
    , inputBorder: darken 0.06 >>> desaturate 0.2 $ lightBg
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
    , textPaler1: text # lighten 0.1
    , textPaler2: text # lighten 0.2
    , textPaler3: text # lighten 0.3
    , textPaler4: text # lighten 0.4
    , textInverted: lightBg
    , textInvertedPaler1: lightBg # darken 0.1
    , textInvertedPaler2: lightBg # darken 0.2
    , textInvertedPaler3: lightBg # darken 0.3
    , textInvertedPaler4: lightBg # darken 0.4
    , boxShadow
    }
  , dark:
    { background: darkBg
    , backgroundAlpha0: withAlpha 0.0 darkBg
    , backgroundAlpha25: withAlpha 0.25 darkBg
    , backgroundAlpha50: withAlpha 0.5 darkBg
    , backgroundAlpha75: withAlpha 0.75 darkBg
    , backgroundInverted: lightBg
    , backgroundLayer1: lighten 0.1 >>> saturate 0.18 $ darkBg
    , backgroundLayer2: lighten 0.13 >>> saturate 0.10 $ darkBg
    , backgroundLayer3: lighten 0.16 >>> saturate 0.11 $ darkBg
    , backgroundLayer4: lighten 0.19 >>> saturate 0.11 $ darkBg
    , backgroundLayer5: lighten 0.21 >>> saturate 0.08 $ darkBg
    , backgroundLayer5Border: lighten 0.37 $ darkBg
    , backgroundCard: lighten 0.05 >>> saturate 0.1 $ darkBg
    , popperBackground: (withAlpha 0.8 >>> lighten 0.09 >>> saturate 0.05) darkBg
    , popperBackgroundNoAlpha: (lighten 0.09 >>> saturate 0.05) darkBg
    , popperInnerBorder: (withAlpha 0.9 >>> darken 0.7 >>> desaturate 0.3) lightBg
    , popperOuterBorder: darkBg
    , highlight: highlightDark
    , highlightAlpha25: highlightDarkBase 0.25
    , highlightAlpha50: highlightDarkBase 0.50
    , highlightAlpha67: highlightDarkBase 0.67
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
    , invalid: invalidDark
    , invalidText: invalidTextDark
    , link: linkDark
    , placeholderText: darken 0.4 white
    , required
    , success: successDark
    , successText
    , text: textDark
    , textPaler1: textDark # darken 0.1 # desaturate 0.25
    , textPaler2: textDark # darken 0.2 # desaturate 0.25
    , textPaler3: textDark # darken 0.3 # desaturate 0.25
    , textPaler4: textDark # darken 0.4 # desaturate 0.25
    , textInverted: darkBg
    , textInvertedPaler1: darkBg # lighten 0.1
    , textInvertedPaler2: darkBg # lighten 0.2
    , textInvertedPaler3: darkBg # lighten 0.3
    , textInvertedPaler4: darkBg # lighten 0.4
    , boxShadow: boxShadowDark
    }
  }
  where
  darkBg = Color.hsl 210.0 0.27 0.02

  -- highlightBase = Color.hsla 275.0 0.82 0.4
  -- brightPurpleBase = Color.hsla 275.0 0.82 0.4
  -- highlightMurmurasBase = Color.hsla 220.0 0.60 0.5
  highlightBase = Color.hsla 259.0 1.00 0.6

  highlight = highlightBase 1.0

  highlightDarkBase = Color.hsla 265.0 1.00 0.6

  highlightDark = Color.hsla 265.0 1.00 0.57 1.0

  highlightText = Color.rgb 0xFF 0xFF 0xFF

  interfaceBackground = lightBg

  interfaceBackgroundDangerous = interfaceBackground

  interfaceBackgroundDangerousDark = Color.hsl 340.0 0.55 0.30

  interfaceBackgroundDark = lighten 0.14 >>> saturate 0.12 $ darkBg

  interfaceDangerousText = invalid

  interfaceDangerousTextDark = Color.hsl 340.0 1.0 0.90

  invalidDark = Color.rgb 230 30 60

  invalid = Color.rgb 173 0 69

  invalidText = Color.white

  invalidTextDark = successText

  -- lightBg = Color.hsl 240.0 0.5 0.982
  lightBg = Color.hsl 230.0 0.5 0.982

  link = Color.hsl 320.0 1.0 0.33

  linkDark = Color.hsl 265.0 1.0 0.83

  required = Color.rgb 200 50 80

  success = Color.rgb 10 150 25

  successDark = Color.rgb 20 200 60

  successText = Color.rgb 250 250 250

  text = Color.rgb 16 16 32

  textDark = Color.rgb 240 245 250

  boxShadow = Color.rgba 0 0 0 0.2

  boxShadowDark = Color.rgba 0 0 0 0.6

type FlatTheme a =
  { background ∷ a
  , popperBackground ∷ a
  , popperBackgroundNoAlpha ∷ a
  , popperInnerBorder ∷ a
  , popperOuterBorder ∷ a
  , backgroundAlpha0 ∷ a
  , backgroundAlpha25 ∷ a
  , backgroundAlpha50 ∷ a
  , backgroundAlpha75 ∷ a
  , backgroundLayer1 ∷ a
  , backgroundLayer2 ∷ a
  , backgroundLayer3 ∷ a
  , backgroundLayer4 ∷ a
  , backgroundLayer5 ∷ a
  , backgroundLayer5Border ∷ a
  , backgroundInverted ∷ a
  , backgroundCard ∷ a
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
  , highlightAlpha25 ∷ a
  , highlightAlpha50 ∷ a
  , highlightAlpha67 ∷ a
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
  , textPaler1 ∷ a
  , textPaler2 ∷ a
  , textPaler3 ∷ a
  , textPaler4 ∷ a
  , textInverted ∷ a
  , textInvertedPaler1 ∷ a
  , textInvertedPaler2 ∷ a
  , textInvertedPaler3 ∷ a
  , textInvertedPaler4 ∷ a
  , placeholderText ∷ a
  , boxShadow ∷ a
  }

type Colours =
  { dark ∷ FlatTheme Color
  , light ∷ FlatTheme Color
  }

data MakeCSSVarLabels
  = MakeCSSVarLabels

instance makeCSSVarLabels' ∷
  (IsSymbol sym) =>
  MappingWithIndex MakeCSSVarLabels (Proxy sym) a String where
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
    , "--s-6": str "calc(var(--s-5) / var(--ratio))"
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
    , "--s6": str "calc(var(--s5) * var(--ratio))"
    , "--theme-variant": str "light"
    }

type Sizes =
  { "3xl" ∷ String
  , "3xs" ∷ String
  , "4xl" ∷ String
  , "4xs" ∷ String
  , "5xl" ∷ String
  , "5xs" ∷ String
  , l ∷ String
  , m ∷ String
  , s ∷ String
  , text ∷
    { interactive ∷ String
    , label ∷ String
    , copy ∷ String
    , small ∷ String
    , tiny ∷ String
    , heading ∷
      { h1 ∷ String
      , h2 ∷ String
      , h3 ∷ String
      , h4 ∷ String
      }
    }
  , xl ∷ String
  , xs ∷ String
  , xxl ∷ String
  , xxs ∷ String
  }

size ∷ Sizes
size =
  { "5xs": "var(--s-6)"
  , "4xs": "var(--s-5)"
  , "3xs": "var(--s-4)"
  , xxs: "var(--s-3)"
  , xs: "var(--s-2)"
  , s: "var(--s-1)"
  , m: "var(--s0)"
  , l: "var(--s1)"
  , xl: "var(--s2)"
  , xxl: "var(--s3)"
  , "3xl": "var(--s4)"
  , "4xl": "var(--s5)"
  , "5xl": "var(--s6)"
  , text:
    { label: "var(--s-1)"
    , interactive: "calc(var(--s0) * 0.85)"
    , copy: "var(--s0)"
    , small: "calc(var(--s0) * 0.85)"
    , tiny: "calc(var(--s0) * 0.75)"
    , heading:
      { h1: "calc(var(--s0) * 2.0)"
      , h2: "calc(var(--s0) * 1.8)"
      , h3: "calc(var(--s0) * 1.4)"
      , h4: "calc(var(--s0) * 1.1)"
      }
    }
  }

type BoxShadows = 
  { s ∷ String
  , m ∷ String
  , l ∷ String
  , xl ∷ String
  , xxl ∷ String
  , default ∷ String
  }

boxShadow ∷ BoxShadows
boxShadow = 
  { s: "0 1px 2px 0 rgba(0,0,0,0.05)"
  , m: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  , l: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  , xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  , xxl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  , default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
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
