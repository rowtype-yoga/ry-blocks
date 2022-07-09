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