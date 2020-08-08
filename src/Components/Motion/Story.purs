module Components.Motion.Story where

import Prelude
import Components.Centre as Centre
import Components.Container.Style as Styles
import Components.Sidebar as Sidebar
import Data.Monoid (guard)
import Data.Tuple (Tuple(..))
import Data.Tuple.Nested ((/\))
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion (makeVariantLabels, withMotion)
import Framer.Motion as M
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Events (handler_)
import React.Basic.Hooks (useState)
import React.Basic.Hooks as React
import Yoga (el, reactComponent, styled)
import Yoga.Blocks.Internal (_0, center, flex)
import Yoga.Blocks.Internal.CSS (_100percent)

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Motion"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

motion ∷ Effect JSX
motion = do
  mc <- mkMc
  pure $ element mc {}
  where
    mkMc = do
      motionCentre <- M.custom Centre.component
      pure
        $ reactComponent "MotionTest" \{} -> React.do
            Tuple isOpen setIsOpen <- React.useState false
            pure
              $ fragment
                  [ E.element R.div'
                      { className: "bg"
                      , css: backgroundStyle
                      , children:
                        [ E.element motionCentre
                            ( { className: "parent"
                              , css: parentStyle <> if isOpen then parentStyleOpen else mempty
                              , onClick: handler_ (setIsOpen not)
                              , style: css { y: if isOpen then -70 else 0, skew: if isOpen then 30 else 0 }
                              }
                                `withMotion`
                                  { layout: true
                                  , initial: css { borderRadius: 50 }
                                  }
                            )
                        ]
                      }
                  ]

    backgroundStyle ∷ E.Style
    backgroundStyle =
      E.css
        { background: E.str "#da36dd"
        , height: E.vh 88.0
        , borderRadius: E.px 8
        , display: flex
        , alignItems: center
        , justifyContent: center
        }

    parentStyle ∷ E.Style
    parentStyle =
      E.css
        { width: E.px 100
        , height: E.px 100
        , padding: _0
        , margin: _0
        , display: flex
        , alignItems: center
        , justifyContent: center
        , boxShadow: E.str "30px 30px 60px #b92ebc, -30px -30px 60px #fb3efe"
        , background: E.str "linear-gradient(145deg, #e93aec, #c431c7)"
        }

    childStyle ∷ E.Style
    childStyle =
      E.css
        { background: E.str "hotpink"
        , width: E.px 40
        , height: E.px 40
        , borderRadius: E.percent 50.0
        , padding: _0
        , margin: _0
        }

    parentStyleOpen ∷ E.Style
    parentStyleOpen =
      E.css
        { width: E.px 300
        , height: E.px 300
        , boxShadow: E.str "50px 50px 60px #b92ebc, -50px -50px 60px #fb3efe"
        , background: E.str "linear-gradient(145deg, #e93aec, #c431c7)"
        }

animatedSidebar ∷ Effect JSX
animatedSidebar = do
  mc <- mkMc
  pure $ element mc {}
  where
    mkMc = do
      pure
        $ reactComponent "MotionTest" \{} -> React.do
            sidebarOpen /\ setSidebarOpen <- useState true
            let
              sb =
                styled M.div
                  { className: "sidebar"
                  , css: if sidebarOpen then sidebarStyleOpen else sidebarStyleHidden
                  , onClick: handler_ (setSidebarOpen not)
                  , initial: M.initial $ css { opacity: 0 }
                  , animate: M.animate $ css { opacity: 1, width: "200px" }
                  , exit: M.exit $ css { opacity: 0 }
                  , key: "sidebar"
                  }
                  [ R.text $ if sidebarOpen then "Sidebar" else "|||" ]
            pure
              $ styled R.div'
                  { className: "bg"
                  , css: backgroundStyle
                  }
                  [ el Sidebar.component
                      { className: "parent"
                      , css: sidebarContainerStyle
                      }
                      [ styled R.div'
                          { css: sidebarStyle
                          , className: "sidebarContainer"
                          }
                          [ el M.animatePresence {} [ guard sidebarOpen sb ]
                          , R.div_
                              [ el M.h1
                                  { initial: M.initial (css { x: -10, opacity: 0 })
                                  , animate: M.animate $ css { x: [ -10, -3, 0 ], opacity: [ 0.1, 0.2, 1.0 ] }
                                  , transition: M.transition { duration: 0.6, times: [ 0.1, 0.4, 1.0 ] }
                                  , key: "non-sidebar-heading"
                                  }
                                  [ R.text "Non-sidebar" ]
                              ]
                          ]
                      ]
                  ]

    variantLabels = makeVariantLabels variants

    variants =
      { hidden: { width: 30, height: 30, borderRadius: "50%" }
      , show: { width: "inherit", height: "100%" }
      }

    sidebarContainerStyle ∷ E.Style
    sidebarContainerStyle =
      E.css
        { height: _100percent
        , zIndex: E.str "40"
        }

    sidebarStyle ∷ E.Style
    sidebarStyle =
      E.css
        { height: _100percent
        }

    sidebarStyleOpen ∷ E.Style
    sidebarStyleOpen =
      E.css
        { background: E.str "teal"
        }

    sidebarStyleHidden ∷ E.Style
    sidebarStyleHidden =
      E.css
        { background: E.str "darkslate"
        }

    backgroundStyle ∷ E.Style
    backgroundStyle =
      E.css
        { background: E.str "darkslateblue"
        , height: E.vh 80.0
        }
