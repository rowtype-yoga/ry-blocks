module Yoga.Block.Layout.Sidebar.Style where

import Yoga.Prelude.Style

data SidebarSide
  = SidebarLeft
  | SidebarRight

type Props f r =
  ( css ∷ f Style
  , space ∷ f String
  , side ∷ f SidebarSide
  , sideWidth ∷ f String
  , contentMin ∷ f String
  , noStretch ∷ f Boolean
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
      , minWidth: "calc(" <> contentMin <> " - " <> space <> ")" # str
      }

  styles =
    css
      { overflow: hidden
      , "& > *":
        nest
          { display: flex
          , flexWrap: wrap
          , margin: "calc(" <> space <> "/2 * -1)" # str
          , alignItems: props.noStretch # ifTrue "flex-start" "" # str
          }
      , "& > * > *":
        nest
          { margin: "calc(" <> space <> "/2)" # str
          , flexGrow: "1" # str
          , flexBasis: props.sideWidth # foldMap str
          }
          <> foldMap (nest <<< { flexBasis: _ } <<< str) props.sideWidth
      }
      <> case side of
          SidebarLeft -> css { "& > * > :last-child": nonSidebarStyle }
          SidebarRight -> css { "& > * > :first-child": nonSidebarStyle }
