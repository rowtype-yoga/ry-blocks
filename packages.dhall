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
  with fahrtwind =
    { repo = "https://github.com/rowtype-yoga/purescript-fahrtwind.git"
    , version = "98afb47610b0422744039e9900d513e37b1935de"
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
    , version = "v1.0.4"
    , dependencies =
      [ "heterogeneous", "lists", "prelude", "record", "typelevel-prelude" ]
    }
  with react-basic-storybook = ../purescript-react-basic-storybook/spago.dhall as Location
  with react-aria =
    { repo = "https://github.com/rowtype-yoga/purescript-react-aria"
    , version = "v0.2.0"
    , dependencies =
      [ "aff"
      , "effect"
      , "foreign"
      , "foreign-object"
      , "nullable"
      , "ordered-collections"
      , "prelude"
      , "react-basic"
      , "react-basic-dom"
      , "react-basic-hooks"
      , "unsafe-coerce"
      , "untagged-union"
      , "web-dom"
      , "web-html"
      ]
    }
