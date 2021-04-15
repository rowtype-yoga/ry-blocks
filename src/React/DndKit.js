const dndKitCore = require('@dnd-kit/core')
const dndKitSortable = require('@dnd-kit/sortable')
const dndKitModifiers = require('@dnd-kit/modifiers')
const dndKitUtilities = require('@dnd-kit/utilities')
exports.dndContextImpl = dndKitCore.DndContext
exports.closestCenter = dndKitCore.closestCenter
exports.closestCorners = dndKitCore.closestCorners
exports.sortableContextImpl = dndKitSortable.SortableContext
exports.useSortableImpl = dndKitSortable.useSortable
exports.arrayMoveImpl = dndKitSortable.arrayMove
exports.restrictToHorizontalAxis = dndKitModifiers.restrictToHorizontalAxis
exports.restrictToVerticalAxis = dndKitModifiers.restrictToVerticalAxis
exports.restrictToParentElement = dndKitModifiers.restrictToParentElement
exports.restrictToFirstScrollableAncestor =
  dndKitModifiers.restrictToFirstScrollableAncestor
exports.restrictToWindowEdges = dndKitModifiers.restrictToWindowEdges
exports.cssToString = dndKitUtilities.CSS.Transform.toString
exports.keyboardSensor = dndKitCore.KeyboardSensor
exports.pointerSensor = dndKitCore.PointerSensor
exports.useSensorImpl = dndKitCore.useSensor
exports.useSensorsImpl = (args) => dndKitCore.useSensors.apply(args)
exports.sortableKeyboardCoordinates = dndKitSortable.sortableKeyboardCoordinates
exports.verticalListSortingStrategy = dndKitSortable.verticalListSortingStrategy