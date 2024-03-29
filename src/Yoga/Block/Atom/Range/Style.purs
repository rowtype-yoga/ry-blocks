module Yoga.Block.Atom.Range.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Yoga.Block.Container.Style (colour)

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  | r
  )

range ∷ ∀ p. { | Props OptionalProp p } → Style
range props = styles <>? props.css
  where
  styles =
    inlineBlock <>
      css
        { position: str "relative"
        , height: str "var(--s0)"
        , boxSizing: borderBox
        }

container ∷ Style
container =
  css
    { position: relative
    , "input[type=range]":
        nest
          { appearance: none
          , background: str "transparent"
          , margin: _0
          , padding: _0
          , width: _100percent
          , height: str "var(--s0)"
          }
    , "input[type=range]:focus":
        nest
          { outline: none
          , border: none
          }
    , "input[type=range]::-webkit-slider-thumb": nested thumbStyle
    , "input[type=range]::-moz-range-thumb": nested thumbStyle
    , "input[type=range]:focus-visible":
        nest
          { "&::-webkit-slider-thumb": nest
              { border: str $ i "3px solid " colour.highlight
              , boxSizing: contentBox
              }
          }
    }

thumbStyle ∷ Style
thumbStyle =
  css
    { appearance: none
    , width: str "var(--s0)"
    , height: str "var(--s0)"
    , border: none
    , borderRadius: 50.0 # percent
    , background: str "white"
    , boxShadow: str "0 calc(var(--s-4)/2) var(--s-3) rgba(70,70,70,0.6)"
    , transform: str "translateY(-1px)"
    }

inputDisabled ∷ Style
inputDisabled =
  css
    { "input[type=range]::-webkit-slider-thumb": nested thumbStyleDisabled
    , "input[type=range]::-moz-range-thumb": nested thumbStyleDisabled
    }
  where
  thumbStyleDisabled =
    css
      { background: str "#fcfcfc"
      , boxShadow: str "0 calc(var(--s-4)/2) var(--s-3) rgba(88,88,88,0.2)"
      }

focusCircle ∷ Style
focusCircle =
  css
    { width: str "var(--s0)"
    , pointerEvents: none
    , height: str "var(--s0)"
    , borderRadius: 50.0 # percent
    , left: str $ "calc(var(--val)/var(--max) * calc(100% - var(--s0)))"
    , border: str $ i "3px solid " colour.highlight
    , boxShadow: str $ i "0 0 var(--s-3) " <> colour.highlight
    , position: absolute
    , transform: str "scale(1.2)"
    , zIndex: str "12"
    }

track ∷ Style
track =
  css
    { top: str "calc((var(--s0) - var(--s-3)) / 2)"
    , height: str "var(--s-3)"
    , borderRadius: str "calc(var(--s-3)/2)"
    , position: absolute
    , boxSizing: borderBox
    }

disabled ∷ Style
disabled = css { backgroundColor: str colour.backgroundLayer2 }

filled ∷ Style
filled =
  track
    <> css
      { width: str "calc(var(--val)/var(--max) * 100%)"
      , backgroundColor: str colour.highlight
      }

notFilled ∷ Style
notFilled =
  track
    <> css
      { width: str "calc((1 - (var(--val)/var(--max))) * 100%)"
      , right: _0
      , backgroundColor: str colour.backgroundLayer4
      }
