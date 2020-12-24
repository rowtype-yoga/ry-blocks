{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "ry-blocks"
, dependencies =
  [ "console"
  , "debug"
  , "effect"
  , "heterogeneous"
  , "interpolate"
  , "psci-support"
  , "react-basic-dom"
  , "react-basic-emotion"
  , "react-basic-hooks"
  , "react-testing-library"
  , "record-extra"
  , "routing"
  , "routing-duplex"
  , "spec-discovery"
  , "untagged-union"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
