module Yoga.Block.Molecule.TableOfContents.Story where

import Prelude
import Color as Color
import Data.Array (foldMap, intercalate, (..))
import Data.Array as Array
import Data.Either (Either(..), hush)
import Data.Foldable (for_)
import Data.Maybe (Maybe(..))
import Data.Monoid (power)
import Data.Nullable as Nullable
import Data.Traversable (for, traverse)
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Yoga.Block as Block
import Yoga.Block.Container.Style (DarkOrLightMode(..))
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal (NodeRef, createRef)
import Yoga.Block.Molecule.TableOfContents as TableOfContents
import Yoga.Block.Molecule.TableOfContents.Types (TableOfContentsPosition(..))

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
      headings /\ setHeadings <-
        React.useState'
          [ Left { level: 1, label: "Heinzel Mann" }
          , Left { level: 2, label: "Sub stuff of Heinzel Mann" }
          , Left { level: 2, label: "Subbinger stuff of Heinzel Mann" }
          , Left { level: 1, label: "Next thing" }
          , Left { level: 2, label: "Below next thing" }
          , Left { level: 4, label: "Even deeper" }
          ]
      React.useEffectOnce do
        refs <- headings # traverse (const createRef)
        setHeadings
          ( headings `Array.zip` refs
              <#> \(blurb /\ ref) -> case blurb of
                  Left { level, label } -> Right { level, label, ref }
                  done -> done
          )
        mempty
      pure
        $ ( element TableOfContents.component
              { items: headings <#> hush # Array.catMaybes
              }
              <> ( headings
                    # foldMap case _ of
                        Left { level: 1, label } -> fragment [ R.h1_ [ R.text label ], blabla 3 ]
                        Left { level: 2, label } -> fragment [ R.h2_ [ R.text label ], blabla 1 ]
                        Left { level: 3, label } -> fragment [ R.h3_ [ R.text label ], blabla 5 ]
                        Left { level: 4, label } -> fragment [ R.h4_ [ R.text label ], blabla 2 ]
                        Right { level: 1, label, ref } -> fragment [ R.h1 { ref, children: [ R.text label ] }, blabla 3 ]
                        Right { level: 2, label, ref } -> fragment [ R.h2 { ref, children: [ R.text label ] }, blabla 7 ]
                        Right { level: 3, label, ref } -> fragment [ R.h3 { ref, children: [ R.text label ] }, blabla 2 ]
                        Right { level: 4, label, ref } -> fragment [ R.h4 { ref, children: [ R.text label ] }, blabla 1 ]
                        _ -> R.text "crappy"
                )
          )

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
