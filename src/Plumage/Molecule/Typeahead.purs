module Plumage.Molecule.Typeahead where

import Yoga.Prelude.View

import Data.Array ((!!))
import Data.Array as Array
import Data.Function.Uncurried (mkFn3)
import Data.Time.Duration (Milliseconds(..))
import Effect.Aff (Aff, attempt, delay)
import Effect.Exception (Error)
import Effect.Uncurried (mkEffectFn1, runEffectFn1)
import Fahrtwind (mX, minWidth, overflowHidden, textCol', widthAndHeight)
import Fahrtwind.Style.ScrollBar (scrollBar')

import Framer.Motion as M
import Network.RemoteData (RemoteData)
import Network.RemoteData as RemoteData
import Plumage.Atom.PopOver.Types (Placement(..), PrimaryPlacement(..), SecondaryPlacement(..))
import Plumage.Atom.PopOver.View (mkPopOverView)
import Plumage.Molecule.Typeahead.Style as Style
import Plumage.Util.HTML as H
import Prim.Row (class Lacks, class Nub)
import React.Aria.Interactions2 (useFocus, useFocusWithin)
import React.Aria.Utils (mergeProps)
import React.Basic.DOM as R
import React.Basic.DOM.Events (capture_)
import React.Basic.DOM.Events as SE
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import React.Virtuoso (virtuosoImpl)
import Record as Record
import Type.Proxy (Proxy(..))
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Union (maybeToUor, uorToMaybe)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.NonElementParentNode (getElementById)

import Web.HTML (window)
import Web.HTML.HTMLDocument (activeElement)
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.HTMLElement as HTMLElement
import Web.HTML.Window (document)
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Container.Style (col)
import Yoga.Block.Hook.Key (KeyCode)
import Yoga.Block.Hook.Key as Key
import Yoga.Block.Icon.SVG.Spinner (spinner)

type Overscan = { main ∷ Int, reverse ∷ Int }
type ScrollSeekPlaceholder = ReactComponent { height ∷ Number, index ∷ Int }
type ScrollSeekConfiguration =
  { enter ∷ Number → Boolean, exit ∷ Number → Boolean }

type Args a =
  { debounce ∷ Milliseconds
  , suggestionToText ∷ a → String
  , contextMenuLayerId ∷ String
  , scrollSeekPlaceholderʔ ∷ Maybe ScrollSeekPlaceholder
  , scrollSeekConfigurationʔ ∷ Maybe ScrollSeekConfiguration
  , overscan ∷ Overscan
  , containerStyle ∷ E.Style
  , itemStyle ∷ E.Style
  }

newtype InputProps = InputProps (∀ x. { | x })

inputProps ∷ ∀ p p_. Union p p_ Input.Props ⇒ { | p } → InputProps
inputProps = unsafeCoerce

type Props a =
  { onSelected ∷
      a → Effect { overrideInputValue ∷ Maybe String, dismiss ∷ Boolean }
  , onRemoved ∷ a → Effect Unit
  , renderSuggestion ∷ a → JSX
  , loadSuggestions ∷ String → Aff (Either Error (Array a))
  , onDismiss ∷ Effect Unit
  , placeholder ∷ String
  , inputProps ∷ InputProps
  }

mkDefaultArgs ∷
  ∀ a.
  { suggestionToText ∷ a → String
  , contextMenuLayerId ∷ String
  } →
  Args a
mkDefaultArgs
  { suggestionToText
  , contextMenuLayerId
  } =
  { debounce: Milliseconds 200.0
  , suggestionToText
  , contextMenuLayerId
  , scrollSeekPlaceholderʔ: Nothing
  , scrollSeekConfigurationʔ: Nothing
  , overscan: { main: 100, reverse: 100 }
  , containerStyle: Style.resultsContainer
  , itemStyle: Style.item
  }

mkTypeahead ∷ ∀ a. Eq a ⇒ Args a → Effect (ReactComponent (Props a))
mkTypeahead args = do
  typeaheadView ← mkTypeaheadView
    { contextMenuLayerId: args.contextMenuLayerId
    , overscan: args.overscan
    , scrollSeekPlaceholderʔ: args.scrollSeekPlaceholderʔ
    , scrollSeekConfigurationʔ: args.scrollSeekConfigurationʔ
    , containerStyle: args.containerStyle
    , itemStyle: args.itemStyle
    }
  React.reactComponent "Typeahead" \(props ∷ Props a) → React.do
    input /\ setInput ← React.useState' ""
    suggestions /\ setSuggestions ← React.useState' RemoteData.NotAsked
    { activeIndex, updatedByKeyboard } /\ updateActiveIndex ← React.useState
      { activeIndex: Nothing, updatedByKeyboard: false }

    useAff input do
      setSuggestions RemoteData.Loading # liftEffect
      delay args.debounce
      result ← attempt (props.loadSuggestions input)
      let rd = RemoteData.fromEither (join result)
      setSuggestions rd # liftEffect

    pure
      $ typeaheadView
      </>
        { input
        , setInput
        , suggestions
        , activeIndex
        , updatedByKeyboard
        , updateActiveIndex
        , onSelected: props.onSelected
        , onRemoved: props.onRemoved
        , onDismiss: setSuggestions RemoteData.NotAsked *> props.onDismiss
        , placeholder: props.placeholder
        , renderSuggestion: props.renderSuggestion
        , inputProps: props.inputProps
        , isLoading: suggestions # RemoteData.isLoading
        }

type ViewProps a =
  { activeIndex ∷ Maybe Int
  , updatedByKeyboard ∷ Boolean
  , input ∷ String
  , isLoading ∷ Boolean
  , setInput ∷ String → Effect Unit
  , suggestions ∷ RemoteData Error (Array a)
  , renderSuggestion ∷ a → JSX
  , updateActiveIndex ∷
      ( { activeIndex ∷ Maybe Int
        , updatedByKeyboard ∷ Boolean
        } →
        { activeIndex ∷ Maybe Int
        , updatedByKeyboard ∷ Boolean
        }
      ) →
      Effect Unit
  , onSelected ∷
      a → Effect { overrideInputValue ∷ Maybe String, dismiss ∷ Boolean }
  , onRemoved ∷ a → Effect Unit
  , onDismiss ∷ Effect Unit
  , placeholder ∷ String
  , inputProps ∷ InputProps
  }

mkTypeaheadView ∷
  ∀ a.
  Eq a ⇒
  { contextMenuLayerId ∷ String
  , scrollSeekPlaceholderʔ ∷ Maybe ScrollSeekPlaceholder
  , scrollSeekConfigurationʔ ∷ Maybe ScrollSeekConfiguration
  , overscan ∷ Overscan
  , containerStyle ∷ E.Style
  , itemStyle ∷ E.Style
  } →
  Effect (ReactComponent (ViewProps a))
mkTypeaheadView
  args@{ contextMenuLayerId } = do
  -- loader ← mkLoader
  popOver ← mkPopOverView
  itemCompo ∷ ReactComponent {} ← mkForwardRefComponentWithStyle "TypeaheadItem"
    Style.resultContainer
    M.li
  listCompo ∷ ReactComponent {} ← mkForwardRefComponentWithStyle "TypeaheadList"
    (overflowHidden)
    R.ul'

  React.reactComponent "TypeaheadView" \(props ∷ ViewProps a) →
    React.do
      let
        { renderSuggestion
        , input
        , setInput
        , suggestions
        , onDismiss
        , activeIndex
        , updatedByKeyboard
        , updateActiveIndex
        , placeholder
        , isLoading
        } = props
      let (InputProps inputProps) = props.inputProps
      id ← React.useId
      -- The previous suggestions so we have something to display while loading
      prevSuggs /\ setPrevSuggs ← React.useState' []
      inputHasFocus /\ setInputHasFocus ← React.useState' false
      popupHasFocus /\ setPopupHasFocus ← React.useState' false
      isScrolling /\ setIsScrolling ← React.useState' false
      isAnimating /\ setIsAnimating ← React.useState' false
      inputContainerRef ← React.useRef null
      inputRef ← React.useRef null
      virtuosoRef ← React.useRef null

      let focusIsWithin = inputHasFocus || popupHasFocus

      { focusWithinProps } ←
        useFocusWithin
          { onFocusWithin: handler_ (setPopupHasFocus true)
          , onBlurWithin: handler_ (setPopupHasFocus false)
          }

      { focusProps } ←
        useFocus
          { onFocus: handler_ (setInputHasFocus true)
          , onBlur: handler_ (setInputHasFocus false)
          }

      -- We store the result whenever we have successful suggestions
      React.useEffect (RemoteData.isSuccess suggestions) do
        case suggestions of
          RemoteData.Success suggs | suggs /= prevSuggs → setPrevSuggs suggs
          _ → mempty
        mempty

      let
        visibleData = case suggestions of
          RemoteData.NotAsked → prevSuggs
          RemoteData.Loading → prevSuggs
          RemoteData.Failure _ → prevSuggs
          RemoteData.Success suggs → suggs

        focusInput ∷ Effect Unit
        focusInput = do
          maybeElem ← React.readRefMaybe inputRef
          for_ (maybeElem >>= HTMLElement.fromNode) focus

        blurCurrentItem ∷ Effect Unit
        blurCurrentItem = do
          maybeActive ← window >>= document >>= activeElement
          for_ maybeActive \active → blur active

      focusActiveElement id { isAnimating, isScrolling, updatedByKeyboard }
        blurCurrentItem
        activeIndex
      let
        onSelected i = do
          { overrideInputValue, dismiss } ← props.onSelected i
          when (Just props.input /= overrideInputValue) do
            for_ overrideInputValue props.setInput
          when dismiss do
            updateActiveIndex $ const
              { activeIndex: Nothing
              , updatedByKeyboard: false
              }
            blurCurrentItem

      -- Keyboard events
      let
        handleKeyUp =
          mkHandleKeyUp
            { activeIndex
            , updateActiveIndex: \update → updateActiveIndex \old →
                { activeIndex: update old.activeIndex, updatedByKeyboard: true }
            , focusInput
            , suggestions: suggestions # RemoteData.toMaybe # fromMaybe
                prevSuggs
            , onSelected
            , onDismiss
            }
      let
        inputBox = fragment
          [ inputElement
          , popOver
              { hide: blurCurrentItem
              , placement: Placement Below Start
              , placementRef: inputContainerRef
              , dismissBehaviourʔ: Nothing
              , onAnimationStateChange: setIsAnimating
              , containerId: contextMenuLayerId
              , childʔ:
                  if focusIsWithin then Just $ R.div'
                    </
                      { onFocus: focusWithinProps.onFocus
                      , onBlur: focusWithinProps.onBlur
                      }
                    /> [ resultsContainer ]
                  else Nothing
              }
          ]

        inputElement = React.element Input.component
          ( ( inputProps `mergeProps`
                { id
                , ref: inputContainerRef
                , inputRef: inputRef
                , spellCheck: false
                , autoComplete: "off"
                , placeholder
                , value: input
                , onChange: handler targetValue (traverse_ setInput)
                , onMouseEnter: handler_
                    (when focusIsWithin focusInput)
                , onKeyUp:
                    handler
                      SE.key
                      \e → e >>= parseKey # traverse_ handleKeyUp

                , onFocus: focusProps.onFocus
                , onBlur: focusProps.onBlur
                , trailing:
                    if isLoading then H.div_
                      (widthAndHeight 18 <> textCol' col.textPaler2)
                      [ spinner ]
                    else (unsafeCoerce inputProps.trailing)
                }
            ) ∷ { | Input.Props }
          )

        wrapSuggestion i suggestion _ =
          R.div'
            </*
              { tabIndex: -1
              , id: id <> "-suggestion-" <> show i
              , css: args.itemStyle
              , onMouseMove:
                  handler syntheticEvent \det → unless (activeIndex == Just i)
                    do
                      let
                        movementX = (unsafeCoerce det).movementX # uorToMaybe #
                          fromMaybe 0.0
                      let
                        movementY = (unsafeCoerce det).movementY # uorToMaybe #
                          fromMaybe 0.0
                      unless ((movementX == zero && movementY == zero)) do
                        updateActiveIndex
                          ( const
                              { activeIndex: Just i
                              , updatedByKeyboard: false
                              }
                          )
              , onKeyDown: handler preventDefault mempty
              -- ^ disables scrolling with arrow keys
              , onKeyUp:
                  handler SE.key
                    (traverse_ handleKeyUp <<< (parseKey =<< _))
              , onClick: capture_ do
                  onSelected suggestion
              }
            /> [ renderSuggestion suggestion ]

        resultsContainer =
          M.div
            </*
              { css: minWidth 210 <> mX 0 <> args.containerStyle
              , initial: M.initial $ false
              , animate: M.animate $ R.css
                  { height:
                      if Array.length visibleData > 5 then 230
                      else 120
                  }
              }
            />
              [ suggestionElements
              ]

        suggestionElements = virtuosoImpl </*>
          ( { overscan: args.overscan
            , ref: virtuosoRef
            , className: "virtuoso"
            , css:
                scrollBar'
                  { background: col.inputBackground
                  , col: col.textPaler2
                  , width: E.var "--s0"
                  , borderRadius: E.px 8
                  , borderWidth: E.px 4
                  }
            , scrollSeekConfiguration: args.scrollSeekConfigurationʔ #
                maybeToUor
            , components: case args.scrollSeekPlaceholderʔ of
                Nothing → { "Item": itemCompo, "List": listCompo }
                Just scrollSeekPlaceholder → unsafeCoerce
                  { "Item": itemCompo
                  , "List": listCompo
                  , "ScrollSeekPlaceholder": scrollSeekPlaceholder
                  }
            , isScrolling: mkEffectFn1 setIsScrolling
            , style: R.css
                { height: "100%", width: "100%" }
            , data: visibleData
            , itemContent: mkFn3 wrapSuggestion
            }
          )

      useEffect focusIsWithin do
        unless focusIsWithin do
          updateActiveIndex
            (const { activeIndex: Nothing, updatedByKeyboard: false })
        mempty

      pure inputBox

  where
  focusActiveElement
    id
    { isAnimating, isScrolling, updatedByKeyboard }
    blurCurrentItem
    activeIndex =
    useEffect activeIndex do
      unless (isAnimating || isScrolling) do
        case activeIndex of
          Nothing → blurCurrentItem
          Just i → do
            suggʔ ← window >>= document >>=
              ( HTMLDocument.toDocument >>> toNonElementParentNode >>>
                  getElementById (id <> "-suggestion-" <> show i)
              )
            for_ (suggʔ >>= HTMLElement.fromElement)
              (if updatedByKeyboard then focus else focusPreventScroll)
      mempty

-- https://caniuse.com/mdn-api_svgelement_focus_options_preventscroll_parameter
focusPreventScroll ∷ HTMLElement → Effect Unit
focusPreventScroll (htmlElement ∷ HTMLElement) = do
  runEffectFn1 (unsafeCoerce htmlElement).focus { preventScroll: true }

parseKey ∷ String → Maybe KeyCode
parseKey = case _ of
  "ArrowUp" → Just Key.Up
  "ArrowDown" → Just Key.Down
  "Backspace" → Just Key.Backspace
  "Enter" → Just Key.Return
  _ → Nothing

mkHandleKeyUp ∷
  ∀ a.
  { activeIndex ∷ Maybe Int
  , focusInput ∷ Effect Unit
  , suggestions ∷ (Array a)
  , updateActiveIndex ∷
      (Maybe Int → Maybe Int) →
      Effect Unit
  , onSelected ∷ a → Effect Unit
  , onDismiss ∷ Effect Unit
  } →
  KeyCode →
  Effect Unit
mkHandleKeyUp
  { activeIndex
  , suggestions
  , updateActiveIndex
  , focusInput
  , onSelected
  , onDismiss
  }
  key = do
  let maxIndex = Array.length suggestions - 1
  case key of
    Key.Up → do
      when (activeIndex == Just 0) focusInput
      updateActiveIndex case _ of
        Just 0 → Nothing
        Nothing → Just maxIndex
        Just i → Just (i - 1)
    Key.Down → do
      when (activeIndex == Just maxIndex) focusInput
      updateActiveIndex case _ of
        Just i | i == maxIndex → Nothing
        Nothing → Just 0
        Just i → Just (i + 1)
    -- [TODO] End and Home keys
    Key.Return → do
      for_ activeIndex \i → do
        for_ (suggestions !! i) onSelected
    Key.Backspace → do
      focusInput
    Key.Escape → do
      onDismiss
    _ → mempty

mkForwardRefComponent ∷
  ∀ ref props.
  Lacks "ref" props ⇒
  String →
  ReactComponent { ref ∷ React.Ref ref | props } →
  Effect (ReactComponent { | props })
mkForwardRefComponent name component = mkForwardRefComponentEffect name
  \(props ∷ { | props }) ref → React.do
    pure $ React.element component (Record.insert (Proxy ∷ _ "ref") ref props)

mkForwardRefEmotionComponent ∷
  ∀ ref props.
  Lacks "ref" props ⇒
  String →
  ReactComponent { className ∷ String, ref ∷ React.Ref ref | props } →
  Effect (ReactComponent { className ∷ String, css ∷ E.Style | props })
mkForwardRefEmotionComponent name component =
  mkForwardRefComponentEffect name
    \(props ∷ { className ∷ String, css ∷ E.Style | props }) ref → React.do
      pure $ E.element component
        ( Record.insert (Proxy ∷ _ "ref") ref props
        )

mkForwardRefComponentWithStyle ∷
  ∀ ref props.
  Lacks "ref" props ⇒
  Lacks "className" props ⇒
  Union props
    (className ∷ String, css ∷ E.Style)
    (className ∷ String, css ∷ E.Style | props) ⇒
  Nub (className ∷ String, css ∷ E.Style | props)
    (className ∷ String, css ∷ E.Style | props) ⇒
  String →
  E.Style →
  ReactComponent { className ∷ String, ref ∷ React.Ref ref | props } →
  Effect (ReactComponent { | props })
mkForwardRefComponentWithStyle name css component = mkForwardRefComponentEffect
  name
  \(props ∷ { | props }) ref → React.do
    pure $ E.element component
      ( Record.insert (Proxy ∷ _ "ref") ref
          ( (props `Record.disjointUnion` { className: name, css }) ∷
              { className ∷ String, css ∷ E.Style | props }
          )
      )
