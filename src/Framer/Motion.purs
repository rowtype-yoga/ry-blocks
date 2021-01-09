module Framer.Motion
  ( motion
  , withMotion
  , animatePresence
  , animateSharedLayout
  , module Framer.Motion.Types
  , module Framer.Motion.MotionComponent
  , element
  , elementKeyed
  , elementStyled
  , elementStyledKeyed
  ) where

import Prelude hiding (div, map, sub)
import Data.Function.Uncurried (Fn2, runFn2)
import Framer.Motion.MotionComponent (_data, abbr, address, area, article, aside, audio, b, base, bdi, bdo, blockquote, body, br, button, canvas, caption, circle, cite, clipPath, code, col, colgroup, custom, datalist, dd, defs, del, desc, details, dfn, dialog, div, dl, dt, ellipse, em, embed, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feDropShadow, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence, fieldset, figcaption, figure, filter, footer, foreignObject, form, g, h1, h2, h3, h4, h5, h6, head, header, hgroup, hr, html, i, iframe, image, img, input, ins, kbd, keygen, label, legend, li, line, linearGradient, link, main, map, mark, marker, mask, menu, menuitem, meta, metadata, meter, motionComponentImpl, nav, noscript, object, ol, optgroup, option, output, p, param, path, pattern, picture, polygon, polyline, pre, progress, q, radialGradient, rect, rp, rt, ruby, s, samp, script, section, select, small, source, span, stop, strong, style, sub, summary, sup, svg, svgAnimate, svgSwitch, symbol, table, tbody, td, text, textPath, textarea, tfoot, th, thead, time, title, tr, track, tspan, u, ul, use, var, video, view, wbr)
import Framer.Motion.Types (class EffectFnMaker, Animate, AnimatePresenceProps, AnimateSharedLayoutProps, AnimateSharedLayoutType(..), AnimationControls, BoundingBox2D, Drag, DragConstraints, DragElastic, DragMomentum, DragPropagation, EventInfo, Exit, Infinity, Initial, Layout, LayoutId, LayoutTransition, MakeVariantLabel(..), MotionProps, MotionPropsF, OnDrag, OnDragEnd, OnDragStart, OnHoverEnd, OnHoverStart, OnTap, OnTapCancel, OnTapEnd, OnTapStart, PanInfo, Point2D, TapInfo, Target(..), TargetAndTransition, Transition, VariantLabel(..), Variants, WhileHover, WhileTap, animate, boundingBox2D, callback, crossfade, customProp, drag, dragConstraints, dragElastic, dragMomentum, dragPropagation, exit, infinity, initial, layout, layoutId, makeVariantLabels, onDrag, onDragEnd, onDragStart, onHoverEnd, onHoverStart, onTap, onTapCancel, onTapEnd, onTapStart, prop, switch, toEffectFn, transition, variants, variantsFromObject, whileHover, whileTap)
import Prim.Row (class Nub, class Union)
import React.Basic (JSX, ReactComponent)
import React.Basic.Emotion (Style)
import Record (disjointUnion)
import Untagged.Castable (class Castable, cast)

withMotion ∷
  ∀ result baseProps motionSubset.
  Union baseProps (MotionProps ()) result => Nub result result => Castable motionSubset { | MotionProps () } => Record baseProps -> motionSubset -> Record result
withMotion old new = disjointUnion old ((cast new) ∷ { | MotionProps () })

motion ∷
  ∀ result baseProps motionSubset.
  Union baseProps (MotionProps ()) result => Nub result result => Castable motionSubset { | MotionProps () } => motionSubset -> Record baseProps -> Record result
motion = flip withMotion

foreign import animatePresence ∷
  ∀ attrs attrs_.
  Union attrs attrs_ AnimatePresenceProps =>
  ReactComponent { | attrs }

foreign import animateSharedLayout ∷
  ∀ attrs attrs_.
  Union attrs attrs_ AnimateSharedLayoutProps =>
  ReactComponent { | attrs }

element ∷ ∀ p. ReactComponent { | p } -> { | p } -> JSX
element = runFn2 motionElement_

foreign import motionElement_ ∷
  ∀ props. Fn2 (ReactComponent { | props }) { | props } JSX

elementKeyed ∷
  ∀ props.
  ReactComponent { | MotionProps props } ->
  { key ∷ String | MotionProps props } ->
  JSX
elementKeyed = runFn2 motionElementKeyed_

foreign import motionElementKeyed_ ∷
  ∀ props.
  Fn2 (ReactComponent { | MotionProps props })
    { key ∷ String | MotionProps props }
    JSX

elementStyled ∷
  ∀ props.
  ReactComponent { className ∷ String | props } ->
  { className ∷ String, css ∷ Style | props } ->
  JSX
elementStyled = runFn2 styledMotionElement_

foreign import styledMotionElement_ ∷
  ∀ props.
  Fn2 (ReactComponent { className ∷ String | props })
    { className ∷ String, css ∷ Style | props }
    JSX

elementStyledKeyed ∷
  ∀ props.
  ReactComponent { className ∷ String | props } ->
  { className ∷ String, css ∷ Style, key ∷ String | props } ->
  JSX
elementStyledKeyed = runFn2 styledMotionElementKeyed_

foreign import styledMotionElementKeyed_ ∷
  ∀ props.
  Fn2 (ReactComponent { className ∷ String | props })
    { className ∷ String, css ∷ Style, key ∷ String | props }
    JSX
