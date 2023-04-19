module Yoga.Block.Layout.Cluster.Style where

import Yoga.Prelude.Style

import Yoga.Block.Layout.Types (AlignItems, JustifyContent, alignToString, justifyToString)

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( css ∷ f Style
  , space ∷ f String
  , rowSpace ∷ f String
  , justifyContent ∷ f JustifyContent
  , alignItems ∷ f AlignItems
  , justify ∷ f String
  , align ∷ f String
  | r
  )

cluster ∷ ∀ p. { | Props OptionalProp p } → Style
cluster props = styles <>? props.css
  where
  space = (props.space <#> \x → if x == "0" then "0px" else x) ?|| "var(--s1)"

  styles =
    css
      { display: str "flex"
      , flexWrap: wrap
      , alignItems: ((str <<< alignToString) <$> props.alignItems)
          ?|| (str <$> props.align)
          ?|| center
      , justifyContent: ((str <<< justifyToString) <$> props.justifyContent)
          ?|| (str <$> props.justify)
          ?|| flexStart
      , gap: str space
      , rowGap: (str <$> props.rowSpace) ?|| str space
      }
