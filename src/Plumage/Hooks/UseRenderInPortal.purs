module Plumage.Hooks.UseRenderInPortal
  ( UseRenderInPortal(..)
  , useRenderInPortal
  ) where

import Yoga.Prelude.View

import Data.Maybe (isNothing)
import Data.Newtype (class Newtype)
import React.Basic.DOM (createPortal)
import React.Basic.Hooks as React
import Web.DOM (Element)
import Yoga.Block.Internal (findElementByIdInDocument)

newtype UseRenderInPortal hooks = UseRenderInPortal
  (UseEffect Unit (UseState (Maybe Element) hooks))

derive instance Newtype (UseRenderInPortal hooks) _

useRenderInPortal ∷ String → Hook UseRenderInPortal (JSX → JSX)
useRenderInPortal portalId = coerceHook React.do
  portalʔ /\ setPortal ← React.useState' Nothing
  let renderInPortal jsx = portalʔ # foldMap (createPortal jsx)
  useEffectOnce do
    when (portalʔ # isNothing) do
      findElementByIdInDocument portalId >>= setPortal
    mempty
  pure renderInPortal