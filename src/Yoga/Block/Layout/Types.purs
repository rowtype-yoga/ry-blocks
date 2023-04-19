module Yoga.Block.Layout.Types where

data JustifyContent = JStart | JEnd | JCenter | JBetween | JAround | JEvenly

data AlignItems = AStart | AEnd | ACenter | AStretch | ABaseline

justifyToString ∷ JustifyContent → String
justifyToString = case _ of
  JStart → "flex-start"
  JEnd → "flex-end"
  JCenter → "center"
  JBetween → "space-between"
  JAround → "space-around"
  JEvenly → "space-evenly"

alignToString ∷ AlignItems → String
alignToString = case _ of
  AStart → "flex-start"
  AEnd → "flex-end"
  ACenter → "center"
  AStretch → "stretch"
  ABaseline → "baseline"
