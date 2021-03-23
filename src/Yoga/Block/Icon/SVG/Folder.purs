module Yoga.Block.Icon.SVG.Folder where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

folder ∷ JSX
folder =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "2"
    , children:
      [ SVG.path
          { d: "M56.073 25.246c-6.361 0-7.669-12.345-14.898-12.345L26.127 12.9c-13.082 0-23.703 10.62-23.703 23.702v37.405c0 13.082 10.621 23.702 23.703 23.702h47.404c13.082 0 23.703-10.62 23.703-23.702 0 0-.003-28.648-.01-41.806a6.727 6.727 0 00-6.635-6.565c-9.924-.142-28.155-.39-34.516-.39zm34.277 9.768H9.304v34.062c0 12.92 6.079 21.409 17.262 21.409h46.526c11.183 0 17.262-8.489 17.262-21.409 0 0-.001-20.917-.004-34.062z"
          , fill: "var(--stroke-colour)"
          }
      ]
    }
