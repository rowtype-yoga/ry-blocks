module Yoga.Block.Atom.Toggle.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  , backgroundLeft ∷ f Color
  , backgroundRight ∷ f Color
  | r
  )

button ∷ Style
button =
  css
    { position: relative
    , background: str colour.inputBackground
    , border: str $ "1px solid " <> colour.inputBorder
    , borderRadius: str "calc(var(--s2) / 2)"
    , height: var "--s2"
    , width: str "calc(1.15 * var(--s3))"
    , margin: _0
    , padding: _0
    }

theToggle ∷ Style
theToggle =
  css
    { width: str "calc(var(--s2) * 0.8)"
    , height: str "calc(var(--s2) * 0.8)"
    , background: str $ colour.interfaceBackground
    , border: none
    , borderRadius: str $ "calc(var(--s2) / 2)"
    , position: absolute
    , top: str "3px"
    , left: str "3px"
    , margin: _0
    , boxShadow: str "0 0.5px 3px rgba(0,0,0,0.50)"
    }

toggleTextContainer ∷ Style
toggleTextContainer =
  css
    { width: _100percent
    , border: none
    , fontWeight: str "bold"
    , position: absolute
    , top: _0
    , fontSize: str "calc(0.6 * var(--s1))"
    , lineHeight: var "--s2"
    , height: var "--s2"
    , display: flex
    }

successTextColour ∷ StyleProperty
successTextColour = str colour.successText

disabledTextColour ∷ StyleProperty
disabledTextColour = str colour.interfaceTextDisabled

toggleText ∷ Style
toggleText =
  css
    { textAlign: str "left"
    , margin: _0
    , padding: _0
    , width: str "50%"
    , height: str "100%"
    , display: flex
    , justifyContent: center
    , alignItems: center
    , color: disabledTextColour
    , "& > *":
      nest
        { color: successTextColour
        }
    }

inputDisabled ∷ Style
inputDisabled =
  css
    { "input[type=toggle]::-webkit-slider-thumb": nested thumbStyleDisabled
    , "input[type=toggle]::-moz-toggle-thumb": nested thumbStyleDisabled
    }
  where
    thumbStyleDisabled =
      css
        { background: str "#fcfcfc"
        , boxShadow: str "0 calc(var(--s-4)/2) var(--s-3) rgba(88,88,88,0.2)"
        }

disabled ∷ Style
disabled = css { backgroundColor: str colour.background30 }
