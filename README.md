## Adding new icons

Place the svg in `src/Yoga/Blocks/Icon/SVG
```
fish convert-more.fish
```

You can usually delete the first empty fill
Make sure that `fill` is `var(--stroke-colour)` (check some other icons if unsure)

Add a reexport in:
`module Yoga.Block.Icon.SVG`
