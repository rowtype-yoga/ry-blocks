for f in (ls src/Yoga/Block/Icon/SVG/*.svg)
  svgo -i $f
end
node convert-svgs.js
for f in (ls src/Yoga/Block/Icon/SVG/*.purs)
  sed -i "" 's/stroke: "#333"/stroke: "var(--stroke-colour)"/g' $f
end

