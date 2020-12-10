module Yoga.Block.Container.View (component, Props) where

import Yoga.Prelude.View
import Data.Array as Array
import Effect.Unsafe (unsafePerformEffect)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponentWithChildren)
import Yoga.Block.Container.Style as Styles

type Props =
  { children ∷ ReactChildren JSX }

component ∷ ReactComponent Props
component =
  unsafePerformEffect
    $ reactComponentWithChildren "Container" \({ children } ∷ Props) -> React.do
        pure
          $ R.div_
          $ Array.cons
              (element E.global { styles: Styles.global })
              (reactChildrenToArray children)
