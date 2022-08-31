module Plumage.Atom.PopOver.Types where

import Yoga.Prelude.View

import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as NEA
import Plumage.Prelude.Style (Style)

data HookDismissBehaviour
  = DismissPopOverOnClickAway { id ∷ String, css ∷ Style }
  | DismissPopOverOnClickOutsideTargetAnd (Array NodeRef)
  | DismissPopOverOnClickOutsideElements NodeRef (Array NodeRef)

toDismissBehaviour ∷ NodeRef → HookDismissBehaviour → DismissBehaviour
toDismissBehaviour targetRef = case _ of
  DismissPopOverOnClickAway x → DismissOnClickAway x
  DismissPopOverOnClickOutsideTargetAnd refs →
    DismissOnClickOutsideElements (NEA.cons' targetRef refs)
  DismissPopOverOnClickOutsideElements ref refs →
    DismissOnClickOutsideElements (NEA.cons' ref refs)

data DismissBehaviour
  = DismissOnClickAway { id ∷ String, css ∷ Style }
  | DismissOnClickOutsideElements (NonEmptyArray NodeRef)

data Placement = Placement PrimaryPlacement SecondaryPlacement
data PrimaryPlacement = Above | LeftOf | RightOf | Below
data SecondaryPlacement = Centre | Start | End

derive instance Eq PrimaryPlacement
derive instance Ord PrimaryPlacement
derive instance Eq SecondaryPlacement
derive instance Ord SecondaryPlacement
derive instance Eq Placement
derive instance Ord Placement

cyclePlacement ∷ Placement → Placement
cyclePlacement = case _ of
  Placement Above Start → Placement Above Centre
  Placement Above Centre → Placement Above End
  Placement Above End → Placement RightOf Start
  Placement RightOf Start → Placement RightOf Centre
  Placement RightOf Centre → Placement RightOf End
  Placement RightOf End → Placement Below End
  Placement Below End → Placement Below Centre
  Placement Below Centre → Placement Below Start
  Placement Below Start → Placement LeftOf End
  Placement LeftOf End → Placement LeftOf Centre
  Placement LeftOf Centre → Placement LeftOf Start
  Placement LeftOf Start → Placement Above Start

printPlacement ∷ Placement → String
printPlacement (Placement primary secondary) = p <> " " <> s
  where
  p = case primary of
    Above → "above"
    LeftOf → "left of"
    RightOf → "right of"
    Below → "below"
  s = case secondary of
    Centre → "centre"
    Start → "start"
    End → "end"
