const framerMotion = require("framer-motion")

exports.divImpl = framerMotion.motion.div
exports.h1Impl = framerMotion.motion.h1

exports.infinity = Infinity

exports.custom = (component) => () => {
    return framerMotion.motion.custom(component)
}

exports.animatePresence = () => framerMotion.AnimatePresence

exports.animateSharedLayout = () => framerMotion.AnimateSharedLayout
