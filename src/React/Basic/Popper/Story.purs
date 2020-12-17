module React.Basic.Popper.Story where

import Prelude
import Color as Color
import Data.Maybe (Maybe(..))
import Data.Nullable (null)
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Uncurried (mkEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion (onTap)
import Framer.Motion as Motion
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import React.Basic.Popper.Hook (modifierArrow, modifierOffset, usePopper)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block as Block
import Yoga.Block.Atom.Toggle as Toggle
import Yoga.Block.Container.Style (DarkOrLightMode(..))
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal.CSS (nest)
import Yoga.Prelude.View (NodeRef, el, styled, styledLeaf)

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Popper"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

popper ∷ Effect JSX
popper = do
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
      React.reactComponent "Popper example" \p -> React.do
        referenceElement /\ setReferenceElement <- React.useState' nullRef
        popperElement /\ setPopperElement <- React.useState' nullRef
        arrowElement /\ setArrowElement <- React.useState' nullRef
        { styles, attributes } <-
          usePopper referenceElement popperElement
            { modifiers:
              [ modifierArrow arrowElement
              , modifierOffset { x: 0.0, y: 8.0 }
              ]
            }
        pure
          $ fragment
          $ [ element R.button'
                { type: "button"
                , ref: unsafeCoerce (mkEffectFn1 setReferenceElement)
                , children: [ R.text "Reference element" ]
                }
            , styled R.div'
                { className: "popper-element"
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
                [ R.text "Popper Element"
                , styledLeaf R.div'
                    { className: "popper-arrow"
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
      React.reactComponent "Popper example" \p -> React.do
        referenceElement /\ setReferenceElement <- React.useState' nullRef
        popperElement /\ setPopperElement <- React.useState' nullRef
        arrowElement /\ setArrowElement <- React.useState' nullRef
        { styles, attributes } <-
          usePopper referenceElement popperElement
            { modifiers:
              [ modifierArrow arrowElement
              , modifierOffset { x: 0.0, y: 8.0 }
              ]
            }
        pure
          $ fragment
          $ [ element R.div'
                { ref: unsafeCoerce (mkEffectFn1 setReferenceElement)
                , children: [ R.text "Reference element" ]
                }
            , el Motion.animatePresence {}
                [ styled Motion.div
                    { className: "popper-element"
                    , key: "heinz"
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
                    [ R.text "Popper Element"
                    , styledLeaf R.div'
                        { className: "popper-arrow"
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
            ]
