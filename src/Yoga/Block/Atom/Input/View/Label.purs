module Yoga.Block.Atom.Input.View.Label where

import Yoga.Prelude.View
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NonEmptyString
import Effect.Class.Console (warn)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion as M
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Record.Extra (sequenceRecord)
import Yoga.Block.Atom.Input.Style as Style

type Props =
  { isRequired ∷ Boolean
  , isInvalid ∷ Boolean
  , isFocussed ∷ Boolean
  , renderLargeLabel ∷ Boolean
  , labelId ∷ String
  , inputId ∷ String
  , inputRef ∷ NodeRef
  , parentRef ∷ NodeRef
  , labelText ∷ NonEmptyString
  , background ∷ String
  , textColour ∷ String
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "Input Label" \props@{ inputRef, parentRef } -> React.do
        maybeOffsets /\ setOffsets <- useState' Nothing
        -- this is so complicated because we need to take scale into account
        useLayoutEffectAlways do
          inputWidth <- getOffsetWidthFromRef inputRef
          inputRect <- getBoundingBoxFromRef inputRef
          parentWidth <- getOffsetWidthFromRef parentRef
          parentRect <- getBoundingBoxFromRef parentRef
          case sequenceRecord $ { inputWidth, parentWidth, inputRect, parentRect } of
            Just p -> do
              let
                newOffsets =
                  Just
                    -- We cannot properly render even an ellipsised large label
                    -- below 5 pixels
                    if p.inputRect.width <= 5.0 then
                      Nothing
                    else do
                      let
                        parentScale = p.parentWidth / p.parentRect.width
                        parentLeft = p.parentRect.left * parentScale
                        inputScale = p.inputWidth / p.inputRect.width
                        inputLeft = p.inputRect.left * inputScale
                      Just
                        { largeLeft: inputLeft - parentLeft
                        , largeWidth: p.parentWidth
                        }
              unless (newOffsets == maybeOffsets) do
                setOffsets newOffsets
            Nothing -> warn "couldn't get stuff"
          mempty
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
            maybeOffsets
              # foldMap case _ of
                  Nothing ->
                    M.div
                      </*
                        ( { className: "ry-input-label-small"
                          , layout: M.layout true
                          , layoutId: M.layoutId ("ry-input-label-" <> props.labelId)
                          , css: Style.labelSmall props.background props.textColour
                          , transition: M.transition { duration: 0.18, ease: "easeOut" }
                          , initial: M.initial false
                          } `unsafeAddProps`
                            { "data-has-focus": props.isFocussed
                            , "data-invalid": show props.isInvalid
                            , "data-required": show props.isRequired
                            }
                        )
                  Just { largeLeft, largeWidth } ->
                    M.div
                      </*
                        ( { className:
                              if props.renderLargeLabel then
                                "ry-input-label-large"
                              else
                                "ry-input-label-small"
                          , layout: M.layout true
                          , layoutId: M.layoutId ("ry-input-label-" <> props.labelId)
                          , css:
                              if props.renderLargeLabel then
                                Style.labelLarge { left: largeLeft, width: largeWidth }
                              else
                                Style.labelSmall props.background props.textColour
                          , transition: M.transition { duration: 0.18, ease: "easeOut" }
                          , initial: M.initial false
                          } `unsafeAddProps`
                            { "data-has-focus": props.isFocussed
                            , "data-invalid": show props.isInvalid
                            , "data-required": show props.isRequired
                            }
                        )
          labelSpan =
            M.span
              </
                { layout: M.layout true
                , layoutId: M.layoutId ("ry-input-label-text-" <> props.labelId)
                , htmlFor: props.inputId
                , style: css { pointerEvents: "none" }
                , id: props.labelId
                }
        pure result