import {
  DndContext,
  closestCenter,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
  restrictToParentElement,
  restrictToFirstScrollableAncestor,
  restrictToWindowEdges
} from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"
export const dndContextImpl = DndContext
export const closestCenter = closestCenter
export const closestCorners = closestCorners
export const sortableContextImpl = SortableContext
export const useSortableImpl = useSortable
export const arrayMoveImpl = arrayMove
export const restrictToHorizontalAxis = restrictToHorizontalAxis
export const restrictToVerticalAxis = restrictToVerticalAxis
export const restrictToParentElement = restrictToParentElement
export const restrictToFirstScrollableAncestor =
  restrictToFirstScrollableAncestor
export const restrictToWindowEdges = restrictToWindowEdges
export const cssToString = CSS.Transform.toString
export const keyboardSensor = KeyboardSensor
export const pointerSensor = PointerSensor
export const useSensorImpl = useSensor
export function useSensorsImpl(args) {
  return useSensors.apply(args)
}
export const sortableKeyboardCoordinates = sortableKeyboardCoordinates
export const verticalListSortingStrategy = verticalListSortingStrategy
