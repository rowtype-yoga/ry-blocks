module Yoga.Block.Icon.SVG.After where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

after :: JSX
after = SVG.svg
     { viewBox: "0 0 64 44"
     , xmlns: "http://www.w3.org/2000/svg"
     , xmlSpace: "preserve"
     , style: R.css { fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2" }
     , children: 
     [ SVG.path
       { d: "M22.2 30.776h19.6v4.17H22.2zM22.2 19.904h19.6v4.17H22.2zM22.2 9.031h19.6v4.172H22.2zM18.2 9.203 6.943 20.46A2.155 2.155 0 0 0 6.308 22c-.001.576.228 1.13.635 1.539L18.2 34.797v-6.162l-6.638-6.644 6.638-6.632V9.203zM45.8 9.203 57.058 20.46c.409.408.639.962.635 1.54a2.178 2.178 0 0 1-.636 1.539L45.8 34.797v-6.162l6.639-6.644-6.639-6.632V9.203z"
       }
     ]
     }