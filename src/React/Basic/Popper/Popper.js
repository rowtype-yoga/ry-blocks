export const modifierMatchReferenceSize = {
  name: "matchReferenceSize",
  enabled: true,
  fn: ({ state, instance }) => {
    const widthOrHeight =
      state.placement.startsWith("left") || state.placement.startsWith("right")
        ? "height"
        : "width"
    const popperSize = state.rects.popper[widthOrHeight]
    const referenceSize = state.rects.reference[widthOrHeight]
    if (popperSize >= referenceSize) return

    state.styles.popper[widthOrHeight] = `${referenceSize}px`
    instance.update()
  },
  phase: "beforeWrite",
  requires: ["computeStyles"]
}
