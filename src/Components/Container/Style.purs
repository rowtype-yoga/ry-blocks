module Components.Container.Style where

import Prelude.Style

global ∷ Style
global =
  css
    { "body, html":
      nested
        $ css
            { minHeight: 100.0 # vh
            , minWidth: 100.0 # vw
            }
    , html:
      nested
        $ css
            { boxSizing: str "border-box"
            }
    , body:
      nested
        $ css
            { fontFamily: str "system-ui, sans-serif"
            , color: str "#f7f7f0"
            , background: str "linear-gradient(to bottom right, #10354a, #002334)"
            , margin: str "0"
            }
    , h1:
      nested
        $ css
            { fontSize: em 3.5
            , fontWeight: str "black"
            }
    , h2:
      nested
        $ css
            { fontSize: em 2.7
            , fontWeight: str "black"
            }
    , "*, *:before, *:after":
      nested
        $ css
            { boxSizing: str "inherit"
            }
    }
