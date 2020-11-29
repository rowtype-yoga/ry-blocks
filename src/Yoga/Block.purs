module Yoga.Block where

import Components.Box as Box
import Components.Centre as Centre
import Components.Cluster as Cluster
import Components.Container as Container
import Components.Imposter as Imposter
import Components.Modal as Modal
import Components.Range as Range
import Components.Segmented as Segmented
import Components.Sidebar as Sidebar
import Components.Stack as Stack
import Prim.Row (class Union)
import React.Basic (ReactComponent)

box ∷ ReactComponent Box.Props
box = Box.component

centre ∷ ∀ p q. Union p q Centre.Props => ReactComponent { | p }
centre = Centre.component

cluster ∷ ∀ p q. Union p q Cluster.Props => ReactComponent { | p }
cluster = Cluster.component

container ∷ ReactComponent Container.Props
container = Container.component

imposter ∷ ∀ p q. Union p q Imposter.Props => ReactComponent { | p }
imposter = Imposter.component

modal ∷ ReactComponent Modal.Props
modal = Modal.component

range ∷ ∀ p q. Union p q Range.Props => ReactComponent { | p }
range = Range.component

segmented ∷ ReactComponent Segmented.ComponentProps
segmented = Segmented.component

sidebar ∷ ∀ p q. Union p q Sidebar.Props => ReactComponent { | p }
sidebar = Sidebar.component

stack ∷ ∀ p q. Union p q Stack.Props => ReactComponent { | p }
stack = Stack.component
