module React.Basic.Popper.Story where

import Yoga.Prelude.View
import Data.Interpolate (i)
import Effect.Uncurried (mkEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion as Motion
import React.Basic.DOM (h2_, text)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import React.Basic.Popper.Hook (usePopper)
import React.Basic.Popper (modifierArrow, modifierOffset)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal.CSS (nest)

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Popper"
  , decorators:
    [ \storyFn ->
        div
          </ {}
          /> [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
    ]
  }

popper ∷ Effect JSX
popper = do
  example <- mkBasicExample
  pure
    $ fragment
        [ div </ {}
            /> [ h2_ [ text "Some Popper" ]
              , element example {}
              ]
        ]
  where
  nullRef ∷ NodeRef
  nullRef = unsafeCoerce null

  mkBasicExample =
    React.reactComponent "Popper example" \_p -> React.do
      referenceElement /\ setReferenceElement <- React.useState' nullRef
      popperElement /\ setPopperElement <- React.useState' nullRef
      arrowElement /\ setArrowElement <- React.useState' nullRef
      { styles, attributes } <-
        usePopper referenceElement popperElement
          { modifiers:
            [ modifierArrow { element: arrowElement, padding: 4 }
            , modifierOffset { x: 0.0, y: 8.0 }
            ]
          }
      pure
        $ fragment
        $ [ button
              </ { type: "button"
                , ref: unsafeCoerce (mkEffectFn1 setReferenceElement)
                }
              /> [ text "Reference element" ]
          , div
              </* { className: "popper-element"
                , css:
                  E.css
                    { background: E.str "darkslateblue"
                    , borderRadius: E.str "8px"
                    , display: E.str "block"
                    , padding: E.str "4px 8px"
                    , "&[data-popper-placement^='top'] > .popper-arrow":
                      nest { bottom: E.str "-4px" }
                    , "&[data-popper-placement^='bottom'] > .popper-arrow":
                      nest { top: E.str "-4px" }
                    , "&[data-popper-placement^='left'] > .popper-arrow":
                      nest { right: E.str "-4px" }
                    , "&[data-popper-placement^='right'] > .popper-arrow":
                      nest { left: E.str "-4px" }
                    }
                , ref: unsafeCoerce (mkEffectFn1 setPopperElement)
                , style: styles.popper
                , _data: attributes.popper
                }
              /> [ text "Popper Element"
                , div
                    </*> { className: "popper-arrow"
                      , id: "arrow"
                      , css:
                        E.css
                          { position: E.str "absolute"
                          , width: E.str "8px"
                          , height: E.str "8px"
                          , zIndex: E.str "-1"
                          , "&::before":
                            nest
                              { position: E.str "absolute"
                              , width: E.str "8px"
                              , height: E.str "8px"
                              , zIndex: E.str "-1"
                              , content: E.str "''"
                              , transform: E.str "rotate(45deg)"
                              , background: E.str "darkslateblue"
                              }
                          }
                      , ref: unsafeCoerce (mkEffectFn1 setArrowElement)
                      , style: styles.arrow
                      , _data: attributes.arrow
                      }
                ]
          ]

animatedPopper ∷ Effect JSX
animatedPopper = do
  example <- mkBasicExample
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Some Popper" ]
            , element example {}
            ]
        ]
  where
  nullRef ∷ NodeRef
  nullRef = unsafeCoerce null

  mkBasicExample =
    React.reactComponent "Popper example" \_p -> React.do
      -- Hooks
      referenceElement /\ setReferenceElement <- React.useState' nullRef
      popperElement /\ setPopperElement <- React.useState' nullRef
      arrowElement /\ setArrowElement <- React.useState' nullRef
      { styles, attributes } <-
        usePopper referenceElement popperElement
          { modifiers:
            [ modifierArrow { element: arrowElement, padding: 4 }
            , modifierOffset { x: 0.0, y: 12.0 }
            ]
          }
      on /\ setOn <- React.useState' true
      -- Handlers
      let buttonClicked = setOn (not on)
      -- Elements
      let
        result =
          fragment
            $ [ refElem
              , popperEl
                  [ animatePresence
                      $ guard on
                          [ content
                              [ Block.box {} [ text "Ich bin Stinky Bill" ]
                              , arrow
                              ]
                          ]
                  ]
              ]
        animatePresence =
          Motion.animatePresence
            </ { initial: false
              }
        content =
          Motion.div
            </* { className: "popper-element-content"
              , css: contentCss
              , initial: Motion.initial $ R.css { opacity: [ 1.0, 0.8, 0.0 ], scale: [ 1.0, 0.85 ] }
              , animate: Motion.animate $ R.css { opacity: [ 0.0, 0.3, 1.0 ], scale: [ 0.0, 1.05, 1.0, 0.98, 1.01, 1.0 ] }
              , exit: Motion.exit $ R.css { opacity: [ 1.0, 0.8, 0.0 ], scale: [ 1.0, 0.85 ] }
              , transition: Motion.transition { duration: 0.2 }
              , key: "container"
              }
        popperEl =
          div
            </* { className: "popper-element"
              , css: popperCss
              , ref: unsafeCoerce (mkEffectFn1 setPopperElement)
              , style: styles.popper
              , _data: attributes.popper
              }
        arrow =
          div
            </*> { className: "popper-arrow"
              , id: "arrow"
              , css: arrowCss
              , ref: unsafeCoerce (mkEffectFn1 setArrowElement)
              , style: styles.arrow
              , _data: attributes.arrow
              }
        refElem =
          button
            </ { ref: unsafeCoerce (mkEffectFn1 setReferenceElement)
              , onClick: handler preventDefault (const buttonClicked)
              }
            /> [ R.text "Reference element" ]
      pure result

  backgroundColour = "var(--highlight)"

  backgroundColour2 = "rgb(100, 160, 240)"

  arrowCss =
    E.css
      { position: E.str "absolute"
      , width: E.str "8px"
      , height: E.str "8px"
      , zIndex: E.str "0"
      , "&::before":
        nest
          { position: E.str "absolute"
          , width: E.str "8px"
          , height: E.str "8px"
          , content: E.str "''"
          , transform: E.str "rotate(45deg)"
          , background: E.str backgroundColour
          }
      }

  contentCss =
    E.css
      { background: E.str $ i "linear-gradient(0deg," backgroundColour "," backgroundColour2 "," backgroundColour ")"
      , fontSize: E.str "14px"
      , zIndex: E.str "-1"
      , color: E.str $ "white"
      , boxShadow: E.str "0 1px 8px rgba(0,0,0,0.5)"
      , borderRadius: E.str "12px"
      }

  popperCss =
    E.css
      { "&[data-popper-placement^='top'] > * > .popper-arrow":
        nest { bottom: E.str "-4px" }
      , "&[data-popper-placement^='bottom'] > * >  .popper-arrow":
        nest { top: E.str "-4px" }
      , "&[data-popper-placement^='left'] > * >  .popper-arrow":
        nest { right: E.str "-4px" }
      , "&[data-popper-placement^='right'] > * > .popper-arrow":
        nest { left: E.str "-4px" }
      }
