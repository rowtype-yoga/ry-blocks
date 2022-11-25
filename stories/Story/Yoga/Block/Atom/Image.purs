module Story.Yoga.Block.Atom.Image.Story where

import Prelude

import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic as React
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Record (merge)
import Storybook (Meta, meta, metaDecorator)
import Yoga ((</>))
import Yoga.Block.Atom.Image as Image
import Yoga.Block.Container.Style as Styles

default ∷ Meta { | Image.Props }
default = meta
  { title: "Atom/Image"
  , component: (pure <<< React.element) Image.component
  , decorators:
      [ metaDecorator \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , storyFn
            ]
      ]
  }

image ∷ Effect JSX
image = do
  pure $
    R.div_
      [ R.h2_ [ R.text "Image" ]
      , Image.component </>
          ( baseProps # merge
              { sizes:
                  [ "(min-width: 2600px) 4160px"
                  , "(min-width: 2400px) 2400px"
                  , "(min-width: 640px) 640px"
                  , "100vw"
                  ]
              }
          )
      , Image.component </> (baseProps # merge { width: 200 })
      ]
  where
  baseProps =
    { src: imgName 640
    , srcSet: widthImage <$> [ 320, 640, 2400, 4160 ]

    , alt: "An image of a yoga mat"

    }
  imgName size = "/unsplash-mat-" <> show size <> ".jpg"
  widthImage size = imgName size <> " " <> show size <> "w"
