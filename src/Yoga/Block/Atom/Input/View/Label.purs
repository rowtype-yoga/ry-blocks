module Yoga.Block.Atom.Input.View.Label where

import Yoga.Prelude.View
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NonEmptyString
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion as M
import React.Basic.DOM as R
import React.Basic.Emotion (StyleProperty)
import React.Basic.Hooks (reactComponent)
import Yoga.Block.Atom.Input.Style as Style

type Props =
  { onClickLargeLabel ∷ EventHandler
  , isRequired ∷ Boolean
  , isInvalid ∷ Boolean
  , isFocussed ∷ Boolean
  , renderLargeLabel ∷ Boolean
  , inputBbox ∷ DOMRect
  , parentBbox ∷ DOMRect
  , labelId ∷ String
  , inputId ∷ String
  , labelText ∷ NonEmptyString
  , background ∷ StyleProperty
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "Input Label" \props@{ inputBbox, parentBbox } -> React.do
        -- UI
        let
          text = R.text $ NonEmptyString.toString props.labelText
          result =
            container
              [ labelContainer
                  [ labelSpan
                      [ text ]
                  ]
              ]
          container = div </* { className: "ry-input-label-container", css: Style.labelContainer }
          labelContainer =
            M.div
              </* { className: if props.renderLargeLabel then "ry-input-label-large" else "ry-input-label-small"
                , layout: M.layout true
                , layoutId: M.layoutId "ry-input-label"
                , css:
                  if props.renderLargeLabel then
                    Style.labelLarge
                      { left: inputBbox.left - parentBbox.left
                      , width: inputBbox.width
                      , top: inputBbox.top - parentBbox.top
                      }
                  else
                    Style.labelSmall props.background
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
