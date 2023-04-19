module Yoga.Block.Molecule.ReadMore.View (component, Props, PropsR) where

import Yoga.Prelude.View

import Color (Color)
import Framer.Motion as Motion
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Yoga.Block.Molecule.ReadMore.Style as Style

type PropsR ∷ ∀ k. (Type → k) → Row k
type PropsR f =
  ( children ∷ f (Array JSX)
  , moreLabel ∷ f JSX
  , lessLabel ∷ f JSX
  , background ∷ f Color
  , onMoreClicked ∷ f (Effect Unit)
  , onLessClicked ∷ f (Effect Unit)
  | ()
  )

type Props =
  PropsR Id

type PropsOptional =
  PropsR OptionalProp

-- TODO: handle resize gracefully
component ∷ ∀ p q. Union p q Props ⇒ ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Read More"
    \(props@{ children, moreLabel, lessLabel } ∷ Record PropsOptional) ref →
      React.do
        expanded /\ modifyExpanded ← useState false
        overflows /\ setOverflows ← useState' false
        textRef ← useRef null
        useLayoutEffectAlways do
          unless expanded do
            ow ← getOffsetWidthFromRef textRef
            sw ← getScrollWidthFromRef textRef
            when (sw > ow && not overflows) do
              setOverflows true
            when (sw < ow && overflows) do
              setOverflows false
          mempty
        let showLabel = overflows
        pure
          $ Motion.span
          </*
            { className: "ry-read-more-container"
            , css: Style.container
            , style:
                R.css
                  { display: if expanded then "inline-block" else "inline-flex"
                  }
            , ref
            }
          />
            [ Motion.span
                </*
                  { className: "ry-read-more-text"
                  , css:
                      if expanded then
                        Style.expandedText
                      else
                        Style.contractedText
                  , ref: textRef
                  }
                />
                  [ if (overflows && not expanded) then
                      Motion.div
                        </*
                          { className: "ry-read-more-fade-block"
                          , css: Style.fadeBlock props.background
                          }
                        /> (children ?|| mempty)
                    else
                      fragment (children ?|| mempty)
                  ]
            , guard showLabel $ Motion.span
                </*
                  { className: "ry-read-more-label"
                  , css: Style.label
                  }
                />
                  [ R.a'
                      </
                        { onClick:
                            handler preventDefault do
                              const do
                                ( if expanded then props.onLessClicked
                                  else props.onMoreClicked
                                ) ?|| mempty
                                modifyExpanded not
                        }
                      />
                        [ if expanded then
                            lessLabel ?|| (R.text "less")
                          else
                            moreLabel ?|| (R.text "more")
                        ]
                  ]
            ]
