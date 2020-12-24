module Yoga.Block.Atom.Popover.Story where

import Prelude
import Data.Array as Array
import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..))
import Data.Monoid (guard)
import Data.String as String
import Data.String.NonEmpty.Internal (nes)
import Data.Symbol (SProxy(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Uncurried (mkEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion (animatePresence)
import Framer.Motion as Motion
import React.Basic (JSX, ReactComponent, element, elementKeyed, fragment)
import React.Basic.DOM (CSS, css)
import React.Basic.DOM as R
import React.Basic.DOM.Events (targetValue)
import React.Basic.Emotion as E
import React.Basic.Events (handler, handler_)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import React.Basic.Popper.Types (nullRef)
import Unsafe.Coerce (unsafeCoerce)
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
    motionPopover <- Motion.custom Popover.component
    reactComponent "PopoverExample" \props -> React.do
      referenceElement /\ setReferenceElement <- React.useState' nullRef
      text /\ setText <- React.useState' ""
      visible /\ setVisible <- React.useState' false
      let
        matchingAuthors =
          authors
            # Array.filter (\a -> String.contains (String.Pattern (String.toLower text)) (String.toLower a))
      let
        inputWrapper =
          R.div'
            </ { ref: unsafeCoerce (mkEffectFn1 setReferenceElement)
              }
        input =
          Input.component
            </> { id: "author"
              , type: HTMLInput.Text
              , label: nes (SProxy ∷ _ "Author")
              , placeholder: "e.g. William Shakespeare"
              , value: text
              , style: css { width: "280px" }
              , onChange: handler targetValue $ traverse_ setText
              , onBlur: handler_ (setVisible false)
              , onFocus: handler_ (setVisible true)
              , trailing: R.text "▼"
              , autoComplete: "off"
              }
        pop children =
          elementKeyed motionPopover
            $ Motion.motion
                { initial: Motion.initial $ css { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }
                , exit: Motion.exit $ css { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }
                , animate: Motion.animate $ css { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
                , transition:
                  Motion.transition
                    $ { type: "spring"
                      , stiffness: 200.0
                      , damping: 20.0
                      , mass: 0.7
                      }
                }
                { placement: Placement Placement.Bottom (Just Placement.Start)
                , referenceElement
                , style:
                  css
                    { boxShadow: "0px 9px 12px rgba(40,40,40,0.5)"
                    , background: "rgba(50,50,70, 0.7)"
                    , borderRadius: "9px"
                    , borderTop: "solid 1px rgba(80,80,100,1.0)"
                    , overflowY: "scroll"
                    , maxHeight: "400px"
                    , width: "300px"
                    }
                , key: "popover"
                , children
                }
        box =
          Box.component
            </ { style:
                css
                  {}
              }
        stack =
          motionStack
            </ Motion.motion {}
                -- { variants: Motion.variants containerVariants
                -- , animate: Motion.animate (if visible then containerVariant.visible else containerVariant.hidden)
                -- , layout: Motion.layout true
                -- }
                {}
        entry a =
          Motion.div
            </ { key: a
              -- , layout: Motion.layout true
              -- , variants: Motion.variants itemVariants
              }
            /> [ R.text a ]
      pure
        $ fragment
            [ inputWrapper [ input ]
            , animatePresence
                </ {}
                /> [ guard visible
                      $ pop
                          [ box
                              [ stack (entry <$> matchingAuthors)
                              ]
                          ]
                  ]
            ]
    where
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
          , opacity: 1
          }
      , hidden:
        css
          { transition: { when: "afterChildren" }
          , opacity: 0
          }
      }

    containerVariant ∷
      { hidden ∷ Motion.VariantLabel
      , visible ∷ Motion.VariantLabel
      }
    containerVariant = Motion.makeVariantLabels containerVariants

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
