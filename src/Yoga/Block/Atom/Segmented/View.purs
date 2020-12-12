module Yoga.Block.Atom.Segmented.View (component, Props, MandatoryProps, PropsF, ComponentProps) where

import Prelude
import Yoga.Prelude.View
import Control.Monad.Maybe.Trans (MaybeT(..), lift, runMaybeT)
import Control.Monad.Trans.Class (lift)
import Data.Array as A
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.Newtype (wrap)
import Data.Traversable (traverse)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion (VariantLabel)
import Framer.Motion as Motion
import Hooks.Key as Key
import Hooks.UseResize (useResize)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Extra.Hooks.UseKeyDown (useKeyDown)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import Record.Extra (pick)
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML.HTMLElement (HTMLElement, blur, focus, getBoundingClientRect)
import Web.HTML.HTMLElement as HTMLElement
import Yoga.Block.Atom.Segmented.Style as Style
import Yoga.Block.Layout.Cluster as Cluster

type PropsF f =
  ( 
  | MandatoryProps + Style.Props f Cluster.Props
  )

type MandatoryProps r =
  ( activeItemRefs ∷ Array (Ref (Nullable Node))
  , previousActiveItemIndex ∷ Int
  , activeItemIndex ∷ Int
  | r
  )

type Props =
  PropsF Id

activeComponent ∷ ∀ p p_. Union (MandatoryProps p) p_ Props => ReactComponent { | MandatoryProps p }
activeComponent = rawActiveComponent

rawActiveComponent ∷ ∀ p. ReactComponent { | p }
rawActiveComponent =
  mkForwardRefComponent "SegmentedActive" do
    \(props ∷ { | Props }) ref -> React.do
      maybeVariants /\ setVariants <- useState' Nothing
      let
        computeStyles = do
          maybeSt <- runMaybeT $ traverse getStyle props.activeItemRefs
          unless (maybeVariants == maybeSt) do
            for_ maybeSt (setVariants <<< Just)
      useLayoutEffectAlways do
        computeStyles
        mempty
      let
        clusterProps ∷ { | Cluster.Props }
        clusterProps = pick props
        activeElement =
          styledLeaf Motion.div
            { css: Style.activeElement
            , className: "ry-active-segmented-element"
            , initial: (unsafeCoerce <<< show) props.previousActiveItemIndex
            , transition: Motion.transition { type: "tween", duration: 0.2, ease: "easeOut" }
            , variants:
              Motion.variants $ maybeVariants
                # fromMaybe []
                # foldMapWithIndex (\i s -> Object.singleton (show i) (css s))
                # unsafeCoerce
            , animate: Motion.animate ((unsafeCoerce <<< show $ props.activeItemIndex) ∷ VariantLabel)
            , _aria: Object.fromHomogeneous { hidden: "true" }
            }
        children =
          [ E.element R.div'
              { className: "ry-segmented"
              , css: Style.segmented
              , role: "tablist"
              , children: A.cons activeElement props.children
              }
          ]
      pure
        $ E.element
            Cluster.component
            ( clusterProps
                { children = children
                , justify = "center"
                , space = "var(--s5)"
                }
            )

getStyle ∷
  Ref (Nullable Node) ->
  MaybeT Effect
    { height ∷ Number
    , left ∷ Number
    , top ∷ Number
    , width ∷ Number
    }
getStyle itemRef = do
  node <- MaybeT $ readRefMaybe itemRef
  htmlElement <- MaybeT $ pure $ HTMLElement.fromNode node
  br <- lift $ getBoundingClientRect htmlElement
  pure
    { width: br.width
    , height: br.height
    , left: br.left
    , top: br.top
    }

type ComponentProps =
  { buttonContents ∷ Array { id ∷ String, value ∷ String }
  , activeIndex ∷ Int
  , updateActiveIndex ∷ Int -> Effect Unit
  }

getHTMLElementAtIndex ∷ Int -> Array (NodeRef) -> Effect (Maybe HTMLElement)
getHTMLElementAtIndex idx refs =
  runMaybeT do
    ref <- refs A.!! idx # pure >>> wrap
    node <- React.readRefMaybe ref # wrap
    HTMLElement.fromNode node # pure >>> wrap

blurAtIndex ∷ Int -> Array (Ref (Nullable Node)) -> Effect Unit
blurAtIndex idx refs = do
  getHTMLElementAtIndex idx refs >>= traverse_ blur

focusAtIndex ∷ Int -> Array (Ref (Nullable Node)) -> Effect Unit
focusAtIndex idx refs = do
  getHTMLElementAtIndex idx refs >>= traverse_ focus

component ∷ ReactComponent ComponentProps
component =
  unsafePerformEffect
    $ reactComponent "Segmented" \({ buttonContents, activeIndex, updateActiveIndex } ∷ ComponentProps) -> React.do
        previousActiveIndex /\ setPreviousActiveIndex <- useState' 0
        -------------------------------------------
        -- Store button refs for animation purposes
        itemRefs /\ setItemRefs <- useState' []
        useLayoutEffectOnce do
          refs <- traverse (const createRef) buttonContents
          setItemRefs refs
          mempty
        -------------------------------------------
        -- Support keyboard input
        let
          maxIndex = A.length buttonContents - 1
          updateTo toIndex = do
            itemRefs # blurAtIndex activeIndex
            updateActiveIndex toIndex
            itemRefs # focusAtIndex toIndex
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
        windowSize <- useResize
        useAff windowSize do
          delay (200.0 # Milliseconds)
          liftEffect do -- force rerender
            refs <- traverse (const createRef) buttonContents
            setItemRefs refs
        let
          updateIndex idx = do
            setPreviousActiveIndex activeIndex
            updateActiveIndex idx
          children ∷ Array JSX
          children = A.mapWithIndex contentToChild refsAndContents
          refsAndContents ∷ Array ({ id ∷ String, value ∷ String } /\ Ref (Nullable Node))
          refsAndContents = A.zip buttonContents itemRefs
          contentToChild ∷ Int -> ({ id ∷ String, value ∷ String } /\ Ref (Nullable Node)) -> JSX
          contentToChild idx ({ id, value } /\ ref) = do
            let isLast = idx + 1 == A.length buttonContents
            let isFirst = idx == 0
            styled R.button'
              { key: show idx
              , ref
              , css: Style.button { isFirst, isLast }
              , className: "ry-segmented-button"
              , onClick: handler preventDefault (const (updateIndex idx))
              , role: "tab"
              , tabIndex: if idx == activeIndex then 0 else -1
              , id
              , _aria:
                Object.fromHomogeneous
                  { selected: show (idx == activeIndex)
                  }
              }
              [ styled R.span'
                  { className: "ry-segmented-button__content"
                  , css: Style.buttonContent { isFirst, isLast }
                  , tabIndex: if idx == activeIndex then 0 else -1
                  }
                  [ R.text value
                  ]
              ]
        pure
          $ styled R.div'
              { css: Style.wrapper
              , className: "ry-segmented-wrapper"
              }
              [ styled activeComponent
                  { activeItemRefs: itemRefs
                  , activeItemIndex: activeIndex
                  , previousActiveItemIndex: previousActiveIndex
                  , css: Style.container
                  , className: "ry-segmented-container"
                  }
                  children
              ]
