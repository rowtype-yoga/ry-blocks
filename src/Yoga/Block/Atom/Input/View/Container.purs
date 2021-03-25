module Yoga.Block.Atom.Input.View.Container where

import Yoga.Prelude.View
import Data.Array as Array
import Data.Interpolate (i)
import Effect.Class.Console (log)
import Foreign.Object as Object
import Framer.Motion as M
import Partial.Unsafe (unsafeCrashWith)
import React.Basic.DOM (CSS, css)
import React.Basic.Emotion (Style)
import Yoga.Block.Atom.Input.Style as Style

type PropsF f =
  ( css ∷ f Style
  , isInvalid ∷ f Boolean
  | Style.Props f (MandatoryProps ())
  )

type MandatoryProps r =
  ( children ∷ Array JSX
  , hasFocus ∷ Boolean
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
      let
        result =
          M.div
            </* M.motion
                { variants: M.variants containerVariants
                , animate: M.animate if props.hasFocus then containerVariantLabels.focussed else containerVariantLabels.blurred
                , onViewportBoxUpdate: M.onViewportBoxUpdate \_ _ -> log "hi"
                }
                { className: "ry-input-container"
                , css: Style.inputContainer props
                , _data:
                  props.isInvalid
                    # foldMap \isInvalid ->
                        Object.fromHomogeneous
                          { "invalid": show isInvalid
                          }
                , ref
                }
            /> props.children
      pure result

drawPathUntil ∷ Int -> Array Point -> String
drawPathUntil idx thePath = do
  let
    fn { x, y } = i x "%" " " y "%"
    firstFew = Array.take idx thePath
    lastFew = Array.drop idx thePath $> (Array.last firstFew # fromMaybe' \_ -> unsafeCrashWith "ogod")
    rendered = intercalate "," $ fn <$> (firstFew <> lastFew)
  i "polygon(" rendered ")"

path ∷ Array Point
path = mkPath 4 8

mkPath ∷ Int -> Int -> Array Point
mkPath borderX borderY = do
  let
    inside =
      [ {- ⌜ -} p borderX borderY
      , {- ⌞ -} p borderX (100 - borderY)
      , {- ⌟ -} p (100 - borderX) (100 - borderY)
      , {- ⌝ -} p (100 - borderX) borderY
      , {- ⌜ -} p borderX borderY
      ]
    outside =
      [ {-⌜    -} p 0 0
      , {-⌞    -} p 0 100
      , {- .   -} p 25 100
      , {-  .  -} p 50 100
      , {-   . -} p 75 100
      , {-    ⌟-} p 100 100
      , {-    ⌝-} p 100 0
      , {-   ^ -} p 75 0
      , {-  ^  -} p 50 0
      , {- ^   -} p 25 0
      , {-⌜    -} p 0 0
      ]
  inside <> outside <> (Array.reverse inside)
  where
  p ∷ Int -> Int -> Point
  p x y = { x, y }

containerVariantLabels ∷
  { blurred ∷ M.VariantLabel
  , focussed ∷ M.VariantLabel
  }
containerVariantLabels = M.makeVariantLabels containerVariants

containerVariants ∷
  { blurred ∷ CSS
  , focussed ∷ CSS
  }
containerVariants =
  { focussed:
    css
      { clipPath
      , transition: { duration: 0.6 }
      }
  , blurred:
    css
      { clipPath:
        drawPathUntil (Array.length path + 1) path
      }
  }
  where
  clipPath = 6 Array... (Array.length path) <#> \ln -> drawPathUntil ln path

type Point =
  { x ∷ Int, y ∷ Int }
