module Yoga.Block.Atom.Segmented.View.ActiveIndicator (Props, component) where

import Yoga.Prelude.View
import Control.MonadZero as MZ
import Data.Traversable (traverse)
import Data.TwoOrMore (TwoOrMore)
import Data.TwoOrMore as TwoOrMore
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion (VariantLabel)
import Framer.Motion as Motion
import Hooks.Scroll (useScrollPosition)
import Literals.Undefined (undefined)
import MotionValue (useMotionValue)
import MotionValue as MotionValue
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (css)
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Atom.Segmented.Style as Style

type Props =
  { activeItemRefs ∷ TwoOrMore (Ref (Nullable Node))
  , activeItemIndex ∷ Int
  , updateActiveIndex ∷ Int -> Effect Unit
  , windowWidth ∷ Number
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "SegmentedActive" do
        \(props ∷ Props) -> React.do
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
                Emotion.elementKeyed Motion.div
                  { css: Style.activeElement
                  , key: show props.windowWidth -- to force rerender
                  , variants
                  , className: "ry-active-segmented-element"
                  , initial: Motion.initial (indexToVariant props.activeItemIndex)
                  , drag: Motion.drag "x"
                  , dragMomentum: Motion.dragMomentum false
                  , animate: Motion.animate $ indexToVariant props.activeItemIndex
                  , layout: Motion.layout true
                  , whileTap: Motion.whileTap $ css { scale: 0.9 }
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
                  }

getStyle ∷
  Ref (Nullable Node) ->
  MaybeT Effect BBox
getStyle itemRef = do
  br <- MaybeT $ getBoundingBoxFromRef itemRef
  pure
    { width: br.width
    , height: br.height
    , left: br.left
    , top: br.top
    }

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
