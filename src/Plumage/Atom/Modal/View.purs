module Plumage.Atom.Modal.View where

import Yoga.Prelude.View

import Fahrtwind (acceptClicks)
import Fahrtwind.Style.Color.Background (background)
import Fahrtwind.Style.Color.Tailwind as TW
import Fahrtwind.Style.Color.Util (withAlpha)
import Fahrtwind.Style.Inset (left, left', top) as P
import Fahrtwind.Style.Position (positionFixed)
import Fahrtwind.Style.Size (heightScreen, widthScreen) as P
import Fahrtwind.Style.Transform (translate)
import Plumage.Hooks.UseRenderInPortal (useRenderInPortal)
import Plumage.Util.HTML as H
import React.Basic.DOM as R
import React.Basic.Emotion (Style)
import React.Basic.Emotion as E
import React.Basic.Hooks as React

clickAwayStyle ∷ Style
clickAwayStyle =
  P.widthScreen
    <> P.heightScreen
    <> positionFixed
    <> P.left 0
    <> P.top 0
    <> acceptClicks

-- [TODO] Move out
mkClickAway ∷
  React.Component
    { css ∷ Style
    , hide ∷ Effect Unit
    , isVisible ∷ Boolean
    , clickAwayId ∷ String
    }
mkClickAway = do
  React.component "Clickaway"
    \{ css, isVisible, hide, clickAwayId } →
      React.do
        renderInPortal ← useRenderInPortal clickAwayId
        pure
          $ guard isVisible
          $ renderInPortal
          $ R.div'
          </*>
            { className: "click-away"
            , css: clickAwayStyle <> css
            , onMouseUp: handler_ hide
            , onTouchEnd: handler_ hide
            }

modalStyle ∷ Style
modalStyle = positionFixed <> P.left' (50.0 # E.percent)
  <> P.top 0
  <> translate "-50%" "0"
  <> acceptClicks

type ModalIds = { clickAwayId ∷ String, modalContainerId ∷ String }

type Props =
  { hide ∷ Effect Unit
  , isVisible ∷ Boolean
  , content ∷ JSX
  , allowClickAway ∷ Boolean
  , clickAwayId ∷ String
  , modalContainerId ∷ String
  }

mkModal ∷ React.Component Props
mkModal = do
  clickAway ← mkClickAway
  React.component "Modal" \props → React.do
    let
      { hide
      , isVisible
      , content
      , allowClickAway
      , clickAwayId
      , modalContainerId
      } = props
    renderInPortal ← useRenderInPortal modalContainerId
    pure $ fragment
      [ clickAway
          { css: background (TW.gray._900 # withAlpha 0.5)
          , hide: if allowClickAway then hide else mempty
          , isVisible
          , clickAwayId
          }
      , renderInPortal (H.div "modal" modalStyle [ content ])
      ]