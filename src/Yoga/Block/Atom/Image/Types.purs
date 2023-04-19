module Yoga.Block.Atom.Image.Types
  ( CrossOrigin
  , Decoding
  , Loading
  , ReferrerPolicy
  , crossOriginAnonymous
  , crossOriginUseCredentials
  , decodingAsync
  , decodingSync
  , loadingEager
  , loadingLazy
  , refererPolicyNoReferrerWhenDowngrade
  , referrerPolicyNever
  , referrerPolicyNoReferrer
  , referrerPolicyOrigin
  , referrerPolicyOriginWhenCrossOrigin
  , referrerPolicySameOrigin
  , referrerPolicySameOriginWhenCrossOrigin
  , referrerPolicyStrictOrigin
  , referrerPolicyStrictOriginWhenCrossOrigin
  , referrerPolicyUnsafeUrl
  ) where

import Prelude

newtype CrossOrigin = CrossOrigin String

derive instance Eq CrossOrigin
derive instance Ord CrossOrigin
derive newtype instance Show CrossOrigin

crossOriginAnonymous ∷ CrossOrigin
crossOriginAnonymous = CrossOrigin "anonymous"

crossOriginUseCredentials ∷ CrossOrigin
crossOriginUseCredentials = CrossOrigin "use-credentials"

newtype Decoding = Decoding String

derive instance Eq Decoding
derive instance Ord Decoding
derive newtype instance Show Decoding

decodingSync ∷ Decoding
decodingSync = Decoding "sync"

decodingAsync ∷ Decoding
decodingAsync = Decoding "async"

newtype Loading = Loading String

derive instance Eq Loading
derive instance Ord Loading
derive newtype instance Show Loading

loadingEager ∷ Loading
loadingEager = Loading "eager"

loadingLazy ∷ Loading
loadingLazy = Loading "lazy"

newtype ReferrerPolicy = ReferrerPolicy String

derive instance Eq ReferrerPolicy
derive instance Ord ReferrerPolicy
derive newtype instance Show ReferrerPolicy

referrerPolicyNoReferrer ∷ ReferrerPolicy
referrerPolicyNoReferrer = ReferrerPolicy "no-referrer"

refererPolicyNoReferrerWhenDowngrade ∷ ReferrerPolicy
refererPolicyNoReferrerWhenDowngrade = ReferrerPolicy
  "no-referrer-when-downgrade"

referrerPolicyOrigin ∷ ReferrerPolicy
referrerPolicyOrigin = ReferrerPolicy "origin"

referrerPolicyOriginWhenCrossOrigin ∷ ReferrerPolicy
referrerPolicyOriginWhenCrossOrigin = ReferrerPolicy "origin-when-cross-origin"

referrerPolicyUnsafeUrl ∷ ReferrerPolicy
referrerPolicyUnsafeUrl = ReferrerPolicy "unsafe-url"

referrerPolicyStrictOrigin ∷ ReferrerPolicy
referrerPolicyStrictOrigin = ReferrerPolicy "strict-origin"

referrerPolicyStrictOriginWhenCrossOrigin ∷ ReferrerPolicy
referrerPolicyStrictOriginWhenCrossOrigin = ReferrerPolicy
  "strict-origin-when-cross-origin"

referrerPolicySameOrigin ∷ ReferrerPolicy
referrerPolicySameOrigin = ReferrerPolicy "same-origin"

referrerPolicySameOriginWhenCrossOrigin ∷ ReferrerPolicy
referrerPolicySameOriginWhenCrossOrigin = ReferrerPolicy
  "same-origin-when-cross-origin"

referrerPolicyNever ∷ ReferrerPolicy
referrerPolicyNever = ReferrerPolicy "never"
