module Yoga.Block.Layout.Story (default, layout) where

import Prelude
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion (nested)
import React.Basic.Emotion as E
import Yoga ((/>), (</*), (</*>))
import Yoga.Block as Block
import Yoga.Block.Container.Style (colour, size)
import Yoga.Block.Container.Style as Styles
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
    Block.box
      { padding: E.str $ size.l <> " " <> size.l <> " " <> size.xl
      , className: "post-preview"
      , css: boxCss
      }
      [ Block.stack { space: E.str size.s }
          [ Block.stack { space: E.str size.m }
              [ Block.sidebar { sidebar: avatar, contentMin: "25ch", space: size.l }
                  [ postTitle ]
              , Block.cluster { justify: "space-between", space: size.m }
                  [ postAuthor, postDate ]
              ]
          , hr
          , preview
          ]
      ]
    where
    hr =
      R.hr'
        </*> { className: "hr"
          , css:
            E.css
              { backgroundColor: E.str $ colour.textInvertedPaler3
              , height: E.px 1
              , border: E.none
              }
          }

    preview =
      R.p'
        </* { className: "post-preview-text"
          , css:
            Typo.fontSizeSmall
              <> E.css
                  { margin: E.str "0"
                  , lineHeight: E.str "1.6"
                  , color: E.str colour.textPaler2
                  }
          }
        /> [ R.text "When I was a young girl wrestling with 'undefined' not being a function my mother used to come up to me and say: 'Use PureScript'. Now, a mere twenty years later..." ]

    boxCss =
      Typo.fontSizeSmall
        <> E.css
            { background: E.str $ colour.backgroundLayer3
            , borderRadius: E.str size.l
            , maxWidth: E.ch 60.0
            , paddingBottom: E.str size.xl
            }

    avatar =
      Block.centre { css: E.css { width: E.str $ size.xxl } }
        [ R.div'
            </* { className: "profile-picture-container"
              , css:
                E.css
                  { width: E.str $ size.xxl
                  , padding: E.str "0"
                  , margin: E.str "0"
                  , height: E.str size.xxl
                  , overflow: E.str "hidden"
                  , borderRadius: E.percent 50.0
                  , border: E.str $ size.xxs <> " solid " <> colour.highlight
                  , userSelect: E.none
                  }
              }
            /> [ R.img'
                  </*> { alt: "Profile Picture"
                    , src: "https://source.unsplash.com/z_8Jqe0Cc-s/360x200"
                    , className: "profile-picture"
                    , css:
                      E.css
                        { objectFit: E.str "cover"
                        , width: E.str $ size.xxl
                        , height: E.str $ size.xxl
                        , boxSizing: E.borderBox
                        , objectPosition: E.str "center right"
                        , transform: E.str "scaleX(-1)"
                        }
                    }
              ]
        ]

    postTitle =
      Block.cover_ [ 
        R.h2'
              </* { className: "title"
                , css:
                  Typo.fontSizeH3
                    <> E.css { color: E.str colour.textPaler2 }
                }
              /> [ R.text "How not to properly React" ]]

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
                  , color: E.str colour.textPaler3
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
              <> Typo.rightAlign
              <> E.css { color: E.str $ colour.textPaler3 }
          }
        /> [ R.text "16th May 2021" ]
