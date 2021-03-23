module Yoga.Block.Icon.SVG.Bin where

import React.Basic (JSX)
import React.Basic.DOM.SVG as SVG

bin ∷ JSX
bin =
  SVG.svg
    { viewBox: "0 0 100 100"
    , xmlns: "http://www.w3.org/2000/svg"
    , fillRule: "evenodd"
    , clipRule: "evenodd"
    , strokeLinejoin: "round"
    , strokeMiterlimit: "2"
    , children:
      [ SVG.g
          { fill: "var(--stroke-colour)"
          , children:
            [ SVG.path
                { d: "M38.488 9.364C40.623 5.175 44.979 2.303 50 2.303c5.021 0 9.377 2.872 11.512 7.061 11.679 1.276 19.955 4.435 19.955 8.127l1.258 4.867c.204.392.31.793.31 1.2 0 4.819-14.803 8.731-33.035 8.731-18.232 0-33.035-3.912-33.035-8.731 0-.407.106-.808.31-1.2l1.258-4.867c0-3.692 8.276-6.851 19.955-8.127zm18.743-.372A111.616 111.616 0 0050 8.76c-2.489 0-4.91.081-7.231.232A9.523 9.523 0 0150 5.674a9.523 9.523 0 017.231 3.318z"
                }
            , SVG.path
                { d: "M80.438 30.325l-7.057 58.81c0 4.725-10.477 8.562-23.381 8.562s-23.381-3.837-23.381-8.562l-7.057-58.81C24.581 33.459 36.326 35.66 50 35.66s25.419-2.201 30.438-5.335z"
                }
            ]
          }
      ]
    }
