module Yoga.Block.Molecule.TableOfContents.View
  ( component
  , MandatoryProps
  , Props
  , PropsF
  ) where

import Yoga.Prelude.View
import Data.Array as Array
import Data.Int as Int
import Data.Traversable (traverse)
import Debug.Trace (spy)
import Framer.Motion as M
import Framer.Motion.Hook (useSpringWithMotionValue, useTransform, useViewportScroll)
import Hooks.UseResize (useResize)
import MotionValue as MotionValue
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML (window)
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Layout.Cluster as Cluster
import Yoga.Block.Molecule.TableOfContents.Style as Style

type PropsF f =
  ( className ∷ f String
  , left ∷ f JSX
  , right ∷ f JSX
  | Style.Props f (MandatoryProps InputProps)
  )

type MandatoryProps r =
  ( items ∷ Array { label ∷ String, level ∷ Int, ref ∷ NodeRef }
  | r
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "TableOfContents" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      { scrollYProgress, scrollY } <- useViewportScroll
      (mbBoundingBoxes ∷ Maybe (Array DOMRect)) /\ setBoundingBoxes <- useState' Nothing
      viewport <- useResize
      useEffect (props.items # map _.label) do
        scrollYValue <- MotionValue.get scrollY
        boundingBoxes ∷ Array DOMRect <-
          props.items
            # traverse (getBoundingBoxFromRef <<< _.ref)
            # map Array.catMaybes
            # map (map \bb -> bb { top = bb.top + scrollYValue })
        let amount = Array.length boundingBoxes
        when
          ( amount == Array.length props.items && (amount > 0)
          ) do
          setBoundingBoxes $ Just $ spy "bbs" boundingBoxes
        mempty
      let
        boundingBoxes = fold mbBoundingBoxes
        total = Array.length boundingBoxes
        firstArray =
          if total <= 2 then
            [ 0.0, 0.9 ]
          else
            boundingBoxes
              # map (_.top)
        secondArray =
          if total <= 2 then
            [ 0.0, 1.0 ]
          else
            boundingBoxes
              # mapWithIndex
                  (\i _ -> Int.toNumber i / Int.toNumber total)
        firstArray' =
          if total <= 2 then
            [ 0.0, 0.9 ]
          else
            boundingBoxes # map (_.top) # Array.drop 1
        secondArray' =
          if total <= 2 then
            [ 0.0, 1.0 ]
          else
            boundingBoxes
              # mapWithIndex
                  (\i _ -> Int.toNumber i / Int.toNumber total)
              # Array.drop 1
      yRange <- useTransform scrollY firstArray secondArray Nothing
      pathOffset <- useSpringWithMotionValue yRange { stiffness: 400, damping: 90 }
      yRange' <- useTransform scrollY firstArray' secondArray' Nothing
      pathLength <- useSpringWithMotionValue yRange' { stiffness: 400, damping: 90 }
      let
        onClickLink top event = do
          win <- window
          (unsafeCoerce win).scrollTo
            { top, behavior: "smooth" }
        lis =
          Array.zip props.items (fold mbBoundingBoxes)
            # map \(item@{ label } /\ boundingBox) ->
                M.element M.li
                  { key: label
                  , children:
                    [ R.a'
                        </ { href: "#" <> item.label
                          , onClick:
                            handler
                              (preventDefault <<< stopPropagation)
                              (onClickLink boundingBox.top)
                          }
                        /> [ R.text label ]
                    ]
                  }
      pure do
        R.div'
          </ { style:
              css
                { position: "fixed"
                , background: "black"
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
                /> [ R.div'
                      </ { style:
                          css
                            { alignSelf: "stretch"
                            , flexGrow: "1"
                            , width: "var(--s-4)"
                            }
                        }
                      /> [ SVG.svg
                            { viewBox: "0 0 10 100"
                            , xmlns: "http://www.w3.org/2000/svg"
                            , fillRule: "evenodd"
                            , preserveAspectRatio: "none"
                            , height: "100%"
                            , width: "100%"
                            , clipRule: "evenodd"
                            , strokeLinejoin: "round"
                            , strokeMiterlimit: "1.5"
                            , children:
                              [ SVG.path'
                                  </> { d: "M5 0v100"
                                    , stroke: colour.interfaceTextDisabled
                                    , strokeWidth: "5"
                                    }
                              , M.path
                                  </> { d: "M5 0v100"
                                    , style: css { pathLength, pathOffset }
                                    , stroke: colour.highlight
                                    , strokeWidth: "10"
                                    }
                              ]
                            }
                        ]
                  , R.ul'
                      </ { style: css { margin: 0, padding: 0, paddingLeft: 30 } }
                      /> lis
                  ]
            ]
