module Components.Container.Story where

import Prelude
import Components.Cluster as Cluster
import Components.Container as Container
import Components.Container.Style (inputFocus)
import Components.Stack as Stack
import Effect (Effect)
import React.Basic (JSX, element)
import React.Basic.DOM as R
import React.Basic.Hooks (reactChildrenFromArray)
import Yoga (el, styled, styledLeaf)

default ∷ { title ∷ String }
default = { title: "Pages/Container" }

container ∷ Effect JSX
container =
  pure
    ( element Container.component
        { children:
          reactChildrenFromArray
            [ R.text "Content"
            , el Stack.component {}
                [ el Cluster.component {}
                    [ R.div_
                        [ R.input { value: "Text" }
                        , R.input { type: "number", value: "0" }
                        , styledLeaf R.input'
                            { className: "styledinput"
                            , css: inputFocus
                            , value: "focus"
                            }
                        , R.input
                            { className: "styledinput"
                            , value: "focus"
                            , disabled: true
                            }
                        ]
                    ]
                , R.input { type: "file" }
                , el Cluster.component {}
                    [ R.div_
                        [ R.input { type: "checkbox" }
                        , R.input { type: "checkbox", checked: true }
                        , R.input { type: "radio" }
                        , R.input { type: "radio", checked: true }
                        ]
                    ]
                , R.input { type: "range" }
                ]
            ]
        }
    )
