const stateChangeTypes = require("downshift").useSelect.stateChangeTypes

export const menuKeyDownArrowDown = stateChangeTypes.MenuKeyDownArrowDown
export const menuKeyDownArrowUp = stateChangeTypes.MenuKeyDownArrowUp
export const menuKeyDownEscape = stateChangeTypes.MenuKeyDownEscape
export const menuKeyDownHome = stateChangeTypes.MenuKeyDownHome
export const menuKeyDownEnd = stateChangeTypes.MenuKeyDownEnd
export const menuKeyDownEnter = stateChangeTypes.MenuKeyDownEnter
export const menuKeyDownSpaceButton = stateChangeTypes.MenuKeyDownSpaceButton
export const menuKeyDownCharacter = stateChangeTypes.MenuKeyDownCharacter
export const menuBlur = stateChangeTypes.MenuBlur
export const menuMouseLeave = stateChangeTypes.MenuMouseLeave
export const itemMouseMove = stateChangeTypes.ItemMouseMove
export const itemClick = stateChangeTypes.ItemClick
export const toggleButtonClick = stateChangeTypes.ToggleButtonClick
export const toggleButtonKeyDownCharacter =
  stateChangeTypes.ToggleButtonKeyDownCharacter
export const toggleButtonKeyDownArrowDown =
  stateChangeTypes.ToggleButtonKeyDownArrowDown
export const toggleButtonKeyDownArrowUp =
  stateChangeTypes.ToggleButtonKeyDownArrowUp
export const functionToggleMenu = stateChangeTypes.FunctionToggleMenu
export const functionOpenMenu = stateChangeTypes.FunctionOpenMenu
export const functionCloseMenu = stateChangeTypes.FunctionCloseMenu
export const functionSetHighlightedIndex =
  stateChangeTypes.FunctionSetHighlightedIndex
export const functionSelectItem = stateChangeTypes.FunctionSelectItem
export const functionSetInputValue = stateChangeTypes.FunctionSetInputValue
export const functionReset = stateChangeTypes.FunctionReset
