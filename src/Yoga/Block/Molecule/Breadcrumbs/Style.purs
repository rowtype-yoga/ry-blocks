module Yoga.Block.Molecule.Breadcrumbs.Style where

import Yoga.Prelude.Style

type Props ∷ ∀ k. (Type → k) → Row k → Row k
type Props f r =
  ( background ∷ f StyleProperty
  | r
  )

container = pR (-26)
  <> width' (str "100%")
  <> flexRow
  <> justifyStart
  <> overflowXHidden
  <> overflowYHidden

breadcrumbContainerWrapper ∷ Style
breadcrumbContainerWrapper = flexRow
  <> justifyStart
  <> css { overflowX: str "visible" }
  <> css { borderRadius: str "9px" }
  <> border 1
  <> borderSolid
  <> borderCol' col.backgroundBright6

breadcrumbContainer ∷ Style
breadcrumbContainer =
  flexRow
    <> css
      { overflowX: str "visible"
      , flexBasis: str "auto"
      , flexDirection: str "row-reverse"
      , "& > a:last-of-type": nested
          ( pL 12 <> mL 0 <> css
              { borderTopLeftRadius: str "8px"
              , borderBottomLeftRadius: str "8px"
              }
          )
      , "& > a:first-of-type": nested
          ( css { "&:after": nested $ css { content: none } }
              <> pR 12
              <> mR 0
              <> css
                { borderRadius: str "8px"
                , "--bg": col.backgroundLayer5
                , color: col.text
                }
          )
      }

dots ∷ Style
dots = widthAndHeight 22 <> textCol' col.textPaler2

baseLink =
  css { whiteSpace: str "nowrap" }
    <> textCol' col.textPaler1
    <> textSm
    <> fontNormal
    <> css { textDecoration: none }

popoverLink = baseLink <> background' col.backgroundLayer3
  <> pX' sizeStyle.m
  <> pY' sizeStyle.xs

link ∷ Style
link = baseLink <> pL 30
  <> pY 3
  <> height 28
  <> positionRelative
  <> mR 18
  <> mL (-26)
  <> css
    { "--bg": col.backgroundBright2
    , borderRight: str "1px solid var(--bg)"
    , background: var "--bg"
    , "&:after": nested arrow

    }
  <> hover
    (css { "--bg": col.backgroundBright4 })

arrow ∷ Style
arrow =
  ( css
      { content: str "''"
      , border: str $ "1px solid " <> colour.backgroundBright6
      , position: str "absolute"
      , background: var "--bg"
      , top: str "3px"
      , right: str "-11px"
      , borderRadius: str "0 3px 0 0"
      , clipPath: str "polygon(0 0, 100% 0, 100% 100%)"
      , transform: str "rotate(45deg)"
      }
      <> widthAndHeight 22
      <> ignoreClicks
  )

popover ∷ Style
popover =
  background' col.backgroundLayer3
    <> roundedLg
    <> overflowHidden
    <> textCol' col.text
    <> mXY 2
    <> pY' sizeStyle.xs
