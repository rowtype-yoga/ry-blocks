module React.DndKit where

import Prelude
import Data.Function.Uncurried (Fn3, runFn3)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable, toMaybe)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Foreign (Foreign)
import Foreign.Object (Object)
import Foreign.Object as Object
import Prim.Row (class Union)
import React.Basic (Ref)
import React.Basic.Events (EventFn, EventHandler, SyntheticEvent, unsafeEventFn)
import React.Basic.Hooks (Hook, JSX, ReactComponent, unsafeHook)
import Record.Builder as Builder
import Type.Prelude (Proxy(..))
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM (Node)

foreign import dndContextImpl ∷ ∀ props. ReactComponent { | props }

type DndContextProps =
  ( children ∷ Array JSX
  , onDragEnd ∷ EventHandler
  , modifiers ∷ Array Modifier
  , sensors ∷ ∀ a. Array (SensorDescriptor a)
  , collisionDetection ∷ CollisionDetection
  -- , onDragStart: ?(event: DragStartEvent): void
  -- , onDragMove?(event: DragMoveEvent): void
  -- , onDragOver?(event: DragOverEvent): void
  -- , onDragEnd?(event: DragEndEvent): void
  -- , onDragCancel?(): void
  )

foreign import data CollisionDetection ∷ Type

foreign import closestCenter ∷ CollisionDetection

foreign import closestCorners ∷ CollisionDetection

foreign import data SensorDescriptor ∷ Type -> Type

dndContext ∷ ∀ p q. Union p q DndContextProps => ReactComponent { | p }
dndContext = dndContextImpl

active ∷ EventFn SyntheticEvent Draggable
active = unsafeEventFn \e -> (unsafeCoerce e).active

over ∷ EventFn SyntheticEvent (Maybe Draggable)
over = unsafeEventFn \e -> toMaybe (unsafeCoerce e).over

type Draggable =
  { id ∷ String }

type SortableContextProps =
  ( children ∷ Array JSX
  , items ∷ Array String
  )

-- | `items` is the sorted array of the unique ids associated to each sortable item
foreign import sortableContextImpl ∷ ∀ props. ReactComponent { | props }

sortableContext ∷ ∀ p q. Union p q SortableContextProps => ReactComponent { | p }
sortableContext = sortableContextImpl

useSortable ∷ SortableArgs -> Hook (UseSortable SortableArgs) SortableResult
useSortable args =
  map toSortableResult
    $ unsafeHook
    $ runEffectFn1 useSortableImpl args

foreign import data UseSortable ∷ Type -> Type -> Type

foreign import useSortableImpl ∷
  EffectFn1
    SortableArgs
    SortableResultImpl

type SortableArgs =
  { id ∷ String
  }

type SortableResultImpl =
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

type SortableResult =
  { attributes ∷
    { _aria ∷ Object String
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

toSortableResult ∷ SortableResultImpl -> SortableResult
toSortableResult sri =
  Builder.build
    ( Builder.modify (Proxy ∷ _ "attributes")
        ( Builder.build
            ( Builder.delete
                (Proxy ∷ _ "aria-describedby")
                <<< Builder.delete (Proxy ∷ _ "aria-pressed")
                <<< Builder.delete (Proxy ∷ _ "aria-roledescription")
                <<< Builder.insert (Proxy ∷ _ "_aria")
                    ( Object.fromHomogeneous
                        { describedby: sri.attributes."aria-describedby"
                        , pressed: sri.attributes."aria-pressed"
                        , roledescription: sri.attributes."aria-roledescription"
                        }
                    )
            )
        )
    )
    sri

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
