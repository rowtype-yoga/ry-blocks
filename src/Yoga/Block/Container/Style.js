exports.getComputedStyleImpl = (el, window) => window.getComputedStyle(el)
exports.getPropertyValueImpl = (propName, computedStyle) => computedStyle.getPropertyValue(propName)
exports.getElementStyle = el => () => el.style
exports.setStyleProperty = prop => value => style => () => style.setProperty(prop, value)
exports.matchMedia = string => window => () => window.matchMedia(string)
exports.matches = matchMedia => () => matchMedia.matches