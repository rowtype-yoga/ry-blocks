module Yoga.Block.Atom.Input.View.Label where

import Yoga.Prelude.View
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NonEmptyString
import Debug (spy)
import Effect.Class.Console (error, log, logShow, warn)
import Effect.Class.Console as Log
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion as M
import React.Basic.DOM as R
import React.Basic.Emotion (StyleProperty)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Record.Extra (sequenceRecord)
import Unsafe.Reference (unsafeRefEq)
import Web.DOM.Element as Element
import Web.DOM.ResizeObserver as ResizeObserver
import Web.HTML.HTMLElement (offsetWidth)
import Yoga.Block.Atom.Input.Style as Style

type Props =
  { onClickLargeLabel ∷ EventHandler
  , isRequired ∷ Boolean
  , isInvalid ∷ Boolean
  , isFocussed ∷ Boolean
  , renderLargeLabel ∷ Boolean
  , labelId ∷ String
  , inputId ∷ String
  , inputRef ∷ NodeRef
  , parentRef ∷ NodeRef
  , labelText ∷ NonEmptyString
  , background ∷ StyleProperty
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "Input Label" \props@{ inputRef, parentRef } -> React.do
        maybeOffsets /\ setOffsets <- useState' Nothing
        parentBbox /\ setParentBbox <- useState' (zero ∷ DOMRect)
        -- this is so complicated because we need to take scale into account
        useLayoutEffectOnce do
          inputWidth <- getOffsetWidthFromRef inputRef
          inputRect <- getBoundingBoxFromRef inputRef
          parentWidth <- getOffsetWidthFromRef parentRef
          parentRect <- getBoundingBoxFromRef parentRef
          case sequenceRecord { inputWidth, parentWidth, inputRect, parentRect } of
            Just p -> do
              setOffsets
                $ Just
                    { largeLeft:
                      (p.inputRect.left * (p.inputWidth / p.inputRect.width))
                        - (p.parentRect.left * (p.parentWidth / p.parentRect.width))
                    , largeWidth: p.inputWidth
                    }
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
              # foldMap \{ largeLeft, largeWidth } ->
                  M.div
                    </* { className: if props.renderLargeLabel then "ry-input-label-large" else "ry-input-label-small"
                      , layout: M.layout true
                      , layoutId: M.layoutId "ry-input-label"
                      , css:
                        if props.renderLargeLabel then
                          Style.labelLarge
                            { left: largeLeft
                            , width: largeWidth
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
