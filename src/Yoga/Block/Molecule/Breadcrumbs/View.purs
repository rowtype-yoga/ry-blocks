module Yoga.Block.Molecule.Breadcrumbs.View
  ( component
  , Props
  , PropsF
  , MandatoryProps
  ) where

import Yoga.Prelude.View

import Color (Color)
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as NEA
import Data.Maybe (isNothing)
import Data.Set as Set
import Debug (spy)
import Effect.Aff (Milliseconds(..), launchAff_)
import Effect.Aff as Aff
import Fahrtwind.Icon.Heroicons as Heroicon
import Framer.Motion as M
import Framer.Motion as Motion
import React.Basic.DOM as R
import React.Basic.DOM as R
import React.Basic.Hooks as React
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import Yoga.Block.Atom.PopOver.Types (HookDismissBehaviour(..), Placement(..))
import Yoga.Block.Atom.PopOver.Types as Placement
import Yoga.Block.Container.Style (sizeStyle)
import Yoga.Block.Hook.UseOverflows (getOverflowsFromRef, useOnSizeChange, useOverflows)
import Yoga.Block.Hook.UsePopOver (usePopOver)
import Yoga.Block.Hook.UseStateEq (useStateEq, useStateEq')
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Layout.Stack as Stack
import Yoga.Block.Molecule.Breadcrumbs.Style as Style

type PropsF f r =
  ( | MandatoryProps + Style.Props f r
  )

type MandatoryProps r =
  ( links ∷ NonEmptyArray { href ∷ String, content ∷ JSX }
  | r
  )

type Props =
  PropsF Id ()

type PropsOptional =
  PropsF OptionalProp ()

component ∷ ∀ p p_. Union p p_ Props ⇒ ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent = mkForwardRefComponent "Route"
  \(props ∷ { | PropsOptional }) ref → React.do

    widthRef ← React.useRef 0.0
    containerRef ← React.useRef null
    maxVisibleRef ← React.useRef (NEA.length props.links)
    let
      { links } = props
      link r = R.a'
        </*
          { className: "route-link"
          , css: Style.link
          , href: r.href
          }
        /> [ r.content ]
      popOverLink r = R.a'
        </*
          { className: "popover-route-link"
          , css: Style.popoverLink
          , href: r.href
          }
        /> [ r.content ]

    { collapsedLinks, visibleLinks } /\ setLinks ← useState
      { collapsedLinks: [], visibleLinks: links }
    -- overflows ← useOverflows
    overflowsRef ← useRef null
    let
      doIt = do
        { x: xOverflows } ← getOverflowsFromRef overflowsRef
        bb ← getBoundingBoxFromRef containerRef <#> fromMaybe zero
        let _ = spy "\n\ncomputing" bb.width
        -- If width has changed we haven't tried any lengths yet
        lastWidth ← React.readRef widthRef
        React.writeRef widthRef bb.width
        when (lastWidth /= bb.width) do
          React.writeRef maxVisibleRef (NEA.length links)
          setLinks $ const { collapsedLinks: [], visibleLinks: links }

        -- Already tried?
        maxVisible ← React.readRef maxVisibleRef
        let _ = spy "maxVisible" maxVisible
        let len = NEA.length visibleLinks
        let _ = spy "len" len
        if xOverflows then do
          React.readRef maxVisibleRef >>=
            (React.writeRef maxVisibleRef <<< (_ - 1))
          setLinks \old → case NEA.uncons old.visibleLinks of
            { head, tail } | Just newVisible ← NEA.fromArray tail → do
              if (Array.length tail >= 2) then
                { collapsedLinks: Array.snoc old.collapsedLinks head
                , visibleLinks: newVisible
                }
              else old
            _ → old
        else do
          pure unit

    useOnSizeChange containerRef (const doIt)
    useOnSizeChange overflowsRef (const doIt)

    popOverRef ← React.useRef null
    popOver ← usePopOver
      { dismissBehaviourʔ:
          Just (DismissPopOverOnClickOutsideTargetAnd [ popOverRef ])
      , containerId: "popovers"
      , placement: Placement Placement.Below Placement.Start
      , fallbackPlacements: []
      }

    pure
      $ R.div'
      </* { css: Style.container, ref: containerRef }
      />
        [ R.div'
            </* { css: Style.breadcrumbContainerWrapper, ref: overflowsRef }
            />
              [ R.div'
                  </*
                    { className: "breadcrumb-container"
                    , css: Style.breadcrumbContainer
                    }
                  />
                    ( case NEA.unsnoc visibleLinks of
                        { last, init: [] } → pure (link last)
                        { last } →
                          if Array.null collapsedLinks then
                            Array.reverse (NEA.toArray $ link <$> visibleLinks)
                          else
                            Array.reverse $ Array.cons
                              ( R.a'
                                  </*
                                    { css: Style.link
                                    , onClick: handler_ popOver.showPopOver
                                    , ref: popOver.targetRef
                                    }
                                  />
                                    [ div "ry-breadcrumb__dots" Style.dots
                                        [ Heroicon.dotsHorizontal ]
                                    ]
                              )
                              (NEA.toArray $ link <$> visibleLinks)
                    )
              , popOver.renderInPopOver $ Stack.component
                  </
                    { css: Style.popover, space: sizeStyle.xs, ref: popOverRef }
                  />
                    (collapsedLinks <#> popOverLink)

              ]
        ]
