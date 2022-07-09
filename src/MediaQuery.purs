module MediaQuery where

import Effect (Effect)
import MediaQuery.Types (MediaQueryList)
import Web.HTML (Window)

foreign import matchMedia ∷ String → Window → Effect MediaQueryList

foreign import matches ∷ MediaQueryList → Effect Boolean