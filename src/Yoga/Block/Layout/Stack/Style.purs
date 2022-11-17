module Yoga.Block.Layout.Stack.Style where

import Yoga.Prelude.Style

import Data.Interpolate (i)

type Props ∷ forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , space ∷ f StyleProperty
  , splitAfter ∷ f Int
  | r
  )

stack ∷ ∀ p. { | Props OptionalProp p } -> Style
stack props = splitStyles <> styles <>? props.css
  where
  styles =
    flexCol <>
      css
        { margin: _0
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

    -- This is really n-th child, but emotion has trouble with it so we hack it as per
    -- https://github.com/emotion-js/emotion/issues/1105#issuecomment-1126025608
    nthChild n = i "& > :nth-of-type(" n "):not(style):not(:nth-of-type(" n ") ~ *), & > style + *"

    nthChildStyle n = (nthChild n) ~: { marginBottom: auto }
