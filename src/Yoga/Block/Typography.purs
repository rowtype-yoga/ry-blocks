module Yoga.Block.Typography where

import Yoga.Prelude.Style
import Yoga.Block.Container.Style (size)

minimumSpacing ∷ Style
minimumSpacing = css { lineHeight: str "1.0" }

normalSpacing ∷ Style
normalSpacing = css { lineHeight: str "1.4" }

doubleSpacing ∷ Style
doubleSpacing = css { lineHeight: str "2" }

resetTextTransform ∷ Style
resetTextTransform = css { textTransform: none }

allCaps ∷ Style
allCaps = css { textTransform: str "uppercase" }

italic ∷ Style
italic = css { fontStyle: str "italic" }

black ∷ Style
black = css { fontWeight: str "800" }

bold ∷ Style
bold = css { fontWeight: str "700" }

regular ∷ Style
regular = css { fontWeight: str "500" }

semiBold ∷ Style
semiBold = css { fontWeight: str "600" }

thin ∷ Style
thin = css { fontWeight: str "400" }

unselectable ∷ Style
unselectable = css { userSelect: none }

noMargins ∷ Style
noMargins = css { margin: _0 }

noPadding ∷ Style
noPadding = css { padding: _0 }

-- Ellipsis
-- [FIXME]: Buggy (still shows a third line, does not seem to hide overflow)
maxLines ∷ Int -> Style
maxLines n =
  css
    { overflow: hidden
    , textOverflow: ellipsis
    , display: str "-webkit-box" -- [TODO]: Necessary?
    , "Webkit-box-orient": str "vertical" -- [TODO]: Necessary?
    , "Webkit-line-clamp": str (show n)
    }

-- Font Sizes
fontSizeCopy ∷ Style
fontSizeCopy = css { fontSize: str size.text.copy }

fontSizeH1 ∷ Style
fontSizeH1 =
  css
    { fontSize: str size.text.heading.h1
    , paddingTop: str size.s
    , marginTop: str $ "calc(" <> size.s <> " * -1)"
    }

fontSizeH2 ∷ Style
fontSizeH2 =
  css
    { fontSize: str size.text.heading.h2
    , letterSpacing: str $ "calc(" <> size.text.heading.h2 <> " * -0.035)"
    }

fontSizeH3 ∷ Style
fontSizeH3 = css { fontSize: str size.text.heading.h3, marginTop: _0, marginBottom: _0 }

fontSizeH4 ∷ Style
fontSizeH4 = css { fontSize: str size.text.heading.h4 }

fontSizeH5 ∷ Style
fontSizeH5 = css { fontSize: str size.text.copy }

fontSizeSmall ∷ Style
fontSizeSmall = css { fontSize: str size.text.small }
