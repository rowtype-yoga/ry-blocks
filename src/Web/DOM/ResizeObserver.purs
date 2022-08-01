-- This module provides FFI bindings for the Resize Observer API.
-- NOTE: I'm not using the uncurried package as `web-dom` doesn't use it either.
module Web.DOM.ResizeObserver
  ( ResizeObserver
  , ResizeObserverEntry(..)
  , ResizeObserverSize(..)
  , ResizeObserverBoxOptions(..)
  , resizeObserver
  , observe
  , unobserve
  , disconnect
  ) where

import Prelude
import Effect (Effect)
import Web.DOM (Element)
import Web.DOM.Element (DOMRect)

foreign import data ResizeObserver ∷ Type

type ResizeObserverSize =
  { inlineSize ∷ Number
  , blockSize ∷ Number
  }

type ResizeObserverEntry =
  { target ∷ Element
  , contentRect ∷ DOMRect
  , borderBoxSize ∷ ResizeObserverSize
  , contentBoxSize ∷ ResizeObserverSize
  , devicePixelContentBoxSize ∷ ResizeObserverSize
  }

data ResizeObserverBoxOptions
  = BorderBox
  | ContentBox
  | DevicePixelContentBox

optionsToFFI ∷ ResizeObserverBoxOptions -> String
optionsToFFI BorderBox = "border-box"
optionsToFFI ContentBox = "content-box"
optionsToFFI DevicePixelContentBox = "device-pixel-content-box"

foreign import resizeObserver
  ∷ (Array ResizeObserverEntry -> ResizeObserver -> Effect Unit)
  -> Effect ResizeObserver

foreign import _observe ∷ ∀ r. Element -> Record r -> ResizeObserver -> Effect Unit

observe
  ∷ ResizeObserverBoxOptions
  -> ResizeObserver
  -> Element
  -> Effect Unit
observe options observer element =
  _observe element { box: optionsToFFI options } observer

foreign import unobserve ∷ ResizeObserver -> Element -> Effect Unit

foreign import disconnect ∷ ResizeObserver -> Effect Unit
