import {
  DndContext,
  closestCenter as closestCenter_,
  closestCorners as closestCorners_,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates as sortableKeyboardCoordinates_,
  verticalListSortingStrategy as verticalListSortingStrategy_
} from "@dnd-kit/sortable"
import {
  restrictToHorizontalAxis as restrictToHorizontalAxis_,
  restrictToVerticalAxis as restrictToVerticalAxis_,
  restrictToParentElement as restrictToParentElement_,
  restrictToFirstScrollableAncestor as restrictToFirstScrollableAncestor_,
  restrictToWindowEdges as restrictToWindowEdges_
} from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"
export const dndContextImpl = DndContext
export const closestCenter = closestCenter_
export const closestCorners = closestCorners_
export const sortableContextImpl = SortableContext
export const useSortableImpl = useSortable
export const arrayMoveImpl = arrayMove
export const restrictToHorizontalAxis = restrictToHorizontalAxis_
export const restrictToVerticalAxis = restrictToVerticalAxis_
export const restrictToParentElement = restrictToParentElement_
export const restrictToFirstScrollableAncestor =
  restrictToFirstScrollableAncestor_
export const restrictToWindowEdges = restrictToWindowEdges_
export const cssToString = CSS.Transform.toString
export const keyboardSensor = KeyboardSensor
export const pointerSensor = PointerSensor
export const useSensorImpl = useSensor
export function useSensorsImpl(args) {
  return useSensors.apply(args)
}
export const sortableKeyboardCoordinates = sortableKeyboardCoordinates_
export const verticalListSortingStrategy = verticalListSortingStrategy_
