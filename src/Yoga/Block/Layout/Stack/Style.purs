module Yoga.Block.Layout.Stack.Style where

import Yoga.Prelude.Style

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r
  = ( css ∷ f Style
    , space ∷ f StyleProperty
    , splitAfter ∷ f Int
    | r
    )

stack ∷ ∀ p. { | Props OptionalProp p } -> Style
stack props = splitStyles <> styles <>? props.css
  where
  styles =
    css
      { display: flex
      , margin: _0
      , flexDirection: column
      , justifyContent: flexStart
      , "& > *":
          nest
            { marginTop: _0
            , marginBottom: _0
            }
      , "& > * + *":
          nest
            { margin: _0
            , marginTop: props.space ?|| (1.5 # rem)
            }
      }

  splitStyles = props.splitAfter # foldMap \n -> onlyChildStyle <> nthChildStyle n
    where
    onlyChildStyle =
      css
        { "&:only-child": nest { height: 100.0 # percent }
        }

    nthChild n = "& > div:nth-of-type(" <> show n <> ")"

    nthChildStyle n = (nthChild n) ~: { marginBottom: auto }
