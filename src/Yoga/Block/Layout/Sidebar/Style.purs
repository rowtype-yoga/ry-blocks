module Yoga.Block.Layout.Sidebar.Style where

import Yoga.Prelude.Style

import Data.Interpolate (i)

data SidebarSide
  = SidebarLeft
  | SidebarRight

derive instance Eq SidebarSide

type Props :: forall k. (Type -> k) -> Row k -> Row k
type Props f r =
  ( css ∷ f Style
  , sideBarCss :: f Style
  , space ∷ f String
  , side ∷ f SidebarSide
  , sideWidth ∷ f String
  , contentMin ∷ f String
  , noStretch ∷ f Boolean
  , reverseOnWrap ∷ f Boolean
  | r
  )

sidebarContainer ∷ ∀ p. { | Props OptionalProp p } -> Style
sidebarContainer props = styles <>? props.css
  where
  adjustedSpace = props.space <#> \s -> if s == "0" then "0px" else s
  space = adjustedSpace ?|| "1rem"
  styles =
    css
      { display: str "flex"
      , flexWrap: wrap
      , gap: str space
      }

sidebar ∷ Style
sidebar = css { flexBasis: 20.0 # rem, flexGrow: int 1 }

notSidebar ∷ ∀ p. { | Props OptionalProp p } -> Style
notSidebar props = css
  { flexBasis: int 0
  , flexGrow: int 999
  , minInlineSize: str contentMin
  }
  where
  contentMin = props.contentMin ?|| "50%"
