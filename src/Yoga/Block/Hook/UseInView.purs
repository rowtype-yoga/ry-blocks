module Yoga.Block.Hook.UseInView where

import Prelude
import Data.Maybe (Maybe)
import Data.Nullable (Nullable)
import Data.Nullable as Nullable
import Data.Time.Duration (Milliseconds)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Prim.Row (class Union)
import React.Basic.Hooks (Hook, unsafeHook)
import Untagged.Union (UndefinedOr, uorToMaybe)
import Web.DOM (Element)
import Yoga.Block.Internal (NodeRef)

foreign import data IntersectionObserverEntry ∷ Type

foreign import data UseInView ∷ Type → Type

type IntersectionOptions =
  ( root ∷ Element
  , rootMargin ∷ String
  , threshold ∷ Number
  , triggerOnce ∷ Boolean
  , skip ∷ Boolean
  , initialInView ∷ Boolean
  , trackVisibility ∷ Boolean
  , delay ∷ Milliseconds
  )

type InViewResultImpl =
  { inView ∷ Boolean
  , ref ∷ NodeRef -- not true
  , entry ∷ UndefinedOr (Nullable IntersectionObserverEntry)
  }

type InViewResult =
  { inView ∷ Boolean
  , ref ∷ NodeRef -- not true
  , entry ∷ Maybe IntersectionObserverEntry
  }

foreign import useInViewImpl ∷ ∀ r. EffectFn1 { | r } InViewResultImpl

useInView ∷
  ∀ p p_.
  Union p p_ IntersectionOptions ⇒
  { | p } →
  Hook UseInView InViewResult
useInView props =
  unsafeHook
    $ runEffectFn1 useInViewImpl props
        <#> \x → x { entry = uorToMaybe x.entry >>= Nullable.toMaybe }
