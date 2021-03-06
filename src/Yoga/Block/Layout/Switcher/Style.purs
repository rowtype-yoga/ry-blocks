module Yoga.Block.Layout.Switcher.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)
import Foreign.Object as Object
import Unsafe.Coerce (unsafeCoerce)

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , space ∷ f String
  , threshold ∷ f String
  , limit ∷ f Int
  | r
  )

switcher ∷ ∀ p. { | Props OptionalProp p } -> Style
switcher props = styles <>? props.css
  where
  limit = props.limit ?|| 4

  space = (props.space <#> \s -> if s == "0" then "0px" else s) ?|| "var(--s1)"

  threshold = props.threshold ?|| "60ch"

  lastKey ∷ String
  lastKey =
    "" -- this is for readability
      <> i "& > * > :nth-last-child(n+" (limit + 1) "), "
      <> i "& > * > :nth-last-child(n+" (limit + 1) ") ~ *"

  nthLastChild ∷ Style
  nthLastChild =
    unsafeCoerce
      (Object.singleton lastKey { flexBasis: _100percent })

  styles ∷ Style
  styles =
    nthLastChild
      <> css
          { "& > *":
            nest
              { display: flex
              , flexWrap: wrap
              , margin: i "calc((" space " / 2) * -1)" # str
              }
          , "& > * > *":
            nest
              { flexGrow: str "1"
              , flexBasis:
                i "calc((" threshold " - (100% - var(--s1))) * 999)" # str
              , margin: "calc((" <> space <> "/ 2)" # str
              }
          }
