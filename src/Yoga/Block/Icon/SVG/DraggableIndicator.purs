module Yoga.Block.Icon.SVG.DraggableIndicator where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

draggableIndicator ∷ JSX
draggableIndicator =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "2"
    , children:
        [ SVG.path
            { d:
                "M12.582 55h74.836c2.76 0 5-2.24 5-5s-2.24-5-5-5H12.582c-2.76 0-5 2.24-5 5s2.24 5 5 5zM12.582 38.019h74.836c2.76 0 5-2.24 5-5s-2.24-5-5-5H12.582c-2.76 0-5 2.24-5 5s2.24 5 5 5zM12.582 71.981h74.836c2.76 0 5-2.24 5-5s-2.24-5-5-5H12.582c-2.76 0-5 2.24-5 5s2.24 5 5 5z"
            , fill: "var(--stroke-colour)"
            }
        ]
    }
