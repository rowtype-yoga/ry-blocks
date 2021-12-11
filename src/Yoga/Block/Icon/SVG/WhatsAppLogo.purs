module Yoga.Block.Icon.SVG.WhatsAppLogo where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

whatsAppLogo :: JSX
whatsAppLogo = SVG.svg
     { viewBox: "0 0 1281 1067"
     , xmlns: "http://www.w3.org/2000/svg"
     , xmlSpace: "preserve"
     , style: R.css { fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2" }
     , children: 
     [ SVG.path
       { d: "m0 287.286 6.333 3.754c26.611 15.791 57.12 24.143 88.231 24.16h.068c95.544 0 173.307-77.745 173.348-173.297.014-46.307-17.997-89.849-50.727-122.603-32.732-32.753-76.251-50.802-122.556-50.821-95.62 0-173.381 77.734-173.419 173.283-.013 32.743 9.148 64.631 26.502 92.224l4.126 6.555-17.517 63.947L0 287.286zm-115.686 66.737 29.589-108.039c-18.25-31.619-27.852-67.489-27.838-104.236.046-114.958 93.603-208.485 208.567-208.485 55.789.024 108.153 21.738 147.533 61.145 39.374 39.41 61.05 91.795 61.031 147.509-.049 114.952-93.619 208.496-208.564 208.496-.008 0 .005 0 0 0h-.09c-34.903-.014-69.202-8.768-99.664-25.381l-110.564 28.991z"
       , style: R.css { fill: "#fff", fillRule: "nonzero" }
       , transform: "translate(546.49 392.227)"
       }
     , SVG.path
       { d: "M.505.494A.488.488 0 0 1 .257.427L0 .498.069.235a.496.496 0 1 1 .436.259zM.009-.002zm0 0z"
       , style: R.css { fill: "url(#a)", fillRule: "nonzero" }
       , transform: "matrix(0 -406.194 -406.194 0 640.266 738.97)"
       }
     , SVG.path
       { d: "M.505.494A.488.488 0 0 1 .257.427L0 .498.069.235a.496.496 0 1 1 .436.259zM.27.337l.015.01a.412.412 0 1 0-.193-.349c0 .074.02.147.058.21l.009.015-.041.156L.27.337zM.009-.002zm0 0z"
       , style: R.css { fill: "url(#b)", fillRule: "nonzero" }
       , transform: "matrix(0 -420.76 -420.76 0 640.264 746.25)"
       }
     , SVG.path
       { d: "M0-181.636c-3.904-8.678-8.013-8.852-11.727-9.004-3.037-.13-6.515-.122-9.987-.122-3.474 0-9.121 1.305-13.895 6.52-4.778 5.215-18.242 17.821-18.242 43.46 0 25.642 18.676 50.417 21.279 53.897 2.606 3.475 36.052 57.771 89.021 78.66 44.022 17.359 52.98 13.906 62.535 13.038 9.555-.869 30.832-12.604 35.175-24.773 4.343-12.167 4.343-22.596 3.04-24.776-1.303-2.172-4.777-3.475-9.989-6.081-5.212-2.606-30.832-15.215-35.61-16.952-4.777-1.737-8.252-2.606-11.726 2.611-3.475 5.212-13.456 16.947-16.497 20.422-3.04 3.483-6.08 3.917-11.292 1.311-5.212-2.614-21.996-8.111-41.907-25.864-15.492-13.812-25.951-30.87-28.992-36.087-3.04-5.212-.325-8.035 2.289-10.633 2.34-2.335 5.212-6.083 7.818-9.126 2.6-3.043 3.469-5.215 5.206-8.69 1.737-3.48.869-6.523-.434-9.129S4.634-171.332 0-181.636"
       , style: R.css { fill: "#fff" }
       , transform: "translate(588.995 628.453)"
       }
     , SVG.defs
       { children: 
       [ SVG.linearGradient
         { id: "a"
         , x1: "0"
         , y1: "0"
         , x2: "1"
         , y2: "0"
         , gradientUnits: "userSpaceOnUse"
         , gradientTransform: "scale(1 -1)"
         , children: 
         [ SVG.stop
           { offset: "0"
           , style: R.css { stopColor: "#20b038", stopOpacity: "1" }
           }
         , SVG.stop
           { offset: "1"
           , style: R.css { stopColor: "#60d66a", stopOpacity: "1" }
           }
         ]
         }
       , SVG.linearGradient
         { id: "b"
         , x1: "0"
         , y1: "0"
         , x2: "1"
         , y2: "0"
         , gradientUnits: "userSpaceOnUse"
         , gradientTransform: "scale(1 -1)"
         , children: 
         [ SVG.stop
           { offset: "0"
           , style: R.css { stopColor: "#f9f9f9", stopOpacity: "1" }
           }
         , SVG.stop
           { offset: "1"
           , style: R.css { stopColor: "white", stopOpacity: "1" }
           }
         ]
         }
       ]
       }
     ]
     }