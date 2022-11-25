module Yoga.Block.Layout.Switcher.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Foreign.Object as Object
import Unsafe.Coerce (unsafeCoerce)

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , space ∷ f String
  , rowGap ∷ f String
  , threshold ∷ f String
  , limit ∷ f Int
  | r
  )

switcher ∷ ∀ p. { | Props OptionalProp p } → Style
switcher props = styles <>? props.css
  where
  limit = props.limit ?|| 4
  space = (props.space <#> \s → if s == "0" then "0px" else s) ?|| "var(--s1)"
  rowGap = props.rowGap ?|| space
  threshold = props.threshold ?|| "60ch"

  lastKey ∷ String
  lastKey =
    i "& > * > :nth-last-child(n+" (limit + 1) "), "
      ("& > * > :nth-last-child(n+")
      (limit + 1)
      ") ~ *"

  nthLastChild ∷ Style
  nthLastChild = unsafeCoerce $
    Object.singleton lastKey
      { flexBasis: _100percent }

  styles ∷ Style
  styles =
    css
      { display: str "flex"
      , flexWrap: str "wrap"
      , gap: str space
      , rowGap: str rowGap
      , "--threshold": str threshold
      , "& > *": nested $ css
          { flexGrow: int 1
          , flexBasis: str "calc((var(--threshold) - 100%) * 999)"
          }
      }
      <> nthLastChild
