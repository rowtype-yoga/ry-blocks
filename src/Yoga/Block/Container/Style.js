exports.getComputedStyleImpl = (el, window) => window.getComputedStyle(el)
exports.getPropertyValueImpl = (propName, computedStyle) => computedStyle.getPropertyValue(propName)