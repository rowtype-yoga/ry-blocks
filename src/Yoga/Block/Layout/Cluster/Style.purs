module Yoga.Block.Layout.Cluster.Style where

import Yoga.Prelude.Style

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , space ∷ f String
  , justify ∷ f String
  , align ∷ f String
  | r
  )

cluster ∷ ∀ p. { | Props OptionalProp p } -> Style
cluster props = styles <>? props.css
  where
  space = (props.space <#> \x -> if x == "0" then "0px" else x) ?|| "var(--s1)"

  styles =
    css
      { "& > *":
        nest
          { display: flex
          , flexWrap: wrap
          , alignItems: (str <$> props.align) ?|| center
          , justifyContent: (str <$> props.justify) ?|| flexStart
          , margin: "calc(" <> space <> " / 2 * -1)" # str
          }
      , "& > * > *":
        nest
          { margin: "calc(" <> space <> " / 2)" # str
          }
      }
