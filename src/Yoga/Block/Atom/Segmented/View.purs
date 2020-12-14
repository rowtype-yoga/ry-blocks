module Yoga.Block.Atom.Segmented.View (component, Props, MandatoryProps, PropsF, ComponentProps) where

import Yoga.Prelude.View
import Control.Alt ((<|>))
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.Trans.Class (lift)
import Control.MonadZero as MZ
import Data.Array as A
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.Maybe (fromMaybe', isJust)
import Data.Newtype (wrap)
import Data.Traversable (traverse)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion (Animate, VariantLabel, Variants)
import Framer.Motion as Motion
import Hooks.Key as Key
import Hooks.UseResize (useResize)
import Partial.Unsafe (unsafeCrashWith)
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
  , activeItemIndex ∷ Int
  , updateActiveIndex ∷ Int -> Effect Unit
  | r
  )

type Props =
  PropsF Id

activeComponent ∷ ∀ p p_. Union (MandatoryProps p) p_ Props => ReactComponent { | MandatoryProps p }
activeComponent = rawActiveComponent

indexToVariant ∷ Int -> VariantLabel
indexToVariant = show >>> unsafeCoerce

type BBox =
  { top ∷ Number, left ∷ Number, width ∷ Number, height ∷ Number }

findOverlapping ∷ Int -> Array BBox -> Number -> Int
findOverlapping activeIndex styles x =
  fromMaybe activeIndex do
    curr <- styles A.!! activeIndex
    fst <- A.head styles
    lst <- A.last styles
    let inside e = (e.left < x) && (e.left + e.width) >= x
    let tooFarLeft = MZ.guard (x <= fst.left + fst.width) $> 0
    let tooFarRight = MZ.guard (x >= lst.left) $> A.length styles - 1
    A.findIndex inside styles <|> tooFarLeft <|> tooFarRight

rawActiveComponent ∷ ∀ p. ReactComponent { | p }
rawActiveComponent =
  mkForwardRefComponent "SegmentedActive" do
    \(props ∷ { | Props }) ref -> React.do
      animationVariants /\ setVariants <- useState' []
      dragX /\ setDragX <- useState' Nothing
      let
        computeVariants = do
          styles <- traverse getStyle props.activeItemRefs
          unless (animationVariants == styles) do
            setVariants styles # lift
      useLayoutEffectAlways do
        runMaybeT computeVariants *> mempty
      let
        variants ∷ Variants
        variants =
          Motion.variants $ animationVariants
            # foldMapWithIndex (\i s -> Object.singleton (show i) (css s))
            # unsafeCoerce
        animate ∷ Animate
        animate = case dragX of
          Nothing -> Motion.animate (indexToVariant props.activeItemIndex)
          Just x -> do
            let idx = findOverlapping props.activeItemIndex animationVariants x
            let av = animationVariants
            let firstVariant = av # A.head # fromMaybe' \_ -> unsafeCrashWith "shit"
            let lastVariant = av # A.last # fromMaybe' \_ -> unsafeCrashWith "shit"
            let baseVariant = av A.!! idx # fromMaybe' \_ -> unsafeCrashWith "shit"
            let
              closestVariant =
                if x >= (baseVariant.left + (baseVariant.width / 2.0)) then
                  av A.!! (idx + 1) # fromMaybe lastVariant
                else
                  av A.!! (idx - 1) # fromMaybe firstVariant
            let
              greater /\ smaller =
                if baseVariant.left > closestVariant.left then
                  baseVariant /\ closestVariant
                else
                  closestVariant /\ baseVariant
            -- Total
            let rangeStart = smaller.left + (smaller.width / 2.0)
            let rangeEnd = greater.left + (greater.width / 2.0)
            let range = rangeEnd - rangeStart
            let ratio = ((x - rangeStart) / range)
            let interpolatedWidth = (greater.width * ratio) + smaller.width * (1.0 - ratio)
            -- Right
            let rangeStartRight = smaller.left + smaller.width
            let rangeEndRight = greater.left + greater.width
            let rangeRight = rangeEndRight - rangeStartRight
            let ratioRight = ((x + (interpolatedWidth / 2.0) - rangeStartRight) / rangeRight)
            -- Left
            let rangeStartLeft = smaller.left
            let rangeEndLeft = greater.left
            let rangeLeft = rangeEndLeft - rangeStartLeft
            let ratioLeft = (((x - (interpolatedWidth / 2.0)) - rangeStartLeft) / rangeLeft)
            -- Individual
            let left = rangeStartLeft + (ratioLeft * rangeLeft)
            let right = rangeStartRight + (ratioRight * rangeRight)
            let width = right - left
            let
              variant =
                baseVariant
                  { left = left, width = width }
            Motion.animate (css $ if smaller == greater then baseVariant else variant)
        clusterProps ∷ { | Cluster.Props }
        clusterProps = pick props
        activeElement =
          guard (animationVariants /= [])
            $ styledLeaf Motion.div
                { css: Style.activeElement
                , className: "ry-active-segmented-element"
                , initial: Motion.initial (indexToVariant props.activeItemIndex)
                , drag: Motion.drag "x"
                , dragMomentum: Motion.dragMomentum false
                , layout: Motion.layout true
                , onDragStart:
                  Motion.onDragStart \_ pi -> do
                    setDragX (Just pi.point.x)
                , onDrag:
                  Motion.onDrag \_ pi -> do
                    when (isJust dragX)
                      $ setDragX (Just pi.point.x)
                , onDragEnd:
                  Motion.onDragEnd \_ pi -> do
                    let newIdx = findOverlapping props.activeItemIndex animationVariants (dragX # fromMaybe pi.point.x)
                    when (newIdx == props.activeItemIndex) do
                      let maybeCurr = animationVariants A.!! newIdx
                      for_ maybeCurr \curr -> do
                        -- reset drag
                        setDragX (Just $ curr.left + curr.width / 2.0)
                    setDragX Nothing
                    props.updateActiveIndex newIdx
                , dragConstraints: Motion.dragConstraints { left: 0, right: 0 }
                , dragElastic: Motion.dragElastic false
                , transition:
                  Motion.transition
                    { type: "tween", duration: if isJust dragX then 0.05 else 0.2, ease: "easeOut" }
                , variants
                , animate
                , _aria: Object.fromHomogeneous { hidden: "true" }
                , ref
                }
      pure activeElement

getStyle ∷
  Ref (Nullable Node) ->
  MaybeT Effect BBox
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
          updateIndex idx = do
            updateActiveIndex idx
          updateTo toIndex = do
            itemRefs # blurAtIndex activeIndex
            updateIndex toIndex
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
              [ styled R.span'
                  { className: "ry-segmented-button__content"
                  , css: Style.buttonContent { isFirst, isLast }
                  , tabIndex: if idx == activeIndex then 0 else -1
                  }
                  [ R.text value
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
                    React.element activeComponent
                      { activeItemRefs: itemRefs
                      , activeItemIndex: activeIndex
                      , updateActiveIndex
                      }
                      A.: children
                  }
              ]
            }
