module Storybook.CSFTools where

import Effect (Effect)
import Storybook.CSFTools.Types (CsfFile, CsfOptions)

foreign import parseCsf :: String -> CsfOptions -> Effect CsfFile

foreign import formatCsf :: CsfFile -> Effect String

foreign import getStoryNames :: CsfFile -> Effect (Array String)

foreign import setStoryCode :: { storyName :: String, code :: String } -> CsfFile -> Effect CsfFile
