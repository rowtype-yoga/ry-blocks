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
      https://github.com/purescript/package-sets/releases/download/psc-0.15.2-20220531/packages.dhall
        sha256:278d3608439187e51136251ebf12fabda62d41ceb4bec9769312a08b56f853e3

in  upstream
  with either.version = "v6.0.0"
  with framer-motion =
    { version = "es-modules"
    , repo = "https://github.com/i-am-the-slime/purescript-framer-motion.git"
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
  with spec =
    { repo = "https://github.com/purescript-spec/purescript-spec.git"
    , version = "master"
    , dependencies =
      [ "aff"
      , "ansi"
      , "avar"
      , "console"
      , "exceptions"
      , "foldable-traversable"
      , "fork"
      , "now"
      , "pipes"
      , "prelude"
      , "strings"
      , "transformers"
      ]
    }
  with spec-discovery =
    { repo = "https://github.com/purescript-spec/purescript-spec-discovery.git"
    , version = "master"
    , dependencies =
      [ "aff"
      , "aff-promise"
      , "arrays"
      , "console"
      , "effect"
      , "foldable-traversable"
      , "node-fs"
      , "prelude"
      , "spec"
      ]
    }
  with playwright =
    { repo =
        "https://github.com/working-group-purescript-es/purescript-playwright.git"
    , version = "es-modules"
    , dependencies =
      [ "argonaut-core"
      , "console"
      , "effect"
      , "prelude"
      , "psci-support"
      , "aff-promise"
      , "test-unit"
      , "untagged-union"
      , "node-buffer"
      , "node-fs-aff"
      , "undefined"
      , "aff"
      , "either"
      , "exceptions"
      , "foreign"
      , "foreign-object"
      , "literals"
      , "maybe"
      , "node-streams"
      , "ordered-collections"
      , "refs"
      , "strings"
      , "transformers"
      ]
    }
  with milkis =
    { repo =
        "https://github.com/working-group-purescript-es/purescript-milkis.git"
    , version = "es-modules"
    , dependencies =
      [ "aff-promise"
      , "arraybuffer-types"
      , "foreign-object"
      , "prelude"
      , "typelevel-prelude"
      ]
    }
  with debug =
    { dependencies = [ "prelude", "functions" ]
    , repo =
        "https://github.com/working-group-purescript-es/purescript-debug.git"
    , version = "es-modules"
    }
  with checked-exceptions =
    { dependencies = [ "prelude", "transformers", "variant" ]
    , repo = "https://github.com/natefaubion/purescript-checked-exceptions.git"
    , version = "v3.1.1"
    }
  with language-cst-parser =
    { dependencies =
      [ "arrays"
      , "const"
      , "effect"
      , "either"
      , "foldable-traversable"
      , "free"
      , "functors"
      , "maybe"
      , "numbers"
      , "ordered-collections"
      , "strings"
      , "transformers"
      , "tuples"
      , "typelevel-prelude"
      ]
    , repo = "https://github.com/natefaubion/purescript-language-cst-parser.git"
    , version = "v0.9.3"
    }
  with stringutils =
    { dependencies =
      [ "arrays"
      , "either"
      , "integers"
      , "maybe"
      , "partial"
      , "prelude"
      , "strings"
      ]
    , repo =
        "https://github.com/working-group-purescript-es/purescript-stringutils.git"
    , version = "es-modules"
    }
  with routing-duplex =
    { dependencies =
      [ "arrays"
      , "control"
      , "either"
      , "js-uri"
      , "lazy"
      , "numbers"
      , "prelude"
      , "profunctor"
      , "record"
      , "strings"
      , "typelevel-prelude"
      ]
    , repo =
        "https://github.com/working-group-purescript-es/purescript-routing-duplex.git"
    , version = "v0.15.0-update"
    }
  with web-router =
    { dependencies =
      [ "aff"
      , "effect"
      , "freet"
      , "indexed-monad"
      , "prelude"
      , "profunctor-lenses"
      , "routing"
      ]
    , repo = "https://github.com/robertdp/purescript-web-router.git"
    , version = "v0.3.0"
    }
  with framer-motion.version = "24dc0a89dd65458b768f3731c886f9911898788d"
  with visx =
    { repo = "https://github.com/i-am-the-slime/purescript-visx.git"
    , version = "es-modules"
    , dependencies =
      [ "arrays"
      , "console"
      , "datetime"
      , "debug"
      , "effect"
      , "either"
      , "foldable-traversable"
      , "foreign"
      , "foreign-object"
      , "functions"
      , "integers"
      , "js-date"
      , "justifill"
      , "lists"
      , "maybe"
      , "newtype"
      , "nullable"
      , "orders"
      , "prelude"
      , "psci-support"
      , "react-basic"
      , "react-basic-dom"
      , "react-basic-hooks"
      , "record"
      , "record-extra"
      , "transformers"
      , "tuples"
      , "typelevel-prelude"
      , "unsafe-coerce"
      , "untagged-union"
      , "web-dom"
      ]
    }
  with graphql-fundeps =
    { dependencies =
      [ "aff"
      , "affjax"
      , "console"
      , "effect"
      , "either"
      , "http-methods"
      , "maybe"
      , "media-types"
      , "prelude"
      , "psci-support"
      , "simple-json"
      , "strings"
      ]
    , repo = "https://github.com/meeshkan/purescript-graphql-fundeps.git"
    , version = "b83fcc13d5f9b1c28baeede35319f34084ec7f3c"
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
  with heterogeneous =
    { dependencies =
      [ "either", "functors", "prelude", "record", "tuples", "variant" ]
    , repo = "https://github.com/natefaubion/purescript-heterogeneous.git"
    , version = "v0.5.1"
    }
  with interpolate =
    { dependencies = [ "prelude" ]
    , repo = "https://github.com/jordanmartinez/purescript-interpolate.git"
    , version = "v3.0.1"
    }
  with interpolate.version = "patch-1"
  with interpolate.repo
       = "https://github.com/i-am-the-slime/purescript-interpolate.git"
  with justifill =
    { dependencies = [ "record", "spec", "typelevel-prelude" ]
    , repo = "https://github.com/i-am-the-slime/purescript-justifill.git"
    , version = "v0.2.1"
    }
  with morello =
    { dependencies =
      [ "console", "debug", "effect", "heterogeneous", "strings", "validation" ]
    , repo = "https://github.com/sigma-andex/purescript-morello.git"
    , version = "v0.2.0"
    }
  with react-basic =
    { dependencies = [ "prelude", "effect", "record" ]
    , repo = "https://github.com/lumihq/purescript-react-basic.git"
    , version = "v16.0.0"
    }
  with react-basic-dom =
    { dependencies =
      [ "prelude"
      , "console"
      , "effect"
      , "foreign-object"
      , "psci-support"
      , "react-basic"
      , "unsafe-coerce"
      , "web-dom"
      , "web-events"
      , "web-file"
      , "web-html"
      ]
    , repo = "https://github.com/lumihq/purescript-react-basic-dom.git"
    , version = "v4.2.0"
    }
  with react-basic-emotion =
    { dependencies =
      [ "colors"
      , "console"
      , "effect"
      , "foreign"
      , "foreign-object"
      , "numbers"
      , "prelude"
      , "react-basic"
      , "react-basic-hooks"
      , "typelevel-prelude"
      , "unsafe-reference"
      ]
    , repo = "https://github.com/lumihq/purescript-react-basic-emotion.git"
    , version = "v6.0.0"
    }
  with uuid =
    { dependencies = [ "effect", "maybe", "foreign-generic", "console", "spec" ]
    , repo = "https://github.com/i-am-the-slime/purescript-uuid.git"
    , version = "patch-2"
    }
  with react-basic-hooks =
    { dependencies =
      [ "aff"
      , "aff-promise"
      , "bifunctors"
      , "console"
      , "control"
      , "datetime"
      , "effect"
      , "either"
      , "exceptions"
      , "foldable-traversable"
      , "functions"
      , "indexed-monad"
      , "integers"
      , "maybe"
      , "newtype"
      , "now"
      , "nullable"
      , "ordered-collections"
      , "prelude"
      , "psci-support"
      , "react-basic"
      , "refs"
      , "tuples"
      , "type-equality"
      , "unsafe-coerce"
      , "unsafe-reference"
      , "web-html"
      ]
    , repo = "https://github.com/spicydonuts/purescript-react-basic-hooks.git"
    , version = "e7494bd4656b4a43c2efc69bf5f512e154f05cc1"
    }
  with react-basic.repo
       =
      "https://github.com/working-group-purescript-es/purescript-react-basic.git"
  with react-basic.version = "es-modules"
  with react-basic-dom.repo
       =
      "https://github.com/working-group-purescript-es/purescript-react-basic-dom.git"
  with react-basic-dom.version = "es-modules"
  with react-basic-emotion.repo
       =
      "https://github.com/working-group-purescript-es/purescript-react-basic-emotion.git"
  with react-basic-emotion.version = "es-modules"
  with literals =
    { dependencies =
      [ "assert"
      , "effect"
      , "console"
      , "integers"
      , "numbers"
      , "partial"
      , "psci-support"
      , "unsafe-coerce"
      , "typelevel-prelude"
      ]
    , repo = "https://github.com/jvliwanag/purescript-literals.git"
    , version = "v0.2.0"
    }
  with literals.repo
       =
      "https://github.com/working-group-purescript-es/purescript-literals.git"
  with literals.version = "es-modules"
  with untagged-union =
    { dependencies =
      [ "assert"
      , "console"
      , "effect"
      , "foreign"
      , "foreign-object"
      , "literals"
      , "maybe"
      , "newtype"
      , "psci-support"
      , "tuples"
      , "unsafe-coerce"
      ]
    , repo = "https://github.com/jvliwanag/purescript-untagged-union.git"
    , version = "v0.3.0"
    }
  with untagged-union.repo
       =
      "https://github.com/working-group-purescript-es/purescript-untagged-union.git"
  with untagged-union.version = "es-modules"
  with react-testing-library =
    { name = "react-testing-library"
    , dependencies = [ "react-basic", "react-basic-hooks", "react-basic-dom" ]
    , repo =
        "https://github.com/i-am-the-slime/purescript-react-testing-library.git"
    , version = "v4.0.1"
    }
  with record-extra =
    { repo =
        "https://github.com/working-group-purescript-es/purescript-record-extra.git"
    , version = "v0.15.0-update"
    , dependencies =
      [ "arrays"
      , "console"
      , "effect"
      , "functions"
      , "lists"
      , "maybe"
      , "prelude"
      , "record"
      , "tuples"
      , "typelevel-prelude"
      ]
    }
  with fahrtwind =
    { repo = "https://github.com/rowtype-yoga/purescript-fahrtwind.git"
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
    , version = "654be2533b0ea950511f26e29ba9ab574f7abc03"
    }
  with react-virtuoso =
    { dependencies =
        ( https://raw.githubusercontent.com/rowtype-yoga/purescript-react-virtuoso/main/spago.dhall
            sha256:9c7c1ced896538360ba325dcefe912fed8c0207bc828f68ebadf5f3b83ee5012
        ).dependencies
    , repo = "https://github.com/rowtype-yoga/purescript-react-virtuoso.git"
    , version = "ad50a215c024f4ee3393916c8a3307a9a7c9b4a5"
    }
