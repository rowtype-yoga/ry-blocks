export function getKeyImpl(just) {
  return function (nothing) {
    return function (event) {
      return event.keyCode ? just(event.keyCode) : nothing
    }
  }
}
