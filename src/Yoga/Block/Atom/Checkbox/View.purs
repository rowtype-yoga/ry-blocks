module Yoga.Block.Atom.Checkbox.View where

import Yoga.Prelude.View

import React.Basic.DOM.SVG as SVG
import Yoga.Block.Atom.Checkbox.Style as Style

type Props = PropsF Id

type MandatoryProps :: forall k. k -> k
type MandatoryProps r = (| r)

type PropsF :: forall k. (Type -> k) -> Row k
type PropsF f =
  ( ticked ∷ f Boolean
  , size ∷ f Number
  , stroke :: f String
  , strokeWidth :: f Number
  | Style.Props f (MandatoryProps ())
  )

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | MandatoryProps p }
component = rawComponent

rawComponent :: forall p. ReactComponent { | p }
rawComponent = mkForwardRefComponent "Checkbox" \(props :: { | PropsF OptionalProp }) ref -> React.do
  pure $ SVG.svg'
    </*
      { ref
      , className: "ry-checkmark"
      , css: Style.checkmark
      , width: show (props.size ?|| 24.0)
      , xmlns: "http://www.w3.org/2000/svg"
      , viewBox: "0 0 52 52"
      }
    />
      [ SVG.path' </>
          { stroke: props.stroke ?|| "currentColor"
          , strokeWidth: show (props.strokeWidth ?|| 3.0)
          , fill: "none"
          , d: "M14.1 27.2l7.1 7.2 16.7-16.8"
          }

      ]