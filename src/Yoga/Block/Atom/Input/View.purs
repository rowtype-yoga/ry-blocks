module Yoga.Block.Atom.Input.View where

import Yoga.Prelude.View
import Data.Array as Array
import Data.Interpolate (i)
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NonEmptyString
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object (Object)
import Foreign.Object as Object
import Framer.Motion as M
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (CSS, Props_input, css)
import React.Basic.DOM as R
import React.Basic.Emotion (Style)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Web.HTML.HTMLInputElement as InputElement
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Input.Style as Style
import Yoga.Block.Atom.Input.Types (HTMLInput)
import Yoga.Block.Atom.Input.Types as HTMLInput
import Yoga.Block.Icon.SVG as SVGIcon

type PropsF f =
  ( leading ∷ f JSX
  , trailing ∷ f JSX
  , label ∷ f NonEmptyString
  , type ∷ f HTMLInput
  | Style.Props f InputProps
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
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

containerVariants ∷
  { blurred ∷ CSS
  , focussed ∷ CSS
  }
containerVariants =
  { focussed:
    css
      { clipPath
      , transition: { duration: 0.6 }
      }
  , blurred:
    css
      { clipPath:
        drawPathUntil (Array.length path + 1) path
      }
  }
  where
    clipPath = 6 Array... (Array.length path) <#> \ln -> drawPathUntil ln path

type Point =
  { x ∷ Int, y ∷ Int }

drawPathUntil ∷ Int -> Array Point -> String
drawPathUntil idx thePath = do
  let fn { x, y } = i x "%" " " y "%"
  let firstFew = Array.take idx thePath
  let lastFew = Array.drop idx thePath $> (Array.last firstFew # fromMaybe' \_ -> unsafeCrashWith "ogod")
  let rendered = intercalate "," $ fn <$> (firstFew <> lastFew)
  i "polygon(" rendered ")"

path ∷ Array Point
path = mkPath 4 8

mkPath ∷ Int -> Int -> Array Point
mkPath borderX borderY = do
  let
    inside =
      [ {- ⌜ -} p borderX borderY
      , {- ⌞ -} p borderX (100 - borderY)
      , {- ⌟ -} p (100 - borderX) (100 - borderY)
      , {- ⌝ -} p (100 - borderX) borderY
      , {- ⌜ -} p borderX borderY
      ]
    outside =
      [ {-⌜    -} p 0 0
      , {-⌞    -} p 0 100
      , {- .   -} p 25 100
      , {-  .  -} p 50 100
      , {-   . -} p 75 100
      , {-    ⌟-} p 100 100
      , {-    ⌝-} p 100 0
      , {-   ^ -} p 75 0
      , {-  ^  -} p 50 0
      , {- ^   -} p 25 0
      , {-⌜    -} p 0 0
      ]
  inside <> outside <> (Array.reverse inside)
  where
    p ∷ Int -> Int -> Point
    p x y = { x, y }

containerVariantLabels ∷
  { blurred ∷ M.VariantLabel
  , focussed ∷ M.VariantLabel
  }
containerVariantLabels = M.makeVariantLabels containerVariants

rawInput ∷ ∀ p. ReactComponent { | p }
rawInput =
  mkForwardRefComponent "Input" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      let
        result = inputWrapper [ input ]
        inputWrapper = div </* { className: "ry-input-wrapper", css: Style.inputWrapper }
        input = emotionInput ref inputProps { className: "ry-input", css: Style.input }
        inputProps = props { type = HTMLInput.toString <$> props.type # unsafeUnOptional }
      pure result

rawContainer ∷ ∀ p. ReactComponent { | p }
rawContainer =
  mkForwardRefComponent "Input" do
    \( props ∷
        { children ∷ Array JSX
        , label ∷ JSX
        , css ∷ OptionalProp Style
        , hasFocus ∷ Boolean
        , inputProps ∷ { | InputPropsF OptionalProp () }
        }
    ) propsRef -> React.do
      -- Left icon width to correctly place the label
      let
        aria ∷ Object String
        aria = props.inputProps._aria # opToMaybe # fold
        inputContainer =
          M.div
            </* M.motion
                { variants: M.variants containerVariants
                , animate: M.animate if props.hasFocus then containerVariantLabels.focussed else containerVariantLabels.blurred
                }
                { className: "ry-input-container"
                , css: Style.inputContainer props
                , _data:
                  Object.fromHomogeneous
                    { "invalid": aria # Object.lookup "invalid" # fromMaybe ""
                    }
                }
            /> props.children
      pure
        $ div
        </* { className: "ry-label-and-input-wrapper"
          , css: Style.labelAndInputWrapper
          }
        /> [ inputContainer, props.label ]

rawComponent ∷ ∀ p. ReactComponent (Record p)
rawComponent =
  mkForwardRefComponent "InputContainer" do
    \(props ∷ { | PropsOptional }) propsRef -> React.do
      hasFocus /\ setHasFocus <- useState' false
      backupRef ∷ NodeRef <- useRef null -- [TODO] test this
      let ref = forwardedRefAsMaybe propsRef # fromMaybe backupRef
      let
        focusInput =
          unless hasFocus do
            maybeHTMLElement <- getHTMLElementFromRef ref
            for_ maybeHTMLElement focus
      -- Left icon width to correctly place the label
      leftIconRef ∷ NodeRef <- useRef null
      let (maybeValue ∷ Maybe String) = cast props.value # opToMaybe
      hasValue /\ setHasValue <- useState' ((maybeValue # isJust) && (maybeValue /= Just ""))
      let
        aria ∷ Object String
        aria = props._aria # cast # opToMaybe # fold
        labelId ∷ String
        labelId = props.id # cast # opToMaybe # fold # (_ <> "-label")
        renderLargeLabel ∷ Boolean
        renderLargeLabel = not hasFocus && not hasValue
        maybeLabelText ∷ Maybe NonEmptyString
        maybeLabelText = props.label # opToMaybe
        mkLabel ∷ NonEmptyString -> JSX
        mkLabel labelText =
          inputLabel
            </> { onClickLargeLabel: handler preventDefault (const focusInput)
              , isFocussed: hasFocus
              , isRequired: aria # Object.lookup "required" # (_ == Just "true")
              , isInvalid: aria # Object.lookup "invalid" # (_ == Just "true")
              , renderLargeLabel
              , leftIconRef
              , labelId
              , inputId: props.id
              , inputRef: ref
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
          given <- props.placeholder # cast # opToMaybe
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
        inputContainer =
          M.div
            </* M.motion
                { variants: M.variants containerVariants
                , animate: M.animate if hasFocus then containerVariantLabels.focussed else containerVariantLabels.blurred
                }
                { className: "ry-input-container"
                , css: Style.inputContainer props
                , _data:
                  Object.fromHomogeneous
                    { "invalid": aria # Object.lookup "invalid" # fromMaybe ""
                    }
                }
            /> [ leading # foldMap \l -> div </ { ref: leftIconRef } /> [ l ]
              , rawInput
                  </> ( props
                        { onFocus = composeHandler props.onFocus onFocus
                        , onBlur = composeHandler props.onBlur onBlur
                        , ref = ref
                        , placeholder = maybePlaceholder # maybeToOp # unsafeUnOptional
                        , _aria =
                          if props.label # opToMaybe # isJust then
                            aria # Object.insert "labelledby" labelId
                          else
                            aria
                        }
                    )
              -- ref
              -- ( props { type = HTMLInput.toString <$> props.type # unsafeUnOptional }
              --     # setOrDelete (SProxy ∷ _ "placeholder") (maybePlaceholder # maybeToOp)
              --     # setOrDelete (SProxy ∷ _ "value") (maybeValue # maybeToOp)
              -- )
              -- { className: "ry-input"
              -- , css: Style.input
              -- }
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

inputLabel ∷
  ReactComponent
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
inputLabel =
  unsafePerformEffect
    $ reactComponent "Password" \props -> React.do
        inputBbox /\ setInputBbox <- useState' (zero ∷ DOMRect)
        useEffectOnce do
          maybeBBox <- getBoundingBoxFromRef props.inputRef
          for_ maybeBBox setInputBbox
          mempty
        -- Left Icon
        leftIconBbox /\ setLeftIconBbox <- useState' Nothing
        useEffectAlways do
          when (leftIconBbox == Nothing) do
            maybeBBox <- getBoundingBoxFromRef props.leftIconRef
            for_ maybeBBox (setLeftIconBbox <<< Just)
          mempty
        let container = div </* { className: "ry-input-label-container", css: Style.labelContainer }
        let
          labelSpan =
            M.span
              </ { onClick: props.onClickLargeLabel
                , layout: M.layout true
                , layoutId: M.layoutId "ry-input-label-text"
                , htmlFor: props.inputId
                , id: props.labelId
                }
        pure
          $ container
              [ M.animateSharedLayout </ { type: M.switch }
                  /> [ guard (inputBbox /= zero)
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
                        /> [ labelSpan [ R.text $ NonEmptyString.toString props.labelText ] ]
                    ]
              ]

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
                    props { type = HTMLInput.toString <$> props.type # unsafeUnOptional }
                    { className: "ry-input"
                    , css: Style.input
                    , type: if hidePassword then "password" else "text"
                    }
                ]
          , trailing
          ]
