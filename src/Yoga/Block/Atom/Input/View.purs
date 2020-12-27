module Yoga.Block.Atom.Input.View where

import Yoga.Prelude.View
import Data.Array as Array
import Data.Interpolate (i)
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NonEmptyString
import Data.Symbol (SProxy(..))
import Foreign.Object (Object)
import Foreign.Object as Object
import Framer.Motion as M
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (CSS, css)
import React.Basic.DOM as R
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
      , transition: { duration: 0.7 }
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

p ∷ Int -> Int -> Point
p x y = { x, y }

drawPathUntil ∷ Int -> Array Point -> String
drawPathUntil idx thePath = do
  let fn { x, y } = i x "%" " " y "%"
  let firstFew = Array.take idx thePath
  let lastFew = Array.drop idx thePath $> (Array.last firstFew # fromMaybe' \_ -> unsafeCrashWith "ogod")
  let rendered = intercalate "," $ fn <$> (firstFew <> lastFew)
  i "polygon(" rendered ")"

path ∷ Array Point
path = mkPath 3 7

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
      [ {- ⌜ -} p 0 0
      , {- ⌞ -} p 0 100
      , {- ⌟ -} p 100 100
      , {- ⌝ -} p 100 0
      , {- ⌜ -} p 0 0
      ]
  inside <> outside <> (Array.reverse inside)

containerVariantLabels ∷
  { blurred ∷ M.VariantLabel
  , focussed ∷ M.VariantLabel
  }
containerVariantLabels = M.makeVariantLabels containerVariants

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Input" do
    \(props ∷ { | PropsOptional }) propsRef -> React.do
      inputBbox /\ setInputBbox <- useState' (zero ∷ DOMRect)
      hasFocus /\ setHasFocus <- useState' false
      backupRef ∷ NodeRef <- useRef null -- [TODO] test this
      let ref = forwardedRefAsMaybe propsRef # fromMaybe backupRef
      useEffectOnce do
        maybeBBox <- getBoundingBoxFromRef ref
        for_ maybeBBox setInputBbox
        mempty
      let
        focusInput = do
          unless hasFocus do
            maybeHTMLElement <- getHTMLElementFromRef ref
            for_ maybeHTMLElement focus
      -- Left icon width to correctly place the label
      leftIconRef ∷ NodeRef <- useRef null
      leftIconBbox /\ setLeftIconBbox <- useState' Nothing
      useEffectAlways do
        when (isJust (props.leading # opToMaybe) && leftIconBbox == Nothing) do
          maybeBBox <- getBoundingBoxFromRef leftIconRef
          for_ maybeBBox (setLeftIconBbox <<< Just)
        mempty
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
          R.div'
            </* { className: "ry-input-label-container", css: Style.labelContainer }
            /> [ M.animateSharedLayout </ { type: M.switch }
                  /> [ guard (inputBbox /= zero)
                        $ M.div
                        </* { className: if renderLargeLabel then "ry-input-label-large" else "ry-input-label-small"
                          , layoutId: M.layoutId "ry-input-label"
                          , css:
                            if renderLargeLabel then
                              Style.labelLarge { leftIconWidth: leftIconBbox <#> _.width }
                            else
                              Style.labelSmall
                          , layout: M.layout true
                          , transition: M.transition { duration: 0.18, ease: "easeOut" }
                          , _data:
                            Object.fromHomogeneous
                              { "has-focus": show hasFocus
                              , "invalid": aria # Object.lookup "invalid" # fromMaybe ""
                              , "required": aria # Object.lookup "required" # fromMaybe ""
                              }
                          , initial: M.initial false
                          }
                        /> [ M.span
                              </ { onClick: handler preventDefault (const focusInput)
                                , layout: M.layout true
                                , layoutId: M.layoutId "ry-input-label-text"
                                , htmlFor: props.id
                                , id: labelId
                                }
                              /> [ R.text $ NonEmptyString.toString labelText ]
                          ]
                    ]
              ]
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
        inputWrapper =
          M.div
            </* M.motion
                { variants: M.variants containerVariants
                , animate: M.animate if hasFocus then containerVariantLabels.focussed else containerVariantLabels.blurred
                }
                { className: "ry-input-wrapper"
                , css: Style.inputWrapper
                , _data:
                  Object.fromHomogeneous
                    { "invalid": aria # Object.lookup "invalid" # fromMaybe ""
                    }
                }
            /> [ leading # foldMap \l -> div </ { ref: leftIconRef } /> [ l ]
              , emotionInput
                  ref
                  ( props { type = HTMLInput.toString <$> props.type # unsafeUnOptional }
                      # setOrDelete (SProxy ∷ _ "placeholder") (maybePlaceholder # maybeToOp)
                      # setOrDelete (SProxy ∷ _ "value") (maybeValue # maybeToOp)
                  )
                  { className: "ry-input"
                  , css: Style.input
                  , onFocus: composeHandler props.onFocus onFocus
                  , onBlur: composeHandler props.onBlur onBlur
                  , _aria:
                    if props.label # opToMaybe # isJust then
                      aria # Object.insert "labelledby" labelId
                    else
                      aria
                  }
              , trailing # foldMap \t -> div </ {} /> [ t ]
              ]
      pure
        $ case props.type # opToMaybe of
            Just HTMLInput.Password -> password </> props
            _ -> case maybeLabelText of
              Nothing -> inputWrapper
              Just labelText ->
                div
                  </* { className: "ry-label-and-input-wrapper"
                    , css: Style.labelAndInputWrapper
                    }
                  /> [ inputWrapper
                    , mkLabel $ labelText
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
        </* { className: "ry-input-wrapper"
          , css: Style.inputWrapper
          }
        /> [ leading
          , emotionInput
              ref
              props { type = HTMLInput.toString <$> props.type # unsafeUnOptional }
              { className: "ry-input"
              , css: Style.input
              , type: if hidePassword then "password" else "text"
              }
          , trailing
          ]
