module Story.Yoga.Block.Molecule.Breadcrumbs (default, breadcrumbs) where

import Prelude

import Data.Array.NonEmpty as NEA
import Data.Monoid (power)
import Effect (Effect)
import Fahrtwind.Icon.Heroicons as Heroicon
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (element) as React
import Storybook (Meta, meta, metaDecorator)
import Yoga ((</>))
import Yoga.Block as Block
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Molecule.Modal as Modal
import Yoga.Prelude.Style as YS
import Yoga.Prelude.View as Y

default ∷ Meta Modal.Props
default = meta
  { title: "Molecule/Breadcrumbs"
  , component: (pure <<< React.element) Modal.component
  , decorators:
      [ metaDecorator \storyFn →
          fragment
            [ element E.global { styles: Styles.global }
            , storyFn
            , Block.layer { id: "modals", zIndex: 10 }
            , Block.layer { id: "clickaway", zIndex: 5 }
            , Block.layer { id: "popovers", zIndex: 15 }
            ]
      ]
  }

breadcrumbs ∷ Effect JSX
breadcrumbs = pure $ Block.stack_
  [ Block.breadcrumbs'
      </> { links: (pure { content: R.text "Home", href: "/" }) }
  , Block.breadcrumbs'
      </>
        { links:
            ( NEA.cons'
                { content: Y.div_
                    ( YS.mT (1) <> YS.widthAndHeight' (18 # YS.px)
                        <> YS.css { stroke: YS.str "1" }
                    )
                    [ Heroicon.home ]
                , href: "/"
                }
                [ { content: R.text "users", href: "/users" }
                , { content: R.text "1234", href: "/users/1234" }
                ]
            )
        }
  , Block.breadcrumbs'
      </>
        { links:
            ( NEA.cons'
                { content: Heroicon.home, href: "/" }
                [ { content: R.text "one", href: "/one" }
                , { content: R.text "two", href: "/two" }
                , { content: R.text "three", href: "/three" }
                , { content: R.text "four", href: "/four" }
                , { content: R.text "five", href: "/five" }
                , { content: R.text "six", href: "/six" }
                , { content: R.text "seven", href: "/seven" }
                , { content: R.text "eight", href: "/eight" }
                , { content: R.text "nine", href: "/nine" }
                , { content: R.text "ten", href: "/ten" }
                , { content: R.text "eleven", href: "/eleven" }
                , { content: R.text "twelve", href: "/twelve" }
                ]
            )
        }
  ]
