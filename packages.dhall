{-
Welcome to your new Dhall package-set!

Below are instructions for how to edit this file for most use
cases, so that you don't need to know Dhall to use it.

## Use Cases

Most will want to do one or both of these options:
1. Override/Patch a package's dependency
2. Add a package not already in the default package set

This file will continue to work whether you use one or both options.
Instructions for each option are explained below.

### Overriding/Patching a package

Purpose:
- Change a package's dependency to a newer/older release than the
    default package set's release
- Use your own modified version of some dependency that may
    include new API, changed API, removed API by
    using your custom git repo of the library rather than
    the package set's repo

Syntax:
where `entityName` is one of the following:
- dependencies
- repo
- version
-------------------------------
let upstream = --
in  upstream
  with packageName.entityName = "new value"
-------------------------------

Example:
-------------------------------
let upstream = --
in  upstream
  with halogen.version = "master"
  with halogen.repo = "https://example.com/path/to/git/repo.git"

  with halogen-vdom.version = "v4.0.0"
  with halogen-vdom.dependencies = [ "extra-dependency" ] # halogen-vdom.dependencies
-------------------------------

### Additions

Purpose:
- Add packages that aren't already included in the default package set

Syntax:
where `<version>` is:
- a tag (i.e. "v4.0.0")
- a branch (i.e. "master")
- commit hash (i.e. "701f3e44aafb1a6459281714858fadf2c4c2a977")
-------------------------------
let upstream = --
in  upstream
  with new-package-name =
    { dependencies =
       [ "dependency1"
       , "dependency2"
       ]
    , repo =
       "https://example.com/path/to/git/repo.git"
    , version =
        "<version>"
    }
-------------------------------

Example:
-------------------------------
let upstream = --
in  upstream
  with benchotron =
      { dependencies =
          [ "arrays"
          , "exists"
          , "profunctor"
          , "strings"
          , "quickcheck"
          , "lcg"
          , "transformers"
          , "foldable-traversable"
          , "exceptions"
          , "node-fs"
          , "node-buffer"
          , "node-readline"
          , "datetime"
          , "now"
          ]
      , repo =
          "https://github.com/hdgarrood/purescript-benchotron.git"
      , version =
          "v7.0.0"
      }
-------------------------------
-}
let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.4-20221107/packages.dhall
        sha256:cd0c29e8a69cf70b714ce3ee91c57c02b3d20a1118e35dd8405f33aa80177849

in  upstream
  with framer-motion =
    { repo = "https://github.com/i-am-the-slime/purescript-framer-motion.git"
    , version = "v1.0.1"
    , dependencies =
      [ "aff"
      , "aff-promise"
      , "arrays"
      , "console"
      , "effect"
      , "foreign"
      , "foreign-object"
      , "heterogeneous"
      , "literals"
      , "maybe"
      , "nullable"
      , "prelude"
      , "psci-support"
      , "react-basic"
      , "react-basic-dom"
      , "react-basic-hooks"
      , "record"
      , "tuples"
      , "two-or-more"
      , "typelevel-prelude"
      , "unsafe-coerce"
      , "untagged-union"
      , "web-dom"
      , "web-events"
      , "web-uievents"
      ]
    }
  with foreign-generic =
    { repo =
        "https://github.com/working-group-purescript-es/purescript-foreign-generic.git"
    , version = "v0.15.0-updates"
    , dependencies =
      [ "effect"
      , "exceptions"
      , "foreign"
      , "foreign-object"
      , "identity"
      , "ordered-collections"
      , "record"
      ]
    }
  with fahrtwind =
    { repo = "https://github.com/rowtype-yoga/purescript-fahrtwind.git"
    , version = "v1.0.1"
    , dependencies =
      [ "arrays"
      , "colors"
      , "foreign-object"
      , "integers"
      , "prelude"
      , "react-basic"
      , "react-basic-dom"
      , "react-basic-emotion"
      , "tuples"
      , "typelevel-prelude"
      , "unsafe-coerce"
      ]
    }
  with record-studio =
    { repo = "https://github.com/rowtype-yoga/purescript-record-studio.git"
    , version = "v1.0.1"
    , dependencies =
      [ "heterogeneous", "lists", "prelude", "record", "typelevel-prelude" ]
    }
  with react-basic-storybook.version = "v2.0.0"
