module Yoga.Block.Layout.Stack.Story where

import Prelude
import Yoga.Block.Container.Style as Styles
import Yoga.Block.Layout.Stack as Stack
import Effect (Effect)
import Effect.Unsafe (unsafePerformEffect)
import React.Basic (JSX, element, fragment)
import React.Basic.DOM (css)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import Yoga.Block.Internal (_0)

default ∷
  { decorators ∷ Array (Effect JSX → JSX)
  , title ∷ String
  }
default =
  { title: "Layout/Stack"
  , decorators:
      [ \storyFn →
          R.div_
            [ element E.global { styles: Styles.global }
            , unsafePerformEffect storyFn
            ]
      ]
  }

stack ∷ Effect JSX
stack =
  pure
    $ fragment
        [ R.div_
            [ R.h2_ [ R.text "No Options" ]
            , element Stack.component
                { children:
                    [ R.div
                        { children: [ R.text "Child 1" ]
                        , style: css { backgroundColor: "teal" }
                        }
                    , R.div
                        { children: [ R.text "Child 2" ]
                        , style: css { backgroundColor: "rebeccapurple" }
                        }
                    ]
                , style: css { backgroundColor: "darkslateblue" }
                }
            , R.h2_ [ R.text "Zero Space" ]
            , element Stack.component
                { children:
                    [ R.div
                        { children: [ R.text "Child 1" ]
                        , style: css { backgroundColor: "teal" }
                        }
                    , R.div
                        { children: [ R.text "Child 2" ]
                        , style: css { backgroundColor: "rebeccapurple" }
                        }
                    ]
                , style: css { backgroundColor: "darkslateblue" }
                , space: _0
                }
            , R.h2_ [ R.text "Split After" ]
            , R.div
                { style: css { height: "300px", backgroundColor: "tomato" }
                , children:
                    [ element Stack.component
                        { children:
                            [ R.div
                                { children: [ R.div_ [ R.text "Child 1" ] ]
                                , style: css { backgroundColor: "teal" }
                                }
                            , R.div
                                { children: [ R.div_ [ R.text "Child 2" ] ]
                                , style: css
                                    { backgroundColor: "rebeccapurple" }
                                }
                            , R.div
                                { children: [ R.div_ [ R.text "Child 3" ] ]
                                , style: css { backgroundColor: "teal" }
                                }
                            , R.div
                                { children: [ R.div_ [ R.text "Child 4" ] ]
                                , style: css
                                    { backgroundColor: "rebeccapurple" }
                                }
                            ]
                        , style: css { backgroundColor: "darkslateblue" }
                        , splitAfter: 2
                        }
                    ]
                }
            ]
        ]
