module Yoga.Block.Atom.Modal.View where

import Yoga.Prelude.View

import Effect.Unsafe (unsafePerformEffect)
import Fahrtwind.Style.Color.Background (background)
import Fahrtwind.Style.Color.Tailwind as TW
import Fahrtwind.Style.Color.Util (withAlpha)
import Framer.Motion as M
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Yoga.Block.Atom.Modal.Style as Style
import Yoga.Block.Hook.UseRenderInPortal (useRenderInPortal)
import Yoga.Block.Layout.Centre.View as Centre
import Yoga.Block.Layout.Cover.View as Cover
import Yoga.Block.Quark.ClickAway.View as ClickAway

type ModalIds = { clickAwayId ∷ String, modalContainerId ∷ String }

type Props =
  { hide ∷ Effect Unit
  , isVisible ∷ Boolean
  , content ∷ JSX
  , allowClickAway ∷ Boolean
  , clickAwayId ∷ String
  , modalContainerId ∷ String
  }

component ∷ ReactComponent Props
component = unsafePerformEffect do
  React.reactComponent "Modal" \props → React.do
    let
      { hide
      , isVisible
      , content
      , allowClickAway
      , clickAwayId
      , modalContainerId
      } = props
    renderInPortal ← useRenderInPortal modalContainerId
    let
      child = div "ry-modal" Style.modal [ content ]
    pure $ fragment
      [ ClickAway.component </>
          { css: background (TW.gray._900 # withAlpha 0.5)
          , hide: if allowClickAway then hide else mempty
          , isVisible
          , clickAwayId
          }
      , renderInPortal
          $ Cover.component
          </ {}
          />
            [ Centre.component </ {} />
                [ M.animatePresence </ {} />
                    [ guard isVisible
                        $ M.div
                        </
                          { key: "popOver"
                          , initial: M.initial
                              ( R.css
                                  { opacity: 0.0
                                  , scale: 0.3
                                  }
                              )
                          , animate: M.animate
                              ( R.css
                                  { opacity: 1
                                  , scale: 1.0
                                  , transition:
                                      { duration: 0.4, type: "spring" }
                                  }
                              )
                          , exit: M.exit
                              ( R.css
                                  { opacity: 0
                                  , scale: 0.3
                                  , transition: { duration: 0.2 }
                                  }
                              )
                          -- , onAnimationComplete
                          -- , onAnimationStart
                          -- , ref: motionRef
                          }
                        />
                          [ child ]
                    ]
                ]
            ]
      ]
