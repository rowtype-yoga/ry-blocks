
export function getComputedStyleImpl(el, window) {
  return window.getComputedStyle(el)
}
export function getPropertyValueImpl(propName, computedStyle) {
  return computedStyle.getPropertyValue(propName)
}
export function getElementStyle(el) {
  return () => el.style
}
export function setStyleProperty(prop) {
  return (value) => (style) => () => style.setProperty(prop, value)
}
