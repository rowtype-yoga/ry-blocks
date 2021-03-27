module Yoga.Block.Organism.Form
  ( module Defaults
  , module Yoga.Block.Organism.Form.Internal
  , module Validation
  , build
  , build'
  , defaultRenderForm
  , defaultRenderForest
  , useForm
  , useForm'
  , formState
  , inputBox
  , static
  , focus
  , match
  , match_
  , withProps
  , withValue
  , mapProps
  , mapUI
  , mapUI_
  , indent
  , wrap
  , filterWithProps
  , withKey
  ) where

import Yoga.Prelude.View
import Data.Array as Array
import Data.Foldable (surround)
import Data.Lens (Lens', Prism, Prism', matching, review, view)
import Data.Newtype (un)
import Data.String as String
import Data.String.NonEmpty (NonEmptyString)
import Effect.Unsafe (unsafePerformEffect)
import Foreign.Object (Object)
import Foreign.Object as Object
import Heterogeneous.Mapping (class Mapping)
import Prim.Row (class Lacks, class Nub)
import React.Basic.DOM as R
import React.Basic.Emotion as E
import React.Basic.Hooks (reactComponent)
import React.Basic.Hooks as Hooks
import Record (disjointUnion)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.Block as Block
import Yoga.Block.Atom.Input as Input
import Yoga.Block.Atom.Input.Types (HTMLInputType)
import Yoga.Block.Atom.Input.Types as HTMLInputType
import Yoga.Block.Organism.Form.Defaults (formDefaults) as Defaults
import Yoga.Block.Organism.Form.Internal (Forest, FormBuilder, FormBuilder'(..), Tree(..), formBuilder, formBuilder_, pruneTree)
import Yoga.Block.Organism.Form.Types (RequiredField(..))
import Yoga.Block.Organism.Form.Validation (ModifyValidated(..), Validated(..), Validator, _Validated, fromValidated, mustBe, mustEqual, nonEmpty, nonEmptyArray, nonNull, nonEmpty', nonEmptyArray', nonNull', optional, setFresh, setModified, validDate, validInt, validNumber, validDate', validInt', validNumber', validated, warn) as Validation

-- | Create a React component for a form from a `FormBuilder`.
-- |
-- | _Note_: this function should be fully applied, to avoid remounting
-- | the component on each render.
build ∷
  ∀ props unvalidated result.
  FormBuilder { readOnly ∷ Boolean | props } unvalidated result ->
  ReactComponent
    { value ∷ unvalidated
    , onChange ∷ (unvalidated -> unvalidated) -> Effect Unit
    , inlineTable ∷ Boolean
    , formProps ∷ { readOnly ∷ Boolean | props }
    }
build = build' defaultRenderForm

-- | Create a React component for a form from a `FormBuilder'` and a custom
-- | rendering function.
-- |
-- | _Note_: this function should be fully applied, to avoid remounting
-- | the component on each render.
build' ∷
  ∀ ui renderProps formProps unvalidated result.
  Lacks "children" renderProps =>
  Lacks "key" renderProps =>
  Lacks "ref" renderProps =>
  ({ | renderProps } -> formProps -> ui -> JSX) ->
  FormBuilder' ui formProps unvalidated result ->
  ReactComponent
    { value ∷ unvalidated
    , onChange ∷ (unvalidated -> unvalidated) -> Effect Unit
    , formProps ∷ formProps
    | renderProps
    }
build' render editor =
  unsafePerformEffect
    $ reactComponent "Form" \props@{ value, onChange, formProps } -> React.do
        let { edit } = un FormBuilder editor formProps value
        pure $ render (contractRenderProps props) formProps (edit onChange)
  where
  contractRenderProps ∷
    { value ∷ unvalidated
    , onChange ∷ (unvalidated -> unvalidated) -> Effect Unit
    , formProps ∷ formProps
    | renderProps
    } ->
    { | renderProps }
  contractRenderProps = unsafeCoerce

-- | The default Lumi implementation for rendering a forest of JSX
-- | form fields.
defaultRenderForm ∷
  ∀ props.
  { inlineTable ∷ Boolean
  } ->
  { readOnly ∷ Boolean
  | props
  } ->
  Forest ->
  JSX
defaultRenderForm renderProps@{ inlineTable } { readOnly } forest =
  R.div
    { className:
      String.joinWith " "
        $ fold
            [ [ "lumi-form" ]
            , guard inlineTable [ "inline-table" ]
            , guard readOnly [ "readOnly" ]
            ]
    , children:
      [ surround fieldDivider
          $ defaultRenderForest
          $ Array.mapMaybe pruneTree
          $ forest
      ]
    }
  where
  fieldDivider = R.hr { className: "lumi field-divider" }

defaultRenderForest ∷
  Forest ->
  Array JSX
defaultRenderForest =
  map case _ of
    Child { key, child } -> maybe identity keyed key $ child
    Wrapper { key, wrap: f, children } ->
      maybe identity keyed key
        $ f
        $ intercalate [ fieldDivider ]
        $ map pure
        $ defaultRenderForest
        $ children
    Node { label, key, required, validationError, children } ->
      maybe identity keyed key
        $ Block.cluster
        </ {}
        /> ( [ label ]
              <> [ intercalate fieldDivider (defaultRenderForest children) ]
              <> [ foldMap R.text validationError ]
          )
  where
  fieldDivider = R.hr {}

-- | Render a form with state managed automatically.
useForm ∷
  ∀ props unvalidated result.
  Mapping Validation.ModifyValidated unvalidated unvalidated =>
  FormBuilder
    { readOnly ∷ Boolean
    | props
    }
    unvalidated
    result ->
  { initialState ∷ unvalidated
  , inlineTable ∷ Boolean
  , formProps ∷ { readOnly ∷ Boolean | props }
  } ->
  Hooks.Hook (Hooks.UseState unvalidated)
    { formData ∷ unvalidated
    , setFormData ∷ (unvalidated -> unvalidated) -> Effect Unit
    , setModified ∷ Effect Unit
    , reset ∷ Effect Unit
    , validated ∷ Maybe result
    , form ∷ JSX
    }
useForm editor props = Hooks.do
  let
    renderer =
      defaultRenderForm
        { inlineTable: props.inlineTable
        }
        props.formProps
  f <- useForm' editor props.initialState props.formProps
  pure f { form = renderer f.form }

-- | Like `useForm`, but allows an alternative render implementation
-- | to be provided as an additional argument.
useForm' ∷
  ∀ ui props unvalidated result.
  Mapping Validation.ModifyValidated unvalidated unvalidated =>
  FormBuilder' ui props unvalidated result ->
  unvalidated ->
  props ->
  Hooks.Hook (Hooks.UseState unvalidated)
    { formData ∷ unvalidated
    , setFormData ∷ (unvalidated -> unvalidated) -> Effect Unit
    , setModified ∷ Effect Unit
    , reset ∷ Effect Unit
    , validated ∷ Maybe result
    , form ∷ ui
    }
useForm' editor initialState props = Hooks.do
  formData /\ setFormData <- Hooks.useState initialState
  let
    { edit, validate: validated } = un FormBuilder editor props formData
    ui = edit setFormData
  pure
    { formData
    , setFormData
    , setModified: setFormData Validation.setModified
    , reset: setFormData \_ -> initialState
    , validated
    , form: ui
    }

-- | Consume `useForm` as a render-prop component. Useful when `useForm`
-- | would be preferred but you don't want to migrate an entire component
-- | to React's hooks API.
-- |
-- | _Note_: this function should be fully applied, to avoid remounting
-- | the component on each render.
formState ∷
  ∀ props unvalidated result.
  Mapping Validation.ModifyValidated unvalidated unvalidated =>
  { initialState ∷ unvalidated
  , form ∷ FormBuilder { readOnly ∷ Boolean | props } unvalidated result
  , inlineTable ∷ Boolean
  , forceTopLabels ∷ Boolean
  , formProps ∷ { readOnly ∷ Boolean | props }
  , render ∷
    { formData ∷ unvalidated
    , setFormData ∷ (unvalidated -> unvalidated) -> Effect Unit
    , setModified ∷ Effect Unit
    , reset ∷ Effect Unit
    , validated ∷ Maybe result
    , form ∷ JSX
    } ->
    JSX
  } ->
  JSX
formState =
  unsafePerformEffect do
    Hooks.component "FormState" \props -> Hooks.do
      state <-
        useForm props.form
          { initialState: props.initialState
          , inlineTable: props.inlineTable
          , formProps: props.formProps
          }
      pure (props.render state)

-- | Create an always-valid `FormBuilder` that renders the supplied `JSX`.
static ∷ ∀ props value. JSX -> FormBuilder props value Unit
static edit = formBuilder \_ _ -> { edit: const edit, validate: pure unit }

-- | Focus a `FormBuilder` on a smaller piece of state, using a `Lens`.
focus ∷
  ∀ ui props s a result.
  Lens' s a ->
  FormBuilder' ui props a result ->
  FormBuilder' ui props s result
focus l e =
  FormBuilder \props s ->
    let
      { edit, validate } = un FormBuilder e props (view l s)
    in
      { edit: \k -> edit (k <<< l)
      , validate
      }

-- | Focus a `FormBuilder` on a possible type of state, using a `Prism`,
-- | ignoring validation.
match_ ∷
  ∀ ui props s a.
  Monoid ui =>
  Prism' s a ->
  FormBuilder' ui props a a ->
  FormBuilder' ui props s s
match_ p = match p p

-- | Focus a `FormBuilder` on a possible type of state, using a `Prism`.
-- |
-- | We need two `Prism`s in order to change the result type for
-- | validation purposes.
match ∷
  ∀ ui props result s t a.
  Monoid ui =>
  Prism s s a a ->
  Prism s t a result ->
  FormBuilder' ui props a result ->
  FormBuilder' ui props s t
match p1 p2 e =
  FormBuilder \props s -> case matching p2 s of
    Left t -> { edit: mempty, validate: pure t }
    Right a ->
      let
        { edit, validate } = un FormBuilder e props a
      in
        { edit: \k -> edit (k <<< p1)
        , validate: map (review p2) validate
        }

-- | Change the props type.
mapProps ∷
  ∀ ui p q u a.
  (q -> p) ->
  FormBuilder' ui p u a ->
  FormBuilder' ui q u a
mapProps f form = FormBuilder (un FormBuilder form <<< f)

-- | Change the UI type of a form.
mapUI_ ∷
  ∀ ui ui' props value result.
  (ui -> ui') ->
  FormBuilder' ui props value result ->
  FormBuilder' ui' props value result
mapUI_ f = mapUI \_ _ _ -> f

-- | Change the UI type of a form based on the props, the current value and the
-- | validated result.
mapUI ∷
  ∀ ui ui' props value result.
  (props -> value -> Maybe result -> ui -> ui') ->
  FormBuilder' ui props value result ->
  FormBuilder' ui' props value result
mapUI f form =
  FormBuilder \props value ->
    let
      { edit, validate } = un FormBuilder form props value
    in
      { edit: f props value validate <<< edit
      , validate
      }

-- | Make the props available. This allows for changing the structure of a form
-- | builder based on the current props.
withProps ∷
  ∀ ui props unvalidated result.
  (props -> FormBuilder' ui props unvalidated result) ->
  FormBuilder' ui props unvalidated result
withProps f = FormBuilder \props value -> un FormBuilder (f props) props value

-- | Make the value available. This allows for changing the structure of a form
-- | builder based on the current value.
withValue ∷
  ∀ ui props unvalidated result.
  (unvalidated -> FormBuilder' ui props unvalidated result) ->
  FormBuilder' ui props unvalidated result
withValue f = FormBuilder \props value -> un FormBuilder (f value) props value

-- | Indent a `Forest` of editors by one level, providing a label.
indent ∷
  ∀ props u a.
  String ->
  RequiredField ->
  FormBuilder props u a ->
  FormBuilder props u a
indent label required editor =
  FormBuilder \props val ->
    let
      { edit, validate } = un FormBuilder editor props val
    in
      { edit:
        \k ->
          pure
            $ Node
                { label: R.text label
                , key: Nothing
                , required: required
                , validationError: Nothing
                , children: edit k
                }
      , validate
      }

wrap ∷
  ∀ props u a.
  (Array JSX -> JSX) ->
  FormBuilder props u a ->
  FormBuilder props u a
wrap f form =
  FormBuilder \props value ->
    let
      { edit, validate } = un FormBuilder form props value
    in
      { edit:
        \k ->
          pure
            $ Wrapper
                { key: Nothing
                , wrap: f
                , children: edit k
                }
      , validate
      }

-- | Filter parts of the form based on the current value (and the props).
filterWithProps ∷
  ∀ ui props u a.
  Monoid ui =>
  (props -> u -> Boolean) ->
  FormBuilder' ui props u a ->
  FormBuilder' ui props u a
filterWithProps p editor =
  FormBuilder \props value ->
    let
      { edit, validate } = un FormBuilder editor props value
    in
      { edit:
        \onChange ->
          if p props value then
            edit onChange
          else
            mempty
      , validate
      }

-- | TODO: document
withKey ∷
  ∀ props u a.
  String ->
  FormBuilder props u a ->
  FormBuilder props u a
withKey key editor =
  FormBuilder \props value ->
    let
      { edit, validate } = un FormBuilder editor props value
    in
      { edit:
        \onChange ->
          edit onChange
            # Array.mapWithIndex case _, _ of
                i, Child a -> Child a { key = Just (key <> "--" <> show i) }
                i, Wrapper a -> Wrapper a { key = Just (key <> "--" <> show i) }
                i, Node n -> Node n { key = Just (key <> "--" <> show i) }
      , validate
      }

type InputFixedProps =
  ( value ∷ String
  , onChange ∷ EventHandler
  , label ∷ NonEmptyString
  , type ∷ HTMLInputType
  , _aria ∷ Object String
  , css ∷ E.Style
  , readOnly ∷ Boolean
  )

-- | A configurable input box makes a `FormBuilder` for strings
inputBox ∷
  ∀ p q r more.
  Union p InputFixedProps q =>
  Union q r Input.Props =>
  Nub q q =>
  NonEmptyString -> RequiredField -> (Record p) -> FormBuilder { readOnly ∷ Boolean | more } String String
inputBox label requiredField inputProps =
  formBuilder_ \{ readOnly } s onChange ->
    element Input.component
      ( inputProps
          `disjointUnion`
            { value: s
            , onChange: handler targetValue (traverse_ onChange)
            , readOnly: readOnly
            , label
            , type: HTMLInputType.Text
            , _aria:
              case requiredField of
                Required -> Object.singleton "required" "true"
                Optional -> mempty
                Neither -> mempty
            , css: E.css { width: E.percent 100.0 }
            }
      )
