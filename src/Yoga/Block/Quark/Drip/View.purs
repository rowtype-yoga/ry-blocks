module Yoga.Block.Quark.Drip.View where

import Yoga.Prelude.View

import Data.Number (nan)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG
import React.Basic.Hooks as React
import Web.DOM.Node (toEventTarget)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Yoga.Block.Quark.Drip.Style as Style

-- This is taken from Next UI

type Props =
  { visible :: Boolean
  , x :: Number
  , y :: Number
  , onComplete :: Effect Unit
  , colour :: String
  , className :: String
  }

defaultProps ∷ ∀ (a6 ∷ Type) (a7 ∷ Type). Semiring a6 ⇒ Semiring a7 ⇒ { className ∷ String, visible ∷ Boolean, x ∷ a6, y ∷ a7 }
defaultProps =
  { visible: false
  , x: zero
  , y: zero
  , className: ""
  }

component ∷ ReactComponent Props
component = mkForwardRefComponent "Drip" \(props :: Props) propsRef -> React.do
  backupRef <- React.useRef null
  let ref = forwardedRefAsMaybe propsRef # fromMaybe backupRef
  let left = if props.x == nan then zero else props.x - 10.0
  let top = if props.y == nan then zero else props.y - 10.0

  useEffectAlways do
    nʔ <- React.readRefMaybe ref
    nʔ # case _ of
      Just n -> do
        let target = toEventTarget n
        let et = EventType "animationend"
        listener <- eventListener (const props.onComplete)
        addEventListener et listener false target
        pure $ removeEventListener et listener false target
      Nothing ->
        pure (pure unit)

  pure $ guard props.visible do
    R.div'
      </*
        { css: Style.drip
        , className: "ry-drip"
        , ref
        }
      />
        [ SVG.svg'
            </
              { width: "20"
              , height: "20"
              , viewBox: "0 0 20 20"
              , style: R.css { top, left }
              }
            />
              [ SVG.g'
                  </
                    { stroke: "none"
                    , strokeWidth: "1"
                    , fill: "none"
                    , fillRule: "evenodd"
                    }
                  />
                    [ SVG.g'
                        </
                          { className: "ry-drip-filler"
                          , fill: props.colour
                          }
                        />
                          [ SVG.rect
                              { width: "100%"
                              , height: "100%"
                              , rx: "10"
                              }
                          ]
                    ]
              ]

        ]