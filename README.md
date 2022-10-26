# PureScript Yoga Blocks

> *Ring the bells that still can ring*</br>
> *Forget your perfect offering*</br>
> *There is a crack in everything*</br>
> *That's how the light gets in* *<span style="float: right"> — Leonard Cohen, Anthem </span>*

## Digital User Interfaces

### Producing information

- Familiar
- Intuitive
- Quick
- Clear (not confusing)

### Creating and changing information

- Familiar
- Intuitive

## Adding new icons

Place the svg in `src/Yoga/Blocks/Icon/SVG
```
fish convert-more.fish
```

You can usually delete the first empty fill
Make sure that `fill` is `var(--stroke-colour)` (check some other icons if unsure)

Add a reexport in:
`module Yoga.Block.Icon.SVG`
