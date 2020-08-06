module Components.Box.View (component, Props) where

import Prelude.View
import Components.Box.Style as Styles
import Data.Nullable (Nullable)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Unsafe.Coerce (unsafeCoerce)
import Untagged.Union (UndefinedOr)
import Web.DOM (Node)

type Props =
  { kids ∷ Array JSX
  , nodeRef ∷ UndefinedOr (Ref (Nullable Node))
  }

component ∷ ReactComponent Props
component =
  reactComponent "Box" \({ kids, nodeRef } ∷ Props) -> React.do
    pure
      $ E.element R.div'
          { className: "ry-box"
          , css: Styles.box
          , children: kids
          , ref: unsafeCoerce nodeRef
          }
