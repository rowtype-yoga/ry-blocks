module Yoga.Block.Molecule.TableOfContents.Style where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (colour)

type Props f r
  = ( css ∷ f Style
    , backgroundLeft ∷ f Color
    , backgroundRight ∷ f Color
    | r
    )

button ∷ Style
button =
  css
    { position: relative
    , "&:focus": nest { outline: str "none" }
    , border: str $ "1px solid " <> colour.backgroundLayer2
    , "&:focus-visible":
      nest
        { boxShadow: str $ "0 0 0 var(--s-4) " <> colour.highlight
        }
    , borderRadius: str "calc(var(--s2) / 2)"
    , height: var "--s2"
    , width: str "calc(var(--s2) + var(--s1))"
    , margin: _0
    , padding: _0
    }

tableOfContentsLeft ∷ String
tableOfContentsLeft = "calc(var(--s-2) * 0.3)"

dragWidthDelta ∷ Number
dragWidthDelta = 10.0

theTableOfContents ∷ Style
theTableOfContents =
  css
    { width: str "calc(var(--s2) * 0.85)"
    , height: str "calc(var(--s2) * 0.85)"
    , background: str $ colour.backgroundLayer4
    , border: none
    , borderRadius: str $ "calc(var(--s2) / 2)"
    , position: absolute
    , top: str "calc(var(--s-2) * 0.35)"
    , left: str tableOfContentsLeft
    , margin: _0
    , boxShadow: str "0 0.5px 3px rgba(0,0,0,0.50)"
    }

tableOfContentsTextContainer ∷ Style
tableOfContentsTextContainer =
  css
    { width: _100percent
    , border: none
    , fontWeight: str "bold"
    , position: absolute
    , top: str "1px"
    , fontSize: str "calc(var(--s2)*0.5)"
    , lineHeight: str "calc(var(--s2)*0.5)"
    , textAlign: center
    , height: var "--s2"
    , display: flex
    , justifyContent: center
    , alignItems: center
    , margin: _0
    , padding: _0
    }

successTextColour ∷ StyleProperty
successTextColour = str colour.successText

disabledTextColour ∷ StyleProperty
disabledTextColour = str colour.interfaceTextDisabled

tableOfContentsText ∷ Style
tableOfContentsText =
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
