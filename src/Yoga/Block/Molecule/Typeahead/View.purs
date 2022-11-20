module Yoga.Block.Molecule.Typeahead.View where

import Yoga.Prelude.View

import Data.Array ((!!))
import Data.Array as Array
import Data.Function.Uncurried (mkFn3)
import Data.Time.Duration (Milliseconds(..))
import Effect.Aff (Aff, attempt, delay)
import Effect.Console as Console
import Effect.Exception (Error)
import Effect.Uncurried (mkEffectFn1, runEffectFn1, runEffectFn2)
import Fahrtwind (overflowHidden, textCol', widthAndHeight)
import Fahrtwind.Style.ScrollBar (scrollBar')
import Framer.Motion as M
import Literals.Undefined (Undefined, undefined)
import Network.RemoteData (RemoteData)
import Network.RemoteData as RemoteData
import Prim.Row (class Lacks, class Nub)
import React.Aria.Interactions (useFocus, useFocusWithin)
import React.Basic.DOM as R
import React.Basic.DOM.Events (capture_)
import React.Basic.DOM.Events as SE
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import React.Virtuoso (VirtuosoInstance, virtuosoImpl)
import Record as Record
import Type.Proxy (Proxy(..))
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Union (UndefinedOr, maybeToUor, uorToMaybe)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (activeElement)
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.HTMLElement as HTMLElement
import Web.HTML.Window (document)
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Atom.PopOver.Types (Placement(..), PrimaryPlacement(..), SecondaryPlacement(..))
import Yoga.Block.Atom.PopOver.View (mkPopOverView)
import Yoga.Block.Container.Style (col, sizeStyle)
import Yoga.Block.Hook.Key (KeyCode)
import Yoga.Block.Hook.Key as Key
import Yoga.Block.Hook.UseOnElementResize (useOnElementResizeWithRef)
import Yoga.Block.Hook.UseResize2 (useOnResize)
import Yoga.Block.Icon.SVG.Spinner (spinner)
import Yoga.Block.Internal (focusNodeRef)
import Yoga.Block.Molecule.Typeahead.Style as Style

type Props a = PropsF Id a

type PropsF f a =
  ( checked ∷ f Boolean
  | Style.Props f (MandatoryProps () a)
  )

type MandatoryProps r a =
  ( renderSuggestion ∷ a → JSX
  , loadSuggestions ∷ String → Aff (Either Error (Array a))
  | r
  )

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

type PropsOld a =
  { onSelected ∷
      a → Effect { overrideInputValue ∷ Maybe String, dismiss ∷ Boolean }
  , onRemoved ∷ a → Effect Unit
  , renderSuggestion ∷ a → JSX
  , loadSuggestions ∷ String → Aff (Either Error (Array a))
  , onDismiss ∷ Effect Unit
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

mkTypeahead ∷ ∀ a. Eq a ⇒ Args a → Effect (ReactComponent (PropsOld a))
mkTypeahead args = do
  typeaheadView ← mkTypeaheadView
    { contextMenuLayerId: args.contextMenuLayerId
    , overscan: args.overscan
    , scrollSeekPlaceholderʔ: args.scrollSeekPlaceholderʔ
    , scrollSeekConfigurationʔ: args.scrollSeekConfigurationʔ
    , containerStyle: args.containerStyle
    , itemStyle: args.itemStyle
    }
  React.reactComponent "Typeahead" \(props ∷ PropsOld a) → React.do
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
    overflowHidden
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
      width /\ setWidth ← React.useState' 210.0

      let focusIsWithin = inputHasFocus || popupHasFocus

      { focusWithinProps } ← useFocusWithin
        { onFocusWithin: handler_ (setPopupHasFocus true)
        , onBlurWithin: handler_ (setPopupHasFocus false)
        }

      { focusProps } ← useFocus
        { onFocus: handler_ (setInputHasFocus true)
        , onBlur: handler_ (setInputHasFocus false)
        }

      React.useEffectOnce do
        getBoundingBoxFromRef inputContainerRef >>= traverse_
          (_.width >>> setWidth)
        mempty

      useOnResize (150.0 # Milliseconds) \_ → do
        getBoundingBoxFromRef inputContainerRef >>= traverse_
          (_.width >>> setWidth)

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
        focusInput = focusNodeRef inputRef

        blurCurrentItem ∷ Effect Unit
        blurCurrentItem = do
          maybeActive ← window >>= document >>= activeElement
          for_ maybeActive \active → blur active

      focusActiveElement
        id
        { isAnimating, isScrolling, updatedByKeyboard }
        blurCurrentItem
        virtuosoRef
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
            , updateActiveIndex:
                \update → updateActiveIndex \old →
                  { activeIndex: update old.activeIndex
                  , updatedByKeyboard: true
                  }
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
              , placement: Placement Below Centre
              , fallbackPlacements:
                  [ Placement Below End
                  , Placement Below Start
                  , Placement Above End
                  , Placement Above Centre
                  , Placement Above Start
                  ]
              , placementRef: inputContainerRef
              , dismissBehaviourʔ: Nothing
              , onAnimationStateChange: setIsAnimating
              , containerId: contextMenuLayerId
              , childʔ:
                  if focusIsWithin then Just $ div'
                    </
                      { onFocus: focusWithinProps.onFocus
                      , onBlur: focusWithinProps.onBlur
                      }
                    /> [ resultsContainer ]
                  else Nothing
              }
          ]

        inputElement = React.element Input.component
          ( ( inputProps # unsafeMergeSecond
                { id
                , ref: inputContainerRef
                , inputRef
                , spellCheck: false
                , autoComplete: "off"
                , value: input
                , onChange: handler targetValue (traverse_ setInput)
                , onMouseEnter: handler_
                    (when focusIsWithin focusInput)
                , onKeyUp: handler
                    SE.key
                    \e → e >>= parseKey # traverse_ handleKeyUp

                , onFocus: focusProps.onFocus
                , onBlur: focusProps.onBlur
                , trailing:
                    if isLoading then div_
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
                  handler syntheticEvent
                    \det → unless (activeIndex == Just i) do
                      let
                        movementX = (unsafeCoerce det).movementX # uorToMaybe #
                          fromMaybe 0.0
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
          R.div'
            </*
              { css: args.containerStyle
              , style: R.css { width: show width <> "px", maxHeight: "50vh" }
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
                  { background: col.backgroundBright2
                  , col: col.backgroundBright4
                  , width: sizeStyle.m
                  , borderRadius: E.px 5
                  , borderWidth: E.px 2
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
                { height: "100%"
                , width: "100%"
                , padding: "0"
                , margin: "0"
                }
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
    virtuosoRef
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
            for_ (suggʔ >>= HTMLElement.fromElement) \el →
              if updatedByKeyboard then do
                React.readRefMaybe virtuosoRef >>= traverse_
                  ( scrollToIndex
                      { behavior: cast undefined
                      , index: i
                      , align: "center"
                      }
                  )
                focus el
              else
                focusPreventScroll el
      mempty

scrollToIndex ∷
  { behavior ∷ UndefinedOr String, index ∷ Int, align ∷ String } →
  VirtuosoInstance →
  Effect Unit
scrollToIndex options inst =
  runEffectFn1 (unsafeCoerce inst).scrollToIndex options

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
    Key.Tab → do
      updateActiveIndex (const Nothing)
      when (activeIndex # isJust) do
        focusInput
    Key.Up → do
      when (activeIndex == Just 0) focusInput
      updateActiveIndex case _ of
        Just 0 → Just maxIndex
        Nothing → Just maxIndex
        Just i → Just (i - 1)
    Key.Down → do
      when (activeIndex == Just (maxIndex - 1)) focusInput
      updateActiveIndex case _ of
        Just i | i == maxIndex → Just 0
        Nothing → Just 0
        Just i → Just (i + 1)
    -- [TODO] End and Home keys
    Key.Return →
      for_ activeIndex \i → do
        for_ (suggestions !! i) onSelected
    Key.Backspace → focusInput
    Key.Escape → onDismiss
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
