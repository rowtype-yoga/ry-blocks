module React.Downshift.Internal where

import Effect.Uncurried (EffectFn1)
import React.Downshift.Types (UseSelectPropsImpl, UseSelectDataImpl)

foreign import useSelectImpl
  ∷ ∀ a
  . EffectFn1
      (UseSelectPropsImpl a)
      (UseSelectDataImpl a)
