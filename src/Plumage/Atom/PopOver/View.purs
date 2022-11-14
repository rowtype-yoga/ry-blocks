module Plumage.Atom.PopOver.View where

import Yoga.Prelude.View

import Control.Monad.ST.Internal as ST
import Data.Array ((:))
import Data.Array as Array
import Data.Array.NonEmpty as NEA
import Data.Int as Int
import Data.Maybe (isNothing)
import Data.Time.Duration (Milliseconds(..))
import Data.Traversable (for)
import Fahrtwind (acceptClicks, positionAbsolute)
import Fahrtwind.Style.BoxShadow (shadow)
import Framer.Motion as M
import Plumage.Atom.Modal.View (mkClickAway)
import Plumage.Atom.PopOver.Types (DismissBehaviour(..), Placement(..), PrimaryPlacement(..), SecondaryPlacement(..))
import Plumage.Hooks.UseRenderInPortal (useRenderInPortal)
import Plumage.Hooks.UseResize2 (useOnResize)
import Plumage.Prelude.Style (Style)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Unsafe.Reference (reallyUnsafeRefEq)
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.HTML (window)
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.Window (document, innerHeight, innerWidth, requestAnimationFrame, scrollX, scrollY)
import Web.UIEvent.MouseEvent as MouseEvent

popOverShadow ∷ Style
popOverShadow =
  shadow
    "0 30px 12px 2px rgba(50,57,70,0.2), 0 24px 48px 0 rgba(0,0,0,0.4)"

type PopOverViewProps =
  { dismissBehaviourʔ ∷ Maybe DismissBehaviour
  , containerId ∷ String
  , placement ∷ Placement
  , fallbackPlacements ∷ Array Placement
  , placementRef ∷ NodeRef
  , childʔ ∷ Maybe JSX
  , hide ∷ Effect Unit
  , onAnimationStateChange ∷ Boolean → Effect Unit
  }

mkPopOverView ∷ React.Component PopOverViewProps
mkPopOverView = do
  popOver ← mkPopOver
  React.component "PopOverView" \props → React.do
    visiblePlacementʔ /\ setVisiblePlacement ← React.useState' Nothing
    -- Triggers a recomputation of the bounding box for more correct
    -- click outside handling
    _ /\ setAnimationDone ← React.useState' false
    visibleChildʔ /\ setVisibleChild ← React.useState' Nothing
    contentRef ← React.useRef null
    motionRef ← React.useRef null
    useEffectAlways do
      when (props.childʔ # isNothing) do
        setVisibleChild Nothing
      mempty
    useEffectAlways do
      case props.dismissBehaviourʔ of
        Nothing → mempty
        Just (DismissOnClickAway _) → mempty
        Just (DismissOnClickOutsideElements elements) → do
          -- No need to register and deregister an event listener if
          -- there are no bounding boxes to measure
          maybeBbsʔ ← for elements getBoundingBoxFromRef
          let bbsʔ = maybeBbsʔ # NEA.catMaybes # NEA.fromArray
          case bbsʔ of
            Nothing → mempty
            Just bbs → do
              let eventType = EventType "mousedown"
              eventTarget ← window >>= document <#> HTMLDocument.toEventTarget
              listener ← eventListener \e → do
                for_ (MouseEvent.fromEvent e) \mouseEvent → do
                  let x = MouseEvent.clientX mouseEvent # Int.toNumber
                  let y = MouseEvent.clientY mouseEvent # Int.toNumber
                  let
                    clickedOutside = bbs # NEA.all
                      \{ left, right, bottom, top } →
                        x < left || x > right || y < top || y > bottom
                  props.hide # when clickedOutside

              addEventListener eventType listener true eventTarget
              pure $ removeEventListener eventType listener true
                eventTarget

    let
      -- measureStyle = R.css { visibility: "hidden" }
      measureStyle = R.css
        { visibility: "hidden"
        , outline: "pink"
        , border: "solid 10px red"
        }
      style = visiblePlacementʔ # foldMap \placement → R.css
        { transformOrigin: toTransformOrigin placement
        }
      initial = M.initial $ R.css
        { scale: 0.7
        , opacity: 0
        }
      animate = M.animate $ R.css
        { scale: 1
        , opacity: 1
        , y: 0
        , transition: { type: "spring", bounce: 0.3, duration: 0.3 }
        }
      exit =
        M.exit $ R.css
          { scale: 0.8
          , opacity: 0.0
          , transition:
              { type: "spring", bounce: 0.2, duration: 0.2 }
          }
      onAnimationComplete = M.onAnimationComplete \fgn → do
        props.onAnimationStateChange false
        if (reallyUnsafeRefEq fgn exit) then
          setVisiblePlacement Nothing
        else if (reallyUnsafeRefEq fgn animate) then do
          setAnimationDone true
        else mempty

      onAnimationStart = M.onAnimationStart do
        props.onAnimationStateChange true
        setAnimationDone false

      getBbsWidthAndHeight = ado
        bbʔ ← getBoundingBoxFromRef contentRef
        targetBbʔ <- getBoundingBoxFromRef props.placementRef
        w ← window >>= innerWidth <#> Int.toNumber
        h ← window >>= innerHeight <#> Int.toNumber
        in { bbʔ, targetBbʔ, w, h }

      getBestPlacement
        ∷ { bbʔ ∷ Maybe DOMRect, targetBbʔ ∷ Maybe DOMRect, w ∷ Number, h ∷ Number } → Placement -> Array Placement → Placement
      getBestPlacement bbsWidthAndHeight oldPlacement fallbackPlacements = fromMaybe oldPlacement do
        let { w, h } = bbsWidthAndHeight
        targetBb <- bbsWidthAndHeight.targetBbʔ
        bb <- bbsWidthAndHeight.bbʔ
        (oldPlacement : fallbackPlacements) # Array.find \placement ->
          isWithin { w, h } (placeAt targetBb bb placement)
    -- :: DOMRect -> { width :: Number, height :: Number } -> Placement

    let
      recalculatePlacement =
        case props.childʔ of
          Just child →
            -- I don't know why we need three frames, sorry
            void $ window >>= requestAnimationFrame do
              void $ window >>= requestAnimationFrame do
                void $ window >>= requestAnimationFrame do
                  bbsWidthAndHeight ← getBbsWidthAndHeight
                  for_ bbsWidthAndHeight.bbʔ $ \_ → do
                    let
                      newPlacement = getBestPlacement
                        bbsWidthAndHeight
                        props.placement
                        props.fallbackPlacements
                    setVisiblePlacement (Just newPlacement)
                  -- Do this always
                  setVisibleChild (Just child)
          Nothing →
            setVisibleChild Nothing

    useLayoutEffectAlways do
      recalculatePlacement
      mempty

    useOnResize (200.0 # Milliseconds) \_ → do
      setVisibleChild Nothing

    pure $ popOver
      { isVisible: props.childʔ # isJust
      , dismissBehaviourʔ: props.dismissBehaviourʔ
      , containerId: props.containerId
      , hide: props.hide
      , placement: visiblePlacementʔ # fromMaybe props.placement
      , placementRef: props.placementRef
      , content:
          fragment
            [ guard (visibleChildʔ # isNothing) $ props.childʔ # foldMap
                \child → R.div'
                  </
                    { ref: contentRef
                    , style: measureStyle
                    }
                  /> [ child ]
            , M.animatePresence </ {} />
                [ visibleChildʔ # foldMap \child →
                    M.div
                      </
                        { key: "popOver"
                        , style
                        , initial
                        , animate
                        , exit
                        , onAnimationComplete
                        , onAnimationStart
                        , ref: motionRef
                        }
                      />
                        [ child ]
                ]
            ]
      }

popOverStyle ∷ Style
popOverStyle = positionAbsolute <> acceptClicks

type Props =
  { hide ∷ Effect Unit
  , isVisible ∷ Boolean
  , content ∷ JSX
  , placement ∷ Placement
  , placementRef ∷ NodeRef
  , dismissBehaviourʔ ∷ Maybe DismissBehaviour
  , containerId ∷ String
  }

toTransformOrigin ∷ Placement → String
toTransformOrigin (Placement primary secondary) = primaryOrigin <> " " <>
  secondaryOrigin
  where
  primaryOrigin = case primary of
    Above → "bottom"
    LeftOf → "right"
    RightOf → "left"
    Below → "top"
  secondaryOrigin = case secondary of
    Centre → "center"
    Start | primary == Above || primary == Below → "left"
    Start → "top"
    End | primary == Above || primary == Below → "right"
    End → "bottom"

mkPopOver ∷ React.Component Props
mkPopOver = do
  clickAway ← mkClickAway
  React.component "popOver" \props → React.do
    let { hide, isVisible, content, dismissBehaviourʔ, containerId } = props
    refBB /\ setRefBB ← React.useState' (zero ∷ DOMRect)
    let
      recalc = when isVisible do
        bbʔ ← getBoundingBoxFromRef props.placementRef
        fromTop ← window >>= scrollY
        fromLeft ← window >>= scrollX
        let
          adjustedBbʔ = bbʔ <#> \bb → bb
            { top = bb.top + fromTop
            , left = bb.left + fromLeft
            , right = bb.right + fromLeft
            , bottom = bb.bottom + fromTop
            }
        for_ adjustedBbʔ \newBb →
          unless (refBB == newBb) do
            setRefBB newBb

    useEffectAlways do
      recalc
      mempty

    renderInPortal ← useRenderInPortal containerId
    pure $ fragment
      [ case dismissBehaviourʔ of
          Just (DismissOnClickAway { id, css }) →
            clickAway { css, hide, isVisible, clickAwayId: id }
          _ → mempty
      , renderInPortal
          ( R.div'
              </*
                { className: "popOver"
                , css: popOverStyle
                , style: toAbsoluteCSS refBB props.placement
                }
              />
                [ content ]
          )
      ]

isWithin ∷ { w :: Number, h :: Number } -> DOMRect → Boolean
isWithin { w, h } bb = bb.top >= 0.0 && bb.left >= 0.0 && bb.bottom <= h && bb.right <= w

toAbsoluteCSS ∷ DOMRect → Placement → R.CSS
toAbsoluteCSS bb (Placement primary secondary) =
  case primary, secondary of
    Above, Centre → R.css
      { top: bb.top
      , left: bb.left + bb.width / 2.0
      , transform: "translate(-50%, -100%)"
      }
    Above, Start → R.css
      { top: bb.top
      , left: bb.left
      , transform: "translate(0, -100%)"
      }
    Above, End → R.css
      { top: bb.top
      , left: bb.right
      , transform: "translate(-100%, -100%)"
      }
    RightOf, Centre → R.css
      { top: bb.top + bb.height / 2.0
      , left: bb.right
      , transform: "translate(0, -50%)"
      }
    RightOf, Start → R.css
      { top: bb.top
      , left: bb.right
      }
    RightOf, End → R.css
      { top: bb.bottom
      , left: bb.right
      , transform: "translate(0, -100%)"
      }
    LeftOf, Centre → R.css
      { top: bb.top + bb.height / 2.0
      , left: bb.left
      , transform: "translate(-100%, -50%)"
      }
    LeftOf, Start → R.css
      { top: bb.top
      , left: bb.left
      , transform: "translate(-100%, 0)"
      }
    LeftOf, End → R.css
      { top: bb.bottom
      , left: bb.left
      , transform: "translate(-100%, -100%)"
      }
    Below, Centre → R.css
      { top: bb.bottom
      , left: bb.left + bb.width / 2.0
      , transform: "translate(-50%, 0)"
      }
    Below, Start → R.css
      { top: bb.bottom
      , left: bb.left
      }
    Below, End → R.css
      { top: bb.bottom
      , left: bb.right
      , transform: "translate(-100%, 0)"
      }

placeAt :: forall r. DOMRect -> { width :: Number, height :: Number | r } -> Placement -> DOMRect
placeAt bb { width, height } (Placement primary secondary) = complete case primary, secondary of
  Above, Centre →
    { x: bb.left + (bb.width / 2.0) - (width / 2.0)
    , y: bb.top - (height / 2.0)
    }
  Above, Start →
    { x: bb.left
    , y: bb.top - height
    }
  Above, End →
    { x: bb.right - width
    , y: bb.top - height
    }
  RightOf, Centre →
    { x: bb.right
    , y: bb.y + (bb.height / 2.0) - (height / 2.0)
    }
  RightOf, Start →
    { x: bb.right
    , y: bb.top
    }
  RightOf, End →
    { x: bb.right
    , y: bb.bottom - height
    }
  LeftOf, Centre →
    { x: bb.left - width
    , y: bb.top + (bb.height / 2.0) - (height / 2.0)
    }
  LeftOf, Start →
    { x: bb.left - width
    , y: bb.top
    }
  LeftOf, End →
    { x: bb.left - width
    , y: bb.bottom - height
    }
  Below, Centre →
    { x: bb.left + (bb.width / 2.0) - (width / 2.0)
    , y: bb.bottom
    }
  Below, Start →
    { x: bb.left
    , y: bb.bottom
    }
  Below, End →
    { x: bb.right - width
    , y: bb.bottom
    }
  where
  complete { x, y } = { x, y, width, height, left: x, top: y, right: x + width, bottom: y + height }

