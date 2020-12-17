module Yoga.Block.Atom.Toggle.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  , backgroundOn ∷ f Color
  , backgroundOff ∷ f Color
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

theToggle ∷ ∀ p. { | Props OptionalProp p } -> Style
theToggle props =
  css
    { width: var "--s2"
    , height: var "--s2"
    , background: str $ colour.interfaceBackground
    , border: none
    , borderRadius: str $ "calc(var(--s2) / 2)"
    , position: absolute
    , top: str "-1px"
    , left: _0
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
    , lineHeight: var "--s2"
    , height: var "--s2"
    , display: flex
    }

toggleText ∷ Style
toggleText =
  css
    { textAlign: str "left"
    , margin: _0
    , width: str "50%"
    , height: str "100%"
    , display: flex
    , justifyContent: center
    , alignItems: center
    , color: str colour.interfaceTextDisabled
    , "&:first-child":
      nest
        { color: str colour.successText
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
