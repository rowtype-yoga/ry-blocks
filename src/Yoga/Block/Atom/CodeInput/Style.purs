module Yoga.Block.Atom.CodeInput.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Untagged.Castable (cast)
import Yoga.Block.Container.Style (colour)

type Props f r =
  ( css ∷ f Style
  | r
  )

codeInput ∷ ∀ p. { maxLength ∷ Int | Props Id p } -> Style
codeInput props = styles <>? cast props.css
  where
    styles =
      css
        { overflow: visible
        , boxSizing: borderBox
        , verticalAlign: baseline
        , background: str colour.inputBackground
        , border: str $ i "solid 1px " colour.inputBorder
        , borderRadius: str "var(--s-2)"
        , fontFamily: str "var(--mono-font)"
        , fontSize: str "var(--s0)"
        , lineHeight: str "var(--s0)"
        , width: str $ i "calc(" (cast props.maxLength ?|| 10) "ch + 4.3 * var(--s-5))"
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
