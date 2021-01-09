// This is for the browser tests to work
// JSDOM does not have support for matchMedia
// So we just pretend nothing every matches
// And never invoke the listeners
const stubMatchMedia = () => {
    if (window.matchMedia) return
    window.matchMedia = (name) =>
    ({
        matches: false,
        addEventListener: () => { },
        removeEventListener: () => { }
    })
}


exports.getComputedStyleImpl = (el, window) => window.getComputedStyle(el)
exports.getPropertyValueImpl = (propName, computedStyle) => computedStyle.getPropertyValue(propName)
exports.getElementStyle = el => () => el.style
exports.setStyleProperty = prop => value => style => () => style.setProperty(prop, value)
exports.matchMedia = string => window => () => {
    stubMatchMedia()
    return window.matchMedia(string)
}
exports.matches = matchMedia => () => {
    stubMatchMedia()
    return matchMedia.matches
}
