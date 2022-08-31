module Plumage.Atom.InfiniteLoadingBar where

import Plumage.Prelude.Style

import Data.Array ((..))
import Network.RemoteData (RemoteData)
import Network.RemoteData as RemoteData
import Fahrtwind.Style as TW
import Plumage.Util.HTML as H
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks as React
import Yoga ((/>), (</*))

mkKittLoadingBar ∷
  ∀ e a. React.Component { numberOfLights ∷ Int, remoteData ∷ RemoteData e a }
mkKittLoadingBar =
  React.component "KittLoadingBar" \props → React.do
    let { numberOfLights: number, remoteData: rd } = props
    pure $
      H.div_
        ( flexRow
            <> gap 4
            <> E.css { alignSelf: E.center }
            <> boxSizingContentBox
        )
        ( (1 .. number)
            <#> \i →
              R.div'
                </*
                  { key: show i
                  , style: R.css
                      { animationDelay: show (number * (-50) + i * 50) <>
                          "ms"
                      }
                  , css: baseStyle number <> dynamicStyle number rd i
                  }
                /> []
        )
  where
  dynamicStyle number rd i = case rd of
    RemoteData.NotAsked → notAskedStyle
    RemoteData.Loading → loadingStyle case i of
      x | x < (number - 3) → TW.violet
      _ → TW.violet
    RemoteData.Failure _ → errorStyle
    RemoteData.Success _ → successStyle

  loadingStyle col = E.css { animationName: glowAnimation col }

  baseStyle number =
    ( width 12
        <> height 4
        <> boxSizingContentBox
        <> background (violet._400 # desaturate 0.8)
        <> E.css
          { borderRadius: E.str "14%"
          , animation: E.str "x 1s infinite ease-in-out"
          , animationFillMode: E.str "alternate"
          , animationDuration: E.str $ show (number * 50 * 2) <> "ms"
          }
    )

  notAskedStyle = background TW.warmGray._300
  errorStyle = background TW.red._400
  successStyle =
    E.css
      { boxShadow:
          E.str
            ("0 0 2px " <> cssStringRGBA (TW.gray._300 # withAlpha 0.6))
      }

  glowAnimation col =
    E.keyframes
      { from:
          background (col._400 # desaturate 0.8)
            <> E.css
              { boxShadow:
                  E.str
                    ( "0 0 1px " <> cssStringRGBA
                        (col._200 # withAlpha 0.0)
                    )
              }
      , to:
          background col._500
            <> E.css
              { boxShadow:
                  E.str
                    ( "0 0 5px " <> cssStringRGBA
                        (col._400 # withAlpha 0.33)
                    )
              }
      }
