module Yoga.Block.Atom.Popover.Story (default, popover) where

import Yoga.Prelude.View
import Data.Interpolate (i)
import Effect.Uncurried (mkEffectFn1)
import Effect.Unsafe (unsafePerformEffect)
import Framer.Motion as Motion
import React.Basic.DOM (h2_, text)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import React.Basic.Popper (modifierArrow, modifierOffset)
import React.Basic.Popper.Hook (usePopper)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal.CSS (nest)

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Popover"
  , decorators:
    [ \storyFn ->
        div
          </ {}
          /> [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
    ]
  }

popover ∷ Effect JSX
popover = do
  example <- mkBasicExample
  pure
    $ fragment
        [ div </ {}
            /> [ h2_ [ text "A popover" ]
              , element example {}
              ]
        ]
  where
  nullRef ∷ NodeRef
  nullRef = unsafeCoerce null

  mkBasicExample =
    React.reactComponent "Popper example" \_p -> React.do
      referenceElement /\ setReferenceElement <- React.useState' nullRef
      let
        popover' =
          Block.popover
            </ { referenceElement }
            /> [ R.div_ [ R.text "Inside the Popover" ] ]
      pure
        $ fragment
            [ R.span' </ { ref: unsafeCoerce (mkEffectFn1 setReferenceElement) }
                /> [ R.text "Hi!" ]
            , popover'
            ]
