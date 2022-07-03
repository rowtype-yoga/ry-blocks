module Yoga.Block.Icon.SVG.Filter where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

filter :: JSX
filter = SVG.filter
     { id: "a"
     , height: "130%"
     , children: 
     [ SVG.feGaussianBlur
       { in: "SourceAlpha"
       , stdDeviation: "3"
       }
     , SVG.feOffset
       { dx: "2"
       , dy: "2"
       , result: "offsetblur"
       }
     , SVG.feComponentTransfer
       { children: 
       [ SVG.feFuncA
         { type: "linear"
         , slope: ".5"
         }
       ]
       }
     , SVG.feMerge
       { children: 
       [ SVG.feMergeNode
         { 
         }
       , SVG.feMergeNode
         { in: "SourceGraphic"
         }
       ]
       }
     ]
     }