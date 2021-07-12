module Yoga.Block.Icon.SVG.Before where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

before :: JSX
before = SVG.svg
     { viewBox: "0 0 64 44"
     , xmlns: "http://www.w3.org/2000/svg"
     , xmlSpace: "preserve"
     , style: R.css { fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2" }
     , children: 
     [ SVG.path
       { style: R.css { fill: "none" }
       , d: "M0 0h64v64H0z"
       , transform: "scale(1 .67406)"
       }
     , SVG.path
       { d: "m17.894 17.332-2.95-2.952L4.003 25.32c-.392.391-.612.922-.608 1.476-.001.552.218 1.083.608 1.475l10.941 10.941 2.95-2.95-9.465-9.475 9.465-9.455zM39.571 29.936H19.96l4.467 4.171H44.04l-4.47-4.17zM59.994 14.87 49.058 3.927l-2.95 2.95 9.46 9.475-9.46 9.465 2.95 2.95L59.994 17.83c.394-.394.615-.93.611-1.488a2.076 2.076 0 0 0-.611-1.473zM19.959 23.655h19.612l4.467-4.17H24.424l-4.465 4.17zM39.571 9.031H19.96l4.465 4.172h19.612l-4.465-4.172z"
       }
     ]
     }