module Yoga.Block where

import Yoga.Block.Layout.Box as Box
import Yoga.Block.Layout.Centre as Centre
import Yoga.Block.Layout.Cluster as Cluster
import Yoga.Block.Container as Container
import Yoga.Block.Layout.Imposter as Imposter
import Yoga.Block.Modal as Modal
import Yoga.Block.Atom.Range as Range
import Yoga.Block.Atom.Segmented as Segmented
import Yoga.Block.Layout.Sidebar as Sidebar
import Yoga.Block.Layout.Stack as Stack
import Prim.Row (class Union)
import React.Basic (ReactComponent)

box ∷ ∀ p q. Union p q Box.Props => ReactComponent { | p }
box = Box.component

centre ∷ ∀ p q. Union p q Centre.Props => ReactComponent { | p }
centre = Centre.component

cluster ∷ ∀ p q. Union p q Cluster.Props => ReactComponent { | p }
cluster = Cluster.component

container ∷ ∀ p q. Union p q Container.Props => ReactComponent { | p }
container = Container.component

imposter ∷ ∀ p q. Union p q Imposter.Props => ReactComponent { | p }
imposter = Imposter.component

modal ∷ ReactComponent Modal.Props
modal = Modal.component

range ∷ ∀ p q. Union p q Range.Props => ReactComponent { | p }
range = Range.component

segmented ∷ ReactComponent Segmented.Props
segmented = Segmented.component

sidebar ∷ ∀ p q. Union p q Sidebar.Props => ReactComponent { | p }
sidebar = Sidebar.component

stack ∷ ∀ p q. Union p q Stack.Props => ReactComponent { | p }
stack = Stack.component
