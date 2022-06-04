module Yoga.Block.Layout.Sidebar.Style where

import Yoga.Prelude.Style

import Data.Interpolate (i)

data SidebarSide
  = SidebarLeft
  | SidebarRight

derive instance eqSidebarSide :: Eq SidebarSide

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , space ∷ f String
  , side ∷ f SidebarSide
  , sideWidth ∷ f String
  , contentMin ∷ f String
  , noStretch ∷ f Boolean
  , reverseOnWrap ∷ f Boolean
  | r
  )

sidebar ∷ ∀ p. { | Props OptionalProp p } -> Style
sidebar props = styles <>? props.css
  where
  adjustedSpace = props.space <#> \s -> if s == "0" then "0px" else s

  space = adjustedSpace ?|| "1rem"

  side = props.side ?|| SidebarLeft

  contentMin = props.contentMin ?|| "50%"

  nonSidebarStyle =
    nest
      { flexBasis: _0
      , flexGrow: "999" # str
      , minWidth: i "calc(" contentMin " - " space " - " space ")" # str
      }

  styles =
    css
      { overflow: hidden
      , "& > *":
          nest
            { display: flex
            , flexWrap: if props.reverseOnWrap # isTruthy then str "wrap-reverse" else wrap
            , margin: "calc(" <> space <> " / 2 * -1)" # str
            , alignItems: props.noStretch # foldMap if _ then str "flex-start" else mempty
            }
      , "& > * > *":
          nest
            { margin: "calc(" <> space <> " / 2)" # str
            , flexGrow: "1" # str
            , flexBasis: props.sideWidth # foldMap str
            }
            <> foldMap (nest <<< { flexBasis: _ } <<< str) props.sideWidth
      }
      <> case side of
        SidebarLeft -> css { "& > * > :last-child": nonSidebarStyle }
        SidebarRight -> css { "& > * > :first-child": nonSidebarStyle }
