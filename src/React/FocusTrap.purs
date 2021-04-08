module React.FocusTrap (focusTrap) where

import Prelude
import Effect (Effect)
import Prim.Row (class Union)
import React.Basic (JSX, ReactComponent)
import Web.DOM (Node)
import Web.HTML (HTMLElement)

foreign import focusTrap_ ∷ ∀ p. ReactComponent { | p }

focusTrap ∷ ∀ p q. Union p q Props => ReactComponent { | p }
focusTrap = focusTrap_

type Props =
  ( focusTrapOptions ∷
    { onActivate ∷ Effect Unit
    , onDeactivate ∷ Effect Unit
    , initialFocus ∷ Effect Node
    , fallbackFocus ∷ Effect Node
    }
  , active ∷ Boolean
  , paused ∷ Boolean
  , containerElements ∷ Array HTMLElement
  , children ∷ JSX
  )
