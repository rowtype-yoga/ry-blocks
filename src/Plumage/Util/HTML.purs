module Plumage.Util.HTML where

import React.Basic (JSX, ReactComponent)
import React.Basic.DOM as R
import React.Basic.Emotion (Style)
import React.Basic.Emotion as E

jsx ∷
  ReactComponent
    { children ∷ Array JSX
    , className ∷ String
    } →
  String →
  Style →
  Array JSX →
  JSX
jsx component className css children = E.element component
  { className, css, children }

jsx_ ∷
  ReactComponent
    { children ∷ Array JSX
    , className ∷ String
    } →
  Style →
  Array JSX →
  JSX
jsx_ component = jsx component ""

div ∷ String → Style → Array JSX → JSX
div = jsx R.div'

div_ ∷ Style → Array JSX → JSX
div_ = jsx_ R.div'

span ∷ String → Style → Array JSX → JSX
span = jsx R.span'

span_ ∷ Style → Array JSX → JSX
span_ = jsx_ R.span'

li ∷ String → Style → Array JSX → JSX
li = jsx R.li'

li_ ∷ Style → Array JSX → JSX
li_ = jsx_ R.li'

ul ∷ String → Style → Array JSX → JSX
ul = jsx R.ul'

ul_ ∷ Style → Array JSX → JSX
ul_ = jsx_ R.ul'

nav ∷ String → Style → Array JSX → JSX
nav = jsx R.nav'

nav_ ∷ Style → Array JSX → JSX
nav_ = jsx_ R.nav'

p ∷ String → Style → Array JSX → JSX
p = jsx R.p'

p_ ∷ Style → Array JSX → JSX
p_ = jsx_ R.p'

section ∷ String → Style → Array JSX → JSX
section = jsx R.section'

section_ ∷ Style → Array JSX → JSX
section_ = jsx_ R.section'

h1_ ∷ Style → String → JSX
h1_ style txt = jsx_ R.h1' style [ R.text txt ]

h2_ ∷ Style → String → JSX
h2_ style txt = jsx_ R.h2' style [ R.text txt ]

h3_ ∷ Style → String → JSX
h3_ style txt = jsx_ R.h3' style [ R.text txt ]

h4_ ∷ Style → String → JSX
h4_ style txt = jsx_ R.h4' style [ R.text txt ]

h5_ ∷ Style → String → JSX
h5_ style txt = jsx_ R.h5' style [ R.text txt ]

h6_ ∷ Style → String → JSX
h6_ style txt = jsx_ R.h6' style [ R.text txt ]
