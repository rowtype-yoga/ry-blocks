module React.Downshift.Types where

import Prelude
import Data.Nullable (Nullable)
import Effect (Effect)
import Effect.Uncurried (EffectFn1)
import Foreign (Foreign)
import React.Downshift.Types.StateChangeType (StateChangeType)

type UseSelectDataImpl a =
  { isOpen ∷ Boolean
  , selectedItem ∷ a
  , closeMenu ∷ Effect Unit
  , getItemProps ∷ { item ∷ a, index ∷ Int } -> Foreign
  , getLabelProps ∷ Foreign --ƒ (labelProps)
  , getMenuProps ∷ Foreign -- ƒ (_temp, _temp2)
  , getToggleButtonProps ∷ Foreign -- ƒ (_temp3, _temp4)
  , highlightedIndex ∷ Int
  , inputValue ∷ String
  , isOpen ∷ Boolean
  , openMenu ∷ Effect Unit
  , reset ∷ Effect Unit
  , selectItem ∷ EffectFn1 a Unit
  , selectedItem ∷ Nullable a
  , setHighlightedIndex ∷ EffectFn1 Int Unit
  , setInputValue ∷ EffectFn1 String Unit
  , toggleMenu ∷ Effect Unit
  }

type A11yMessageInfoImpl a =
  { highlightedIndex ∷ Int
  , highlightedItem ∷ Nullable a
  , inputValue ∷ String
  , isOpen ∷ Boolean
  , itemToString ∷ a -> String
  , previousResultCount ∷ Int
  , resultCount ∷ Int
  , selectedItem ∷ Nullable a
  }

type UseSelectPropsImpl a =
  { items ∷ Array a
  , itemToString ∷ a -> String
  , onSelectedItemChange ∷ EffectFn1 { type ∷ StateChangeType, selectedItem ∷ Nullable a } Unit
  , initialSelectedItem ∷ a -- defaults to null
  , initialIsOpen ∷ Boolean -- defaults to false
  , initialHighlightedIndex ∷ Int -- defaults to -1
  , defaultSelectedItem ∷ a -- defaults to null
  , defaultIsOpen ∷ Boolean -- defaults to false
  , defaultHighlightedIndex ∷ Int -- defaults to -1
  , getA11yStatusMessage ∷ Foreign -> Foreign -- defaults to undefined
  , getA11ySelectionMessage ∷ Foreign -> Foreign -- defaults to undefined
  , onHighlightedIndexChange ∷ Foreign -> Foreign -- defaults to undefined
  }
