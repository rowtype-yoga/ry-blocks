{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "ry-blocks"
, dependencies =
  [ "aff"
  , "arrays"
  , "colors"
  , "console"
  , "control"
  , "datetime"
  , "debug"
  , "effect"
  , "either"
  , "enums"
  , "exceptions"
  , "fahrtwind"
  , "foldable-traversable"
  , "foreign"
  , "foreign-generic"
  , "foreign-object"
  , "framer-motion"
  , "free"
  , "functions"
  , "heterogeneous"
  , "heterogeneous-extrablatt"
  , "integers"
  , "interpolate"
  , "literals"
  , "maybe"
  , "newtype"
  , "now"
  , "nullable"
  , "numbers"
  , "ordered-collections"
  , "partial"
  , "prelude"
  , "profunctor-lenses"
  , "random"
  , "react-basic"
  , "react-basic-dom"
  , "react-basic-emotion"
  , "react-basic-hooks"
  , "react-basic-storybook"
  , "react-testing-library"
  , "react-virtuoso"
  , "record"
  , "record-studio"
  , "refs"
  , "remotedata"
  , "spec"
  , "spec-discovery"
  , "st"
  , "strings"
  , "tailrec"
  , "transformers"
  , "tuples"
  , "two-or-more"
  , "typelevel-peano"
  , "typelevel-prelude"
  , "unsafe-coerce"
  , "unsafe-reference"
  , "untagged-union"
  , "web-dom"
  , "web-events"
  , "web-html"
  , "web-uievents"
  , "yoga-tree"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
