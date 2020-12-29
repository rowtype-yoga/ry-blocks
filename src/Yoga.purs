module Yoga where

import Data.Function as DF
import Data.Symbol (SProxy(..))
import Prim.Row (class Lacks, class Union)
import React.Basic.DOM (Props_div, Props_span, Props_button)
import React.Basic.DOM as R
import React.Basic.Emotion as Emotion
import React.Basic.Hooks (JSX, ReactComponent)
import React.Basic.Hooks as Hooks
import Record as Record

div ∷ ∀ attrs attrs_. Union attrs attrs_ Props_div => ReactComponent (Record attrs)
div = R.div'

span ∷ ∀ attrs attrs_. Union attrs attrs_ Props_span => ReactComponent (Record attrs)
span = R.span'

button ∷ ∀ attrs attrs_. Union attrs attrs_ Props_button => ReactComponent (Record attrs)
button = R.button'

el ∷
  ∀ props.
  Lacks "children" props =>
  ReactComponent { children ∷ Array JSX | props } ->
  Record props -> Array JSX -> JSX
el x props children = Hooks.element x (Record.insert (SProxy ∷ SProxy "children") children props)

infixl 5 el as </

infixr 0 DF.apply as />

leaf ∷
  ∀ props.
  Lacks "children" props =>
  ReactComponent { | props } ->
  Record props -> JSX
leaf x props = Hooks.element x props

infixl 5 leaf as </>

styled ∷
  ∀ props.
  Lacks "children" props =>
  ReactComponent { className ∷ String, children ∷ Array JSX | props } ->
  { className ∷ String, css ∷ Emotion.Style | props } -> Array JSX -> JSX
styled x props children = Emotion.element x (Record.insert (SProxy ∷ SProxy "children") children props)

infixl 5 styled as </*

styledLeaf ∷
  ∀ props.
  ReactComponent { className ∷ String | props } ->
  { className ∷ String, css ∷ Emotion.Style | props } -> JSX
styledLeaf = Emotion.element

infixl 5 styledLeaf as </*>
