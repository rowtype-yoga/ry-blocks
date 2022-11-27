module Yoga.Block where

import Prim.Row (class Lacks, class Union)
import React.Basic (JSX, ReactComponent)
import React.Basic as React
import Yoga (el)
import Yoga.Block.Atom.Button as Button
import Yoga.Block.Atom.Checkbox as Checkbox
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Image as Image
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Atom.Range as Range
import Yoga.Block.Atom.Select as Select
import Yoga.Block.Atom.Segmented as Segmented
import Yoga.Block.Atom.Toggle as Toggle
import Yoga.Block.Container as Container
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Layout.Centre as Centre
import Yoga.Block.Layout.Cluster as Cluster
import Yoga.Block.Layout.Cover as Cover
import Yoga.Block.Layout.Grid as Grid
import Yoga.Block.Layout.Imposter as Imposter
import Yoga.Block.Layout.Sidebar as Sidebar
import Yoga.Block.Layout.Stack as Stack
import Yoga.Block.Layout.Switcher as Switcher
import Yoga.Block.Molecule.Breadcrumbs as Breadcrumbs
import Yoga.Block.Molecule.Modal as Modal
import Yoga.Block.Molecule.ReadMore as ReadMore
import Yoga.Block.Quark.Layer as Layer

box' ∷ ∀ p q. Union p q Box.Props ⇒ ReactComponent { | p }
box' = Box.component

box ∷
  ∀ p q.
  Lacks "children" p ⇒
  Union p q Box.PropsNoChildren ⇒
  { | p } →
  Array JSX →
  JSX
box = el box'

box_ ∷ Array JSX → JSX
box_ = box {}

breadcrumbs' ∷
  ∀ p q.
  Union p q Breadcrumbs.Props ⇒
  ReactComponent { | Breadcrumbs.MandatoryProps p }
breadcrumbs' = Breadcrumbs.component

button' ∷ ∀ p q. Union p q Button.Props ⇒ ReactComponent { | p }
button' = Button.component

button ∷
  ∀ p q.
  Lacks "children" p ⇒
  Union p q Button.PropsNoChildren ⇒
  { | p } →
  Array JSX →
  JSX
button = el button'

button_ ∷ Array JSX → JSX
button_ = button {}

centre' ∷ ∀ p q. Union p q Centre.Props ⇒ ReactComponent { | p }
centre' = Centre.component

centre ∷
  ∀ p q.
  Lacks "children" p ⇒
  Union p q Centre.PropsNoChildren ⇒
  { | p } →
  Array JSX →
  JSX
centre = el centre'

centre_ ∷ Array JSX → JSX
centre_ = centre {}

cluster' ∷ ∀ p q. Union p q Cluster.Props ⇒ ReactComponent { | p }
cluster' = Cluster.component

cluster ∷
  ∀ p q.
  Lacks "children" p ⇒
  Union p q Cluster.PropsNoChildren ⇒
  { | p } →
  Array JSX →
  JSX
cluster = el cluster'

cluster_ ∷ Array JSX → JSX
cluster_ = cluster {}

container ∷ ∀ p q. Union p q Container.Props ⇒ ReactComponent { | p }
container = Container.component

cover' ∷ ∀ p q. Union p q Cover.Props ⇒ ReactComponent { | p }
cover' = Cover.component

cover ∷
  ∀ p q.
  Lacks "children" p ⇒
  Union p q Cover.PropsNoChildren ⇒
  { | p } →
  Array JSX →
  JSX
cover = el cover'

cover_ ∷ Array JSX → JSX
cover_ = cover {}

checkbox' ∷
  ∀ p q.
  Union p q Checkbox.Props ⇒
  ReactComponent { | Checkbox.MandatoryProps p }
checkbox' = Checkbox.component

checkbox ∷
  ∀ p q. Union p q Checkbox.Props ⇒ { | Checkbox.MandatoryProps p } → JSX
checkbox = React.element checkbox'

grid' ∷
  ∀ p q. Union p q Grid.Props ⇒ ReactComponent { children ∷ Array JSX | p }
grid' = Grid.component

grid ∷
  ∀ p q. Lacks "children" p ⇒ Union p q Grid.Props ⇒ { | p } → Array JSX → JSX
grid = el grid'

grid_ ∷ Array JSX → JSX
grid_ = grid {}

icon ∷ ∀ p q. Union p q Icon.Props ⇒ ReactComponent { | Icon.MandatoryProps p }
icon = Icon.component

input ∷ ∀ p q. Union p q Input.Props ⇒ ReactComponent { | p }
input = Input.component

image ∷ ∀ p q. Union p q Image.Props ⇒ { | p } → JSX
image = React.element Image.component

imposter ∷ ∀ p q. Union p q Imposter.Props ⇒ ReactComponent { | p }
imposter = Imposter.component

modal' ∷ ReactComponent Modal.Props
modal' = Modal.component

modal ∷ Modal.Props → JSX
modal = React.element modal'

layer' ∷ ReactComponent { | Layer.Props }
layer' = Layer.component

layer ∷ { | Layer.Props } → JSX
layer = React.element layer'

range ∷ ∀ p q. Union p q Range.Props ⇒ ReactComponent { | p }
range = Range.component

select' ∷ ∀ a. ReactComponent (Select.Props a)
select' = Select.component

select ∷ ∀ a. (Select.Props a) → JSX
select = React.element select'

segmented' ∷ ReactComponent Segmented.Props
segmented' = Segmented.component

segmented ∷ Segmented.Props → JSX
segmented = React.element Segmented.component

sidebar' ∷
  ∀ p q.
  Union p q Sidebar.Props ⇒
  ReactComponent { sidebar ∷ JSX, children ∷ Array JSX | p }
sidebar' = Sidebar.component

sidebar ∷
  ∀ p q.
  Lacks "children" p ⇒
  Union p q Sidebar.Props ⇒
  { sidebar ∷ JSX | p } →
  Array JSX →
  JSX
sidebar = el sidebar'

sidebar_ ∷ JSX → Array JSX → JSX
sidebar_ jsx = sidebar { sidebar: jsx }

stack' ∷
  ∀ p q. Union p q Stack.Props ⇒ ReactComponent { children ∷ Array JSX | p }
stack' = Stack.component

stack ∷
  ∀ p q. Lacks "children" p ⇒ Union p q Stack.Props ⇒ { | p } → Array JSX → JSX
stack = el stack'

stack_ ∷ Array JSX → JSX
stack_ = stack {}

switcher' ∷ ∀ p q. Union p q Switcher.Props ⇒ ReactComponent { | p }
switcher' = Switcher.component

switcher ∷
  ∀ p q.
  Lacks "children" p ⇒
  Union p q Switcher.PropsNoChildren ⇒
  { | p } →
  Array JSX →
  JSX
switcher = el switcher'

switcher_ ∷ Array JSX → JSX
switcher_ = switcher {}

toggle ∷ ∀ p q. Union p q Toggle.Props ⇒ ReactComponent { | p }
toggle = Toggle.component

readMore ∷ ∀ p q. Union p q ReadMore.Props ⇒ ReactComponent (Record p)
readMore = ReadMore.component
