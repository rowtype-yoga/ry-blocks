module Yoga.Block.Icon.SVG.Moon where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

moon ∷ JSX
moon =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "1.5"
    , children:
        [ SVG.path
            { d:
                "M53.984 14.646c1.707.195 3.42.519 5.128.977 18.733 5.019 29.867 24.303 24.847 43.036-5.019 18.732-24.303 29.866-43.036 24.846-13.577-3.638-23.163-14.769-25.499-27.753a28.518 28.518 0 008.408 3.788c15.237 4.082 30.921-4.973 35.004-20.21 2.376-8.867.302-17.887-4.852-24.684z"
            , fill: "var(--stroke-colour)"
            }
        ]
    }
