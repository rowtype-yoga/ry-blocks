-- this comes from Lumi, it's great
module Yoga.Block.Organism.Form.Validation
  ( Validator
  , nonEmpty
  , nonEmptyArray
  , nonNull
  , nonEmpty'
  , nonEmptyArray'
  , nonNull'
  , mustEqual
  , mustBe
  , validNumber
  , validInt
  , validDate
  , validNumber'
  , validNatBetween'
  , validNatBetween
  , validInt'
  , validDate'
  , optional
  , Validated(..)
  , _Validated
  , _Fresh
  , _Modified
  , setFresh
  , setModified
  , ModifyValidated(..)
  , ModifyValidatedProxy(..)
  , class CustomModifyValidated
  , customModifyValidated
  , class CanValidate
  , fresh
  , modified
  , fromValidated
  , validated
  -- , warn
  ) where

import Yoga.Prelude.View
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty (fromArray) as NEA
import Data.Date as Date
import Data.Either (either)
import Data.Enum (toEnum)
import Data.Eq (class Eq1)
import Data.Function (on)
import Data.Generic.Rep (class Generic, from, to)
import Data.Int as Int
import Data.Lens (Lens, Prism', lens, over, prism', review, view)
import Data.Lens.Iso.Newtype (_Newtype)
import Data.Newtype (class Newtype, un)
import Data.Number as Number
import Data.Ord (class Ord1)
import Data.String.Common (split)
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty (fromString) as NES
import Data.String.Pattern (Pattern(..))
import Data.Symbol (class IsSymbol, reflectSymbol, reifySymbol)
import Data.Traversable (traverse)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Generic (class Decode, class Encode, decode, encode)
import Framer.Motion (makeVariantLabels)
import Framer.Motion as Motion
import Heterogeneous.Mapping (class MapRecordWithIndex, class Mapping, ConstMapping, hmap, mapping)
import Prim.Row (class Cons)
import Prim.RowList as RL
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as React
import Record.Unsafe (unsafeSet)
import Type.Data.Peano as Peano
import Type.Prelude (Proxy(..))
import Yoga.Block as Block
import Yoga.Block.Container.Style (colour)
import Yoga.Block.Organism.Form.Internal (Forest, FormBuilder, FormBuilder'(..), Tree(..))

-- | A `Validator` takes a possibly invalid form `result` and produces
-- | a `valid` result, or an error message.
type Validator result valid =
  result -> Either String valid

-- | A `WarningValidator` can be used to issue a message to the user on
-- | certain form data, but cannot cause the form to fail. Accordingly,
-- | it cannot modify the form data value or type.
type WarningValidator result =
  result -> Maybe String

-- | A `Validator` which verifies that an input string is non-empty.
nonEmpty ∷ String -> Validator String NonEmptyString
nonEmpty name = nonEmpty' (name <> " is required")

-- | `nonEmpty`, but the argument is the entire validation message.
nonEmpty' ∷ String -> Validator String NonEmptyString
nonEmpty' msg = note msg <<< NES.fromString

-- | A `Validator` which verifies that an input array is non-empty.
nonEmptyArray ∷ ∀ a. String -> Validator (Array a) (NonEmptyArray a)
nonEmptyArray name = nonEmptyArray' (name <> " cannot be empty")

-- | `nonEmptyArray`, but the argument is the entire validation message.
nonEmptyArray' ∷ ∀ a. String -> Validator (Array a) (NonEmptyArray a)
nonEmptyArray' msg = note msg <<< NEA.fromArray

-- | A `Validator` which verifies that an optional field is specified.
nonNull ∷ ∀ a. String -> Validator (Maybe a) a
nonNull name = nonNull' (name <> " is required")

-- | `nonNull`, but the argument is the entire validation message.
nonNull' ∷ ∀ a. String -> Validator (Maybe a) a
nonNull' msg = note msg

-- | A `Validator` which verifies that its input equals some value.
mustEqual ∷ ∀ a. Eq a => a -> String -> Validator a a
mustEqual value1 = mustBe (_ == value1)

-- | A `Validator` which verifies that its input fulfills a specified condition.
mustBe ∷ ∀ a. (a -> Boolean) -> String -> Validator a a
mustBe cond error value
  | cond value = pure value
  | otherwise = Left error

-- | A `Validator` which verifies that its input can be parsed as a number.
validNumber ∷ String -> Validator String Number
validNumber name = validNumber' (name <> " must be a number")

-- | `validNumber`, but the argument is the entire validation message.
validNumber' ∷ String -> Validator String Number
validNumber' msg = note msg <<< Number.fromString

-- | A `Validator`, which ensures a number is inclusively between two positive 
-- | integers
validNatBetween ∷
  ∀ minStr maxStr min max subtracted.
  Peano.ParseNat minStr min =>
  Peano.ParseNat maxStr max =>
  Peano.IsNat min =>
  Peano.IsNat max =>
  Peano.IsNat subtracted =>
  Peano.SumInt (Peano.Pos max) (Peano.Neg min) (Peano.Pos subtracted) =>
  Proxy minStr -> Proxy maxStr -> String -> Validator String Int
validNatBetween minProxy maxProxy name = do
  validNatBetween' minProxy maxProxy \min max ->
    name <> " must be between " <> show min <> " and " <> show max

validNatBetween' ∷
  ∀ minSymbol maxSymbol min max subtracted.
  Peano.ParseNat minSymbol min =>
  Peano.ParseNat maxSymbol max =>
  Peano.IsNat min =>
  Peano.IsNat max =>
  Peano.IsNat subtracted =>
  Peano.SumInt (Peano.Pos max) (Peano.Neg min) (Peano.Pos subtracted) =>
  Proxy minSymbol -> Proxy maxSymbol -> (Int -> Int -> String) -> Validator String Int
validNatBetween' minSymbolProxy maxSymbolProxy msg rawString = case Int.fromString rawString of
  Just parseableInt
    | between minInt maxInt parseableInt -> Right parseableInt
  _ -> Left (msg minInt maxInt)
  where
  minInt ∷ Int
  minInt = Peano.reflectNat (Peano.parseNat minSymbolProxy)

  maxInt ∷ Int
  maxInt = Peano.reflectNat (Peano.parseNat maxSymbolProxy)

-- | A `Validator` which verifies that its input can be parsed as an integer.
validInt ∷ String -> Validator String Int
validInt name = validInt' (name <> " must be a whole number")

-- | `validInt`, but the argument is the entire validation message.
validInt' ∷ String -> Validator String Int
validInt' msg = note msg <<< Int.fromString

-- | A `Validator` which verifies that its input can be parsed as a date.
-- | Dates are of the format "YYYY-MM-DD".
validDate ∷ String -> Validator String Date.Date
validDate name = validDate' (name <> " must be a date")

-- | `validDate`, but the argument is the entire validation message.
validDate' ∷ String -> Validator String Date.Date
validDate' msg input = note msg result
  where
  result = case traverse Int.fromString $ split (Pattern "-") input of
    Just [ y, m, d ] -> join $ Date.exactDate <$> toEnum y <*> toEnum m <*> toEnum d
    _ -> Nothing

-- | Modify a `Validator` to accept empty strings in addition to anything it
-- | already accepts. The empty string is mapped to `Nothing`, and any other
-- | valid input is mapped to `Just` the result of the original validator.
optional ∷ ∀ a. Validator String a -> Validator String (Maybe a)
optional _ "" = pure Nothing

optional v s = map Just (v s)

-- | The `Validated` type describes the state of a validated form field. This
-- | state may be used to modify the way this form field or its validation
-- | messages are displayed.
-- |
-- | TODO: maybe convert this type to a record? Possible extensions to this
-- | type (as a record) could be a field `valid :: Boolean` to display an
-- | indicator that the field is valid, or a field
-- | `validating :: Maybe (Canceler a)` to control form fields with asynchronous
-- | validation.
data Validated a
  = Fresh a
  | Modified a

derive instance eqValidated ∷ Eq a => Eq (Validated a)
derive instance eq1Validated ∷ Eq1 Validated
derive instance ordValidated ∷ Ord a => Ord (Validated a)
derive instance ord1Validated ∷ Ord1 Validated
derive instance functorValidated ∷ Functor Validated

instance applyValidated ∷ Apply Validated where
  apply (Fresh f) r = f <$> r
  apply (Modified f) (Fresh a) = Modified (f a)
  apply (Modified f) (Modified a) = Modified (f a)

instance applicativeValidated ∷ Applicative Validated where
  pure = Fresh

instance genericValidated ∷ Generic value rep => Generic (Validated value) rep where
  to = Fresh <<< to
  from (Fresh value) = from value
  from (Modified value) = from value

instance decodeValidated ∷ Decode value => Decode (Validated value) where
  decode value = Fresh <$> decode value

instance encodeValidated ∷ Encode value => Encode (Validated value) where
  encode (Fresh value) = encode value
  encode (Modified value) = encode value

-- | Lens for viewing and modifying `Validated` values.
_Validated ∷ ∀ a b. Lens (Validated a) (Validated b) a b
_Validated =
  flip lens ($>)
    $ case _ of
        Fresh a -> a
        Modified a -> a

-- | Prism for the `Fresh` constructor of `Validated`.
_Fresh ∷ ∀ a. Prism' (Validated a) a
_Fresh =
  prism' Fresh
    $ case _ of
        Fresh a -> Just a
        _ -> Nothing

-- | Prism for the `Modified` constructor of `Validated`.
_Modified ∷ ∀ a. Prism' (Validated a) a
_Modified =
  prism' Modified
    $ case _ of
        Modified a -> Just a
        _ -> Nothing

-- | Sets all `Validated` fields in a record to `Fresh`, hiding all validation
-- | messages.
setFresh ∷
  ∀ value.
  Mapping ModifyValidated value value =>
  value ->
  value
setFresh = mapping (ModifyValidated (Fresh <<< view _Validated))

-- | Sets all `Validated` fields in a record to `Modified`, showing all
-- | validation messages.
setModified ∷
  ∀ value.
  Mapping ModifyValidated value value =>
  value ->
  value
setModified = mapping (ModifyValidated (Modified <<< view _Validated))

-- | Internal utility type for modifying the validated state of fields in
-- | records containing `Validated` values.
newtype ModifyValidated = ModifyValidated (Validated ~> Validated)

newtype ModifyValidatedProxy a = ModifyValidatedProxy a

unModifyValidatedProxy ∷ ∀ value. ModifyValidatedProxy value -> value
unModifyValidatedProxy (ModifyValidatedProxy value) = value

derive instance ntMVP ∷ Newtype (ModifyValidatedProxy a) _

instance eqValidatedNewtype ∷ Eq value => Eq (ModifyValidatedProxy value) where
  eq = eq `on` unModifyValidatedProxy

instance ordValidatedNewtype ∷ Ord value => Ord (ModifyValidatedProxy value) where
  compare = compare `on` unModifyValidatedProxy

instance genericValidatedNewtype ∷ Generic value rep => Generic (ModifyValidatedProxy value) rep where
  to = ModifyValidatedProxy <<< to
  from = from <<< unModifyValidatedProxy

instance decodeValidatedNewtype ∷ Decode value => Decode (ModifyValidatedProxy value) where
  decode value = ModifyValidatedProxy <$> decode value

instance encodeValidatedNewtype ∷ Encode value => Encode (ModifyValidatedProxy value) where
  encode (ModifyValidatedProxy value) = encode value

class CustomModifyValidated a where
  customModifyValidated ∷ ModifyValidated -> a -> a

instance modifyValidated ∷ Mapping ModifyValidated a a => Mapping ModifyValidated (Validated a) (Validated a) where
  mapping m@(ModifyValidated f) = over _Validated (mapping m) <<< f
else instance modifyValidatedRecord ∷
  (RL.RowToList r xs, MapRecordWithIndex xs (ConstMapping ModifyValidated) r r) =>
  Mapping ModifyValidated { | r } { | r } where
  mapping d = hmap d
else instance modifyValidatedArray ∷ Mapping ModifyValidated a a => Mapping ModifyValidated (Array a) (Array a) where
  mapping d = map (mapping d)
else instance modifyValidatedMaybe ∷ Mapping ModifyValidated a a => Mapping ModifyValidated (Maybe a) (Maybe a) where
  mapping d = map (mapping d)
else instance modifyValidatedProxy ∷ (CustomModifyValidated a, Mapping ModifyValidated a a) => Mapping ModifyValidated (ModifyValidatedProxy a) (ModifyValidatedProxy a) where
  mapping f = over _Newtype (customModifyValidated f)
else instance modifyValidatedIdentity ∷ Mapping ModifyValidated a a where
  mapping _ = identity

-- | Internal utility type class used to flatten repeated applications of
-- | `Validated` to a type.
class CanValidate u v | u -> v where
  fresh ∷ Prism' (Validated v) u
  modified ∷ Prism' (Validated v) u
  fromValidated ∷ Validated v -> u

instance canValidateValidated ∷ CanValidate (Validated a) a where
  fresh = identity
  modified = identity
  fromValidated = identity
else instance canValidateAny ∷ CanValidate a a where
  fresh = _Fresh
  modified = _Modified
  fromValidated = view _Validated

-- | Attach a validation function to a `FormBuilder p u a`, producing a new
-- | `FormBuilder` that takes a `Validated u` as form state and displays an
-- | error message if its form data is invalid.
-- |
-- | This `Validated` data type describes a form field as either `Fresh` or
-- | `Modified`, so that validation messages are only displayed if the field
-- | is `Modified`.
validated ∷
  ∀ props unvalidated validated result result_.
  CanValidate unvalidated validated =>
  Validator result_ result ->
  FormBuilder { readOnly ∷ Boolean, validationError ∷ Maybe (Maybe String) | props } unvalidated result_ ->
  FormBuilder { readOnly ∷ Boolean | props } (Validated validated) result
validated runValidator editor =
  FormBuilder \props@{ readOnly } (v ∷ Validated validated) -> do
    let
      value ∷ unvalidated
      value = fromValidated v
      innerColumn_ =
        Block.stack
          </* { className: "ry-form-inner-column"
            , space: E.str "0"
            , css:
              E.css
                { maxWidth: E.str "100%"
                , margin: E.str "0"
                }
            }
      validationMessage ∷ Maybe validated
      validationMessage = case v of
        Fresh _ -> Nothing
        Modified m -> Just m
      { edit, validate } = un FormBuilder editor (props # upsert (Proxy ∷ _ "validationError") (Nothing)) value
      modify ∷ Maybe String -> Forest -> Forest
      modify message forest = case Array.unsnoc forest of
        Nothing -> [ Child { key: Nothing, child: errChild } ]
        Just { init, last: Child c } -> Array.snoc init (Child c { child = innerColumn_ [ c.child, errChild ] })
        Just { init, last: Wrapper c } -> Array.snoc init (Wrapper c { children = modify message c.children })
        Just { init, last: Node n } -> Array.snoc init (Node n { validationError = message })
        where
        errLine = guard (not readOnly) message # foldMap R.text

        errChild = errorChild </> { errorLine: errLine, message }
      -- The validation can produce either a valid result, an error message, or
      -- none in the case where the form is Fresh.
      res ∷ Maybe (Either String result)
      res = do
        valid <- validate
        case v of
          Fresh _ -> pure <$> hush (runValidator valid)
          _ -> pure $ runValidator valid
      err = either pure (const Nothing) =<< res
      finalResult = un FormBuilder editor (props # upsert (Proxy ∷ _ "validationError") (res <#> either Just (const Nothing))) value
    { edit:
      \onChange ->
        (modify err <<< finalResult.edit)
          ( onChange
              <<< \f -> case _ of
                  v'@(Fresh u) -> review modified (f (fromValidated v'))
                  v'@(Modified u) -> review modified (f (fromValidated v'))
          )
    , validate: hush =<< res
    }

errorChild ∷ ReactComponent { errorLine ∷ JSX, message ∷ Maybe _ }
errorChild =
  unsafePerformEffect
    $ reactComponent "Error Child" \{ message, errorLine } -> React.do
        expanded /\ setExpanded <- React.useState' false
        let
          variants =
            { hidden:
              const
                { y: "-100%"
                , height: "auto"
                }
            , visible:
              { y: "0%"
              , transition: { type: "tween", delay: 0.75 }
              }
            }
        let variant = makeVariantLabels variants
        pure
          $ R.div'
          </* { className: "ry-validation-error"
            , css:
              E.css
                { fontSize: E.str "calc(var(--s0) * 0.8)"
                , fontWeight: E.str "400"
                , height: E.str "calc(var(--s0) + var(--s-4))"
                , margin: E.str "0 var(--s-1) 0 var(--s-1)"
                , overflow: E.str $ if expanded then "visible" else "hidden"
                }
            }
          /> [ Motion.animatePresence </ {}
                /> case message of
                    Just vm ->
                      [ Motion.div
                          </* { variants: Motion.variants variants
                            , initial: Motion.initial variant.hidden
                            , animate: Motion.animate variant.visible
                            , exit: Motion.exit $ variant.hidden
                            , className: "ry-validation-error"
                            , css:
                              E.css
                                { color: E.str colour.invalidText
                                , background: E.str colour.invalid
                                , padding: E.str "4px"
                                , paddingTop: E.str "2px"
                                , borderRadius: E.str "0 0 8px 8px"
                                }
                            }
                          /> [ motionReadMore
                                </ Motion.withMotion
                                    { background: colour.invalid
                                    , onMoreClicked: setExpanded true
                                    , onLessClicked: setExpanded false
                                    }
                                    { layout: Motion.layout false
                                    }
                                /> [ R.span'
                                      </* { className: "ry-validation-error"
                                        , css: E.css {}
                                        }
                                      /> [ errorLine ]
                                  ]
                            ]
                      ]
                    _ -> mempty
            ]
  where
  motionReadMore = unsafePerformEffect $ Motion.custom Block.readMore

upsert ∷
  ∀ proxy r1 r2 r l a.
  IsSymbol l =>
  Cons l a r r2 =>
  proxy l ->
  a ->
  Record r1 ->
  Record r2
upsert l a r = unsafeSet (reflectSymbol l) a r

-- -- | Attach a validation function to a `FormBuilder p u a`, producing a new
-- -- | `FormBuilder` that takes a `Validated u` as form state and displays a
-- -- | warning message if its form data triggers a warning, while still allowing
-- -- | the form to proceed.
-- warn ∷
--   ∀ props unvalidated validated result.
--   CanValidate unvalidated validated =>
--   WarningValidator result ->
--   FormBuilder { readOnly ∷ Boolean | props } unvalidated result ->
--   FormBuilder { readOnly ∷ Boolean | props } (Validated validated) result
-- warn warningValidator editor =
--   FormBuilder \props@{ readOnly } v ->
--     let
--       { edit, validate } = un FormBuilder editor props (fromValidated v)
--       innerColumn_ =
--         Block.cluster
--           </ { style: R.css { maxWidth: "100%", maxHeight: "100%" }
--             }
--       modify ∷ Forest -> Forest
--       modify forest = case Array.unsnoc forest of
--         Nothing -> [ Child { key: Nothing, child: errLine  } ]
--         Just { init, last: Child c } -> Array.snoc init (Child c { child = innerColumn_ [ c.child, errLine ] })
--         Just { init, last: Wrapper c } -> Array.snoc init (Wrapper c { children = modify c.children })
--         Just { init, last: Node n } -> Array.snoc init (Node n { validationError = message })
--       errLine ∷ JSX
--       errLine = guard (not readOnly) message # foldMap R.text
--       message ∷ Maybe String
--       message = case v of
--         Fresh _ -> Nothing
--         _ -> warningValidator =<< validate
--     in
--       { edit:
--         \onChange ->
--           (modify <<< edit)
--             ( onChange
--                 <<< \f -> case _ of
--                     v'@(Fresh u) -> review modified (f (fromValidated v'))
--                     v'@(Modified u) -> review modified (f (fromValidated v'))
--             )
--       , validate
--       }
