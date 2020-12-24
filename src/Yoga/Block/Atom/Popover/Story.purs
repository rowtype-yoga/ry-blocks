module Yoga.Block.Atom.Popover.Story where

import Prelude
import Data.Array as Array
import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..))
import Data.String as String
import Data.String.NonEmpty.Internal (nes)
import Data.Symbol (SProxy(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion (animateSharedLayout)
import Framer.Motion as Motion
import React.Basic (JSX, ReactComponent, element, fragment)
import React.Basic.DOM (CSS, css)
import React.Basic.DOM as R
import React.Basic.DOM.Events (targetValue)
import React.Basic.Emotion as E
import React.Basic.Events (handler, handler_)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Yoga ((/>), (</), (</>))
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Atom.Input.Placement.Types (Placement(..))
import Yoga.Block.Atom.Input.Placement.Types as Placement
import Yoga.Block.Atom.Input.Types as HTMLInput
import Yoga.Block.Atom.Popover as Popover
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Layout.Stack as Stack

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Popover"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

itemVariants ∷
  { hidden ∷ CSS
  , visible ∷ CSS
  }
itemVariants =
  { visible:
    css
      { left: 0
      }
  , hidden:
    css
      { left: -20
      }
  }

containerVariants ∷
  { hidden ∷ CSS
  , visible ∷ CSS
  }
containerVariants =
  { visible:
    css
      { transition: { when: "beforeChildren" }
      , staggerChildren: 0.3
      , opacity: 0
      }
  , hidden:
    css
      { transition: { when: "afterChildren" }
      }
  }

containerVariant ∷
  { hidden ∷ Motion.VariantLabel
  , visible ∷ Motion.VariantLabel
  }
containerVariant = Motion.makeVariantLabels containerVariants

popover ∷ Effect JSX
popover = do
  autosuggest <- mkAutosuggest
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Autosuggest" ]
            , autosuggest </> {}
            ]
        ]
  where
  mkAutosuggest ∷ Effect (ReactComponent {})
  mkAutosuggest = do
    motionStack <- Motion.custom Stack.component
    reactComponent "PopoverExample" \props -> React.do
      text /\ setText <- React.useState' ""
      visible /\ setVisible <- React.useState' false
      let
        matchingAuthors =
          authors
            # Array.filter (\a -> String.contains (String.Pattern (String.toLower text)) (String.toLower a))
      let
        target =
          Input.component
            </> { type: HTMLInput.Text
              , id: "author"
              , label: nes (SProxy ∷ _ "Author")
              , placeholder: "e.g. William Shakespeare"
              , value: text
              , onChange: handler targetValue $ traverse_ setText
              , onBlur: handler_ (setVisible false)
              , onFocus: handler_ (setVisible true)
              }
        pop =
          Popover.component
            </ { target
              , placement: Placement Placement.Bottom (Just Placement.Start)
              }
        box =
          Box.component
            </ { style:
                css
                  { background: "rgba(128, 128, 128, 0.5)"
                  , borderRadius: "5px"
                  }
              }
        stack =
          motionStack
            </ Motion.motion
                { variants: Motion.variants containerVariants
                , animate: Motion.animate (if visible then containerVariant.visible else containerVariant.hidden)
                , layout: Motion.layout true
                }
                {}
        entry a =
          Motion.div
            </ { key: a
              , layout: Motion.layout true
              , variants: Motion.variants itemVariants
              }
            /> [ R.text a ]
      pure
        $ fragment
            [ pop
                [ box
                    [ animateSharedLayout </ {} /> [ stack (entry <$> matchingAuthors) ]
                    ]
                ]
            ]

  authors =
    [ "William Shakespeare"
    , "Agatha Christie"
    , "Barbara Cartland"
    , "Danielle Steel"
    , "Harold Robbins"
    , "Georges Simenon"
    , "Enid Blyton"
    , "Sidney Sheldon"
    , "J. K. Rowling"
    , "Gilbert Patten"
    , "Dr. Seuss"
    , "Eiichiro Oda"
    , "Leo Tolstoy"
    , "Corín Tellado"
    , "Jackie Collins"
    , "Horatio Alger"
    , "R. L. Stine"
    , "Dean Koontz"
    , "Nora Roberts"
    , "Alexander Pushkin"
    , "Stephen King"
    , "Paulo Coelho"
    , "Jeffrey Archer"
    , "Louis L'Amour"
    , "Jirō Akagawa"
    , "René Goscinny"
    , "Erle Stanley Gardner"
    , "Edgar Wallace"
    , "Jin Yong"
    , "Janet Dailey"
    , "Robert Ludlum"
    , "Akira Toriyama"
    , "Osamu Tezuka"
    , "James Patterson"
    , "Frédéric Dard"
    , "Stan and Jan Berenstain"
    , "Roald Dahl"
    , "John Grisham"
    , "Zane Grey"
    , "Irving Wallace"
    , "J. R. R. Tolkien"
    , "Masashi Kishimoto"
    , "Karl May"
    , "Carter Brown"
    , "Mickey Spillane"
    , "C. S. Lewis"
    , "Kyotaro Nishimura"
    , "Mitsuru Adachi"
    , "Rumiko Takahashi"
    , "Gosho Aoyama"
    , "Dan Brown"
    , "Ann M. Martin"
    , "Ryōtarō Shiba"
    , "Arthur Hailey"
    , "Gérard de Villiers"
    , "Beatrix Potter"
    , "Michael Crichton"
    , "Richard Scarry"
    , "Clive Cussler"
    , "Alistair MacLean"
    , "Ken Follett"
    , "Astrid Lindgren"
    , "Debbie Macomber"
    , "EL James"
    , "Tite Kubo"
    , "Eiji Yoshikawa"
    , "Catherine Cookson"
    , "Stephenie Meyer"
    , "Norman Bridwell"
    , "David Baldacci"
    , "Nicholas Sparks"
    , "Hirohiko Araki"
    , "Evan Hunter"
    , "Andrew Neiderman"
    , "Roger Hargreaves"
    , "Anne Rice"
    , "Robin Cook"
    , "Wilbur Smith"
    , "Erskine Caldwell"
    , "Judith Krantz"
    , "Eleanor Hibbert"
    , "Lewis Carroll"
    , "Denise Robins"
    , "Cao Xueqin"
    , "Ian Fleming"
    , "Hermann Hesse"
    , "Rex Stout"
    , "Anne Golon"
    , "Frank G. Slaughter"
    , "Edgar Rice Burroughs"
    , "John Creasey"
    , "James A. Michener"
    , "Yasuo Uchida"
    , "Seiichi Morimura"
    , "Mary Higgins Clark"
    , "Penny Jordan"
    , "Patricia Cornwell"
    ]
