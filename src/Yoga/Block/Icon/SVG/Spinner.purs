module Yoga.Block.Icon.SVG.Spinner where

import React.Basic (JSX)
import React.Basic.DOM as R
import React.Basic.DOM.SVG as SVG

spinner ∷ JSX
spinner = SVG.svg
  { xmlns: "http://www.w3.org/2000/svg"
  , viewBox: "38 38 24 24"
  , preserveAspectRatio: "xMidYMid"
  , children:
      [ SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.8888888888888888s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(40 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.7777777777777778s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(80 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.6666666666666666s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(120 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.5555555555555556s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(160 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.4444444444444444s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(200 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.3333333333333333s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(240 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.2222222222222222s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(280 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "-0.1111111111111111s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      , SVG.rect
          { x: "48.5"
          , y: "38.5"
          , rx: "0"
          , ry: "0"
          , width: "3"
          , height: "7"
          , fill: "currentColor"
          , transform: "rotate(320 50 50)"
          , children:
              [ SVG.animate
                  { attributeName: "opacity"
                  , values: "1;0"
                  , keyTimes: "0;1"
                  , dur: "1s"
                  , begin: "0s"
                  , repeatCount: "indefinite"
                  }
              ]
          }
      ]
  }