module Yoga.Block.Atom.Button.Types where

import Prelude

import Data.Bounded.Generic (genericBottom, genericTop)
import Data.Enum (class BoundedEnum, class Enum)
import Data.Enum.Generic (genericCardinality, genericFromEnum, genericPred, genericSucc, genericToEnum)
import Data.Generic.Rep (class Generic)
import Yoga.JSON (class ReadForeign, class WriteForeign)
import Yoga.JSON.Generics (genericReadForeignEnum, genericWriteForeignEnum)

data ButtonType
  = Primary
  | Dangerous
  | Generic

derive instance Generic ButtonType _
derive instance Eq ButtonType
derive instance Ord ButtonType
instance WriteForeign ButtonType where
  writeImpl = genericWriteForeignEnum { toConstructorName: identity }

instance ReadForeign ButtonType where
  readImpl = genericReadForeignEnum { toConstructorName: identity }

instance Enum ButtonType where
  succ = genericSucc
  pred = genericPred

instance Bounded ButtonType where
  bottom = genericBottom
  top = genericTop

instance BoundedEnum ButtonType where
  cardinality = genericCardinality
  fromEnum = genericFromEnum
  toEnum = genericToEnum

renderButtonType ∷ ButtonType -> String
renderButtonType = case _ of
  Primary -> "primary"
  Generic -> "generic"
  Dangerous -> "dangerous"

data ButtonShape
  = Rounded
  | Pill
  | Flat

derive instance Generic ButtonShape _
derive instance Eq ButtonShape
derive instance Ord ButtonShape
instance WriteForeign ButtonShape where
  writeImpl = genericWriteForeignEnum { toConstructorName: identity }

instance ReadForeign ButtonShape where
  readImpl = genericReadForeignEnum { toConstructorName: identity }

instance Enum ButtonShape where
  succ = genericSucc
  pred = genericPred

instance Bounded ButtonShape where
  bottom = genericBottom
  top = genericTop

instance BoundedEnum ButtonShape where
  cardinality = genericCardinality
  fromEnum = genericFromEnum
  toEnum = genericToEnum

renderButtonShape ∷ ButtonShape -> String
renderButtonShape = case _ of
  Rounded -> "rounded"
  Pill -> "pill"
  Flat -> "flat"
