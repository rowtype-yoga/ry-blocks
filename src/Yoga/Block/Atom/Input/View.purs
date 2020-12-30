module Yoga.Block.Atom.Input.View where

import Yoga.Prelude.View
import Data.String.NonEmpty (NonEmptyString)
import Foreign.Object (Object)
import Foreign.Object as Object
import Framer.Motion as M
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML.HTMLInputElement as InputElement
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Input.Style as Style
import Yoga.Block.Atom.Input.Types (HTMLInput)
import Yoga.Block.Atom.Input.Types as HTMLInput
import Yoga.Block.Atom.Input.View.Container (rawContainer)
import Yoga.Block.Atom.Input.View.Label as Label
import Yoga.Block.Icon.SVG as SVGIcon

type PropsF f =
  ( leading ∷ f JSX
  , trailing ∷ f JSX
  , label ∷ f NonEmptyString
  , type ∷ f HTMLInput
  | Style.Props f (InputPropsF f ())
  )

coerceProps ∷ { | PropsOptional } -> { | Props }
coerceProps = unsafeCoerce

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

mkLeftIcon ∷ JSX -> JSX
mkLeftIcon icon =
  div
    </* { className: "ry-input-left-icon-container"
      , css: Style.leftIconContainer
      }
    /> [ Icon.component
          </> { size: Style.leftIconSize
            , icon
            }
      ]

inputComponent ∷ ∀ p q. Union p q Props => ReactComponent { | p }
inputComponent = rawInput

inputComponentOptional ∷ ∀ p q. Union p q PropsOptional => ReactComponent { | p }
inputComponentOptional = rawInput

rawInput ∷ ∀ p. ReactComponent { | p }
rawInput =
  mkForwardRefComponent "Input" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        result = inputWrapper [ input ]
        inputWrapper = div </* { className: "ry-input-wrapper", css: Style.inputWrapper }
        input = emotionInput ref inputProps { className: "ry-input", css: Style.input }
        inputProps = props { type = HTMLInput.toString <$> props.type }
      pure result

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "InputContainer" do
    \(props ∷ { | PropsOptional }) propsRef -> React.do
      hasFocus /\ setHasFocus <- useState' false
      parentRef ∷ NodeRef <- useRef null
      backupRef ∷ NodeRef <- useRef null
      let ref = forwardedRefAsMaybe propsRef # fromMaybe backupRef
      let
        focusInput =
          unless hasFocus do
            maybeHTMLElement <- getHTMLElementFromRef ref
            for_ maybeHTMLElement focus
      let
        maybeValue ∷ Maybe String
        maybeValue = props.value # opToMaybe
      hasValue /\ setHasValue <- useState' ((maybeValue # isJust) && (maybeValue /= Just ""))
      let
        aria ∷ Object String
        aria = props._aria # opToMaybe # fold
        labelId ∷ String
        labelId = props.id # opToMaybe # fold # (_ <> "-label")
        renderLargeLabel ∷ Boolean
        renderLargeLabel = not hasFocus && not hasValue
        maybeLabelText ∷ Maybe NonEmptyString
        maybeLabelText = props.label # opToMaybe
        mkLabel ∷ NonEmptyString -> JSX
        mkLabel labelText =
          Label.component
            </> { onClickLargeLabel: handler preventDefault (const focusInput)
              , isFocussed: hasFocus
              , isRequired: aria # Object.lookup "required" # (_ == Just "true")
              , isInvalid: aria # Object.lookup "invalid" # (_ == Just "true")
              , renderLargeLabel
              , labelId
              , inputId: props.id ?|| "no-id" -- [TODO] Enforce ID?
              , inputRef: ref
              , parentRef
              , labelText
              }
        leading ∷ Maybe JSX
        leading =
          opToMaybe props.leading
            <|> if (props.type <#> (_ == HTMLInput.Search)) ?|| false then
                Just $ mkLeftIcon SVGIcon.magnifyingGlass
              else
                Nothing
        trailing ∷ Maybe JSX
        trailing = opToMaybe props.trailing
        maybePlaceholder ∷ Maybe String
        maybePlaceholder = do
          given <- props.placeholder # opToMaybe
          if isJust maybeLabelText && hasFocus then Just given else Nothing
        onBlur =
          handler preventDefault
            ( const do
                when hasFocus $ setHasFocus false
                el <- getHTMLElementFromRef ref
                let inputEl = InputElement.fromHTMLElement =<< el
                for_ inputEl \ie -> do
                  v <- InputElement.value ie
                  setHasValue (v /= "")
            )
        onFocus = handler preventDefault (const $ unless hasFocus $ setHasFocus true)
        theInput =
          inputComponentOptional
            </> ( (cast ∷ _ -> { | PropsOptional })
                  $ props
                      { onFocus = composeHandler onFocus props.onFocus
                      , onBlur = composeHandler onBlur props.onBlur
                      , ref = ref
                      , placeholder = maybePlaceholder # maybeToOp
                      , _aria =
                        if props.label # opToMaybe # isJust then
                          aria # Object.insert "labelledby" labelId
                        else
                          aria
                      }
              )
        inputContainer =
          rawContainer
            </ { hasFocus: hasFocus
              , isInvalid: aria # Object.lookup "invalid" <#> (_ == "true") # maybeToOp
              , css: props.css
              , ref: parentRef
              }
            /> [ leading # foldMap \l -> div </ {} /> [ l ]
              , theInput
              , trailing # foldMap \t -> div </ {} /> [ t ]
              ]
      pure
        $ case props.type # opToMaybe of
            Just HTMLInput.Password -> password </> props
            _ -> case maybeLabelText of
              Nothing -> inputContainer
              Just labelText ->
                div
                  </* { className: "ry-label-and-input-wrapper"
                    , css: Style.labelAndInputWrapper
                    }
                  /> [ inputContainer, mkLabel labelText ]

password ∷ ∀ p. ReactComponent { | p }
password =
  mkForwardRefComponent "Password" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      hidePassword /\ modifyHidePassword <- useState true
      let
        eyeCon =
          div
            </* { onClick: handler preventDefault \_ -> modifyHidePassword not
              , className: "ry-input-right-icon-container"
              , css: Style.rightIconContainer
              }
            /> [ M.animatePresence
                  </ { exitBeforeEnter: true
                    }
                  /> [ if hidePassword then
                        M.div
                          </ { key: "eyeOpen"
                            , initial: M.initial $ css { scaleY: 0.2 }
                            , animate: M.animate $ css { scaleY: 1.0 }
                            , exit: M.exit $ css {}
                            , transition: M.transition { scaleY: { type: "spring", duration: 0.12, bounce: 0.00 } }
                            }
                          /> [ Icon.component
                                </> { size: Style.rightIconSize
                                  , icon: SVGIcon.eyeOpen
                                  }
                            ]
                      else
                        M.div
                          </ { key: "eyeClosed"
                            , initial: M.initial $ css { scaleY: 1.0 }
                            , animate: M.animate $ css { scaleY: 0.4 }
                            , exit: M.exit $ css { scaleY: 0.2 }
                            , transition: M.transition { scaleY: { type: "spring", duration: 0.12, bounce: 0.00 } }
                            }
                          /> [ Icon.component
                                </> { size: Style.rightIconSize
                                  , icon: SVGIcon.eyeClosed
                                  }
                            ]
                    ]
              ]
      let trailing = props.trailing ?|| eyeCon
      let leading = props.leading ?|| mempty
      pure
        $ div
        </* { className: "ry-input-wrapper", css: Style.inputContainer props }
        /> [ leading
          , R.div' </ {}
              /> [ emotionInput
                    ref
                    (props { type = HTMLInput.toString <$> props.type })
                    { className: "ry-input"
                    , css: Style.input
                    , type: if hidePassword then "password" else "text"
                    }
                ]
          , trailing
          ]
