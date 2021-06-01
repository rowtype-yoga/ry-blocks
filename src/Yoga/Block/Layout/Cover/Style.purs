module Yoga.Block.Layout.Cover.Style where

import Yoga.Prelude.Style

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r
  = ( css ∷ f Style
    , padding ∷ f StyleProperty
    , margin ∷ f StyleProperty
    , minHeight ∷ f StyleProperty
    | r
    )

defaultMargin :: StyleProperty
defaultMargin = 1.0 # rem

cover ∷ ∀ p. { | Props OptionalProp p } -> Style
cover props = styles <>? props.css
  where
  padding = props.padding ?|| _0
  minHeight = props.minHeight ?|| (100.0 # percent)
  styles =
    css
      { display: flex
      , flexDirection: column
      , minHeight
      , padding
      }

header ∷  ∀ p. { | Props OptionalProp p } -> Style
header props = css { marginTop: _0, marginBottom: props.margin ?|| defaultMargin }

main ∷ Style
main = css { marginTop: auto, marginBottom: auto }

footer ∷ ∀ p. { | Props OptionalProp p } -> Style
footer props = css { marginBottom: _0, marginTop: props.margin ?|| defaultMargin }

invisible :: Style
invisible  = css { visibility: hidden }