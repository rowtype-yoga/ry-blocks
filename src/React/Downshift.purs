module React.Downshift where

import Prelude
import Data.Maybe (Maybe)
import Effect (Effect)
import Effect.Uncurried (runEffectFn1)
import Prim.Row (class Union)
import React.Basic.Hooks (Hook, unsafeHook)
import React.Downshift.Internal (useSelectImpl)
import React.Downshift.Types (UseSelectDataImpl, UseSelectPropsImpl)
import React.Downshift.Types.StateChangeType (StateChangeType)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block.Internal (OptionalProp, Id)

type UseSelectPropsR f a =
  ( items ∷ Array a
  , itemToString ∷ f (a -> String)
  , onSelectedItemChange ∷ f ({ type ∷ StateChangeType, selectedItem ∷ Maybe a } -> Effect Unit)
  )

type UseSelectProps f a =
  Record (UseSelectPropsR f a)

type UseSelectData a =
  UseSelectDataImpl a

-- https://gist.github.com/reactormonk/974797077929efd5ae899b9e8eaac65d
useSelect ∷ ∀ a p q. Union p q (UseSelectPropsR Id a) => { items ∷ Array a | p } -> Hook (UseSelect a) (UseSelectData a)
useSelect props =
  map toUseSelectData
    $ unsafeHook
    $ runEffectFn1 useSelectImpl (toUseSelectProps props)

toUseSelectData ∷ ∀ a. UseSelectDataImpl a -> UseSelectData a
toUseSelectData = identity

toUseSelectProps ∷ ∀ a. ∀ p q. Union p q (UseSelectPropsR Id a) => { items ∷ Array a | p } -> UseSelectPropsImpl a
toUseSelectProps realProps = unsafeCoerce props
  where
  props ∷ { | UseSelectPropsR OptionalProp a }
  props = unsafeCoerce realProps

foreign import data UseSelect ∷ Type -> Type -> Type
