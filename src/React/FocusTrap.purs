module React.FocusTrap (focusTrap) where

import Prelude
import Effect (Effect)
import Prim.Row (class Union)
import React.Basic (ReactComponent)
import Web.HTML (HTMLElement)

foreign import focusTrap_ ∷ ∀ p. ReactComponent { | p }

focusTrap ∷ ∀ p q. Union p q Props => ReactComponent { | p }
focusTrap = focusTrap_

type Props =
  ( focusTrapOptions ∷
    { onActivate ∷ Effect Unit
    , onDeactivate ∷ Effect Unit
    }
  , active ∷ Boolean
  , paused ∷ Boolean
  , containerElements ∷ Array HTMLElement
  )
