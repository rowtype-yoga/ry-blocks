module Yoga.Block.Atom.Input.View.Label where

import Yoga.Prelude.View
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NonEmptyString
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion as M
import React.Basic.DOM as R
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Yoga.Block.Atom.Input.Style as Style

type Props =
  { onClickLargeLabel ∷ EventHandler
  , isRequired ∷ Boolean
  , isInvalid ∷ Boolean
  , isFocussed ∷ Boolean
  , renderLargeLabel ∷ Boolean
  , leftIconRef ∷ NodeRef
  , inputRef ∷ NodeRef
  , labelId ∷ String
  , inputId ∷ String
  , labelText ∷ NonEmptyString
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "Input Label" \props -> React.do
        -- Track input bounding box
        inputBbox /\ setInputBbox <- useState' (zero ∷ DOMRect)
        useEffectOnce do
          maybeBBox <- getBoundingBoxFromRef props.inputRef
          for_ maybeBBox setInputBbox
          mempty
        -- Left icon
        leftIconBbox /\ setLeftIconBbox <- useState' Nothing
        useEffectAlways do
          when (leftIconBbox == Nothing) do
            maybeBBox <- getBoundingBoxFromRef props.leftIconRef
            for_ maybeBBox (setLeftIconBbox <<< Just)
          mempty
        -- UI
        let
          result =
            container
              [ sharedLayout
                  [ labelContainer
                      [ labelSpan
                          [ text ]
                      ]
                  ]
              ]
          text = R.text $ NonEmptyString.toString props.labelText
          sharedLayout = M.animateSharedLayout </ { type: M.switch }
          container = div </* { className: "ry-input-label-container", css: Style.labelContainer }
          labelContainer =
            guard (inputBbox /= zero)
              $ M.div
              </* { className: if props.renderLargeLabel then "ry-input-label-large" else "ry-input-label-small"
                , layoutId: M.layoutId "ry-input-label"
                , css:
                  if props.renderLargeLabel then
                    Style.labelLarge { leftIconWidth: leftIconBbox <#> _.width, inputWidth: inputBbox.width }
                  else
                    Style.labelSmall
                , layout: M.layout true
                , transition: M.transition { duration: 0.18, ease: "easeOut" }
                , _data:
                  Object.fromHomogeneous
                    { "has-focus": show props.isFocussed
                    , "invalid": show props.isInvalid
                    , "required": show props.isRequired
                    }
                , initial: M.initial false
                }
          labelSpan =
            M.span
              </ { onClick: props.onClickLargeLabel
                , layout: M.layout true
                , layoutId: M.layoutId "ry-input-label-text"
                , htmlFor: props.inputId
                , id: props.labelId
                }
        pure result
