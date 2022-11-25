module Story.Yoga.Block.Atom.Select where

import Prelude

import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Storybook.Addon.Actions (action)
import Yoga.Block.Atom.Select as Select
import Yoga.Block.Container.Style as Styles

default ∷
  { decorators ∷ Array (Effect JSX → JSX)
  , title ∷ String
  }
default =
  { title: "Atom/Select"
  , decorators:
      [ \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
      ]
  }

select ∷ Effect JSX
select =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "Select" ]
            , element Select.component
                { choice: 1
                , choices: [ 1, 2, 3 ]
                , onChange: action "changed"
                , toString: show
                , toValue: show
                }
            ]
        ]
