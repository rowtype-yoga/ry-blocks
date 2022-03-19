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
      https://github.com/purescript/package-sets/releases/download/psc-0.14.5-20211116/packages.dhall
        sha256:7ba810597a275e43c83411d2ab0d4b3c54d0b551436f4b1632e9ff3eb62e327a

in  upstream
  with metadata.version = "v0.15.0"
  with prelude.repo = "https://github.com/kl0tl/purescript-prelude.git"
  with prelude.version = "es-modules"
  with effect.repo = "https://github.com/kl0tl/purescript-effect.git"
  with effect.version = "es-modules"
  with console.repo = "https://github.com/kl0tl/purescript-console.git"
  with console.version = "es-modules"
  with web-html.repo = "https://github.com/kl0tl/purescript-web-html.git"
  with web-html.version = "es-modules"
  with decimals.repo = "https://github.com/kl0tl/purescript-decimals.git"
  with decimals.version = "es-modules"
  with js-uri.repo = "https://github.com/kl0tl/purescript-js-uri.git"
  with js-uri.version = "es-modules"
  with unsafe-reference.repo
       = "https://github.com/kl0tl/purescript-unsafe-reference.git"
  with unsafe-reference.version = "es-modules"
  with affjax.repo = "https://github.com/kl0tl/purescript-affjax.git"
  with affjax.version = "es-modules"
  with halogen-vdom.repo
       = "https://github.com/kl0tl/purescript-halogen-vdom.git"
  with halogen-vdom.version = "es-modules"
  with formatters.repo = "https://github.com/kl0tl/purescript-formatters.git"
  with formatters.version = "es-modules"
  with web-clipboard.repo
       = "https://github.com/kl0tl/purescript-web-clipboard.git"
  with web-clipboard.version = "es-modules"
  with web-xhr.repo = "https://github.com/kl0tl/purescript-web-xhr.git"
  with web-xhr.version = "es-modules"
  with argonaut-core.repo
       = "https://github.com/kl0tl/purescript-argonaut-core.git"
  with argonaut-core.version = "es-modules"
  with avar.repo = "https://github.com/kl0tl/purescript-avar.git"
  with avar.version = "es-modules"
  with numbers.repo = "https://github.com/kl0tl/purescript-numbers.git"
  with numbers.version = "es-modules"
  with arrays.repo = "https://github.com/kl0tl/purescript-arrays.git"
  with arrays.version = "es-modules"
  with react-basic-classic.repo
       = "https://github.com/kl0tl/purescript-react-basic-classic.git"
  with react-basic-classic.version = "es-modules"
  with aff.repo = "https://github.com/kl0tl/purescript-aff.git"
  with aff.version = "es-modules"
  with st.repo = "https://github.com/kl0tl/purescript-st.git"
  with st.version = "es-modules"
  with exceptions.repo = "https://github.com/kl0tl/purescript-exceptions.git"
  with exceptions.version = "es-modules"
  with simple-json.repo = "https://github.com/kl0tl/purescript-simple-json.git"
  with simple-json.version = "es-modules"
  with foreign-generic.repo
       = "https://github.com/kl0tl/purescript-foreign-generic.git"
  with foreign-generic.version = "es-modules"
  with integers.repo = "https://github.com/kl0tl/purescript-integers.git"
  with integers.version = "es-modules"
  with math.repo = "https://github.com/kl0tl/purescript-math.git"
  with math.version = "es-modules"
  with now.repo = "https://github.com/kl0tl/purescript-now.git"
  with now.version = "es-modules"
  with js-date.repo = "https://github.com/kl0tl/purescript-js-date.git"
  with js-date.version = "es-modules"
  with partial.repo = "https://github.com/kl0tl/purescript-partial.git"
  with partial.version = "es-modules"
  with web-storage.repo = "https://github.com/kl0tl/purescript-web-storage.git"
  with web-storage.version = "es-modules"
  with web-file.repo = "https://github.com/kl0tl/purescript-web-file.git"
  with web-file.version = "es-modules"
  with web-events.repo = "https://github.com/kl0tl/purescript-web-events.git"
  with web-events.version = "es-modules"
  with web-dom.repo = "https://github.com/kl0tl/purescript-web-dom.git"
  with web-dom.version = "es-modules"
  with web-uievents.repo
       = "https://github.com/kl0tl/purescript-web-uievents.git"
  with web-uievents.version = "es-modules"
  with web-touchevents.repo
       = "https://github.com/kl0tl/purescript-web-touchevents.git"
  with web-touchevents.version = "es-modules"
  with unfoldable.repo = "https://github.com/kl0tl/purescript-unfoldable.git"
  with unfoldable.version = "es-modules"
  with unsafe-coerce.repo
       = "https://github.com/kl0tl/purescript-unsafe-coerce.git"
  with unsafe-coerce.version = "es-modules"
  with strings.repo = "https://github.com/kl0tl/purescript-strings.git"
  with strings.version = "es-modules"
  with refs.repo = "https://github.com/kl0tl/purescript-refs.git"
  with refs.version = "es-modules"
  with record.repo = "https://github.com/kl0tl/purescript-record.git"
  with record.version = "es-modules"
  with nullable.repo = "https://github.com/kl0tl/purescript-nullable.git"
  with nullable.version = "es-modules"
  with lazy.repo = "https://github.com/kl0tl/purescript-lazy.git"
  with lazy.version = "es-modules"
  with functions.repo = "https://github.com/kl0tl/purescript-functions.git"
  with functions.version = "es-modules"
  with foreign.repo = "https://github.com/kl0tl/purescript-foreign.git"
  with foreign.version = "es-modules"
  with foreign-object.repo
       = "https://github.com/kl0tl/purescript-foreign-object.git"
  with foreign-object.version = "es-modules"
  with foldable-traversable.repo
       = "https://github.com/kl0tl/purescript-foldable-traversable.git"
  with foldable-traversable.version = "es-modules"
  with enums.repo = "https://github.com/kl0tl/purescript-enums.git"
  with enums.version = "es-modules"
  with debug.repo = "https://github.com/kl0tl/purescript-debug.git"
  with debug.version = "es-modules"
  with datetime.repo = "https://github.com/kl0tl/purescript-datetime.git"
  with datetime.version = "es-modules"
  with control.repo = "https://github.com/kl0tl/purescript-control.git"
  with control.version = "es-modules"
  with aff-promise.repo
       =
      "https://github.com/working-group-purescript-es/purescript-aff-promise.git"
  with aff-promise.version = "es-modules"
  with formatters.repo
       =
      "https://github.com/working-group-purescript-es/purescript-formatters.git"
  with formatters.version = "es-modules"
  with literals.repo
       =
      "https://github.com/working-group-purescript-es/purescript-literals.git"
  with literals.version = "es-modules"
  with lists.repo
       = "https://github.com/working-group-purescript-es/purescript-lists.git"
  with lists.version = "es-modules"
  with react-basic.repo
       =
      "https://github.com/working-group-purescript-es/purescript-react-basic.git"
  with milkis.repo
       = "https://github.com/working-group-purescript-es/purescript-milkis.git"
  with milkis.version = "es-modules"
  with react-basic.version = "es-modules"
  with react-basic-dom.repo
       =
      "https://github.com/working-group-purescript-es/purescript-react-basic-dom.git"
  with react-basic-dom.version = "es-modules"
  with react-basic-hooks.repo
       =
      "https://github.com/working-group-purescript-es/purescript-react-basic-hooks.git"
  with react-basic-hooks.version = "es-modules"
  with react-basic-emotion.repo
       =
      "https://github.com/working-group-purescript-es/purescript-react-basic-emotion.git"
  with react-basic-emotion.version = "es-modules"
  with stringutils.repo
       =
      "https://github.com/working-group-purescript-es/purescript-stringutils.git"
  with stringutils.version = "es-modules"
  with untagged-union.repo
       =
      "https://github.com/working-group-purescript-es/purescript-untagged-union.git"
  with untagged-union.version = "es-modules"
  with framer-motion.version = "es-modules"
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
  with plumage =
    { dependencies =
      [ "arrays"
      , "colors"
      , "console"
      , "debug"
      , "effect"
      , "foldable-traversable"
      , "foreign"
      , "foreign-object"
      , "framer-motion"
      , "integers"
      , "literals"
      , "maybe"
      , "nullable"
      , "prelude"
      , "psci-support"
      , "react-basic"
      , "react-basic-dom"
      , "react-basic-emotion"
      , "react-basic-hooks"
      , "record"
      , "refs"
      , "tuples"
      , "typelevel-prelude"
      , "unsafe-coerce"
      , "untagged-union"
      , "web-dom"
      , "web-html"
      ]
    , repo = "https://github.com/murmuras-tech/plumage.git"
    , version = "es-modules"
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
  with postgresql-client =
    { dependencies =
      [ "aff"
      , "argonaut"
      , "arrays"
      , "assert"
      , "bifunctors"
      , "bytestrings"
      , "datetime"
      , "decimals"
      , "dotenv"
      , "effect"
      , "either"
      , "enums"
      , "exceptions"
      , "foldable-traversable"
      , "foreign"
      , "foreign-generic"
      , "foreign-object"
      , "identity"
      , "integers"
      , "js-date"
      , "lists"
      , "math"
      , "maybe"
      , "newtype"
      , "node-process"
      , "nullable"
      , "ordered-collections"
      , "partial"
      , "polyform"
      , "polyform-batteries-core"
      , "polyform-batteries-env"
      , "prelude"
      , "psci-support"
      , "string-parsers"
      , "strings"
      , "test-unit"
      , "transformers"
      , "tuples"
      , "typelevel-prelude"
      , "validation"
      ]
    , repo =
        "https://github.com/jordanmartinez/purescript-postgresql-client.git"
    , version = "3ac9c1eace4fc707c274d065f01c5ec81d201757"
    }
  with polyform =
    { dependencies =
      [ "arrays"
      , "bifunctors"
      , "control"
      , "effect"
      , "either"
      , "enums"
      , "functors"
      , "identity"
      , "invariant"
      , "lists"
      , "maybe"
      , "newtype"
      , "parallel"
      , "partial"
      , "prelude"
      , "profunctor"
      , "psci-support"
      , "quickcheck"
      , "quickcheck-laws"
      , "record"
      , "transformers"
      , "tuples"
      , "typelevel-prelude"
      , "unsafe-coerce"
      , "validation"
      , "variant"
      ]
    , repo = "https://github.com/jordanmartinez/purescript-polyform.git"
    , version = "updateTov0.14.1"
    }
  with polyform-batteries-core =
    { dependencies =
      [ "arrays"
      , "decimals"
      , "effect"
      , "enums"
      , "integers"
      , "lazy"
      , "maybe"
      , "numbers"
      , "partial"
      , "polyform"
      , "prelude"
      , "psci-support"
      , "quickcheck"
      , "strings"
      , "test-unit"
      , "typelevel-prelude"
      , "validation"
      , "variant"
      ]
    , repo =
        "https://github.com/jordanmartinez/purescript-polyform-validators.git"
    , version = "updateTov0.14.1"
    }
  with polyform-batteries-env =
    { dependencies =
      [ "arrays"
      , "identity"
      , "maybe"
      , "ordered-collections"
      , "polyform"
      , "polyform-batteries-core"
      , "prelude"
      , "psci-support"
      , "typelevel-prelude"
      ]
    , repo = "https://github.com/jordanmartinez/batteries-env.git"
    , version = "updateTov0.14.1"
    }
  with selda =
    { name = "selda"
    , version = "ae8bf03413e24a53f474a9f7f198b1c7b11bf6ff"
    , repo = "https://github.com/Kamirus/purescript-selda.git"
    , dependencies =
      [ "aff"
      , "arrays"
      , "bifunctors"
      , "console"
      , "datetime"
      , "dodo-printer"
      , "dotenv"
      , "effect"
      , "either"
      , "enums"
      , "exceptions"
      , "exists"
      , "foldable-traversable"
      , "foreign"
      , "foreign-object"
      , "heterogeneous"
      , "leibniz"
      , "lists"
      , "maybe"
      , "newtype"
      , "node-process"
      , "node-sqlite3"
      , "ordered-collections"
      , "partial"
      , "polyform"
      , "polyform-batteries-core"
      , "polyform-batteries-env"
      , "postgresql-client"
      , "prelude"
      , "record"
      , "simple-json"
      , "strings"
      , "test-unit"
      , "transformers"
      , "tuples"
      , "typelevel-prelude"
      , "unsafe-coerce"
      , "validation"
      , "variant"
      ]
    }
  with framer-motion.version = "es-modules"
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
  with ry-blocks =
    { repo = "https://github.com/rowtype-yoga/ry-blocks.git"
    , version = "d01d028329f434cf903d713f9fa3f940114cfa64"
    , dependencies =
      [ "aff"
      , "aff-promise"
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
      , "foldable-traversable"
      , "foreign"
      , "foreign-generic"
      , "foreign-object"
      , "framer-motion"
      , "free"
      , "functions"
      , "heterogeneous"
      , "integers"
      , "interpolate"
      , "lists"
      , "literals"
      , "math"
      , "maybe"
      , "newtype"
      , "nullable"
      , "numbers"
      , "ordered-collections"
      , "partial"
      , "prelude"
      , "profunctor-lenses"
      , "psci-support"
      , "react-basic"
      , "react-basic-dom"
      , "react-basic-emotion"
      , "react-basic-hooks"
      , "react-testing-library"
      , "record"
      , "record-extra"
      , "routing"
      , "routing-duplex"
      , "spec"
      , "spec-discovery"
      , "strings"
      , "tailrec"
      , "transformers"
      , "tuples"
      , "two-or-more"
      , "typelevel-peano"
      , "typelevel-prelude"
      , "unsafe-coerce"
      , "untagged-union"
      , "web-dom"
      , "web-events"
      , "web-html"
      , "web-uievents"
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
