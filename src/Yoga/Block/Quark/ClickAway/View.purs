module Yoga.Block.Quark.ClickAway.View where

import Yoga.Prelude.View

import Effect.Unsafe (unsafePerformEffect)
import React.Basic.DOM as R
import React.Basic.Emotion (Style)
import React.Basic.Hooks as React
import Yoga.Block.Quark.ClickAway.Style as Style
import Yoga.Block.Hook.UseRenderInPortal (useRenderInPortal)

type Props =
  { css ∷ Style
  , hide ∷ Effect Unit
  , isVisible ∷ Boolean
  , clickAwayId ∷ String
  }

component ∷ ReactComponent Props
component = unsafePerformEffect do
  React.reactComponent "Clickaway" \(props ∷ Props) → React.do
    let { css, isVisible, hide, clickAwayId } = props
    renderInPortal ← useRenderInPortal clickAwayId
    pure
      $ guard isVisible
          ( renderInPortal
              $ R.div'
              </*>
                { className: "click-away"
                , css: Style.clickAway <> css
                , onMouseUp: handler_ hide
                , onTouchEnd: handler_ hide
                }
          )
