module Yoga.Block.Atom.Input.View.Container where

import Yoga.Prelude.View

import Data.Array as Array
import Data.Interpolate (i)
import Foreign.NullOrUndefined (undefined)
import Framer.Motion as M
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (CSS, css)
import React.Basic.DOM as R
import React.Basic.Emotion (Style)
import React.Basic.Hooks as React
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Atom.Input.Style as Style
import Yoga.Block.Hook.UseWindowResize (useWindowResize)

type PropsF f =
  ( css ∷ f Style
  , isInvalid ∷ f Boolean
  | Style.Props f (MandatoryProps ())
  )

type MandatoryProps r =
  ( children ∷ Array JSX
  , hasFocus ∷ Boolean
  , hasLabel :: Boolean
  | r
  )

type Props =
  PropsF Id

type PropsOptional =
  PropsF OptionalProp

component ∷ ∀ p q. Union p q Props => ReactComponent { | MandatoryProps p }
component = rawContainer

rawContainer ∷ ∀ p. ReactComponent { | p }
rawContainer =
  mkForwardRefComponent "InputContainer" do
    \(props ∷ { | PropsOptional }) ref -> React.do
      sizes <- useWindowResize
      dimensions /\ setDimensions <- useState' zero
      useEffect sizes.innerWidth do
        maybeDimensions <- getOffsetDimensionsFromRef ref
        for_ maybeDimensions setDimensions
        mempty
      let
        containerVariants = mkContainerVariants dimensions
        containerVariantLabels = mkContainerVariantLabels containerVariants
        animated =
          M.div
            </*
              ( { variants: M.variants containerVariants
                , initial: M.initial false
                , animate: M.animate
                    if props.hasFocus then
                      containerVariantLabels.focussed
                    else
                      containerVariantLabels.blurred
                , className: "ry-input-container"
                , key: show sizes.innerWidth -- redraw
                , css: Style.inputContainer props
                , ref
                } `unsafeAddProps`
                  { "data-invalid":
                      props.isInvalid
                        # opToMaybe
                        # maybe (unsafeCoerce undefined) show
                  }
              )
        static =
          R.div'
            </*
              ( { className: "ry-input-container"
                , key: show sizes.innerWidth -- redraw
                , css: Style.inputContainer props <> Style.ploppedFocusWithin
                , ref
                } `unsafeAddProps`
                  { "data-invalid":
                      props.isInvalid
                        # opToMaybe
                        # maybe (unsafeCoerce undefined) show
                  }
              )
        result = R.div' </* { css: Style.containerContainer props } />
          [ R.div' </*> { className: "container-background", css: Style.containerBackground props }
          , (if props.hasLabel then animated else static) props.children
          ]
      pure result

drawPathUntil ∷ Int -> Array Point -> String
drawPathUntil idx thePath = do
  let
    fn { x, y } = i x "px" " " y "px"
    firstFew = Array.take idx thePath
    lastOne = Array.last firstFew # fromMaybe' \_ -> unsafeCrashWith "ogod"
    lastFew =
      Array.replicate
        (Array.length thePath - Array.length firstFew)
        lastOne
    rendered = intercalate "," $ fn <$> (firstFew <> lastFew)
  i "polygon(" rendered ")"

mkPath ∷ { width ∷ Number, height ∷ Number } -> Array Point
mkPath { width, height } = do
  let
    inside =
      [ {- ⌜ -} p outerCornerBorder border
      , {- ⌜ -} p cornerBorder cornerBorder
      , {- ⌜ -} p border outerCornerBorder
      , {- ⌞ -} p border (height - outerCornerBorder)
      , {- ⌞ -} p cornerBorder (height - cornerBorder)
      , {- ⌞ -} p outerCornerBorder (height - border)
      , {- ⌟ -} p (width - outerCornerBorder) (height - border)
      , {- ⌟ -} p (width - cornerBorder) (height - cornerBorder)
      , {- ⌟ -} p (width - border) (height - outerCornerBorder)
      , {- ⌝ -} p (width - border) outerCornerBorder
      , {- ⌝ -} p (width - cornerBorder) cornerBorder
      , {- ⌝ -} p (width - outerCornerBorder) border
      , {- ⌜ -} p outerCornerBorder border
      ]
    outside =
      [ {-⌜    -} p topBorder topBorder
      , {-⌜    -} p topBorder topBorder
      , {-⌜    -} p topBorder topBorder
      , {-⌞    -} p topBorder heightWith2xBorder
      , {- .   -} p (widthWith2xBorder * 0.25) heightWith2xBorder
      , {-  .  -} p (widthWith2xBorder * 0.5) heightWith2xBorder
      , {-   . -} p (widthWith2xBorder * 0.75) heightWith2xBorder
      , {-    ⌟-} p widthWith2xBorder heightWith2xBorder
      , {-    ⌝-} p widthWith2xBorder topBorder
      , {-   ^ -} p (widthWith2xBorder * 0.25) topBorder
      , {-  ^  -} p (widthWith2xBorder * 0.5) topBorder
      , {- ^   -} p (widthWith2xBorder * 0.75) topBorder
      , {-⌜    -} p topBorder topBorder
      ]
  inside <> outside <> (Array.reverse inside)
  where
  topBorder = -border - border

  widthWith2xBorder = width + border + border

  heightWith2xBorder = height + border + border

  border = 2.2

  cornerBorder = 4.5

  outerCornerBorder = 8.3

  p ∷ Number -> Number -> Point
  p x y = { x, y }

mkContainerVariantLabels
  ∷ { blurred ∷ CSS
    , focussed ∷ CSS
    }
  -> { blurred ∷ M.VariantLabel
     , focussed ∷ M.VariantLabel
     }
mkContainerVariantLabels = M.makeVariantLabels

mkContainerVariants
  ∷ { width ∷ Number, height ∷ Number }
  -> { blurred ∷ CSS
     , focussed ∷ CSS
     }
mkContainerVariants dimensions =
  { focussed:
      css
        { clipPath: clipPathFocussed
        , transition: { duration: 0.6 }
        }
  , blurred:
      css
        { clipPath:
            drawPathUntil (Array.length path + 1) path
        }
  }
  where
  path = mkPath dimensions

  clipPathFocussed = 13 Array... (Array.length path) <#> \ln -> drawPathUntil ln path

type Point =
  { x ∷ Number, y ∷ Number }
