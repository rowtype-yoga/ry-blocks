module Yoga.Block.Atom.Input.View where

import Yoga.Prelude.View

import Data.String.NonEmpty (NonEmptyString)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object (Object)
import Foreign.Object as Object
import Framer.Motion as M
import React.Basic.DOM (css)
import React.Basic.Hooks (reactComponent, useId)
import React.Basic.Hooks as React
import Record.Builder as RB
import Type.Prelude (Proxy(..))
import Web.HTML.HTMLInputElement as InputElement
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Input.Style (SizeVariant(..))
import Yoga.Block.Atom.Input.Style as Style
import Yoga.Block.Atom.Input.Types (HTMLInputType)
import Yoga.Block.Atom.Input.Types as InputTypes
import Yoga.Block.Atom.Input.View.Container as Container
import Yoga.Block.Atom.Input.View.HTMLInput as HTMLInput
import Yoga.Block.Atom.Input.View.Label as Label
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Icon.SVG as SVGIcon

type PropsF ∷ ∀ k. (Type -> k) -> Row k -> Row k
type PropsF f r =
  ( leading ∷ f JSX
  , trailing ∷ f JSX
  , label ∷ f NonEmptyString
  , type ∷ f HTMLInputType
  , inputRef ∷ f NodeRef
  , forceSmallLabel ∷ f Boolean
  | Style.Props f r
  )

type Props =
  PropsF Id (InputWritableProps)

type PropsOptional =
  PropsF OptionalProp (InputReadableProps)

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

mkLeftIcon ∷ JSX -> JSX
mkLeftIcon icon =
  div
    </*
      { className: "ry-input-left-icon-container"
      , css: Style.leftIconContainer
      }
    /> [ Icon.component </> { size: Style.leftIconSize, icon } ]

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "YogaInput" do
    \(props ∷ { | PropsOptional }) propsRef -> React.do
      backupId <- useId
      hasFocus /\ setHasFocus <- useState' false
      inputBackupRef ∷ NodeRef <- useRef null
      let inputRef = props.inputRef ?|| inputBackupRef
      backupRef ∷ NodeRef <- useRef null
      let ref = forwardedRefAsMaybe propsRef # fromMaybe backupRef
      let
        maybeValue ∷ Maybe String
        maybeValue = props.value # opToMaybe
      internalValue /\ setValue <- useState' ""
      let
        hasValue = case maybeValue of
          Just v -> v /= ""
          Nothing -> internalValue /= ""

        aria ∷ Object String
        aria = props._aria # opToMaybe # fold

        labelId ∷ String
        labelId = props.id ?|| backupId # (_ <> "-label")
        renderSmallLabel = isTruthy props.forceSmallLabel || hasFocus || hasValue

        renderLargeLabel ∷ Boolean
        renderLargeLabel = not renderSmallLabel

        maybeLabelText ∷ Maybe NonEmptyString
        maybeLabelText = props.label # opToMaybe

        mkLabel ∷ NonEmptyString -> JSX
        mkLabel labelText =
          Label.component
            </>
              { isFocussed: hasFocus
              , isRequired: aria # Object.lookup "required" # (_ == Just "true")
              , isInvalid: aria # Object.lookup "invalid" # (_ == Just "true")
              , renderLargeLabel
              , labelId
              , inputId: props.id ?|| backupId
              , inputRef
              , parentRef: ref
              , labelText
              , background: props.background ?|| colour.interfaceBackground
              , textColour: props.textColour ?|| colour.text
              , sizeVariant: props.sizeVariant ?|| SizeMedium
              }

        leading ∷ Maybe JSX
        leading =
          opToMaybe props.leading
            <|>
              if (props.type <#> (_ == InputTypes.Search)) ?|| false then
                Just $ mkLeftIcon SVGIcon.magnifyingGlass
              else
                Nothing

        trailing ∷ Maybe JSX
        trailing = opToMaybe props.trailing

        maybePlaceholder ∷ Maybe String
        maybePlaceholder = do
          given <- props.placeholder # opToMaybe
          if isJust maybeLabelText && hasFocus then Just given else Nothing

        onBlur = handler_ do
          when hasFocus $ setHasFocus false
          el <- getHTMLElementFromRef ref
          let inputEl = InputElement.fromHTMLElement =<< el
          for_ inputEl \ie -> do
            v <- InputElement.value ie
            setValue v

        onFocus = handler_ (unless hasFocus $ setHasFocus true)
        onChange = handler targetValue (setValue <<< fromMaybe "")
      let
        inputProps ∷ { | PropsOptional }
        inputProps =
          props
            { onFocus = cast (composeHandler onFocus props.onFocus)
            , onBlur = cast (composeHandler onBlur props.onBlur)
            , onChange = cast (composeHandler onChange props.onChange)
            , placeholder = maybePlaceholder # maybeToOp
            , _aria =
                if props.label # opToMaybe # isJust then
                  cast (aria # Object.insert "labelledby" labelId)
                else
                  cast (aria)
            }

        theInput =
          HTMLInput.componentOptional
            </>
              ( ( (cast ∷ _ -> { | HTMLInput.PropsF OptionalProp (InputWritablePropsF OptionalProp ()) })
                    ( ( inputProps
                          # RB.build
                              ( RB.delete (Proxy ∷ _ "leading")
                                  >>> RB.delete (Proxy ∷ _ "label")
                                  >>> RB.delete (Proxy ∷ _ "trailing")
                                  >>> RB.delete (Proxy ∷ _ "inputRef")
                                  >>> RB.delete (Proxy ∷ _ "forceSmallLabel")
                                  >>> RB.insert (Proxy ∷ _ "ref") inputRef
                              )
                      )
                    )
                ) # deleteUndefineds
              )
        inputContainer =
          Container.rawContainer
            </
              { hasFocus: hasFocus
              , isInvalid: aria # Object.lookup "invalid" <#> (_ == "true") # maybeToOp
              , css: props.css
              , background: props.background
              , borderColour: props.borderColour
              , textColor: props.textColour
              , ref
              , hasLabel: props.label # opToMaybe # isJust
              , sizeVariant: props.sizeVariant
              }
            />
              [ leading # foldMap \l -> div </ {} /> [ l ]
              , theInput
              , trailing # foldMap \t -> div </ {} /> [ t ]
              ]
      pure
        $ case maybeLabelText of
            Nothing -> inputContainer
            Just labelText ->
              div
                </*
                  { className: "ry-label-and-input-wrapper"
                  , css: Style.labelAndInputWrapper <>? props.css
                  }
                /> [ inputContainer, mkLabel labelText ]

passwordIcon
  ∷ ReactComponent
      { hidePassword ∷ Boolean
      , modifyHidePassword ∷ (Boolean -> Boolean) -> Effect Unit
      }
passwordIcon =
  unsafePerformEffect
    $ reactComponent "Password Icon" \props -> React.do
        pure $ div
          </*
            { onClick: handler preventDefault \_ -> props.modifyHidePassword not
            , className: "ry-input-right-icon-container"
            , css: Style.rightIconContainer
            }
          />
            [ M.animatePresence
                </
                  { exitBeforeEnter: true
                  }
                />
                  [ if props.hidePassword then
                      M.div
                        </
                          { key: "eyeOpen"
                          , initial: M.initial $ css { scaleY: 0.2 }
                          , animate: M.animate $ css { scaleY: 1.0 }
                          , exit: M.exit $ css {}
                          , transition: M.transition { scaleY: { type: "spring", duration: 0.12, bounce: 0.00 } }
                          }
                        />
                          [ Icon.component
                              </>
                                { size: Style.rightIconSize
                                , icon: SVGIcon.eyeOpen
                                }
                          ]
                    else
                      M.div
                        </
                          { key: "eyeClosed"
                          , initial: M.initial $ css { scaleY: 1.0 }
                          , animate: M.animate $ css { scaleY: 0.4 }
                          , exit: M.exit $ css { scaleY: 0.2 }
                          , transition: M.transition { scaleY: { type: "spring", duration: 0.12, bounce: 0.00 } }
                          }
                        />
                          [ Icon.component
                              </>
                                { size: Style.rightIconSize
                                , icon: SVGIcon.eyeClosed
                                }
                          ]
                  ]
            ]
