const framerMotion = require("framer-motion")

exports.divImpl = framerMotion.motion.div
exports.buttonImpl = framerMotion.motion.button
exports.h1Impl = framerMotion.motion.h1
exports.svgImpl = framerMotion.motion.svg
exports.pathImpl = framerMotion.motion.path
exports.rectImpl = framerMotion.motion.rect

exports.infinity = Infinity

exports.custom = (component) => () => {
    return framerMotion.motion.custom(component)
}

exports.animatePresence = () => framerMotion.AnimatePresence

exports.animateSharedLayout = () => framerMotion.AnimateSharedLayout
