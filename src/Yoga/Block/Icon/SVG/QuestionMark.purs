module Yoga.Block.Icon.SVG.QuestionMark where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

questionMark :: JSX
questionMark = SVG.svg
     { viewBox: "0 0 100 100"
     , xmlns: "http://www.w3.org/2000/svg"
     , fillRule: "evenodd"
     , clipRule: "evenodd"
     , strokeLinejoin: "round"
     , strokeMiterlimit: "2"
     , children: 
     [ SVG.path
       { fill: "none"
       , d: "M0 0h100v100H0z"
       }
     , SVG.path
       { d: "M50 10.037c22.056 0 39.963 17.907 39.963 39.963S72.056 89.963 50 89.963 10.037 72.056 10.037 50 27.944 10.037 50 10.037zM48.871 77.03c2.87 0 5.326-2.384 5.351-5.351-.025-2.918-2.481-5.301-5.351-5.301-2.967 0-5.374 2.383-5.35 5.301-.024 2.967 2.383 5.351 5.35 5.351zm-4.255-15.176h8.098v-.632c.049-5.156 1.727-7.515 5.691-9.947 4.474-2.675 7.271-6.323 7.271-11.892 0-8.22-6.396-13.375-15.686-13.375-8.512 0-15.418 4.718-15.661 13.959h8.657c.219-4.572 3.526-6.761 6.955-6.761 3.721 0 6.713 2.481 6.713 6.299 0 3.405-2.262 5.739-5.205 7.587-4.304 2.676-6.785 5.375-6.833 14.13v.632z"
       , fill: "#333"
       }
     ]
     }