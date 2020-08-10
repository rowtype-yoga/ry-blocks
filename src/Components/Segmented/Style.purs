module Components.Segmented.Style where

import Prelude.Style
import React.Basic.Emotion (inlineBlock)

type Props f r =
  ( css ∷ f Style
  | r
  )

segmented ∷ ∀ p. { | Props OptionalProp p } -> Style
segmented props = styles <>? props.css
  where
    styles =
      css
        { position: str "relative"
        , width: percent 100.0
        , height: str "var(--s0)"
        , display: inlineBlock
        , background: str "white"
        , borderWidth: _0
        }

container ∷ Style
container =
  css
    { position: relative
    , width: _100percent
    }
