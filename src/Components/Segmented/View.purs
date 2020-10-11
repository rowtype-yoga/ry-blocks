module Components.Segmented.View (component, Props, MandatoryProps, PropsF) where

import Prelude.View
import Components.Cluster as Cluster
import Components.Segmented.Style as Style
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.Trans.Class (lift)
import Data.Array ((:))
import Data.Array as A
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.Nullable (Nullable)
import Data.Traversable (traverse)
import Foreign.Object as Object
import Framer.Motion (VariantLabel)
import Framer.Motion as Motion
import Hooks.UseResize (useResize')
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.DOM.Events (preventDefault)
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Record.Extra (pick)
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM (Node)
import Web.HTML.HTMLElement (getBoundingClientRect)
import Web.HTML.HTMLElement as HTMLElement

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

active ∷ ∀ p p_. Union (MandatoryProps p) p_ Props => ReactComponent { | MandatoryProps p }
active =
  mkForwardRefComponent "SegmentedActive" do
    \(props ∷ { | Props }) ref -> React.do
      maybeVariants /\ setVariants <- useState' Nothing
      { active, previous } /\ setIndices <- useState' { active: props.activeItemIndex, previous: props.previousActiveItemIndex }
      let
        computeStyles = do
          maybeSt <- runMaybeT $ traverse getStyle props.activeItemRefs
          unless (maybeVariants == maybeSt) do
            for_ maybeSt (setVariants <<< Just)
      void <<< useResize'
        $ do
            setIndices { active, previous: active }
            computeStyles
      useLayoutEffect props.activeItemIndex do
        computeStyles
        mempty
      let
        clusterProps ∷ { | Cluster.Props }
        clusterProps = pick props
        activeElement =
          styledLeaf Motion.div
            { css: Style.activeElement
            , className: "ry-active-segmented-element"
            , initial: (unsafeCoerce <<< show) previous
            , transition: Motion.transition { type: "tween", duration: 0.2, ease: "easeOut" }
            , variants:
              Motion.variants $ maybeVariants
                # fromMaybe []
                # foldMapWithIndex (\i s -> Object.singleton (show i) (css s))
                # unsafeCoerce
            , animate: Motion.animate ((unsafeCoerce $ show active) ∷ VariantLabel)
            }
        children =
          [ E.element R.div'
              { className: "ry-segmented"
              , css: Style.segmented
              , children: activeElement : props.children
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

getStyle ∷ Ref (Nullable Node) -> MaybeT Effect _
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
  reactComponent "Segmented" \({ buttonContents, activeIndex, updateActiveIndex } ∷ ComponentProps) -> React.do
    previousActiveIndex /\ setPreviousActiveIndex <- useState' 0
    initialised /\ initialise <- useState' false
    itemRefs /\ setItemRefs <- useState' []
    useEffect initialised do
      refs <- traverse (const createRef) buttonContents
      when (not initialised) do
        initialise true
        setItemRefs refs
      pure (pure unit)
    let
      children ∷ Array JSX
      children =
        buttonContents `A.zip` itemRefs
          # A.mapWithIndex \i (buttonContent /\ ref) -> do
              let isLast = i + 1 == A.length buttonContents
              let isFirst = i == 0
              styled R.button'
                { key: show i
                , css: Style.button { isFirst, isLast }
                , className: "ry-segmented-button"
                , onClick:
                  handler preventDefault
                    $ const do
                        setPreviousActiveIndex activeIndex
                        updateActiveIndex i
                , ref
                }
                [ buttonContent ]
    pure
      $ styled R.div'
          { css: Style.wrapper
          , className: "ry-segmented-wrapper"
          }
          [ styled active
              { activeItemRefs: itemRefs
              , activeItemIndex: activeIndex
              , previousActiveItemIndex: previousActiveIndex
              , css: Style.container
              , className: "ry-segmented-container"
              }
              children
          ]
