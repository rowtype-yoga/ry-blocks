module Yoga.Block.Layout.Imposter.Style where

import Yoga.Prelude.Style
import Data.Interpolate (i)

type Props f r =
  ( css ∷ f Style
  , margin ∷ f String
  , fixed ∷ f Boolean
  , breakout ∷ f Boolean
  | r
  )

imposter ∷ ∀ p. { | Props OptionalProp p } -> Style
imposter props = styles <>? props.css
  where
    styles =
      css
        { position: (props.fixed <#> if _ then fixed else absolute) ?|| absolute
        , top: 50.0 # percent
        , left: 50.0 # percent
        , transform: str "translate(-50%,-50%)"
        , zIndex: str "5"
        , "&:.contain":
          nest
            { overflow: auto
            , maxWidth: str $ i "calc(100% - (" (getOr "0px" props.margin) " * 2))"
            , maxHeight: str $ i "calc(100% - (" (getOr "0px" props.margin) " * 2))"
            }
        }
