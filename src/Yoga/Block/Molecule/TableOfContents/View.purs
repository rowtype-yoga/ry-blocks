module Yoga.Block.Molecule.TableOfContents.View
  ( component
  , MandatoryProps
  , Props
  , PropsF
  ) where

import Yoga.Prelude.View
import Color as Color
import Data.Interpolate (i)
import Data.Maybe (isNothing)
import Debug.Trace (spy)
import Effect.Class.Console as Console
import Effect.Uncurried (EffectFn2, runEffectFn2)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion as Motion
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML (window)
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Icon.SVG as SVGIcon
import Yoga.Block.Molecule.TableOfContents.Style as Style
import Yoga.Block.Molecule.TableOfContents.Types (TableOfContentsPosition(..), flipTableOfContents)

type PropsF f
  = ( className ∷ f String
    , left ∷ f JSX
    , right ∷ f JSX
    | Style.Props f (MandatoryProps InputProps)
    )

type MandatoryProps r
  = ( items ∷ Array { label :: String, level :: Int, ref :: NodeRef }
    | r
    )

type Props
  = PropsF Id

type PropsOptional
  = PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "TableOfContents" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        lis =
          props.items
            <#> \i ->
                R.li' </ { key: i.label }
                  /> [ R.a
                        { href: "#" -- [TODO]
                        , onClick:
                          handler preventDefault
                            $ const do
                                win <- window
                                mbBb <- getBoundingBoxFromRef i.ref
                                let
                                  scrollTo :: EffectFn2 Number Number Unit
                                  scrollTo = (unsafeCoerce win).scrollTo
                                for_ mbBb \bb -> do
                                  runEffectFn2 (spy "st" scrollTo) 0.0 (spy "top" bb.top)
                        , children: [ R.text i.label ]
                        }
                    ]
      pure do
        R.ul' </ {} /> lis
