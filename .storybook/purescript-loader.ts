import { promises } from "fs"
import { relative } from "path"

const mapWithKeys = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => fn(k, v, i)))

const capitalise = str => {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const toJSPath = (outputFolder, pursPath) =>
  pursPath
    .slice(0, -5)
    .split("/")
    .reduce((acc, curr) => {
      if (acc == "") {
        if (curr == "stories") return (outputFolder + "/")
        return ""
      }
      return acc + curr + "."
    }, "").slice(0, -1) + "/index.js"

export default function (source) {
  console.log(this.resourcePath)
  const options = this.getOptions()
  if(!options.outputFolder) {
    this.emitError("You must specify an output folder in options")
  }
  const outputFolder = relative(this.resourcePath, options.outputFolder)
  const callback = this.async();
  const path = toJSPath(outputFolder, this.resourcePath).slice(3)
  console.log()
  console.log()
  console.log()
  const result = `export * from "${path}"
import originalDefault from "${path}"
export default { title: "Erwin", decorators: originalDefault.decorators }
`
  console.log("Result", `export * from "${path}"`)
  console.log()
  console.log()
  console.log()

  callback(null, result)

  // promises.readFile(path).then(file => {
  //   // console.log(file.toString())
  //   callback(null, file.toString())
  // )
}
