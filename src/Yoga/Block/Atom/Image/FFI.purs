module Yoga.Block.Atom.Image.FFI where

import Prelude

import Effect (Effect)
import Web.Event.EventTarget (EventTarget)

foreign import setFallbackImgSrc ∷ String → EventTarget → Effect Unit