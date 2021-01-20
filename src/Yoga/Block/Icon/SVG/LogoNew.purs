module Yoga.Block.Icon.SVG.LogoNew where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

logoNew :: JSX
logoNew = SVG.svg
     { viewBox: "0 0 101 100"
     , xmlns: "http://www.w3.org/2000/svg"
     , fillRule: "evenodd"
     , clipRule: "evenodd"
     , strokeLinejoin: "round"
     , strokeMiterlimit: "2"
     , children: 
     [ SVG.path
       { fill: "none"
       , d: "M0 0h100.04v99.973H0z"
       }
     , SVG.circle
       { cx: "50.251"
       , cy: "49.91"
       , r: "46.575"
       , fill: "#1b003a"
       }
     , SVG.path
       { fill: "#aaffef"
       , d: "M6.055 10.556h9.702V89.88H6.055z"
       }
     , SVG.path
       { d: "M15.601 10.556l3.221 10.638c-.093 19.349-.065 38.698 0 58.047l-3.221 10.638V10.556z"
       , fill: "#f477b9"
       }
     , SVG.path
       { d: "M61.746 48.656l5.82 11.896v14.712l3.115 5.908h8.96l-3.115-20.62 19.4-39.812-6.624-1.897-3.115 1.897-14.18 28.671-14.18-28.671h-9.738l.007.016a44.369 44.369 0 00-4.52-.212l-16.051-1.897-3.115 5.249v52.992l3.115 4.284h8.96l-3.39-24.528 2.511-2.614 17.391 24.733 6.004 2.213h10.362L45.915 54.647c7.178-.707 14.007-.214 15.831-5.991zm-18.17-19.854c8.259 0 10.362 2.26 10.362 10.44 0 9.194-2.103 10.44-10.362 10.44H33.37v-20.88h10.206z"
       , fill: "#f477b9"
       , fillRule: "nonzero"
       }
     , SVG.path
       { d: "M64.861 46.759l5.82 11.897v22.516h8.96V58.656L99.04 18.843h-9.738l-14.18 28.672-14.18-28.672s-12.628-.196-14.251-.196H27.525v62.329h8.96V56.044h4.986l17.53 24.932h10.362L51.755 55.81c7.178-.706 11.282-3.273 13.106-9.051zm-18.17-19.853c8.258 0 10.362 2.259 10.362 10.44 0 9.193-2.104 10.44-10.362 10.44H36.485v-20.88h10.206z"
       , fill: "#aaffef"
       , fillRule: "nonzero"
       }
     ]
     }