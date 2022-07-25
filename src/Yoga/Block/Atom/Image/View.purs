module Yoga.Block.Atom.Image.View where

import Yoga.Prelude.View

import Effect.Unsafe (unsafePerformEffect)
import React.Basic.DOM (unsafeCreateDOMComponent)
import Yoga.Block.Atom.Image.FFI (setFallbackImgSrc)
import Yoga.Block.Atom.Image.Style as Style
import Yoga.Block.Atom.Image.Types (CrossOrigin, Decoding, Loading, ReferrerPolicy)

type PropsF :: forall k. (Type -> k) -> Row k -> Row k
type PropsF f r =
  ( alt :: f (Maybe String)
  , decoding :: f Decoding
  , loading :: f Loading
  , onLoad :: f EventHandler
  , crossOrigin :: f CrossOrigin
  , referrerPolicy :: f ReferrerPolicy
  , width :: f Int
  , height :: f Int
  , fallbackSrc :: f String
  , sizes :: f (Array String)
  , srcset :: f (Array String)
  | Style.Props f r
  )

type PropsNoChildren = PropsF Id ()

type Props =
  PropsF Id (src :: String)

type PropsOptional =
  PropsF OptionalProp ()

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent = mkForwardRefComponent "Image" do
  \(props :: { | PropsF OptionalProp Props }) ref -> pure
    $ img
    </*>
      ( { className: "ry-img"
        , css: Style.style props
        , referrerPolicy: props.referrerPolicy
        , decoding: props.decoding
        , loading: props.loading
        , crossOrigin: props.crossOrigin
        , width: props.width <#> show
        , height: props.height <#> show
        , alt: props.alt <#> fromMaybe ""
        , onError: props.fallbackSrc <#>
            \src -> handler target (setFallbackImgSrc src)
        , sizes: props.sizes <#> intercalate ","
        , src: props.src
        , srcset: props.srcset <#> intercalate ","
        , onLoad: props.onLoad
        , ref
        } # deleteUndefineds
      )
  where
  img = unsafePerformEffect
    $ unsafeCreateDOMComponent "img"
