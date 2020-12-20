module Yoga.Block.Atom.Input.View where

import Yoga.Prelude.View
import Framer.Motion as M
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG
import React.Basic.Hooks as React
import Record.Extra (pick)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Input.Style as Style
import Yoga.Block.Atom.Tooltip as Tooltip
import Yoga.Block.Icon.SVG as SVGIcon

type PropsF f =
  ( iconLeft ∷ f JSX
  , iconRight ∷ f JSX
  | Style.Props f InputProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

mkLeftIcon ∷ JSX -> JSX
mkLeftIcon icon =
  styledLeaf
    Icon.component
    { size: Style.leftIconSize
    , className: "ry-input-right-icon"
    , css: Style.leftIconStyle
    , icon
    }

mkRightIcon ∷ JSX -> JSX
mkRightIcon icon =
  styledLeaf Icon.component
    { size: Style.rightIconSize
    , className: "ry-input-left-icon"
    , css: Style.rightIconStyle
    , icon
    }

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Input" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        iconLeft =
          props.iconLeft
            ?|| if (((cast props.type) ?|| "") == "search") then mkLeftIcon SVGIcon.magnifyingGlass else mempty
        iconRight =
          props.iconRight
            ?|| if (((cast props.type) ?|| "") == "password") then mkRightIcon SVGIcon.eyeOpen else mempty
      pure
        $ case props.type # cast # opToMaybe of
            Just "password" -> el_ password props
            _ ->
              styled R.div'
                { className: "ry-input-wrapper"
                , css: Style.textWrapper props
                }
                [ iconLeft
                , emotionInput
                    ref
                    props
                    { className: "ry-input"
                    , css: Style.input props
                    }
                , iconRight
                ]

password ∷ ∀ p. ReactComponent { | p }
password =
  mkForwardRefComponent "Password" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      hidePassword /\ modifyHidePassword <- useState true
      let
        eyeCon =
          el_ Tooltip.component
            { target:
              el R.div'
                { onClick: handler preventDefault \_ -> modifyHidePassword not
                }
                [ el M.animatePresence
                    { exitBeforeEnter: true
                    }
                    [ if hidePassword then
                        el M.div
                          { key: "eyeOpen"
                          , initial: M.initial $ css { scaleY: 0 }
                          , animate: M.animate $ css { scaleY: 1 }
                          , exit: M.exit $ css { scaleY: 0.9 }
                          , transition: M.transition { duration: 0.15 }
                          }
                          [ styledLeaf Icon.component
                              { size: Style.rightIconSize
                              , className: "ry-input-left-icon"
                              , css: Style.rightIconStyle
                              , icon: SVGIcon.eyeOpen
                              }
                          ]
                      else
                        el M.div
                          { key: "eyeClosed"
                          , initial: M.initial $ css { scaleY: 0.0 }
                          , animate: M.animate $ css { scaleY: 1 }
                          , exit: M.exit $ css { scaleY: 0.9 }
                          , transition: M.transition { duration: 0.15 }
                          }
                          [ styledLeaf Icon.component
                              { size: Style.rightIconSize
                              , className: "ry-input-left-icon"
                              , css: Style.rightIconStyle
                              , icon: SVGIcon.eyeClosed
                              }
                          ]
                    ]
                ]
            , theTip: R.text if hidePassword then "Show password" else "Hide password"
            }
      let iconRight = props.iconRight ?|| eyeCon
      pure
        $ styled R.div'
            { className: "ry-input-wrapper"
            , css: Style.textWrapper props
            }
            [ emotionInput
                ref
                props
                { className: "ry-input"
                , css: Style.input props
                , type: if hidePassword then "password" else "text"
                }
            , iconRight
            ]
