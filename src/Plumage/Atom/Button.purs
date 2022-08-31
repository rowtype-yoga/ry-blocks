module Plumage.Atom.Button where

import Prelude

import Data.Array (fold)
import Data.Monoid (guard)
import Data.Nullable as Nullable
import Data.Traversable (for_)
import Data.Tuple.Nested ((/\))
import Foreign.Object as Object
import Framer.Motion as M
import Fahrtwind.Layer as Layer
import Fahrtwind.Style (background, black, border, borderCol, borderNone, borderSolid, boxSizingBorderBox, cursorPointer, gray, inlineBlock, mXY, opacity, pX, pXY, pY, positionAbsolute, positionRelative, rounded, roundedXl, shadowDefaultCol, shadowSm, textCol, violet, white)
import Prim.Row (class Union)
import React.Aria.Button (ButtonPropsImpl, useButton)
import React.Aria.Focus (useFocusRing)
import React.Aria.Utils (mergeProps)
import React.Basic (JSX)
import React.Basic.DOM (css, unsafeCreateDOMComponent)
import React.Basic.DOM as R
import React.Basic.Emotion (Style)
import React.Basic.Emotion as E
import React.Basic.Hooks (Component, component, useEffectAlways)
import React.Basic.Hooks as React
import Yoga.Prelude.View (getBoundingBoxFromRef)

mkButton ∷
  ∀ attrsIn69 attrsIn_70.
  Union attrsIn69 attrsIn_70 ButtonPropsImpl ⇒
  Component
    { buttonProps ∷ Record attrsIn69
    , children ∷ Array JSX
    , containerCss ∷ Style
    , css ∷ Style
    }
mkButton = do
  rawButton ← unsafeCreateDOMComponent "button"
  component "Button" \props → React.do
    ref ← React.useRef Nullable.null
    containerRef ← React.useRef Nullable.null
    boundingBox /\ setBoundingBox ← React.useState' zero
    useEffectAlways do
      maybeBB ← getBoundingBoxFromRef containerRef
      for_ maybeBB \bb →
        when (bb /= boundingBox) (setBoundingBox bb)
      mempty
    { buttonProps } ← useButton props.buttonProps ref
    { isFocused, isFocusVisible, focusProps } ←
      useFocusRing { within: false, isTextInput: false, autoFocus: false }
    pure
      $ E.element R.div'
          { className: "plm-button-container"
          , css:
              positionRelative
                <> inlineBlock
                <> pXY 0
                <> mXY 0
                <> props.containerCss
          , ref: containerRef
          , children:
              [ E.element rawButton
                  ( mergeProps
                      focusProps
                      ( mergeProps
                          buttonProps
                          { className: "plm-button"
                          , css: props.css
                          , ref
                          , children: props.children
                          }
                      )
                  )
              , guard (isFocused && isFocusVisible)
                  ( E.element M.div
                      { className: "focus-outline"
                      , css: focusStyle
                      , initial:
                          M.initial
                            $ css
                                { width: boundingBox.width
                                , height: boundingBox.height
                                , left: 0
                                , top: 0
                                }
                      , animate:
                          M.animate
                            $ css
                                { width: boundingBox.width + 12.0
                                , height: boundingBox.height + 12.0
                                , left: -6.0
                                , top: -6.0
                                }
                      , layout: M.layout true
                      , layoutId: M.layoutId "focus-indicator"
                      , _aria: Object.singleton "hidden" "true"
                      }
                  )
              ]
          }

focusStyle ∷ Style
focusStyle =
  fold
    [ border 4
    , borderCol violet._400
    , borderSolid
    , boxSizingBorderBox
    , rounded (E.px 17)
    , positionAbsolute
    , opacity 80
    , Layer.topmost
    ]

baseButtonStyle ∷ Style
baseButtonStyle =
  fold
    [ background white
    , textCol black
    , roundedXl
    , borderSolid
    , borderCol gray._300
    , border 1
    , pY 11
    , pX 27
    , boxSizingBorderBox
    , shadowSm
    , cursorPointer
    , E.css
        { fontFamily: E.str "InterVariable, sans-serif"
        , fontSize: E.str "0.95em"
        , fontWeight: E.str "500"
        , letterSpacing: E.str "0.025em"
        , textAlign: E.str "center"
        , outline: E.none
        }
    ]

primaryButtonStyle ∷ Style
primaryButtonStyle =
  baseButtonStyle
    <> fold
      [ background violet._600
      , textCol white
      , borderNone
      , pY 12
      , pX 28
      , shadowDefaultCol violet._600
      ]