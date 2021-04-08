module Yoga.Block.Atom.Popover.Story where

import Prelude
import Data.Array as Array
import Data.Foldable (for_, traverse_)
import Data.Maybe (Maybe(..), maybe)
import Data.Monoid (guard)
import Data.Nullable (null)
import Data.String as String
import Data.String.NonEmpty.Internal (nes)
import Data.Symbol (SProxy(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Uncurried (mkEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion (animatePresence)
import Framer.Motion as Motion
import React.Basic (JSX, ReactComponent, element, fragment)
import React.Basic.DOM (CSS, css)
import React.Basic.DOM as R
import React.Basic.DOM.Events (preventDefault, targetValue)
import React.Basic.Emotion (elementKeyed, str)
import React.Basic.Emotion as E
import React.Basic.Events (handler, handler_)
import React.Basic.Hooks (reactComponent, readRefMaybe)
import React.Basic.Hooks as React
import React.Basic.Popper (nullRef)
import React.Basic.Popper.Placement.Types (Placement(..))
import React.Basic.Popper.Placement.Types as Placement
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML.HTMLElement (focus)
import Web.HTML.HTMLElement as HTMLElement
import Yoga ((/>), (</), (</>))
import Yoga.Block as Block
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Atom.Input.Types as HTMLInput
import Yoga.Block.Atom.Popover as Popover
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Hook.Key as KeyCode
import Yoga.Block.Hook.UseKeyDown (useKeyDown)
import Yoga.Block.Icon.SVG as Icons
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
    motionCluster <- Motion.custom Block.cluster
    motionPopover <- Motion.custom Popover.component
    reactComponent "PopoverExample" \props -> React.do
      referenceElement /\ setReferenceElement <- React.useState' nullRef
      inputRef <- React.useRef null
      text /\ setText <- React.useState' ""
      active /\ modifyActive <- React.useState Nothing
      clicking /\ setClicking <- React.useState' false
      visible /\ setVisible <- React.useState' false
      selectedAuthors /\ modSelectedAuthors <- React.useState []
      let
        addToSelected a = modSelectedAuthors (_ `Array.union` [ a ])
        matchingAuthors =
          authors
            # (_ Array.\\ selectedAuthors)
            # Array.filter
                ( String.toLower
                    >>> String.contains (String.Pattern (String.toLower text))
                )
      useKeyDown
        $ case _ of
            KeyCode.Down ->
              when visible do
                let first = Array.head matchingAuthors
                modifyActive case _ of
                  Just elem ->
                    maybe first Just do
                      idx <- Array.findIndex (eq elem) matchingAuthors
                      Array.index matchingAuthors (idx + 1)
                  Nothing -> first
            KeyCode.Up ->
              when visible do
                let last = Array.last matchingAuthors
                modifyActive case _ of
                  Just elem ->
                    maybe last Just do
                      idx <- Array.findIndex (eq elem) matchingAuthors
                      Array.index matchingAuthors (idx - 1)
                  Nothing -> last
            KeyCode.Return ->
              when visible do
                for_ active addToSelected
            KeyCode.Backspace ->
              when (text == "") do
                modSelectedAuthors (Array.dropEnd 1)
            _ -> mempty
      let
        inputWrapper = R.div' </ { ref: unsafeCoerce (mkEffectFn1 setReferenceElement) }
        pill t =
          animatePresence </ {}
            /> [ motionCluster
                  </ Motion.withMotion
                      { style:
                        css
                          { fontSize: "var(--s-1)"
                          , borderRadius: "var(--s-2)"
                          , padding: "var(--s-2)"
                          , background: colour.highlightAlpha50
                          , userSelect: "none"
                          }
                      , space: "4px"
                      , justify: "flex-end"
                      }
                      { initial: Motion.initial $ css { scale: 0.95, opacity: 0.5 }
                      , animate: Motion.animate $ css { scale: 1, opacity: 1 }
                      , exit: Motion.exit $ css { scale: 0.7, opacity: 0 }
                      , transition: Motion.transition { duration: 0.4 }
                      }
                  /> [ R.text t
                    , Motion.div
                        </ { onClick: handler_ (modSelectedAuthors (Array.delete t)) }
                        /> [ Icon.component
                              </> { icon: Icons.cross, size: str "var(--s-1)" }
                          ]
                    ]
              ]
        pills = pill <$> selectedAuthors
        leading =
          motionCluster
            </ Motion.withMotion
                { style:
                  css
                    { marginLeft: "-6px"
                    }
                , space: "var(--s-5)"
                , justify: "flex-start"
                }
                {}
            /> pills
        trailing =
          R.div'
            </ { style: css { fontSize: "var(--s1)", paddingBottom: "4px", userSelect: "none" }
              , onClick: handler_ (setVisible true)
              }
            /> [ R.text "▾" ]
        input =
          Input.component
            </> { id: "author"
              , type: HTMLInput.Text
              , label: nes (SProxy ∷ _ "Author")
              , placeholder: "e.g. William Shakespeare"
              , forceSmallLabel: Array.length selectedAuthors > 0
              , inputRef
              , value:
                if text /= mempty then
                  text
                else
                  if selectedAuthors /= mempty then
                    " "
                  else
                    text
              , onChange: handler targetValue $ traverse_ setText
              , onBlur: handler preventDefault (const $ unless clicking (setVisible false))
              , onFocus: handler_ (setVisible true)
              , leading
              , trailing
              , _data: Object.singleton "has-focus" (show visible)
              , autoComplete: "off"
              , css: E.css { width: E.percent 100.0 }
              }
        pop children =
          Motion.elementKeyed motionPopover
            $ Motion.motion
                { initial:
                  css { maxHeight: 0, opacity: 0.0 }
                , exit:
                  css { maxHeight: 0, opacity: 0.0 }
                , animate:
                  css
                    { maxHeight: 400
                    , opacity: 1
                    }
                , transition:
                  Motion.transition
                    $ { type: "spring"
                      , stiffness: 200.0
                      , damping: 20.0
                      , mass: 0.7
                      , delay: 0.3
                      }
                }
                { placement: Placement Placement.Bottom (Just Placement.End)
                , referenceElement
                , style:
                  css
                    { boxShadow: "0px 2px 4px rgba(40,40,40,0.5)"
                    , background: colour.interfaceBackground
                    , borderRadius: "0 0 9px 9px"
                    , borderTop: "solid 1px " <> colour.interfaceBackgroundHighlight
                    , borderBottom: "solid 1px " <> colour.interfaceBackgroundShadow
                    , overflowY: "scroll"
                    , maxHeight: "400px"
                    , margin: "0"
                    , padding: "0"
                    }
                , key: "popover"
                , children: [ R.ul' </ {} /> children ]
                }
        box =
          Box.component
            </ { padding: E.str "0"
              }
        stack =
          motionStack
            </ Motion.withMotion
                { space: E.str "0"
                }
                { variants: Motion.variants containerVariants
                , initial: Motion.initial containerVariant.hidden
                , animate: Motion.animate containerVariant.visible
                , exit: Motion.exit containerVariant.exit
                }
        entry a =
          elementKeyed Motion.li
            { key: a
            , variants: Motion.variants itemVariants
            , css:
              E.css
                { padding: E.str "var(--s-1)"
                , borderBottom: E.str $ "solid 1px " <> colour.backgroundLayer1
                , background: E.str colour.backgroundLayer3
                , margin: E.str "0"
                , fontSize: E.str "calc(var(--s0) * 0.75)"
                }
                <> ( guard (Just a == active)
                      $ E.css
                          { borderLeft: E.str $ "calc(var(--s-1) / 2) solid " <> colour.highlight
                          , paddingLeft: E.str "calc(var(--s-1) / 2)"
                          , background: E.str colour.backgroundLayer1
                          }
                  )
            , className: "item"
            , onClick:
              handler_ do
                maybeRefElem <- readRefMaybe inputRef
                addToSelected a
                for_ (maybeRefElem >>= HTMLElement.fromNode) focus
            , onMouseDown: handler_ (setClicking true)
            , onMouseUp: handler_ (setClicking false)
            , children: [ R.text a ]
            }
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
      , exit ∷ CSS
      }
    itemVariants =
      { visible:
        css
          { x: 0
          , opacity: 1
          }
      , hidden:
        css
          { opacity: 0.8
          , x: -20
          }
      , exit:
        css
          { opacity: 1.0
          }
      }

    itemVariant ∷
      { hidden ∷ Motion.VariantLabel
      , visible ∷ Motion.VariantLabel
      , exit ∷ Motion.VariantLabel
      }
    itemVariant = Motion.makeVariantLabels itemVariants

    containerVariants ∷
      { hidden ∷ CSS
      , visible ∷ CSS
      , exit ∷ CSS
      }
    containerVariants =
      { visible:
        css
          { transition:
            { when: "beforeChildren"
            , staggerChildren: 0.02
            }
          , opacity: 1
          }
      , hidden:
        css
          { transition:
            { when: "afterChildren"
            }
          , opacity: 0
          }
      , exit:
        css
          { opacity: 0
          , height: 0
          }
      }

    containerVariant ∷
      { hidden ∷ Motion.VariantLabel
      , visible ∷ Motion.VariantLabel
      , exit ∷ Motion.VariantLabel
      }
    containerVariant = Motion.makeVariantLabels containerVariants

    authors =
      Array.sort
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
