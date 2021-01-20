module Yoga.Block.Hook.UseDocumentSize where

import Prelude
import Data.Maybe (maybe)
import Data.Newtype (class Newtype)
import React.Basic.Hooks (Hook, UseLayoutEffect, UseState, coerceHook, (/\))
import React.Basic.Hooks as React
import Web.DOM.Document as Document
import Web.DOM.Element as Element
import Web.HTML as HTML
import Web.HTML.HTMLDocument as HTMLDocument
import Web.HTML.Window as Window

type DocumentSize =
  { scrollHeight ∷ Number, scrollWidth ∷ Number }

newtype UseDocumentSize hooks = UseDocumentSize
  ( UseLayoutEffect Unit
      (UseState DocumentSize hooks)
  )

derive instance newtypeUseDocumentSize ∷ Newtype (UseDocumentSize hooks) _

useDocumentSize ∷ Hook UseDocumentSize DocumentSize
useDocumentSize =
  coerceHook React.do
    scrollDimensions /\ setScrollDimensions <- React.useState' one
    React.useLayoutEffectAlways do
      window <- HTML.window
      htmlDocument <- Window.document window
      let document = HTMLDocument.toDocument htmlDocument
      scrollDimensions' <- do
        maybeDocumentElement <- Document.documentElement document
        maybeDocumentElement
          # maybe (pure zero) \documentElement -> do
              scrollWidth <- Element.scrollWidth documentElement
              scrollHeight <- Element.scrollHeight documentElement
              pure { scrollWidth, scrollHeight }
      unless (scrollDimensions' == scrollDimensions) do
        setScrollDimensions scrollDimensions'
      mempty
    pure scrollDimensions
