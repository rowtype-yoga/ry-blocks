module Yoga.Block.Atom.Segmented.View (component, Props, MandatoryProps, PropsF, ComponentProps) where

import Yoga.Prelude.View
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.Trans.Class (lift)
import Data.Array as A
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.Traversable (traverse)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion (VariantLabel)
import Framer.Motion as Motion
import Hooks.UseResize (useResize)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import Record.Extra (pick)
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML.HTMLElement (getBoundingClientRect)
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
            }
        children =
          [ E.element R.div'
              { className: "ry-segmented"
              , css: Style.segmented
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
  { buttonContents ∷ Array JSX
  , activeIndex ∷ Int
  , updateActiveIndex ∷ Int -> Effect Unit
  }

component ∷ ReactComponent ComponentProps
component =
  unsafePerformEffect
    $ reactComponent "Segmented" \({ buttonContents, activeIndex, updateActiveIndex } ∷ ComponentProps) -> React.do
        previousActiveIndex /\ setPreviousActiveIndex <- useState' 0
        itemRefs /\ setItemRefs <- useState' []
        useLayoutEffectOnce do
          refs <- traverse (const createRef) buttonContents
          setItemRefs refs
          mempty
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
          refsAndContents ∷ Array (JSX /\ Ref (Nullable Node))
          refsAndContents = A.zip buttonContents itemRefs
          contentToChild ∷ Int -> (JSX /\ Ref (Nullable Node)) -> JSX
          contentToChild idx (buttonContent /\ ref) = do
            let isLast = idx + 1 == A.length buttonContents
            let isFirst = idx == 0
            styled R.button'
              { key: show idx
              , ref
              , css: Style.button { isFirst, isLast }
              , className: "ry-segmented-button"
              , onClick: handler preventDefault (const (updateIndex idx))
              }
              [ styled R.span'
                  { className: "ry-segmented-button__content"
                  , css: Style.buttonContent { isFirst, isLast }
                  , tabIndex: -1
                  }
                  [ buttonContent
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
