module Yoga.Block.Molecule.TableOfContents.Story where

import Prelude
import Control.Comonad.Cofree as Cofree
import Data.Array (foldMap)
import Data.Array as Array
import Data.Either (Either(..), hush)
import Data.Foldable (fold)
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.List ((:))
import Data.List as List
import Data.List.Lazy (Step(..))
import Data.Maybe (Maybe(..))
import Data.Monoid (power)
import Data.Traversable (for_, sequence, traverse)
import Data.Tree (Forest, Tree, mkLeaf, mkTree)
import Data.Tree.Zipper (fromTree)
import Data.Tree.Zipper as Zipper
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Yoga ((/>), (</), (</>))
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal (createRef)
import Yoga.Block.Molecule.TableOfContents as TableOfContents

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Molecule/TableOfContents"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

tableOfContents ∷ Effect JSX
tableOfContents = do
  example <- mkBasicExample
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Table of Contents" ]
            , element example {}
            ]
        ]
  where
  mkBasicExample =
    React.reactComponent "TableOfContents example" \p -> React.do
      let
        startHeadings ∷ Forest { label ∷ String }
        startHeadings =
          [ mkTree { label: "Heading 1" }
              [ mkTree { label: "SubHeading 1" }
                  [ mkLeaf { label: "SubsubHeading 1.1" }
                  , mkLeaf { label: "SubsubHeading 1.2" }
                  ]
              ]
          , mkTree { label: "Heading 2" } []
          ]
      (tocData ∷ (Forest ({ label ∷ String, ref ∷ _ }))) /\ setTocData <- React.useState' []
      React.useEffectOnce do
        (newHeadings ∷ Forest { label ∷ String, ref ∷ _ }) <-
          startHeadings
            # (traverse >>> traverse) \{ label } -> do
                createRef # map { label, ref: _ }
        setTocData newHeadings
        mempty
      pure do
        let toc = element TableOfContents.component { items: tocData }
        let
          treeToHeading ∷ Tree _ -> JSX
          treeToHeading = go 1
            where
            go ∷ Int -> Tree _ -> JSX
            go depth tree = case Cofree.head tree, Cofree.tail tree of
              { label, ref }, children -> do
                let
                  heading = case depth of
                    1 -> R.h1'
                    2 -> R.h2'
                    3 -> R.h3'
                    _ -> R.h4'
                (fragment [ heading </ { ref } /> [ R.text label ], blabla depth ])
                  <> foldMap (go (depth + 1)) children
          content ∷ Array JSX
          content = tocData <#> treeToHeading
        toc <> fold content

blabla ∷ Int -> JSX
blabla n =
  R.p_
    [ R.text
        ( n
            # power
                """
  As a follow up to my post about Zippers for lists and binary trees, I wanted to create a zipper for a slightly more complex data structure. The Rose Tree is a tree structure where the number of branches a node may have is variable. An example of a rose tree would be the directory structure on your computer: each directory may contain 0 or more sub directories which, in turn, may contain addition subdirectories. With this example in mind, the zipper is analagous to you moving through your computers file system: starting at the root directory and using cd to move down a branch and cd .. to move back.
  """
        )
    ]
