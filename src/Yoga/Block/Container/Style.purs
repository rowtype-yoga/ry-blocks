module Yoga.Block.Container.Style where

import Yoga.Prelude.Style
import Color as Color
import Data.Symbol (class IsSymbol, SProxy, reflectSymbol)
import Foreign.Object (Object)
import Foreign.Object as Object
import Heterogeneous.Mapping (class HMapWithIndex, class MappingWithIndex, hmap, hmapWithIndex)
import Unsafe.Coerce (unsafeCoerce)

global ∷ Style
global =
  css
    { "body, html":
      nested
        $ css
            { minHeight: 100.0 # vh
            , minWidth: 100.0 # vw
            }
    , ":root":
      nested $ variables
        <> fontVariables { main: "Inter, system-ui, sans-serif", mono: "Victor Mono, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console" }
    , html:
      nested
        $ css
            { boxSizing: str "border-box"
            }
    , body:
      nested
        $ css
            { fontFamily: str "var(--mainFont)"
            , background: str colour.background0
            , color: str colour.text
            , margin: str "0"
            }
        <> colourTheme defaultColours
    , "pre,code":
      nest
        { fontFamily: str "var(--monoFont)"
        }
    , "h1,h2,h3,h4,h5":
      nest
        { fontWeight: str "800"
        }
    , h1:
      nested $ css { fontSize: em 3.5 }
    , h2:
      nested $ css { fontSize: em 2.7 }
    , "*, *:before, *:after":
      nested
        $ css
            { boxSizing: str "inherit"
            }
    , input
    , form:
      nested
        $ css
            { backgroundColor: str colour.background07
            }
    }

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
    , interfaceBackground: lightBg
    , interfaceBackgroundHighlight: lightBg
    , interfaceBackgroundShadow: darken 0.1 lightBg
    , inputBackground: darken 0.03 lightBg
    , inputBorder: darken 0.1 lightBg
    , highlight: highlight
    , text: darkBg
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
    , interfaceBackground: lighten 0.4 darkBg
    , interfaceBackgroundHighlight: lighten 0.5 darkBg
    , interfaceBackgroundShadow: lighten 0.4 darkBg
    , inputBackground: lighten 0.10 darkBg
    , inputBorder: lighten 0.17 darkBg
    , highlight
    , text: lightBg
    }
  }
  where
    highlight = Color.rgb 0x00 0x99 0xFF

    -- highlight = Color.rgb 0x10 0x45 0x4A
    darkBg = Color.rgb 0 0 0

    lightBg = Color.rgb 255 255 255

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
  , interfaceBackground ∷ a
  , interfaceBackgroundHighlight ∷ a
  , interfaceBackgroundShadow ∷ a
  , inputBackground ∷ a
  , inputBorder ∷ a
  , highlight ∷ a
  , text ∷ a
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

colourTheme ∷ Colours -> Style
colourTheme { dark, light } = lightT
  where
    darkT ∷ Style
    darkT = unsafeCoerce darkObj

    darkObj ∷ Object StyleProperty
    darkObj =
      Object.fromHomogeneous defaultColours.dark
        # Object.foldMap \k v ->
            Object.singleton ("--" <> k) (str (Color.toHexString v))

    lightObj ∷ Object StyleProperty
    lightObj =
      Object.fromHomogeneous defaultColours.light
        # Object.foldMap \k v ->
            Object.singleton ("--" <> k) (str (Color.toHexString v))
              # Object.insert "@media (prefers-color-scheme: dark)" (nested darkT)

    lightT ∷ Style
    lightT = unsafeCoerce lightObj

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
    { "--mainFont": str $ main <> ", monospace"
    , "--monoFont": str $ mono <> ", monospace"
    }

input ∷ StyleProperty
input =
  nest
    { backgroundColor: "var(--input-bg-col)" # str
    , padding: "5px" # str
    , border: str "1px solid var(--bg-col)"
    , borderRadius: "5px" # str
    , fontSize: "12px" # str
    , paddingBottom: "4px" # str
    , paddingLeft: "8px" # str
    , "&:disabled": nest { color: str "var(--input-text-col-disabled)" }
    , "&:focus": nested inputFocus
    }

-- Standalone style for storybook
inputFocus ∷ Style
inputFocus =
  css
    { outline: none
    , border: str "1px solid var(--highlight-col)"
    }
