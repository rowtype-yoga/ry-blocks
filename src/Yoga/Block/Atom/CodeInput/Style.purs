module Yoga.Block.Atom.CodeInput.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)
import Data.Interpolate (i)
import Untagged.Coercible (class Coercible, coerce)

type Props f r =
  ( css ∷ f Style
  , padding ∷ f StyleProperty
  , borderWidth ∷ f String
  , invert ∷ f Boolean
  | r
  )

codeInput ∷ ∀ p c. Coercible c (OptionalProp Int) => { maxLength ∷ c | Props OptionalProp p } -> Style
codeInput props = styles <>? props.css
  where
    styles =
      css
        { overflow: visible
        , boxSizing: borderBox
        , verticalAlign: baseline
        , background: str colour.inputBackground
        , border: str $ i "solid 1px " colour.inputBorder
        , borderRadius: str "var(--s-2)"
        , fontFamily: str "var(--monoFont)"
        , fontSize: str "var(--s0)"
        , lineHeight: str "var(--s0)"
        , width: str $ i "calc(" (coerce (props.maxLength) ?|| 10) "ch + 4.3 * var(--s-5))"
        , padding: str "calc(var(--s-5) - 1px)"
        , color: str colour.text
        , "&:focus":
          nest
            { animation: plopAnimation <> str " 260ms ease-in"
            , border: str $ "solid var(--s-5) " <> colour.highlight
            , padding: _0
            }
        }

plopAnimation ∷ StyleProperty
plopAnimation =
  keyframes
    $ { "from": css { transform: str "scale3d(0.85,0.85,0.85)" }
      , "33%": css { transform: str "scale3d(1.07,1.07,1.07)" }
      , "67.7%": css { transform: str "scale3d(0.93,0.93,0.93)" }
      , "86.7%": css { transform: str "scale3d(1.02,1.02,1.02)" }
      , "to": css { transform: str "scale3d(1,1,1)" }
      }

codeInputWrapper ∷ Style
codeInputWrapper =
  css
    { display: inlineBlock
    }
