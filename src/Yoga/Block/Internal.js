import { forwardRef, createRef } from "react"

export function mkForwardRefComponent(displayName) {
  return (renderFn) => {
    const component = (props, ref) => renderFn(props)(ref)()
    component.displayName = displayName
    component.whyDidYouRender = true
    return forwardRef(component)
  }
}

export function mkForwardRefComponentEffect(displayName) {
  return (renderFn) => () => {
    const component = (props, ref) => renderFn(props)(ref)()
    component.displayName = displayName
    return forwardRef(component)
  }
}

export function pickDefinedFn(ref, ks, obj) {
  const copy = {}
  for (let i = 0; i < ks.length; i++) {
    if (obj[ks[i]] !== undefined) {
      copy[ks[i]] = obj[ks[i]]
    }
  }
  if (ref !== undefined) {
    copy.ref = ref
  }
  return copy
}

export const createRef = createRef

export function unsafeMergeSecond(r1) {
  return (r2) => {
    for (var k1 in r2) {
      if ({}.hasOwnProperty.call(r2, k1) && r2[k1] !== undefined) {
        r1[k1] = r2[k1]
      }
    }
    return r1
  }
}

export function unsafeUnionDroppingUndefined(r1) {
  return (r2) => {
    var copy = {}
    for (var k1 in r2) {
      if ({}.hasOwnProperty.call(r2, k1) && r2[k1] !== undefined) {
        copy[k1] = r2[k1]
      }
    }
    for (var k2 in r1) {
      if ({}.hasOwnProperty.call(r1, k2) && r1[k2] !== undefined) {
        copy[k2] = r1[k2]
      }
    }
    return copy
  }
}
