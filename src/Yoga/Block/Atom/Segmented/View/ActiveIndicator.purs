module Yoga.Block.Atom.Segmented.View.ActiveIndicator (Props, component) where

import Yoga.Prelude.View

import Control.MonadZero as MZ
import Data.Traversable (traverse)
import Data.TwoOrMore (TwoOrMore)
import Data.TwoOrMore as TwoOrMore
import Effect.Class.Console as Console
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object as Object
import Framer.Motion (VariantLabel)
import Framer.Motion as Motion
import Literals.Undefined (undefined)
import MotionValue (useMotionValue)
import MotionValue as MotionValue
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Atom.Segmented.Style as Style
import Yoga.Block.Atom.Segmented.View.Types (Item)
import Yoga.Block.Hook.Scroll (useScrollPosition)
import Yoga.Block.Hook.UseResize as UseResize

type Props =
  { activeItemRefs ∷ TwoOrMore (Ref (Nullable Node))
  , buttonContents ∷ TwoOrMore Item
  , activeItemIndex ∷ Int
  , updateActiveItem ∷ Item -> Int -> Effect Unit
  , windowSize ∷ UseResize.Sizes
  }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponent "SegmentedActive" do
        \(props ∷ Props) -> React.do
          maybeAnimationVariants /\ setVariants <- useState' Nothing
          variantIndex /\ modVariantIndex <- useState props.activeItemIndex
          maybeDragXRef <- useRef Nothing
          { scrollX, scrollY } <- useScrollPosition
          activeLeft <- useMotionValue 0.0
          activeWidth <- useMotionValue 0.0
          useEffectAlways do
            _ <- do
              styles <- getStyles props.activeItemRefs
              unless (maybeAnimationVariants == Just styles) do
                setVariants (Just styles)
            mempty
          let
            setDragXRef new = do
              writeRef maybeDragXRef new
              maybeDragX <- readRef maybeDragXRef
              case maybeDragX, maybeAnimationVariants of
                Just x, Just animationVariants -> do
                  let { left, width } = handleDrag { activeItemIndex: props.activeItemIndex, animationVariants, x }
                  activeLeft # MotionValue.set left
                  activeWidth # MotionValue.set width
                _, _ -> mempty
          useEffect props.activeItemIndex do
            modVariantIndex (const props.activeItemIndex)
            mempty
          useEffect (props.windowSize /\ scrollX /\ scrollY) do
            if variantIndex == 0 then do
              modVariantIndex (_ + 1)
              modVariantIndex (_ - 1)
            else do
              modVariantIndex (_ - 1)
              modVariantIndex (_ + 1)
            mempty
          let
            variants ∷ Motion.Variants
            variants = case maybeAnimationVariants of
              Just animationVariants ->
                animationVariants
                  # foldMapWithIndex
                      (\i s -> Object.singleton (show i) (css s))
                  # Motion.variantsFromObject
              Nothing -> cast undefined
          pure $ maybeAnimationVariants
            # foldMap \animationVariants ->
                Emotion.element R.div'
                  { className: "ry-active-segmented-element-wrapper"
                  , css: Style.activeElementWrapper
                  , children:
                      [ Emotion.element Motion.div
                          { css: Style.activeElement
                          , layout: Motion.layout true
                          , custom: Motion.customProp (({ childRefs: props.activeItemRefs, scrollX, scrollY }) ∷ Custom)
                          , variants
                          , className: "ry-active-segmented-element"
                          , initial: Motion.initial $ indexToVariant props.activeItemIndex
                          , drag: Motion.drag "x"
                          , dragMomentum: Motion.dragMomentum false
                          , animate: Motion.animate $ indexToVariant variantIndex
                          , style:
                              css
                                { left: activeLeft
                                , width: activeWidth
                                }
                          , whileTap: Motion.whileTap $ css { scaleY: 0.8, scaleX: 0.95, y: -1.0 }
                          , onDragStart:
                              Motion.onDragStart \_ pi -> do
                                maybeBbox <- getBoundingBoxFromRef (TwoOrMore.head props.activeItemRefs)
                                for_ maybeBbox \bbox ->
                                  setDragXRef (Just (pi.point.x - bbox.left))
                          , onDrag:
                              Motion.onDrag \_ pi -> do
                                maybeDragX <- readRef maybeDragXRef
                                when (isJust maybeDragX) do
                                  maybeBbox <- getBoundingBoxFromRef (TwoOrMore.head props.activeItemRefs)
                                  for_ maybeBbox \bbox ->
                                    setDragXRef (Just (pi.point.x - bbox.left))
                          , onDragEnd:
                              Motion.onDragEnd \_ _ -> do
                                maybeDragX <- readRef maybeDragXRef
                                let
                                  x = maybeDragX # fromMaybe' \_ -> unsafeCrashWith "no x"
                                  newIdx =
                                    findOverlapping
                                      props.activeItemIndex
                                      animationVariants
                                      x
                                  newItem = fromMaybe'
                                    (\_ -> TwoOrMore.head props.buttonContents)
                                    (props.buttonContents TwoOrMore.!! newIdx)
                                  v =
                                    animationVariants TwoOrMore.!! newIdx
                                      # fromMaybe' \_ -> unsafeCrashWith "omg"
                                activeLeft # MotionValue.set v.left
                                activeWidth # MotionValue.set v.width
                                props.updateActiveItem newItem newIdx
                                writeRef maybeDragXRef Nothing
                          , dragElastic: Motion.dragElastic false
                          , dragConstraints: Motion.dragConstraintsBoundingBox { left: 0, right: 0, top: 0, bottom: 0 }
                          , transition:
                              Motion.transition
                                { type: "tween"
                                , duration: if isJust (unsafePerformEffect (readRef maybeDragXRef)) then 0.0 else 0.167
                                , ease: "easeOut"
                                }
                          , _aria: Object.fromHomogeneous { hidden: "true" }
                          }
                      ]
                  }

getStyles ∷ TwoOrMore (Ref (Nullable Node)) -> Effect (TwoOrMore BBox)
getStyles itemRefs = do
  maybeBBs ∷ TwoOrMore (Maybe DOMRect) <- traverse getBoundingBoxFromRef itemRefs
  let boundingBoxes = maybeBBs <#> (_ # fromMaybe' \_ -> unsafeCrashWith "something's wrong")
  pure (boundingBoxes # map (fn boundingBoxes))
  where
  fn ∷ TwoOrMore DOMRect -> DOMRect -> BBox
  fn boundingBoxes bb = do
    let first = TwoOrMore.head boundingBoxes
    { width: bb.width
    , height: bb.height
    , left: bb.left - first.left
    , top: 0.0
    }

type Custom =
  { childRefs ∷ TwoOrMore NodeRef, scrollX ∷ Number, scrollY ∷ Number }

indexToVariant ∷ Int -> VariantLabel
indexToVariant = show >>> unsafeCoerce

type BBox =
  { top ∷ Number, left ∷ Number, width ∷ Number, height ∷ Number }

findOverlapping ∷ Int -> TwoOrMore BBox -> Number -> Int
findOverlapping activeIndex styles x =
  fromMaybe activeIndex do
    let fst = TwoOrMore.head styles
    let lst = TwoOrMore.last styles
    let inside e = (e.left < x) && (e.left + e.width) >= x
    let tooFarLeft = MZ.guard (x <= fst.left + fst.width) $> 0
    let tooFarRight = MZ.guard (x >= lst.left) $> TwoOrMore.length styles - 1
    TwoOrMore.findIndex inside styles <|> tooFarLeft <|> tooFarRight

handleDrag
  ∷ { activeItemIndex ∷ Int
    , animationVariants ∷ TwoOrMore BBox
    , x ∷ Number
    }
  -> { left ∷ Number, width ∷ Number }
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
  let rangeStart = smaller.left + smaller.width / 2.0
  let rangeEnd = greater.left + greater.width / 2.0
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
  else if x >= lastVariant.left + lastVariant.width then do
    { left: lastVariant.left, width: lastVariant.width }
  else do
    { left, width }
