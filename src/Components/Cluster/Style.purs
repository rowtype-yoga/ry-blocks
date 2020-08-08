module Components.Cluster.Style where

import Prelude.Style

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
    styles =
      css
        { "& > *":
          nest
            { display: flex
            , flexWrap: wrap
            , alignItems: (str <$> props.align) ?|| center
            , justifyContent: (str <$> props.justify) ?|| flexStart
            , margin: "calc(" <> props.space ?|| "var(--s1)" <> "/2 * -1)" # str
            }
        , "& > * > *":
          nest
            { margin: "calc(" <> props.space ?|| "var(--s1)" <> "/2)" # str
            }
        }
