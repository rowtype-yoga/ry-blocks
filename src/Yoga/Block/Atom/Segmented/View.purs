module Yoga.Block.Atom.Segmented.View (component, Props, Item, MandatoryProps, PropsF, ComponentProps) where

import Yoga.Prelude.View
import Control.Alt ((<|>))
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.Trans.Class (lift)
import Control.MonadZero as MZ
import Data.Array as A
import Data.FoldableWithIndex (foldMapWithIndex)
import Data.FunctorWithIndex (mapWithIndex)
import Data.Maybe (fromMaybe', isJust, maybe)
import Data.Newtype (wrap)
import Data.Time.Duration (Milliseconds(..))
import Data.Traversable (traverse)
import Data.TwoOrMore (TwoOrMore)
import Data.TwoOrMore as TwoOrMore
import Effect.Aff (delay)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion (VariantLabel)
import Framer.Motion as Motion
import Hooks.Key as Key
import Hooks.Scroll (useScrollPosition)
import Hooks.UseResize (useResize)
import Literals.Undefined (undefined)
import MotionValue (useMotionValue)
import MotionValue as MotionValue
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Extra.Hooks.UseKeyDown (useKeyDown)
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import React.Basic.Hooks.Aff (useAff)
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Castable (cast)
import Web.HTML.HTMLElement (HTMLElement, blur, focus, getBoundingClientRect)
import Web.HTML.HTMLElement as HTMLElement
import Yoga.Block.Atom.Segmented.Style as Style

type PropsF f =
  ( 
  | MandatoryProps + Style.Props f ()
  )

type MandatoryProps r =
  ( activeItemRefs ∷ TwoOrMore (Ref (Nullable Node))
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

findOverlapping ∷ Int -> TwoOrMore BBox -> Number -> Int
findOverlapping activeIndex styles x =
  fromMaybe activeIndex do
    curr <- styles TwoOrMore.!! activeIndex
    let fst = TwoOrMore.head styles
    let lst = TwoOrMore.last styles
    let inside e = (e.left < x) && (e.left + e.width) >= x
    let tooFarLeft = MZ.guard (x <= fst.left + fst.width) $> 0
    let tooFarRight = MZ.guard (x >= lst.left) $> TwoOrMore.length styles - 1
    TwoOrMore.findIndex inside styles <|> tooFarLeft <|> tooFarRight

handleDrag ∷
  { activeItemIndex ∷ Int
  , animationVariants ∷ TwoOrMore BBox
  , x ∷ Number
  } ->
  { left ∷ Number, width ∷ Number }
handleDrag { x, activeItemIndex, animationVariants } = do
  let idx = findOverlapping activeItemIndex animationVariants x
  let av = animationVariants
  let firstVariant = av # TwoOrMore.head
  let lastVariant = av # TwoOrMore.last
  let baseVariant = av TwoOrMore.!! idx # fromMaybe' \_ -> unsafeCrashWith "shit"
  let
    closestVariant =
      if x >= (baseVariant.left + (baseVariant.width / 2.0)) then
        av TwoOrMore.!! (idx + 1) # fromMaybe lastVariant
      else
        av TwoOrMore.!! (idx - 1) # fromMaybe firstVariant
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
  if x < firstVariant.left then
    { left: firstVariant.left, width: firstVariant.width }
  else
    if x >= lastVariant.left + lastVariant.width then do
      { left: lastVariant.left, width: lastVariant.width }
    else do
      { left, width }

rawActiveComponent ∷ ∀ p. ReactComponent { | p }
rawActiveComponent =
  mkForwardRefComponent "SegmentedActive" do
    \(props ∷ { | Props }) ref -> React.do
      maybeAnimationVariants /\ setVariants <- useState' Nothing
      maybeDragX /\ setDragX <- useState' Nothing
      { scrollX } <- useScrollPosition
      activeLeft <- useMotionValue 0.0
      activeWidth <- useMotionValue 0.0
      useEffectAlways do
        _ <-
          runMaybeT do
            rawStyles <- traverse getStyle props.activeItemRefs
            let styles = rawStyles <#> \s -> s { left = s.left + scrollX }
            unless (maybeAnimationVariants == Just styles) do
              setVariants (Just styles) # lift
        mempty
      useLayoutEffect maybeDragX do
        case maybeDragX, maybeAnimationVariants of
          Just x, Just animationVariants -> do
            let { left, width } = handleDrag { activeItemIndex: props.activeItemIndex, animationVariants, x }
            activeLeft # MotionValue.set left
            activeWidth # MotionValue.set width
          _, _ -> mempty
        mempty
      let
        variants ∷ Motion.Variants
        variants = case maybeAnimationVariants of
          Just animationVariants ->
            animationVariants
              # foldMapWithIndex (\i s -> Object.singleton (show i) (css s))
              # Motion.variantsFromObject
          Nothing -> (cast undefined) ∷ Motion.Variants
      pure $ maybeAnimationVariants
        # foldMap \animationVariants ->
            styledLeaf Motion.div
              { css: Style.activeElement
              , variants
              , className: "ry-active-segmented-element"
              , initial: Motion.initial (indexToVariant props.activeItemIndex)
              , drag: Motion.drag "x"
              , dragMomentum: Motion.dragMomentum false
              , animate: Motion.animate $ indexToVariant props.activeItemIndex
              , layout: Motion.layout true
              , style:
                css
                  { left: activeLeft
                  , width: activeWidth
                  }
              , onDragStart:
                Motion.onDragStart \_ pi -> do
                  setDragX (Just pi.point.x)
              , onDrag:
                Motion.onDrag \_ pi -> do
                  when (isJust maybeDragX) $ setDragX (Just pi.point.x)
              , onDragEnd:
                Motion.onDragEnd \_ pi -> do
                  let x = maybeDragX # fromMaybe' \_ -> unsafeCrashWith "no x should not happen"
                  let newIdx = findOverlapping props.activeItemIndex animationVariants x
                  let v = animationVariants TwoOrMore.!! newIdx # fromMaybe' \_ -> unsafeCrashWith "omg"
                  setDragX Nothing
                  activeLeft # MotionValue.set v.left
                  activeWidth # MotionValue.set v.width
                  props.updateActiveIndex newIdx
              , dragConstraints: Motion.dragConstraints { left: 0, right: 0 }
              , dragElastic: Motion.dragElastic false
              , transition:
                Motion.transition
                  { type: "tween", duration: if isJust maybeDragX then 0.0 else 0.167, ease: "easeOut" }
              , _aria: Object.fromHomogeneous { hidden: "true" }
              , ref
              }

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

type Item =
  { id ∷ String, value ∷ String }

type ComponentProps =
  { buttonContents ∷ TwoOrMore Item
  , activeIndex ∷ Int
  , updateActiveIndex ∷ Int -> Effect Unit
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

component ∷ ReactComponent ComponentProps
component =
  unsafePerformEffect
    $ reactComponent "Segmented" \({ buttonContents, activeIndex, updateActiveIndex } ∷ ComponentProps) -> React.do
        -------------------------------------------
        -- Store button refs for animation purposes
        itemRefs /\ setItemRefs ∷ Maybe (TwoOrMore _) /\ _ <- useState' Nothing
        useLayoutEffectOnce do
          refs <- traverse (const createRef) buttonContents
          setItemRefs (Just refs)
          mempty
        -------------------------------------------
        -- Support keyboard input
        let
          maxIndex = TwoOrMore.length buttonContents - 1
          updateIndex idx = do
            updateActiveIndex idx
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
        windowSize <- useResize
        useAff { windowSize } do
          delay (200.0 # Milliseconds)
          liftEffect do -- force rerender
            refs <- traverse (const createRef) buttonContents
            setItemRefs (Just refs)
        let
          children ∷ Array JSX
          children = refsAndContents <#> mapWithIndex contentToChild # maybe mempty TwoOrMore.toArray
          refsAndContents ∷ Maybe (TwoOrMore (Item /\ Ref (Nullable Node)))
          refsAndContents = TwoOrMore.zip buttonContents <$> itemRefs
          contentToChild ∷ Int -> (Item /\ Ref (Nullable Node)) -> JSX
          contentToChild idx ({ id, value } /\ ref) = do
            let isLast = idx + 1 == TwoOrMore.length buttonContents
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
                    itemRefs
                      # foldMap \activeItemRefs ->
                          React.element activeComponent
                            { activeItemRefs
                            , activeItemIndex: activeIndex
                            , updateActiveIndex
                            }
                            A.: children
                  }
              ]
            }
