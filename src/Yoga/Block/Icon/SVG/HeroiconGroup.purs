module Yoga.Block.Icon.SVG.HeroiconGroup where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

heroiconGroup :: JSX
heroiconGroup = SVG.svg
     { xmlns: "http://www.w3.org/2000/svg"
     , className:"h-6 w-6"
     , fill: "none"
     , viewBox: "0 0 24 24"
     , stroke: "currentColor"
     , children: 
     [ SVG.path
       { strokeLinecap: "round"
       , strokeLinejoin: "round"
       , strokeWidth: "2"
       , d: "M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
       }
     ]
     }