module Story.Yoga.Block.Atom.PopOver.Story where

import Yoga.Prelude.View

import Fahrtwind (divideY, withAlpha)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Storybook (metaDecorator)
import Yoga.Block as Block
import Yoga.Block.Atom.PopOver.Style as PopOverStyle
import Yoga.Block.Container.Style as Styles
import Yoga.Prelude.Style as S

default =
  { title: "Atom/PopOver"
  , decorators:
      [ metaDecorator \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

popover ∷ Effect JSX
popover = do
  pure $
    R.div_
      [ R.h2_ [ R.text "Image" ]
      , Block.box { css: PopOverStyle.popOverStyle }
          [ Block.stack
              { space: S.sizeStyle.s
              , childCss: S.pT' S.sizeStyle.s
              , css: divideY 1 <> S.divideCol'
                  (S.str PopOverStyle.popOverSeparatorCol)
              }
              [ R.div_ [ R.text "My PopOver" ]
              , R.div_ [ R.text "My OtherPopOver" ]
              ]
          ]
      ]
