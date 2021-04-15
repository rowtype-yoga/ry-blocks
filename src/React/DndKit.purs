module React.DndKit where

import Prelude
import Data.Function.Uncurried (Fn2, Fn3, runFn2, runFn3)
import Data.Maybe (Maybe)
import Data.Nullable (Nullable, toMaybe)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Foreign (Foreign)
import Foreign.Object (Object)
import Foreign.Object as Object
import Prim.Row (class Union)
import React.Basic (Ref)
import React.Basic.Events (EventFn, SyntheticEvent, EventHandler, unsafeEventFn)
import React.Basic.Hooks (JSX, ReactComponent, Hook, unsafeHook)
import Record.Builder as Builder
import Type.Prelude (Proxy(..))
import Unsafe.Coerce (unsafeCoerce)
import Web.DOM (Node)

foreign import dndContextImpl ∷ ∀ props. ReactComponent { | props }

type DndContextProps =
  ( children ∷ Array JSX
  , onDragEnd ∷ EventHandler
  , modifiers ∷ Array Modifier
  , sensors ∷ Sensors
  , collisionDetection ∷ CollisionDetection
  -- , onDragStart: ?(event: DragStartEvent): void
  -- , onDragMove?(event: DragMoveEvent): void
  -- , onDragOver?(event: DragOverEvent): void
  , onDragEnd ∷ EventHandler
  -- , onDragCancel?(): void
  )

foreign import data CollisionDetection ∷ Type

foreign import closestCenter ∷ CollisionDetection

foreign import closestCorners ∷ CollisionDetection

foreign import data SensorDescriptor ∷ Type

dndContext ∷ ∀ p q. Union p q DndContextProps => ReactComponent { | p }
dndContext = dndContextImpl

active ∷ EventFn SyntheticEvent (Maybe Draggable)
active = unsafeEventFn \e -> toMaybe (unsafeCoerce e).active

over ∷ EventFn SyntheticEvent (Maybe Draggable)
over = unsafeEventFn \e -> toMaybe (unsafeCoerce e).over

type Draggable =
  { id ∷ String }

type SortableContextProps =
  ( children ∷ Array JSX
  , strategy ∷ SortingStrategy
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

arrayMove ∷ ∀ a. Int -> Int -> Array a -> Array a
arrayMove source target arr = runFn3 arrayMoveImpl arr source target

foreign import arrayMoveImpl ∷ ∀ a. Fn3 (Array a) Int Int (Array a)

foreign import cssToString ∷ Foreign -> String

foreign import data Sensor ∷ Type

foreign import data Sensors ∷ Type

foreign import keyboardSensor ∷ Sensor

foreign import pointerSensor ∷ Sensor

foreign import data UseSensor ∷ Type -> Type

foreign import useSensorImpl ∷ ∀ args. Fn2 Sensor { | args } SensorDescriptor

useSensor ∷ ∀ r. Sensor -> Record r -> SensorDescriptor
useSensor sensor args = runFn2 useSensorImpl sensor args

foreign import data UseSensors ∷ Type -> Type

foreign import useSensorsImpl ∷ EffectFn1 (Array SensorDescriptor) Sensors

useSensors ∷ ∀ hooks. Array SensorDescriptor -> Hook hooks Sensors
useSensors args =
  unsafeHook
    $ runEffectFn1 useSensorsImpl args

foreign import data CoordinateGetter ∷ Type

foreign import sortableKeyboardCoordinates ∷ CoordinateGetter

foreign import data SortingStrategy ∷ Type

foreign import verticalListSortingStrategy ∷ SortingStrategy
