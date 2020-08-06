module Components.Cluster.Style where

import Prelude.Style

type Props f r =
  ( css ∷ f Style
  , space ∷ f String
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
            , alignItems: center
            , justifyContent: flexStart
            , margin: "calc(" <> props.space ?|| "1rem" <> "/2 * -1)" # str
            }
        , "& > * > *":
          nest
            { margin: "calc(" <> (props.space ?|| "1rem") <> "/2)" # str
            }
        }
