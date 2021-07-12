module Yoga.Block.Atom.Segmented.View (component, Props) where

import Yoga.Prelude.View

import Data.Array as A
import Data.Newtype (wrap)
import Data.Time.Duration (Milliseconds(..))
import Data.Traversable (traverse)
import Data.TwoOrMore (TwoOrMore)
import Data.TwoOrMore as TwoOrMore
import Effect.Aff (delay)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Math as Math
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import Web.HTML.HTMLElement as HTMLElement
import Yoga.Block.Atom.Segmented.Style as Style
import Yoga.Block.Atom.Segmented.View.ActiveIndicator as ActiveIndicator
import Yoga.Block.Atom.Segmented.View.Types (Item)
import Yoga.Block.Hook.Key as Key
import Yoga.Block.Hook.UseKeyDown (useKeyDown)
import Yoga.Block.Hook.UseResize (useResize)

type Props =
  { buttonContents ∷ TwoOrMore Item
  , activeIndex ∷ Int
  , updateActiveItem ∷ Item -> Int -> Effect Unit
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "Segmented" \({ buttonContents, activeIndex, updateActiveItem } ∷ Props) -> React.do
        -------------------------------------------
        -- Store button refs for animation purposes
        itemRefs /\ setItemRefs ∷ Maybe (TwoOrMore _) /\ _ <- useState' Nothing
        useLayoutEffectOnce do
          refs <- traverse (const createRef) buttonContents
          setItemRefs (Just refs)
          mempty
        windowSize /\ setWindowSize <- useState' zero
        -------------------------------------------
        -- Support keyboard input
        let
          maxIndex = TwoOrMore.length buttonContents - 1
          updateIndex idx = do
            let 
              newItem = fromMaybe'
                (\_ -> TwoOrMore.head buttonContents) 
                (buttonContents TwoOrMore.!! idx) 
            updateActiveItem newItem idx
           
          updateTo toIndex = do
            for_ itemRefs do blurAtIndex activeIndex
            updateIndex toIndex
            for_ itemRefs do focusAtIndex toIndex
        useKeyDown case _ of
          Key.Right ->
            when (activeIndex < maxIndex) do
              updateTo (activeIndex + 1)
          Key.Left ->
            when (activeIndex > 0) do
              updateTo (activeIndex - 1)
          Key.End -> updateTo maxIndex
          Key.Home -> updateTo 0
          _ -> pure unit
        -------------------------------------------
        -- Ensure redraw on window resize
        newWindowSize <- useResize
        useAff newWindowSize do
          let δw = Math.abs (newWindowSize.innerWidth - windowSize.innerWidth)
          let δh = Math.abs (newWindowSize.innerHeight - windowSize.innerHeight)
          delay
            if δw < 10.0 || δh < 10.0 then
              100.0 # Milliseconds
            else
              10.0 # Milliseconds
          liftEffect do -- force rerender
            refs <- traverse (const createRef) buttonContents
            setItemRefs (Just refs)
            setWindowSize windowSize
        let
          children ∷ Array JSX
          children = refsAndContents <#> mapWithIndex contentToChild # maybe mempty TwoOrMore.toArray
          refsAndContents ∷ Maybe (TwoOrMore (Item /\ Ref (Nullable Node)))
          refsAndContents = TwoOrMore.zip buttonContents <$> itemRefs
          contentToChild ∷ Int -> (Item /\ Ref (Nullable Node)) -> JSX
          contentToChild idx ({ id, value } /\ ref) = do
            let isLast = idx + 1 == TwoOrMore.length buttonContents
            let isFirst = idx == 0
            button
              </* { key: show idx
                , ref
                , css: Style.button { isFirst, isLast }
                , className: "ry-segmented-button"
                , style: css { pointerEvents: if idx == activeIndex then "none" else "" }
                , onClick: handler_ (updateIndex idx)
                , role: "tab"
                , tabIndex: if idx == activeIndex then 0 else -1
                , id
                , _aria:
                  Object.fromHomogeneous
                    { selected: show (idx == activeIndex)
                    }
                }
              /> [ span
                    </* { className: "ry-segmented-button__content"
                      , css: Style.buttonContent { isFirst, isLast }
                      , tabIndex: if idx == activeIndex then 0 else -1
                      }
                    /> [ R.text value
                      ]
                ]
        pure
          $ E.element R.div'
          $ { css: Style.cluster
            , className: "ry-segmented-container"
            , children:
              [ E.element R.div'
                  { className: "ry-segmented"
                  , css: Style.segmented
                  , role: "tablist"
                  , children:
                    itemRefs
                      # foldMap \activeItemRefs ->
                          React.element ActiveIndicator.component
                            { activeItemRefs
                            , activeItemIndex: activeIndex
                            , buttonContents
                            , updateActiveItem
                            , windowSize
                            }
                            A.: children
                  }
              ]
            }

getHTMLElementAtIndex ∷ Int -> TwoOrMore (NodeRef) -> Effect (Maybe HTMLElement)
getHTMLElementAtIndex idx refs =
  runMaybeT do
    ref <- refs TwoOrMore.!! idx # pure >>> wrap
    node <- React.readRefMaybe ref # wrap
    HTMLElement.fromNode node # pure >>> wrap

blurAtIndex ∷ Int -> TwoOrMore (Ref (Nullable Node)) -> Effect Unit
blurAtIndex idx refs = do
  getHTMLElementAtIndex idx refs >>= traverse_ blur

focusAtIndex ∷ Int -> TwoOrMore (Ref (Nullable Node)) -> Effect Unit
focusAtIndex idx refs = do
  getHTMLElementAtIndex idx refs >>= traverse_ focus
