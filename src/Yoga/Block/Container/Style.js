// This is for the browser tests to work
// JSDOM does not have support for matchMedia
// So we just pretend nothing every matches
// And never invoke the listeners
const stubMatchMedia = () => {
  if (window.matchMedia) return
  window.matchMedia = (name) => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {}
  })
}

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
export function matchMedia(string) {
  return (window) => () => {
    stubMatchMedia()
    return window.matchMedia(string)
  }
}
export function matches(matchMedia) {
  return () => {
    stubMatchMedia()
    return matchMedia.matches
  }
}
