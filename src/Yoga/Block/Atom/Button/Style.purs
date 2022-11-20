module Yoga.Block.Atom.Button.Style where

import Yoga.Prelude.Style

import Data.Interpolate (i)
import Unsafe.Coerce (unsafeCoerce)

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , width :: f StyleProperty
  , backgroundCol :: f StyleProperty
  , borderCol :: f StyleProperty
  , textCol :: f StyleProperty
  , hoverBackgroundCol :: f StyleProperty
  | r
  )

gradientBackground ∷ StyleProperty
gradientBackground =
  str
    $ i "linear-gradient(0deg,"
        colour.highlightDarker
        ","
        colour.highlightLighter
        ")"
        ","
        "linear-gradient(225deg,"
        colour.highlightRotatedBackwards
        ","
        colour.highlightRotatedForwards
        ")"

backgroundAnimation ∷ StyleProperty
backgroundAnimation =
  keyframes
    $
      { "from": css { backgroundPosition: str "0% 50%" }
      , "to": css { backgroundPosition: str "100% 50%" }
      }

varOr :: String -> StyleProperty -> StyleProperty
varOr varName alternative = str $ "var(" <> varName <> ", " <> unsafeCoerce alternative <> ")"

style
  :: { background :: String
     , borderCol :: String
     , hoverBackgroundCol :: String
     , textCol :: String
     , width :: String
     }
style =
  { background: prefix <> "background"
  , textCol: prefix <> "color"
  , borderCol: prefix <> "border-color"
  , width: prefix <> "width"
  , hoverBackgroundCol: prefix <> "hover-background-color"
  }
  where
  prefix = "--ry-button-"

button ∷ Style
button =
  inlineFlex
    <> cursorPointer
    <> css
      { background: varOr style.background (str colour.backgroundLayer5)
      , width: varOr style.width auto
      , borderWidth: int 0
      , position: relative
      , overflow: hidden
      , boxShadow: str "0 1px 4px rgba(100,100,120,0.3), 0 1px 2px rgba(100,100,100,0.2)"
      , padding: str "calc(var(--s-1) * 0.8) var(--s0)"
      , paddingBottom: str "calc(var(--s-1) * 0.8 + 1px)"
      , justifyContent: center
      , textAlign: str "start"
      , alignItems: center
      , borderRadius: var "--s-1"
      , color: varOr style.textCol (str colour.text)
      , touchAction: manipulation
      , boxSizing: borderBox
      , fontSize: str size.text.interactive
      , fontFamily: var "--mainFont"
      , fontWeight: str "500"
      , letterSpacing: str "calc(var(--s-5)* (-0.1))"
      , userSelect: none
      , transition: str "all 0.2s ease-out" <> str "transform 50ms ease-in"
      , "& > .ry-drip": nested (zIndex 0)
      , "& > :not(.ry-drip)": nested (zIndex 1)
      , """&[data-button-shape="flat"]""":
          nested
            $
              ( hover $ css
                  { background: varOr style.hoverBackgroundCol col.highlightAlpha10
                  }
              )
            <> css
              { background: varOr style.background (str "transparent")
              , boxShadow: none
              , color: varOr style.textCol (str colour.highlightTextOnBackground)
              , "&:active": nest { boxShadow: none }
              , """&[data-button-type="primary"]""":
                  nest
                    { background: str colour.highlight
                    , boxShadow: none
                    }
              }
      , """&[data-button-shape="pill"]""":
          nest
            { borderRadius: str "calc(var(--s1) * 0.85)"
            , padding: str "calc(var(--s-1) * 0.85) var(--s0)"
            , paddingBottom: str "calc(var(--s-1))"
            }
      , """&[data-button-type="primary"]""":
          nest
            { background: varOr style.background gradientBackground
            , backgroundSize: str "200% 200%"
            , fontWeight: str "500"
            , letterSpacing: str "calc(var(--s-5)* (0.1))"
            , animation: backgroundAnimation <> str " alternate ease-out 10s infinite"
            , boxShadow: str "0 1px 4px 0px rgba(0,0,0,0.40)"
            , borderColor: str "transparent"
            , color: varOr style.textCol (str colour.highlightText)
            , "&:focus-visible":
                nest { borderColor: col.background }
            , "&:active":
                nest { boxShadow: str "inset 0 1px 6px rgba(0,0,0,0.40)" }
            }
      , """&[data-button-type="dangerous"]""":
          nest
            { color: varOr style.textCol (str colour.interfaceDangerousText)
            , background: str $ colour.interfaceBackgroundDangerous
            , fontWeight: str "500"
            , letterSpacing: str "calc(var(--s-5) * -0.10)"
            }
      , "&:focus": nest { outline: none }
      , "&:focus-visible":
          nest
            { boxShadow: str $ "0 0 0 var(--s-4) " <> colour.highlight
            }
      , "&:active":
          nest
            { boxShadow: str $ "inset 0 1px calc(var(--s0) * var(--dark-mode) + var(--s-2) * var(--light-mode)) rgba(0,0,0, calc(0.18 * var(--dark-mode) + 0.09 * var(--light-mode)))"
            , transform: str "scale3d(0.98,0.98, 0.98)"
            , transition: str "transform 100ms ease"
            }
      , "&:disabled, &:disabled:active":
          nest
            { color: varOr style.textCol (str colour.interfaceTextDisabled)
            , boxShadow: none
            , background: str colour.interfaceBackgroundDisabled
            , transform: str "none"
            }
      }
