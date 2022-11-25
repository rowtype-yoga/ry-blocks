module Yoga.Block.Atom.Button.View where

import Yoga.Prelude.View

import Data.Array as Array
import Data.Tuple (uncurry)
import Effect.Uncurried (runEffectFn1)
import Foreign.Object as Object
import React.Basic.DOM as R
import React.Basic.Hooks as React
import Record.Unsafe (unsafeGet, unsafeSet)
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Union (uorToMaybe)
import Yoga.Block.Atom.Button.Style as Style
import Yoga.Block.Atom.Button.Types (ButtonShape, ButtonType, renderButtonShape, renderButtonType)
import Yoga.Block.Atom.Button.Types as Button
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Hook.UseDrip (useDrip)
import Yoga.Block.Internal (ButtonWritablePropsNoChildrenF, objectToStyle, toStyleObject)
import Yoga.Block.Quark.Drip.View as Drip

type PropsF :: forall k. (Type -> k) -> Row k -> Row k
type PropsF f r =
  ( buttonType ∷ f ButtonType
  , buttonShape ∷ f ButtonShape
  , ripple ∷ f String
  | Style.Props f r
  )

type PropsNoChildren =
  PropsF Id (ButtonWritablePropsNoChildrenF Id ())

type Props =
  PropsF Id (ButtonWritablePropsF Id ())

type PropsOptional =
  PropsF OptionalProp (ButtonReadableProps)

component ∷ ∀ p p_. Union p p_ Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  mkForwardRefComponent "Button" do
    \(props ∷ { | PropsOptional }) propsRef -> React.do
      backupRef <- React.useRef null
      let ref = forwardedRefAsMaybe propsRef # fromMaybe backupRef
      let buttonType = props.buttonType ?|| Button.Generic
      let buttonShape = props.buttonShape ?|| Button.Rounded
      let
        rippleʔ = props.ripple # opToMaybe # case buttonShape of
          Button.Flat -> case buttonType of
            Button.Primary ->
              fromMaybe colour.highlightLighter >>> Just
            _ -> fromMaybe colour.highlightAlpha50 >>> Just
          _ -> identity
      dripValues <- useDrip ref
      let propsChildren = unsafeGet "children" props # reactChildrenToArray
      let
        children = reactChildrenFromArray case rippleʔ of
          Nothing -> propsChildren
          Just rippleColour -> do
            Array.cons
              ( Drip.component
                  </>
                    ( { className: "ry-button-drip"
                      , visible: dripValues.visible
                      , x: dripValues.x
                      , y: dripValues.y
                      , onComplete: dripValues.onComplete
                      , colour: rippleColour
                      }
                    )
              )
              propsChildren

      let
        onClick = case unsafeGet "onClick" props # uorToMaybe of
          Just givenHandler -> handler syntheticEvent \e -> do
            void $ runEffectFn1 givenHandler e
            void $ runEffectFn1 dripValues.onClick e

          Nothing -> dripValues.onClick
      let
        props' = props
          # unsafeSet "onClick" onClick
          # unsafeSet "children" (children)
      let
        _data =
          Object.fromHomogeneous
            { "button-type": renderButtonType buttonType
            , "button-shape": renderButtonShape buttonShape
            }
      pure
        $ emotionButton ref
            props'
            { className: "ry-button"
            , css: Style.button <>? props.css
            , style: objectToStyle
                ( foldMap (uncurry toStyleObject)
                    [ Style.style.background /\ props.backgroundCol
                    , Style.style.textCol /\ props.textCol
                    , Style.style.borderCol /\ props.borderCol
                    , Style.style.width /\ props.width
                    , Style.style.hoverBackgroundCol /\ props.hoverBackgroundCol
                    ]
                )
            , _data
            }
