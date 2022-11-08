module Storybook.CSFTools.Types where

foreign import data CsfFile :: Type

type CsfOptions = {
  fileName :: String,
  makeTitle :: String -> String
}
