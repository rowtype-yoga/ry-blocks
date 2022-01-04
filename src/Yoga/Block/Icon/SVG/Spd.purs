module Yoga.Block.Icon.SVG.Spd where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

spd :: JSX
spd = SVG.svg
     { viewBox: "0 0 1184 1184"
     , xmlns: "http://www.w3.org/2000/svg"
     , xmlSpace: "preserve"
     , style: R.css { fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2" }
     , children: 
     [ SVG.path
       { style: R.css { fill: "#ed1c24", fillRule: "nonzero" }
       , d: "M.346.347H283.81V283.81H.346z"
       , transform: "scale(4.16667)"
       }
     , SVG.path
       { d: "M92.653 175.291h38.716c22.255 0 28.062 16.116 28.062 28.852 0 17.125-7.125 29.783-29.155 29.783h-12.692v28.865H92.653v-87.5zm24.71 39.777h1.931c8.261 0 16.404.477 16.404-10.227 0-10.209-7.562-10.215-16.404-10.215h-1.931v20.442zM164.923 175.291h36.95c24.309 0 39.089 19.1 39.089 43.64 0 24.541-14.896 43.86-39.089 43.86h-36.95v-87.5zm25.073 67.497h2.709c13.544 0 23.689-7.974 23.689-23.857 0-13.346-8.872-22.876-23.458-22.876h-2.94v46.733zM72.959 199.508c-4.767-3.084-12.477-4.907-16.122-4.907-4.463 0-10.181 1.251-10.181 6.113 0 5.093 5.65 6.062 10.786 7.435 0 0 6.304 1.377 8.995 2.26C78.039 214.214 86.7 218.3 86.7 233.732c0 8.681-2.231 17.117-9.67 23.021-7.314 5.788-17.109 8.696-26.531 8.696-11.777 0-23.466-2.855-33.33-10.909l10.891-18.29c6.075 4.978 13.265 9.506 21.572 9.506 5.702 0 11.3-1.708 11.3-7.844 0-6.366-9.054-6.712-14.276-8.047-11.268-2.879-25.291-6.664-25.291-27.04 0-17.711 13.513-29.287 32.234-29.287 9.422 0 21.427 4.328 29.734 8.727l-10.374 17.243z"
       , style: R.css { fill: "#fff", fillRule: "nonzero" }
       , transform: "scale(4.16667)"
       }
     ]
     }