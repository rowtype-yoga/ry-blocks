module React.Basic.Popper.Types where

import Foreign.Object (Object)
import React.Basic.DOM (CSS)
import Yoga.Prelude.View (NodeRef)

type ReferenceElement =
  NodeRef

type PopperElement =
  NodeRef

type ArrowElement =
  NodeRef

type DataAttributes =
  { popper ∷ Object String, arrow ∷ Object String }

type Styles =
  { popper ∷ CSS, arrow ∷ CSS }

type PopperData =
  { styles ∷ Styles, attributes ∷ DataAttributes }

foreign import data Modifier ∷ Type

type Options =
  ( modifiers ∷ Array Modifier
  , strategy ∷ String
  , placement ∷ String
  )
