module Story.Yoga.Block.Typography.Story where

import Yoga.Prelude.View

import React.Basic.DOM as R
import React.Basic.Emotion as E
import Storybook (metaDecorator)
import Yoga.Block as Block
import Yoga.Block.Container.Style (size)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Typography.Heading.Style as HeadingStyle
import Yoga.Prelude.Style (sizeStyle)

default =
  { title: "Typography"
  , decorators:
      [ metaDecorator \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

headings ∷ Effect JSX
headings = do
  let text = "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern"
  pure $
    Block.box_
      [ R.h2_ [ R.text "Headings" ]
      , Block.stack_
          [ R.h1' </* { css: HeadingStyle.h1 } /> [ R.text $ "H1 " <> text ]
          , R.h2' </* { css: HeadingStyle.h2 } /> [ R.text $ "H2 " <> text ]
          , R.h3' </* { css: HeadingStyle.h3 } /> [ R.text $ "H3 " <> text ]
          , R.h4' </* { css: HeadingStyle.h4 } /> [ R.text $ "H4 " <> text ]
          , R.h5' </* { css: HeadingStyle.h5 } /> [ R.text $ "H5 " <> text ]
          , R.h6' </* { css: HeadingStyle.h6 } /> [ R.text $ "H6 " <> text ]
          ]
      , R.h3' </* { css: HeadingStyle.h3 <> HeadingStyle.highlight } />
          [ R.text text ]
      , R.h3' </* { css: HeadingStyle.title } />
          [ R.text "Small Title" ]
      , R.h4' </* { css: HeadingStyle.subtitle } />
          [ R.text "Some more info about this" ]
      , R.p' </ {} />
          [ R.text "Franz jagt im komplett verwahrlosten Taxi quer durch Bayern"
          ]
      , Block.cluster { space: size.xs }
          [ R.span' </* { css: HeadingStyle.tag } /> [ R.text "Hi" ]
          , R.span' </* { css: HeadingStyle.tag } /> [ R.text "Hohohoho" ]
          ]
      ]
