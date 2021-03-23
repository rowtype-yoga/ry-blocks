module React.DndKit where

import Prelude
import Data.Function.Uncurried (Fn3, runFn3)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable, toMaybe)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Foreign (Foreign)
import React.Basic (Ref)
import React.Basic.Events (EventFn, EventHandler, SyntheticEvent, unsafeEventFn)
import React.Basic.Hooks (Hook, JSX, ReactComponent, unsafeHook)
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM (Node)

foreign import dndContext ∷
  ReactComponent
    { children ∷ Array JSX
    , onDragEnd ∷ EventHandler
    , modifiers ∷ Array Modifier
    }

active ∷ EventFn SyntheticEvent Draggable
active = unsafeEventFn \e -> (unsafeCoerce e).active

over ∷ EventFn SyntheticEvent (Maybe Draggable)
over = unsafeEventFn \e -> toMaybe (unsafeCoerce e).over

type Draggable =
  { id ∷ String }

-- | `items` is the sorted array of the unique ids associated to each sortable item
foreign import sortableContext ∷
  ReactComponent
    { children ∷ Array JSX
    , items ∷ Array String
    }

useSortable ∷ SortableArgs -> Hook (UseSortable SortableArgs) SortableResult
useSortable args =
  unsafeHook
    $ runEffectFn1 useSortableImpl args

foreign import data UseSortable ∷ Type -> Type -> Type

foreign import useSortableImpl ∷
  EffectFn1
    SortableArgs
    SortableResult

type SortableArgs =
  { id ∷ String
  }

type SortableResult =
  { attributes ∷
    { "aria-describedby" ∷ String
    , "aria-pressed" ∷ String
    , "aria-roledescription" ∷ String
    , role ∷ String
    , tabIndex ∷ Int
    }
  , listeners ∷
    { onKeyDown ∷ EventHandler
    , onPointerDown ∷ EventHandler
    }
  , setNodeRef ∷ Ref (Nullable Node)
  , transform ∷ Foreign
  , transition ∷ Foreign
  }

foreign import data Modifier ∷ Type

foreign import restrictToHorizontalAxis ∷ Modifier

foreign import restrictToVerticalAxis ∷ Modifier

foreign import restrictToParentElement ∷ Modifier

foreign import restrictToFirstScrollableAncestor ∷ Modifier

foreign import restrictToWindowEdges ∷ Modifier

arrayMove ∷ ∀ a. Array a -> Int -> Int -> Array a
arrayMove = runFn3 arrayMoveImpl

foreign import arrayMoveImpl ∷ ∀ a. Fn3 (Array a) Int Int (Array a)

foreign import cssToString ∷ Foreign -> String
