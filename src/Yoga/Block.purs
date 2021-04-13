module Yoga.Block where

import Prim.Row (class Union)
import React.Basic (JSX, ReactComponent)
import Yoga.Block.Atom.Button as Button
import Yoga.Block.Atom.Icon as Icon
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Atom.Range as Range
import Yoga.Block.Atom.Segmented as Segmented
import Yoga.Block.Atom.Toggle as Toggle
import Yoga.Block.Atom.Tooltip as Tooltip
import Yoga.Block.Container as Container
import Yoga.Block.Layout.Box as Box
import Yoga.Block.Layout.Centre as Centre
import Yoga.Block.Layout.Cluster as Cluster
import Yoga.Block.Layout.Imposter as Imposter
import Yoga.Block.Layout.Sidebar as Sidebar
import Yoga.Block.Layout.Stack as Stack
import Yoga.Block.Layout.Switcher as Switcher
import Yoga.Block.Molecule.Modal as Modal
import Yoga.Block.Molecule.ReadMore as ReadMore

box ∷ ∀ p q. Union p q Box.Props => ReactComponent { | p }
box = Box.component

button ∷ ∀ p q. Union p q Button.Props => ReactComponent { | p }
button = Button.component

centre ∷ ∀ p q. Union p q Centre.Props => ReactComponent { | p }
centre = Centre.component

cluster ∷ ∀ p q. Union p q Cluster.Props => ReactComponent { | p }
cluster = Cluster.component

container ∷ ∀ p q. Union p q Container.Props => ReactComponent { | p }
container = Container.component

icon ∷ ∀ p q. Union p q Icon.Props => ReactComponent { | Icon.MandatoryProps p }
icon = Icon.component

input ∷ ∀ p q. Union p q Input.Props => ReactComponent { | p }
input = Input.component

imposter ∷ ∀ p q. Union p q Imposter.Props => ReactComponent { | p }
imposter = Imposter.component

modal ∷ ReactComponent Modal.Props
modal = Modal.component

range ∷ ∀ p q. Union p q Range.Props => ReactComponent { | p }
range = Range.component

segmented ∷ ReactComponent Segmented.Props
segmented = Segmented.component

sidebar ∷ ∀ p q. Union p q Sidebar.Props => ReactComponent { children ∷ Array JSX | p }
sidebar = Sidebar.component

stack ∷ ∀ p q. Union p q Stack.Props => ReactComponent { children ∷ Array JSX | p }
stack = Stack.component

switcher ∷ ∀ p q. Union p q Switcher.Props => ReactComponent { | p }
switcher = Switcher.component

toggle ∷ ∀ p q. Union p q Toggle.Props => ReactComponent { | p }
toggle = Toggle.component

tooltip ∷ ∀ p q. Union p q Tooltip.Props => ReactComponent { | Tooltip.MandatoryProps p }
tooltip = Tooltip.component

readMore ∷ ∀ p q. Union p q ReadMore.Props => ReactComponent (Record p)
readMore = ReadMore.component
