module Components.Container.Style where

import Prelude.Style

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
      nested
        $ css
            { "--white": "#f7f4f0" # str
            , "--black": "#020207" # str
            , "--bg-col": "var(--white)" # str
            , "--input-col": "rgb(200,200,200)" # str
            , "--border-col": "rgb(118,118,118)" # str
            , "--text-col": "var(--black)" # str
            , "@media (prefers-color-scheme: dark)":
              nest
                { "--bg-col": "var(--black)" # str
                , "--input-col": "rgb(43,43,43)" # str
                , "--border-col": "rgb(195,195,195)" # str
                , "--text-col": "var(--white)" # str
                }
            }
        <> variables
    , html:
      nested
        $ css
            { boxSizing: str "border-box"
            }
    , body:
      nested
        $ css
            { fontFamily: str "Inter, system-ui, sans-serif"
            , background: str "var(--bg-col)"
            , color: str "var(--text-col)"
            , margin: str "0"
            }
        <> colourTheme defaultColours
    , "h1,h2,h3,h4,h5":
      nest
        { fontWeight: str "800"
        }
    , h1:
      nested
        $ css
            { fontSize: em 3.5
            }
    , h2:
      nested
        $ css
            { fontSize: em 2.7
            }
    , "*, *:before, *:after":
      nested
        $ css
            { boxSizing: str "inherit"
            }
    , input
    }

defaultColours ∷ Colours
defaultColours =
  { light:
    { background: "#FEFEFE"
    , highlight: "#0099FF"
    , text: "#333333"
    , input:
      { background: "#DDD"
      , textDisabled: "#999999"
      , backgroundDisabled: "#F0F0F0"
      }
    }
  , dark:
    { background: "#111"
    , highlight: "#0099FF"
    , text: "#FFE9D7"
    , input:
      { background: "#444444"
      , textDisabled: "#666"
      , backgroundDisabled: "#222"
      }
    }
  }

type ColoursVariant =
  { background ∷ String
  , highlight ∷ String
  , text ∷ String
  , input ∷
    { background ∷ String
    , textDisabled ∷ String
    , backgroundDisabled ∷ String
    }
  }

type Colours =
  { dark ∷ ColoursVariant
  , light ∷ ColoursVariant
  }

colourTheme ∷ Colours -> Style
colourTheme { dark, light } =
  css
    -- Dark
    { "--bg-col-inverted": dark.background # str
    , "--text-col-inverted": dark.text # str
    , "--highlight-col-inverted": dark.highlight # str
    , "--input-bg-col-inverted": dark.input.background # str
    , "--input-bg-col-disabled-inverted": dark.input.backgroundDisabled # str
    , "--input-text-col-disabled-inverted": dark.input.textDisabled # str
    -- Light
    , "--bg-col": light.background # str
    , "--text-col": light.text # str
    , "--highlight-col": light.highlight # str
    , "--input-bg-col": light.input.background # str
    , "--input-bg-col-disabled": light.input.backgroundDisabled # str
    , "--input-text-col-disabled": light.input.textDisabled # str
    , "@media (prefers-color-scheme: dark)":
      nest
        { "--bg-col-inverted": light.background # str
        , "--text-col-inverted": light.text # str
        , "--highlight-col-inverted": light.highlight # str
        , "--input-bg-col-inverted": light.input.background # str
        , "--input-bg-col-disabled-inverted": light.input.backgroundDisabled # str
        , "--input-text-col-disabled-inverted": light.input.textDisabled # str
        -- Light
        , "--bg-col": dark.background # str
        , "--text-col": dark.text # str
        , "--highlight-col": dark.highlight # str
        , "--input-bg-col": dark.input.background # str
        , "--input-bg-col-disabled": dark.input.backgroundDisabled # str
        , "--input-text-col-disabled": dark.input.textDisabled # str
        }
    }

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
