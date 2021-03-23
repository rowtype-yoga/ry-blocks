module Yoga.Block.Molecule.TableOfContents.View
  ( component
  , MandatoryProps
  , Props
  , PropsF
  ) where

import Data.Tree (Forest)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML (window)
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Molecule.TableOfContents.Style as Style
import Yoga.Prelude.View (class Union, Id, InputWritableProps, JSX, NodeRef, OptionalProp, ReactComponent, bind, mkForwardRefComponent, pure, (/>), (</))

type PropsF f =
  ( className ∷ f String
  , left ∷ f JSX
  , right ∷ f JSX
  | Style.Props f (MandatoryProps InputWritableProps)
  )

type MandatoryProps r =
  ( items ∷ Forest { label ∷ String, ref ∷ NodeRef }
  | r
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p q. Union p q Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "TableOfContents" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        onClickLink top event = do
          win <- window
          (unsafeCoerce win).scrollTo
            { top, behavior: "smooth" }
      pure do
        R.div'
          </ { style:
              css
                { position: "fixed"
                , background: colour.backgroundLayer2
                , padding: 0
                , margin: 0
                }
            }
          /> [ R.div'
                </ { style:
                    css
                      { display: "flex"
                      , flexDirection: "row"
                      , alignItems: "stretch"
                      , justifyContent: "flex-start"
                      , padding: 0
                      , margin: 0
                      }
                  }
                /> [ R.text "Hi"
                  ]
            ]
