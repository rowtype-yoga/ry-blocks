module Yoga.Block.Layout.Story (default, layout) where

import Prelude
import Color (cssStringRGBA)
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion (nested)
import React.Basic.Emotion as E
import Yoga ((/>), (</), (</*), (</*>), (</>))
import Yoga.Block as Block
import Yoga.Block.Container.Style (colour, size, withAlpha)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Palette as Palette
import Yoga.Block.Typography as Typo

default ∷
  { decorators ∷ Array (Effect JSX -> JSX)
  , title ∷ String
  }
default =
  { title: "Layout"
  , decorators:
    [ \storyFn ->
        R.div_
          [ element E.global { styles: Styles.global }
          , unsafePerformEffect storyFn
          ]
    ]
  }

layout ∷ Effect JSX
layout =
  pure
    $ fragment
        [ R.div_
            [ R.h1_ [ R.text "Some Layout combinations" ]
            , R.h2_ [ R.text "A Post Preview" ]
            , postPreview
            ]
        ]
  where
  postPreview =
    Block.box </* { padding: E.str $ size.l <> " " <> size.l <> " " <> size.xl, className: "post-preview", css: boxCss }
      /> [ Block.stack </ { space: E.str size.l }
            /> [ Block.stack </ { space: E.str size.xs }
                  /> [ Block.cluster </ {} /> [ avatar, postTitle ]
                    , Block.stack </ { space: E.str size.xs }
                        /> [ R.hr'
                              </*> { className: "hr"
                                , css:
                                  E.css
                                    { backgroundColor: E.str $ colour.backgroundLayer3
                                    , height: E.px 1
                                    , border: E.none
                                    }
                                }
                          , Block.cluster </ { justify: "space-between", space: "0" } /> [ postAuthor, postDate ]
                          ]
                    ]
              , preview
              ]
        ]
    where
    preview =
      R.p'
        </* { className: "post-preview-text"
          , css:
            Typo.fontSizeSmall
              <> E.css
                  { margin: E.str "0"
                  , marginBottom: E.str size.xs
                  , lineHeight: E.str "1.6"
                  }
          }
        /> [ R.text "When I was a young girl fighting with 'undefined' not being a function my mother used to come up to me and say: 'Use PureScript'. Now, a mere twenty years later..."
          ]

    boxCss =
      Typo.fontSizeSmall
        <> E.css
            { background: E.str $ colour.backgroundLayer2
            , borderRadius: E.str size.l
            , maxWidth: E.ch 60.0
            }

    avatar =
      R.div'
        </* { className: "profile-picture-container"
          , css:
            E.css
              { width: E.str size.xxl
              , height: E.str size.xxl
              , overflow: E.str "hidden"
              , display: E.inlineBlock
              , borderRadius: E.percent 50.0
              , border: E.str $ size.xxs <> " solid " <> colour.highlight
              , background: E.str $ Palette.gradientBox Palette.malachite.dark
              , userSelect: E.none
              , marginLeft: E.auto
              , marginRight: E.auto
              }
          }
        /> [ R.img'
              </*> { alt: "Profile Picture"
                , src: "https://source.unsplash.com/z_8Jqe0Cc-s/360x200"
                , className: "profile-picture"
                , css:
                  E.css
                    { objectFit: E.str "cover"
                    , width: E.str "100%"
                    , height: E.str "100%"
                    , objectPosition: E.str "center right"
                    , transform: E.str "scaleX(-1)"
                    }
                }
          ]

    postTitle =
      R.h2'
        </* { className: "title"
          , css:
            Typo.fontSizeH3
              <> E.css
                  { fontWeight: E.str "bold"
                  , padding: E.str "0"
                  , lineHeight: E.str "1.2"
                  , display: E.inlineBlock
                  , maxWidth: E.str "100%"
                  , flexBasis: "0" # E.str
                  , flexGrow: "999" # E.str
                  , minWidth: "20ch" # E.str
                  }
          }
        /> [ R.text "How to properly write effective React code in 2021" ]

    postAuthor =
      R.h4'
        </* { className: "author"
          , css:
            Typo.minimumSpacing
              <> Typo.noMargins
              <> Typo.allCaps
              <> Typo.fontSizeSmall
              <> Typo.regular
              <> E.css
                  { "&::before":
                    nested $ E.css { content: E.str "'by '" }
                      <> Typo.thin
                      <> Typo.resetTextTransform
                  }
          }
        /> [ R.text "Someöne W. Knows" ]

    postDate =
      R.h4'
        </* { className: "date"
          , css:
            Typo.minimumSpacing
              <> Typo.noMargins
              <> Typo.allCaps
              <> Typo.fontSizeSmall
              <> Typo.thin
              <> E.css { color: E.str $ colour.textPaler }
          }
        /> [ R.text "16th May 2021" ]
