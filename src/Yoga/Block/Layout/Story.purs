module Yoga.Block.Layout.Story (default, layout) where

import Prelude

import Data.Interpolate (i)
import Effect (Effect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM as R
import React.Basic.Emotion (nested)
import React.Basic.Emotion as E
import React.Basic.Hooks (Component, component)
import Yoga ((/>), (</*), (</*>))
import Yoga.Block as Block
import Yoga.Block.Container.Style (boxShadow, colour, size)
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Internal.CSS (nest)
import Yoga.Block.Layout.Sidebar.Style (SidebarSide(..))
import Yoga.Block.Typography as Typo
import Storybook

default ∷ Meta
default = meta
  { title: "Layout"
  , decorators:
      [ metaDecorator $ \story -> do
          R.div_
            [ element E.global { styles: Styles.global }
            , story
            ]
      ]
  }

layout ∷ Effect JSX
layout = do
  postPreview <- mkPostPreview
  let
    post1 =
      postPreview
        { title: "Some Post"
        , date: "16th May 2021"
        , author: "Someone W. Knowles"
        , image: "https://source.unsplash.com/3ujVzg9i2EI/105x130"
        , previewText: "When I was a young girl wrestling with 'undefined' not being a function my mother used to come up to me and say: 'Use PureScript'. Now, a mere twenty years later..."
        }
    post2 =
      postPreview
        { title: "The Big Beat Manifesto"
        , date: "2nd May 2008"
        , author: "Simon S. Hans"
        , image: "https://metro.co.uk/wp-content/uploads/2016/03/super-hans-006.jpg?quality=90&strip=all&zoom=1&resize=644%2C386"
        , previewText: "Have you read the Big Beat Manifesto lately? The Big Beat Manifesto goes \"Big Beats are the best, Get high all the time\"."
        }
    post3 =
      postPreview
        { title: "Here's my pitch: New management consultancy"
        , date: "9th Oct. 2009"
        , author: "Alan Johnson"
        , image: "https://preview.redd.it/3wsbjepf9yt11.png?width=960&crop=smart&auto=webp&s=d9989616ba615464b0a4a9e060250f8858c8a1f9"
        , previewText: "In. Fire 30% of the workforce.  New logo. Boom! Out!  You are now a fully trained management consultant."
        }
  pure
    $ fragment
        [ R.div_
            [ R.h1_ [ R.text "Some Layout combinations" ]
            , R.h2_ [ R.text "A Post Preview" ]
            , Block.grid { min: "30ch" }
                [ post1
                , post2
                , post3
                , post2
                , post1
                ]
            ]
        ]

mkPostPreview :: Component { title :: String, date :: String, author :: String, image :: String, previewText :: String }
mkPostPreview = do
  component "PostPreview" \{ title, date, author, previewText, image } -> React.do
    pure $
      Block.box
        { padding: E.str $ size.l <> " " <> size.l <> " " <> size.xl
        , className: "post-preview"
        , css: boxCss
        }
        [ Block.stack { space: E.str size.s, splitAfter: 2 }
            [ Block.stack { space: E.str size.m }
                [ Block.sidebar { sidebar: avatar image, side: SidebarRight, reverseOnWrap: true, contentMin: "30ch", space: size.l }
                    [ postTitle title ]
                , Block.cluster { justify: "space-between", space: size.m }
                    [ postDate date, postAuthor author ]
                ]
            , hr
            , preview previewText
            ]
        ]
  where
  hr =
    R.hr'
      </*>
        { className: "hr"
        , css:
            E.css
              { backgroundColor: E.str colour.textInvertedPaler3
              , height: E.px 1
              , border: E.none
              }
        }

  preview text =
    R.p'
      </*
        { className: "post-preview-text"
        , css:
            Typo.fontSizeCopy
              <> E.css
                { margin: E.str "0"
                , lineHeight: E.str "1.6"
                , color: E.str colour.textPaler2
                }
        }
      /> [ R.text text ]

  boxCss =
    Typo.fontSizeSmall
      <> E.css
        { background: E.str $ colour.backgroundLayer5
        , borderRadius: E.str size.m
        , borderColor: E.str colour.backgroundLayer5Border
        , borderWidth: E.str "1px"
        , maxWidth: E.ch 60.0
        , paddingBottom: E.str size.xl
        , boxShadow: E.str boxShadow.default
        , transition: E.str "450ms ease"
        , ":hover": nest
            { boxShadow: E.str boxShadow.xl
            , transform: E.str "translate(0, -2px) scale(1.02)"
            }
        }

  avatar image =
    Block.centre { css: E.css { width: E.str $ i "calc(" size.xxl " + " size.xxs " * 2)" } }
      [ R.div'
          </*
            { className: "profile-picture-container"
            , css:
                E.css
                  { width: E.str $ size.xxl
                  , padding: E.str "0"
                  , margin: E.str "0"
                  , height: E.str size.xxl
                  , overflow: E.str "hidden"
                  , borderRadius: E.percent 50.0
                  , border: E.str $ i size.xxs " solid " colour.textPaler3
                  , userSelect: E.none
                  }
            }
          />
            [ R.img'
                </*>
                  { alt: "Profile Picture"
                  , src: image
                  , className: "profile-picture"
                  , css:
                      E.css
                        { objectFit: E.str "cover"
                        , width: E.str $ size.xxl
                        , height: E.str $ size.xxl
                        , boxSizing: E.borderBox
                        , objectPosition: E.str "center top"
                        }
                  }
            ]
      ]

  postTitle title =
    Block.cover_
      [ R.h3'
          </*
            { className: "title"
            , css:
                Typo.fontSizeH3
                  <> E.css
                    { color: E.str colour.textPaler2
                    , fontWeight: E.str "500"
                    }
            }
          /> [ R.text title ]
      ]

  postAuthor author =
    R.h4'
      </*
        { className: "author"
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
      /> [ R.text author ]

  postDate date =
    R.h4'
      </*
        { className: "date"
        , css:
            Typo.minimumSpacing
              <> Typo.noMargins
              <> Typo.allCaps
              <> Typo.fontSizeSmall
              <> Typo.thin
              <> Typo.rightAlign
              <> E.css { color: E.str $ colour.textPaler3 }
        }
      /> [ R.text date ]
