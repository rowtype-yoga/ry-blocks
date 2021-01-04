module Yoga.Block.Container.View
  ( component, Props, PropsF
  ) where

import Yoga.Prelude.View
import Data.Array as Array
import Effect.Unsafe (unsafePerformEffect)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Container.Style (DarkOrLightMode)
import Yoga.Block.Container.Style as Styles

type PropsF f =
  ( content ∷ JSX
  , themeVariant ∷ f (Maybe DarkOrLightMode)
  )

type Props =
  ( | PropsF Id )

component ∷ ∀ p q. Union p q Props => ReactComponent { | p }
component = rawComponent

rawComponent ∷ ∀ p. ReactComponent { | p }
rawComponent =
  unsafeCoerce
    $ unsafePerformEffect
    $ reactComponent "Container" \({ content, themeVariant } ∷ { | PropsF OptionalProp }) -> React.do
        pure
          $ R.div_
          $ Array.cons
              ( element E.global
                  { styles:
                    case opToMaybe themeVariant # join of
                      Nothing -> Styles.global
                      Just Styles.DarkMode -> Styles.darkMode
                      Just Styles.LightMode -> Styles.lightMode
                  }
              )
              [ content
              ]
